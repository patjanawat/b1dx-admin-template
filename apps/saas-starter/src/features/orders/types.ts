/* ── Order Processing types ───────────────────────────────────────── */

export interface ProcessingOrder {
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

/* ── Advanced search filter shape ─────────────────────────────────── */

export interface OrderAdvancedSearchFilters {
  orderId: string;
  trackingId: string;
  recipientName: string;
  phone: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  warehouse: string;
  channel: string;
  logistics: string;
  paymentStatus: string;
}

export const DEFAULT_ORDER_ADVANCED_FILTERS: OrderAdvancedSearchFilters = {
  orderId: '',
  trackingId: '',
  recipientName: '',
  phone: '',
  startDate: undefined,
  endDate: undefined,
  warehouse: 'all',
  channel: 'all',
  logistics: 'all',
  paymentStatus: 'all',
};
