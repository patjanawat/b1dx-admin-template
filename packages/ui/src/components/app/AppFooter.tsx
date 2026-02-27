import * as React from 'react';
import { cn } from '../../lib/cn';

const DOT_COLOR = {
  emerald: 'bg-emerald-500 shadow-emerald-500/50',
  blue:    'bg-blue-500    shadow-blue-500/50',
  amber:   'bg-amber-500   shadow-amber-500/50',
  rose:    'bg-rose-500    shadow-rose-500/50',
} as const;

export interface AppFooterStatusItem {
  label: string;
  color: keyof typeof DOT_COLOR;
}

export interface AppFooterProps {
  /** Left-side status indicators. Defaults to SYSTEM ONLINE + LAST SYNC. */
  statusItems?: AppFooterStatusItem[];
  /** Version string shown on the right. */
  version?: string;
  /** Copyright / company text shown on the right. */
  company?: string;
  className?: string;
}

const DEFAULT_STATUS: AppFooterStatusItem[] = [
  { label: 'System Online', color: 'emerald' },
  { label: 'Last Sync: 1 min ago', color: 'blue' },
];

export const AppFooter = ({
  statusItems = DEFAULT_STATUS,
  version,
  company,
  className,
}: AppFooterProps) => {
  return (
    <footer
      className={cn(
        'flex shrink-0 items-center justify-between border-t border-border bg-background px-4 py-3 md:px-8',
        className
      )}
    >
      {/* Left — status indicators */}
      <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
        {statusItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className={cn(
                'h-2 w-2 rounded-full shadow-sm',
                DOT_COLOR[item.color]
              )}
            />
            {item.label}
          </div>
        ))}
      </div>

      {/* Right — version + copyright */}
      {(version || company) && (
        <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          {version && <span>{version}</span>}
          {company && <span>{company}</span>}
        </div>
      )}
    </footer>
  );
};
