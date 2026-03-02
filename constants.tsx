
import React from 'react';
import { ShoppingCart, Clock, Truck, AlertCircle, BarChart2 } from 'lucide-react';
import { Order, StatItem } from './types';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  type: 'image' | 'initials' | 'icon';
  avatar?: string;
  initials?: string;
  initialsBg?: string;
  icon?: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
}

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-20231024-001',
    trackingId: 'PKG-992120',
    createdDate: '24/10/2023 09:30',
    shopName: 'Streetwear TH',
    skuCount: 3,
    itemCount: 5,
    channel: 'SHOPEE',
    shipping: 'Kerry Express',
    status: 'WAIT FOR CONFIRM'
  },
  {
    id: 'ORD-20231024-002',
    trackingId: 'PKG-992121',
    createdDate: '24/10/2023 10:15',
    shopName: 'Fashion Hub',
    skuCount: 1,
    itemCount: 1,
    channel: 'LAZADA',
    shipping: 'Flash Express',
    status: 'WAIT FOR CONFIRM'
  },
  {
    id: 'ORD-20231024-005',
    trackingId: 'PKG-992125',
    createdDate: '24/10/2023 11:00',
    shopName: 'Beauty Direct',
    skuCount: 2,
    itemCount: 10,
    channel: 'TIKTOK SHOP',
    shipping: 'J&T Express',
    status: 'WAIT FOR CONFIRM'
  }
];

export const STATS_DATA: StatItem[] = [
  {
    label: 'TOTAL ORDERS',
    value: '1,284',
    icon: <ShoppingCart size={24} />,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500'
  },
  {
    label: 'PENDING',
    value: '42',
    icon: <Clock size={24} />,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500'
  },
  {
    label: 'SHIPPED',
    value: '856',
    icon: <Truck size={24} />,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500'
  },
  {
    label: 'ISSUES',
    value: '12',
    icon: <AlertCircle size={24} />,
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-500'
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Congratulations Flora 🎉',
    description: 'Won the monthly bestseller gold badge',
    time: '1h ago',
    unread: true,
    type: 'image',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    id: '2',
    title: 'Cecilia Becker',
    description: 'Accepted your connection',
    time: '12h ago',
    unread: true,
    type: 'initials',
    initials: 'CB',
    initialsBg: 'bg-slate-100 text-slate-600'
  },
  {
    id: '3',
    title: 'Bernard Woods',
    description: 'You have new message from Bernard Woods',
    time: 'May 18, 8:26 AM',
    unread: false,
    type: 'image',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
  },
  {
    id: '4',
    title: 'Monthly report generated',
    description: 'July month financial report is generated',
    time: 'Apr 24, 10:30 AM',
    unread: false,
    type: 'icon',
    icon: <BarChart2 size={18} />,
    iconBg: 'bg-cyan-50',
    iconColor: 'text-cyan-500'
  },
  {
    id: '5',
    title: 'Application has been approved 🚀',
    description: 'Your recent SKU update was approved',
    time: 'Apr 20, 2:15 PM',
    unread: false,
    type: 'initials',
    initials: 'MG',
    initialsBg: 'bg-emerald-50 text-emerald-600'
  }
];
