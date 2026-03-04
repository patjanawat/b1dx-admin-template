import React, { useMemo, useState } from "react";
import { FilterProductsTableSection } from "./FilterProductsTableSection";
import { MOCK_PRODUCTS, MockProduct } from "../__mocks__/mockProducts";
import { ColumnDef } from "@b1dx/ui";
import { t } from "i18next";
import { FilterProductFormValues } from "../types/filterProducts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Control, useForm, useWatch } from "react-hook-form";
import { createFilterProductSchema } from "../schemas";

export type FilterProductGroupProps = {
  control: Control<FilterProductFormValues>;
  filteredProducts: MockProduct[];
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  selectAllLabel: string;
  searchPlaceholder: string;
  className?: string;
};

export function FilterProductGroup  (props: FilterProductGroupProps) {
  const filterProductSchema = useMemo(() => createFilterProductSchema(t), [t]);
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    clearErrors,
    watch,
    formState: { isSubmitting },
  } = useForm<FilterProductFormValues>({
    resolver: zodResolver(filterProductSchema),
    mode: "onSubmit",
    defaultValues: {
      skuFilter: "all",
      skuFrom: "",
      skuTo: "",
      itemFilter: "all",
      itemFrom: "",
      itemTo: "",
      table: {
        rowSelection: {},
        sorting: [],
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });

  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const rowSelection = useWatch({ control, name: "table.rowSelection" });
  const selectedItemCount = useMemo(
    () => Object.values(rowSelection ?? {}).filter(Boolean).length,
    [rowSelection],
  );

  const filteredProducts = useMemo(() => {
    if (!debouncedSearch) return MOCK_PRODUCTS;
    const query = debouncedSearch.toLowerCase();
    return MOCK_PRODUCTS.filter((product) =>
      [
        product.name,
        product.shop,
        product.barcode,
        product.sku,
        product.cfCode,
        product.shelf,
        String(product.id),
      ].some((value) => value.toLowerCase().includes(query)),
    );
  }, [debouncedSearch]);

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
    <div>
      <FilterProductsTableSection
        control={control}
        columns={columns}
        filteredProducts={filteredProducts}
        searchInput={searchInput}
        onSearchInputChange={setSearchInput}
        selectAllLabel={t("filter_products.select_all_count", {
          count: selectedItemCount,
        })}
        searchPlaceholder={t("common.search")}
        className="mt-4 space-y-4"
      />
    </div>
  );
}
