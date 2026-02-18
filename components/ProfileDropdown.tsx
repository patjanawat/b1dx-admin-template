
import React from 'react';
import { User, Settings, DollarSign, HelpCircle, LogOut } from 'lucide-react';

interface ProfileDropdownProps {
  onProfileClick?: () => void;
  onLogout?: () => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ onProfileClick, onLogout }) => {
  const menuItems = [
    { label: 'My Profile', icon: User, onClick: onProfileClick },
    { label: 'Settings', icon: Settings },
    { label: 'Pricing', icon: DollarSign },
    { label: 'FAQ', icon: HelpCircle },
  ];

  return (
    <div className="w-64 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
      {/* User Header */}
      <div className="p-5 flex items-center gap-4 border-b border-slate-100 bg-slate-50/30">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
            alt="Alex Rivera"
            className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
          />
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
        </div>
        <div className="min-w-0">
          <p className="text-base font-bold text-slate-800 truncate leading-tight">Alex Rivera</p>
          <p className="text-xs text-slate-400 truncate mt-0.5">alex.rivera@oms-admin.com</p>
        </div>
      </div>

      {/* Menu Links */}
      <div className="py-2 p-1.5">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-all text-sm font-medium group"
          >
            <item.icon size={18} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <div className="p-3 pt-2 border-t border-slate-100 bg-slate-50/20">
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-rose-50 text-rose-600 text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-95"
        >
          Logout
          <LogOut size={14} />
        </button>
      </div>
    </div>
  );
};
