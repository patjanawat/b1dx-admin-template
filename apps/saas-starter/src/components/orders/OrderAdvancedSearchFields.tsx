'use client';

import { useTranslation } from 'react-i18next';
import { Input, Combobox, DatePicker } from '@b1dx/ui';
import type { ComboboxOption } from '@b1dx/ui';
import { useDialogBoundary } from './AdvancedSearchDialog';

/* ── Filter shape ────────────────────────────────────────────────── */
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

/* ── Props ───────────────────────────────────────────────────────── */
interface OrderAdvancedSearchFieldsProps {
  filters: OrderAdvancedSearchFilters;
  onChange: (filters: OrderAdvancedSearchFilters) => void;
  warehouseOptions?: ComboboxOption[];
  channelOptions?: ComboboxOption[];
  logisticsOptions?: ComboboxOption[];
  paymentStatusOptions?: ComboboxOption[];
}

/* ── Sub-components ──────────────────────────────────────────────── */
function SectionLabel({ text }: { text: string }) {
  return (
    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
      {text}
    </p>
  );
}

function FieldLabel({ text }: { text: string }) {
  return (
    <p className="mb-1.5 text-xs font-bold text-foreground">{text}</p>
  );
}

/* ── Component ───────────────────────────────────────────────────── */
export function OrderAdvancedSearchFields({
  filters,
  onChange,
  warehouseOptions,
  channelOptions,
  logisticsOptions,
  paymentStatusOptions,
}: OrderAdvancedSearchFieldsProps) {
  const { t } = useTranslation();
  const collisionBoundary = useDialogBoundary();

  const set = <K extends keyof OrderAdvancedSearchFilters>(
    key: K,
    value: OrderAdvancedSearchFilters[K]
  ) => onChange({ ...filters, [key]: value });

  /* Default options (can be overridden per page via props) */
  const defaultWarehouseOptions: ComboboxOption[] = [
    { value: 'all', label: t('advanced_search.all_warehouses') },
    { value: 'sauce-thai', label: 'SAUCE THAI' },
    { value: 'warehouse-b', label: 'Warehouse B' },
  ];

  const defaultChannelOptions: ComboboxOption[] = [
    { value: 'all', label: t('advanced_search.all_channels') },
    { value: 'shopee', label: 'Shopee' },
    { value: 'lazada', label: 'Lazada' },
    { value: 'tiktok', label: 'TikTok Shop' },
    { value: 'facebook', label: 'Facebook' },
  ];

  const defaultLogisticsOptions: ComboboxOption[] = [
    { value: 'all', label: t('advanced_search.all_logistics') },
    { value: 'best', label: 'BEST Express' },
    { value: 'kerry', label: 'Kerry Express' },
    { value: 'flash', label: 'Flash Express' },
    { value: 'jt', label: 'J&T Express' },
  ];

  const defaultPaymentStatusOptions: ComboboxOption[] = [
    { value: 'all', label: t('advanced_search.all_status') },
    { value: 'paid', label: t('advanced_search.paid') },
    { value: 'cod', label: t('advanced_search.cod') },
    { value: 'unpaid', label: t('advanced_search.unpaid') },
  ];

  /* Active-border input class — uses CSS variables to match theme */
  const inputClass = [
    'h-10 rounded-xl bg-muted/30 border-input transition-all',
    'focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary',
    'focus-visible:bg-background',
  ].join(' ');

  return (
    <div className="space-y-6">

      {/* Section 1: Order Details */}
      <div className="space-y-3">
        <SectionLabel text={t('advanced_search.section_order')} />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FieldLabel text={t('advanced_search.order_id')} />
            <Input
              placeholder={t('advanced_search.order_id_placeholder')}
              value={filters.orderId}
              onChange={(e) => set('orderId', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <FieldLabel text={t('advanced_search.tracking_id')} />
            <Input
              placeholder={t('advanced_search.tracking_id_placeholder')}
              value={filters.trackingId}
              onChange={(e) => set('trackingId', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Section 2: Recipient Info */}
      <div className="space-y-3">
        <SectionLabel text={t('advanced_search.section_recipient')} />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FieldLabel text={t('advanced_search.recipient_name')} />
            <Input
              placeholder={t('advanced_search.recipient_name_placeholder')}
              value={filters.recipientName}
              onChange={(e) => set('recipientName', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <FieldLabel text={t('advanced_search.phone')} />
            <Input
              placeholder={t('advanced_search.phone_placeholder')}
              value={filters.phone}
              onChange={(e) => set('phone', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Section 3: Date Range */}
      <div className="space-y-3">
        <SectionLabel text={t('advanced_search.section_date')} />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FieldLabel text={t('advanced_search.start_date')} />
            <DatePicker
              value={filters.startDate}
              onChange={(date) => set('startDate', date)}
              placeholder={t('advanced_search.start_date')}
              collisionBoundary={collisionBoundary}
            />
          </div>
          <div>
            <FieldLabel text={t('advanced_search.end_date')} />
            <DatePicker
              value={filters.endDate}
              onChange={(date) => set('endDate', date)}
              placeholder={t('advanced_search.end_date')}
              collisionBoundary={collisionBoundary}
            />
          </div>
        </div>
      </div>

      {/* Section 4: Status & Source */}
      <div className="space-y-3">
        <SectionLabel text={t('advanced_search.section_status')} />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FieldLabel text={t('advanced_search.warehouse')} />
            <Combobox
              options={warehouseOptions ?? defaultWarehouseOptions}
              value={filters.warehouse}
              onValueChange={(v) => set('warehouse', v || 'all')}
            />
          </div>
          <div>
            <FieldLabel text={t('advanced_search.channel')} />
            <Combobox
              options={channelOptions ?? defaultChannelOptions}
              value={filters.channel}
              onValueChange={(v) => set('channel', v || 'all')}
            />
          </div>
          <div>
            <FieldLabel text={t('advanced_search.logistics')} />
            <Combobox
              options={logisticsOptions ?? defaultLogisticsOptions}
              value={filters.logistics}
              onValueChange={(v) => set('logistics', v || 'all')}
            />
          </div>
          <div>
            <FieldLabel text={t('advanced_search.payment_status')} />
            <Combobox
              options={paymentStatusOptions ?? defaultPaymentStatusOptions}
              value={filters.paymentStatus}
              onValueChange={(v) => set('paymentStatus', v || 'all')}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
