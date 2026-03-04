import { z } from 'zod';

import type { SimpleTableValue } from '@b1dx/ui';

export const filterProductSchema = z.object({
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
        message: 'Please enter SKU from',
      });
    }
    if (!hasSkuTo) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['skuTo'],
        message: 'Please enter SKU to',
      });
    }
    if (hasSkuFrom && hasSkuTo) {
      const skuFrom = Number(values.skuFrom);
      const skuTo = Number(values.skuTo);
      if (Number.isFinite(skuFrom) && Number.isFinite(skuTo) && skuFrom > skuTo) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['skuTo'],
          message: 'SKU to must be greater than or equal to SKU from',
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
        message: 'Please enter item from',
      });
    }
    if (!hasItemTo) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['itemTo'],
        message: 'Please enter item to',
      });
    }
    if (hasItemFrom && hasItemTo) {
      const itemFrom = Number(values.itemFrom);
      const itemTo = Number(values.itemTo);
      if (Number.isFinite(itemFrom) && Number.isFinite(itemTo) && itemFrom > itemTo) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['itemTo'],
          message: 'Item to must be greater than or equal to item from',
        });
      }
    }
  }
});
