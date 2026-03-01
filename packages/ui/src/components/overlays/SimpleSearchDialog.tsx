'use client';

import { Search, RotateCcw } from 'lucide-react';
import { SimpleDialog, useSimpleDialogBoundary } from './SimpleDialog';
import { Button } from '../ui/Button';
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
  applyLabel = 'Search',
}: SimpleSearchDialogProps) {
  return (
    <SimpleDialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      icon={<Search size={20} />}
      footer={
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            type="button"
            onClick={onReset}
            className="gap-2 font-bold text-muted-foreground hover:text-foreground"
          >
            <RotateCcw size={15} />
            {resetLabel}
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={onClose}
              className="rounded-xl px-6 font-bold"
            >
              {cancelLabel}
            </Button>
            <Button
              type="button"
              onClick={onSearch}
              className="gap-2 rounded-xl px-8 font-bold shadow-lg shadow-primary/20"
            >
              <Search size={16} />
              {applyLabel}
            </Button>
          </div>
        </div>
      }
    >
      {children}
    </SimpleDialog>
  );
}
