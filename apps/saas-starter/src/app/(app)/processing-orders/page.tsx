'use client';

import { useState, useRef, useEffect, type RefObject } from 'react';
import {
  Button,
  Combobox,
  DataTable,
  Section,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
  type ComboboxOption,
} from '@b1dx/ui';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Filter,
  ArrowUpDown,
  Search,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { OrderStatusTab } from '@b1dx/ui';

/* ── Types ────────────────────────────────────────────────────────── */
interface ProcessingOrder {
  id: number;
  orderId: string;
  trackingId: string;
  date: string;
  shop: string;
  shopInitial: string;
  shopColor: string;
  sku: number;
  items: number;
  channel: string;
  channelColor: string;
  shipping: string;
  statusKey: string;
}

/* ── Mock data ────────────────────────────────────────────────────── */
const STATUS_TABS = [
  { id: 1, labelKey: 'status.wait_confirm',  count: 150, color: 'emerald' },
  { id: 2, labelKey: 'status.wait_stock',    count: 42,  color: 'teal'    },
  { id: 3, labelKey: 'status.wait_pickup',   count: 28,  color: 'orange'  },
  { id: 4, labelKey: 'status.wait_picking',  count: 15,  color: 'blue'    },
  { id: 5, labelKey: 'status.packing',       count: 35,  color: 'violet'  },
  { id: 6, labelKey: 'status.wait_shipping', count: 30,  color: 'indigo'  },
  { id: 7, labelKey: 'status.shipping',      count: 20,  color: 'sky'     },
  { id: 8, labelKey: 'status.returning',     count: 5,   color: 'rose'    },
] as const;

const MOCK_ORDERS: ProcessingOrder[] = [
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
  },
];

/* ── Combobox options ─────────────────────────────────────────────── */
const WAREHOUSE_OPTIONS: ComboboxOption[] = [
  { value: 'all', label: 'All Warehouses' },
  { value: 'sauce-thai', label: 'SAUCE THAI' },
  { value: 'central', label: 'Central WH' },
];

const CHANNEL_OPTIONS: ComboboxOption[] = [
  { value: 'all', label: 'All Channels' },
  { value: 'shopee', label: 'Shopee' },
  { value: 'lazada', label: 'Lazada' },
  { value: 'tiktok', label: 'TikTok Shop' },
  { value: 'facebook', label: 'Facebook' },
];

const LOGISTICS_OPTIONS: ComboboxOption[] = [
  { value: 'all', label: 'All Logistics' },
  { value: 'kerry', label: 'Kerry Express' },
  { value: 'flash', label: 'Flash Express' },
  { value: 'jt', label: 'J&T Express' },
  { value: 'best', label: 'BEST Express' },
];

const PRINT_STATUS_OPTIONS: ComboboxOption[] = [
  { value: 'all', label: 'All' },
  { value: 'not-scheduled', label: 'Not yet scheduled' },
  { value: 'printed', label: 'Printed' },
];

const SEARCH_BY_OPTIONS: ComboboxOption[] = [
  { value: 'recipient', label: 'Recipient Name' },
  { value: 'order-id', label: 'Order ID' },
  { value: 'tracking-id', label: 'Tracking ID' },
];

/* ── Component ────────────────────────────────────────────────────── */
export default function ProcessingOrdersPage() {
  const { t } = useTranslation();

  /* State */
  const [activeTab, setActiveTab] = useState(0);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('recipient');
  const [warehouse, setWarehouse] = useState('all');
  const [channel, setChannel] = useState('all');
  const [logistics, setLogistics] = useState('all');
  const [printStatus, setPrintStatus] = useState('all');
  const [pageIndex, setPageIndex] = useState(0);

  /* Carousel helper */
  const makeCarousel = (ref: RefObject<HTMLDivElement | null>) => {
    const check = () => {
      if (!ref.current) return { left: false, right: false };
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      return { left: scrollLeft > 1, right: scrollLeft < scrollWidth - clientWidth - 1 };
    };
    const scroll = (dir: 'left' | 'right') =>
      ref.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
    return { check, scroll };
  };

  /* Status tabs carousel */
  const statusRef = useRef<HTMLDivElement>(null);
  const [statusLeft, setStatusLeft] = useState(false);
  const [statusRight, setStatusRight] = useState(false);
  const statusCarousel = makeCarousel(statusRef);

  const checkStatus = () => {
    const s = statusCarousel.check();
    setStatusLeft(s.left);
    setStatusRight(s.right);
  };

  useEffect(() => {
    checkStatus();
    window.addEventListener('resize', checkStatus);
    return () => window.removeEventListener('resize', checkStatus);
  }, []);

  /* Search handler */
  const handleSearch = () => {
    const promise = new Promise<void>((resolve) => setTimeout(resolve, 800));
    toast.promise(promise, {
      loading: 'Searching...',
      success: 'Search completed!',
      error: 'Search failed.',
    });
  };

  /* ── TanStack Table column definitions ─────────────────────────── */
  const columns: ColumnDef<ProcessingOrder>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
          className="rounded border-border"
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          className="rounded border-border"
          aria-label="Select row"
        />
      ),
      enableSorting: false,
    },
    {
      id: 'seq',
      header: t('common.seq_no'),
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground font-medium">{row.index + 1}</span>
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'orderId',
      header: t('common.order_id'),
      cell: ({ getValue }) => (
        <span className="text-sm font-bold text-primary cursor-pointer hover:underline underline-offset-4 decoration-primary/30">
          {getValue<string>()}
        </span>
      ),
    },
    {
      accessorKey: 'trackingId',
      header: t('common.tracking_id'),
      cell: ({ getValue }) => (
        <span className="text-sm text-muted-foreground font-medium tracking-tight">
          {getValue<string>()}
        </span>
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'date',
      header: t('common.date_created'),
      cell: ({ getValue }) => (
        <span className="text-sm text-muted-foreground font-medium">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: 'shop',
      header: t('common.shop'),
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <div
            className={[
              'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-black shadow-sm',
              row.original.shopColor,
            ].join(' ')}
          >
            {row.original.shopInitial}
          </div>
          <span className="max-w-[140px] truncate text-[13px] font-bold text-foreground/80 tracking-tight">
            {row.original.shop}
          </span>
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'sku',
      header: t('common.sku_count'),
      cell: ({ getValue }) => (
        <span className="text-sm font-bold text-foreground/80 text-center block">
          {getValue<number>()}
        </span>
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'items',
      header: t('common.item_count'),
      cell: ({ getValue }) => (
        <span className="text-sm font-bold text-foreground/80 text-center block">
          {getValue<number>()}
        </span>
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'channel',
      header: t('common.channel'),
      cell: ({ row }) => (
        <span
          className={[
            'rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider whitespace-nowrap shadow-sm',
            row.original.channelColor,
          ].join(' ')}
        >
          {row.original.channel}
        </span>
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'shipping',
      header: t('common.shipping'),
      cell: ({ getValue }) => (
        <span className="text-sm text-foreground/70 font-semibold whitespace-nowrap tracking-tight">
          {getValue<string>()}
        </span>
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'statusKey',
      header: t('common.status'),
      cell: ({ getValue }) => (
        <div className="flex w-fit items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 shadow-sm whitespace-nowrap">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
          <span className="text-[11px] font-bold uppercase tracking-tight text-amber-600">
            {t(getValue<string>())}
          </span>
        </div>
      ),
    },
    {
      id: 'actions',
      header: t('common.manage'),
      cell: () => (
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-xl p-2.5 text-muted-foreground transition-all hover:bg-accent hover:text-primary active:scale-90"
            aria-label="View order"
          >
            <Eye size={18} />
          </button>
        </div>
      ),
      enableSorting: false,
    },
  ];


  /* ── Render ─────────────────────────────────────────────────────── */
  return (
    <div className="space-y-6">

      {/* ── Page Header ─────────────────────────────────────────── */}
      <Section
        variant="flush"
        title={t('processing_orders.title')}
        description={t('processing_orders.subtitle')}
        actions={
          <Button variant="success" className="gap-2 font-bold h-11 px-6 rounded-xl">
            <Download size={18} />
            {t('common.export_excel')}
          </Button>
        }
      />

      {/* ── Status Tabs Carousel ─────────────────────────────────── */}
      <div>
        <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-muted-foreground">
          {t('common.status')}
        </p>
        <div className="relative">
          {statusLeft && (
            <button
              type="button"
              onClick={() => statusCarousel.scroll('left')}
              className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background p-2.5 shadow-xl text-muted-foreground hover:text-primary transition-all"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {statusRight && (
            <button
              type="button"
              onClick={() => statusCarousel.scroll('right')}
              className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background p-2.5 shadow-xl text-muted-foreground hover:text-primary transition-all"
            >
              <ChevronRight size={20} />
            </button>
          )}
          <div
            ref={statusRef}
            onScroll={checkStatus}
            className="flex gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
            style={{
              maskImage: `linear-gradient(to right, ${statusLeft ? 'transparent 0, black 72px' : 'black 0'}, ${statusRight ? 'black calc(100% - 72px), transparent 100%' : 'black 100%'})`,
              WebkitMaskImage: `linear-gradient(to right, ${statusLeft ? 'transparent 0, black 72px' : 'black 0'}, ${statusRight ? 'black calc(100% - 72px), transparent 100%' : 'black 100%'})`,
            }}
          >
            {STATUS_TABS.map((tab, i) => (
              <OrderStatusTab
                key={tab.id}
                label={t(tab.labelKey)}
                count={tab.count}
                color={tab.color}
                isActive={activeTab === i}
                onClick={() => setActiveTab(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Search & Filter ────────────────────────────────────────── */}
      <Section variant="default" className="space-y-6">
        {/* Row 1: Search */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 items-end">
          <div className="lg:col-span-3">
            <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-muted-foreground">
              {t('common.search_by')}
            </p>
            <Combobox
              options={SEARCH_BY_OPTIONS}
              value={searchBy}
              onValueChange={(v) => setSearchBy(v || 'recipient')}
              placeholder={t('common.recipient_name')}
            />
          </div>

          <div className="lg:col-span-4">
            <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-muted-foreground opacity-0 select-none">
              &nbsp;
            </p>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('common.search_placeholder')}
              className="h-10 w-full rounded-md border border-input bg-muted/30 px-3 text-sm font-medium outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>

          <div className="lg:col-span-5 flex items-center gap-2">
            <Button onClick={handleSearch} className="h-10 flex-1 gap-2 rounded-xl font-bold lg:flex-none lg:px-8">
              <Search size={16} />
              {t('common.search')}
            </Button>
            <Button variant="outline" className="h-10 gap-2 rounded-xl font-bold">
              <Filter size={16} />
              {t('common.advanced')}
            </Button>
            <Button variant="outline" className="h-10 gap-2 rounded-xl font-bold">
              <ArrowUpDown size={16} />
              {t('common.sort')}
            </Button>
          </div>
        </div>

        {/* Row 2: Secondary filters */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-muted-foreground">
              {t('common.warehouse')}
            </p>
            <Combobox
              options={WAREHOUSE_OPTIONS}
              value={warehouse}
              onValueChange={(v) => setWarehouse(v || 'all')}
              placeholder={t('common.all_warehouses')}
              badgeCount={warehouse !== 'all' ? 1 : undefined}
            />
          </div>

          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-muted-foreground">
              {t('common.sales_channel')}
            </p>
            <Combobox
              options={CHANNEL_OPTIONS}
              value={channel}
              onValueChange={(v) => setChannel(v || 'all')}
              placeholder="All Channels"
              badgeCount={channel !== 'all' ? 1 : undefined}
            />
          </div>

          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-muted-foreground">
              {t('common.logistics')}
            </p>
            <Combobox
              options={LOGISTICS_OPTIONS}
              value={logistics}
              onValueChange={(v) => setLogistics(v || 'all')}
              placeholder="All Logistics"
              badgeCount={logistics !== 'all' ? 1 : undefined}
            />
          </div>

          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-muted-foreground">
              {t('common.print_status')}
            </p>
            <Combobox
              options={PRINT_STATUS_OPTIONS}
              value={printStatus}
              onValueChange={(v) => setPrintStatus(v || 'all')}
              placeholder="All"
              badgeCount={printStatus !== 'all' ? 1 : undefined}
            />
          </div>
        </div>
      </Section>

      {/* ── Orders DataTable ─────────────────────────────────────── */}
      <DataTable
        columns={columns}
        data={MOCK_ORDERS}
        sorting={sorting}
        onSortingChange={setSorting}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        pagination={{
          pageIndex,
          pageSize: 10,
          total: 42,
          onPageChange: setPageIndex,
        }}
      />
    </div>
  );
}
