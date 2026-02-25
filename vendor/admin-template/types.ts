// Added React import to resolve the 'React' namespace for React.ReactNode
import React from 'react';

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Cancelled';

export interface Order {
  id: string;
  customerName: string;
  customerInitials: string;
  customerColor: string;
  date: string;
  status: OrderStatus;
  amount: number;
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