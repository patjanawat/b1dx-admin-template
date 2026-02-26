'use client';

import React from 'react';

type ErrorMode = 'inline' | 'tooltip';
type TooltipBehavior = 'auto' | 'hover';

type AnyElement = React.ReactElement<any>;

export interface FormFieldProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  required?: boolean;
  error?: string;
  errorMode?: ErrorMode;
  tooltipBehavior?: TooltipBehavior;
  touched?: boolean;
  submitCount?: number;
  children: React.ReactElement;
}

const ErrorIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 20"
    className="h-4 w-4"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 2.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Zm-.75 4.25a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-1.5 0v-4.5Zm.75 8.75a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
      clipRule="evenodd"
    />
  </svg>
);

export const FormField = ({
  label,
  description,
  required,
  error,
  errorMode = 'inline',
  tooltipBehavior = 'auto',
  touched,
  submitCount,
  children
}: FormFieldProps) => {
  const fieldId = React.useId();
  const errorId = React.useId();
  const descriptionId = React.useId();

  const childElement = React.isValidElement(children) ? (children as AnyElement) : null;
  const childId = childElement?.props?.id ? (childElement.props.id as string) : fieldId;
  const hasError = Boolean(error);

  const shouldAutoShow =
    tooltipBehavior === 'auto' && hasError && (touched === true || (submitCount ?? 0) > 0);

  const [tooltipOpen, setTooltipOpen] = React.useState(shouldAutoShow);

  React.useEffect(() => {
    if (shouldAutoShow) setTooltipOpen(true);
  }, [shouldAutoShow]);

  const describedBy: string[] = [];
  if (description) describedBy.push(descriptionId);
  if (hasError) describedBy.push(errorId);

  const control = childElement
    ? React.cloneElement(childElement, {
        id: childId,
        'aria-describedby': describedBy.length > 0 ? describedBy.join(' ') : undefined,
        'aria-invalid': hasError ? true : undefined
      })
    : children;

  return (
    <div className="space-y-2">
      {label ? (
        <label htmlFor={childId} className="text-sm font-medium text-slate-900">
          {label}
          {required ? <span className="text-red-500"> *</span> : null}
        </label>
      ) : null}

      {description ? <p id={descriptionId} className="text-sm text-slate-500">{description}</p> : null}

      <div className="relative">
        {control}
        {hasError && errorMode === 'tooltip' ? (
          <div
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onMouseEnter={() => setTooltipOpen(true)}
            onMouseLeave={() => setTooltipOpen(shouldAutoShow)}
          >
            <button
              type="button"
              aria-label="Show error"
              aria-describedby={errorId}
              aria-expanded={tooltipOpen}
              className="text-red-500"
              onFocus={() => setTooltipOpen(true)}
              onBlur={() => setTooltipOpen(shouldAutoShow)}
            >
              <ErrorIcon />
            </button>
            {tooltipOpen ? (
              <div
                role="tooltip"
                id={errorId}
                tabIndex={0}
                className="absolute right-0 mt-2 w-56 rounded-md border border-red-200 bg-white p-2 text-xs text-red-700 shadow-lg"
              >
                {error}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      {hasError && errorMode === 'inline' ? (
        <p id={errorId} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
};
