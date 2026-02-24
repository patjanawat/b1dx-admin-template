import React from 'react';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { formatCurrency, formatDecimal } from '../../../lib/format';
import { parseDecimalInput } from '../../../lib/number';
import { FormField } from '../FormField';
import { Input } from '../../ui/Input';

type ErrorMode = 'inline' | 'tooltip';

type DecimalFormatProps = {
  format?: 'decimal';
  currency?: never;
};

type CurrencyFormatProps = {
  format: 'currency';
  currency: 'THB' | 'USD';
};

export interface RHFDecimalInputBaseProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: React.ReactNode;
  description?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  errorMode?: ErrorMode;
  scale?: number;
  allowNegative?: boolean;
  locale?: string;
}

export type RHFDecimalInputProps<TFieldValues extends FieldValues> = RHFDecimalInputBaseProps<TFieldValues> &
  (DecimalFormatProps | CurrencyFormatProps);

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

export const RHFDecimalInput = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
  required,
  disabled,
  errorMode = 'inline',
  format = 'decimal',
  currency,
  scale = 2,
  allowNegative = false,
  locale
}: RHFDecimalInputProps<TFieldValues>) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => {
        const errorMessage = fieldState.error?.message;
        const rawValue = typeof field.value === 'string' ? field.value : '';

        const formatValue = (value: string) => {
          const normalized = parseDecimalInput(value);
          if (!normalized) return '';
          const numeric = Number(normalized);
          if (!Number.isFinite(numeric)) return normalized;
          if (format === 'currency') {
            return formatCurrency(numeric, {
              currency: currency ?? 'USD',
              locale,
              minimumFractionDigits: scale,
              maximumFractionDigits: scale
            });
          }
          return formatDecimal(numeric, {
            locale,
            minimumFractionDigits: scale,
            maximumFractionDigits: scale
          });
        };

        const displayValue = isFocused ? rawValue : formatValue(rawValue);

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
              type="text"
              value={displayValue}
              disabled={disabled}
              onFocus={() => setIsFocused(true)}
              onChange={(event) => {
                const next = sanitizeDecimalInput(event.target.value, allowNegative);
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
                setIsFocused(false);
                field.onBlur();
              }}
            />
          </FormField>
        );
      }}
    />
  );
};
