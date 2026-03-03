'use client';

import React from 'react';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import type { ColumnDef, RowSelectionState, SortingState } from '@tanstack/react-table';
import { DataTable } from '../../ui/DataTable';
import { FormField } from '../FormField';

type ErrorMode = 'inline' | 'tooltip';

export interface SimpleTableValue {
  rowSelection: RowSelectionState;
  sorting: SortingState;
  pageIndex: number;
  pageSize: number;
}

export interface SimpleTableProps<TData, TFieldValues extends FieldValues, TValue = unknown> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total: number;
  label?: React.ReactNode;
  description?: React.ReactNode;
  required?: boolean;
  errorMode?: ErrorMode;
  className?: string;
  pageSizeOptions?: number[];
  noResultsText?: string;
  isLoading?: boolean;
}

export const SimpleTable = <TData, TFieldValues extends FieldValues, TValue = unknown>({
  name,
  control,
  columns,
  data,
  total,
  label,
  description,
  required,
  errorMode = 'inline',
  className,
  pageSizeOptions = [10, 20, 50],
  noResultsText,
  isLoading,
}: SimpleTableProps<TData, TFieldValues, TValue>) => (
  <div className={className}>
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => {
        const value = field.value as SimpleTableValue;

        return (
          <FormField
            label={label}
            description={description}
            required={required}
            error={fieldState.error?.message}
            errorMode={errorMode}
            touched={fieldState.isTouched}
            submitCount={formState.submitCount}
          >
            <DataTable
              columns={columns}
              data={data}
              sorting={value.sorting}
              onSortingChange={(updaterOrValue) => {
                const next =
                  typeof updaterOrValue === 'function'
                    ? updaterOrValue(value.sorting)
                    : updaterOrValue;
                field.onChange({ ...value, sorting: next });
              }}
              rowSelection={value.rowSelection}
              onRowSelectionChange={(updaterOrValue) => {
                const next =
                  typeof updaterOrValue === 'function'
                    ? updaterOrValue(value.rowSelection)
                    : updaterOrValue;
                field.onChange({ ...value, rowSelection: next });
              }}
              pagination={{
                pageIndex: value.pageIndex,
                pageSize: value.pageSize,
                total,
                pageSizeOptions,
                onPageChange: (pageIndex) => {
                  field.onChange({ ...value, pageIndex });
                },
                onPageSizeChange: (pageSize) => {
                  field.onChange({ ...value, pageIndex: 0, pageSize });
                },
              }}
              noResultsText={noResultsText}
              isLoading={isLoading}
            />
          </FormField>
        );
      }}
    />
  </div>
);
