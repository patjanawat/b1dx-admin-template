/* ── Order Processing — data model ───────────────────────────────── */

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
