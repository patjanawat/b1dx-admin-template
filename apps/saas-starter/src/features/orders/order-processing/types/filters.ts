import type { MultiSortState } from '@b1dx/ui';

/* ── Order Sort ────────────────────────────────────────────────────── */

export type OrderSortKey = 'date' | 'orderId' | 'statusKey' | 'shop' | 'sku' | 'items';

export type OrderSortState = MultiSortState;

export const DEFAULT_ORDER_SORT: OrderSortState = [{ key: 'date', direction: 'desc' }];

/* ── Order Processing — unified page filter form ──────────────────── */

export interface OrderPageFilters {
  // Status carousel + warehouse tabs
  activeTab: number;
  warehouse: string;
  // Quick search bar
  searchBy: string;
  searchQuery: string;
  channel: string;
  logistics: string;
  printStatus: string;
  // Advanced search
  orderId: string;
  trackingId: string;
  recipientName: string;
  phone: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  shop: string;
  shopId: string;
  paymentStatus: string;
}

export const DEFAULT_ORDER_PAGE_FILTERS: OrderPageFilters = {
  activeTab: 0,
  warehouse: 'all',
  searchBy: 'recipient',
  searchQuery: '',
  channel: 'all',
  logistics: 'all',
  printStatus: 'all',
  orderId: '',
  trackingId: '',
  recipientName: '',
  phone: '',
  startDate: undefined,
  endDate: undefined,
  shop: 'all',
  shopId: '',
  paymentStatus: 'all',
};
