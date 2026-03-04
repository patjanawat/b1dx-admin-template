'use client';

import { AppPageHeader, ExportExcelButton } from '@b1dx/ui';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { FilterProductsSection } from '@/features/orders';

export default function FilterProductsPage() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="space-y-6">
      <AppPageHeader
        title={t('filter_products.title')}
        description={t('filter_products.subtitle')}
        showBackButton
        onBack={() => router.back()}
        backLabel={t('common.back')}
        backAriaLabel={t('common.back')}
        actions={<ExportExcelButton>{t('common.export_excel')}</ExportExcelButton>}
      />

      <FilterProductsSection />
    </div>
  );
}
