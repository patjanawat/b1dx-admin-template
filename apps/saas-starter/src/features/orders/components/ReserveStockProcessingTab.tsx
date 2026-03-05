'use client';

import { Section } from '@b1dx/ui';
import { useTranslation } from 'react-i18next';

export function ReserveStockProcessingTab() {
  const { t } = useTranslation();

  return (
    <Section variant="default" className="space-y-2">
      <h3 className="text-base font-semibold text-foreground">
        {t('reserve_stock.placeholders.processing_title')}
      </h3>
      <p className="text-sm text-muted-foreground">
        {t('reserve_stock.placeholders.processing_description')}
      </p>
    </Section>
  );
}
