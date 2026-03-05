'use client';

import { useEffect, useMemo } from 'react';
import { SimpleOptionField, SimpleTable, type SimpleTableValue } from '@b1dx/ui';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  getReserveStockProcessingColumns,
  getReserveStockMethodOptions,
  MOCK_RESERVE_STOCK_METHODS,
  MOCK_RESERVE_STOCK_PROCESSING_ROWS,
  type ReserveStockProcessingRow,
} from '../__mocks__/mockReserveStockProcessing';

interface ReserveStockProcessingFormValues {
  reserveMethod: string;
  table: SimpleTableValue;
}

export interface ReserveStockProcessingTabProps {
  onSelectedOrderIdsChange?: (orderIds: string[]) => void;
  onSelectedMethodChange?: (method: string) => void;
}

export function ReserveStockProcessingTab({
  onSelectedOrderIdsChange,
  onSelectedMethodChange,
}: ReserveStockProcessingTabProps) {
  const { t } = useTranslation();
  const columns = useMemo(() => getReserveStockProcessingColumns(t), [t]);
  const methodOptions = useMemo(() => getReserveStockMethodOptions(t), [t]);
  const { control } = useForm<ReserveStockProcessingFormValues>({
    defaultValues: {
      reserveMethod: MOCK_RESERVE_STOCK_METHODS[0],
      table: {
        rowSelection: {},
        sorting: [],
        pageIndex: 0,
        pageSize: 20,
      },
    },
  });
  const rowSelection = useWatch({ control, name: 'table.rowSelection' });
  const reserveMethod = useWatch({ control, name: 'reserveMethod' });

  useEffect(() => {
    const selectedOrderIds = Object.entries(rowSelection ?? {})
      .filter(([, selected]) => selected)
      .map(([index]) => MOCK_RESERVE_STOCK_PROCESSING_ROWS[Number(index)]?.orderId)
      .filter((orderId): orderId is string => Boolean(orderId));

    onSelectedOrderIdsChange?.(selectedOrderIds);
  }, [onSelectedOrderIdsChange, rowSelection]);

  useEffect(() => {
    if (!reserveMethod) return;
    onSelectedMethodChange?.(reserveMethod);
  }, [onSelectedMethodChange, reserveMethod]);

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{t('reserve_stock.table.description')}</p>
      <SimpleOptionField
        className="max-w-sm"
        label={t('reserve_stock.processing.method.label')}
        name="reserveMethod"
        control={control}
        options={methodOptions}
        placeholder={t('reserve_stock.processing.method.placeholder')}
      />
      <SimpleTable<ReserveStockProcessingRow, ReserveStockProcessingFormValues>
        name="table"
        control={control}
        columns={columns}
        data={MOCK_RESERVE_STOCK_PROCESSING_ROWS}
        total={MOCK_RESERVE_STOCK_PROCESSING_ROWS.length}        
      />
    </div>
  );
}
