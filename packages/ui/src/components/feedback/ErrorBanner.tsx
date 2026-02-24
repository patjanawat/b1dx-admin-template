import React from 'react';

export type ErrorBannerVariant = 'error' | 'warning' | 'info' | 'success';
export type ErrorBannerPlacement = 'inline' | 'top' | 'stickyTop' | 'bottom' | 'modalHeader';

export interface ProblemDetails {
  detail?: string;
  traceId?: string;
  title?: string;
}

export interface ErrorBannerProps {
  title?: string;
  message?: string;
  problemDetails?: ProblemDetails;
  variant?: ErrorBannerVariant;
  placement?: ErrorBannerPlacement;
  actions?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ErrorBannerVariant, string> = {
  error: 'border-red-200 bg-red-50 text-red-900',
  warning: 'border-amber-200 bg-amber-50 text-amber-900',
  info: 'border-blue-200 bg-blue-50 text-blue-900',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900'
};

const placementStyles: Record<ErrorBannerPlacement, string> = {
  inline: 'w-full',
  top: 'fixed top-4 left-1/2 z-50 w-[min(720px,92vw)] -translate-x-1/2',
  stickyTop: 'sticky top-0 z-40',
  bottom: 'fixed bottom-4 left-1/2 z-50 w-[min(720px,92vw)] -translate-x-1/2',
  modalHeader: 'w-full rounded-b-none'
};

export const ErrorBanner = ({
  title,
  message,
  problemDetails,
  variant = 'error',
  placement = 'inline',
  actions,
  className = ''
}: ErrorBannerProps) => {
  const resolvedTitle = problemDetails?.title ?? title;
  const resolvedMessage = problemDetails?.detail ?? message;

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={`rounded-xl border px-4 py-3 shadow-sm ${variantStyles[variant]} ${placementStyles[placement]} ${className}`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            {resolvedTitle ? <p className="text-sm font-semibold">{resolvedTitle}</p> : null}
            {resolvedMessage ? <p className="text-sm text-slate-700">{resolvedMessage}</p> : null}
            {problemDetails?.traceId ? (
              <p className="text-xs text-slate-500">Trace ID: {problemDetails.traceId}</p>
            ) : null}
          </div>
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </div>
      </div>
    </div>
  );
};
