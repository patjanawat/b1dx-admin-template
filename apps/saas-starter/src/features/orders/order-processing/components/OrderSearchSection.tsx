'use client';

import { useTranslation } from 'react-i18next';
import { Button, Combobox, Section, type ComboboxOption } from '@b1dx/ui';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

/* ── Sub-component: field label ───────────────────────────────────── */

function FilterLabel({ text }: { text: string }) {
  return (
    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
      {text}
    </p>
  );
}

/* ── Props ────────────────────────────────────────────────────────── */

export interface OrderSearchSectionProps {
  /* Row 1 — search by + keyword + action buttons */
  searchByOptions: ComboboxOption[];
  searchBy: string;
  onSearchByChange: (v: string) => void;
  searchQuery: string;
  onSearchQueryChange: (v: string) => void;
  onSearch: () => void;
  onAdvancedSearch: () => void;

  /* Row 2 — secondary filters */
  channelOptions: ComboboxOption[];
  channel: string;
  onChannelChange: (v: string) => void;

  logisticsOptions: ComboboxOption[];
  logistics: string;
  onLogisticsChange: (v: string) => void;

  printStatusOptions: ComboboxOption[];
  printStatus: string;
  onPrintStatusChange: (v: string) => void;
}

/* ── Component ────────────────────────────────────────────────────── */

export function OrderSearchSection({
  searchByOptions,
  searchBy,
  onSearchByChange,
  searchQuery,
  onSearchQueryChange,
  onSearch,
  onAdvancedSearch,
  channelOptions,
  channel,
  onChannelChange,
  logisticsOptions,
  logistics,
  onLogisticsChange,
  printStatusOptions,
  printStatus,
  onPrintStatusChange,
}: OrderSearchSectionProps) {
  const { t } = useTranslation();

  return (
    <Section variant="default" className="space-y-6">

      {/* Row 1: Search by + keyword + action buttons */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 items-end">

        <div className="lg:col-span-3">
          <FilterLabel text={t('common.search_by')} />
          <Combobox
            options={searchByOptions}
            value={searchBy}
            onValueChange={(v) => onSearchByChange(v || 'recipient')}
            placeholder={t('common.recipient_name')}
          />
        </div>

        <div className="lg:col-span-4">
          {/* Spacer label keeps alignment with Row 1 label height */}
          <p className="mb-2 text-xs opacity-0 select-none">&nbsp;</p>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
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
            value={channel}
            onValueChange={(v) => onChannelChange(v || 'all')}
            placeholder={t('common.all_channels')}
            badgeCount={channel !== 'all' ? 1 : undefined}
          />
        </div>

        <div>
          <FilterLabel text={t('common.logistics')} />
          <Combobox
            options={logisticsOptions}
            value={logistics}
            onValueChange={(v) => onLogisticsChange(v || 'all')}
            placeholder={t('common.all_logistics')}
            badgeCount={logistics !== 'all' ? 1 : undefined}
          />
        </div>

        <div>
          <FilterLabel text={t('common.print_status')} />
          <Combobox
            options={printStatusOptions}
            value={printStatus}
            onValueChange={(v) => onPrintStatusChange(v || 'all')}
            placeholder={t('common.all')}
            badgeCount={printStatus !== 'all' ? 1 : undefined}
          />
        </div>

      </div>

    </Section>
  );
}
