'use client';

import { type Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Section,
  SimpleOptionField,
  SimpleInputField,
  type ComboboxOption,
} from '@b1dx/ui';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import type { OrderSearchFormValues } from '../../types';

export interface OrderSearchSectionProps {
  control: Control<OrderSearchFormValues>;
  onSearch: () => void;
  onAdvancedSearch: () => void;
  searchByOptions: ComboboxOption[];
  channelOptions: ComboboxOption[];
  logisticsOptions: ComboboxOption[];
  printStatusOptions: ComboboxOption[];
}

export function OrderSearchSection({
  control,
  onSearch,
  onAdvancedSearch,
  searchByOptions,
  channelOptions,
  logisticsOptions,
  printStatusOptions,
}: OrderSearchSectionProps) {
  const { t } = useTranslation();

  return (
    <Section variant="default" className="space-y-6">

      {/* Row 1: Search by + keyword + action buttons */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 items-end">

        <SimpleOptionField
          className="lg:col-span-3"
          label={t('common.search_by')}
          name="searchBy"
          control={control}
          options={searchByOptions}
          placeholder={t('common.recipient_name')}
        />

        <SimpleInputField
          className="lg:col-span-4"
          label={t('common.keyword')}
          name="searchQuery"
          control={control}
          placeholder={t('common.search_placeholder')}
          inputClassName="h-10 bg-muted/30 font-medium"
        />

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

        <SimpleOptionField
          label={t('common.sales_channel')}
          name="channel"
          control={control}
          options={channelOptions}
          placeholder={t('common.all_channels')}
          noneValue="all"
        />

        <SimpleOptionField
          label={t('common.logistics')}
          name="logistics"
          control={control}
          options={logisticsOptions}
          placeholder={t('common.all_logistics')}
          noneValue="all"
        />

        <SimpleOptionField
          label={t('common.print_status')}
          name="printStatus"
          control={control}
          options={printStatusOptions}
          placeholder={t('common.all')}
          noneValue="all"
        />

      </div>

    </Section>
  );
}
