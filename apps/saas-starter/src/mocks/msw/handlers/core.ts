import { db } from "../db";
import { http, HttpResponse } from "msw";

const CORE_BASE = "/gateway/proxy/core";
const REFRESH_COOKIE = "b1dx_refresh";

const getCookieValue = (req: Request, name: string): string | null => {
  const cookie = req.headers.get("cookie") ?? "";
  const match = cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
};

const setRefreshCookie = (token: string): string =>
  `${REFRESH_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax`;

const clearRefreshCookie = (): string =>
  `${REFRESH_COOKIE}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`;

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

export const coreHandlers = [
  http.post(`${CORE_BASE}/auth/login`, async ({ request }) => {
    const body = (await request.json().catch(() => ({}))) as {
      email?: string;
      password?: string;
    };
    const email = body.email ?? "user@acme.io";
    let user = db.users.find((u) => u.email === email);
    if (!user) {
      user = db.createUser({ email, name: "New User" });
      db.memberships.push({
        id: db.nextId("mem"),
        tenantId: db.tenants[0].id,
        userId: user.id,
        roleId: db.roles[0].id,
      });
    }

    const session = db.createSession(user.id);
    const me = db.getUserProfile(user.id);

    return HttpResponse.json(
      {
        accessToken: session.accessToken,
        me,
      },
      {
        headers: {
          "set-cookie": setRefreshCookie(session.refreshToken),
        },
      }
    );
  }),

  http.post(`${CORE_BASE}/auth/refresh`, async ({ request }) => {
    const refreshToken = getCookieValue(request, REFRESH_COOKIE);
    if (!refreshToken) {
      return HttpResponse.json(
        { message: "Missing refresh token." },
        { status: 401 }
      );
    }

    const session = db.rotateSession(refreshToken);
    if (!session) {
      return HttpResponse.json(
        { message: "Invalid refresh token." },
        { status: 401 }
      );
    }

    return HttpResponse.json(
      { accessToken: session.accessToken },
      {
        headers: {
          "set-cookie": setRefreshCookie(session.refreshToken),
        },
      }
    );
  }),

  http.post(`${CORE_BASE}/auth/logout`, async ({ request }) => {
    const refreshToken = getCookieValue(request, REFRESH_COOKIE);
    if (refreshToken) {
      db.invalidateSession(refreshToken);
    }
    return HttpResponse.json(
      { ok: true },
      {
        headers: {
          "set-cookie": clearRefreshCookie(),
        },
      }
    );
  }),

  http.get(`${CORE_BASE}/auth/me`, ({ request }) => {
    const session = requireAuth(request);
    if (!session) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const me = db.getUserProfile(session.userId);
    return HttpResponse.json(me);
  }),

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
        return {
          ...user,
          role: roleMap.get(m.roleId) ?? null,
        };
      })
      .filter(Boolean);

    if (roleId) {
      users = users.filter((u) => u.role?.id === roleId);
    }

    if (q) {
      users = users.filter(
        (u) => u.email.toLowerCase().includes(q) || u.name.toLowerCase().includes(q)
      );
    }

    const total = users.length;
    const start = (page - 1) * pageSize;
    const items = users.slice(start, start + pageSize);

    return HttpResponse.json({ items, page, pageSize, total });
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
    if (!session) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = db.users.find((u) => u.id === params.id);
    if (!user) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }
    return HttpResponse.json(user);
  }),

  http.patch(`${CORE_BASE}/users/:id`, async ({ params, request }) => {
    const session = requireAuth(request);
    if (!session) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = db.users.find((u) => u.id === params.id);
    if (!user) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }

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
    if (!session) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const idx = db.users.findIndex((u) => u.id === params.id);
    if (idx === -1) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }

    db.users.splice(idx, 1);
    db.memberships = db.memberships.filter((m) => m.userId !== params.id);
    return HttpResponse.json({ ok: true });
  }),

  http.get(`${CORE_BASE}/roles`, ({ request }) => {
    const session = requireAuth(request);
    if (!session) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return HttpResponse.json({ items: db.roles });
  }),

  http.put(`${CORE_BASE}/roles/:id/permissions`, async ({ params, request }) => {
    const session = requireAuth(request);
    if (!session) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const role = db.roles.find((r) => r.id === params.id);
    if (!role) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }

    const body = (await request.json().catch(() => ({}))) as {
      permissions?: string[];
    };

    role.permissions = body.permissions ?? [];
    return HttpResponse.json(role);
  }),

  http.get(`${CORE_BASE}/audit-logs`, ({ request }) => {
    const session = requireAuth(request);
    if (!session) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const { page, pageSize } = parsePagination(url);
    const action = url.searchParams.get("action");
    const userId = url.searchParams.get("userId");
    const q = (url.searchParams.get("q") ?? "").toLowerCase();

    let items = [...db.auditLogs];
    if (action) items = items.filter((log) => log.action === action);
    if (userId) items = items.filter((log) => log.actorUserId === userId);
    if (q) {
      items = items.filter((log) => log.summary.toLowerCase().includes(q));
    }

    const total = items.length;
    const start = (page - 1) * pageSize;
    const paged = items.slice(start, start + pageSize);

    return HttpResponse.json({ items: paged, page, pageSize, total });
  }),

  http.all(`${CORE_BASE}/*`, () =>
    HttpResponse.json({ message: "Not implemented" }, { status: 501 })
  ),
];
