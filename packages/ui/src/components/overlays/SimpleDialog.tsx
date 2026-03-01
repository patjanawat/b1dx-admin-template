'use client';

import { createContext, useContext, useState } from 'react';
import { Dialog, DialogContent } from '../app/Dialog';
import type { ReactNode } from 'react';

/* ── Boundary context ────────────────────────────────────────────── */
/* Exposes the scrollable content div as a Radix collision boundary  */
/* so Popovers / DatePickers inside the dialog position correctly.   */

const DialogBoundaryContext = createContext<Element | null>(null);

export function useSimpleDialogBoundary() {
  return useContext(DialogBoundaryContext);
}

/* ── Props ───────────────────────────────────────────────────────── */

export interface SimpleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Dialog title */
  title?: string;
  /** Icon shown left of title in header */
  icon?: ReactNode;
  /** Extra content rendered on the right side of the header */
  headerExtra?: ReactNode;
  /** Custom footer content. When omitted, no footer is rendered */
  footer?: ReactNode;
  /** Tailwind max-width class override. Default: "sm:max-w-2xl" */
  maxWidth?: string;
}

/* ── Component ───────────────────────────────────────────────────── */

export function SimpleDialog({
  isOpen,
  onClose,
  children,
  title,
  icon,
  headerExtra,
  footer,
  maxWidth = 'sm:max-w-2xl',
}: SimpleDialogProps) {
  const [contentEl, setContentEl] = useState<HTMLDivElement | null>(null);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={`flex max-h-[90vh] flex-col overflow-hidden p-0 ${maxWidth}`}>

        {/* ── Fixed header ─────────────────────────────────────────── */}
        {(icon || title || headerExtra) && (
          <div className="shrink-0 border-b border-border bg-muted/30 px-8 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {icon && (
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {icon}
                  </div>
                )}
                {title && (
                  <h2 className="text-xl font-black tracking-tight">{title}</h2>
                )}
              </div>
              {headerExtra && <div>{headerExtra}</div>}
            </div>
          </div>
        )}

        {/* ── Scrollable content ────────────────────────────────────── */}
        <DialogBoundaryContext.Provider value={contentEl}>
          <div ref={setContentEl} className="flex-1 overflow-y-auto px-8 py-6">
            {children}
          </div>
        </DialogBoundaryContext.Provider>

        {/* ── Footer (optional) ─────────────────────────────────────── */}
        {footer && (
          <div className="shrink-0 border-t border-border bg-muted/30 px-8 py-5">
            {footer}
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}
