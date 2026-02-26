"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

const isMockEnabled = process.env.NEXT_PUBLIC_MSW === "1";

export function MockProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(!isMockEnabled);

  useEffect(() => {
    if (!isMockEnabled) return;
    import("@/mocks/msw")
      .then((mod) => mod.startMocking())
      .then(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
