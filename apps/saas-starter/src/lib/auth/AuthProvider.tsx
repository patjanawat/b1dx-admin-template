"use client";

import { ApiRequestError } from "@/lib/api/apiRequest";
import { useServerErrors } from "@/lib/errors/server-errors-context";
import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "./authApi";
import {
  clearAuth,
  getAccessToken,
  getAuthSnapshot,
  setAccessToken,
  setAuthUser,
  subscribeAuth,
} from "./authStore";
import type { AuthUser } from "./authStore";

type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

type AuthContextValue = {
  status: AuthStatus;
  user: AuthUser | null;
  accessToken: string | null;
  login: (credentials: { email: string; password: string; rememberMe?: boolean }) => Promise<void>;
  logout: () => Promise<void>;
  setAccessToken: (token: string | null) => void;
  clearAuth: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [snapshot, setSnapshot] = useState(getAuthSnapshot);
  const [status, setStatus] = useState<AuthStatus>("idle");
  const { setProblem, clear } = useServerErrors();

  useEffect(() => subscribeAuth(setSnapshot), []);

  useEffect(() => {
    let active = true;

    const bootstrap = async () => {
      setStatus("loading");
      clear();

      try {
        const me = await authApi.me();
        if (!active) return;
        setAuthUser(me);
        setStatus("authenticated");
        return;
      } catch (err) {
        if (!active) return;

        if (err instanceof ApiRequestError && err.status === 401) {
          try {
            const refreshed = await authApi.refresh();
            if (!active) return;
            setAccessToken(refreshed.accessToken);
            const me = await authApi.me();
            if (!active) return;
            setAuthUser(me);
            setStatus("authenticated");
            return;
          } catch (refreshErr) {
            if (!active) return;
            clearAuth();
            setStatus("unauthenticated");
            if (refreshErr instanceof ApiRequestError && refreshErr.problem) {
              setProblem(refreshErr.problem);
            }
            return;
          }
        }

        clearAuth();
        setStatus("unauthenticated");
        if (err instanceof ApiRequestError && err.problem) {
          setProblem(err.problem);
        }
      }
    };

    void bootstrap();

    return () => {
      active = false;
    };
  }, [clear, setProblem]);

  const login = useCallback(
    async (credentials: { email: string; password: string; rememberMe?: boolean }) => {
      const data = await authApi.login(credentials);
      setAccessToken(data.accessToken);
      setAuthUser(data.me);
      setStatus("authenticated");
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore server errors — always clear client state
    }
    clearAuth();
    setStatus("unauthenticated");
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user: snapshot.user,
      accessToken: snapshot.accessToken ?? getAccessToken(),
      login,
      logout,
      setAccessToken,
      clearAuth,
    }),
    [snapshot, status, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
