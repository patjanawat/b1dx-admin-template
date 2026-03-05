'use client';

import { useMemo } from 'react';
import { SimpleTable, type SimpleTableValue } from '@b1dx/ui';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  getReserveStockFailedColumns,
  MOCK_RESERVE_STOCK_FAILED_ROWS,
  type ReserveStockFailedRow,
} from '../__mocks__/mockReserveStockFailed';

interface ReserveStockFailedFormValues {
  table: SimpleTableValue;
}

export function ReserveStockFailedTab() {
  const { t } = useTranslation();
  const columns = useMemo(() => getReserveStockFailedColumns(t), [t]);
  const { control } = useForm<ReserveStockFailedFormValues>({
    defaultValues: {
      table: {
        rowSelection: {},
        sorting: [],
        pageIndex: 0,
        pageSize: 20,
      },
    },
  });

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{t('reserve_stock.failed_table.description')}</p>
      <SimpleTable<ReserveStockFailedRow, ReserveStockFailedFormValues>
        name="table"
        control={control}
        columns={columns}
        data={MOCK_RESERVE_STOCK_FAILED_ROWS}
        total={MOCK_RESERVE_STOCK_FAILED_ROWS.length}
      />
    </div>
  );
}
