"use client";

import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ProblemDetails } from "./problemDetails";

type FieldErrorMap = Record<string, string[]>;

type ServerErrorsContextValue = {
  errors: FieldErrorMap;
  setProblem: (problem: ProblemDetails | null) => void;
  clear: () => void;
};

const ServerErrorsContext = createContext<ServerErrorsContextValue | null>(null);

type ServerErrorsProviderProps = {
  children: ReactNode;
};

/**
 * Minimal server error state holder for mapping ProblemDetails to form fields.
 * RHF integration can be built on top of the `errors` map.
 */
export function ServerErrorsProvider({ children }: ServerErrorsProviderProps) {
  const [problem, setProblem] = useState<ProblemDetails | null>(null);

  const clear = useCallback(() => setProblem(null), []);

  const value = useMemo<ServerErrorsContextValue>(
    () => ({
      errors: problem?.errors ?? {},
      setProblem,
      clear,
    }),
    [problem, clear]
  );

  return (
    <ServerErrorsContext.Provider value={value}>
      {children}
    </ServerErrorsContext.Provider>
  );
}

/**
 * Access the current server-side field error map.
 */
export function useServerErrors() {
  const ctx = useContext(ServerErrorsContext);
  if (!ctx) {
    throw new Error("useServerErrors must be used within ServerErrorsProvider");
  }
  return ctx;
}

/**
 * Placeholder mapper for RHF or other form libs.
 */
export const mapProblemDetailsToFieldErrors = (
  problem: ProblemDetails | null
): FieldErrorMap => problem?.errors ?? {};
