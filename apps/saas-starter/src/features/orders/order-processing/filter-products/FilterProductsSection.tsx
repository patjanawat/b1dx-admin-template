'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Input,
  TabsWithFormWrapper,
  TabPlaceholder,
  SimpleRadioGroupField,
  SimpleDecimalField,
  SimpleTable,
  type SimpleTableValue,
  type ColumnDef,
  type RadioOption,
} from '@b1dx/ui';
import { Search } from 'lucide-react';
import { toast } from 'sonner';
import { MOCK_PRODUCTS, FILTER_WAREHOUSES, type MockProduct } from '../../__mocks__/mockProducts';

interface FilterProductFormValues {
  skuFilter:  'all' | 'range';
  skuFrom:    string;
  skuTo:      string;
  itemFilter: 'all' | 'range';
  itemFrom:   string;
  itemTo:     string;
  table:      SimpleTableValue;
}

const FILTER_MODE_OPTIONS: RadioOption[] = [
  { value: 'all',   label: 'ทั้งหมด' },
  { value: 'range', label: 'จาก' },
];

const PRODUCT_COLUMNS: ColumnDef<MockProduct>[] = [
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
    header: 'No',
    enableSorting: false,
    cell: ({ getValue }) => (
      <span className="text-[12px] font-medium text-muted-foreground block text-center">{getValue<number>()}</span>
    ),
  },
  {
    accessorKey: 'shop',
    header: 'ร้านค้า',
    enableSorting: false,
    cell: ({ getValue }) => (
      <span className="text-[12px] font-medium text-foreground/80">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: 'name',
    header: 'ชื่อ',
    enableSorting: false,
    cell: ({ getValue }) => (
      <span className="text-[12px] font-medium text-foreground/90 max-w-62.5 block">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: 'barcode',
    header: 'Barcode',
    enableSorting: false,
    cell: ({ getValue }) => (
      <span className="text-[12px] font-medium text-muted-foreground font-mono">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: 'orders',
    header: 'จำนวนออเดอร์',
    cell: ({ getValue }) => (
      <span className="text-[12px] font-medium text-foreground/80 block text-center">{getValue<number>()}</span>
    ),
  },
  {
    accessorKey: 'toPack',
    header: 'จำนวนต้องแพ็ค',
    cell: ({ getValue }) => (
      <span className="text-[12px] font-medium text-foreground/80 block text-center">{getValue<number>()}</span>
    ),
  },
  {
    accessorKey: 'stock',
    header: 'สต็อกที่มี',
    cell: ({ getValue }) => (
      <span className="text-[12px] font-medium text-foreground/80 block text-center">{getValue<number>()}</span>
    ),
  },
  {
    accessorKey: 'shortage',
    header: 'ขาดสต็อก',
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
    header: 'SKU',
    enableSorting: false,
    cell: ({ getValue }) => (
      <span className="text-[12px] font-medium text-muted-foreground font-mono">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: 'cfCode',
    header: 'รหัส CF',
    enableSorting: false,
    cell: ({ getValue }) => (
      <span className="text-[12px] font-medium text-muted-foreground">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: 'shelf',
    header: 'ชั้นวาง',
    enableSorting: false,
    cell: ({ getValue }) => (
      <span className="text-[12px] font-medium text-muted-foreground font-mono">{getValue<string>()}</span>
    ),
  },
];

export function FilterProductsSection() {
  const [selectedWarehouse, setSelectedWarehouse] = React.useState('all');
  const { control } = useForm<FilterProductFormValues>({
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

  const handleProcess = () => {
    toast.success('ดำเนินการเรียบร้อยแล้ว', {
      description: 'รายการสินค้าที่เลือกได้รับการประมวลผลแล้ว',
    });
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="p-6 space-y-6">
        <TabsWithFormWrapper
          tabs={FILTER_WAREHOUSES.map((w) => ({ value: w.id, label: w.label }))}
          value={selectedWarehouse}
          onValueChange={setSelectedWarehouse}
        >

        {selectedWarehouse === 'all' ? (<>

        {/* Filter controls */}

        <div className="flex flex-wrap gap-x-8 gap-y-4 mt-2 mb-4">
          <div className="space-y-2">
            <p>จำนวน SKU ในออเดอร์</p>
            <div className="flex items-center gap-3 flex-wrap">
              <SimpleRadioGroupField
              name="skuFilter"
              control={control}
              options={FILTER_MODE_OPTIONS}
            />
              <SimpleDecimalField name="skuFrom" control={control} placeholder="1" inputClassName="w-20 h-9 bg-muted/20 border-border/50" scale={0} /> ถึง <SimpleDecimalField name="skuTo" control={control} inputClassName="w-20 h-9 bg-muted/20 border-border/50" scale={0} />
            </div>
          </div>
          <div className="space-y-2">
            <p>จำนวน ชิ้น ในออเดอร์</p>
            <div className="flex items-center gap-3 flex-wrap">
              <SimpleRadioGroupField
              name="itemFilter"
              control={control}
              options={FILTER_MODE_OPTIONS}
            />
              <SimpleDecimalField name="itemFrom" control={control} placeholder="1" inputClassName="w-20 h-9 bg-muted/20 border-border/50" scale={0} /> ถึง <SimpleDecimalField name="itemTo" control={control} inputClassName="w-20 h-9 bg-muted/20 border-border/50" scale={0} /> ชิ้น
            </div>
          </div>
        </div>

        {/* Product table */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-foreground">เลือกทั้งหมด {MOCK_PRODUCTS.length} รายการ</span>
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input placeholder="ค้นหา" className="pl-10 h-11 border-border/50 bg-muted/10" />
            </div>
          </div>
          <SimpleTable<MockProduct, FilterProductFormValues>
            name="table"
            control={control}
            columns={PRODUCT_COLUMNS}
            data={MOCK_PRODUCTS}
            total={MOCK_PRODUCTS.length}
          />
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-end bg-muted/5 rounded-xl p-4">
          <Button onClick={handleProcess} className="px-10 h-11">
            ดำเนินการ
          </Button>
        </div>

        </>) : (
          <TabPlaceholder label={FILTER_WAREHOUSES.find((w) => w.id === selectedWarehouse)?.label} />
        )}

        </TabsWithFormWrapper>
      </div>
    </div>
  );
}
