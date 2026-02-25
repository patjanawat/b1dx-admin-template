"use client";

import { AppShell, Button } from "@b1dx/ui";
import { brand, getBreadcrumbs, navGroups } from "@/appShellConfig";
import { ProtectedRoute } from "@/lib/auth/ProtectedRoute";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";

type ProtectedLayoutProps = {
  children: ReactNode;
};

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const breadcrumbs = useMemo(() => getBreadcrumbs(pathname), [pathname]);

  const LinkAdapter = useMemo(
    () =>
      ({ href, className, children }: { href: string; className?: string; children: ReactNode }) => (
        <Link href={href} className={className}>
          {children}
        </Link>
      ),
    []
  );

  return (
    <ProtectedRoute>
      <AppShell
        brand={brand}
        navGroups={navGroups}
        activeHref={pathname}
        breadcrumbs={breadcrumbs}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        LinkComponent={LinkAdapter}
        topRightSlot={
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? "Expand" : "Collapse"}
          </Button>
        }
      >
        {children}
      </AppShell>
    </ProtectedRoute>
  );
}
