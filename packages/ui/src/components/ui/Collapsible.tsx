import * as React from 'react';

import { Collapsible as CollapsiblePrimitive } from 'radix-ui';

import { cn } from '../../lib/cn';

export const Collapsible = CollapsiblePrimitive.Root;
export const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

export const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    className={cn('overflow-hidden', className)}
    {...props}
  />
));
CollapsibleContent.displayName = 'CollapsibleContent';
