'use client';

import * as React from 'react';
import { cn } from '../../lib/cn';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';

export interface IconTabItem {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface IconTabsProps {
  tabs: IconTabItem[];
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  disabledTooltip?: string;
  className?: string;
}

export function IconTabs({
  tabs,
  value,
  onValueChange,
  disabled,
  disabledTooltip,
  className,
}: IconTabsProps) {
  const tabButtons = (
    <>
      {tabs.map((tab) => {
        const isActive = !disabled && tab.value === value;
        const Icon = tab.icon;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onValueChange(tab.value)}
            className={cn(
              'relative flex items-center gap-2 px-4 pb-4 text-sm font-medium transition-colors duration-200 outline-none focus-visible:text-primary cursor-pointer',
              isActive
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon className="size-4 shrink-0" />
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
    </>
  );

  return (
    <div className={cn('border-b border-border w-full', className)}>
      {disabled ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {/* outer div receives hover for tooltip; inner is visually disabled */}
              <div className="cursor-not-allowed w-fit">
                <div className="flex items-center gap-1 pointer-events-none opacity-50">
                  {tabButtons}
                </div>
              </div>
            </TooltipTrigger>
            {!!disabledTooltip && (
              <TooltipContent>{disabledTooltip}</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      ) : (
        <div className="flex items-center gap-1">{tabButtons}</div>
      )}
    </div>
  );
}
