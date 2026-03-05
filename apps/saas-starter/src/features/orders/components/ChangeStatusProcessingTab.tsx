'use client';

import { useEffect, useMemo } from 'react';
import { SimpleOptionField, SimpleTable, type SimpleTableValue, type ComboboxOption } from '@b1dx/ui';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  getReserveStockProcessingColumns,
  MOCK_RESERVE_STOCK_PROCESSING_ROWS,
} from '../__mocks__/mockReserveStockProcessing';

const CHANGE_STATUS_OPTIONS = [
  'status.wait_confirm',
  'status.wait_stock',
  'status.wait_pickup',
  'status.wait_picking',
  'status.packing',
  'status.wait_shipping',
  'status.shipping',
  'status.returning',
] as const;

interface ChangeStatusProcessingFormValues {
  targetStatus: string;
  table: SimpleTableValue;
}

export interface ChangeStatusProcessingTabProps {
  onSelectedOrderIdsChange?: (orderIds: string[]) => void;
  onSelectedStatusChange?: (status: string) => void;
}

export function ChangeStatusProcessingTab({
  onSelectedOrderIdsChange,
  onSelectedStatusChange,
}: ChangeStatusProcessingTabProps) {
  const { t } = useTranslation();
  const columns = useMemo(() => getReserveStockProcessingColumns(t), [t]);
  const statusOptions = useMemo<ComboboxOption[]>(
    () =>
      CHANGE_STATUS_OPTIONS.map((statusKey) => ({
        value: statusKey,
        label: t(statusKey),
      })),
    [t]
  );

  const { control } = useForm<ChangeStatusProcessingFormValues>({
    defaultValues: {
      targetStatus: CHANGE_STATUS_OPTIONS[0],
      table: {
        rowSelection: {},
        sorting: [],
        pageIndex: 0,
        pageSize: 20,
      },
    },
  });

  const rowSelection = useWatch({ control, name: 'table.rowSelection' });
  const targetStatus = useWatch({ control, name: 'targetStatus' });

  useEffect(() => {
    const selectedOrderIds = Object.entries(rowSelection ?? {})
      .filter(([, selected]) => selected)
      .map(([index]) => MOCK_RESERVE_STOCK_PROCESSING_ROWS[Number(index)]?.orderId)
      .filter((orderId): orderId is string => Boolean(orderId));

    onSelectedOrderIdsChange?.(selectedOrderIds);
  }, [onSelectedOrderIdsChange, rowSelection]);

  useEffect(() => {
    if (!targetStatus) return;
    onSelectedStatusChange?.(targetStatus);
  }, [onSelectedStatusChange, targetStatus]);

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{t('change_status.table.description')}</p>
      <SimpleOptionField
        className="max-w-sm"
        label={t('change_status.processing.status.label')}
        name="targetStatus"
        control={control}
        options={statusOptions}
        placeholder={t('change_status.processing.status.placeholder')}
      />
      <SimpleTable
        name="table"
        control={control}
        columns={columns}
        data={MOCK_RESERVE_STOCK_PROCESSING_ROWS}
        total={MOCK_RESERVE_STOCK_PROCESSING_ROWS.length}
      />
    </div>
  );
}
