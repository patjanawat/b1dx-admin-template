import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from './ui/table';
import { Download, Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const ProductFilterPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedWarehouse, setSelectedWarehouse] = React.useState('all');

  const warehouses = [
    { id: 'all', label: 'All Warehouses' },
    { id: 'sauce-thai', label: 'SAUCE THAI' },
    { id: 'warehouse-b', label: 'Warehouse B' },
    { id: 'warehouse-c', label: 'Warehouse C' },
  ];

  const mockProducts = [
    {
      id: 1,
      shop: 'SAUCE THAI',
      name: 'ซอสแกงเขียวหวาน ตรา มะหญิง By พริกคั่วกะปิหอม',
      barcode: '001-1',
      orders: 1,
      toPack: 1,
      stock: 0,
      shortage: -1,
      sku: '001',
      cfCode: '',
      shelf: ''
    },
    {
      id: 2,
      shop: 'SAUCE THAI',
      name: 'ซอสผัดเข้มข้น Stir-Fried Sauce ตรา มะหญิง By พริกคั่วกะปิหอม',
      barcode: '42623107186',
      orders: 1,
      toPack: 2,
      stock: 98,
      shortage: 0,
      sku: '42623107186',
      cfCode: '',
      shelf: ''
    },
    {
      id: 3,
      shop: 'SAUCE THAI',
      name: 'ซอสแกงคั่ว ตรา มะหญิง By พริกคั่วกะปิหอม',
      barcode: '',
      orders: 1,
      toPack: 1,
      stock: 190,
      shortage: 0,
      sku: '006',
      cfCode: '',
      shelf: 'W01R01C01RK01'
    },
    {
      id: 4,
      shop: 'SAUCE THAI',
      name: 'ซอสผัดกะเพรา ตรา มะหญิง By พริกคั่วกะปิหอม',
      barcode: '002-1',
      orders: 1,
      toPack: 1,
      stock: 108,
      shortage: 0,
      sku: '002',
      cfCode: '',
      shelf: 'W01R01C01RK01'
    }
  ];

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

  const FilterContent = (
    <div className="space-y-6 pt-4">
      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-sm font-bold text-muted-foreground">จำนวน SKU</span>
            <div className="flex items-center gap-4">
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
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-sm font-bold text-muted-foreground">จำนวนชิ้น</span>
            <div className="flex items-center gap-4">
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
            </div>
          </div>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input placeholder="ค้นหา" className="pl-10 h-11 border-border/50 bg-muted/10" />
        </div>
      </div>

      {/* Table */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold text-foreground">เลือกทั้งหมด 4 รายการ</span>
      </div>
      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/10 hover:bg-muted/10">
              <TableHead className="w-[50px] pl-4">
                <Checkbox className="rounded-[4px]" defaultChecked />
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
            {mockProducts.map((product) => (
              <TableRow key={product.id} className="border-border/50 hover:bg-muted/5 transition-colors">
                <TableCell className="pl-4">
                  <Checkbox className="rounded-[4px]" defaultChecked />
                </TableCell>
                <TableCell className="text-[12px] font-medium text-muted-foreground text-center">{product.id}</TableCell>
                <TableCell className="text-[12px] font-medium text-foreground/80">{product.shop}</TableCell>
                <TableCell className="text-[12px] font-medium text-foreground/90 max-w-[250px]">{product.name}</TableCell>
                <TableCell className="text-[12px] font-medium text-muted-foreground font-mono">{product.barcode}</TableCell>
                <TableCell className="text-[12px] font-medium text-foreground/80 text-center">{product.orders}</TableCell>
                <TableCell className="text-[12px] font-medium text-foreground/80 text-center">{product.toPack}</TableCell>
                <TableCell className="text-[12px] font-medium text-foreground/80 text-center">{product.stock}</TableCell>
                <TableCell className={`text-[12px] font-bold text-center ${product.shortage < 0 ? 'text-rose-500' : 'text-foreground/80'}`}>
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

      {/* Action Section under Table */}
      <div className="flex items-center justify-end bg-muted/5 rounded-xl p-4 mt-4">
        <Button 
          onClick={handleProcess}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-10 h-11 rounded-lg shadow-sm"
        >
          ดำเนินการ
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen pb-24 relative">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-muted-foreground hover:text-primary">
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">ตัวกรองสินค้า</h1>
        </div>
        <div className="flex items-center gap-6">
          <Button 
            variant="outline" 
            onClick={handleExport}
            className="text-emerald-500 border-emerald-500 hover:bg-emerald-50 font-bold gap-2 h-10 px-6"
          >
            <Download size={18} /> EXPORT EXCEL
          </Button>
        </div>
      </div>
      
      <p className="text-muted-foreground text-sm mb-8">
        จัดการและกรองรายการสินค้าตามเงื่อนไขที่ต้องการ เพื่อความสะดวกในการแพ็คและจัดส่ง
      </p>

      {/* Tabs Section */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="border-b border-border w-full mb-6">
            <div className="flex items-center gap-8">
              {warehouses.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setSelectedWarehouse(w.id)}
                  className={`relative pb-4 text-sm font-bold transition-all ${
                    selectedWarehouse === w.id
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {w.label}
                  {selectedWarehouse === w.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-[400px]">
            {selectedWarehouse === 'all' || selectedWarehouse === 'sauce-thai' ? (
              FilterContent
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mb-4">
                  <Search className="text-muted-foreground/40" size={32} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">ไม่พบข้อมูลในคลังสินค้านี้</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  ยังไม่มีรายการสินค้าหรือออเดอร์ที่ต้องจัดการใน {warehouses.find(w => w.id === selectedWarehouse)?.label} ในขณะนี้
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
