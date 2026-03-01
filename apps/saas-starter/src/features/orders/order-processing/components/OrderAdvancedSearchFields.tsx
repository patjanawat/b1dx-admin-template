'use client';

import { useTranslation } from 'react-i18next';
import { Input, Combobox, DatePicker } from '@b1dx/ui';
import type { ComboboxOption } from '@b1dx/ui';
import { useDialogBoundary } from './AdvancedSearchDialog';
import type { OrderAdvancedSearchFilters } from '../../types';
import { DEFAULT_ORDER_ADVANCED_FILTERS } from '../../types';
import {
  getChannelOptions,
  getLogisticsOptions,
  getDefaultWarehouseOptions,
  getDefaultPaymentStatusOptions,
} from '../../__mocks__/mockOptions';

export type { OrderAdvancedSearchFilters };
export { DEFAULT_ORDER_ADVANCED_FILTERS };

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
    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
      {text}
    </p>
  );
}

function FieldLabel({ text }: { text: string }) {
  return <p className="mb-1.5 text-sm font-medium text-foreground">{text}</p>;
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
              options={warehouseOptions ?? getDefaultWarehouseOptions(t)}
              value={filters.warehouse}
              onValueChange={(v) => set('warehouse', v || 'all')}
            />
          </div>
          <div>
            <FieldLabel text={t('advanced_search.channel')} />
            <Combobox
              options={channelOptions ?? getChannelOptions(t)}
              value={filters.channel}
              onValueChange={(v) => set('channel', v || 'all')}
            />
          </div>
          <div>
            <FieldLabel text={t('advanced_search.logistics')} />
            <Combobox
              options={logisticsOptions ?? getLogisticsOptions(t)}
              value={filters.logistics}
              onValueChange={(v) => set('logistics', v || 'all')}
            />
          </div>
          <div>
            <FieldLabel text={t('advanced_search.payment_status')} />
            <Combobox
              options={paymentStatusOptions ?? getDefaultPaymentStatusOptions(t)}
              value={filters.paymentStatus}
              onValueChange={(v) => set('paymentStatus', v || 'all')}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
