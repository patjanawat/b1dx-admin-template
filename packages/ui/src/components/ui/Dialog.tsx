import React from 'react';

interface DialogContextValue {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

export interface DialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog = ({ open, onOpenChange, children }: DialogProps) => (
  <DialogContext.Provider value={{ open, onOpenChange }}>{children}</DialogContext.Provider>
);

export interface DialogOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DialogOverlay = ({ className = '', ...props }: DialogOverlayProps) => (
  <div
    className={`fixed inset-0 bg-black/40 backdrop-blur-[1px] ${className}`}
    aria-hidden="true"
    {...props}
  />
);

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  onEscapeKeyDown?: () => void;
  onInteractOutside?: () => void;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
}

export const DialogContent = ({
  className = '',
  onEscapeKeyDown,
  onInteractOutside,
  ariaLabelledBy,
  ariaDescribedBy,
  ...props
}: DialogContentProps) => {
  const ctx = React.useContext(DialogContext);
  if (!ctx?.open) return null;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onEscapeKeyDown?.();
      ctx.onOpenChange?.(false);
    }
  };

  const handleOverlayClick = () => {
    onInteractOutside?.();
    ctx.onOpenChange?.(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <DialogOverlay onClick={handleOverlayClick} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        tabIndex={-1}
        className={`relative z-10 w-full max-w-lg rounded-xl bg-white p-6 text-slate-950 shadow-lg dark:bg-slate-900 dark:text-slate-50 ${className}`}
        onKeyDown={handleKeyDown}
        {...props}
      />
    </div>
  );
};

export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const DialogTitle = ({ className = '', ...props }: DialogTitleProps) => (
  <h2 className={`text-lg font-semibold ${className}`} {...props} />
);

export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const DialogDescription = ({ className = '', ...props }: DialogDescriptionProps) => (
  <p className={`text-sm text-slate-500 dark:text-slate-400 ${className}`} {...props} />
);

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DialogFooter = ({ className = '', ...props }: DialogFooterProps) => (
  <div className={`mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end ${className}`} {...props} />
);
