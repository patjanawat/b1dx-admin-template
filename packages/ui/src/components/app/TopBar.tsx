import React from 'react';

import type { BreadcrumbItem, LinkComponent } from './appShellTypes';

export interface TopBarProps {
  breadcrumbs: BreadcrumbItem[];
  rightSlot?: React.ReactNode;
  LinkComponent?: LinkComponent;
  onOpenMobileNav?: () => void;
}

export const TopBar = ({
  breadcrumbs,
  rightSlot,
  LinkComponent,
  onOpenMobileNav: _onOpenMobileNav,
}: TopBarProps) => {
  const Link = LinkComponent;

  return (
    <header className="flex items-center justify-between gap-4 border-b border-border bg-background px-4 py-3 text-foreground">
      <nav
        aria-label="Breadcrumb"
        className="flex min-w-0 flex-wrap items-center gap-2 text-sm text-muted-foreground"
      >
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={`${item.label}-${index}`}>
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              Link ? (
                <Link href={item.href} className="truncate text-foreground hover:underline">
                  {item.label}
                </Link>
              ) : (
                <a href={item.href} className="truncate text-foreground hover:underline">
                  {item.label}
                </a>
              )
            ) : (
              <span className="truncate text-foreground">{item.label}</span>
            )}
          </React.Fragment>
        ))}
      </nav>

      <div className="flex shrink-0 items-center gap-3">{rightSlot}</div>
    </header>
  );
};
