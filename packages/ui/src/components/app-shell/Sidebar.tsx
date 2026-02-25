import React from 'react';

import type { Brand, LinkComponent, NavGroup } from './types';

export const SIDEBAR_WIDTH = 280;
export const SIDEBAR_COLLAPSED_WIDTH = 72;

interface SidebarProps {
  brand: Brand;
  navGroups: NavGroup[];
  activeHref?: string;
  collapsed: boolean;
  LinkComponent: LinkComponent;
}

const isActiveHref = (activeHref: string | undefined, itemHref: string) => {
  if (!activeHref) return false;
  if (itemHref === '/') return activeHref === '/';
  return activeHref === itemHref || activeHref.startsWith(`${itemHref}/`);
};

const Tooltip = ({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open ? (
        <div
          role="tooltip"
          className="pointer-events-none absolute left-full top-1/2 z-20 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md"
        >
          {label}
        </div>
      ) : null}
    </div>
  );
};

export const Sidebar = ({
  brand,
  navGroups,
  activeHref,
  collapsed,
  LinkComponent
}: SidebarProps) => {
  const Link = LinkComponent;

  return (
    <aside
      className="flex h-full flex-col gap-6 border-r border-border bg-background text-foreground transition-all duration-200"
      style={{ width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH }}
    >
      <div className={`flex items-center gap-3 px-4 pt-5 ${collapsed ? 'justify-center' : ''}`}>
        {brand.logo ? <div className="h-9 w-9">{brand.logo}</div> : null}
        {!collapsed ? (
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{brand.title}</div>
            {brand.subtitle ? (
              <div className="truncate text-xs text-muted-foreground">{brand.subtitle}</div>
            ) : null}
          </div>
        ) : null}
      </div>

      <nav className="flex flex-1 flex-col gap-5 px-3 pb-5">
        {navGroups.map((group) => (
          <div key={group.id} className="flex flex-col gap-2">
            {!collapsed && group.label ? (
              <div className="px-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {group.label}
              </div>
            ) : null}
            <div className="flex flex-col gap-1">
              {group.items.map((item) => {
                const active = isActiveHref(activeHref, item.href);
                const itemContent = (
                  <Link
                    key={item.id}
                    href={item.href}
                    aria-label={collapsed ? item.label : undefined}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition ${
                      active
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    } ${collapsed ? 'justify-center' : ''}`}
                  >
                    {item.icon ? <span className="text-base">{item.icon}</span> : null}
                    {!collapsed ? <span className="truncate">{item.label}</span> : null}
                  </Link>
                );

                return collapsed ? (
                  <Tooltip key={item.id} label={item.label}>
                    {itemContent}
                  </Tooltip>
                ) : (
                  itemContent
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};
