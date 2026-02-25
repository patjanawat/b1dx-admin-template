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
    <div className="w-[360px] bg-popover rounded-xl shadow-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-border bg-muted/30">
        <h3 className="font-bold text-foreground">Shortcuts</h3>
        <button className="p-1.5 hover:bg-card rounded-lg transition-colors text-muted-foreground hover:text-primary border border-transparent hover:border-border">
          <Plus size={18} />
        </button>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-2">
        {SHORTCUTS.map((item, index) => (
          <div 
            key={item.title}
            className={`
              p-6 flex flex-col items-center text-center cursor-pointer transition-all hover:bg-accent/50 group
              ${index % 2 === 0 ? 'border-r border-border/50' : ''}
              ${index < SHORTCUTS.length - 2 ? 'border-b border-border/50' : ''}
            `}
          >
            {/* Icon Wrapper */}
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground mb-3 group-hover:bg-card group-hover:shadow-md group-hover:text-primary group-hover:-translate-y-1 transition-all duration-300">
              <item.icon size={22} />
            </div>
            
            <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
              {item.title}
            </p>
            <p className="text-[11px] text-muted-foreground font-medium mt-1 uppercase tracking-tighter">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};