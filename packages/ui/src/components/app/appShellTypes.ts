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

/** Placeholder for future TopBar slot configuration. */
export interface TopBarConfig {
  rightSlot?: React.ReactNode;
}

/**
 * High-level config object.  Passed as a single prop in future API iterations;
 * for now each field is spread individually on AppShellProps.
 */
export interface AppShellConfig {
  brand: Brand;
  navGroups: NavGroup[];
  topBar?: TopBarConfig;
}
