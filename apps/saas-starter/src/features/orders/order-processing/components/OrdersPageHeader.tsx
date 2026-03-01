import type { ReactNode } from 'react';
import { Section } from '@b1dx/ui';

interface OrdersPageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function OrdersPageHeader({ title, description, actions }: OrdersPageHeaderProps) {
  return (
    <Section
      variant="flush"
      title={title}
      description={description}
      actions={actions}
    />
  );
}
