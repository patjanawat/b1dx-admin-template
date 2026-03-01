'use client';

import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { FormField } from '../FormField';
import { Combobox } from '../../ui/Combobox';
import type { ComboboxOption } from '../../ui/Combobox';

export interface RHFComboboxProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  options: ComboboxOption[];
  label?: React.ReactNode;
  description?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
}

export const RHFCombobox = <TFieldValues extends FieldValues>({
  name,
  control,
  options,
  label,
  description,
  required,
  disabled,
  placeholder,
  searchPlaceholder,
  emptyText,
  className,
}: RHFComboboxProps<TFieldValues>) => (
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
        <Combobox
          options={options}
          value={field.value ?? ''}
          onValueChange={(v) => {
            field.onChange(v);
            field.onBlur();
          }}
          placeholder={placeholder}
          searchPlaceholder={searchPlaceholder}
          emptyText={emptyText}
          disabled={disabled}
          className={className}
        />
      </FormField>
    )}
  />
);
