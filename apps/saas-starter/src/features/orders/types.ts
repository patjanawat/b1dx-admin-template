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

/* ── Search bar form values (used with RHFOrderSearchSection) ─────── */

export interface OrderSearchFormValues {
  activeTab: number;
  warehouse: string;
  searchBy: string;
  searchQuery: string;
  channel: string;
  logistics: string;
  printStatus: string;
}

export const DEFAULT_ORDER_SEARCH_VALUES: OrderSearchFormValues = {
  activeTab: 0,
  warehouse: 'all',
  searchBy: 'recipient',
  searchQuery: '',
  channel: 'all',
  logistics: 'all',
  printStatus: 'all',
};

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
