'use client';

import { TabsRoot, TabsList, TabsTrigger } from './Tabs';

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
    <TabsRoot value={value} onValueChange={onValueChange}>
      <TabsList variant="line" className={className}>
        {tabs.map((tab,idx) => (
          <TabsTrigger key={`${tab.value}-${idx}`} value={idx.toString()}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </TabsRoot>
  );
}
