'use client';

import * as React from 'react';
import { cn } from '../../lib/cn';
import { IconTabs } from '../ui/IconTabs';
import type { IconTabItem } from '../ui/IconTabs';

export interface DataListWrapperProps {
  tabs: IconTabItem[];
  tabValue: string;
  onTabChange: (value: string) => void;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DataListWrapper({
  tabs,
  tabValue,
  onTabChange,
  actions,
  children,
  className,
}: DataListWrapperProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      {/* Header row: tabs (left) + actions (right) */}
      <div className="flex items-end justify-between border-b border-border">
        <IconTabs
          tabs={tabs}
          value={tabValue}
          onValueChange={onTabChange}
          className="border-b-0"
        />
        {actions && (
          <div className="flex items-center gap-2 pb-3 shrink-0">
            {actions}
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
