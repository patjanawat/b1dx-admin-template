"use client";

import { coreRequest } from "@/lib/api/apiRequest";
import { getAccessToken } from "@/lib/auth/authStore";
import { toHeaders } from "@/lib/http/headers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useState } from "react";
import type { RequestInit } from "undici";

type QueryProviderProps = {
  children: ReactNode;
};

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
        queryFn: async ({ queryKey }) => {
          const [scope, path, init] = queryKey as [
            string,
            string,
            RequestInit | undefined,
          ];
          if (scope !== "core" || typeof path !== "string") {
            throw new Error("Invalid query key. Expected ['core', path].");
          }

          const headers = toHeaders(init?.headers);
          const token = getAccessToken();
          if (token) {
            headers.set("authorization", `Bearer ${token}`);
          }

          return coreRequest(path, { ...init, headers });
        },
      },
      mutations: {
        retry: 0,
      },
    },
  });

export function QueryProvider({ children }: QueryProviderProps) {
  const [client] = useState(createQueryClient);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
