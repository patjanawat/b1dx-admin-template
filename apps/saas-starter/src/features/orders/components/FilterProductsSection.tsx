'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Input,
  TabsWithFormWrapper,
  TabPlaceholder,
  SimpleRadioGroupField,
  SimpleDecimalField,
  SimpleTable,
  type ColumnDef,
  type RadioOption,
} from '@b1dx/ui';
import { Search } from 'lucide-react';
import { toast } from 'sonner';
import { MOCK_PRODUCTS, FILTER_WAREHOUSES, type MockProduct } from '../__mocks__/mockProducts';
import { createFilterProductSchema } from '../schemas';
import type { FilterProductFormValues } from '../types';

export function FilterProductsSection() {
  const { t } = useTranslation();
  const [selectedWarehouse, setSelectedWarehouse] = React.useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const filterProductSchema = useMemo(() => createFilterProductSchema(t), [t]);

  const { control, setValue, getValues, handleSubmit, clearErrors, watch, formState: { isSubmitting } } = useForm<FilterProductFormValues>({
    resolver: zodResolver(filterProductSchema),
    mode: 'onSubmit',
    defaultValues: {
      skuFilter:  'all',
      skuFrom:    '',
      skuTo:      '',
      itemFilter: 'all',
      itemFrom:   '',
      itemTo:     '',
      table: {
        rowSelection: {},
        sorting:      [],
        pageIndex:    0,
        pageSize:     10,
      },
    },
  });
  const skuFilter = watch('skuFilter');
  const itemFilter = watch('itemFilter');
  const skuFrom = watch('skuFrom');
  const skuTo = watch('skuTo');
  const itemFrom = watch('itemFrom');
  const itemTo = watch('itemTo');
  const rowSelection = useWatch({ control, name: 'table.rowSelection' });
  const selectedItemCount = useMemo(
    () => Object.values(rowSelection ?? {}).filter(Boolean).length,
    [rowSelection]
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
      ].some((value) => value.toLowerCase().includes(query))
    );
  }, [debouncedSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const currentTable = getValues('table');
    setValue('table', { ...currentTable, pageIndex: 0 });
  }, [debouncedSearch, getValues, setValue]);

  useEffect(() => {
    if (skuFilter === 'all') clearErrors(['skuFrom', 'skuTo']);
  }, [skuFilter, clearErrors]);

  useEffect(() => {
    if (itemFilter === 'all') clearErrors(['itemFrom', 'itemTo']);
  }, [itemFilter, clearErrors]);

  useEffect(() => {
    if (skuFilter === 'all' && (skuFrom.trim() || skuTo.trim())) {
      setValue('skuFilter', 'range', { shouldDirty: true, shouldValidate: true });
    }
  }, [skuFilter, skuFrom, skuTo, setValue]);

  useEffect(() => {
    if (itemFilter === 'all' && (itemFrom.trim() || itemTo.trim())) {
      setValue('itemFilter', 'range', { shouldDirty: true, shouldValidate: true });
    }
  }, [itemFilter, itemFrom, itemTo, setValue]);

  const filterModeOptions = useMemo<RadioOption[]>(() => [
    { value: 'all',   label: t('common.all') },
    { value: 'range', label: t('filter_products.filter_from') },
  ], [t]);

  const columns = useMemo<ColumnDef<MockProduct>[]>(() => [
    {
      id: 'select',
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
      accessorKey: 'id',
      header: t('filter_products.col_no'),
      enableSorting: false,
      cell: ({ getValue }) => (
        <span className="text-[12px] font-medium text-muted-foreground block text-center">{getValue<number>()}</span>
      ),
    },
    {
      accessorKey: 'shop',
      header: t('common.shop'),
      enableSorting: false,
      cell: ({ getValue }) => (
        <span className="text-[12px] font-medium text-foreground/80">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: 'name',
      header: t('filter_products.col_name'),
      enableSorting: false,
      cell: ({ getValue }) => (
        <span className="text-[12px] font-medium text-foreground/90 max-w-62.5 block">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: 'barcode',
      header: t('filter_products.col_barcode'),
      enableSorting: false,
      cell: ({ getValue }) => (
        <span className="text-[12px] font-medium text-muted-foreground font-mono">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: 'orders',
      header: t('filter_products.col_orders'),
      cell: ({ getValue }) => (
        <span className="text-[12px] font-medium text-foreground/80 block text-center">{getValue<number>()}</span>
      ),
    },
    {
      accessorKey: 'toPack',
      header: t('filter_products.col_to_pack'),
      cell: ({ getValue }) => (
        <span className="text-[12px] font-medium text-foreground/80 block text-center">{getValue<number>()}</span>
      ),
    },
    {
      accessorKey: 'stock',
      header: t('filter_products.col_stock'),
      cell: ({ getValue }) => (
        <span className="text-[12px] font-medium text-foreground/80 block text-center">{getValue<number>()}</span>
      ),
    },
    {
      accessorKey: 'shortage',
      header: t('filter_products.col_shortage'),
      cell: ({ getValue }) => {
        const v = getValue<number>();
        return (
          <span className={['text-[12px] font-bold block text-center', v < 0 ? 'text-rose-500' : 'text-foreground/80'].join(' ')}>
            {v}
          </span>
        );
      },
    },
    {
      accessorKey: 'sku',
      header: t('filter_products.col_sku'),
      enableSorting: false,
      cell: ({ getValue }) => (
        <span className="text-[12px] font-medium text-muted-foreground font-mono">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: 'cfCode',
      header: t('filter_products.col_cf_code'),
      enableSorting: false,
      cell: ({ getValue }) => (
        <span className="text-[12px] font-medium text-muted-foreground">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: 'shelf',
      header: t('filter_products.col_shelf'),
      enableSorting: false,
      cell: ({ getValue }) => (
        <span className="text-[12px] font-medium text-muted-foreground font-mono">{getValue<string>()}</span>
      ),
    },
  ], [t]);

  const handleProcess = handleSubmit((values) => {
    const selectedCount = Object.values(values.table.rowSelection).filter(Boolean).length;

    console.log('FilterProducts submit', {
      selectedCount,
      selectedWarehouse,
      searchInput: debouncedSearch,
      formValues: {
        skuFilter: values.skuFilter,
        skuFrom: values.skuFrom,
        skuTo: values.skuTo,
        itemFilter: values.itemFilter,
        itemFrom: values.itemFrom,
        itemTo: values.itemTo,
      },
      table: values.table,
    });

    toast.success(t('filter_products.toast_success'), {
      description: t('filter_products.toast_success_desc'),
    });
  });

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <form className="p-6 space-y-6" onSubmit={handleProcess} noValidate>
        <TabsWithFormWrapper
          tabs={FILTER_WAREHOUSES.map((w) => ({ value: w.id, label: w.label }))}
          value={selectedWarehouse}
          onValueChange={setSelectedWarehouse}
        >

        {selectedWarehouse === 'all' ? (<>

        {/* Filter controls */}

        <div className="grid gap-8 mt-4 mb-6 md:grid-cols-2">
          <div className="space-y-2">
            <p>{t('filter_products.sku_filter_label')}</p>
            <div className="flex items-center gap-3 flex-wrap">
              <SimpleRadioGroupField
              name="skuFilter"
              control={control}
              options={filterModeOptions}
            />
              <SimpleDecimalField
                name="skuFrom"
                control={control}
                placeholder="1"
                errorMode="tooltip"
                inputClassName="w-20 h-9 bg-muted/20 border-border/50" scale={2} />
                {t('filter_products.filter_to')}
                <SimpleDecimalField
                  name="skuTo"
                  control={control}
                  errorMode="tooltip"
                  inputClassName="w-20 h-9 bg-muted/20 border-border/50" scale={2} />
            </div>
          </div>
          <div className="space-y-2">
            <p>{t('filter_products.item_filter_label')}</p>
            <div className="flex items-center gap-3 flex-wrap">
              <SimpleRadioGroupField
              name="itemFilter"
              control={control}
              options={filterModeOptions}
            />
              <SimpleDecimalField
                name="itemFrom"
                control={control}
                placeholder="1"
                errorMode="tooltip"
                inputClassName="w-20 h-9 bg-muted/20 border-border/50" scale={2} />
                {t('filter_products.filter_to')}
                <SimpleDecimalField
                  name="itemTo"
                  control={control}
                  errorMode="tooltip"
                  inputClassName="w-20 h-9 bg-muted/20 border-border/50" scale={2} />
                  {t('filter_products.filter_unit_items')}
            </div>
          </div>
        </div>

        {/* Product table */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-foreground">
              {t('filter_products.select_all_count', { count: selectedItemCount })}
            </span>
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder={t('common.search')}
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
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
          />
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-end bg-muted/5 rounded-xl p-4">
          <Button type="submit" className="px-10 h-11" disabled={isSubmitting}>
            {t('filter_products.btn_process')}
          </Button>
        </div>

        </>) : (
          <TabPlaceholder label={FILTER_WAREHOUSES.find((w) => w.id === selectedWarehouse)?.label} />
        )}

        </TabsWithFormWrapper>
      </form>
    </div>
  );
}
