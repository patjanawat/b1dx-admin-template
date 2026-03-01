import { db } from "../db";
import { http, HttpResponse } from "msw";

const CORE_BASE = "/gateway/proxy/core";

// ─── Envelope helpers ────────────────────────────────────────────────────────

const envelope = <T>(data: T) => ({
  success: true,
  correlationId: crypto.randomUUID(),
  data,
  error: null,
});

const envelopeError = (code: string, message: string) => ({
  success: false,
  correlationId: crypto.randomUUID(),
  data: null,
  error: { code, message, details: null },
});

// ─── DB helpers ──────────────────────────────────────────────────────────────

const toAuthUser = (userId: string) => {
  const user = db.users.find((u) => u.id === userId);
  if (!user) return null;
  const membership = db.memberships.find((m) => m.userId === userId) ?? null;
  const tenant = membership
    ? db.tenants.find((t) => t.id === membership.tenantId) ?? null
    : null;
  const role = membership
    ? db.roles.find((r) => r.id === membership.roleId) ?? null
    : null;
  return {
    userId: user.id,
    username: user.email.split("@")[0],
    displayName: user.name,
    status: "ACTIVE" as const,
    tenantId: tenant?.id ?? null,
    tenantCode: tenant?.name ?? null,
    level: null,
    roles: role ? [role.name] : [],
    warehouseIds: [] as number[],
    brandIds: [] as string[],
    shopIds: [] as string[],
  };
};

const toLoginData = (session: { accessToken: string; refreshToken: string; userId: string }) => ({
  accessToken: session.accessToken,
  tokenType: "Bearer",
  expiresIn: 900,
  refreshToken: session.refreshToken,
  refreshExpiresIn: 2592000,
  user: toAuthUser(session.userId),
});

const requireAuth = (req: Request) => {
  const auth = req.headers.get("authorization") ?? "";
  const [, token] = auth.match(/^Bearer\s+(.+)$/i) ?? [];
  if (!token) return null;
  return db.sessions.find((s) => s.accessToken === token) ?? null;
};

const parsePagination = (url: URL) => {
  const page = Number(url.searchParams.get("page") ?? "1");
  const pageSize = Number(url.searchParams.get("pageSize") ?? "20");
  return {
    page: Number.isFinite(page) && page > 0 ? page : 1,
    pageSize: Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 20,
  };
};

// ─── Handlers ────────────────────────────────────────────────────────────────

export const coreHandlers = [
  // POST /api/auth/login
  http.post(`${CORE_BASE}/api/auth/login`, async ({ request }) => {
    const body = (await request.json().catch(() => ({}))) as {
      username?: string;
      password?: string;
    };
    const username = body.username ?? "";

    // Match by email prefix (e.g. "admin" → "admin@acme.io") or full email
    const user = db.users.find(
      (u) => u.email.split("@")[0] === username || u.email === username
    );

    if (!user) {
      return HttpResponse.json(
        envelopeError("AUTH_INVALID_CREDENTIALS", "Invalid username or password."),
        { status: 401 }
      );
    }

    const session = db.createSession(user.id);
    return HttpResponse.json(envelope(toLoginData(session)));
  }),

  // POST /api/auth/refresh
  http.post(`${CORE_BASE}/api/auth/refresh`, async ({ request }) => {
    const body = (await request.json().catch(() => ({}))) as {
      refreshToken?: string;
    };

    if (!body.refreshToken) {
      return HttpResponse.json(
        envelopeError("AUTH_REFRESH_BAD_REQUEST", "Refresh token is required."),
        { status: 400 }
      );
    }

    const session = db.rotateSession(body.refreshToken);
    if (!session) {
      return HttpResponse.json(
        envelopeError("AUTH_REFRESH_INVALID", "Invalid or expired refresh token."),
        { status: 401 }
      );
    }

    return HttpResponse.json(envelope(toLoginData(session)));
  }),

  // POST /api/auth/logout
  http.post(`${CORE_BASE}/api/auth/logout`, async ({ request }) => {
    const body = (await request.json().catch(() => ({}))) as {
      refreshToken?: string;
    };
    if (body.refreshToken) {
      db.invalidateSession(body.refreshToken);
    }
    return HttpResponse.json(envelope(null));
  }),

  // GET /api/auth/me
  http.get(`${CORE_BASE}/api/auth/me`, ({ request }) => {
    const session = requireAuth(request);
    if (!session) {
      return HttpResponse.json(
        envelopeError("AUTH_INVALID_TOKEN", "Unauthorized."),
        { status: 401 }
      );
    }
    return HttpResponse.json(envelope(toAuthUser(session.userId)));
  }),

  // ─── Other endpoints (unchanged paths) ────────────────────────────────────

  http.get(`${CORE_BASE}/users`, ({ request }) => {
    const session = requireAuth(request);
    if (!session) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const q = (url.searchParams.get("q") ?? "").toLowerCase();
    const roleId = url.searchParams.get("roleId");
    const tenantId = url.searchParams.get("tenantId") ?? db.tenants[0].id;

    const { page, pageSize } = parsePagination(url);

    const members = db.memberships.filter((m) => m.tenantId === tenantId);
    const roleMap = new Map(db.roles.map((r) => [r.id, r]));

    let users = members
      .map((m) => {
        const user = db.users.find((u) => u.id === m.userId)!;
        return { ...user, role: roleMap.get(m.roleId) ?? null };
      })
      .filter(Boolean);

    if (roleId) users = users.filter((u) => u.role?.id === roleId);
    if (q) {
      users = users.filter(
        (u) => u.email.toLowerCase().includes(q) || u.name.toLowerCase().includes(q)
      );
    }

    const total = users.length;
    const start = (page - 1) * pageSize;
    return HttpResponse.json({ items: users.slice(start, start + pageSize), page, pageSize, total });
  }),

  http.post(`${CORE_BASE}/users`, async ({ request }) => {
    const session = requireAuth(request);
    if (!session) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json().catch(() => ({}))) as {
      email?: string;
      name?: string;
      roleId?: string;
      tenantId?: string;
    };

    const user = db.createUser({
      email: body.email ?? `user${db.users.length + 1}@acme.io`,
      name: body.name ?? "New User",
    });
    db.memberships.push({
      id: db.nextId("mem"),
      tenantId: body.tenantId ?? db.tenants[0].id,
      userId: user.id,
      roleId: body.roleId ?? db.roles[0].id,
    });

    return HttpResponse.json(user, { status: 201 });
  }),

  http.get(`${CORE_BASE}/users/:id`, ({ params, request }) => {
    const session = requireAuth(request);
    if (!session) return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    const user = db.users.find((u) => u.id === params.id);
    if (!user) return HttpResponse.json({ message: "Not found" }, { status: 404 });
    return HttpResponse.json(user);
  }),

  http.patch(`${CORE_BASE}/users/:id`, async ({ params, request }) => {
    const session = requireAuth(request);
    if (!session) return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user = db.users.find((u) => u.id === params.id);
    if (!user) return HttpResponse.json({ message: "Not found" }, { status: 404 });

    const body = (await request.json().catch(() => ({}))) as {
      email?: string;
      name?: string;
      roleId?: string;
    };

    if (body.email) user.email = body.email;
    if (body.name) user.name = body.name;
    if (body.roleId) {
      const membership = db.memberships.find((m) => m.userId === user.id);
      if (membership) membership.roleId = body.roleId;
    }

    return HttpResponse.json(user);
  }),

  http.delete(`${CORE_BASE}/users/:id`, ({ params, request }) => {
    const session = requireAuth(request);
    if (!session) return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });

    const idx = db.users.findIndex((u) => u.id === params.id);
    if (idx === -1) return HttpResponse.json({ message: "Not found" }, { status: 404 });

    db.users.splice(idx, 1);
    db.memberships = db.memberships.filter((m) => m.userId !== params.id);
    return HttpResponse.json({ ok: true });
  }),

  http.get(`${CORE_BASE}/roles`, ({ request }) => {
    const session = requireAuth(request);
    if (!session) return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    return HttpResponse.json({ items: db.roles });
  }),

  http.put(`${CORE_BASE}/roles/:id/permissions`, async ({ params, request }) => {
    const session = requireAuth(request);
    if (!session) return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });

    const role = db.roles.find((r) => r.id === params.id);
    if (!role) return HttpResponse.json({ message: "Not found" }, { status: 404 });

    const body = (await request.json().catch(() => ({}))) as { permissions?: string[] };
    role.permissions = body.permissions ?? [];
    return HttpResponse.json(role);
  }),

  http.get(`${CORE_BASE}/audit-logs`, ({ request }) => {
    const session = requireAuth(request);
    if (!session) return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });

    const url = new URL(request.url);
    const { page, pageSize } = parsePagination(url);
    const action = url.searchParams.get("action");
    const userId = url.searchParams.get("userId");
    const q = (url.searchParams.get("q") ?? "").toLowerCase();

    let items = [...db.auditLogs];
    if (action) items = items.filter((log) => log.action === action);
    if (userId) items = items.filter((log) => log.actorUserId === userId);
    if (q) items = items.filter((log) => log.summary.toLowerCase().includes(q));

    const total = items.length;
    const start = (page - 1) * pageSize;
    return HttpResponse.json({ items: items.slice(start, start + pageSize), page, pageSize, total });
  }),

  http.post(`${CORE_BASE}/auth/forgot-password`, async () => {
    return HttpResponse.json({ ok: true });
  }),

  http.all(`${CORE_BASE}/*`, () =>
    HttpResponse.json({ message: "Not implemented" }, { status: 501 })
  ),
];
