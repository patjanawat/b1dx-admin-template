import React from 'react';
import type { AppLanguageDropdownProps } from './appShellTypes';

export const LanguageDropdown: React.FC<AppLanguageDropdownProps> = ({ items, selectedId, onSelect }) => {
  return (
    <div className="w-44 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden py-1.5 dark:bg-slate-900 dark:border-slate-800">
      {items.map((lang) => (
        <button
          key={lang.id}
          onClick={() => onSelect(lang.id)}
          className={`w-[calc(100%-12px)] mx-1.5 flex items-center px-4 py-2.5 text-sm transition-all rounded-lg ${
            selectedId === lang.id
              ? 'bg-indigo-50 text-indigo-600 font-semibold dark:bg-indigo-900/40 dark:text-indigo-300'
              : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};
