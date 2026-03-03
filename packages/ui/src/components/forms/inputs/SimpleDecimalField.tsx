'use client';

import React from 'react';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { parseDecimalInput } from '../../../lib/number';
import { FormField } from '../FormField';
import { Input } from '../../ui/Input';

type ErrorMode = 'inline' | 'tooltip';

const sanitizeDecimalInput = (value: string, allowNegative: boolean): string => {
  let next = value.replace(/[^0-9,.-]/g, '');
  const isNegative = allowNegative && next.includes('-');
  next = next.replace(/-/g, '');
  if (isNegative) next = `-${next}`;
  return next;
};

const clampScale = (value: string, scale: number): string => {
  if (!value.includes('.')) return value;
  const [intPart, fracPart = ''] = value.split('.');
  if (scale < 0) return value;
  return `${intPart}.${fracPart.slice(0, scale)}`;
};

export interface SimpleDecimalFieldProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: React.ReactNode;
  description?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  errorMode?: ErrorMode;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  scale?: number;
  allowNegative?: boolean;
}

export const SimpleDecimalField = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
  required,
  disabled,
  errorMode = 'inline',
  className,
  inputClassName,
  placeholder,
  scale = 2,
  allowNegative = false,
}: SimpleDecimalFieldProps<TFieldValues>) => (
  <div className={className}>
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => {
        const rawValue = typeof field.value === 'string' ? field.value : '';

        return (
          <FormField
            label={label}
            description={description}
            required={required}
            error={fieldState.error?.message}
            errorMode={errorMode}
            touched={fieldState.isTouched}
            submitCount={formState.submitCount}
          >
            <Input
              type="text"
              value={rawValue}
              disabled={disabled}
              placeholder={placeholder}
              className={inputClassName}
              onChange={(e) => {
                const next = sanitizeDecimalInput(e.target.value, allowNegative);
                field.onChange(next);
              }}
              onBlur={() => {
                let normalized = parseDecimalInput(rawValue);
                if (!allowNegative && normalized.startsWith('-')) {
                  normalized = normalized.slice(1);
                }
                if (normalized) {
                  normalized = clampScale(normalized, scale);
                }
                field.onChange(normalized);
                field.onBlur();
              }}
              name={field.name}
              ref={field.ref}
            />
          </FormField>
        );
      }}
    />
  </div>
);
