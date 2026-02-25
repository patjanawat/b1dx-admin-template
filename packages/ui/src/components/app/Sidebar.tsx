import React, { useState } from 'react';

import { cn } from '../../lib/cn';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './Collapsible';
import { ScrollArea } from './ScrollArea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';
import type { Brand, NavGroup, NavItem, RenderLinkFn } from './appShellTypes';

// ─────────────────────────────────────────────────────────────────────────────
// Inline SVG icons
// Avoids adding lucide-react (or any icon lib) as a dep of @b1dx/ui.
// Paths are 1:1 copies of the lucide originals.
// ─────────────────────────────────────────────────────────────────────────────

const ChevronLeft = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const ChevronDown = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const BulletCircle = ({ size = 6 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"
    fill="currentColor" stroke="currentColor" strokeWidth="2"
    aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// Width constants (match vendor: w-[260px] expanded, w-20 collapsed)
// ─────────────────────────────────────────────────────────────────────────────

/** Expanded sidebar width in px. */
export const SIDEBAR_WIDTH = 260;
/** Collapsed (icon-only) sidebar width in px. */
export const SIDEBAR_COLLAPSED_WIDTH = 80;

// ─────────────────────────────────────────────────────────────────────────────
// Active-path matching
//
// Rules (applied in order):
//
//  1. Root sentinel  href="/"
//       Matches currentPath="/" ONLY (exact).
//       Rationale: "/" is a prefix of every path, so prefix-only logic would
//       make the Home item permanently active on every page.
//
//  2. All other hrefs — exact OR prefix with "/" boundary guard.
//       href="/users"  → active when currentPath is "/users" or "/users/123"
//       href="/users"  → NOT active for "/users-admin"  (boundary guard: the
//                        char after the prefix must be "/" or end-of-string)
//       Query strings and hashes are stripped before comparison.
//
//  3. Parent item (with children) — active when ANY direct child href matches.
//       Used to show the active-parent indicator and auto-open the submenu.
// ─────────────────────────────────────────────────────────────────────────────

function matchesPath(currentPath: string | undefined, href: string): boolean {
  if (!currentPath || !href) return false;
  // strip query + hash
  const clean = currentPath.split('?')[0].split('#')[0];
  if (href === '/') return clean === '/';
  return clean === href || clean.startsWith(`${href}/`);
}

function isItemOrChildActive(currentPath: string | undefined, item: NavItem): boolean {
  if (item.href && matchesPath(currentPath, item.href)) return true;
  return item.children?.some((c) => c.href && matchesPath(currentPath, c.href)) ?? false;
}

// ─────────────────────────────────────────────────────────────────────────────
// nav normalizer: NavGroup[] | NavItem[]  →  NavGroup[]
//
// NavGroup is distinguished from NavItem by having an `items` array.
// A flat NavItem[] is wrapped in a single anonymous group so the renderer
// only ever needs to handle NavGroup[].
// ─────────────────────────────────────────────────────────────────────────────

function toNavGroups(nav: NavGroup[] | NavItem[]): NavGroup[] {
  if (nav.length === 0) return [];
  if ('items' in nav[0]) return nav as NavGroup[];
  return [{ id: '__root', items: nav as NavItem[] }];
}

// ─────────────────────────────────────────────────────────────────────────────
// Initial open-menus
// Auto-open any parent whose direct child matches currentPath on first render.
// ─────────────────────────────────────────────────────────────────────────────

function getInitialOpenMenus(groups: NavGroup[], currentPath: string | undefined): string[] {
  const open: string[] = [];
  for (const group of groups) {
    for (const item of group.items) {
      if (item.children?.some((c) => c.href && matchesPath(currentPath, c.href))) {
        open.push(item.id);
      }
    }
  }
  return open;
}

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────

export interface SidebarProps {
  brand: Brand;
  /**
   * Accepts `NavGroup[]` for sectioned nav, or a flat `NavItem[]` which is
   * automatically wrapped in a single anonymous group.
   */
  nav: NavGroup[] | NavItem[];
  /**
   * Current URL path.  Used to determine which item is active.
   * See active-matching rules above.
   */
  currentPath?: string;
  /** Whether the sidebar is in icon-only (collapsed) mode. */
  isCollapsed: boolean;
  /** Called when the user clicks the collapse edge-button. */
  onToggleCollapsed?: () => void;
  /** Framework link renderer — inject <Link> from your router here. */
  renderLink: RenderLinkFn;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export const Sidebar = ({
  brand,
  nav,
  currentPath,
  isCollapsed,
  onToggleCollapsed,
  renderLink,
}: SidebarProps) => {
  const navGroups = toNavGroups(nav);

  // openMenus: set of item IDs whose sub-list is expanded.
  // Initialised to auto-open any parent that contains the active path.
  const [openMenus, setOpenMenus] = useState<string[]>(() =>
    getInitialOpenMenus(navGroups, currentPath)
  );

  const toggleMenu = (itemId: string) => {
    if (isCollapsed) {
      // Clicking a parent while collapsed: expand the sidebar first, then open.
      onToggleCollapsed?.();
      setOpenMenus([itemId]);
      return;
    }
    setOpenMenus((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const wrapWithTooltip = (label: string, node: React.ReactNode) => {
    if (!isCollapsed) return node;
    return (
      <Tooltip>
        <TooltipTrigger asChild>{node}</TooltipTrigger>
        <TooltipContent side="right" sideOffset={12}>
          {label}
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    // Vendor: "relative bg-card border-r border-border flex flex-col h-screen
    //          transition-all duration-300 ease-in-out z-40 shrink-0 w-20|w-[260px]"
    <aside
      className={cn(
        'relative flex flex-col h-screen bg-card border-r border-border shrink-0',
        'transition-all duration-300 ease-in-out z-40',
        isCollapsed ? 'w-20' : 'w-[260px]'
      )}
    >

      {/* ── Brand header ──────────────────────────────────────────────────── */}
      {/* Vendor: h-16 flex items-center px-5 border-b border-border/50 overflow-hidden shrink-0 */}
      <div className="h-16 flex items-center px-5 border-b border-border/50 overflow-hidden shrink-0">
        <div className="flex items-center gap-3 min-w-[220px]">
          {brand.logo ? (
            <div className="shrink-0">{brand.logo}</div>
          ) : null}
          <div
            className={cn(
              'transition-all duration-300 ease-in-out',
              isCollapsed ? 'opacity-0 -translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'
            )}
          >
            <div className="text-base font-bold leading-none text-foreground truncate">
              {brand.title}
            </div>
            {brand.subtitle ? (
              <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-1 truncate">
                {brand.subtitle}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* ── Collapse edge-button ──────────────────────────────────────────── */}
      {/* Vendor: absolute -right-3 top-20 … hidden lg:block */}
      {onToggleCollapsed ? (
        <button
          type="button"
          onClick={onToggleCollapsed}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="absolute -right-3 top-20 z-50 hidden lg:flex items-center justify-center bg-background border border-border rounded-full p-1 text-muted-foreground hover:text-primary transition-all shadow-sm"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      ) : null}

      {/* ── Navigation ───────────────────────────────────────────────────── */}
      {/* Vendor: flex-1 overflow-y-auto py-6 px-3 overflow-x-hidden */}
      <ScrollArea className="flex-1">
        <nav className="overflow-x-hidden py-6 px-3">
          <TooltipProvider delayDuration={150}>
            {navGroups.map((group, groupIdx) => (
              <div key={group.id} className={groupIdx !== 0 ? 'mt-6' : ''}>

            {/* Group label (expanded) or horizontal rule (collapsed) */}
            {!isCollapsed && group.label ? (
              <h3 className="px-4 mb-2 text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">
                {group.label}
              </h3>
            ) : null}
            {isCollapsed ? (
              <div className="h-px bg-border mx-4 mb-4" />
            ) : null}

            <div className="space-y-1">
              {group.items.map((item) => {
                const hasSub = (item.children?.length ?? 0) > 0;
                const isOpen = openMenus.includes(item.id);
                const isActive = isItemOrChildActive(currentPath, item);

                const parentButton = (
                  <button
                    type="button"
                    onClick={() => (hasSub ? toggleMenu(item.id) : undefined)}
                    aria-expanded={hasSub ? isOpen : undefined}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative',
                      isActive
                        ? 'bg-accent text-accent-foreground font-semibold'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    {isActive && !isCollapsed ? (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                    ) : null}

                    {item.icon ? (
                      <span className={cn(
                        'shrink-0',
                        isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                      )}>
                        {item.icon}
                      </span>
                    ) : null}

                    <span className={cn(
                      'text-[14px] transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden',
                      isCollapsed ? 'opacity-0 -translate-x-2' : 'opacity-100 translate-x-0'
                    )}>
                      {item.label}
                    </span>

                    {!isCollapsed && hasSub ? (
                      <span className={cn(
                        'ml-auto transition-transform duration-300',
                        isOpen ? 'rotate-180 text-primary' : 'text-muted-foreground'
                      )}>
                        <ChevronDown size={14} />
                      </span>
                    ) : null}
                  </button>
                );

                const leafLink = (
                  <span className="block relative">
                    {isActive && !isCollapsed ? (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full z-10" />
                    ) : null}

                    {renderLink({
                      href: item.href ?? '#',
                      'aria-label': isCollapsed ? item.label : undefined,
                      className: cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group',
                        isCollapsed && 'justify-center',
                        isActive
                          ? 'bg-accent text-accent-foreground font-semibold'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      ),
                      children: (
                        <>
                          {item.icon ? (
                            <span className={cn(
                              'shrink-0',
                              isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                            )}>
                              {item.icon}
                            </span>
                          ) : null}
                          <span className={cn(
                            'text-[14px] transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden',
                            isCollapsed ? 'opacity-0 -translate-x-2' : 'opacity-100 translate-x-0'
                          )}>
                            {item.label}
                          </span>
                        </>
                      ),
                    })}
                  </span>
                );

                if (!hasSub && item.href) {
                  return (
                    <div key={item.id} className="relative">
                      {wrapWithTooltip(item.label, leafLink)}
                    </div>
                  );
                }

                return (
                  <Collapsible
                    key={item.id}
                    open={isOpen}
                    onOpenChange={(open) => {
                      if (isCollapsed && open) {
                        onToggleCollapsed?.();
                      }
                      setOpenMenus((prev) =>
                        open ? [...new Set([...prev, item.id])] : prev.filter((id) => id !== item.id)
                      );
                    }}
                  >
                    <CollapsibleTrigger asChild>
                      <div className="relative">
                        {wrapWithTooltip(item.label, parentButton)}
                      </div>
                    </CollapsibleTrigger>

                    {!isCollapsed && hasSub ? (
                      <CollapsibleContent>
                        <div className="mt-1">
                          <div className="ml-4 my-1 space-y-1 border-l border-border pl-4">
                            {item.children?.map((child) => {
                              if (!child.href) return null;
                              const childActive = matchesPath(currentPath, child.href);
                              return (
                                <React.Fragment key={child.id}>
                                  {renderLink({
                                    href: child.href,
                                    className: cn(
                                      'w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all group',
                                      childActive
                                        ? 'bg-accent text-accent-foreground font-bold'
                                        : 'text-muted-foreground hover:text-primary hover:bg-accent'
                                    ),
                                    children: (
                                      <>
                                        <span className={cn(
                                          'shrink-0 transition-all',
                                          childActive
                                            ? 'text-primary scale-125'
                                            : 'text-muted-foreground group-hover:text-primary'
                                        )}>
                                          <BulletCircle size={6} />
                                        </span>
                                        {child.label}
                                      </>
                                    ),
                                  })}
                                </React.Fragment>
                              );
                            })}
                          </div>
                        </div>
                      </CollapsibleContent>
                    ) : null}
                  </Collapsible>
                );
              })}
            </div>
              </div>
            ))}
          </TooltipProvider>
        </nav>
      </ScrollArea>
    </aside>
  );
};

