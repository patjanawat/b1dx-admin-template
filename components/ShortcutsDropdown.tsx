
import React from 'react';
import { 
  Plus, 
  Calendar, 
  FileText, 
  Users, 
  ShieldCheck, 
  LayoutDashboard, 
  Settings 
} from 'lucide-react';

interface ShortcutItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

const SHORTCUTS: ShortcutItem[] = [
  { title: 'Calendar', description: 'Appointments', icon: Calendar },
  { title: 'Invoice App', description: 'Manage Accounts', icon: FileText },
  { title: 'Users', description: 'Manage Users', icon: Users },
  { title: 'Role Management', description: 'Permissions', icon: ShieldCheck },
  { title: 'Dashboard', description: 'User Dashboard', icon: LayoutDashboard },
  { title: 'Settings', description: 'Account Settings', icon: Settings },
];

export const ShortcutsDropdown: React.FC = () => {
  return (
    <div className="w-[360px] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100 bg-slate-50/30">
        <h3 className="font-bold text-slate-800">Shortcuts</h3>
        <button className="p-1.5 hover:bg-white rounded-lg transition-colors text-slate-500 hover:text-indigo-600 border border-transparent hover:border-slate-200">
          <Plus size={18} />
        </button>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-2">
        {SHORTCUTS.map((item, index) => (
          <div 
            key={item.title}
            className={`
              p-6 flex flex-col items-center text-center cursor-pointer transition-all hover:bg-slate-50 group
              ${index % 2 === 0 ? 'border-r border-slate-50' : ''}
              ${index < SHORTCUTS.length - 2 ? 'border-b border-slate-50' : ''}
            `}
          >
            {/* Icon Wrapper */}
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 mb-3 group-hover:bg-white group-hover:shadow-md group-hover:text-indigo-600 group-hover:-translate-y-1 transition-all duration-300">
              <item.icon size={22} />
            </div>
            
            <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
              {item.title}
            </p>
            <p className="text-[11px] text-slate-400 font-medium mt-1 uppercase tracking-tighter">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
