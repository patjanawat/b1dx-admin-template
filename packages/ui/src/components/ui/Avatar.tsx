import React from 'react';

import { cn } from '../../lib/cn';

type AvatarContextValue = {
  hasImage: boolean;
  setHasImage: (value: boolean) => void;
};

const AvatarContext = React.createContext<AvatarContextValue | null>(null);

export const Avatar = ({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const [hasImage, setHasImage] = React.useState(false);

  return (
    <AvatarContext.Provider value={{ hasImage, setHasImage }}>
      <div
        className={cn(
          'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
          className
        )}
        {...props}
      />
    </AvatarContext.Provider>
  );
};

export const AvatarImage = ({
  className = '',
  src,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const context = React.useContext(AvatarContext);

  React.useEffect(() => {
    if (!context) return;
    context.setHasImage(Boolean(src));
  }, [context, src]);

  return (
    <img
      src={src}
      className={cn('aspect-square h-full w-full object-cover', className)}
      onLoad={() => context?.setHasImage(true)}
      onError={() => context?.setHasImage(false)}
      {...props}
    />
  );
};

export const AvatarFallback = ({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  const context = React.useContext(AvatarContext);

  if (context?.hasImage) {
    return null;
  }

  return (
    <span
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground',
        className
      )}
      {...props}
    />
  );
};
