import type { SimpleTableValue } from '@b1dx/ui';

export interface FilterProductFormValues {
  skuFilter: 'all' | 'range';
  skuFrom: string;
  skuTo: string;
  itemFilter: 'all' | 'range';
  itemFrom: string;
  itemTo: string;
  table: SimpleTableValue;
}

