import React from 'react';

import { cn } from '../../lib/cn';

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  viewportClassName?: string;
}

export const ScrollArea = ({
  className = '',
  viewportClassName = '',
  children,
  ...props
}: ScrollAreaProps) => {
  return (
    <div className={cn('relative overflow-hidden', className)} {...props}>
      <div className={cn('h-full w-full overflow-y-auto', viewportClassName)}>
        {children}
      </div>
    </div>
  );
};
