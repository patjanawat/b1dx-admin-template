'use client';

interface OrderStatusTabProps {
  label: string;
  count: number;
  /** Dot color class — e.g. 'bg-emerald-500' */
  dotColor: string;
  /** Icon container background — e.g. 'bg-emerald-500/10' */
  iconBg: string;
  isActive: boolean;
  onClick: () => void;
}

export const OrderStatusTab = ({
  label,
  count,
  dotColor,
  iconBg,
  isActive,
  onClick,
}: OrderStatusTabProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex min-w-50 cursor-pointer items-center gap-4 rounded-2xl border p-5 text-left transition-all',
        'shadow-sm hover:shadow-md',
        isActive
          ? 'border-primary bg-primary/5 shadow-primary/10'
          : 'border-border bg-card hover:border-primary/30',
      ].join(' ')}
    >
      {/* Icon box */}
      <div
        className={[
          'flex h-14 w-14 shrink-0 items-center justify-center rounded-xl',
          iconBg,
        ].join(' ')}
      >
        <span
          className={[
            'h-4 w-4 rounded-full',
            dotColor,
            isActive ? 'animate-pulse' : '',
          ].join(' ')}
        />
      </div>

      {/* Label + count */}
      <div>
        <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p
          className={[
            'text-2xl font-black tabular-nums leading-none',
            isActive ? 'text-primary' : 'text-foreground',
          ].join(' ')}
        >
          {count.toLocaleString()}
        </p>
      </div>
    </button>
  );
};
