'use client';

import { useEffect, useMemo } from 'react';
import { SimpleTable, type SimpleTableValue } from '@b1dx/ui';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  getReserveStockProcessingColumns,
  MOCK_RESERVE_STOCK_PROCESSING_ROWS,
  type ReserveStockProcessingRow,
} from '../__mocks__/mockReserveStockProcessing';

interface ReserveStockProcessingFormValues {
  table: SimpleTableValue;
}

export interface ReserveStockProcessingTabProps {
  onSelectedOrderIdsChange?: (orderIds: string[]) => void;
}

export function ReserveStockProcessingTab({ onSelectedOrderIdsChange }: ReserveStockProcessingTabProps) {
  const { t } = useTranslation();
  const columns = useMemo(() => getReserveStockProcessingColumns(t), [t]);
  const { control } = useForm<ReserveStockProcessingFormValues>({
    defaultValues: {
      table: {
        rowSelection: {},
        sorting: [],
        pageIndex: 0,
        pageSize: 20,
      },
    },
  });
  const rowSelection = useWatch({ control, name: 'table.rowSelection' });

  useEffect(() => {
    const selectedOrderIds = Object.entries(rowSelection ?? {})
      .filter(([, selected]) => selected)
      .map(([index]) => MOCK_RESERVE_STOCK_PROCESSING_ROWS[Number(index)]?.orderId)
      .filter((orderId): orderId is string => Boolean(orderId));

    onSelectedOrderIdsChange?.(selectedOrderIds);
  }, [onSelectedOrderIdsChange, rowSelection]);

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{t('reserve_stock.table.description')}</p>
      <SimpleTable<ReserveStockProcessingRow, ReserveStockProcessingFormValues>
        name="table"
        control={control}
        columns={columns}
        data={MOCK_RESERVE_STOCK_PROCESSING_ROWS}
        total={MOCK_RESERVE_STOCK_PROCESSING_ROWS.length}
        enableRowSelection
      />
    </div>
  );
}
