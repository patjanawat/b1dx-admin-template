'use client';

import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { LineTabs, type LineTab } from '../../ui/LineTabs';

export interface SimpleLineTabsProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  tabs: LineTab[];
  className?: string;
}

export const SimpleLineTabs = <TFieldValues extends FieldValues>({
  name,
  control,
  tabs,
  className,
}: SimpleLineTabsProps<TFieldValues>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <LineTabs
        tabs={tabs}
        value={field.value ?? ''}
        onValueChange={(v) => {
          field.onChange(v);
          field.onBlur();
        }}
        className={className}
      />
    )}
  />
);
