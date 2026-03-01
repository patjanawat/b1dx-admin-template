'use client';

import { useState, useMemo } from 'react';
import {
  Button,
  Combobox,
  DataTable,
  LineTabs,
  Section,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
} from '@b1dx/ui';
import {
  Download,
  Eye,
  Filter,
  ArrowUpDown,
  Search,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import {
  MOCK_ORDERS,
  getChannelOptions,
  getLogisticsOptions,
  getPrintStatusOptions,
  getSearchByOptions,
  getWarehouseTabs,
  OrderStatusCarousel,
  AdvancedSearchDialog,
  OrderAdvancedSearchFields,
  DEFAULT_ORDER_ADVANCED_FILTERS,
  type ProcessingOrder,
  type OrderAdvancedSearchFilters,
} from '@/features/orders';

/* ── Component ────────────────────────────────────────────────────── */

export default function ProcessingOrdersPage() {
  const { t } = useTranslation();

  /* ── Memoised options (require t()) ─────────────────────────────── */
  const channelOptions  = useMemo(() => getChannelOptions(t),     [t]);
  const logisticsOptions = useMemo(() => getLogisticsOptions(t),  [t]);
  const printOptions    = useMemo(() => getPrintStatusOptions(t), [t]);
  const searchByOptions = useMemo(() => getSearchByOptions(t),    [t]);
  const warehouseTabs   = useMemo(() => getWarehouseTabs(t),      [t]);

  /* ── State ───────────────────────────────────────────────────────── */
  const [activeTab,             setActiveTab]             = useState(0);
  const [sorting,               setSorting]               = useState<SortingState>([]);
  const [rowSelection,          setRowSelection]          = useState<RowSelectionState>({});
  const [searchQuery,           setSearchQuery]           = useState('');
  const [searchBy,              setSearchBy]              = useState('recipient');
  const [warehouse,             setWarehouse]             = useState('all');
  const [channel,               setChannel]               = useState('all');
  const [logistics,             setLogistics]             = useState('all');
  const [printStatus,           setPrintStatus]           = useState('all');
  const [pageIndex,             setPageIndex]             = useState(0);
  const [pageSize,              setPageSize]              = useState(10);
  const [isAdvancedSearchOpen,  setIsAdvancedSearchOpen]  = useState(false);
  const [draftFilters,          setDraftFilters]          = useState<OrderAdvancedSearchFilters>(
    DEFAULT_ORDER_ADVANCED_FILTERS
  );

  const pagedData = useMemo(
    () => MOCK_ORDERS.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
    [pageIndex, pageSize]
  );

  /* ── Handlers ────────────────────────────────────────────────────── */
  const handleSearch = () => {
    const promise = new Promise<void>((resolve) => setTimeout(resolve, 800));
    toast.promise(promise, {
      loading: t('common.search') + '...',
      success: t('common.search') + '!',
      error:   'Error',
    });
  };

  /* ── Column definitions ──────────────────────────────────────────── */
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
        <span className="text-sm text-muted-foreground font-medium">
          {pageIndex * pageSize + row.index + 1}
        </span>
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
              'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold shadow-sm',
              row.original.shopColor,
            ].join(' ')}
          >
            {row.original.shopInitial}
          </div>
          <span className="max-w-[140px] truncate text-sm font-bold text-foreground/80 tracking-tight">
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
            'rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap shadow-sm',
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
          <span className="text-xs font-bold uppercase tracking-tight text-amber-600">
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

  /* ── Render ──────────────────────────────────────────────────────── */
  return (
    <div className="space-y-6">

      {/* Page Header */}
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

      {/* Warehouse Line Tabs */}
      <LineTabs
        tabs={warehouseTabs}
        value={warehouse}
        onValueChange={setWarehouse}
      />

      {/* Status Tabs Carousel */}
      <OrderStatusCarousel activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Search & Filter */}
      <Section variant="default" className="space-y-6">

        {/* Row 1: Search */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 items-end">
          <div className="lg:col-span-3">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {t('common.search_by')}
            </p>
            <Combobox
              options={searchByOptions}
              value={searchBy}
              onValueChange={(v) => setSearchBy(v || 'recipient')}
              placeholder={t('common.recipient_name')}
            />
          </div>

          <div className="lg:col-span-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-0 select-none">
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
            <Button
              variant="outline"
              className="h-10 gap-2 rounded-xl font-bold"
              onClick={() => setIsAdvancedSearchOpen(true)}
            >
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {t('common.sales_channel')}
            </p>
            <Combobox
              options={channelOptions}
              value={channel}
              onValueChange={(v) => setChannel(v || 'all')}
              placeholder={t('common.all_channels')}
              badgeCount={channel !== 'all' ? 1 : undefined}
            />
          </div>

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {t('common.logistics')}
            </p>
            <Combobox
              options={logisticsOptions}
              value={logistics}
              onValueChange={(v) => setLogistics(v || 'all')}
              placeholder={t('common.all_logistics')}
              badgeCount={logistics !== 'all' ? 1 : undefined}
            />
          </div>

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {t('common.print_status')}
            </p>
            <Combobox
              options={printOptions}
              value={printStatus}
              onValueChange={(v) => setPrintStatus(v || 'all')}
              placeholder={t('common.all')}
              badgeCount={printStatus !== 'all' ? 1 : undefined}
            />
          </div>
        </div>

      </Section>

      {/* Orders DataTable */}
      <DataTable
        columns={columns}
        data={pagedData}
        sorting={sorting}
        onSortingChange={setSorting}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        pagination={{
          pageIndex,
          pageSize,
          total: MOCK_ORDERS.length,
          onPageChange: setPageIndex,
          pageSizeOptions: [10, 20, 50],
          onPageSizeChange: (size) => {
            setPageSize(size);
            setPageIndex(0);
          },
        }}
      />

      {/* Advanced Search Dialog */}
      <AdvancedSearchDialog
        isOpen={isAdvancedSearchOpen}
        onClose={() => setIsAdvancedSearchOpen(false)}
        onSearch={() => {
          setIsAdvancedSearchOpen(false);
          handleSearch();
        }}
        onReset={() => setDraftFilters(DEFAULT_ORDER_ADVANCED_FILTERS)}
      >
        <OrderAdvancedSearchFields
          filters={draftFilters}
          onChange={setDraftFilters}
          channelOptions={channelOptions}
          logisticsOptions={logisticsOptions}
        />
      </AdvancedSearchDialog>

    </div>
  );
}
