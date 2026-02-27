import * as React from 'react';
import { cn } from '../../lib/cn';

const schemes = {
  emerald: {
    dot: 'bg-emerald-500',
    iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
    activeBorder: 'border-emerald-500',
    activeBg: 'bg-emerald-500/8 dark:bg-emerald-500/15',
    activeShadow: 'shadow-sm shadow-emerald-500/20 dark:shadow-emerald-500/35',
    activeCount: 'text-emerald-600 dark:text-emerald-400',
    hoverBorder: 'hover:border-emerald-500/60 dark:hover:border-emerald-500/80',
    hoverBg: 'hover:bg-emerald-500/5 dark:hover:bg-emerald-500/10',
    hoverShadow: 'hover:shadow-sm hover:shadow-emerald-500/15 dark:hover:shadow-emerald-500/25',
  },
  teal: {
    dot: 'bg-teal-500',
    iconBg: 'bg-teal-500/10 dark:bg-teal-500/15',
    activeBorder: 'border-teal-500',
    activeBg: 'bg-teal-500/8 dark:bg-teal-500/15',
    activeShadow: 'shadow-sm shadow-teal-500/20 dark:shadow-teal-500/35',
    activeCount: 'text-teal-600 dark:text-teal-400',
    hoverBorder: 'hover:border-teal-500/60 dark:hover:border-teal-500/80',
    hoverBg: 'hover:bg-teal-500/5 dark:hover:bg-teal-500/10',
    hoverShadow: 'hover:shadow-sm hover:shadow-teal-500/15 dark:hover:shadow-teal-500/25',
  },
  orange: {
    dot: 'bg-orange-500',
    iconBg: 'bg-orange-500/10 dark:bg-orange-500/15',
    activeBorder: 'border-orange-500',
    activeBg: 'bg-orange-500/8 dark:bg-orange-500/15',
    activeShadow: 'shadow-sm shadow-orange-500/20 dark:shadow-orange-500/35',
    activeCount: 'text-orange-600 dark:text-orange-400',
    hoverBorder: 'hover:border-orange-500/60 dark:hover:border-orange-500/80',
    hoverBg: 'hover:bg-orange-500/5 dark:hover:bg-orange-500/10',
    hoverShadow: 'hover:shadow-sm hover:shadow-orange-500/15 dark:hover:shadow-orange-500/25',
  },
  blue: {
    dot: 'bg-blue-500',
    iconBg: 'bg-blue-500/10 dark:bg-blue-500/15',
    activeBorder: 'border-blue-500',
    activeBg: 'bg-blue-500/8 dark:bg-blue-500/15',
    activeShadow: 'shadow-sm shadow-blue-500/20 dark:shadow-blue-500/35',
    activeCount: 'text-blue-600 dark:text-blue-400',
    hoverBorder: 'hover:border-blue-500/60 dark:hover:border-blue-500/80',
    hoverBg: 'hover:bg-blue-500/5 dark:hover:bg-blue-500/10',
    hoverShadow: 'hover:shadow-sm hover:shadow-blue-500/15 dark:hover:shadow-blue-500/25',
  },
  violet: {
    dot: 'bg-violet-500',
    iconBg: 'bg-violet-500/10 dark:bg-violet-500/15',
    activeBorder: 'border-violet-500',
    activeBg: 'bg-violet-500/8 dark:bg-violet-500/15',
    activeShadow: 'shadow-sm shadow-violet-500/20 dark:shadow-violet-500/35',
    activeCount: 'text-violet-600 dark:text-violet-400',
    hoverBorder: 'hover:border-violet-500/60 dark:hover:border-violet-500/80',
    hoverBg: 'hover:bg-violet-500/5 dark:hover:bg-violet-500/10',
    hoverShadow: 'hover:shadow-sm hover:shadow-violet-500/15 dark:hover:shadow-violet-500/25',
  },
  indigo: {
    dot: 'bg-indigo-500',
    iconBg: 'bg-indigo-500/10 dark:bg-indigo-500/15',
    activeBorder: 'border-indigo-500',
    activeBg: 'bg-indigo-500/8 dark:bg-indigo-500/15',
    activeShadow: 'shadow-sm shadow-indigo-500/20 dark:shadow-indigo-500/35',
    activeCount: 'text-indigo-600 dark:text-indigo-400',
    hoverBorder: 'hover:border-indigo-500/60 dark:hover:border-indigo-500/80',
    hoverBg: 'hover:bg-indigo-500/5 dark:hover:bg-indigo-500/10',
    hoverShadow: 'hover:shadow-sm hover:shadow-indigo-500/15 dark:hover:shadow-indigo-500/25',
  },
  sky: {
    dot: 'bg-sky-500',
    iconBg: 'bg-sky-500/10 dark:bg-sky-500/15',
    activeBorder: 'border-sky-500',
    activeBg: 'bg-sky-500/8 dark:bg-sky-500/15',
    activeShadow: 'shadow-sm shadow-sky-500/20 dark:shadow-sky-500/35',
    activeCount: 'text-sky-600 dark:text-sky-400',
    hoverBorder: 'hover:border-sky-500/60 dark:hover:border-sky-500/80',
    hoverBg: 'hover:bg-sky-500/5 dark:hover:bg-sky-500/10',
    hoverShadow: 'hover:shadow-sm hover:shadow-sky-500/15 dark:hover:shadow-sky-500/25',
  },
  rose: {
    dot: 'bg-rose-500',
    iconBg: 'bg-rose-500/10 dark:bg-rose-500/15',
    activeBorder: 'border-rose-500',
    activeBg: 'bg-rose-500/8 dark:bg-rose-500/15',
    activeShadow: 'shadow-sm shadow-rose-500/20 dark:shadow-rose-500/35',
    activeCount: 'text-rose-600 dark:text-rose-400',
    hoverBorder: 'hover:border-rose-500/60 dark:hover:border-rose-500/80',
    hoverBg: 'hover:bg-rose-500/5 dark:hover:bg-rose-500/10',
    hoverShadow: 'hover:shadow-sm hover:shadow-rose-500/15 dark:hover:shadow-rose-500/25',
  },
} as const;

export type OrderStatusTabColor = keyof typeof schemes;

export interface OrderStatusTabProps {
  label: string;
  count: number;
  color: OrderStatusTabColor;
  isActive: boolean;
  onClick: () => void;
}

export const OrderStatusTab = ({
  label,
  count,
  color,
  isActive,
  onClick,
}: OrderStatusTabProps) => {
  const s = schemes[color];
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex min-w-50 cursor-pointer items-center gap-4 rounded-2xl border p-5 text-left',
        'transition-colors duration-150',
        isActive
          ? cn(s.activeBorder, s.activeBg, s.activeShadow)
          : cn('border-border bg-card shadow-sm', s.hoverBorder, s.hoverBg, s.hoverShadow)
      )}
    >
      <div className={cn('flex h-14 w-14 shrink-0 items-center justify-center rounded-xl', s.iconBg)}>
        <span className={cn('h-4 w-4 rounded-full', s.dot, isActive && 'animate-pulse')} />
      </div>

      <div>
        <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p className={cn('text-2xl font-black tabular-nums leading-none', isActive ? s.activeCount : 'text-foreground')}
        >
          {count.toLocaleString()}
        </p>
      </div>
    </button>
  );
};
