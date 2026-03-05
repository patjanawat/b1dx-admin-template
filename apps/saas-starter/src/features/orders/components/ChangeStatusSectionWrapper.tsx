'use client';

import { useMemo, useState } from 'react';
import { Button, TabsWithFormWrapper } from '@b1dx/ui';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { ReserveStockFailedTab } from './ReserveStockFailedTab';
import { ChangeStatusProcessingTab } from './ChangeStatusProcessingTab';

const CHANGE_STATUS_TABS = [
  { value: 'processing', labelKey: 'change_status.tabs.processing' },
  { value: 'failed', labelKey: 'change_status.tabs.failed' },
] as const;

export function ChangeStatusSectionWrapper() {
  const { t } = useTranslation();
  const tabs = useMemo(
    () => CHANGE_STATUS_TABS.map((tab) => ({ value: tab.value, label: t(tab.labelKey) })),
    [t]
  );
  const [activeTab, setActiveTab] = useState<string>("0");
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  return (
    <div className="min-h-170 p-6 space-y-6 bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <TabsWithFormWrapper tabs={tabs} value={activeTab} onValueChange={setActiveTab}>
        <div className="mt-4">
          {activeTab === '0' ? ( // TODO: Use real tab value when navigation is implemented. For now, we use "0" as the default active tab value to show the processing tab.
            <ChangeStatusProcessingTab
              onSelectedOrderIdsChange={setSelectedOrderIds}
              onSelectedStatusChange={setSelectedStatus}
            />
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
            console.log('Selected target status:', selectedStatus);
            toast.success(t('change_status.toast_success'), {
              description: t('change_status.toast_success_desc', {
                status: selectedStatus ? t(selectedStatus) : '-',
              }),
            });
          }}
        >
          {t('change_status.actions.process')}
        </Button>
      </div>
    </div>
  );
}
