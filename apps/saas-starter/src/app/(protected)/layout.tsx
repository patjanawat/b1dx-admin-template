"use client";

import { AppShell, Button } from "@b1dx/ui";
import type { AppShellConfig, RenderLinkFn } from "@b1dx/ui";
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

  // Stable renderLink — no deps, Next.js <Link> is always the same component.
  const renderLink = useMemo<RenderLinkFn>(
    () =>
      ({ href, className, 'aria-label': ariaLabel, children: linkChildren }) => (
        <Link href={href} className={className} aria-label={ariaLabel}>
          {linkChildren}
        </Link>
      ),
    []
  );

  const config: AppShellConfig = useMemo(
    () => ({
      brand,
      navGroups,
      activeHref: pathname,
      breadcrumbs,
      collapsed,
      onCollapsedChange: setCollapsed,
      renderLink,
      topBar: {
        rightSlot: (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? "Expand" : "Collapse"}
          </Button>
        ),
      },
    }),
    [pathname, breadcrumbs, collapsed, renderLink]
  );

  return (
    <ProtectedRoute>
      <AppShell config={config}>
        {children}
      </AppShell>
    </ProtectedRoute>
  );
}
