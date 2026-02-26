'use client';

import React from 'react';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { FormField } from '../FormField';
import { Input } from '../../ui/Input';

type ErrorMode = 'inline' | 'tooltip';

export interface RHFDatePickerProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: React.ReactNode;
  description?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  errorMode?: ErrorMode;
  minDate?: Date;
  maxDate?: Date;
  disableDates?: (date: Date) => boolean;
}

const toDateInputValue = (date: Date): string => {
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60_000);
  return local.toISOString().slice(0, 10);
};

const parseDateInputValue = (value: string): Date | null => {
  if (!value) return null;
  const parsed = new Date(`${value}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const isDate = (value: unknown): value is Date =>
  typeof value === 'object' && value !== null && value instanceof Date;

export const RHFDatePicker = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
  required,
  disabled,
  errorMode = 'inline',
  minDate,
  maxDate,
  disableDates
}: RHFDatePickerProps<TFieldValues>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState, formState }) => {
      const errorMessage = fieldState.error?.message;
      const value = isDate(field.value) ? field.value : null;
      const displayValue = value ? toDateInputValue(value) : '';

      return (
        <FormField
          label={label}
          description={description}
          required={required}
          error={errorMessage}
          errorMode={errorMode}
          touched={fieldState.isTouched}
          submitCount={formState.submitCount}
        >
          <Input
            type="date"
            value={displayValue}
            min={minDate ? toDateInputValue(minDate) : undefined}
            max={maxDate ? toDateInputValue(maxDate) : undefined}
            disabled={disabled}
            onChange={(event) => {
              const next = parseDateInputValue(event.target.value);
              if (next && disableDates?.(next)) return;
              field.onChange(next);
            }}
            onBlur={field.onBlur}
          />
        </FormField>
      );
    }}
  />
);
