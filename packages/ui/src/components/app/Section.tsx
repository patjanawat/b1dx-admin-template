import * as React from 'react';
import { cn } from '../../lib/cn';

export interface SectionProps {
  /** Section heading */
  title?: string;
  /** Subheading / description below the title */
  description?: string;
  /** Slot rendered on the right side of the header row (buttons, badges, etc.) */
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  /**
   * - `default` – card-style container with border, padding, and shadow
   * - `flush`   – no border/background, just structural spacing
   */
  variant?: 'default' | 'flush';
}

export const Section = ({
  title,
  description,
  actions,
  children,
  className,
  variant = 'default',
}: SectionProps) => {
  const hasHeader = title || description || actions;

  return (
    <section
      className={cn(
        variant === 'default' && 'rounded-2xl border border-border bg-card p-6 shadow-sm',
        variant === 'flush' && 'py-4',
        className
      )}
    >
      {hasHeader && (
        <div
          className={cn(
            'flex flex-col gap-1 md:flex-row md:items-start md:justify-between',
            !!children && 'mb-6'
          )}
        >
          <div className="min-w-0 space-y-0.5">
            {title && (
              <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
            )}
            {description && (
              <p className="text-sm font-medium text-muted-foreground">{description}</p>
            )}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
};
