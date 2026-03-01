"use client";

import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "./authApi";
import {
  clearAuth,
  getAccessToken,
  getAuthSnapshot,
  getStoredRefreshToken,
  setAccessToken,
  setAuthUser,
  setStoredRefreshToken,
  subscribeAuth,
} from "./authStore";
import type { AuthUser } from "./authStore";

type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

type AuthContextValue = {
  status: AuthStatus;
  user: AuthUser | null;
  accessToken: string | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
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

  useEffect(() => subscribeAuth(setSnapshot), []);

  useEffect(() => {
    let active = true;

    const bootstrap = async () => {
      setStatus("loading");

      const storedRefreshToken = getStoredRefreshToken();
      if (!storedRefreshToken) {
        setStatus("unauthenticated");
        return;
      }

      try {
        const data = await authApi.refresh({ refreshToken: storedRefreshToken });
        if (!active) return;
        setAccessToken(data.accessToken);
        setStoredRefreshToken(data.refreshToken);
        setAuthUser(data.user);
        setStatus("authenticated");
      } catch {
        if (!active) return;
        clearAuth();
        setStoredRefreshToken(null);
        setStatus("unauthenticated");
      }
    };

    void bootstrap();

    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (credentials: { username: string; password: string }) => {
    const data = await authApi.login(credentials);
    setAccessToken(data.accessToken);
    setStoredRefreshToken(data.refreshToken);
    setAuthUser(data.user);
    setStatus("authenticated");
  }, []);

  const logout = useCallback(async () => {
    const storedRefreshToken = getStoredRefreshToken();
    try {
      if (storedRefreshToken) {
        await authApi.logout({ refreshToken: storedRefreshToken });
      }
    } catch {
      // ignore server errors — always clear client state
    }
    clearAuth();
    setStoredRefreshToken(null);
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
