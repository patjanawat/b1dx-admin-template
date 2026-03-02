'use client';

import React from 'react';
import {
  AppPageHeader,
  ExportExcelButton,
  Input,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@b1dx/ui';
import { Search } from 'lucide-react';
import { toast } from 'sonner';

/* ── Mock data ────────────────────────────────────────────────────── */

const MOCK_PRODUCTS = [
  { id: 1, shop: 'SAUCE THAI', name: 'ซอสแกงเขียวหวาน ตรา มะหญิง By พริกคั่วกะปิหอม',                          barcode: '001-1',        orders: 1, toPack: 1, stock: 0,   shortage: -1, sku: '001',         cfCode: '', shelf: ''               },
  { id: 2, shop: 'SAUCE THAI', name: 'ซอสผัดเข้มข้น Stir-Fried Sauce ตรา มะหญิง By พริกคั่วกะปิหอม',           barcode: '42623107186',  orders: 1, toPack: 2, stock: 98,  shortage: 0,  sku: '42623107186', cfCode: '', shelf: ''               },
  { id: 3, shop: 'SAUCE THAI', name: 'ซอสแกงคั่ว ตรา มะหญิง By พริกคั่วกะปิหอม',                               barcode: '',             orders: 1, toPack: 1, stock: 190, shortage: 0,  sku: '006',         cfCode: '', shelf: 'W01R01C01RK01' },
  { id: 4, shop: 'SAUCE THAI', name: 'ซอสผัดกะเพรา ตรา มะหญิง By พริกคั่วกะปิหอม',                             barcode: '002-1',        orders: 1, toPack: 1, stock: 108, shortage: 0,  sku: '002',         cfCode: '', shelf: 'W01R01C01RK01' },
];

const WAREHOUSES = [
  { id: 'all',         label: 'All Warehouses' },
  { id: 'sauce-thai',  label: 'SAUCE THAI'     },
  { id: 'warehouse-b', label: 'Warehouse B'    },
  { id: 'warehouse-c', label: 'Warehouse C'    },
];

/* ── Component ────────────────────────────────────────────────────── */

export default function FilterProductsPage() {
  const [selectedWarehouse, setSelectedWarehouse] = React.useState('all');

  const handleExport = () => {
    toast.success('ส่งออกไฟล์ Excel เรียบร้อยแล้ว', {
      description: 'ไฟล์กำลังถูกดาวน์โหลดลงในเครื่องของคุณ',
    });
  };

  const handleProcess = () => {
    toast.success('ดำเนินการเรียบร้อยแล้ว', {
      description: 'รายการสินค้าที่เลือกได้รับการประมวลผลแล้ว',
    });
  };

  return (
    <div className="space-y-6">

      <AppPageHeader
        title="ตัวกรองสินค้า"
        description="จัดการและกรองรายการสินค้าตามเงื่อนไขที่ต้องการ เพื่อความสะดวกในการแพ็คและจัดส่ง"
        actions={
          <ExportExcelButton onClick={handleExport}>EXPORT EXCEL</ExportExcelButton>
        }
      />

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 space-y-6">

          {/* Warehouse tabs */}
          <div className="border-b border-border w-full">
            <div className="flex items-center gap-8">
              {WAREHOUSES.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setSelectedWarehouse(w.id)}
                  className={[
                    'relative pb-4 text-sm font-bold transition-colors duration-200 cursor-pointer',
                    selectedWarehouse === w.id
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground',
                  ].join(' ')}
                >
                  {w.label}
                  {selectedWarehouse === w.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

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

        </div>
      </div>

    </div>
  );
}
