import { ApiRequestError, coreRequest } from "@/lib/api/apiRequest";
import { getAccessToken } from "./authStore";
import type { AuthUser } from "./authStore";
import { toHeaders } from "@/lib/http/headers";
import type { RequestInit } from "undici";

// ─── BE response envelope ───────────────────────────────────────────────────

type AuthEnvelope<T> = {
  success: boolean;
  correlationId: string;
  data: T | null;
  error: {
    code: string;
    message: string;
    details: Array<{ field: string; issue: string }> | null;
  } | null;
};

// ─── Auth-specific error ────────────────────────────────────────────────────

export class AuthError extends Error {
  code: string;
  httpStatus: number;

  constructor(code: string, message: string, httpStatus: number) {
    super(message);
    this.name = "AuthError";
    this.code = code;
    this.httpStatus = httpStatus;
  }
}

// ─── Shared types ───────────────────────────────────────────────────────────

type DeviceInfo = {
  deviceId?: string;
  userAgent?: string;
};

export type LoginData = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  refreshToken: string;
  refreshExpiresIn: number;
  user: AuthUser;
};

// ─── Envelope-unwrapping request helper ────────────────────────────────────

async function authRequest<T>(path: string, init?: RequestInit): Promise<T> {
  try {
    const envelope = await coreRequest<AuthEnvelope<T>>(path, init as Parameters<typeof coreRequest>[1]);
    if (!envelope.success || envelope.data === null) {
      const code = envelope.error?.code ?? "AUTH_INTERNAL_ERROR";
      const msg = envelope.error?.message ?? "Unknown error";
      throw new AuthError(code, msg, 200);
    }
    return envelope.data;
  } catch (err) {
    if (err instanceof AuthError) throw err;
    if (err instanceof ApiRequestError) {
      const body = err.data as AuthEnvelope<T> | undefined;
      const code = body?.error?.code ?? "AUTH_INTERNAL_ERROR";
      const msg = body?.error?.message ?? err.message;
      throw new AuthError(code, msg, err.status);
    }
    throw err;
  }
}

// ─── Auth header helper ─────────────────────────────────────────────────────

const withAuth = (init?: RequestInit): RequestInit => {
  const headers = toHeaders(init?.headers);
  const token = getAccessToken();
  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }
  return { ...init, headers };
};

// ─── Auth API ───────────────────────────────────────────────────────────────

export const authApi = {
  login: (payload: {
    username: string;
    password: string;
    device?: DeviceInfo;
    requestedWarehouseId?: number;
  }) =>    
    authRequest<LoginData>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  refresh: (payload: { refreshToken: string; device?: DeviceInfo }) =>
    authRequest<LoginData>("/api/auth/refresh", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  logout: (payload: { refreshToken: string; device?: DeviceInfo }) =>
    authRequest<null>("/api/auth/logout", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  me: () => authRequest<AuthUser>("/api/auth/me", withAuth()),

  // Not in v2 spec — retained for ForgotPasswordForm compatibility
  forgotPassword: (payload: { email: string }) =>
    coreRequest<{ ok: boolean }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
