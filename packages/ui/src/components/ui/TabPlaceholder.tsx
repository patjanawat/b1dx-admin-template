'use client';

import { LayoutDashboard } from 'lucide-react';

export interface TabPlaceholderProps {
  label?: string;
}

export function TabPlaceholder({ label }: TabPlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
      <LayoutDashboard size={36} className="opacity-30" />
      {label && <p className="text-sm font-semibold">{label}</p>}
      <p className="text-xs">เนื้อหากำลังพัฒนา</p>
    </div>
  );
}
