'use client';

import { createContext, useContext, useState } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { Dialog, DialogContent } from '../app/Dialog';
import { Button } from '../ui/Button';
import type { ReactNode } from 'react';

/* ── Context — scrollable content div as Radix collision boundary ── */

const DialogBoundaryContext = createContext<Element | null>(null);

export function useSimpleSearchDialogBoundary() {
  return useContext(DialogBoundaryContext);
}

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
  const [contentEl, setContentEl] = useState<HTMLDivElement | null>(null);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden p-0 sm:max-w-2xl">

        {/* ── Fixed header ─────────────────────────────────────────── */}
        <div className="shrink-0 border-b border-border bg-muted/30 px-8 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Search size={20} />
            </div>
            <h2 className="text-xl font-black tracking-tight">
              {title}
            </h2>
          </div>
        </div>

        {/* ── Scrollable content ────────────────────────────────────── */}
        <DialogBoundaryContext.Provider value={contentEl}>
          <div ref={setContentEl} className="flex-1 overflow-y-auto px-8 py-6">
            {children}
          </div>
        </DialogBoundaryContext.Provider>

        {/* ── Fixed footer ─────────────────────────────────────────── */}
        <div className="shrink-0 border-t border-border bg-muted/30 px-8 py-5">
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
        </div>

      </DialogContent>
    </Dialog>
  );
}
