'use client';

import React, { useRef, useState } from 'react';
import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { ArrowUp, ArrowDown, Plus, X, GripVertical } from 'lucide-react';
import type { SortOption, MultiSortState } from '@b1dx/ui';
import type { OrderPageFilters } from '../types';

/* ── Props ───────────────────────────────────────────────────────── */

export interface OrderSortFieldsProps {
  control: Control<OrderPageFilters>;
  options: SortOption[];
  /** Max number of fields that can be selected. Default: 10 */
  maxFields?: number;
  /** Section label for active sort fields. Default: "Sort By Field" */
  fieldLabel?: string;
  /** Section label for available fields. Default: "Add Field" */
  addLabel?: string;
}

/* ── Component ───────────────────────────────────────────────────── */

export function OrderSortFields({
  control,
  options,
  maxFields = 10,
  fieldLabel = 'Sort By Field',
  addLabel = 'Add Field',
}: OrderSortFieldsProps) {
  const { field } = useController({ name: 'sortFields', control });
  const fields = field.value as MultiSortState;
  const setFields = (updater: MultiSortState | ((prev: MultiSortState) => MultiSortState)) => {
    if (typeof updater === 'function') {
      field.onChange(updater(fields));
    } else {
      field.onChange(updater);
    }
  };

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

  /* ── Render ──────────────────────────────────────────────────── */

  return (
    <div className="space-y-6">

      {/* ── Active sort fields (draggable) ──────────────────────── */}
      {fields.length > 0 && (
        <div className="space-y-2">
          <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">
            {fieldLabel}
          </p>
          <div className="grid grid-cols-1 gap-2">
            {fields.map((f, idx) => {
              const label = options.find((o) => o.value === f.key)?.label ?? f.key;
              const isDragOver = dragOverKey === f.key;

              return (
                <div
                  key={f.key}
                  draggable
                  onDragStart={() => handleDragStart(f.key)}
                  onDragOver={(e) => handleDragOver(e, f.key)}
                  onDrop={() => handleDrop(f.key)}
                  onDragEnd={handleDragEnd}
                  className={[
                    'flex items-center gap-3 rounded-xl border px-3 py-3 transition-all select-none',
                    isDragOver
                      ? 'border-primary bg-primary/10 scale-[1.01]'
                      : 'border-primary bg-primary/5',
                  ].join(' ')}
                >
                  <span className="shrink-0 cursor-grab text-muted-foreground active:cursor-grabbing">
                    <GripVertical size={16} />
                  </span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-black text-primary-foreground">
                    {idx + 1}
                  </span>
                  <span className="flex-1 text-sm font-bold text-primary truncate">
                    {label}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleDirection(f.key)}
                    className={[
                      'flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-black transition-colors shrink-0',
                      f.direction === 'asc'
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20'
                        : 'border-amber-500/30 bg-amber-500/10 text-amber-700 hover:bg-amber-500/20',
                    ].join(' ')}
                  >
                    {f.direction === 'asc' ? (
                      <><ArrowUp size={12} />ASC</>
                    ) : (
                      <><ArrowDown size={12} />DESC</>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeField(f.key)}
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
  );
}
