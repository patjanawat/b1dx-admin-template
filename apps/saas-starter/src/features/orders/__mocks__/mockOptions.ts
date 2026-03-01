import type { TFunction } from 'i18next';
import type { ComboboxOption, LineTab } from '@b1dx/ui';

/* ── Status tabs (counts are mock; labels use i18n keys) ──────────── */

export const STATUS_TABS = [
  { id: 1, labelKey: 'status.wait_confirm',  count: 150, color: 'emerald' },
  { id: 2, labelKey: 'status.wait_stock',    count: 42,  color: 'teal'    },
  { id: 3, labelKey: 'status.wait_pickup',   count: 28,  color: 'orange'  },
  { id: 4, labelKey: 'status.wait_picking',  count: 15,  color: 'blue'    },
  { id: 5, labelKey: 'status.packing',       count: 35,  color: 'violet'  },
  { id: 6, labelKey: 'status.wait_shipping', count: 30,  color: 'indigo'  },
  { id: 7, labelKey: 'status.shipping',      count: 20,  color: 'sky'     },
  { id: 8, labelKey: 'status.returning',     count: 5,   color: 'rose'    },
] as const;

/* ── Warehouse tabs ───────────────────────────────────────────────── */

export const getWarehouseTabs = (t: TFunction): LineTab[] => [
  { value: 'all',        label: t('common.all_warehouses') },
  { value: 'sauce-thai', label: 'SAUCE THAI'               },
  { value: 'central',    label: 'Central WH'               },
];

/* ── Page-level filter options ────────────────────────────────────── */

export const getChannelOptions = (t: TFunction): ComboboxOption[] => [
  { value: 'all',      label: t('common.all_channels') },
  { value: 'shopee',   label: 'Shopee'                 },
  { value: 'lazada',   label: 'Lazada'                 },
  { value: 'tiktok',   label: 'TikTok Shop'            },
  { value: 'facebook', label: 'Facebook'               },
];

export const getLogisticsOptions = (t: TFunction): ComboboxOption[] => [
  { value: 'all',   label: t('common.all_logistics') },
  { value: 'kerry', label: 'Kerry Express'            },
  { value: 'flash', label: 'Flash Express'            },
  { value: 'jt',    label: 'J&T Express'              },
  { value: 'best',  label: 'BEST Express'             },
];

export const getPrintStatusOptions = (t: TFunction): ComboboxOption[] => [
  { value: 'all',           label: t('common.all')                 },
  { value: 'not-scheduled', label: t('common.print_not_scheduled') },
  { value: 'printed',       label: t('common.print_printed')       },
];

export const getSearchByOptions = (t: TFunction): ComboboxOption[] => [
  { value: 'recipient',   label: t('common.recipient_name')     },
  { value: 'order-id',    label: t('common.order_id_option')    },
  { value: 'tracking-id', label: t('common.tracking_id_option') },
];

/* ── Advanced search dialog default options ───────────────────────── */

export const getDefaultWarehouseOptions = (t: TFunction): ComboboxOption[] => [
  { value: 'all',         label: t('common.all_warehouses') },
  { value: 'sauce-thai',  label: 'SAUCE THAI'               },
  { value: 'warehouse-b', label: 'Warehouse B'              },
];

export const getDefaultPaymentStatusOptions = (t: TFunction): ComboboxOption[] => [
  { value: 'all',    label: t('advanced_search.all_status') },
  { value: 'paid',   label: t('advanced_search.paid')       },
  { value: 'cod',    label: t('advanced_search.cod')        },
  { value: 'unpaid', label: t('advanced_search.unpaid')     },
];
