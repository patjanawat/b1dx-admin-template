// Added React import to resolve the 'React' namespace for React.ReactNode
import React from 'react';

export type OrderStatus = 'WAIT FOR CONFIRM' | 'Pending' | 'Processing' | 'Shipped' | 'Cancelled';

export interface Order {
  id: string;
  trackingId: string;
  createdDate: string;
  shopName: string;
  shopLogo?: string;
  skuCount: number;
  itemCount: number;
  channel: string;
  channelLogo?: string;
  shipping: string;
  status: OrderStatus;
}

export interface StatItem {
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral' | 'warning' | 'danger';
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  footerText?: string;
}