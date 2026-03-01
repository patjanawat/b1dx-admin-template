'use client';

import { type Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Section,
  SimpleOptionField,
  SimpleInputField,
  ApplySearchButton,
  AdvanceButton,
  SortButton,
  type ComboboxOption,
} from '@b1dx/ui';
import type { OrderPageFilters } from '../types';

export interface OrderSearchSectionProps {
  control: Control<OrderPageFilters>;
  onSearch: () => void;
  onAdvancedSearch: () => void;
  onSort: () => void;
  /** Number of active advanced-search fields; shows badge on Advanced button when > 0 */
  activeFilterCount?: number;
  /** Number of active sort fields; shows badge on Sort button when > 0 */
  activeSortCount?: number;
  searchByOptions: ComboboxOption[];
  channelOptions: ComboboxOption[];
  logisticsOptions: ComboboxOption[];
  printStatusOptions: ComboboxOption[];
}

export function OrderSearchSection({
  control,
  onSearch,
  onAdvancedSearch,
  onSort,
  activeFilterCount = 0,
  activeSortCount = 0,
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
          name="searchQuery"
          control={control}
          placeholder={t('common.search_placeholder')}
          inputClassName="h-10 bg-muted/30 font-medium"
        />

        <div className="lg:col-span-5 flex items-center gap-2">
          <ApplySearchButton onClick={onSearch} className="flex-1 lg:flex-none">
            {t('common.search')}
          </ApplySearchButton>
          <AdvanceButton onClick={onAdvancedSearch} count={activeFilterCount}>
            {t('common.advanced')}
          </AdvanceButton>
          <SortButton onClick={onSort} count={activeSortCount}>
            {t('common.sort')}
          </SortButton>
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
