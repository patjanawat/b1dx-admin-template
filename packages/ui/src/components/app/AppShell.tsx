import React from 'react';

import type { AppShellConfig } from './appShellTypes';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export interface AppShellProps {
  config: AppShellConfig;
  children: React.ReactNode;
}

/**
 * Root layout shell.
 *
 * Structure (ported from vendor/admin-template/components/Layout.tsx):
 *
 *   ┌─────────────────────────────────────────────────┐  h-screen
 *   │  <Sidebar>          │  <TopBar>                  │  shrink-0 header
 *   │  (self-managing     ├────────────────────────────┤
 *   │   width)            │  <main>  overflow-y-auto   │  flex-1 scroll
 *   │                     │    max-w-[1400px] container │
 *   └─────────────────────┴────────────────────────────┘
 */
export const AppShell = ({ config, children }: AppShellProps) => {
  const {
    brand,
    navGroups,
    activeHref,
    breadcrumbs,
    collapsed,
    onCollapsedChange,
    renderLink,
    topBar,
  } = config;

  return (
    // Vendor: "flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-200"
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-200">

      {/* Left column — Sidebar manages its own width via isCollapsed */}
      <Sidebar
        brand={brand}
        nav={navGroups}
        currentPath={activeHref}
        isCollapsed={collapsed}
        onToggleCollapsed={() => onCollapsedChange(!collapsed)}
        renderLink={renderLink}
      />

      {/* Right column — stacks TopBar above the scrollable main area */}
      {/* Vendor: "flex-1 flex flex-col min-w-0 overflow-hidden relative" */}
      <div className="relative flex flex-1 flex-col min-w-0 overflow-hidden">

        <TopBar
          breadcrumbs={breadcrumbs ?? []}
          rightSlot={topBar?.rightSlot}
          renderLink={renderLink}
        />

        {/* Main content — the ONLY scroll region in the shell */}
        {/* Vendor: "flex-1 overflow-y-auto p-4 md:p-8 bg-background" */}
        <main className="flex-1 overflow-y-auto bg-background p-4 md:p-8">
          {/* Vendor: "max-w-[1400px] mx-auto w-full space-y-8" */}
          <div className="mx-auto w-full max-w-[1400px] space-y-8">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};
