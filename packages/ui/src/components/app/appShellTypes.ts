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

/** Props that every link renderer must accept. */
export interface LinkComponentProps {
  href: string;
  className?: string;
  'aria-label'?: string;
  children: React.ReactNode;
}

/**
 * Preferred link API: a plain function instead of a React component.
 * Avoids coupling packages/ui to any routing framework.
 *
 * Usage in apps (Next.js example):
 *   const renderLink: RenderLinkFn = ({ href, className, children }) =>
 *     <Link href={href} className={className}>{children}</Link>;
 */
export type RenderLinkFn = (props: LinkComponentProps) => React.ReactNode;

/** @deprecated Use RenderLinkFn instead. Kept for external consumers. */
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
  /** Render function for links. Inject your router's <Link> here. */
  renderLink: RenderLinkFn;

  // ── Slot overrides ────────────────────────────────────────────────────────
  topBar?: TopBarConfig;
}
