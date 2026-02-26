import type { RequestInit } from "undici";
import { coreRequest } from "@/lib/api/apiRequest";
import { getAccessToken } from "./authStore";
import type { AuthUser } from "./authStore";
import { toHeaders } from "@/lib/http/headers";

type LoginResponse = {
  accessToken: string;
  me: AuthUser;
};

type RefreshResponse = {
  accessToken: string;
};

const withAuth = (init?: RequestInit): RequestInit => {
  const headers = toHeaders(init?.headers);
  const token = getAccessToken();
  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }
  return { ...init, headers };
};

export const authApi = {
  login: (payload: { email: string; password: string; rememberMe?: boolean }) =>
    coreRequest<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  refresh: () =>
    coreRequest<RefreshResponse>("/auth/refresh", {
      method: "POST",
    }),
  logout: () =>
    coreRequest<{ ok: boolean }>("/auth/logout", {
      method: "POST",
    }),
  me: () => coreRequest<AuthUser>("/auth/me", withAuth()),
  forgotPassword: (payload: { email: string }) =>
    coreRequest<{ ok: boolean }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
