'use client';

import { useMemo, useState } from 'react';
import { Button, TabsWithFormWrapper } from '@b1dx/ui';
import { useTranslation } from 'react-i18next';
import { MOCK_RESERVE_STOCK_TABS, type ReserveStockTabValue } from '../__mocks__/mockReserveStock';
import { ReserveStockFailedTab } from './ReserveStockFailedTab';
import { ReserveStockProcessingTab } from './ReserveStockProcessingTab';

export function ReserveStockSection() {
  const { t } = useTranslation();
  const tabs = useMemo(
    () => MOCK_RESERVE_STOCK_TABS.map((tab) => ({ value: tab.value, label: t(tab.labelKey) })),
    [t]
  );
  const [activeTab, setActiveTab] = useState("0");

  return (
    <div className="space-y-6">
      <TabsWithFormWrapper tabs={tabs} value={activeTab} onValueChange={(value) => setActiveTab(value as ReserveStockTabValue)}>
        <div className="mt-4">
          {activeTab === '0' ? <ReserveStockProcessingTab /> : <ReserveStockFailedTab />}
        </div>
      </TabsWithFormWrapper>

      <div className="flex justify-end">
        <Button type="button" className="px-8">
          {t('reserve_stock.actions.process')}
        </Button>
      </div>
    </div>
  );
}
