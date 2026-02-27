import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle
} from '../ui/Dialog';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: ModalSize;
  className?: string;
}

const sizeClassMap: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl'
};

export const Modal = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = 'md',
  className = ''
}: ModalProps) => {
  const titleId = React.useId();
  const descriptionId = description ? React.useId() : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        ariaLabelledBy={title ? titleId : undefined}
        ariaDescribedBy={description ? descriptionId : undefined}
        className={`${sizeClassMap[size]} p-6 ${className}`}
      >
        {title ? (
          <DialogTitle id={titleId} className="text-xl">
            {title}
          </DialogTitle>
        ) : null}
        {description ? <DialogDescription id={descriptionId}>{description}</DialogDescription> : null}
        <div className="mt-4">{children}</div>
        {footer ? <DialogFooter>{footer}</DialogFooter> : null}
      </DialogContent>
    </Dialog>
  );
};
