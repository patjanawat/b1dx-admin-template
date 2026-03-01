'use client';

import { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
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

export type MultiSortState = SortState[];

/* ── Props ───────────────────────────────────────────────────────── */

export interface SimpleSortDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSort: (sort: MultiSortState) => void;
  currentSort: MultiSortState;
  options: SortOption[];
  /** Dialog title. Default: "Sort" */
  title?: string;
  /** Section label above field list. Default: "Sort By Field" */
  fieldLabel?: string;
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
  cancelLabel = 'Cancel',
  applyLabel = 'Apply Sort',
}: SimpleSortDialogProps) {
  const [fields, setFields] = useState<MultiSortState>(currentSort);

  const toggleField = (value: string) => {
    setFields((prev) => {
      const exists = prev.find((f) => f.key === value);
      if (exists) return prev.filter((f) => f.key !== value);
      return [...prev, { key: value, direction: 'asc' }];
    });
  };

  const toggleDirection = (value: string) => {
    setFields((prev) =>
      prev.map((f) =>
        f.key === value
          ? { ...f, direction: f.direction === 'asc' ? 'desc' : 'asc' }
          : f
      )
    );
  };

  const handleApply = () => {
    onSort(fields);
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
        <div className="px-8 py-6 space-y-3">
          <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">
            {fieldLabel}
          </p>
          <div className="grid grid-cols-1 gap-2">
            {options.map((option) => {
              const active = fields.find((f) => f.key === option.value);
              const priority = fields.findIndex((f) => f.key === option.value);

              return (
                <div
                  key={option.value}
                  className={[
                    'flex items-center gap-3 px-4 py-3 rounded-xl border transition-all',
                    active
                      ? 'bg-primary/5 border-primary'
                      : 'bg-muted/30 border-border hover:bg-muted/50',
                  ].join(' ')}
                >
                  {/* Priority badge */}
                  <span
                    className={[
                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black',
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-transparent',
                    ].join(' ')}
                  >
                    {active ? priority + 1 : '·'}
                  </span>

                  {/* Label — click to toggle selection */}
                  <button
                    type="button"
                    className="flex-1 text-left"
                    onClick={() => toggleField(option.value)}
                  >
                    <span
                      className={[
                        'text-sm font-bold',
                        active ? 'text-primary' : 'text-muted-foreground',
                      ].join(' ')}
                    >
                      {option.label}
                    </span>
                  </button>

                  {/* Direction toggle — only shown when selected */}
                  {active && (
                    <button
                      type="button"
                      onClick={() => toggleDirection(option.value)}
                      className="flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-black text-primary hover:bg-primary/20 transition-colors"
                    >
                      {active.direction === 'asc' ? (
                        <><ArrowUp size={12} />ASC</>
                      ) : (
                        <><ArrowDown size={12} />DESC</>
                      )}
                    </button>
                  )}
                </div>
              );
            })}
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
