'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { OrderStatusTab, type OrderStatusTabColor } from '../ui/OrderStatusTab';

/* ── Types ────────────────────────────────────────────────────────── */

export interface StatusCarouselTab {
  id: number | string;
  label: string;
  count: number;
  color: OrderStatusTabColor;
}

export interface AppStatusCarouselProps {
  tabs: StatusCarouselTab[];
  activeTab: number;
  onTabChange: (index: number) => void;
  /** Section label rendered above the carousel */
  label?: string;
}

/* ── Carousel scroll hook ─────────────────────────────────────────── */

function useCarousel(ref: React.RefObject<HTMLDivElement | null>) {
  const [canLeft,  setCanLeft]  = React.useState(false);
  const [canRight, setCanRight] = React.useState(false);

  const check = React.useCallback(() => {
    if (!ref.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;
    setCanLeft(scrollLeft > 1);
    setCanRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, [ref]);

  const scroll = (dir: 'left' | 'right') =>
    ref.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });

  React.useEffect(() => {
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [check]);

  return { canLeft, canRight, check, scroll };
}

/* ── Component ────────────────────────────────────────────────────── */

export const AppStatusCarousel = ({
  tabs,
  activeTab,
  onTabChange,
  label,
}: AppStatusCarouselProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { canLeft, canRight, check, scroll } = useCarousel(ref);

  return (
    <div>
      {label && (
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
      )}

      <div className="relative">
        {canLeft && (
          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background p-2.5 shadow-xl text-muted-foreground hover:text-primary transition-all"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {canRight && (
          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background p-2.5 shadow-xl text-muted-foreground hover:text-primary transition-all"
          >
            <ChevronRight size={20} />
          </button>
        )}

        <div
          ref={ref}
          onScroll={check}
          className="flex gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
          style={{
            maskImage: `linear-gradient(to right, ${canLeft ? 'transparent 0, black 72px' : 'black 0'}, ${canRight ? 'black calc(100% - 72px), transparent 100%' : 'black 100%'})`,
            WebkitMaskImage: `linear-gradient(to right, ${canLeft ? 'transparent 0, black 72px' : 'black 0'}, ${canRight ? 'black calc(100% - 72px), transparent 100%' : 'black 100%'})`,
          }}
        >
          {tabs.map((tab, i) => (
            <OrderStatusTab
              key={tab.id}
              label={tab.label}
              count={tab.count}
              color={tab.color}
              isActive={activeTab === i}
              onClick={() => onTabChange(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
