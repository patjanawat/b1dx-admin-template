'use client';

import { useState } from 'react';
import { ArrowUpDown, SortAsc, SortDesc, Check } from 'lucide-react';
import { Dialog, DialogContent } from '../app/Dialog';
import { Button } from '../ui/Button';

/* ── Types ───────────────────────────────────────────────────────── */

export interface SortOption {
  label: string;
  value: string;
}

export interface SortState {
  key: string;
  direction: 'asc' | 'desc';
}

/* ── Props ───────────────────────────────────────────────────────── */

export interface SimpleSortDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSort: (sort: SortState) => void;
  currentSort: SortState;
  options: SortOption[];
  /** Dialog title. Default: "Sort" */
  title?: string;
  /** Section label above field list. Default: "Sort By Field" */
  fieldLabel?: string;
  /** Section label above direction buttons. Default: "Direction" */
  directionLabel?: string;
  /** Ascending button label. Default: "Ascending" */
  ascLabel?: string;
  /** Descending button label. Default: "Descending" */
  descLabel?: string;
  /** Cancel button label. Default: "Cancel" */
  cancelLabel?: string;
  /** Apply button label. Default: "Apply Sort" */
  applyLabel?: string;
}

/* ── Component ───────────────────────────────────────────────────── */

export function SimpleSortDialog({
  isOpen,
  onClose,
  onSort,
  currentSort,
  options,
  title = 'Sort',
  fieldLabel = 'Sort By Field',
  directionLabel = 'Direction',
  ascLabel = 'Ascending',
  descLabel = 'Descending',
  cancelLabel = 'Cancel',
  applyLabel = 'Apply Sort',
}: SimpleSortDialogProps) {
  const [sortKey, setSortKey] = useState(currentSort.key);
  const [direction, setDirection] = useState<'asc' | 'desc'>(currentSort.direction);

  const handleApply = () => {
    onSort({ key: sortKey, direction });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex flex-col overflow-hidden p-0 sm:max-w-[450px]">

        {/* ── Fixed header ─────────────────────────────────────────── */}
        <div className="shrink-0 border-b border-border bg-muted/30 px-8 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ArrowUpDown size={20} />
            </div>
            <h2 className="text-xl font-black tracking-tight">{title}</h2>
          </div>
        </div>

        {/* ── Content ──────────────────────────────────────────────── */}
        <div className="px-8 py-6 space-y-8">

          {/* Field picker */}
          <div className="space-y-3">
            <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">
              {fieldLabel}
            </p>
            <div className="grid grid-cols-1 gap-2">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSortKey(option.value)}
                  className={[
                    'flex items-center justify-between px-5 py-3.5 rounded-xl border transition-all text-left',
                    sortKey === option.value
                      ? 'bg-primary/5 border-primary text-primary shadow-sm'
                      : 'bg-muted/30 border-border text-muted-foreground hover:bg-muted/50',
                  ].join(' ')}
                >
                  <span className="text-sm font-bold">{option.label}</span>
                  {sortKey === option.value && <Check size={16} className="text-primary shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Direction picker */}
          <div className="space-y-3">
            <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">
              {directionLabel}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDirection('asc')}
                className={[
                  'flex flex-col items-center justify-center gap-2.5 py-5 rounded-2xl border transition-all',
                  direction === 'asc'
                    ? 'bg-primary/5 border-primary text-primary shadow-sm'
                    : 'bg-muted/30 border-border text-muted-foreground hover:bg-muted/50',
                ].join(' ')}
              >
                <SortAsc size={22} />
                <span className="text-xs font-black uppercase tracking-widest">{ascLabel}</span>
              </button>
              <button
                type="button"
                onClick={() => setDirection('desc')}
                className={[
                  'flex flex-col items-center justify-center gap-2.5 py-5 rounded-2xl border transition-all',
                  direction === 'desc'
                    ? 'bg-primary/5 border-primary text-primary shadow-sm'
                    : 'bg-muted/30 border-border text-muted-foreground hover:bg-muted/50',
                ].join(' ')}
              >
                <SortDesc size={22} />
                <span className="text-xs font-black uppercase tracking-widest">{descLabel}</span>
              </button>
            </div>
          </div>

        </div>

        {/* ── Fixed footer ─────────────────────────────────────────── */}
        <div className="shrink-0 border-t border-border bg-muted/30 px-8 py-5">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              type="button"
              onClick={onClose}
              className="flex-1 h-11 rounded-xl font-bold"
            >
              {cancelLabel}
            </Button>
            <Button
              type="button"
              onClick={handleApply}
              className="flex-1 h-11 rounded-xl font-bold gap-2 shadow-lg shadow-primary/20"
            >
              <ArrowUpDown size={16} />
              {applyLabel}
            </Button>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}
