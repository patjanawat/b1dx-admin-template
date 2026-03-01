'use client';

import { useRef, useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Plus, X, GripVertical } from 'lucide-react';
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
  /** Max number of fields that can be selected. Default: 10 */
  maxFields?: number;
  /** Dialog title. Default: "Sort" */
  title?: string;
  /** Section label for active sort fields. Default: "Sort By Field" */
  fieldLabel?: string;
  /** Section label for available fields. Default: "Add Field" */
  addLabel?: string;
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
  maxFields = 10,
  title = 'Sort',
  fieldLabel = 'Sort By Field',
  addLabel = 'Add Field',
  cancelLabel = 'Cancel',
  applyLabel = 'Apply Sort',
}: SimpleSortDialogProps) {
  const [fields, setFields] = useState<MultiSortState>(currentSort);
  const [dragOverKey, setDragOverKey] = useState<string | null>(null);
  const dragKeyRef = useRef<string | null>(null);

  const atMax = fields.length >= maxFields;

  /* ── Field actions ───────────────────────────────────────────── */

  const addField = (value: string) => {
    if (atMax) return;
    setFields((prev) => [...prev, { key: value, direction: 'asc' }]);
  };

  const removeField = (value: string) => {
    setFields((prev) => prev.filter((f) => f.key !== value));
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

  /* ── Drag handlers ───────────────────────────────────────────── */

  const handleDragStart = (key: string) => {
    dragKeyRef.current = key;
  };

  const handleDragOver = (e: React.DragEvent, key: string) => {
    e.preventDefault();
    if (dragKeyRef.current !== key) setDragOverKey(key);
  };

  const handleDrop = (targetKey: string) => {
    const sourceKey = dragKeyRef.current;
    if (!sourceKey || sourceKey === targetKey) return;
    setFields((prev) => {
      const result = [...prev];
      const from = result.findIndex((f) => f.key === sourceKey);
      const to = result.findIndex((f) => f.key === targetKey);
      const [moved] = result.splice(from, 1);
      result.splice(to, 0, moved);
      return result;
    });
    dragKeyRef.current = null;
    setDragOverKey(null);
  };

  const handleDragEnd = () => {
    dragKeyRef.current = null;
    setDragOverKey(null);
  };

  /* ── Derived ─────────────────────────────────────────────────── */

  const selectedKeys = new Set(fields.map((f) => f.key));
  const available = options.filter((o) => !selectedKeys.has(o.value));

  const handleApply = () => {
    onSort(fields);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden p-0 sm:max-w-[450px]">

        {/* ── Fixed header ─────────────────────────────────────────── */}
        <div className="shrink-0 border-b border-border bg-muted/30 px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ArrowUpDown size={20} />
              </div>
              <h2 className="text-xl font-black tracking-tight">{title}</h2>
            </div>
            <span className="text-xs font-black text-muted-foreground tabular-nums">
              {fields.length} / {maxFields}
            </span>
          </div>
        </div>

        {/* ── Scrollable content ────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">

          {/* ── Active sort fields (draggable) ──────────────────────── */}
          {fields.length > 0 && (
            <div className="space-y-2">
              <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                {fieldLabel}
              </p>
              <div className="grid grid-cols-1 gap-2">
                {fields.map((field, idx) => {
                  const label = options.find((o) => o.value === field.key)?.label ?? field.key;
                  const isDragOver = dragOverKey === field.key;

                  return (
                    <div
                      key={field.key}
                      draggable
                      onDragStart={() => handleDragStart(field.key)}
                      onDragOver={(e) => handleDragOver(e, field.key)}
                      onDrop={() => handleDrop(field.key)}
                      onDragEnd={handleDragEnd}
                      className={[
                        'flex items-center gap-3 rounded-xl border px-3 py-3 transition-all select-none',
                        isDragOver
                          ? 'border-primary bg-primary/10 scale-[1.01]'
                          : 'border-primary bg-primary/5',
                      ].join(' ')}
                    >
                      {/* Drag handle */}
                      <span className="shrink-0 cursor-grab text-muted-foreground active:cursor-grabbing">
                        <GripVertical size={16} />
                      </span>

                      {/* Priority badge */}
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-black text-primary-foreground">
                        {idx + 1}
                      </span>

                      {/* Label */}
                      <span className="flex-1 text-sm font-bold text-primary truncate">
                        {label}
                      </span>

                      {/* Direction toggle — ASC: emerald, DESC: amber */}
                      <button
                        type="button"
                        onClick={() => toggleDirection(field.key)}
                        className={[
                          'flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-black transition-colors shrink-0',
                          field.direction === 'asc'
                            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20'
                            : 'border-amber-500/30 bg-amber-500/10 text-amber-700 hover:bg-amber-500/20',
                        ].join(' ')}
                      >
                        {field.direction === 'asc' ? (
                          <><ArrowUp size={12} />ASC</>
                        ) : (
                          <><ArrowDown size={12} />DESC</>
                        )}
                      </button>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => removeField(field.key)}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                        aria-label="Remove"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Available fields ─────────────────────────────────────── */}
          {available.length > 0 && (
            <div className="space-y-2">
              <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                {addLabel}
              </p>
              <div className="grid grid-cols-1 gap-2">
                {available.map((option) => (
                  <div
                    key={option.value}
                    className={[
                      'flex items-center gap-3 rounded-xl border px-4 py-3 transition-all',
                      atMax
                        ? 'border-border bg-muted/20 opacity-40'
                        : 'border-border bg-muted/30',
                    ].join(' ')}
                  >
                    <span className="flex-1 text-sm font-bold text-muted-foreground">
                      {option.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => addField(option.value)}
                      disabled={atMax}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors disabled:pointer-events-none"
                      aria-label="Add"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

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
