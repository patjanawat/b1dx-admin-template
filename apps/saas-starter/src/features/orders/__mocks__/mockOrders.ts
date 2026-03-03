import type { ProcessingOrder } from '../types';

/* ── Data pools ───────────────────────────────────────────────────── */

const SHOP_POOL = [
  { shop: 'Streetwear TH',  shopInitial: 'S', shopColor: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' },
  { shop: 'Fashion Hub',    shopInitial: 'F', shopColor: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
  { shop: 'Beauty Direct',  shopInitial: 'B', shopColor: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400' },
  { shop: 'Tech Gadgets',   shopInitial: 'T', shopColor: 'bg-slate-900 text-white dark:bg-slate-800' },
  { shop: 'Home & Garden',  shopInitial: 'H', shopColor: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
  { shop: 'Sport Zone',     shopInitial: 'Z', shopColor: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400' },
];

const CHANNEL_POOL = [
  { channel: 'Shopee',       channelColor: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-300' },
  { channel: 'Lazada',       channelColor: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300' },
  { channel: 'TikTok Shop',  channelColor: 'bg-slate-900 text-white dark:bg-slate-800' },
  { channel: 'Facebook',     channelColor: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-300' },
];

const SHIPPING_POOL = ['Kerry Express', 'Flash Express', 'J&T Express', 'BEST Express', 'SCG Express'];

const STATUS_POOL = [
  'status.wait_confirm', 'status.wait_stock', 'status.wait_pickup',
  'status.wait_picking', 'status.packing', 'status.wait_shipping',
];

/* ── Generator ────────────────────────────────────────────────────── */

function generateMockOrders(count: number): ProcessingOrder[] {
  return Array.from({ length: count }, (_, i) => {
    const n    = i + 1;
    const shop = SHOP_POOL[i % SHOP_POOL.length];
    const ch   = CHANNEL_POOL[i % CHANNEL_POOL.length];
    const day  = String(((i % 28) + 1)).padStart(2, '0');
    const hour = String(8 + (i % 10)).padStart(2, '0');
    const min  = String((i * 7) % 60).padStart(2, '0');
    return {
      id:         n,
      orderId:    `ORD-20231024-${String(n).padStart(3, '0')}`,
      trackingId: `PKG-${992120 + i}`,
      date:       `${day}/10/2023 ${hour}:${min}`,
      ...shop,
      sku:        (i % 5) + 1,
      items:      (i % 8) + 1,
      ...ch,
      shipping:   SHIPPING_POOL[i % SHIPPING_POOL.length],
      statusKey:  STATUS_POOL[i % STATUS_POOL.length],
    };
  });
}

export const MOCK_ORDERS: ProcessingOrder[] = generateMockOrders(42);
