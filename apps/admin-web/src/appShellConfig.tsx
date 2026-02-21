import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Rocket,
  Warehouse,
  Users,
  BarChart3,
  Settings,
  LayoutGrid,
  ShoppingCart,
  Calendar,
  FileText,
  ShieldCheck,
  LayoutDashboard,
  User,
  DollarSign,
  HelpCircle
} from 'lucide-react';
import type {
  AppSidebarProps,
  AppTopBarProps,
  AppNavGroup,
  AppShortcutsDropdownProps,
  AppProfileDropdownProps
} from '@b1dx/ui';
import { MOCK_NOTIFICATIONS } from './constants';

type UseAdminShellConfigParams = {
  activeView?: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
};

export const useAdminShellConfig = ({
  activeView,
  onViewChange,
  onLogout
}: UseAdminShellConfigParams) => {
  const { t, i18n } = useTranslation();

  const navGroups = useMemo<AppNavGroup[]>(
    () => [
      {
        groupLabel: t('common.main'),
        items: [{ icon: LayoutGrid, label: t('common.dashboard'), id: 'dashboard' }]
      },
      {
        groupLabel: t('common.management'),
        items: [
          {
            icon: ShoppingCart,
            label: t('common.orders'),
            menuId: 'orders',
            subItems: [
              { label: t('common.all_orders'), id: 'dashboard' },
              { label: t('common.processing_orders'), id: 'processing-orders' },
              { label: t('common.packing'), id: 'packing' },
              { label: t('common.tracking_update'), id: 'tracking-update' },
              { label: t('common.tracking_status'), id: 'tracking-status' }
            ]
          },
          {
            icon: Warehouse,
            label: t('common.inventory'),
            menuId: 'inventory',
            subItems: [
              { label: t('common.inventory'), id: 'products' },
              { label: t('common.inventory'), id: 'stock-alerts' }
            ]
          },
          { icon: Users, label: t('common.customers'), id: 'customers' }
        ]
      },
      {
        groupLabel: t('common.analysis'),
        items: [
          {
            icon: BarChart3,
            label: t('common.reports'),
            menuId: 'reports',
            subItems: [
              { label: t('common.reports'), id: 'sales-report' },
              { label: t('common.revenue'), id: 'revenue' }
            ]
          }
        ]
      }
    ],
    [i18n.language, t]
  );

  const shortcuts = useMemo<AppShortcutsDropdownProps>(
    () => ({
      items: [
        { title: 'Calendar', description: 'Appointments', icon: Calendar },
        { title: 'Invoice App', description: 'Manage Accounts', icon: FileText },
        { title: 'Users', description: 'Manage Users', icon: Users },
        { title: 'Role Management', description: 'Permissions', icon: ShieldCheck },
        { title: 'Dashboard', description: 'User Dashboard', icon: LayoutDashboard },
        { title: 'Settings', description: 'Account Settings', icon: Settings }
      ]
    }),
    []
  );

  const profile = useMemo<AppProfileDropdownProps>(
    () => ({
      user: {
        name: 'Alex Rivera',
        subtitle: 'Warehouse Lead',
        email: 'alex.rivera@oms-admin.com',
        avatarUrl:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces'
      },
      menuItems: [
        { label: 'My Profile', icon: User, onClick: () => onViewChange('profile') },
        { label: 'Settings', icon: Settings },
        { label: 'Pricing', icon: DollarSign },
        { label: 'FAQ', icon: HelpCircle }
      ],
      onLogout
    }),
    [onLogout, onViewChange]
  );

  const sidebarProps: AppSidebarProps = {
    navGroups,
    activeView,
    onViewChange,
    defaultOpenMenus: ['orders'],
    brand: {
      icon: <Rocket size={20} />,
      title: 'OMS Pro',
      subtitle: 'Enterprise Admin'
    },
    footerAction: {
      label: t('common.settings'),
      icon: Settings
    }
  };

  const topBarProps: AppTopBarProps = {
    title: t('common.orders'),
    search: {
      placeholder: t('common.search_placeholder')
    },
    language: {
      items: [
        { id: 'en', label: 'English' },
        { id: 'th', label: 'Thai' }
      ],
      selectedId: i18n.language.split('-')[0],
      onSelect: (id) => i18n.changeLanguage(id)
    },
    notifications: {
      items: MOCK_NOTIFICATIONS,
      headerLabel: 'Notifications',
      viewAllLabel: 'View All Activity'
    },
    shortcuts,
    profile
  };

  return { sidebarProps, topBarProps };
};
