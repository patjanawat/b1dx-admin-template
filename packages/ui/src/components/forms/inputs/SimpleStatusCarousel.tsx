'use client';

import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { AppStatusCarousel, type StatusCarouselTab } from '../../app/AppStatusCarousel';

export interface SimpleStatusCarouselProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  tabs: StatusCarouselTab[];
  label?: string;
}

export const SimpleStatusCarousel = <TFieldValues extends FieldValues>({
  name,
  control,
  tabs,
  label,
}: SimpleStatusCarouselProps<TFieldValues>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <AppStatusCarousel
        tabs={tabs}
        activeTab={typeof field.value === 'number' ? field.value : 0}
        onTabChange={(index: number) => {
          field.onChange(index);
          field.onBlur();
        }}
        label={label}
      />
    )}
  />
);
