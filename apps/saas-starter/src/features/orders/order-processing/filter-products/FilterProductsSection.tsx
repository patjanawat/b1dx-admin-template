'use client';

import React from 'react';
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
} from '@b1dx/ui';
import { Search } from 'lucide-react';
import { toast } from 'sonner';
import { MOCK_PRODUCTS, FILTER_WAREHOUSES } from '../../__mocks__/mockProducts';

export function FilterProductsSection() {
  const [selectedWarehouse, setSelectedWarehouse] = React.useState('all');

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
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-muted-foreground w-40">จำนวน SKU ในออเดอร์ :</span>
              <div className="flex items-center gap-2">
                <input type="radio" name="sku-filter" id="sku-all" defaultChecked className="w-4 h-4 accent-primary" />
                <label htmlFor="sku-all" className="text-sm font-medium text-foreground/80">ทั้งหมด</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" name="sku-filter" id="sku-range" className="w-4 h-4 accent-primary" />
                <label htmlFor="sku-range" className="text-sm font-medium text-foreground/80">จาก</label>
              </div>
              <Input className="w-20 h-9 bg-muted/20 border-border/50" placeholder="1" />
              <span className="text-sm text-muted-foreground">ถึง</span>
              <Input className="w-20 h-9 bg-muted/20 border-border/50" placeholder="" />
              <span className="text-sm font-medium text-muted-foreground">SKU</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-muted-foreground w-40">จำนวน ชิ้น ในออเดอร์ :</span>
              <div className="flex items-center gap-2">
                <input type="radio" name="item-filter" id="item-all" defaultChecked className="w-4 h-4 accent-primary" />
                <label htmlFor="item-all" className="text-sm font-medium text-foreground/80">ทั้งหมด</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" name="item-filter" id="item-range" className="w-4 h-4 accent-primary" />
                <label htmlFor="item-range" className="text-sm font-medium text-foreground/80">จาก</label>
              </div>
              <Input className="w-20 h-9 bg-muted/20 border-border/50" placeholder="1" />
              <span className="text-sm text-muted-foreground">ถึง</span>
              <Input className="w-20 h-9 bg-muted/20 border-border/50" placeholder="" />
              <span className="text-sm font-medium text-muted-foreground">ชิ้น</span>
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
