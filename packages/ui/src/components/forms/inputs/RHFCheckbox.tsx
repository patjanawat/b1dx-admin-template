'use client';

import React from 'react';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { cn } from '../../../lib/cn';

export interface RHFCheckboxProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: React.ReactNode;
  description?: string;
  disabled?: boolean;
}

export const RHFCheckbox = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
  disabled,
}: RHFCheckboxProps<TFieldValues>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <div className="space-y-1">
        <label className={cn('flex cursor-pointer items-center gap-2', !!disabled && 'cursor-not-allowed opacity-60')}>
          <input
            type="checkbox"
            checked={!!field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            ref={field.ref}
            disabled={disabled}
            className="h-4 w-4 rounded border-border accent-primary"
          />
          {label ? <span className="text-sm text-foreground">{label}</span> : null}
        </label>
        {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
      </div>
    )}
  />
);
