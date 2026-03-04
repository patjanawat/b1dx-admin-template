"use client";

import React from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import type {
  ColumnDef,
  RowSelectionState,
  SortingState,
} from "@tanstack/react-table";
import { DataTable } from "../../ui/DataTable";
import { FormField } from "../FormField";

type ErrorMode = "inline" | "tooltip";

export interface SimpleTableValue {
  rowSelection: RowSelectionState;
  sorting: SortingState;
  pageIndex: number;
  pageSize: number;
}

export interface SimpleTableProps<
  TData,
  TFieldValues extends FieldValues,
  TValue = unknown,
> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /** Total row count. Defaults to data.length for client-side pagination. */
  total?: number;
  label?: React.ReactNode;
  description?: React.ReactNode;
  required?: boolean;
  errorMode?: ErrorMode;
  className?: string;
  pageSizeOptions?: number[];
  noResultsText?: string;
  isLoading?: boolean;
  enableRowSelection?: boolean;
}

export const SimpleTable = <
  TData,
  TFieldValues extends FieldValues,
  TValue = unknown,
>({
  name,
  control,
  columns,
  data,
  total,
  label,
  description,
  required,
  errorMode = "inline",
  className,
  pageSizeOptions = [10, 20, 50],
  noResultsText,
  isLoading,
  enableRowSelection=false,
}: SimpleTableProps<TData, TFieldValues, TValue>) => (
  <div className={className}>
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => {
        const value = field.value as SimpleTableValue;
        const totalCount = total ?? data.length;

        // Client-side sort across full dataset
        let sorted = data;
        if (value.sorting.length) {
          sorted = [...data].sort((a, b) => {
            for (const { id, desc } of value.sorting) {
              const aVal = (a as Record<string, unknown>)[id];
              const bVal = (b as Record<string, unknown>)[id];
              if (aVal == null && bVal == null) continue;
              if (aVal == null) return desc ? -1 : 1;
              if (bVal == null) return desc ? 1 : -1;
              if (aVal < bVal) return desc ? 1 : -1;
              if (aVal > bVal) return desc ? -1 : 1;
            }
            return 0;
          });
        }

        // Slice for current page before passing to DataTable (manualPagination: true)
        const start = value.pageIndex * value.pageSize;
        const pagedData = sorted.slice(start, start + value.pageSize);
        
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
              data={pagedData}
              sorting={value.sorting}
              onSortingChange={(updaterOrValue) => {
                const next =
                  typeof updaterOrValue === "function"
                    ? updaterOrValue(value.sorting)
                    : updaterOrValue;

                field.onChange({ ...value, sorting: next, pageIndex: 0 });
              }}
              {...(enableRowSelection && {
                rowSelection: value.rowSelection,
                onRowSelectionChange: (updaterOrValue: any) => {
                  const next =
                    typeof updaterOrValue === "function"
                      ? updaterOrValue(value.rowSelection)
                      : updaterOrValue;

                  field.onChange({ ...value, rowSelection: next });
                },
              })}
              pagination={{
                pageIndex: value.pageIndex,
                pageSize: value.pageSize,
                total: totalCount,
                pageSizeOptions,
                onPageChange: (pageIndex) => {
                  field.onChange({ ...value, pageIndex });
                },
                onPageSizeChange: (pageSize) => {
                  field.onChange({ ...value, pageIndex: 0, pageSize });
                },
              }}
            />
          </FormField>
        );
      }}
    />
  </div>
);
