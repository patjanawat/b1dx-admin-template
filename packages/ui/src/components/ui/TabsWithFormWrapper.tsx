'use client';

import React from 'react';
import { LineTabs } from './LineTabs';
import type { LineTab } from './LineTabs';

export interface TabsWithFormWrapperProps {
  tabs: LineTab[];
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function TabsWithFormWrapper({
  tabs,
  value,
  onValueChange,
  children,
  className,
}: TabsWithFormWrapperProps) {
  return (
    <div className={className}>
      <LineTabs tabs={tabs} value={value} onValueChange={onValueChange} />
      {children}
    </div>
  );
}
