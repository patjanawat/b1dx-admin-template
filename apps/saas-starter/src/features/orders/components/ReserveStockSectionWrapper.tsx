'use client';

import { useMemo, useState } from 'react';
import { Button, TabsWithFormWrapper } from '@b1dx/ui';
import { useTranslation } from 'react-i18next';
import { MOCK_RESERVE_STOCK_TABS, type ReserveStockTabValue } from '../__mocks__/mockReserveStock';
import { ReserveStockFailedTab } from './ReserveStockFailedTab';
import { ReserveStockProcessingTab } from './ReserveStockProcessingTab';

export function ReserveStockSectionWrapper() {
  const { t } = useTranslation();
  // TODO: Use real tab value when navigation is implemented. For now, we use "0" as the default active tab value to show the processing tab.
  const tabs = useMemo(
    () => MOCK_RESERVE_STOCK_TABS.map((tab) => ({ value: tab.value, label: t(tab.labelKey) })),
    [t]
  );
  const [activeTab, setActiveTab] = useState<string>("0"); // TODO: Use real tab value when navigation is implemented.
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);

  return (
    <div className="space-y-6">
      <TabsWithFormWrapper
        tabs={tabs}
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as ReserveStockTabValue)}
      >
        <div className="mt-4">
          {activeTab === '0' ? (
            <ReserveStockProcessingTab onSelectedOrderIdsChange={setSelectedOrderIds} />
          ) : (
            <ReserveStockFailedTab />
          )}
        </div>
      </TabsWithFormWrapper>

      <div className="flex justify-end">
        <Button
          type="button"
          className="px-8"
          onClick={() => {
            console.log('Selected order ids:', selectedOrderIds);
          }}
        >
          {t('reserve_stock.actions.process')}
        </Button>
      </div>
    </div>
  );
}
