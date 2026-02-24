import "@b1dx/theme/styles/base.css";
import "../styles/globals.css";
import { QueryProvider } from "@/lib/query/QueryProvider";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { ServerErrorsProvider } from "@/lib/errors/server-errors-context";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "SaaS Starter",
  description: "SaaS Starter - App Router Skeleton",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <ServerErrorsProvider>
          <QueryProvider>
            <AuthProvider>{children}</AuthProvider>
          </QueryProvider>
        </ServerErrorsProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
