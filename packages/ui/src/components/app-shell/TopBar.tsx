import React from 'react';

import { Button } from '../ui/Button';
import type { BreadcrumbItem, LinkComponent } from './types';

export interface TopBarProps {
  breadcrumbs: BreadcrumbItem[];
  onOpenMobileNav?: () => void;
  rightSlot?: React.ReactNode;
  LinkComponent?: LinkComponent;
}

export const TopBar = ({
  breadcrumbs,
  onOpenMobileNav,
  rightSlot,
  LinkComponent
}: TopBarProps) => {
  const Link = LinkComponent;

  return (
    <header className="flex items-center justify-between gap-4 border-b border-border bg-background px-4 py-3 text-foreground">
      <div className="flex min-w-0 items-center gap-3">
        {onOpenMobileNav ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={onOpenMobileNav}
          >
            Menu
          </Button>
        ) : null}
        <nav
          aria-label="Breadcrumb"
          className="flex min-w-0 flex-wrap items-center gap-2 text-sm text-muted-foreground"
        >
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={`${item.label}-${index}`}>
              {index > 0 ? <span>/</span> : null}
              {item.href ? (
                Link ? (
                  <Link href={item.href} className="truncate text-foreground hover:text-foreground">
                    {item.label}
                  </Link>
                ) : (
                  <a href={item.href} className="truncate text-foreground hover:text-foreground">
                    {item.label}
                  </a>
                )
              ) : (
                <span className="truncate text-foreground">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3">{rightSlot}</div>
    </header>
  );
};
