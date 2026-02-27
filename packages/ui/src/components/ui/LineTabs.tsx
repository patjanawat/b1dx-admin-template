'use client';

import * as React from 'react';
import { cn } from '../../lib/cn';

export interface LineTab {
  value: string;
  label: string;
}

export interface LineTabsProps {
  tabs: LineTab[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function LineTabs({ tabs, value, onValueChange, className }: LineTabsProps) {
  return (
    <div className={cn('border-b border-border w-full', className)}>
      <div className="flex items-center gap-8">
        {tabs.map((tab) => {
          const isActive = tab.value === value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onValueChange(tab.value)}
              className={cn(
                'relative pb-4 text-sm font-bold transition-colors duration-200 outline-none focus-visible:text-primary',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.label}
              {/* Animated underline indicator */}
              <span
                className={cn(
                  'absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary',
                  'transition-all duration-300 ease-out origin-left',
                  isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
