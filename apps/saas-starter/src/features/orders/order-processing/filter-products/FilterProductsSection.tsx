'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Input,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TabsWithFormWrapper,
  TabPlaceholder,
  SimpleRadioGroupField,
  SimpleDecimalField,
  type RadioOption,
} from '@b1dx/ui';
import { Search } from 'lucide-react';
import { toast } from 'sonner';
import { MOCK_PRODUCTS, FILTER_WAREHOUSES } from '../../__mocks__/mockProducts';

interface FilterProductFormValues {
  skuFilter:  'all' | 'range';
  skuFrom:    string;
  skuTo:      string;
  itemFilter: 'all' | 'range';
  itemFrom:   string;
  itemTo:     string;
}

const FILTER_MODE_OPTIONS: RadioOption[] = [
  { value: 'all',   label: 'ทั้งหมด' },
  { value: 'range', label: 'จาก' },
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 mt-2 mb-4">
            <div className="flex items-end gap-4">
              <SimpleRadioGroupField
                name="skuFilter"
                control={control}
                label="จำนวน SKU ในออเดอร์"
                options={FILTER_MODE_OPTIONS}                
              />
              <SimpleDecimalField name="skuFrom" control={control} placeholder="1" inputClassName="w-20 h-9 bg-muted/20 border-border/50" scale={0} />
              <span className="text-sm text-muted-foreground pb-1">ถึง</span>
              <SimpleDecimalField name="skuTo" control={control} inputClassName="w-20 h-9 bg-muted/20 border-border/50" scale={0} />
              <span className="text-sm font-medium text-muted-foreground pb-1">SKU</span>
            </div>
            <div className="flex items-end gap-4">
              <SimpleRadioGroupField
                name="itemFilter"
                control={control}
                label="จำนวน ชิ้น ในออเดอร์"
                options={FILTER_MODE_OPTIONS}                  
              />
              <SimpleDecimalField name="itemFrom" control={control} placeholder="1" inputClassName="w-20 h-9 bg-muted/20 border-border/50" scale={0} />
              <span className="text-sm text-muted-foreground pb-1">ถึง</span>
              <SimpleDecimalField name="itemTo" control={control} inputClassName="w-20 h-9 bg-muted/20 border-border/50" scale={0} />
              <span className="text-sm font-medium text-muted-foreground pb-1">ชิ้น</span>
            </div>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input placeholder="ค้นหา" className="pl-10 h-11 border-border/50 bg-muted/10" />
          </div>
        </div>

        {/* Product table */}
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/10 hover:bg-muted/10">
                <TableHead className="w-[50px] pl-4">
                  <input type="checkbox" defaultChecked className="rounded border-border" />
                </TableHead>
                <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider text-center">No</TableHead>
                <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">ร้านค้า</TableHead>
                <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">ชื่อ</TableHead>
                <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Barcode</TableHead>
                <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider text-center">จำนวนออเดอร์</TableHead>
                <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider text-center">จำนวนต้องแพ็ค</TableHead>
                <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider text-center">สต็อกที่มี</TableHead>
                <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider text-center">ขาดสต็อก</TableHead>
                <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">SKU</TableHead>
                <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">รหัส CF</TableHead>
                <TableHead className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">ชั้นวาง</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_PRODUCTS.map((product) => (
                <TableRow key={product.id} className="border-border/50 hover:bg-muted/5 transition-colors">
                  <TableCell className="pl-4">
                    <input type="checkbox" defaultChecked className="rounded border-border" />
                  </TableCell>
                  <TableCell className="text-[12px] font-medium text-muted-foreground text-center">{product.id}</TableCell>
                  <TableCell className="text-[12px] font-medium text-foreground/80">{product.shop}</TableCell>
                  <TableCell className="text-[12px] font-medium text-foreground/90 max-w-[250px]">{product.name}</TableCell>
                  <TableCell className="text-[12px] font-medium text-muted-foreground font-mono">{product.barcode}</TableCell>
                  <TableCell className="text-[12px] font-medium text-foreground/80 text-center">{product.orders}</TableCell>
                  <TableCell className="text-[12px] font-medium text-foreground/80 text-center">{product.toPack}</TableCell>
                  <TableCell className="text-[12px] font-medium text-foreground/80 text-center">{product.stock}</TableCell>
                  <TableCell className={[
                    'text-[12px] font-bold text-center',
                    product.shortage < 0 ? 'text-rose-500' : 'text-foreground/80',
                  ].join(' ')}>
                    {product.shortage}
                  </TableCell>
                  <TableCell className="text-[12px] font-medium text-muted-foreground font-mono">{product.sku}</TableCell>
                  <TableCell className="text-[12px] font-medium text-muted-foreground">{product.cfCode}</TableCell>
                  <TableCell className="text-[12px] font-medium text-muted-foreground font-mono">{product.shelf}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-between bg-muted/5 rounded-xl p-4">
          <span className="text-sm font-bold text-foreground">เลือกทั้งหมด {MOCK_PRODUCTS.length} รายการ</span>
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
