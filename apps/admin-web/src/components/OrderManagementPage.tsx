import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  RotateCcw, 
  ChevronDown, 
  ExternalLink, 
  Eye, 
  Download, 
  ListFilter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Badge, Button } from 'b1dx/ui';

interface StatusTab {
  id: number;
  labelKey: string;
  count: number;
  color: string;
}

const STATUS_TABS: StatusTab[] = [
  { id: 1, labelKey: 'status.wait_confirm', count: 150, color: 'bg-emerald-500' },
  { id: 2, labelKey: 'status.wait_stock', count: 42, color: 'bg-emerald-500' },
  { id: 3, labelKey: 'status.wait_pickup', count: 28, color: 'bg-orange-500' },
  { id: 4, labelKey: 'status.wait_picking', count: 15, color: 'bg-blue-500' },
  { id: 5, labelKey: 'status.packing', count: 35, color: 'bg-blue-500' },
  { id: 6, labelKey: 'status.wait_shipping', count: 30, color: 'bg-blue-500' },
  { id: 7, labelKey: 'status.shipping', count: 20, color: 'bg-blue-500' },
  { id: 8, labelKey: 'status.returning', count: 5, color: 'bg-blue-500' },
];

const MOCK_DATA = [
  {
    id: 1,
    orderId: 'ORD-20231024-001',
    trackingId: 'PKG-992120',
    date: '24/10/2023 09:30',
    shop: 'Streetwear TH',
    shopInitial: 'S',
    shopColor: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    sku: 3,
    items: 5,
    channel: 'Shopee',
    channelColor: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-300',
    shipping: 'Kerry Express',
    statusKey: 'status.wait_confirm',
  },
  {
    id: 2,
    orderId: 'ORD-20231024-002',
    trackingId: 'PKG-992121',
    date: '24/10/2023 10:15',
    shop: 'Fashion Hub',
    shopInitial: 'L',
    shopColor: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    sku: 1,
    items: 1,
    channel: 'Lazada',
    channelColor: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300',
    shipping: 'Flash Express',
    statusKey: 'status.wait_confirm',
  },
  {
    id: 3,
    orderId: 'ORD-20231024-005',
    trackingId: 'PKG-992125',
    date: '24/10/2023 11:00',
    shop: 'Beauty Direct',
    shopInitial: 'T',
    shopColor: 'bg-slate-900 text-white dark:bg-slate-800',
    sku: 2,
    items: 10,
    channel: 'TikTok Shop',
    channelColor: 'bg-slate-900 text-white dark:bg-slate-800',
    shipping: 'J&T Express',
    statusKey: 'status.wait_confirm',
  }
];

export const OrderManagementPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(3);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 1);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleSearch = () => {
    const promise = new Promise((resolve) => setTimeout(resolve, 1000));
    toast.promise(promise, {
      loading: 'Searching...',
      success: 'Search completed successfully!',
      error: 'Search failed.',
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Order Progress Tabs with Improved Horizontal Scroll */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden dark:bg-slate-900 dark:border-slate-800">
        
        {/* Navigation Wrapper with Sticky/Gradient Effects */}
        <div className="relative">
          {/* Left Arrow with Theme-Aware Gradient */}
          {showLeftArrow && (
            <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center bg-gradient-to-r from-white via-white/80 to-transparent pr-12 pl-2 dark:from-slate-900 dark:via-slate-900/80 pointer-events-none">
              <button 
                onClick={(e) => { e.preventDefault(); scroll('left'); }}
                className="p-2 rounded-full bg-white border border-slate-200 shadow-lg text-slate-600 hover:text-[#1d8cf8] transition-all hover:scale-110 active:scale-95 pointer-events-auto dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:text-blue-400 dark:shadow-black/20"
                aria-label="Scroll Left"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
          )}
          
          {/* Right Arrow with Theme-Aware Gradient */}
          {showRightArrow && (
            <div className="absolute right-0 top-0 bottom-0 z-20 flex items-center bg-gradient-to-l from-white via-white/80 to-transparent pl-12 pr-2 dark:from-slate-900 dark:via-slate-900/80 pointer-events-none">
              <button 
                onClick={(e) => { e.preventDefault(); scroll('right'); }}
                className="p-2 rounded-full bg-white border border-slate-200 shadow-lg text-slate-600 hover:text-[#1d8cf8] transition-all hover:scale-110 active:scale-95 pointer-events-auto dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:text-blue-400 dark:shadow-black/20"
                aria-label="Scroll Right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          <div 
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex overflow-x-auto no-scrollbar border-b border-slate-100 dark:border-slate-800 scroll-smooth relative z-10"
          >
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-6 py-4.5 whitespace-nowrap border-b-2 transition-all relative shrink-0 outline-none ${
                  activeTab === tab.id 
                    ? 'border-orange-500 bg-orange-50/20 dark:bg-orange-500/10' 
                    : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className={`w-5.5 h-5.5 rounded-full flex items-center justify-center text-[11px] text-white font-bold shadow-sm ${tab.color}`}>
                  {tab.id}
                </div>
                <span className={`text-[14px] font-bold tracking-tight ${activeTab === tab.id ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                  {t(tab.labelKey)} ({tab.count})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Filter Bar with Enhanced UI */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest dark:text-slate-500">
                {t('common.warehouse')}
              </label>
              <div className="relative group">
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none appearance-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                  <option>{t('common.total')}</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
              </div>
            </div>
            <div className="space-y-2.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest dark:text-slate-500">
                {t('common.channel')}
              </label>
              <div className="relative group">
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none appearance-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                  <option>{t('common.total')}</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
              </div>
            </div>
            <div className="space-y-2.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest dark:text-slate-500">
                {t('common.shipping')}
              </label>
              <div className="relative group">
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none appearance-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                  <option>{t('common.total')}</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
              </div>
            </div>
            <div className="space-y-2.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest dark:text-slate-500">
                {t('common.order_id')}
              </label>
              <input 
                type="text" 
                placeholder={t('common.order_id')}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all placeholder:text-slate-400 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button 
                onClick={handleSearch}
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-10 h-12 rounded-xl gap-2.5 font-bold shadow-lg shadow-blue-500/20 dark:shadow-blue-900/40 border-0 transition-all active:scale-95"
              >
                <Search size={18} />
                {t('common.search')}
              </Button>
              <Button variant="outline" className="h-12 rounded-xl px-6 bg-slate-50 text-slate-500 border-slate-200 font-bold dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                {t('common.clear')}
              </Button>
              <button className="text-[#1d8cf8] font-bold text-[13px] ml-2 hover:underline dark:text-blue-400 transition-all">
                {t('common.advanced_search')}
              </button>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <Button variant="outline" className="h-12 rounded-xl px-5 bg-white border-slate-200 text-slate-700 font-bold gap-2 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <ListFilter size={18} />
                {t('common.sort')}
                <ChevronDown size={14} className="ml-0.5 opacity-60" />
              </Button>
              <Button variant="outline" className="h-12 rounded-xl px-5 bg-emerald-50 text-emerald-600 border-emerald-100 font-bold gap-2 hover:bg-emerald-100 dark:bg-emerald-900/10 dark:text-emerald-400 dark:border-emerald-900/30 transition-colors">
                <Download size={18} />
                {t('common.export_excel')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Order List Table with Improved Spacing */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden dark:bg-slate-900 dark:border-slate-800">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f8faff] border-b border-slate-100 dark:bg-slate-800/40 dark:border-slate-800">
              <tr>
                <th className="px-6 py-5 w-14 text-center">
                  <input type="checkbox" className="rounded-md border-slate-300 text-blue-600 dark:bg-slate-800 dark:border-slate-700 focus:ring-blue-500/20" />
                </th>
                <th className="px-4 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">ลำดับ</th>
                <th className="px-4 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">{t('common.order_id')}</th>
                <th className="px-4 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">รหัสพัสดุ</th>
                <th className="px-4 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">วันที่สร้าง</th>
                <th className="px-4 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">ร้านค้า</th>
                <th className="px-4 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">จำนวน SKU</th>
                <th className="px-4 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">จำนวนชิ้น</th>
                <th className="px-4 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">ช่องทาง</th>
                <th className="px-4 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">{t('common.shipping')}</th>
                <th className="px-4 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">{t('common.status')}</th>
                <th className="px-4 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right whitespace-nowrap">{t('common.manage')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {MOCK_DATA.map((row, idx) => (
                <tr key={row.orderId} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4.5 text-center">
                    <input type="checkbox" className="rounded-md border-slate-300 text-blue-600 dark:bg-slate-800 dark:border-slate-700 focus:ring-blue-500/20" />
                  </td>
                  <td className="px-4 py-4.5 text-sm text-slate-500 dark:text-slate-500 font-medium">{idx + 1}</td>
                  <td className="px-4 py-4.5 text-sm font-bold text-[#1d8cf8] hover:underline cursor-pointer dark:text-blue-400 decoration-blue-500/30 underline-offset-4">{row.orderId}</td>
                  <td className="px-4 py-4.5 text-sm text-slate-500 font-medium dark:text-slate-400 tracking-tight">{row.trackingId}</td>
                  <td className="px-4 py-4.5 text-sm text-slate-500 dark:text-slate-500 font-medium">{row.date}</td>
                  <td className="px-4 py-4.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0 shadow-sm ${row.shopColor}`}>
                        {row.shopInitial}
                      </div>
                      <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300 truncate max-w-[140px] tracking-tight">{row.shop}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4.5 text-sm text-slate-700 text-center font-bold dark:text-slate-300">{row.sku}</td>
                  <td className="px-4 py-4.5 text-sm text-slate-700 text-center font-bold dark:text-slate-300">{row.items}</td>
                  <td className="px-4 py-4.5">
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-black whitespace-nowrap tracking-wider uppercase ${row.channelColor} shadow-sm`}>
                      {row.channel}
                    </span>
                  </td>
                  <td className="px-4 py-4.5 text-sm text-slate-600 font-semibold dark:text-slate-400 whitespace-nowrap tracking-tight">{row.shipping}</td>
                  <td className="px-4 py-4.5">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-full w-fit dark:bg-amber-950/30 whitespace-nowrap shadow-sm border border-amber-100/50 dark:border-amber-900/30">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                      <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 tracking-tight uppercase">{t(row.statusKey)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4.5 text-right">
                    <button className="p-2.5 hover:bg-blue-50 text-slate-400 hover:text-[#1d8cf8] rounded-xl transition-all dark:hover:bg-slate-800 dark:text-slate-600 dark:hover:text-blue-400 group-hover:scale-110 active:scale-90">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Improved Pagination Section */}
        <div className="px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-50 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-800/10">
          <p className="text-[13px] text-slate-400 font-bold dark:text-slate-500 uppercase tracking-widest">
            แสดง 1 ถึง 10 จากทั้งหมด 42 รายการ
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2.5 border border-slate-200 rounded-xl text-slate-400 hover:bg-white dark:border-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 shadow-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-30" disabled>
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-1">
              <button className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-xl text-sm font-black shadow-lg shadow-blue-500/20 transform transition-all active:scale-90">1</button>
              <button className="w-10 h-10 flex items-center justify-center border border-slate-200 text-slate-600 hover:bg-white rounded-xl text-sm font-bold dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 shadow-sm transition-all hover:scale-105 active:scale-90">2</button>
              <button className="w-10 h-10 flex items-center justify-center border border-slate-200 text-slate-600 hover:bg-white rounded-xl text-sm font-bold dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 shadow-sm transition-all hover:scale-105 active:scale-90">3</button>
              <span className="px-2 text-slate-300 dark:text-slate-700 font-black">...</span>
              <button className="w-10 h-10 flex items-center justify-center border border-slate-200 text-slate-600 hover:bg-white rounded-xl text-sm font-bold dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 shadow-sm transition-all hover:scale-105 active:scale-90">5</button>
            </div>
            <button className="p-2.5 border border-slate-200 rounded-xl text-slate-400 hover:bg-white dark:border-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 shadow-sm transition-all hover:scale-105 active:scale-95">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Improved Footer Info */}
      <div className="flex items-center justify-between py-4 border-t border-slate-100 dark:border-slate-800/50">
        <div className="flex items-center gap-6 text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
            System Online
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" />
            Last sync: 1 min ago
          </div>
        </div>
        <p className="text-[11px] font-black text-slate-300 dark:text-slate-700 tracking-tighter">WMS Pro Version 2.4.0-build.821</p>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .py-4\.5 {
          padding-top: 1.125rem;
          padding-bottom: 1.125rem;
        }
      `}</style>
    </div>
  );
};
