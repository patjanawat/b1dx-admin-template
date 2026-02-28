'use client';

import React from 'react';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { FormField } from '../FormField';
import { Input } from '../../ui/Input';

type ErrorMode = 'inline' | 'tooltip';

export interface RHFTextInputProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: React.ReactNode;
  description?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  errorMode?: ErrorMode;
  type?: 'text' | 'email';
  placeholder?: string;
  autoComplete?: string;
}

export const RHFTextInput = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
  required,
  disabled,
  errorMode = 'inline',
  type = 'text',
  placeholder,
  autoComplete,
}: RHFTextInputProps<TFieldValues>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState, formState }) => (
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
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          value={field.value ?? ''}
          onChange={field.onChange}
          onBlur={field.onBlur}
          name={field.name}
          ref={field.ref}
        />
      </FormField>
    )}
  />
);
