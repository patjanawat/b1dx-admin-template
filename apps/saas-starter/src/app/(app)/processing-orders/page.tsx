'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  DataTable,
  SimpleLineTabs,
  SimpleStatusCarousel,
  AppPageHeader,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
  type StatusCarouselTab,
} from '@b1dx/ui';
import { Download, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import {
  MOCK_ORDERS,
  STATUS_TABS,
  getChannelOptions,
  getLogisticsOptions,
  getPrintStatusOptions,
  getSearchByOptions,
  getWarehouseTabs,
  OrderSearchSection,
  AdvancedSearchDialog,
  OrderAdvancedSearchFields,
  DEFAULT_ORDER_ADVANCED_FILTERS,
  DEFAULT_ORDER_SEARCH_VALUES,
  type ProcessingOrder,
  type OrderAdvancedSearchFilters,
  type OrderSearchFormValues,
} from '@/features/orders';

/* ── Component ────────────────────────────────────────────────────── */

export default function ProcessingOrdersPage() {
  const { t } = useTranslation();

  /* ── Memoised options ────────────────────────────────────────────── */
  const channelOptions   = useMemo(() => getChannelOptions(t),     [t]);
  const logisticsOptions = useMemo(() => getLogisticsOptions(t),   [t]);
  const printOptions     = useMemo(() => getPrintStatusOptions(t), [t]);
  const searchByOptions  = useMemo(() => getSearchByOptions(t),    [t]);
  const warehouseTabs    = useMemo(() => getWarehouseTabs(t),      [t]);
  const statusTabs       = useMemo<StatusCarouselTab[]>(
    () => STATUS_TABS.map((tab) => ({ ...tab, label: t(tab.labelKey) })),
    [t]
  );

  /* ── Form (search filters) ───────────────────────────────────────── */
  const { control, handleSubmit } = useForm<OrderSearchFormValues>({
    defaultValues: DEFAULT_ORDER_SEARCH_VALUES,
  });

  /* ── State ───────────────────────────────────────────────────────── */
  const [sorting,              setSorting]              = useState<SortingState>([]);
  const [rowSelection,         setRowSelection]         = useState<RowSelectionState>({});
  const [pageIndex,            setPageIndex]            = useState(0);
  const [pageSize,             setPageSize]             = useState(10);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [draftFilters,         setDraftFilters]         = useState<OrderAdvancedSearchFilters>(
    DEFAULT_ORDER_ADVANCED_FILTERS
  );

  const pagedData = useMemo(
    () => MOCK_ORDERS.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
    [pageIndex, pageSize]
  );

  /* ── Handlers ────────────────────────────────────────────────────── */
  const handleSearch = handleSubmit(() => {
    const promise = new Promise<void>((resolve) => setTimeout(resolve, 800));
    toast.promise(promise, {
      loading: `${t('common.search')}...`,
      success: `${t('common.search')} OK`,
      error: 'Error',
    });
  });

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
          <div className={[
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold shadow-sm',
            row.original.shopColor,
          ].join(' ')}>
            {row.original.shopInitial}
          </div>
          <span className="max-w-35 truncate text-sm font-bold text-foreground/80 tracking-tight">
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
        <span className={[
          'rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap shadow-sm',
          row.original.channelColor,
        ].join(' ')}>
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

      <AppPageHeader
        title={t('processing_orders.title')}
        description={t('processing_orders.subtitle')}
        actions={
          <Button variant="success" className="gap-2 font-bold h-11 px-6 rounded-xl">
            <Download size={18} />
            {t('common.export_excel')}
          </Button>
        }
      />
            
      <SimpleLineTabs name="warehouse" control={control} tabs={warehouseTabs} />

      <SimpleStatusCarousel
        name="activeTab"
        control={control}
        tabs={statusTabs}        
      />

      <OrderSearchSection
        control={control}
        onSearch={handleSearch}
        onAdvancedSearch={() => setIsAdvancedSearchOpen(true)}
        searchByOptions={searchByOptions}
        channelOptions={channelOptions}
        logisticsOptions={logisticsOptions}
        printStatusOptions={printOptions}
      />

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
          onPageSizeChange: (size) => { setPageSize(size); setPageIndex(0); },
        }}
      />

      <AdvancedSearchDialog
        isOpen={isAdvancedSearchOpen}
        onClose={() => setIsAdvancedSearchOpen(false)}
        onSearch={() => { setIsAdvancedSearchOpen(false); handleSearch(); }}
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
