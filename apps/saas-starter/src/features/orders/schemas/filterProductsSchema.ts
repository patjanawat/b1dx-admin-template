import { z } from 'zod';
import type { TFunction } from 'i18next';

import type { SimpleTableValue } from '@b1dx/ui';

export const createFilterProductSchema = (t: TFunction) => z.object({
  skuFilter: z.enum(['all', 'range']),
  skuFrom: z.string(),
  skuTo: z.string(),
  itemFilter: z.enum(['all', 'range']),
  itemFrom: z.string(),
  itemTo: z.string(),
  table: z.custom<SimpleTableValue>(),
}).superRefine((values, ctx) => {
  if (values.skuFilter === 'range') {
    const hasSkuFrom = values.skuFrom.trim() !== '';
    const hasSkuTo = values.skuTo.trim() !== '';
    if (!hasSkuFrom) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['skuFrom'],
        message: t('filter_products.validation.sku_from_required'),
      });
    }
    if (!hasSkuTo) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['skuTo'],
        message: t('filter_products.validation.sku_to_required'),
      });
    }
    if (hasSkuFrom && hasSkuTo) {
      const skuFrom = Number(values.skuFrom);
      const skuTo = Number(values.skuTo);
      if (Number.isFinite(skuFrom) && Number.isFinite(skuTo) && skuFrom > skuTo) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['skuTo'],
          message: t('filter_products.validation.sku_range_invalid'),
        });
      }
    }
  }

  if (values.itemFilter === 'range') {
    const hasItemFrom = values.itemFrom.trim() !== '';
    const hasItemTo = values.itemTo.trim() !== '';
    if (!hasItemFrom) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['itemFrom'],
        message: t('filter_products.validation.item_from_required'),
      });
    }
    if (!hasItemTo) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['itemTo'],
        message: t('filter_products.validation.item_to_required'),
      });
    }
    if (hasItemFrom && hasItemTo) {
      const itemFrom = Number(values.itemFrom);
      const itemTo = Number(values.itemTo);
      if (Number.isFinite(itemFrom) && Number.isFinite(itemTo) && itemFrom > itemTo) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['itemTo'],
          message: t('filter_products.validation.item_range_invalid'),
        });
      }
    }
  }
});
