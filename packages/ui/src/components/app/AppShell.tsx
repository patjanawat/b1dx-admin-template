import React from 'react';

import type {
  Brand,
  BreadcrumbItem,
  LinkComponent,
  NavGroup,
} from './appShellTypes';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export interface AppShellProps {
  brand: Brand;
  navGroups: NavGroup[];
  activeHref?: string;
  breadcrumbs?: BreadcrumbItem[];
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  LinkComponent: LinkComponent;
  /** Rendered in the top-right of the TopBar (e.g. theme switcher, user menu). */
  topRightSlot?: React.ReactNode;
  children: React.ReactNode;
}

export const AppShell = ({
  brand,
  navGroups,
  activeHref,
  breadcrumbs,
  collapsed,
  onCollapsedChange: _onCollapsedChange,
  LinkComponent,
  topRightSlot,
  children,
}: AppShellProps) => {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <div className="hidden md:flex md:shrink-0">
        <Sidebar
          brand={brand}
          navGroups={navGroups}
          activeHref={activeHref}
          collapsed={collapsed}
          LinkComponent={LinkComponent}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          breadcrumbs={breadcrumbs ?? []}
          rightSlot={topRightSlot}
          LinkComponent={LinkComponent}
        />
        <main className="flex-1 px-6 py-6">{children}</main>
      </div>
    </div>
  );
};
