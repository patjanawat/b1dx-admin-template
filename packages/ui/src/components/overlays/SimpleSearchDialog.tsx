'use client';

import { Search } from 'lucide-react';
import { SimpleDialog, useSimpleDialogBoundary } from './SimpleDialog';
import { ResetButton, CancelButton, ApplySearchButton } from '../app/ActionButtons';
import type { ReactNode } from 'react';

/* ── Backward-compat boundary hook alias ─────────────────────────── */

export { useSimpleDialogBoundary as useSimpleSearchDialogBoundary };

/* ── Props ───────────────────────────────────────────────────────── */

export interface SimpleSearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: () => void;
  onReset: () => void;
  children: ReactNode;
  /** Dialog title. Default: "Advanced Search" */
  title?: string;
  /** Reset button label. Default: "Reset" */
  resetLabel?: string;
  /** Cancel button label. Default: "Cancel" */
  cancelLabel?: string;
  /** Apply/search button label. Default: "Search" */
  applyLabel?: string;
}

/* ── Component ───────────────────────────────────────────────────── */

export function SimpleSearchDialog({
  isOpen,
  onClose,
  onSearch,
  onReset,
  children,
  title = 'Advanced Search',
  resetLabel = 'Reset',
  cancelLabel = 'Cancel',
  applyLabel = 'Apply Search',
}: SimpleSearchDialogProps) {
  return (
    <SimpleDialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      icon={<Search size={20} />}
      footer={
        <div className="flex items-center justify-between">
          <ResetButton onClick={onReset}>{resetLabel}</ResetButton>
          <div className="flex items-center gap-2">
            <CancelButton onClick={onClose}>{cancelLabel}</CancelButton>
            <ApplySearchButton onClick={onSearch}>{applyLabel}</ApplySearchButton>
          </div>
        </div>
      }
    >
      {children}
    </SimpleDialog>
  );
}
