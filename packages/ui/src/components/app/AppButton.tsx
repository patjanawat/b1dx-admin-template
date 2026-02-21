import React from 'react';
import { Button } from '../ui/Button';

export interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  ({ loading = false, leftIcon, rightIcon, disabled, children, className = '', ...props }, ref) => (
    <Button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`gap-2 ${className}`}
      {...props}
    >
      {leftIcon ? <span aria-hidden="true">{leftIcon}</span> : null}
      <span className="inline-flex items-center gap-2">
        {loading ? (
          <span role="status" aria-live="polite" className="inline-flex items-center">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
            <span className="sr-only">Loading</span>
          </span>
        ) : null}
        <span>{children}</span>
      </span>
      {rightIcon ? <span aria-hidden="true">{rightIcon}</span> : null}
    </Button>
  )
);
AppButton.displayName = 'AppButton';
