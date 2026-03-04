import React, { useMemo } from "react";
import { type ColumnDef } from "@b1dx/ui";
import { useTranslation } from "react-i18next";
import { type Control } from "react-hook-form";
import { type MockProduct } from "../__mocks__/mockProducts";
import type { FilterProductFormValues } from "../types";
import { FilterProductsTableSection } from "./FilterProductsTableSection";

export type FilterProductSKUProps = {
  control: Control<FilterProductFormValues>;
  filteredProducts: MockProduct[];
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  selectAllLabel: string;
  searchPlaceholder: string;
  className?: string;
};

const FilterProductSKU = ({
  control,
  filteredProducts,
  searchInput,
  onSearchInputChange,
  selectAllLabel,
  searchPlaceholder,
  className,
}: FilterProductSKUProps) => {
  const { t } = useTranslation();

  const columns = useMemo<ColumnDef<MockProduct>[]>(
    () => [
      {
        id: "select",
        enableSorting: false,
        header: ({ table }) => (
          <input
            type="checkbox"
            className="rounded border-border"
            checked={table.getIsAllPageRowsSelected()}
            onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            className="rounded border-border"
            checked={row.getIsSelected()}
            onChange={(e) => row.toggleSelected(e.target.checked)}
          />
        ),
      },
      {
        accessorKey: "id",
        header: t("filter_products.col_no"),
        enableSorting: false,
        cell: ({ getValue }) => (
          <span className="text-[12px] font-medium text-muted-foreground block text-center">
            {getValue<number>()}
          </span>
        ),
      },
      {
        accessorKey: "shop",
        header: t("common.shop"),
        enableSorting: false,
        cell: ({ getValue }) => (
          <span className="text-[12px] font-medium text-foreground/80">
            {getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: "name",
        header: t("filter_products.col_name"),
        enableSorting: false,
        cell: ({ getValue }) => (
          <span className="text-[12px] font-medium text-foreground/90 max-w-62.5 block">
            {getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: "barcode",
        header: t("filter_products.col_barcode"),
        enableSorting: false,
        cell: ({ getValue }) => (
          <span className="text-[12px] font-medium text-muted-foreground font-mono">
            {getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: "orders",
        header: t("filter_products.col_orders"),
        cell: ({ getValue }) => (
          <span className="text-[12px] font-medium text-foreground/80 block text-center">
            {getValue<number>()}
          </span>
        ),
      },
      {
        accessorKey: "toPack",
        header: t("filter_products.col_to_pack"),
        cell: ({ getValue }) => (
          <span className="text-[12px] font-medium text-foreground/80 block text-center">
            {getValue<number>()}
          </span>
        ),
      },
      {
        accessorKey: "stock",
        header: t("filter_products.col_stock"),
        cell: ({ getValue }) => (
          <span className="text-[12px] font-medium text-foreground/80 block text-center">
            {getValue<number>()}
          </span>
        ),
      },
      {
        accessorKey: "shortage",
        header: t("filter_products.col_shortage"),
        cell: ({ getValue }) => {
          const v = getValue<number>();
          return (
            <span
              className={[
                "text-[12px] font-bold block text-center",
                v < 0 ? "text-rose-500" : "text-foreground/80",
              ].join(" ")}
            >
              {v}
            </span>
          );
        },
      },
      {
        accessorKey: "sku",
        header: t("filter_products.col_sku"),
        enableSorting: false,
        cell: ({ getValue }) => (
          <span className="text-[12px] font-medium text-muted-foreground font-mono">
            {getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: "cfCode",
        header: t("filter_products.col_cf_code"),
        enableSorting: false,
        cell: ({ getValue }) => (
          <span className="text-[12px] font-medium text-muted-foreground">
            {getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: "shelf",
        header: t("filter_products.col_shelf"),
        enableSorting: false,
        cell: ({ getValue }) => (
          <span className="text-[12px] font-medium text-muted-foreground font-mono">
            {getValue<string>()}
          </span>
        ),
      },
    ],
    [t],
  );

  return (
    <FilterProductsTableSection
      control={control}
      columns={columns}
      filteredProducts={filteredProducts}
      searchInput={searchInput}
      onSearchInputChange={onSearchInputChange}
      selectAllLabel={selectAllLabel}
      searchPlaceholder={searchPlaceholder}
      className={className}
      enableRowSelection={false}
    />
  );
};

export default FilterProductSKU;
