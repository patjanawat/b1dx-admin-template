import type React from 'react';

export interface Brand {
  title: string;
  subtitle?: string;
  logo?: React.ReactNode;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
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

export interface LinkComponentProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export type LinkComponent = React.ComponentType<LinkComponentProps>;
