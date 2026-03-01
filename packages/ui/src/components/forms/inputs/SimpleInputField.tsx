'use client';

import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { Input } from '../../ui/Input';

function FilterLabel({ text }: { text: string }) {
  return (
    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
      {text}
    </p>
  );
}

export interface SimpleInputFieldProps<TFieldValues extends FieldValues> {
  className?: string;
  label: string;
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  placeholder?: string;
  type?: 'text' | 'email' | 'search';
  disabled?: boolean;
  inputClassName?: string;
}

export const SimpleInputField = <TFieldValues extends FieldValues>({
  className,
  label,
  name,
  control,
  placeholder,
  type = 'text',
  disabled,
  inputClassName,
}: SimpleInputFieldProps<TFieldValues>) => (
  <div className={className}>
    <FilterLabel text={label} />
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          type={type}
          value={field.value ?? ''}
          onChange={field.onChange}
          onBlur={field.onBlur}
          name={field.name}
          ref={field.ref}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClassName}
        />
      )}
    />
  </div>
);
