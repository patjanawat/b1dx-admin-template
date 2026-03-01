'use client';

import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { DatePicker } from '../../ui/DatePicker';

function FilterLabel({ text }: { text?: string }) {
  if (!text) return <p className="mb-2 text-xs opacity-0 select-none">&nbsp;</p>;
  return (
    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
      {text}
    </p>
  );
}

export interface SimpleDateTimeFieldProps<TFieldValues extends FieldValues> {
  className?: string;
  label?: string;
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  collisionBoundary?: Element | null;
}

export function SimpleDateTimeField<TFieldValues extends FieldValues>({
  className,
  label,
  name,
  control,
  placeholder,
  disabled,
  minDate: _minDate,
  maxDate: _maxDate,
  collisionBoundary,
}: SimpleDateTimeFieldProps<TFieldValues>) {
  return (
    <div className={className}>
      <FilterLabel text={label} />
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const raw: unknown = field.value;
          const dateValue = raw instanceof Date ? raw : undefined;
          return (
            <DatePicker
              value={dateValue}
              onChange={(date) => {
                field.onChange(date ?? null);
                field.onBlur();
              }}
              placeholder={placeholder}
              disabled={disabled}
              collisionBoundary={collisionBoundary}
            />
          );
        }}
      />
    </div>
  );
}
