import React from 'react';

import { Button } from '../ui/Button';
import { DialogOverlay } from '../ui/Dialog';
import { Sidebar } from './Sidebar';
import type { Brand, BreadcrumbItem, LinkComponent, NavGroup } from './types';

export interface AppShellProps {
  brand: Brand;
  navGroups: NavGroup[];
  activeHref?: string;
  breadcrumbs?: BreadcrumbItem[];
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  LinkComponent: LinkComponent;
  topRightSlot?: React.ReactNode;
  children: React.ReactNode;
}

const TopBarPlaceholder = ({
  breadcrumbs,
  onMenuClick,
  topRightSlot,
  LinkComponent
}: {
  breadcrumbs?: BreadcrumbItem[];
  onMenuClick: () => void;
  topRightSlot?: React.ReactNode;
  LinkComponent: LinkComponent;
}) => {
  const Link = LinkComponent;

  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="md:hidden"
          onClick={onMenuClick}
        >
          Menu
        </Button>
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          {(breadcrumbs ?? []).map((item, index) => (
            <React.Fragment key={`${item.label}-${index}`}>
              {index > 0 ? <span>/</span> : null}
              {item.href ? (
                <Link href={item.href} className="text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-slate-50">
                  {item.label}
                </Link>
              ) : (
                <span className="text-slate-700 dark:text-slate-200">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3">{topRightSlot}</div>
    </header>
  );
};

export const AppShell = ({
  brand,
  navGroups,
  activeHref,
  breadcrumbs,
  collapsed,
  onCollapsedChange,
  LinkComponent,
  topRightSlot,
  children
}: AppShellProps) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div
      className="flex min-h-screen w-full bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50"
      style={{ background: 'var(--background)', color: 'var(--foreground)' }}
    >
      <div className="hidden md:block">
        <Sidebar
          brand={brand}
          navGroups={navGroups}
          activeHref={activeHref}
          collapsed={collapsed}
          LinkComponent={LinkComponent}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBarPlaceholder
          breadcrumbs={breadcrumbs}
          onMenuClick={() => setMobileOpen(true)}
          topRightSlot={topRightSlot}
          LinkComponent={LinkComponent}
        />
        <div className="flex items-center gap-2 px-4 pt-3 md:hidden">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onCollapsedChange(!collapsed)}
          >
            {collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          </Button>
        </div>
        <main className="flex-1 px-6 py-6">{children}</main>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <DialogOverlay onClick={() => setMobileOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-50 w-72 bg-white p-4 shadow-lg dark:bg-slate-950">
            <div className="flex items-center justify-between pb-4">
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                {brand.title}
              </div>
              <Button type="button" variant="ghost" size="sm" onClick={() => setMobileOpen(false)}>
                Close
              </Button>
            </div>
            <Sidebar
              brand={brand}
              navGroups={navGroups}
              activeHref={activeHref}
              collapsed={false}
              LinkComponent={LinkComponent}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
