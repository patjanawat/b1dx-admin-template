import "@b1dx/theme/styles/base.css";
import "../styles/globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

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
        {/* Providers placeholder */}
        {children}
      </body>
    </html>
  );
}
