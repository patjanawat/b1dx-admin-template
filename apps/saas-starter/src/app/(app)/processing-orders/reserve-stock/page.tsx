'use client';

import { AppPageHeader, ExportExcelButton } from '@b1dx/ui';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { ReserveStockSection } from '@/features/orders';

export default function ReserveStockPage() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="space-y-6">
      <AppPageHeader
        title={t('reserve_stock.title')}
        description={t('reserve_stock.subtitle')}
        showBackButton
        onBack={() => router.back()}
        backLabel={t('common.back')}
        backAriaLabel={t('common.back')}
        actions={<ExportExcelButton>{t('common.export_excel')}</ExportExcelButton>}
      />

      <ReserveStockSection />
    </div>
  );
}
