"use client";

import { Input, SimpleTable, type ColumnDef } from "@b1dx/ui";
import { Search } from "lucide-react";
import type { Control } from "react-hook-form";
import type { MockProduct } from "../__mocks__/mockProducts";
import type { FilterProductFormValues } from "../types";

export type FilterProductsTableSectionProps = {
  control: Control<FilterProductFormValues>;
  columns: ColumnDef<MockProduct>[];
  filteredProducts: MockProduct[];
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  selectAllLabel: string;
  searchPlaceholder: string;
  className?: string;
  enableRowSelection?: boolean;
};

export function FilterProductsTableSection({
  control,
  columns,
  filteredProducts,
  searchInput,
  onSearchInputChange,
  selectAllLabel,
  searchPlaceholder,
  className = "space-y-2",
  enableRowSelection,
}: FilterProductsTableSectionProps) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-foreground">
          {selectAllLabel}
        </span>
        <div className="relative w-80">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input
            placeholder={searchPlaceholder}
            value={searchInput}
            onChange={(event) => onSearchInputChange(event.target.value)}
            className="pl-10 h-11 border-border/50 bg-muted/10"
          />
        </div>
      </div>
      <SimpleTable<MockProduct, FilterProductFormValues>
        name="table"
        control={control}
        columns={columns}
        data={filteredProducts}
        total={filteredProducts.length}
        enableRowSelection={false}
      />
    </div>
  );
}
