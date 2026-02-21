import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle
} from 'lucide-react';
import type { AppSidebarProps } from './appShellTypes';

export const Sidebar: React.FC<AppSidebarProps> = ({
  navGroups,
  onViewChange,
  activeView,
  brand,
  footerAction,
  defaultOpenMenus = []
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>(defaultOpenMenus);

  const toggleSubMenu = (menuId: string) => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setOpenMenus([menuId]);
      return;
    }
    setOpenMenus((prev) =>
      prev.includes(menuId) ? prev.filter((m) => m !== menuId) : [...prev, menuId]
    );
  };

  return (
    <aside
      className={`relative bg-card border-r border-border flex flex-col h-screen transition-all duration-300 ease-in-out z-40 shrink-0 ${
        isCollapsed ? 'w-20' : 'w-[260px]'
      }`}
    >
      {brand && (
        <div className="h-16 flex items-center px-5 border-b border-border/50 overflow-hidden shrink-0">
          <button
            onClick={brand.onClick}
            className="flex items-center gap-3 min-w-[220px] text-left"
            type="button"
          >
            {brand.icon && (
              <div className="bg-[#1d8cf8] text-white p-2 rounded-lg shrink-0 shadow-lg shadow-blue-100 dark:shadow-blue-900/20">
                {brand.icon}
              </div>
            )}
            <div
              className={`transition-all duration-300 ease-in-out ${
                isCollapsed ? 'opacity-0 -translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'
              }`}
            >
              <h1 className="text-lg font-bold leading-none text-slate-800 dark:text-slate-100">{brand.title}</h1>
              {brand.subtitle && (
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-1 dark:text-slate-500">
                  {brand.subtitle}
                </p>
              )}
            </div>
          </button>
        </div>
      )}

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm z-50 hidden lg:block"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <nav className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar overflow-x-hidden">
        {navGroups.map((group, groupIdx) => (
          <div key={`${group.groupLabel ?? 'group'}-${groupIdx}`} className={groupIdx !== 0 ? 'mt-6' : ''}>
            {!isCollapsed && group.groupLabel && (
              <h3 className="px-4 mb-2 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.1em]">
                {group.groupLabel}
              </h3>
            )}
            {isCollapsed && <div className="h-px bg-slate-100 dark:bg-slate-800 mx-4 mb-4" />}

            <div className="space-y-1">
              {group.items.map((item) => {
                const hasSub = item.subItems && item.subItems.length > 0;
                const menuId = item.menuId ?? item.id ?? item.label;
                const isOpen = openMenus.includes(menuId);
                const isActive = activeView === item.id || (hasSub && item.subItems?.some((s) => s.id === activeView));

                return (
                  <div key={menuId} className="relative">
                    <button
                      onClick={() => {
                        if (hasSub) {
                          toggleSubMenu(menuId);
                        } else if (item.id) {
                          onViewChange?.(item.id);
                        }
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 font-semibold dark:bg-blue-900/20 dark:text-blue-400'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      {isActive && !isCollapsed && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full" />
                      )}

                      <item.icon
                        size={22}
                        className={`shrink-0 ${
                          isActive
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-slate-400 dark:text-slate-600 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                        }`}
                      />

                      <span
                        className={`text-[14px] transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${
                          isCollapsed ? 'opacity-0 -translate-x-2' : 'opacity-100 translate-x-0'
                        }`}
                      >
                        {item.label}
                      </span>

                      {!isCollapsed && hasSub && (
                        <ChevronDown
                          size={14}
                          className={`ml-auto transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-slate-400'
                          }`}
                        />
                      )}
                    </button>

                    {!isCollapsed && hasSub && (
                      <div
                        className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                          isOpen ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="ml-4 pl-4 border-l border-slate-100 dark:border-slate-800 space-y-1 my-1">
                            {item.subItems?.map((sub) => (
                              <button
                                key={sub.id}
                                onClick={() => onViewChange?.(sub.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all group ${
                                  activeView === sub.id
                                    ? 'bg-blue-50/80 text-blue-600 font-bold dark:bg-blue-900/30 dark:text-blue-400'
                                    : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50/30 dark:text-slate-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/10'
                                }`}
                              >
                                <Circle
                                  size={6}
                                  className={`transition-all ${
                                    activeView === sub.id
                                      ? 'fill-blue-500 text-blue-500 dark:text-blue-400 dark:fill-blue-400 scale-125'
                                      : 'text-slate-300 dark:text-slate-700 group-hover:fill-blue-500 group-hover:text-blue-500'
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

      {footerAction && (
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 mt-auto overflow-hidden">
          <button
            onClick={footerAction.onClick}
            className="flex items-center gap-3 px-3 py-2.5 w-full text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 rounded-lg transition-all group"
          >
            {footerAction.icon && (
              <footerAction.icon
                size={22}
                className="text-slate-400 dark:text-slate-600 shrink-0 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors"
              />
            )}
            <span
              className={`text-sm transition-all duration-300 whitespace-nowrap overflow-hidden ${
                isCollapsed ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {footerAction.label}
            </span>
          </button>
        </div>
      )}

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
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
        }
      `}</style>
    </aside>
  );
};
