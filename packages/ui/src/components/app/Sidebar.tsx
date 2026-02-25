import React from 'react';

import { cn } from '../../lib/cn';
import type { Brand, LinkComponent, NavGroup } from './appShellTypes';

export const SIDEBAR_WIDTH = 280;
export const SIDEBAR_COLLAPSED_WIDTH = 72;

export interface SidebarProps {
  brand: Brand;
  navGroups: NavGroup[];
  activeHref?: string;
  collapsed: boolean;
  LinkComponent: LinkComponent;
}

const isActive = (activeHref: string | undefined, itemHref: string) => {
  if (!activeHref) return false;
  if (itemHref === '/') return activeHref === '/';
  return activeHref === itemHref || activeHref.startsWith(`${itemHref}/`);
};

export const Sidebar = ({
  brand,
  navGroups,
  activeHref,
  collapsed,
  LinkComponent,
}: SidebarProps) => {
  const Link = LinkComponent;

  return (
    <aside
      className="flex h-full flex-col border-r border-border bg-background text-foreground transition-all duration-200"
      style={{ width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH }}
    >
      {/* Brand */}
      <div className={cn('flex items-center gap-3 px-4 pt-5', collapsed && 'justify-center')}>
        {brand.logo ? <div className="h-9 w-9 shrink-0">{brand.logo}</div> : null}
        {!collapsed ? (
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{brand.title}</div>
            {brand.subtitle ? (
              <div className="truncate text-xs text-muted-foreground">{brand.subtitle}</div>
            ) : null}
          </div>
        ) : null}
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-5 px-3 py-5">
        {navGroups.map((group) => (
          <div key={group.id} className="flex flex-col gap-1">
            {!collapsed && group.label ? (
              <div className="px-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {group.label}
              </div>
            ) : null}

            {group.items.map((item) => {
              if (!item.href) return null;
              const active = isActive(activeHref, item.href);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-label={collapsed ? item.label : undefined}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition',
                    collapsed && 'justify-center',
                    active
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  {item.icon ? <span className="shrink-0">{item.icon}</span> : null}
                  {!collapsed ? <span className="truncate">{item.label}</span> : null}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
};
