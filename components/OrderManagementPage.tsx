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
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

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
      setShowLeftArrow(scrollLeft > 0);
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
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Order Progress Tabs with Horizontal Scroll */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative group dark:bg-slate-900 dark:border-slate-800">
        {/* Navigation Arrows */}
        {showLeftArrow && (
          <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center bg-gradient-to-r from-white via-white/90 to-transparent pr-8 pl-1 dark:from-slate-900 dark:via-slate-900/90">
            <button 
              onClick={() => scroll('left')}
              className="p-1.5 rounded-full bg-white border border-slate-200 shadow-md text-slate-600 hover:text-[#1d8cf8] transition-all active:scale-90 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:text-blue-400"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        )}
        
        {showRightArrow && (
          <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center bg-gradient-to-l from-white via-white/90 to-transparent pl-8 pr-1 dark:from-slate-900 dark:via-slate-900/90">
            <button 
              onClick={() => scroll('right')}
              className="p-1.5 rounded-full bg-white border border-slate-200 shadow-md text-slate-600 hover:text-[#1d8cf8] transition-all active:scale-90 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:text-blue-400"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        <div 
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto no-scrollbar border-b border-slate-100 dark:border-slate-800 scroll-smooth"
        >
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap border-b-2 transition-all relative ${
                activeTab === tab.id 
                  ? 'border-orange-500 bg-orange-50/10 dark:bg-orange-500/5' 
                  : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white font-bold ${tab.color}`}>
                {tab.id}
              </div>
              <span className={`text-sm font-bold ${activeTab === tab.id ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                {t(tab.labelKey)} ({tab.count})
              </span>
            </button>
          ))}
        </div>

        {/* 2. Filter Bar */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider dark:text-slate-500">
                {t('common.warehouse')} (Warehouse)
              </label>
              <div className="relative">
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none appearance-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                  <option>{t('common.total')}</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider dark:text-slate-500">
                {t('common.channel')} (Channel)
              </label>
              <div className="relative">
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none appearance-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                  <option>{t('common.total')}</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider dark:text-slate-500">
                {t('common.shipping')} (Shipping)
              </label>
              <div className="relative">
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none appearance-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                  <option>{t('common.total')}</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider dark:text-slate-500">
                {t('common.order_id')} (Order ID)
              </label>
              <input 
                type="text" 
                placeholder={t('common.order_id')}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all placeholder:text-slate-400 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button className="bg-[#1d8cf8] hover:bg-[#1a7cdb] text-white px-8 h-11 rounded-xl gap-2 font-bold shadow-lg shadow-blue-100 dark:shadow-blue-900/20">
                <Search size={18} />
                {t('common.search')}
              </Button>
              <Button variant="outline" className="h-11 rounded-xl bg-slate-50 text-slate-500 border-slate-200 font-bold dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400">
                {t('common.clear')}
              </Button>
              <button className="text-[#1d8cf8] font-bold text-sm ml-2 hover:underline dark:text-blue-400">
                {t('common.advanced_search')}
              </button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" className="h-11 rounded-xl bg-white border-slate-200 text-slate-700 font-bold gap-2 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300">
                <ListFilter size={18} />
                {t('common.sort')}
              </Button>
              <Button variant="outline" className="h-11 rounded-xl bg-emerald-50 text-emerald-600 border-emerald-100 font-bold gap-2 hover:bg-emerald-100 dark:bg-emerald-900/10 dark:text-emerald-400 dark:border-emerald-900/30">
                <Download size={18} />
                {t('common.export_excel')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Order List Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden dark:bg-slate-900 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f8faff] border-b border-slate-100 dark:bg-slate-800/30 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 w-12">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 dark:bg-slate-800 dark:border-slate-700" />
                </th>
                <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">ลำดับ</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{t('common.order_id')}</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">รหัสพัสดุ</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">วันที่สร้าง</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">ร้านค้า</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">จำนวน SKU</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">จำนวนชิ้น</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">ช่องทาง</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{t('common.shipping')}</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{t('common.status')}</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">{t('common.manage')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {MOCK_DATA.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 dark:bg-slate-800 dark:border-slate-700" />
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400">{row.id}</td>
                  <td className="px-4 py-4 text-sm font-bold text-[#1d8cf8] hover:underline cursor-pointer dark:text-blue-400">{row.orderId}</td>
                  <td className="px-4 py-4 text-sm text-slate-500 font-medium dark:text-slate-400">{row.trackingId}</td>
                  <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400">{row.date}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold ${row.shopColor}`}>
                        {row.shopInitial}
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{row.shop}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700 text-center font-medium dark:text-slate-300">{row.sku}</td>
                  <td className="px-4 py-4 text-sm text-slate-700 text-center font-medium dark:text-slate-300">{row.items}</td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${row.channelColor}`}>
                      {row.channel}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600 font-medium dark:text-slate-400">{row.shipping}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 rounded-full w-fit dark:bg-amber-900/20">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400">{t(row.statusKey)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button className="p-2 hover:bg-blue-50 text-slate-400 hover:text-[#1d8cf8] rounded-lg transition-colors dark:hover:bg-slate-800 dark:text-slate-500 dark:hover:text-blue-400">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-50 dark:border-slate-800">
          <p className="text-sm text-slate-400 font-medium dark:text-slate-500">แสดง 1 ถึง 10 จากทั้งหมด 42 รายการ</p>
          <div className="flex items-center gap-1.5">
            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-500 dark:hover:bg-slate-800">
              <ChevronLeft size={16} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center bg-[#1d8cf8] text-white rounded-lg text-sm font-bold shadow-md shadow-blue-500/10">1</button>
            <button className="w-9 h-9 flex items-center justify-center border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-bold dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800">2</button>
            <button className="w-9 h-9 flex items-center justify-center border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-bold dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800">3</button>
            <span className="px-1 text-slate-300 dark:text-slate-700">...</span>
            <button className="w-9 h-9 flex items-center justify-center border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-bold dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800">5</button>
            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-500 dark:hover:bg-slate-800">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400 dark:text-slate-600">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            System Online
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            Last sync: 1 min ago
          </div>
        </div>
        <p className="text-[11px] font-bold text-slate-300 dark:text-slate-700">WMS Pro Version 2.4.0-build.821</p>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};