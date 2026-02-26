'use client';

import React from 'react';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { clampNumber } from '../../../lib/number';
import { FormField } from '../FormField';
import { Input } from '../../ui/Input';

type ErrorMode = 'inline' | 'tooltip';

export interface RHFNumberInputProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: React.ReactNode;
  description?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  errorMode?: ErrorMode;
  min?: number;
  max?: number;
  step?: number;
  allowEmpty?: boolean;
}

export const RHFNumberInput = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
  required,
  disabled,
  errorMode = 'inline',
  min,
  max,
  step = 1,
  allowEmpty = true
}: RHFNumberInputProps<TFieldValues>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState, formState }) => {
      const errorMessage = fieldState.error?.message;
      const value = typeof field.value === 'number' ? field.value : null;
      const displayValue = value === null || Number.isNaN(value) ? '' : String(value);

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
            type="number"
            value={displayValue}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            onChange={(event) => {
              const next = event.target.value;
              if (next === '') {
                if (allowEmpty) field.onChange(null);
                return;
              }
              const parsed = Number(next);
              field.onChange(Number.isFinite(parsed) ? parsed : null);
            }}
            onBlur={(event) => {
              const next = event.target.value;
              if (next === '') {
                if (allowEmpty) field.onChange(null);
                field.onBlur();
                return;
              }
              const parsed = Number(next);
              if (Number.isFinite(parsed)) {
                field.onChange(clampNumber(parsed, { min, max }));
              }
              field.onBlur();
            }}
            onWheel={(event) => {
              if (document.activeElement === event.currentTarget) {
                event.currentTarget.blur();
              }
            }}
          />
        </FormField>
      );
    }}
  />
);
