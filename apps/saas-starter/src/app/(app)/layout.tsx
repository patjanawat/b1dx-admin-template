"use client";

import { AppShell } from "@b1dx/ui";
import type { AppShellConfig, RenderLinkFn } from "@b1dx/ui";
import { appShellConfig, useTranslatedNavGroups } from "@/appShellConfig";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";

type AppLayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const navGroups = useTranslatedNavGroups();

  const renderLink = useMemo<RenderLinkFn>(
    () =>
      ({ href, className, "aria-label": ariaLabel, children: linkChildren }) => (
        <Link href={href} className={className} aria-label={ariaLabel}>
          {linkChildren}
        </Link>
      ),
    []
  );

  const config = useMemo<AppShellConfig>(
    () => ({
      ...appShellConfig,
      navGroups,
      activeHref: pathname,
      collapsed,
      onCollapsedChange: setCollapsed,
      renderLink,
    }),
    [pathname, collapsed, renderLink, navGroups]
  );

  return <AppShell config={config}>{children}</AppShell>;
}
