import React from 'react';
import { Plus } from 'lucide-react';
import type { AppShortcutsDropdownProps } from './appShellTypes';

export const ShortcutsDropdown: React.FC<AppShortcutsDropdownProps> = ({
  items,
  headerLabel = 'Shortcuts',
  onAdd,
  addLabel = 'Add shortcut',
  emptyStateLabel = 'No shortcuts yet',
  emptyStateHint = 'Pin your favorite tools here.'
}) => {
  return (
    <div className="w-[360px] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden dark:bg-slate-900 dark:border-slate-800">
      <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100 bg-slate-50/30 dark:bg-slate-800/50 dark:border-slate-800">
        <h3 className="font-bold text-slate-800 dark:text-slate-100">{headerLabel}</h3>
        <button
          className="p-1.5 hover:bg-white rounded-lg transition-colors text-slate-500 hover:text-indigo-600 border border-transparent hover:border-slate-200 dark:hover:bg-slate-800 dark:hover:border-slate-700 dark:text-slate-400"
          onClick={onAdd}
          aria-label={addLabel}
          type="button"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="grid grid-cols-2">
        {items.length === 0 ? (
          <div className="col-span-2 px-6 py-10 text-center">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{emptyStateLabel}</p>
            <p className="text-xs text-slate-500 mt-2 dark:text-slate-400">{emptyStateHint}</p>
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={item.id ?? item.title}
              onClick={item.onClick}
              role={item.onClick ? 'button' : undefined}
              tabIndex={item.onClick ? 0 : undefined}
              className={`
                p-6 flex flex-col items-center text-center cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 group
                ${index % 2 === 0 ? 'border-r border-slate-50 dark:border-slate-800' : ''}
                ${index < items.length - 2 ? 'border-b border-slate-50 dark:border-slate-800' : ''}
              `}
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 mb-3 group-hover:bg-white group-hover:shadow-md group-hover:text-indigo-600 group-hover:-translate-y-1 transition-all duration-300 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-slate-700 dark:group-hover:text-indigo-400">
                <item.icon size={22} />
              </div>

              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {item.title}
              </p>
              <p className="text-[11px] text-slate-400 font-medium mt-1 uppercase tracking-tighter dark:text-slate-500">
                {item.description}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
