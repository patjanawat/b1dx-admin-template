import { ProtectedRoute } from "@/lib/auth/ProtectedRoute";
import Link from "next/link";
import type { ReactNode } from "react";

type ProtectedLayoutProps = {
  children: ReactNode;
};

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const showKitchenSink = process.env.NODE_ENV !== "production";

  return (
    <ProtectedRoute>
      <section className="space-y-6 p-6">
        <header className="space-y-3">
          <h1 className="text-2xl font-semibold">Protected Area</h1>
          <nav className="flex flex-wrap gap-3 text-sm">
            <Link className="text-blue-600 hover:underline" href="/users">
              Users
            </Link>
            <Link className="text-blue-600 hover:underline" href="/rbac">
              RBAC
            </Link>
            <Link className="text-blue-600 hover:underline" href="/audit-logs">
              Audit Logs
            </Link>
            {showKitchenSink ? (
              <Link className="text-blue-600 hover:underline" href="/ui-kitchen-sink">
                UI Kitchen Sink
              </Link>
            ) : null}
          </nav>
        </header>
        <div>{children}</div>
      </section>
    </ProtectedRoute>
  );
}
