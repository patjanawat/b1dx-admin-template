import React from 'react';
import { LogOut } from 'lucide-react';
import type { AppProfileDropdownProps } from './appShellTypes';

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

export const ProfileDropdown: React.FC<AppProfileDropdownProps> = ({
  user,
  menuItems,
  onLogout,
  logoutLabel = 'Logout'
}) => {
  return (
    <div className="w-64 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden dark:bg-slate-900 dark:border-slate-800">
      <div className="p-5 flex items-center gap-4 border-b border-slate-100 bg-slate-50/30 dark:bg-slate-800/50 dark:border-slate-800">
        <div className="relative">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md dark:ring-slate-800"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm shadow-md dark:bg-slate-800 dark:text-slate-200">
              {getInitials(user.name)}
            </div>
          )}
          <span
            className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white rounded-full dark:border-slate-900 ${
              user.statusClassName ?? 'bg-emerald-500'
            }`}
          ></span>
        </div>
        <div className="min-w-0">
          <p className="text-base font-bold text-slate-800 truncate leading-tight dark:text-slate-100">{user.name}</p>
          {user.email && (
            <p className="text-xs text-slate-400 truncate mt-0.5 dark:text-slate-500">{user.email}</p>
          )}
          {!user.email && user.subtitle && (
            <p className="text-xs text-slate-400 truncate mt-0.5 dark:text-slate-500">{user.subtitle}</p>
          )}
        </div>
      </div>

      <div className="py-2 p-1.5">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-400 rounded-lg transition-all text-sm font-medium group"
          >
            <item.icon size={18} className="text-slate-400 group-hover:text-indigo-50 group-hover:text-indigo-500 transition-colors dark:group-hover:text-indigo-400" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="p-3 pt-2 border-t border-slate-100 bg-slate-50/20 dark:bg-slate-900 dark:border-slate-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-rose-50 text-rose-600 text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-95 dark:bg-rose-900/20 dark:text-rose-400 dark:hover:bg-rose-600 dark:hover:text-white"
        >
          {logoutLabel}
          <LogOut size={14} />
        </button>
      </div>
    </div>
  );
};
