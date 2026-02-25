import type React from 'react';

export interface Brand {
  title: string;
  subtitle?: string;
  logo?: React.ReactNode;
}

/**
 * A single navigation item.
 * `href` is optional so top-level items can act as group headers.
 * `badge` shows a count/label indicator.
 * `children` enables one level of nested sub-navigation.
 */
export interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: NavItem[];
}

export interface NavGroup {
  id: string;
  label?: string;
  items: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/** Props that every LinkComponent implementation must accept. */
export interface LinkComponentProps {
  href: string;
  className?: string;
  'aria-label'?: string;
  children: React.ReactNode;
}

export type LinkComponent = React.ComponentType<LinkComponentProps>;

/** TopBar slot configuration. */
export interface TopBarConfig {
  /** Content rendered in the top-right area (theme switcher, user menu, etc.). */
  rightSlot?: React.ReactNode;
}

/**
 * Full render config for AppShell.
 * Combines static (brand, nav) and runtime (activeHref, collapsed, …) concerns
 * so a single `config` prop is the only required prop besides `children`.
 */
export interface AppShellConfig {
  // ── Static identity ──────────────────────────────────────────────────────
  brand: Brand;
  navGroups: NavGroup[];

  // ── Runtime routing state ─────────────────────────────────────────────────
  /** Current path used to highlight the active nav item. */
  activeHref?: string;
  /** Breadcrumb trail rendered in the TopBar. */
  breadcrumbs?: BreadcrumbItem[];

  // ── Sidebar collapse state ────────────────────────────────────────────────
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;

  // ── Framework adapter ─────────────────────────────────────────────────────
  /** Framework-specific link component (e.g. Next.js <Link>). */
  LinkComponent: LinkComponent;

  // ── Slot overrides ────────────────────────────────────────────────────────
  topBar?: TopBarConfig;
}
