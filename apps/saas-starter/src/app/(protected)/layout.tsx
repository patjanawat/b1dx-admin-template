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
  const pageTitle = breadcrumbs[breadcrumbs.length - 1]?.label ?? brand.title;
  const notificationsMenu = useMemo(
    () => (
      <div className="w-72 rounded-xl border border-border bg-popover shadow-2xl">
        <div className="border-b border-border px-4 py-3 text-sm font-semibold text-foreground">
          Notifications
        </div>
        <div className="px-4 py-3 text-sm text-muted-foreground">
          No new notifications.
        </div>
      </div>
    ),
    []
  );
  const userMenu = useMemo(
    () => (
      <div className="w-56 rounded-xl border border-border bg-popover shadow-2xl">
        <div className="border-b border-border px-4 py-3">
          <p className="text-sm font-semibold text-foreground">Demo User</p>
          <p className="text-xs text-muted-foreground">demo@saas.local</p>
        </div>
        <div className="p-2">
          <button
            type="button"
            className="flex w-full items-center rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
          >
            Profile
          </button>
          <button
            type="button"
            className="mt-1 flex w-full items-center rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
          >
            Settings
          </button>
          <button
            type="button"
            className="mt-2 flex w-full items-center justify-center rounded-md bg-destructive/10 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-destructive transition hover:bg-destructive hover:text-destructive-foreground"
          >
            Sign out
          </button>
        </div>
      </div>
    ),
    []
  );

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
        title: pageTitle,
        actions: (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? "Expand" : "Collapse"}
          </Button>
        ),
        notifications: notificationsMenu,
        userMenu,
        search: {
          placeholder: "Search",
        },
      },
    }),
    [pathname, breadcrumbs, collapsed, pageTitle, renderLink, notificationsMenu, userMenu]
  );

  return (
    <ProtectedRoute>
      <AppShell config={config}>
        {children}
      </AppShell>
    </ProtectedRoute>
  );
}
