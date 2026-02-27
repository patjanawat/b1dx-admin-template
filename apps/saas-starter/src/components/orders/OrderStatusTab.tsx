'use client';

interface OrderStatusTabProps {
  label: string;
  count: number;
  /** Tailwind background color class for the indicator dot, e.g. 'bg-emerald-500' */
  dotColor: string;
  isActive: boolean;
  onClick: () => void;
}

export const OrderStatusTab = ({
  label,
  count,
  dotColor,
  isActive,
  onClick,
}: OrderStatusTabProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'group flex min-w-[160px] cursor-pointer flex-col gap-2 rounded-xl border p-4 text-left transition-all',
        isActive
          ? 'border-primary bg-primary/5 shadow-sm shadow-primary/10'
          : 'border-border bg-card hover:border-primary/40 hover:bg-accent/30',
      ].join(' ')}
    >
      {/* Top row: dot + count */}
      <div className="flex items-center justify-between">
        <span
          className={[
            'h-2.5 w-2.5 rounded-full',
            dotColor,
            isActive ? 'ring-2 ring-offset-1 ring-offset-card' : '',
            dotColor.includes('emerald') ? 'ring-emerald-500/50' : '',
            dotColor.includes('orange') ? 'ring-orange-500/50' : '',
            dotColor.includes('blue') ? 'ring-blue-500/50' : '',
          ].join(' ')}
        />
        <span
          className={[
            'text-xl font-black tabular-nums leading-none',
            isActive ? 'text-primary' : 'text-foreground',
          ].join(' ')}
        >
          {count.toLocaleString()}
        </span>
      </div>

      {/* Label */}
      <p
        className={[
          'text-[11px] font-bold uppercase tracking-widest leading-tight',
          isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground/70',
        ].join(' ')}
      >
        {label}
      </p>
    </button>
  );
};
