'use client';

import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { Combobox, type ComboboxOption } from '../../ui/Combobox';

function FilterLabel({ text }: { text: string }) {
  return (
    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
      {text}
    </p>
  );
}

export interface SimpleOptionFieldProps<TFieldValues extends FieldValues> {
  className?: string;
  label: string;
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  /** เมื่อ field.value เท่ากับค่านี้ ถือว่า "ไม่ได้กรอง" → ไม่แสดง badge */
  noneValue?: string;
}

export const SimpleOptionField = <TFieldValues extends FieldValues>({
  className,
  label,
  name,
  control,
  options,
  placeholder,
  searchPlaceholder,
  emptyText,
  disabled,
  noneValue,
}: SimpleOptionFieldProps<TFieldValues>) => (
  <div className={className}>
    <FilterLabel text={label} />
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const badgeCount =
          noneValue !== undefined && field.value !== noneValue ? 1 : undefined;

        return (
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
            badgeCount={badgeCount}
          />
        );
      }}
    />
  </div>
);
