
import React from 'react';
import { Mail, Check } from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '../constants';
import { Button } from './ui/Button';

export const NotificationsDropdown: React.FC = () => {
  return (
    <div className="w-[380px] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100 bg-slate-50/30">
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-slate-800">Notifications</h3>
          <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-md uppercase tracking-wider">
            2 New
          </span>
        </div>
        <button className="text-slate-400 hover:text-indigo-600 transition-colors p-1 rounded-md hover:bg-white">
          <Check size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="max-h-[420px] overflow-y-auto">
        {MOCK_NOTIFICATIONS.map((item) => (
          <div 
            key={item.id} 
            className="px-5 py-4 flex gap-3 hover:bg-slate-50 transition-colors cursor-pointer group border-b border-slate-50 last:border-0"
          >
            {/* Avatar / Icon */}
            <div className="flex-shrink-0">
              {item.type === 'image' && (
                <img src={item.avatar} alt={item.title} className="w-10 h-10 rounded-full object-cover shadow-sm" />
              )}
              {item.type === 'initials' && (
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-sm ${item.initialsBg}`}>
                  {item.initials}
                </div>
              )}
              {item.type === 'icon' && (
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${item.iconBg} ${item.iconColor}`}>
                  {item.icon}
                </div>
              )}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-bold text-slate-800 truncate">
                  {item.title}
                </p>
                {item.unread && (
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mt-1.5 flex-shrink-0 animate-pulse"></span>
                )}
              </div>
              <p className="text-sm text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                {item.description}
              </p>
              <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest">
                {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 bg-slate-50/50 border-t border-slate-100">
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-widest py-5">
          View All Activity
        </Button>
      </div>
    </div>
  );
};
