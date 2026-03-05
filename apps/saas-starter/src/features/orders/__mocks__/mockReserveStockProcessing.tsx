import type { TFunction } from 'i18next';
import type { ColumnDef } from '@b1dx/ui';

export interface ReserveStockProcessingRow {
  orderId: string;
  referenceNo: string;
  channel: string;
  shippingService: string;
  status: string;
}

export const MOCK_RESERVE_STOCK_PROCESSING_ROWS: ReserveStockProcessingRow[] = [
  {
    orderId: 'ORD-240301',
    referenceNo: 'REF-7A31B2',
    channel: 'Shopee',
    shippingService: 'Flash Express',
    status: 'ready',
  },
  {
    orderId: 'ORD-240302',
    referenceNo: 'REF-8C52D9',
    channel: 'Lazada',
    shippingService: 'Kerry Express',
    status: 'ready',
  },
  {
    orderId: 'ORD-240303',
    referenceNo: 'REF-2Z18K5',
    channel: 'TikTok Shop',
    shippingService: 'J&T Express',
    status: 'waiting',
  },
  {
    orderId: 'ORD-240304',
    referenceNo: 'REF-9Q33M1',
    channel: 'Facebook',
    shippingService: 'BEST Express',
    status: 'waiting',
  },
  {
    orderId: 'ORD-240305',
    referenceNo: 'REF-4L90N7',
    channel: 'Shopee',
    shippingService: 'Flash Express',
    status: 'ready',
  },
];

export const getReserveStockProcessingColumns = (
  t: TFunction
): ColumnDef<ReserveStockProcessingRow>[] => [
  {
    id: 'select',
    enableSorting: false,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="rounded border-border"
        checked={table.getIsAllPageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
        aria-label={t('reserve_stock.table.columns.select')}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        className="rounded border-border"
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(e.target.checked)}
        aria-label={t('reserve_stock.table.columns.select_row')}
      />
    ),
  },
  {
    accessorKey: 'orderId',
    header: t('reserve_stock.table.columns.order'),
    cell: ({ getValue }) => (
      <span className="text-sm font-semibold text-primary">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: 'referenceNo',
    header: t('reserve_stock.table.columns.reference'),
    cell: ({ getValue }) => (
      <span className="text-sm font-medium text-foreground">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: 'channel',
    header: t('reserve_stock.table.columns.channel'),
    enableSorting: false,
    cell: ({ getValue }) => (
      <span className="text-sm text-foreground/80">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: 'shippingService',
    header: t('reserve_stock.table.columns.shipping_service'),
    enableSorting: false,
    cell: ({ getValue }) => (
      <span className="text-sm text-foreground/80">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: t('reserve_stock.table.columns.status'),
    cell: ({ getValue }) => {
      const status = getValue<string>();
      const isReady = status === 'ready';
      return (
        <span
          className={[
            'inline-flex rounded-full px-2.5 py-1 text-xs font-semibold',
            isReady
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
              : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
          ].join(' ')}
        >
          {isReady ? t('reserve_stock.table.status.ready') : t('reserve_stock.table.status.waiting')}
        </span>
      );
    },
  },
];
