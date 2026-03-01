'use client';

import { ArrowUpDown } from 'lucide-react';
import { SimpleDialog } from './SimpleDialog';
import { ResetButton, CancelButton, ApplySortButton } from '../app/ActionButtons';
import type { ReactNode } from 'react';

/* ── Types ───────────────────────────────────────────────────────── */

export interface SortOption {
  label: string;
  value: string;
}

export interface SortState {
  key: string;
  direction: 'asc' | 'desc';
}

export type MultiSortState = SortState[];

/* ── Props ───────────────────────────────────────────────────────── */

export interface SimpleSortDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSort: () => void;
  onReset?: () => void;
  children: ReactNode;
  /** Dialog title. Default: "Sort" */
  title?: string;
  /** Reset button label. Default: "Reset" */
  resetLabel?: string;
  /** Cancel button label. Default: "Cancel" */
  cancelLabel?: string;
  /** Apply button label. Default: "Apply Sort" */
  applyLabel?: string;
  /** Current number of active sort fields (for header counter) */
  fieldCount?: number;
  /** Max number of sort fields (for header counter) */
  maxFields?: number;
}

/* ── Component ───────────────────────────────────────────────────── */

export function SimpleSortDialog({
  isOpen,
  onClose,
  onSort,
  onReset,
  children,
  title = 'Sort',
  resetLabel = 'Reset',
  cancelLabel = 'Cancel',
  applyLabel = 'Apply Sort',
  fieldCount,
  maxFields,
}: SimpleSortDialogProps) {
  return (
    <SimpleDialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      icon={<ArrowUpDown size={20} />}
      maxWidth="sm:max-w-[450px]"
      headerExtra={
        fieldCount !== undefined && maxFields !== undefined ? (
          <span className="text-xs font-black text-muted-foreground tabular-nums">
            {fieldCount} / {maxFields}
          </span>
        ) : undefined
      }
      footer={
        <div className="flex items-center justify-between">
          {onReset ? (
            <ResetButton onClick={onReset}>{resetLabel}</ResetButton>
          ) : (
            <div />
          )}
          <div className="flex items-center gap-2">
            <CancelButton onClick={onClose}>{cancelLabel}</CancelButton>
            <ApplySortButton onClick={onSort}>{applyLabel}</ApplySortButton>
          </div>
        </div>
      }
    >
      {children}
    </SimpleDialog>
  );
}
