'use client';

import React, { useState } from 'react';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { FormField } from '../FormField';
import { Input } from '../../ui/Input';
import { cn } from '../../../lib/cn';

type ErrorMode = 'inline' | 'tooltip';

export interface RHFPasswordInputProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: React.ReactNode;
  description?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  errorMode?: ErrorMode;
  placeholder?: string;
  autoComplete?: string;
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
}

export const RHFPasswordInput = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
  required,
  disabled,
  errorMode = 'inline',
  placeholder,
  autoComplete,
  showPasswordLabel = 'Show password',
  hidePasswordLabel = 'Hide password',
}: RHFPasswordInputProps<TFieldValues>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
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
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder={placeholder}
              autoComplete={autoComplete}
              disabled={disabled}
              aria-invalid={!!fieldState.error || undefined}
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              className="pr-10"
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? hidePasswordLabel : showPasswordLabel}
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2',
                'text-muted-foreground hover:text-foreground',
                'focus-visible:outline-none'
              )}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </FormField>
      )}
    />
  );
};
