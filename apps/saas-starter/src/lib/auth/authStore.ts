export type AuthUser = {
  id: string;
  email: string;
  name: string;
  membership?: unknown;
  role?: unknown;
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
  return () => listeners.delete(listener);
};

export const getAuthSnapshot = (): AuthState => ({ ...state });
