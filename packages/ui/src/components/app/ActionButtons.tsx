import type React from 'react';
import { RotateCcw, Search, ArrowUpDown, Download, Filter } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type BadgeButtonProps = ButtonProps & { count?: number };

export function ResetButton({ children = 'Reset', className, ...props }: ButtonProps) {
  return (
    <Button
      variant="ghost"
      type="button"
      className={cn('h-10 w-[150px] gap-2 font-bold text-muted-foreground hover:text-foreground', className)}
      {...props}
    >
      <RotateCcw size={15} />
      {children}
    </Button>
  );
}

export function CancelButton({ children = 'Cancel', className, ...props }: ButtonProps) {
  return (
    <Button
      variant="outline"
      type="button"
      className={cn('h-10 w-[150px] rounded-xl font-bold', className)}
      {...props}
    >
      {children}
    </Button>
  );
}

export function ApplySearchButton({ children = 'Apply Search', className, ...props }: ButtonProps) {
  return (
    <Button
      type="button"
      className={cn('h-10 w-[150px] gap-2 rounded-xl font-bold shadow-lg shadow-primary/20', className)}
      {...props}
    >
      <Search size={16} />
      {children}
    </Button>
  );
}

export function ApplySortButton({ children = 'Apply Sort', className, ...props }: ButtonProps) {
  return (
    <Button
      variant="secondary"
      type="button"
      className={cn('h-10 w-[150px] gap-2 rounded-xl font-bold', className)}
      {...props}
    >
      <ArrowUpDown size={16} />
      {children}
    </Button>
  );
}

export function ExportExcelButton({ children = 'Export Excel', className, ...props }: ButtonProps) {
  return (
    <Button
      variant="success"
      type="button"
      className={cn('h-10 w-[150px] gap-2 rounded-xl font-bold', className)}
      {...props}
    >
      <Download size={18} />
      {children}
    </Button>
  );
}

export function AdvanceButton({ children = 'Advanced', count, className, ...props }: BadgeButtonProps) {
  return (
    <Button
      variant="destructive"
      type="button"
      className={cn('relative h-10 w-[150px] gap-2 rounded-xl font-bold', className)}
      {...props}
    >
      <Filter size={16} />
      {children}
      {count != null && count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-black text-primary-foreground">
          {count}
        </span>
      )}
    </Button>
  );
}

export function SortButton({ children = 'Sort', count, className, ...props }: BadgeButtonProps) {
  return (
    <Button
      variant="outline"
      type="button"
      className={cn('relative h-10 w-[150px] gap-2 rounded-xl font-bold', className)}
      {...props}
    >
      <ArrowUpDown size={16} />
      {children}
      {count != null && count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-black text-primary-foreground">
          {count}
        </span>
      )}
    </Button>
  );
}
