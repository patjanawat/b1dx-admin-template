'use client';

import { AppPageHeader, ExportExcelButton } from '@b1dx/ui';
import { useTranslation } from 'react-i18next';
import { OrderProcessing } from '@/features/orders';

export default function ProcessingOrdersPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <AppPageHeader
        title={t('processing_orders.title')}
        description={t('processing_orders.subtitle')}
        actions={<ExportExcelButton>{t('common.export_excel')}</ExportExcelButton>}
      />
      <OrderProcessing />
    </div>
  );
}
