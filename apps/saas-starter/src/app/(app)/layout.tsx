"use client";

import { AppShell, Button } from "@b1dx/ui";
import type { AppShellConfig, RenderLinkFn } from "@b1dx/ui";
import { baseAppShellConfig, getBreadcrumbs } from "@/appShellConfig";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const breadcrumbs = useMemo(() => getBreadcrumbs(pathname), [pathname]);
  const pageTitle = breadcrumbs[breadcrumbs.length - 1]?.label ?? baseAppShellConfig.brand.title;

  const renderLink = useMemo<RenderLinkFn>(
    () =>
      ({ href, className, 'aria-label': ariaLabel, children: linkChildren }) => (
        <Link href={href} className={className} aria-label={ariaLabel}>
          {linkChildren}
        </Link>
      ),
    []
  );

  const appShellConfig = useMemo<AppShellConfig>(
    () => ({
      ...baseAppShellConfig,
      activeHref: pathname,
      breadcrumbs,
      collapsed,
      onCollapsedChange: setCollapsed,
      renderLink,
      topBar: {
        ...baseAppShellConfig.topBar,
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
      },
    }),
    [pathname, breadcrumbs, collapsed, pageTitle, renderLink]
  );

  return <AppShell config={appShellConfig}>{children}</AppShell>;
}
