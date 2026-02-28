export type AuthUser = {
  userId: string;
  username: string;
  displayName: string;
  status: "ACTIVE" | "LOCKED" | "SUSPENDED";
  tenantId: string | null;
  tenantCode: string | null;
  level: string | null;
  roles: string[];
  warehouseIds: number[];
  brandIds: string[];
  shopIds: string[];
};

type AuthState = {
  accessToken: string | null;
  user: AuthUser | null;
};

type Listener = (state: AuthState) => void;

const state: AuthState = {
  accessToken: null,
  user: null,
};

const listeners = new Set<Listener>();

const emit = () => {
  for (const listener of listeners) {
    listener({ ...state });
  }
};

export const getAccessToken = () => state.accessToken;

export const setAccessToken = (token: string | null) => {
  state.accessToken = token;
  emit();
};

export const setAuthUser = (user: AuthUser | null) => {
  state.user = user;
  emit();
};

export const clearAuth = () => {
  state.accessToken = null;
  state.user = null;
  emit();
};

export const subscribeAuth = (listener: Listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const getAuthSnapshot = (): AuthState => ({ ...state });

// Refresh token persistence (localStorage)
const RT_KEY = "b1dx_rft";

export const getStoredRefreshToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(RT_KEY);
};

export const setStoredRefreshToken = (token: string | null) => {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem(RT_KEY, token);
  } else {
    localStorage.removeItem(RT_KEY);
  }
};
