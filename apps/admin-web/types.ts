import React from 'react';

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
