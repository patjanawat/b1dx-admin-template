'use client';

import { useTranslation } from 'react-i18next';
import {
  SimpleInputField,
  SimpleDateTimeField,
  SimpleOptionField,
  useSimpleSearchDialogBoundary,
} from '@b1dx/ui';
import type { ComboboxOption } from '@b1dx/ui';
import type { Control } from 'react-hook-form';
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
  control: Control<OrderAdvancedSearchFilters>;
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

/* ── Component ───────────────────────────────────────────────────── */

export function OrderAdvancedSearchFields({
  control,
  warehouseOptions,
  channelOptions,
  logisticsOptions,
  paymentStatusOptions,
}: OrderAdvancedSearchFieldsProps) {
  const { t } = useTranslation();
  const collisionBoundary = useSimpleSearchDialogBoundary();

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
          <SimpleInputField
            name="orderId"
            control={control}
            label={t('advanced_search.order_id')}
            placeholder={t('advanced_search.order_id_placeholder')}
            inputClassName={inputClass}
          />
          <SimpleInputField
            name="trackingId"
            control={control}
            label={t('advanced_search.tracking_id')}
            placeholder={t('advanced_search.tracking_id_placeholder')}
            inputClassName={inputClass}
          />
        </div>
      </div>

      {/* Section 2: Recipient Info */}
      <div className="space-y-3">
        <SectionLabel text={t('advanced_search.section_recipient')} />
        <div className="grid grid-cols-2 gap-4">
          <SimpleInputField
            name="recipientName"
            control={control}
            label={t('advanced_search.recipient_name')}
            placeholder={t('advanced_search.recipient_name_placeholder')}
            inputClassName={inputClass}
          />
          <SimpleInputField
            name="phone"
            control={control}
            label={t('advanced_search.phone')}
            placeholder={t('advanced_search.phone_placeholder')}
            inputClassName={inputClass}
          />
        </div>
      </div>

      {/* Section 3: Date Range */}
      <div className="space-y-3">
        <SectionLabel text={t('advanced_search.section_date')} />
        <div className="grid grid-cols-2 gap-4">
          <SimpleDateTimeField
            name="startDate"
            control={control}
            label={t('advanced_search.start_date')}
            placeholder={t('advanced_search.start_date')}
            collisionBoundary={collisionBoundary}
          />
          <SimpleDateTimeField
            name="endDate"
            control={control}
            label={t('advanced_search.end_date')}
            placeholder={t('advanced_search.end_date')}
            collisionBoundary={collisionBoundary}
          />
        </div>
      </div>

      {/* Section 4: Status & Source */}
      <div className="space-y-3">
        <SectionLabel text={t('advanced_search.section_status')} />
        <div className="grid grid-cols-2 gap-4">
          <SimpleOptionField
            name="warehouse"
            control={control}
            label={t('advanced_search.warehouse')}
            options={warehouseOptions ?? getDefaultWarehouseOptions(t)}
          />
          <SimpleOptionField
            name="channel"
            control={control}
            label={t('advanced_search.channel')}
            options={channelOptions ?? getChannelOptions(t)}
          />
          <SimpleOptionField
            name="logistics"
            control={control}
            label={t('advanced_search.logistics')}
            options={logisticsOptions ?? getLogisticsOptions(t)}
          />
          <SimpleOptionField
            name="paymentStatus"
            control={control}
            label={t('advanced_search.payment_status')}
            options={paymentStatusOptions ?? getDefaultPaymentStatusOptions(t)}
          />
        </div>
      </div>

    </div>
  );
}
