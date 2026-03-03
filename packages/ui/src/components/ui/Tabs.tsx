'use client';

import * as React from 'react';
import { Tabs as TabsPrimitive } from 'radix-ui';
import { cn } from '../../lib/cn';

export type TabsVariant = 'default' | 'line';

const TabsVariantContext = React.createContext<TabsVariant>('default');

// --- TabsRoot ---

export interface TabsRootProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function TabsRoot({ value, defaultValue, onValueChange, children, className }: TabsRootProps) {
  return (
    <TabsPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className={className}
    >
      {children}
    </TabsPrimitive.Root>
  );
}

// --- TabsList ---

export interface TabsListProps {
  children: React.ReactNode;
  variant?: TabsVariant;
  className?: string;
}

export function TabsList({ children, variant = 'default', className }: TabsListProps) {
  return (
    <TabsVariantContext.Provider value={variant}>
      {variant === 'line' ? (
        <div className={cn('border-b border-border w-full', className)}>
          <TabsPrimitive.List className="flex items-center gap-8">
            {children}
          </TabsPrimitive.List>
        </div>
      ) : (
        <TabsPrimitive.List className={cn('flex items-center', className)}>
          {children}
        </TabsPrimitive.List>
      )}
    </TabsVariantContext.Provider>
  );
}

// --- TabsTrigger ---

export interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const variant = React.useContext(TabsVariantContext);

  if (variant === 'line') {
    return (
      <TabsPrimitive.Trigger
        value={value}
        className={cn(
          'group relative pb-4 text-sm font-bold transition-colors duration-200 outline-none focus-visible:text-primary',
          'text-muted-foreground hover:text-foreground data-[state=active]:text-primary',
          className
        )}
      >
        {children}
        <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary transition-all duration-300 ease-out origin-left scale-x-0 opacity-0 group-data-[state=active]:scale-x-100 group-data-[state=active]:opacity-100" />
      </TabsPrimitive.Trigger>
    );
  }

  return (
    <TabsPrimitive.Trigger value={value} className={className}>
      {children}
    </TabsPrimitive.Trigger>
  );
}

// --- TabsContent ---

export interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  return (
    <TabsPrimitive.Content value={value} className={className}>
      {children}
    </TabsPrimitive.Content>
  );
}
