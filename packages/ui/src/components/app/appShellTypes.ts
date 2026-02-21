import React from 'react';

export type AppNavSubItem = {
  id: string;
  label: string;
};

export type AppNavItem = {
  id?: string;
  label: string;
  icon: React.ElementType;
  subItems?: AppNavSubItem[];
  menuId?: string;
};

export type AppNavGroup = {
  groupLabel?: string;
  items: AppNavItem[];
};

export type AppSidebarBrand = {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick?: () => void;
};

export type AppSidebarFooterAction = {
  label: string;
  icon?: React.ElementType;
  onClick?: () => void;
};

export type AppSidebarProps = {
  navGroups: AppNavGroup[];
  activeView?: string;
  onViewChange?: (view: string) => void;
  brand?: AppSidebarBrand;
  footerAction?: AppSidebarFooterAction;
  defaultOpenMenus?: string[];
};

export type AppLanguageItem = {
  id: string;
  label: string;
};

export type AppLanguageDropdownProps = {
  items: AppLanguageItem[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export type AppNotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  unread?: boolean;
  type: 'image' | 'initials' | 'icon';
  avatarUrl?: string;
  initials?: string;
  initialsClassName?: string;
  icon?: React.ReactNode;
  iconBgClassName?: string;
  iconColorClassName?: string;
};

export type AppNotificationsDropdownProps = {
  items: AppNotificationItem[];
  headerLabel?: string;
  newLabel?: string;
  newCount?: number;
  onMarkAllRead?: () => void;
  onViewAll?: () => void;
  viewAllLabel?: string;
  emptyStateLabel?: string;
  emptyStateHint?: string;
};

export type AppShortcutItem = {
  id?: string;
  title: string;
  description: string;
  icon: React.ElementType;
  onClick?: () => void;
};

export type AppShortcutsDropdownProps = {
  items: AppShortcutItem[];
  headerLabel?: string;
  onAdd?: () => void;
  addLabel?: string;
  emptyStateLabel?: string;
  emptyStateHint?: string;
};

export type AppProfileUser = {
  name: string;
  subtitle?: string;
  email?: string;
  avatarUrl?: string;
  statusClassName?: string;
};

export type AppProfileMenuItem = {
  label: string;
  icon: React.ElementType;
  onClick?: () => void;
};

export type AppProfileDropdownProps = {
  user: AppProfileUser;
  menuItems: AppProfileMenuItem[];
  onLogout?: () => void;
  logoutLabel?: string;
};

export type AppTopBarSearchProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
};

export type AppTheme = 'light' | 'dark' | 'system';

export type AppThemeOption = {
  id: AppTheme;
  label: string;
  icon: React.ElementType;
};

export type AppTopBarProps = {
  title?: React.ReactNode;
  search?: AppTopBarSearchProps | null;
  language?: AppLanguageDropdownProps | null;
  notifications?: AppNotificationsDropdownProps | null;
  shortcuts?: AppShortcutsDropdownProps | null;
  profile?: AppProfileDropdownProps | null;
  showThemeToggle?: boolean;
  themeOptions?: AppThemeOption[];
};

export type AppLayoutProps = {
  children: React.ReactNode;
  sidebarProps: AppSidebarProps;
  topBarProps: AppTopBarProps;
};
