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

/* ── Unified page filter form (quick bar + advanced search) ───────── */

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
