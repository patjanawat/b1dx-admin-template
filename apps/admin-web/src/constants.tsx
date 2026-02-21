
import React from 'react';
import { ShoppingCart, Truck, Package, DollarSign, BarChart2 } from 'lucide-react';
import { Order } from 'b1dx/types';
import { StatItem } from './types';
import type { AppNotificationItem } from '@b1dx/ui';

export const INITIAL_ORDERS: Order[] = [
  {
    id: '#ORD-7732',
    customerName: 'John Smith',
    customerInitials: 'JS',
    customerColor: 'bg-indigo-100 text-indigo-600',
    date: 'Oct 24, 2023',
    status: 'Pending',
    amount: 125.50
  },
  {
    id: '#ORD-7731',
    customerName: 'Sarah Jenkins',
    customerInitials: 'SJ',
    customerColor: 'bg-pink-100 text-pink-600',
    date: 'Oct 24, 2023',
    status: 'Processing',
    amount: 240.00
  },
  {
    id: '#ORD-7730',
    customerName: 'Michael Chen',
    customerInitials: 'MC',
    customerColor: 'bg-emerald-100 text-emerald-600',
    date: 'Oct 23, 2023',
    status: 'Shipped',
    amount: 89.99
  },
  {
    id: '#ORD-7729',
    customerName: 'Emma Wilson',
    customerInitials: 'EW',
    customerColor: 'bg-slate-100 text-slate-600',
    date: 'Oct 23, 2023',
    status: 'Cancelled',
    amount: 45.00
  },
  {
    id: '#ORD-7728',
    customerName: 'David Miller',
    customerInitials: 'DM',
    customerColor: 'bg-blue-100 text-blue-600',
    date: 'Oct 22, 2023',
    status: 'Shipped',
    amount: 312.20
  },
  {
    id: '#ORD-7727',
    customerName: 'Ava Lopez',
    customerInitials: 'AL',
    customerColor: 'bg-amber-100 text-amber-600',
    date: 'Oct 22, 2023',
    status: 'Processing',
    amount: 54.25
  }
];

export const STATS_DATA: StatItem[] = [
  {
    label: 'Total Orders',
    value: '1,284',
    change: '+12.5%',
    changeType: 'positive',
    footerText: 'vs last month',
    icon: <ShoppingCart size={20} />,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    label: 'Pending Shipments',
    value: '42',
    changeType: 'warning',
    footerText: 'Needs attention',
    icon: <Truck size={20} />,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600'
  },
  {
    label: 'Low Stock Items',
    value: '12',
    changeType: 'danger',
    footerText: '8 critical SKUs',
    icon: <Package size={20} />,
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600'
  },
  {
    label: "Today's Revenue",
    value: '$14,250.00',
    changeType: 'positive',
    footerText: 'High performing',
    icon: <DollarSign size={20} />,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600'
  }
];

export const MOCK_NOTIFICATIONS: AppNotificationItem[] = [
  {
    id: '1',
    title: 'Congratulations Flora',
    description: 'Won the monthly bestseller gold badge',
    time: '1h ago',
    unread: true,
    type: 'image',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    id: '2',
    title: 'Cecilia Becker',
    description: 'Accepted your connection',
    time: '12h ago',
    unread: true,
    type: 'initials',
    initials: 'CB',
    initialsClassName: 'bg-slate-100 text-slate-600'
  },
  {
    id: '3',
    title: 'Bernard Woods',
    description: 'You have new message from Bernard Woods',
    time: 'May 18, 8:26 AM',
    unread: false,
    type: 'image',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
  },
  {
    id: '4',
    title: 'Monthly report generated',
    description: 'July month financial report is generated',
    time: 'Apr 24, 10:30 AM',
    unread: false,
    type: 'icon',
    icon: <BarChart2 size={18} />,
    iconBgClassName: 'bg-cyan-50',
    iconColorClassName: 'text-cyan-500'
  },
  {
    id: '5',
    title: 'Application has been approved',
    description: 'Your recent SKU update was approved',
    time: 'Apr 20, 2:15 PM',
    unread: false,
    type: 'initials',
    initials: 'MG',
    initialsClassName: 'bg-emerald-50 text-emerald-600'
  }
];

