import React from 'react';
import { AppButton } from '../app/AppButton';
import { Input } from '../ui/Input';
import { Modal } from './Modal';

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  typeToConfirm?: string;
  onConfirm: () => void | Promise<void>;
}

export const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  typeToConfirm,
  onConfirm
}: ConfirmDialogProps) => {
  const [loading, setLoading] = React.useState(false);
  const [typedValue, setTypedValue] = React.useState('');

  React.useEffect(() => {
    if (!open) setTypedValue('');
  }, [open]);

  const requiresType = Boolean(typeToConfirm);
  const confirmDisabled =
    loading || (requiresType && typedValue.trim() !== String(typeToConfirm));

  const handleConfirm = async () => {
    if (confirmDisabled) return;
    try {
      setLoading(true);
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  const footer = (
    <>
      <AppButton
        variant="outline"
        onClick={() => onOpenChange?.(false)}
        disabled={loading}
      >
        {cancelText}
      </AppButton>
      <AppButton variant="destructive" onClick={handleConfirm} loading={loading}>
        {confirmText}
      </AppButton>
    </>
  );

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      footer={footer}
      size="sm"
    >
      {requiresType ? (
        <div className="space-y-2">
          <p className="text-sm text-slate-600">
            Type <span className="font-semibold">{typeToConfirm}</span> to confirm.
          </p>
          <Input
            value={typedValue}
            onChange={(event) => setTypedValue(event.target.value)}
            placeholder={String(typeToConfirm)}
            autoComplete="off"
          />
        </div>
      ) : null}
    </Modal>
  );
};
