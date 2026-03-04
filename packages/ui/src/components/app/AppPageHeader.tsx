'use client';

import * as React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/cn';

export interface AppPageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  backLabel?: string;
  backAriaLabel?: string;
}

export const AppPageHeader = ({
  title,
  description,
  actions,
  showBackButton = false,
  onBack,
  backLabel = 'Back',
  backAriaLabel,
}: AppPageHeaderProps) => {
  const handleBack = React.useCallback(() => {
    if (onBack) {
      onBack();
      return;
    }

    if (typeof window !== 'undefined') {
      window.history.back();
    }
  }, [onBack]);

  return (
    <section className="py-4">
      <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 space-y-1">
          {showBackButton && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleBack}
              aria-label={backAriaLabel ?? backLabel}
              className={cn(
                'mb-1 h-8 px-2 text-muted-foreground hover:text-foreground',
                'w-fit gap-1.5'
              )}
            >
              <ChevronLeft size={16} />
              <span>{backLabel}</span>
            </Button>
          )}
          <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
          {description && <p className="text-sm font-medium text-muted-foreground">{description}</p>}
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>
    </section>
  );
};
