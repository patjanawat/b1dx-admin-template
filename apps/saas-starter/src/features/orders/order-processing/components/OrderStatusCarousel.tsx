'use client';

import { useRef, useState, useEffect, type RefObject } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { OrderStatusTab, type OrderStatusTabColor } from '@b1dx/ui';
import { STATUS_TABS } from '../../__mocks__/mockOptions';

/* ── Carousel scroll helper ───────────────────────────────────────── */

function useCarousel(ref: RefObject<HTMLDivElement | null>) {
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const check = () => {
    if (!ref.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;
    setCanLeft(scrollLeft > 1);
    setCanRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scroll = (dir: 'left' | 'right') =>
    ref.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });

  useEffect(() => {
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return { canLeft, canRight, check, scroll };
}

/* ── Props ────────────────────────────────────────────────────────── */

interface OrderStatusCarouselProps {
  activeTab: number;
  onTabChange: (index: number) => void;
}

/* ── Component ────────────────────────────────────────────────────── */

export function OrderStatusCarousel({ activeTab, onTabChange }: OrderStatusCarouselProps) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const { canLeft, canRight, check, scroll } = useCarousel(ref);

  return (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {t('common.status')}
      </p>

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
          {(STATUS_TABS as readonly { id: number; labelKey: string; count: number; color: OrderStatusTabColor }[]).map((tab, i) => (
            <OrderStatusTab
              key={tab.id}
              label={t(tab.labelKey)}
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
}
