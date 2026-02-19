
import React, { useState } from 'react';
import { 
  Rocket, 
  Package, 
  Warehouse, 
  Users, 
  BarChart3, 
  Settings,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  LayoutGrid,
  ShoppingCart
} from 'lucide-react';

interface SubMenuItem {
  label: string;
  id: string;
}

interface NavItem {
  icon: React.ElementType;
  label: string;
  id?: string;
  active?: boolean;
  subItems?: SubMenuItem[];
}

interface NavGroup {
  groupLabel: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    groupLabel: 'Main',
    items: [
      { icon: LayoutGrid, label: 'Dashboard', id: 'dashboard', active: true },
    ]
  },
  {
    groupLabel: 'Management',
    items: [
      { 
        icon: ShoppingCart, 
        label: 'ออเดอร์', 
        subItems: [
          { label: 'ออเดอร์ทั้งหมด', id: 'dashboard' },
          { label: 'พัสดุดำเนินการ', id: 'processing-orders' },
          { label: 'แพ็กสินค้า', id: 'packing' },
          { label: 'อัพเดท Tracking', id: 'tracking-update' },
          { label: 'เช็คสถานะพัสดุ', id: 'tracking-status' },
        ]
      },
      { 
        icon: Warehouse, 
        label: 'Inventory', 
        subItems: [
          { label: 'Product List', id: 'products' },
          { label: 'Stock Alerts', id: 'stock-alerts' },
        ]
      },
      { icon: Users, label: 'Customers', id: 'customers' },
    ]
  },
  {
    groupLabel: 'Analysis',
    items: [
      { 
        icon: BarChart3, 
        label: 'Reports',
        subItems: [
          { label: 'Sales Report', id: 'sales-report' },
          { label: 'Revenue Analytics', id: 'revenue' },
        ]
      },
    ]
  }
];

interface SidebarProps {
  onViewChange?: (view: string) => void;
  activeView?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ onViewChange, activeView }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>(['ออเดอร์']);

  const toggleSubMenu = (label: string) => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setOpenMenus([label]);
      return;
    }
    setOpenMenus(prev => 
      prev.includes(label) ? prev.filter(m => m !== label) : [...prev, label]
    );
  };

  return (
    <aside 
      className={`relative bg-white border-r border-slate-200 flex flex-col h-screen transition-[width] duration-300 ease-in-out z-40 shrink-0 ${
        isCollapsed ? 'w-20' : 'w-[260px]'
      }`}
    >
      <div className="h-16 flex items-center px-5 border-b border-slate-50 overflow-hidden shrink-0">
        <div className="flex items-center gap-3 min-w-[220px]">
          <div className="bg-[#1d8cf8] text-white p-2 rounded-lg shrink-0 shadow-lg shadow-blue-100">
            <Rocket size={20} />
          </div>
          <div className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'opacity-0 -translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
            <h1 className="text-lg font-bold leading-none text-slate-800">OMS Pro</h1>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-1">Enterprise Admin</p>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-white border border-slate-200 rounded-full p-1 text-slate-400 hover:text-blue-600 transition-all shadow-sm z-50 hidden lg:block"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <nav className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar overflow-x-hidden">
        {NAV_GROUPS.map((group, groupIdx) => (
          <div key={group.groupLabel} className={groupIdx !== 0 ? 'mt-6' : ''}>
            {!isCollapsed && (
              <h3 className="px-4 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">
                {group.groupLabel}
              </h3>
            )}
            {isCollapsed && <div className="h-px bg-slate-100 mx-4 mb-4" />}

            <div className="space-y-1">
              {group.items.map((item) => {
                const hasSub = item.subItems && item.subItems.length > 0;
                const isOpen = openMenus.includes(item.label);
                const isActive = activeView === item.id || (hasSub && item.subItems?.some(s => s.id === activeView));
                
                return (
                  <div key={item.label} className="relative">
                    <button
                      onClick={() => {
                        if (hasSub) {
                          toggleSubMenu(item.label);
                        } else if (item.id) {
                          onViewChange?.(item.id);
                        }
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 font-semibold' 
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      {isActive && !isCollapsed && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full" />
                      )}

                      <item.icon 
                        size={22} 
                        className={`shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} 
                      />
                      
                      <span className={`text-[14px] transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${
                        isCollapsed ? 'opacity-0 -translate-x-2' : 'opacity-100 translate-x-0'
                      }`}>
                        {item.label}
                      </span>

                      {!isCollapsed && hasSub && (
                        <ChevronDown 
                          size={14} 
                          className={`ml-auto transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} 
                        />
                      )}
                    </button>

                    {!isCollapsed && hasSub && (
                      <div className={`grid transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                          <div className="ml-4 pl-4 border-l border-slate-100 space-y-1 my-1">
                            {item.subItems?.map((sub) => (
                              <button
                                key={sub.label}
                                onClick={() => onViewChange?.(sub.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all group ${
                                  activeView === sub.id 
                                    ? 'bg-blue-50/80 text-blue-600 font-bold' 
                                    : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50/30'
                                }`}
                              >
                                <Circle 
                                  size={6} 
                                  className={`transition-all ${
                                    activeView === sub.id 
                                      ? 'fill-blue-500 text-blue-500 scale-125' 
                                      : 'text-slate-300 group-hover:fill-blue-500 group-hover:text-blue-500'
                                  }`} 
                                />
                                {sub.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100 mt-auto overflow-hidden">
        <button className="flex items-center gap-3 px-3 py-2.5 w-full text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all group">
          <Settings size={22} className="text-slate-400 shrink-0 group-hover:text-slate-600 transition-colors" />
          <span className={`text-sm transition-all duration-300 whitespace-nowrap overflow-hidden ${
            isCollapsed ? 'opacity-0' : 'opacity-100'
          }`}>
            Settings
          </span>
        </button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </aside>
  );
};
