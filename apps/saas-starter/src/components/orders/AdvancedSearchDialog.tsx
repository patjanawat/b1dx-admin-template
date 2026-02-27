'use client';

import { createContext, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, RotateCcw } from 'lucide-react';
import { Dialog, DialogContent, Button } from '@b1dx/ui';
import type { ReactNode } from 'react';

/* ── Context — scrollable content div as Radix collision boundary ── */
const DialogBoundaryContext = createContext<Element | null>(null);

export function useDialogBoundary() {
  return useContext(DialogBoundaryContext);
}

/* ── Props ───────────────────────────────────────────────────────── */
interface AdvancedSearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: () => void;
  onReset: () => void;
  children: ReactNode;
}

/* ── Component ───────────────────────────────────────────────────── */
export function AdvancedSearchDialog({
  isOpen,
  onClose,
  onSearch,
  onReset,
  children,
}: AdvancedSearchDialogProps) {
  const { t } = useTranslation();

  /* callback ref — triggers re-render so children receive the real element */
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
              {t('advanced_search.title')}
            </h2>
          </div>
        </div>

        {/* ── Scrollable content (boundary for Popovers inside) ────── */}
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
              {t('advanced_search.reset')}
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={onClose}
                className="rounded-xl px-6 font-bold"
              >
                {t('advanced_search.cancel')}
              </Button>
              <Button
                type="button"
                onClick={onSearch}
                className="gap-2 rounded-xl px-8 font-bold shadow-lg shadow-primary/20"
              >
                <Search size={16} />
                {t('advanced_search.apply')}
              </Button>
            </div>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}
