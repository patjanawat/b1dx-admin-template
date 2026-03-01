'use client';

import { useController, type Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Combobox, Section, type ComboboxOption } from '@b1dx/ui';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import type { OrderSearchFormValues } from '../../types';

/* ── Sub-component ────────────────────────────────────────────────── */

function FilterLabel({ text }: { text: string }) {
  return (
    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
      {text}
    </p>
  );
}

/* ── Props ────────────────────────────────────────────────────────── */

export interface RHFOrderSearchSectionProps {
  control: Control<OrderSearchFormValues>;
  /** Called when the Search button is clicked — typically form handleSubmit() */
  onSearch: () => void;
  onAdvancedSearch: () => void;
  searchByOptions: ComboboxOption[];
  channelOptions: ComboboxOption[];
  logisticsOptions: ComboboxOption[];
  printStatusOptions: ComboboxOption[];
}

/* ── Component ────────────────────────────────────────────────────── */

export function RHFOrderSearchSection({
  control,
  onSearch,
  onAdvancedSearch,
  searchByOptions,
  channelOptions,
  logisticsOptions,
  printStatusOptions,
}: RHFOrderSearchSectionProps) {
  const { t } = useTranslation();

  const { field: searchByField }    = useController({ name: 'searchBy',    control });
  const { field: searchQueryField } = useController({ name: 'searchQuery', control });
  const { field: channelField }     = useController({ name: 'channel',     control });
  const { field: logisticsField }   = useController({ name: 'logistics',   control });
  const { field: printStatusField } = useController({ name: 'printStatus', control });

  return (
    <Section variant="default" className="space-y-6">

      {/* Row 1: Search by + keyword + action buttons */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 items-end">

        <div className="lg:col-span-3">
          <FilterLabel text={t('common.search_by')} />
          <Combobox
            options={searchByOptions}
            value={searchByField.value}
            onValueChange={(v) => searchByField.onChange(v || 'recipient')}
            placeholder={t('common.recipient_name')}
          />
        </div>

        <div className="lg:col-span-4">
          <p className="mb-2 text-xs opacity-0 select-none">&nbsp;</p>
          <input
            type="text"
            value={searchQueryField.value}
            onChange={(e) => searchQueryField.onChange(e.target.value)}
            onBlur={searchQueryField.onBlur}
            name={searchQueryField.name}
            ref={searchQueryField.ref}
            placeholder={t('common.search_placeholder')}
            className="h-10 w-full rounded-md border border-input bg-muted/30 px-3 text-sm font-medium outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
        </div>

        <div className="lg:col-span-5 flex items-center gap-2">
          <Button
            onClick={onSearch}
            className="h-10 flex-1 gap-2 rounded-xl font-bold lg:flex-none lg:px-8"
          >
            <Search size={16} />
            {t('common.search')}
          </Button>
          <Button
            variant="outline"
            className="h-10 gap-2 rounded-xl font-bold"
            onClick={onAdvancedSearch}
          >
            <Filter size={16} />
            {t('common.advanced')}
          </Button>
          <Button variant="outline" className="h-10 gap-2 rounded-xl font-bold">
            <ArrowUpDown size={16} />
            {t('common.sort')}
          </Button>
        </div>

      </div>

      {/* Row 2: Secondary filters */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        <div>
          <FilterLabel text={t('common.sales_channel')} />
          <Combobox
            options={channelOptions}
            value={channelField.value}
            onValueChange={(v) => channelField.onChange(v || 'all')}
            placeholder={t('common.all_channels')}
            badgeCount={channelField.value !== 'all' ? 1 : undefined}
          />
        </div>

        <div>
          <FilterLabel text={t('common.logistics')} />
          <Combobox
            options={logisticsOptions}
            value={logisticsField.value}
            onValueChange={(v) => logisticsField.onChange(v || 'all')}
            placeholder={t('common.all_logistics')}
            badgeCount={logisticsField.value !== 'all' ? 1 : undefined}
          />
        </div>

        <div>
          <FilterLabel text={t('common.print_status')} />
          <Combobox
            options={printStatusOptions}
            value={printStatusField.value}
            onValueChange={(v) => printStatusField.onChange(v || 'all')}
            placeholder={t('common.all')}
            badgeCount={printStatusField.value !== 'all' ? 1 : undefined}
          />
        </div>

      </div>

    </Section>
  );
}
