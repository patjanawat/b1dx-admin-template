import React from 'react';
import { AppButton } from './AppButton';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '../ui/Dialog';

export interface AppDialogConfirmProps {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const AppDialogConfirm = ({
  open,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loading = false,
  onConfirm,
  onCancel
}: AppDialogConfirmProps) => {
  const titleId = React.useId();
  const descriptionId = description ? React.useId() : undefined;

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? undefined : onCancel())}>
      <DialogContent ariaLabelledBy={titleId} ariaDescribedBy={descriptionId}>
        <div className="space-y-3">
          <DialogTitle id={titleId}>{title}</DialogTitle>
          {description ? <DialogDescription id={descriptionId}>{description}</DialogDescription> : null}
        </div>
        <DialogFooter>
          <AppButton variant="outline" onClick={onCancel} disabled={loading}>
            {cancelText}
          </AppButton>
          <AppButton onClick={onConfirm} loading={loading}>
            {confirmText}
          </AppButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
