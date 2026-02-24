type Tenant = {
  id: string;
  name: string;
};

type User = {
  id: string;
  email: string;
  name: string;
};

type Membership = {
  id: string;
  tenantId: string;
  userId: string;
  roleId: string;
};

type Role = {
  id: string;
  name: string;
  permissions: string[];
};

type AuditLog = {
  id: string;
  action: string;
  actorUserId: string;
  summary: string;
  createdAt: string;
};

type Session = {
  id: string;
  userId: string;
  refreshToken: string;
  accessToken: string;
  createdAt: string;
};

const nowIso = () => new Date().toISOString();

const createId = (prefix: string, seed: number) => `${prefix}_${seed}`;

let counter = 1;

const nextId = (prefix: string) => {
  const id = createId(prefix, counter);
  counter += 1;
  return id;
};

const tenants: Tenant[] = [{ id: nextId("tenant"), name: "Acme Corp" }];

const roles: Role[] = [
  {
    id: nextId("role"),
    name: "Admin",
    permissions: ["users:read", "users:write", "roles:write", "audit:read"],
  },
  {
    id: nextId("role"),
    name: "Viewer",
    permissions: ["users:read", "audit:read"],
  },
];

const users: User[] = [
  { id: nextId("user"), email: "admin@acme.io", name: "Admin User" },
  { id: nextId("user"), email: "ops@acme.io", name: "Ops User" },
  { id: nextId("user"), email: "viewer@acme.io", name: "Viewer User" },
];

let memberships: Membership[] = [
  {
    id: nextId("mem"),
    tenantId: tenants[0].id,
    userId: users[0].id,
    roleId: roles[0].id,
  },
  {
    id: nextId("mem"),
    tenantId: tenants[0].id,
    userId: users[1].id,
    roleId: roles[0].id,
  },
  {
    id: nextId("mem"),
    tenantId: tenants[0].id,
    userId: users[2].id,
    roleId: roles[1].id,
  },
];

let auditLogs: AuditLog[] = Array.from({ length: 25 }, (_, idx) => ({
  id: nextId("audit"),
  action: idx % 2 === 0 ? "user.invited" : "role.updated",
  actorUserId: users[idx % users.length].id,
  summary: `Audit event ${idx + 1}`,
  createdAt: nowIso(),
}));

let sessions: Session[] = [];

const createUser = (payload: { email: string; name: string }): User => {
  const user = { id: nextId("user"), ...payload };
  users.push(user);
  auditLogs = [
    {
      id: nextId("audit"),
      action: "user.created",
      actorUserId: user.id,
      summary: `User ${user.email} created`,
      createdAt: nowIso(),
    },
    ...auditLogs,
  ];
  return user;
};

const createSession = (userId: string): Session => {
  const session: Session = {
    id: nextId("session"),
    userId,
    refreshToken: `refresh_${Math.random().toString(36).slice(2)}`,
    accessToken: `access_${Math.random().toString(36).slice(2)}`,
    createdAt: nowIso(),
  };
  sessions.push(session);
  return session;
};

const rotateSession = (refreshToken: string): Session | null => {
  const idx = sessions.findIndex((s) => s.refreshToken === refreshToken);
  if (idx === -1) return null;
  const current = sessions[idx];
  const next = {
    ...current,
    refreshToken: `refresh_${Math.random().toString(36).slice(2)}`,
    accessToken: `access_${Math.random().toString(36).slice(2)}`,
  };
  sessions[idx] = next;
  return next;
};

const invalidateSession = (refreshToken: string) => {
  sessions = sessions.filter((s) => s.refreshToken !== refreshToken);
};

const getUserProfile = (userId: string) => {
  const user = users.find((u) => u.id === userId);
  if (!user) return null;
  const membership = memberships.find((m) => m.userId === userId) ?? null;
  const role = roles.find((r) => r.id === membership?.roleId) ?? null;
  return {
    ...user,
    membership,
    role,
  };
};

export const db = {
  tenants,
  users,
  roles,
  auditLogs,
  sessions,
  memberships,
  nextId,
  createUser,
  createSession,
  rotateSession,
  invalidateSession,
  getUserProfile,
};
