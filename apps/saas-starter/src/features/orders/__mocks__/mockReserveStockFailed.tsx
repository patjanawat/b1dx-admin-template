import type { TFunction } from 'i18next';
import type { ColumnDef } from '@b1dx/ui';

export interface ReserveStockFailedRow {
  orderId: string;
  referenceNo: string;
  channel: string;
  shippingService: string;
  status: string;
}

export const MOCK_RESERVE_STOCK_FAILED_ROWS: ReserveStockFailedRow[] = [
  {
    orderId: 'ORD-240391',
    referenceNo: 'REF-1E42P8',
    channel: 'Shopee',
    shippingService: 'Flash Express',
    status: 'failed',
  },
  {
    orderId: 'ORD-240392',
    referenceNo: 'REF-4R72T3',
    channel: 'Lazada',
    shippingService: 'Kerry Express',
    status: 'retry',
  },
  {
    orderId: 'ORD-240393',
    referenceNo: 'REF-6M81B5',
    channel: 'TikTok Shop',
    shippingService: 'J&T Express',
    status: 'failed',
  },
  {
    orderId: 'ORD-240394',
    referenceNo: 'REF-9N24C1',
    channel: 'Facebook',
    shippingService: 'BEST Express',
    status: 'retry',
  },
];

export const getReserveStockFailedColumns = (t: TFunction): ColumnDef<ReserveStockFailedRow>[] => [
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
    cell: ({ getValue }) => <span className="text-sm text-foreground/80">{getValue<string>()}</span>,
  },
  {
    accessorKey: 'shippingService',
    header: t('reserve_stock.table.columns.shipping_service'),
    enableSorting: false,
    cell: ({ getValue }) => <span className="text-sm text-foreground/80">{getValue<string>()}</span>,
  },
  {
    accessorKey: 'status',
    header: t('reserve_stock.table.columns.status'),
    cell: ({ getValue }) => {
      const status = getValue<string>();
      const isFailed = status === 'failed';
      return (
        <span
          className={[
            'inline-flex rounded-full px-2.5 py-1 text-xs font-semibold',
            isFailed
              ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300'
              : 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300',
          ].join(' ')}
        >
          {isFailed
            ? t('reserve_stock.failed_table.status.failed')
            : t('reserve_stock.failed_table.status.retry')}
        </span>
      );
    },
  },
];
