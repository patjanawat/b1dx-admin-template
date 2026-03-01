import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  RotateCcw, 
  ChevronDown, 
  ExternalLink, 
  Eye, 
  Download, 
  ListFilter,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronUp,
  ShoppingCart,
  Clock,
  Truck,
  AlertCircle,
  Filter,
  ArrowUpDown,
  Facebook
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';
import { Checkbox } from './ui/checkbox';
import { AdvancedSearchModal } from './AdvancedSearchModal';
import { SortModal } from './SortModal';

interface StatusTab {
  id: number;
  labelKey: string;
  count: number;
  color: string;
}

const STATUS_TABS: StatusTab[] = [
  { id: 1, labelKey: 'status.wait_confirm', count: 150, color: 'bg-emerald-500' },
  { id: 2, labelKey: 'status.wait_stock', count: 42, color: 'bg-emerald-500' },
  { id: 3, labelKey: 'status.wait_pickup', count: 28, color: 'bg-orange-500' },
  { id: 4, labelKey: 'status.wait_picking', count: 15, color: 'bg-blue-500' },
  { id: 5, labelKey: 'status.packing', count: 35, color: 'bg-blue-500' },
  { id: 6, labelKey: 'status.wait_shipping', count: 30, color: 'bg-blue-500' },
  { id: 7, labelKey: 'status.shipping', count: 20, color: 'bg-blue-500' },
  { id: 8, labelKey: 'status.returning', count: 5, color: 'bg-blue-500' },
];

const MOCK_DATA = [
  {
    id: 1,
    orderId: 'ORD-20231024-001',
    trackingId: 'PKG-992120',
    date: '24/10/2023 09:30',
    shop: 'Streetwear TH',
    shopInitial: 'S',
    shopColor: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    sku: 3,
    items: 5,
    channel: 'Shopee',
    channelColor: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-300',
    shipping: 'Kerry Express',
    statusKey: 'status.wait_confirm',
  },
  {
    id: 2,
    orderId: 'ORD-20231024-002',
    trackingId: 'PKG-992121',
    date: '24/10/2023 10:15',
    shop: 'Fashion Hub',
    shopInitial: 'L',
    shopColor: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    sku: 1,
    items: 1,
    channel: 'Lazada',
    channelColor: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300',
    shipping: 'Flash Express',
    statusKey: 'status.wait_confirm',
  },
  {
    id: 3,
    orderId: 'ORD-20231024-005',
    trackingId: 'PKG-992125',
    date: '24/10/2023 11:00',
    shop: 'Beauty Direct',
    shopInitial: 'T',
    shopColor: 'bg-slate-900 text-white dark:bg-slate-800',
    sku: 2,
    items: 10,
    channel: 'TikTok Shop',
    channelColor: 'bg-slate-900 text-white dark:bg-slate-800',
    shipping: 'J&T Express',
    statusKey: 'status.wait_confirm',
  }
];

export const OrderManagementPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(3);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');

  const warehouses = [
    { id: 'all', label: 'All Warehouses' },
    { id: 'sauce-thai', label: 'SAUCE THAI' },
    { id: 'warehouse-b', label: 'Warehouse B' },
    { id: 'warehouse-c', label: 'Warehouse C' },
  ];

  const handleSort = (key: string, direction?: 'asc' | 'desc') => {
    let newDirection: 'asc' | 'desc' = direction || 'asc';
    if (!direction && sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      newDirection = 'desc';
    }
    setSortConfig({ key, direction: newDirection });
  };

  const sortedData = [...MOCK_DATA].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    
    let valA = (a as any)[key];
    let valB = (b as any)[key];

    if (key === 'date') {
      const parseDate = (d: string) => {
        const [datePart, timePart] = d.split(' ');
        const [day, month, year] = datePart.split('/').map(Number);
        const [hour, minute] = timePart.split(':').map(Number);
        return new Date(year, month - 1, day, hour, minute).getTime();
      };
      valA = parseDate(valA as string);
      valB = parseDate(valB as string);
    }

    if (valA < valB) return direction === 'asc' ? -1 : 1;
    if (valA > valB) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 1);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleSearch = () => {
    const promise = new Promise((resolve) => setTimeout(resolve, 1000));
    toast.promise(promise, {
      loading: 'Searching...',
      success: 'Search completed successfully!',
      error: 'Search failed.',
    });
  };

  const handleOpenOrderDetail = (order: any) => {
    window.open(`/orders/${order.orderId}`, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Orders Overview</h1>
          <p className="text-muted-foreground font-medium">Efficiently manage all incoming customer orders across channels.</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 px-6 rounded-xl gap-2 shadow-lg shadow-emerald-500/20">
          <Download size={18} />
          Export Excel
        </Button>
      </div>


      {/* Warehouse Line Tabs */}
      <div className="border-b border-border w-full">
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

      {/* Stats Carousel Section */}
      <div className="relative group/carousel">
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity">
          <button onClick={() => scroll('left')} className="p-2.5 rounded-full bg-background border border-border shadow-xl text-muted-foreground hover:text-primary transition-all">
            <ChevronLeft size={20} />
          </button>
        </div>
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity">
          <button onClick={() => scroll('right')} className="p-2.5 rounded-full bg-background border border-border shadow-xl text-muted-foreground hover:text-primary transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-2"
        >
          {/* Stat Card 1 */}
          <div className="min-w-[280px] bg-card border border-border rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <ShoppingCart size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Total Orders</p>
              <p className="text-2xl font-black text-foreground">1,284</p>
            </div>
          </div>
          {/* Stat Card 2 */}
          <div className="min-w-[280px] bg-card border border-border rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
              <Clock size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Pending</p>
              <p className="text-2xl font-black text-foreground">42</p>
            </div>
          </div>
          {/* Stat Card 3 */}
          <div className="min-w-[280px] bg-card border border-border rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Truck size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Shipped</p>
              <p className="text-2xl font-black text-foreground">856</p>
            </div>
          </div>
          {/* Stat Card 4 */}
          <div className="min-w-[280px] bg-card border border-border rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-14 h-14 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500">
              <AlertCircle size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Issues</p>
              <p className="text-2xl font-black text-foreground">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Card */}
      <div className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-8">
        {/* Row 1: Search By */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-3 space-y-3">
            <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">Search By</label>
            <div className="relative group">
              <select className="w-full bg-muted/30 border border-border rounded-xl h-12 px-4 text-sm font-bold outline-none appearance-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all pr-10">
                <option>Recipient Name</option>
                <option>Order ID</option>
                <option>Tracking ID</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none group-focus-within:text-primary transition-colors" />
            </div>
          </div>
          <div className="lg:col-span-4 space-y-3">
            <Input 
              placeholder="Enter search keywords..." 
              className="h-12 rounded-xl bg-muted/30 border-border focus:bg-background transition-all font-medium"
            />
          </div>
          <div className="lg:col-span-5 flex items-center gap-3">
            <Button onClick={handleSearch} className="h-12 px-8 rounded-xl font-bold gap-2 shadow-lg shadow-primary/20 flex-1 lg:flex-none">
              <Search size={18} />
              Search
            </Button>
            <Button 
              variant="outline" 
              className="h-12 px-6 rounded-xl font-bold gap-2 border-border bg-muted/20 hover:bg-muted transition-colors"
              onClick={() => setIsAdvancedSearchOpen(true)}
            >
              <Filter size={18} />
              Advanced
            </Button>
            <Button 
              variant="outline" 
              className="h-12 px-6 rounded-xl font-bold gap-2 border-border bg-muted/20 hover:bg-muted transition-colors"
              onClick={() => setIsSortModalOpen(true)}
            >
              <ArrowUpDown size={18} />
              Sort
            </Button>
          </div>
        </div>

        {/* Row 2: Secondary Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Warehouse Filter */}
          <div className="space-y-3">
            <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">Warehouse</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                <span className="text-sm font-bold text-foreground">SAUCE THAI</span>
              </div>
              <div className="absolute right-10 top-1/2 -translate-y-1/2">
                <Badge className="bg-rose-500 hover:bg-rose-600 text-white border-none h-5 min-w-[20px] flex items-center justify-center px-1 text-[10px] font-black rounded-full">2</Badge>
              </div>
              <select className="w-full bg-muted/30 border border-border rounded-xl h-12 px-4 text-sm font-bold outline-none appearance-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all pr-10 opacity-0 cursor-pointer">
                <option>SAUCE THAI</option>
              </select>
              <div className="absolute inset-0 border border-border rounded-xl pointer-events-none group-focus-within:border-primary transition-colors" />
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none group-focus-within:text-primary transition-colors" />
            </div>
          </div>

          {/* Sales Channel Filter */}
          <div className="space-y-3">
            <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">Sales Channel</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                <Facebook size={18} className="text-blue-600 fill-blue-600" />
                <span className="text-sm font-bold text-foreground">Facebook</span>
              </div>
              <div className="absolute right-10 top-1/2 -translate-y-1/2">
                <Badge className="bg-rose-500 hover:bg-rose-600 text-white border-none h-5 min-w-[20px] flex items-center justify-center px-1 text-[10px] font-black rounded-full">2</Badge>
              </div>
              <select className="w-full bg-muted/30 border border-border rounded-xl h-12 px-4 text-sm font-bold outline-none appearance-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all pr-10 opacity-0 cursor-pointer">
                <option>Facebook</option>
              </select>
              <div className="absolute inset-0 border border-border rounded-xl pointer-events-none group-focus-within:border-primary transition-colors" />
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none group-focus-within:text-primary transition-colors" />
            </div>
          </div>

          {/* Logistics Filter */}
          <div className="space-y-3">
            <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">Logistics</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                <Truck size={18} className="text-orange-500" />
                <span className="text-sm font-bold text-foreground">BEST Express</span>
              </div>
              <div className="absolute right-10 top-1/2 -translate-y-1/2">
                <Badge className="bg-rose-500 hover:bg-rose-600 text-white border-none h-5 min-w-[20px] flex items-center justify-center px-1 text-[10px] font-black rounded-full">1</Badge>
              </div>
              <select className="w-full bg-muted/30 border border-border rounded-xl h-12 px-4 text-sm font-bold outline-none appearance-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all pr-10 opacity-0 cursor-pointer">
                <option>BEST Express</option>
              </select>
              <div className="absolute inset-0 border border-border rounded-xl pointer-events-none group-focus-within:border-primary transition-colors" />
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none group-focus-within:text-primary transition-colors" />
            </div>
          </div>

          {/* Print Status Filter */}
          <div className="space-y-3">
            <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">Print Status</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                <span className="text-sm font-bold text-foreground">Not yet scheduled</span>
              </div>
              <div className="absolute right-10 top-1/2 -translate-y-1/2">
                <Badge className="bg-rose-500 hover:bg-rose-600 text-white border-none h-5 min-w-[20px] flex items-center justify-center px-1 text-[10px] font-black rounded-full">1</Badge>
              </div>
              <select className="w-full bg-muted/30 border border-border rounded-xl h-12 px-4 text-sm font-bold outline-none appearance-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all pr-10 opacity-0 cursor-pointer">
                <option>Not yet scheduled</option>
              </select>
              <div className="absolute inset-0 border border-border rounded-xl pointer-events-none group-focus-within:border-primary transition-colors" />
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none group-focus-within:text-primary transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Order List Table with Improved Spacing */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        {/* Bulk Action & Filter Bar */}
        <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border bg-card">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Select defaultValue="none">
              <SelectTrigger className="h-9 w-full sm:w-[140px] text-xs font-bold bg-muted/20 border-border/50">
                <SelectValue placeholder="Bulk Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Bulk Action</SelectItem>
                <SelectItem value="mark-shipped">Mark as Shipped</SelectItem>
                <SelectItem value="mark-processing">Mark as Processing</SelectItem>
                <SelectItem value="cancel">Cancel Orders</SelectItem>
                <SelectItem value="export">Export Selected</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" variant="secondary" className="h-9 px-5 font-bold text-xs bg-primary/10 text-primary hover:bg-primary/20 border-none shadow-none">Apply</Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search orders..." 
                className="h-9 pl-9 pr-4 text-xs font-medium bg-muted/20 border-border/50 rounded-full focus:bg-background transition-all"
              />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Filter by:</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 rounded-full px-4 text-[11px] font-bold bg-muted/20 border-border/50 hover:bg-muted transition-colors">
                  All Statuses
                </Button>
                <Button variant="outline" size="sm" className="h-8 rounded-full px-4 text-[11px] font-bold bg-muted/20 border-border/50 hover:bg-muted transition-colors">
                  Last 30 Days
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-muted/10 border-b border-border/50">
              <tr>
                <th className="px-6 py-5 w-14 text-center">
                  <Checkbox className="rounded-[4px]" />
                </th>
                <th className="px-4 py-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">ลำดับ</th>
                <th 
                  className="px-4 py-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort('orderId')}
                >
                  <div className="flex items-center gap-1">
                    {t('common.order_id')}
                    <ArrowUpDown size={12} className={sortConfig?.key === 'orderId' ? 'text-primary' : 'opacity-30'} />
                  </div>
                </th>
                <th className="px-4 py-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">รหัสพัสดุ</th>
                <th 
                  className="px-4 py-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center gap-1">
                    วันที่สร้าง
                    <ArrowUpDown size={12} className={sortConfig?.key === 'date' ? 'text-primary' : 'opacity-30'} />
                  </div>
                </th>
                <th className="px-4 py-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">ร้านค้า</th>
                <th className="px-4 py-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest text-center whitespace-nowrap">จำนวน SKU</th>
                <th className="px-4 py-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest text-center whitespace-nowrap">จำนวนชิ้น</th>
                <th className="px-4 py-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">ช่องทาง</th>
                <th className="px-4 py-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">{t('common.shipping')}</th>
                <th 
                  className="px-4 py-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort('statusKey')}
                >
                  <div className="flex items-center gap-1">
                    {t('common.status')}
                    <ArrowUpDown size={12} className={sortConfig?.key === 'statusKey' ? 'text-primary' : 'opacity-30'} />
                  </div>
                </th>
                <th className="px-4 py-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest text-right whitespace-nowrap">{t('common.manage')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {sortedData.map((row, idx) => (
                <tr key={row.orderId} className="hover:bg-muted/5 transition-colors group">
                  <td className="px-6 py-4.5 text-center">
                    <Checkbox className="rounded-[4px]" />
                  </td>
                  <td className="px-4 py-4.5 text-sm text-muted-foreground font-medium">{idx + 1}</td>
                  <td 
                    className="px-4 py-4.5 text-sm font-bold text-primary hover:underline cursor-pointer decoration-primary/30 underline-offset-4"
                    onClick={() => handleOpenOrderDetail(row)}
                  >
                    {row.orderId}
                  </td>
                  <td className="px-4 py-4.5 text-sm text-muted-foreground font-medium tracking-tight">{row.trackingId}</td>
                  <td className="px-4 py-4.5 text-sm text-muted-foreground font-medium">{row.date}</td>
                  <td className="px-4 py-4.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0 shadow-sm ${row.shopColor}`}>
                        {row.shopInitial}
                      </div>
                      <span className="text-[13px] font-bold text-foreground/80 truncate max-w-[140px] tracking-tight">{row.shop}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4.5 text-sm text-foreground/80 text-center font-bold">{row.sku}</td>
                  <td className="px-4 py-4.5 text-sm text-foreground/80 text-center font-bold">{row.items}</td>
                  <td className="px-4 py-4.5">
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-black whitespace-nowrap tracking-wider uppercase ${row.channelColor} shadow-sm`}>
                      {row.channel}
                    </span>
                  </td>
                  <td className="px-4 py-4.5 text-sm text-foreground/70 font-semibold whitespace-nowrap tracking-tight">{row.shipping}</td>
                  <td className="px-4 py-4.5">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-full w-fit whitespace-nowrap shadow-sm border border-amber-500/20">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                      <span className="text-[11px] font-bold text-amber-600 tracking-tight uppercase">{t(row.statusKey)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4.5 text-right">
                    <button className="p-2.5 hover:bg-accent text-muted-foreground hover:text-primary rounded-xl transition-all group-hover:scale-110 active:scale-90">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Improved Pagination Section */}
        <div className="px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-border bg-card">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-muted-foreground font-medium">Items per page:</span>
              <Select defaultValue="50">
                <SelectTrigger className="h-8 w-[60px] text-[12px] font-bold bg-muted/10 border-border/50">
                  <SelectValue placeholder="50" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-[13px] text-muted-foreground font-medium">
              Showing <span className="font-bold text-foreground">1-50</span> of <span className="font-bold text-foreground">1,240</span> results
            </p>
          </div>
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground/50 hover:text-foreground">
              <ChevronsLeft size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground/50 hover:text-foreground">
              <ChevronLeft size={18} />
            </Button>
            <div className="flex items-center gap-1 px-2">
              <Button variant="secondary" size="sm" className="h-9 w-9 p-0 font-black text-xs bg-primary text-primary-foreground shadow-lg shadow-primary/20">1</Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 font-bold text-xs text-muted-foreground hover:text-foreground">2</Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 font-bold text-xs text-muted-foreground hover:text-foreground">3</Button>
              <span className="text-muted-foreground px-1 font-black">...</span>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 font-bold text-xs text-muted-foreground hover:text-foreground">25</Button>
            </div>
            <button className="p-2.5 border border-border rounded-xl text-muted-foreground hover:bg-card shadow-sm transition-all hover:scale-105 active:scale-95">
              <ChevronRight size={18} />
            </button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
              <ChevronsRight size={18} />
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .py-4\.5 {
          padding-top: 1.125rem;
          padding-bottom: 1.125rem;
        }
      `}</style>

      <AdvancedSearchModal 
        isOpen={isAdvancedSearchOpen} 
        onClose={() => setIsAdvancedSearchOpen(false)}
        onSearch={(filters) => {
          console.log('Advanced Search Filters:', filters);
          handleSearch();
        }}
      />

      <SortModal
        isOpen={isSortModalOpen}
        onClose={() => setIsSortModalOpen(false)}
        onSort={handleSort}
        currentSort={sortConfig}
      />
    </div>
  );
};