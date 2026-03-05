export const MOCK_RESERVE_STOCK_TABS = [
  { value: 'processing', labelKey: 'reserve_stock.tabs.processing' },
  { value: 'failed', labelKey: 'reserve_stock.tabs.failed' },
] as const;

export type ReserveStockTabValue = (typeof MOCK_RESERVE_STOCK_TABS)[number]['value'];
