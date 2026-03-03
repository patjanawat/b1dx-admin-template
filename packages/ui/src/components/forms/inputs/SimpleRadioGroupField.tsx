'use client';

import React from 'react';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { FormField } from '../FormField';
import { RadioGroup, RadioGroupItem } from '../../ui/RadioGroup';
import { cn } from '../../../lib/cn';

export interface RadioOption {
  label: string;
  value: string;
}

export interface SimpleRadioGroupFieldProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  options: RadioOption[];
  label?: React.ReactNode;
  description?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const SimpleRadioGroupField = <TFieldValues extends FieldValues>({
  name,
  control,
  options,
  label,
  description,
  required,
  disabled,
  orientation = 'horizontal',
  className,
}: SimpleRadioGroupFieldProps<TFieldValues>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState, formState }) => (
      <FormField
        label={label}
        description={description}
        required={required}
        error={fieldState.error?.message}
        touched={fieldState.isTouched}
        submitCount={formState.submitCount}
      >
        <RadioGroup
          value={field.value ?? ''}
          onValueChange={(v) => {
            field.onChange(v);
            field.onBlur();
          }}
          disabled={disabled}
          orientation={orientation}
          className={cn(
            orientation === 'horizontal' ? 'flex flex-wrap gap-x-4 gap-y-2' : 'flex flex-col gap-2',
            className
          )}
        >
          {options.map((opt) => (
            <label
              key={opt.value}
              className={cn(
                'flex cursor-pointer items-center gap-2 text-sm',
                !!disabled && 'cursor-not-allowed opacity-60'
              )}
            >
              <RadioGroupItem value={opt.value} />
              {opt.label}
            </label>
          ))}
        </RadioGroup>
      </FormField>
    )}
  />
);
