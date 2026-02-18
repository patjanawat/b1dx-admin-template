
import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Languages, 
  Sun, 
  Moon, 
  Monitor, 
  LayoutGrid 
} from 'lucide-react';
import { NotificationsDropdown } from './NotificationsDropdown';
import { ProfileDropdown } from './ProfileDropdown';
import { LanguageDropdown } from './LanguageDropdown';
import { ShortcutsDropdown } from './ShortcutsDropdown';

type Theme = 'light' | 'dark' | 'system';

interface TopBarProps {
  onViewChange?: (view: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onViewChange }) => {
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  
  const [activeTheme, setActiveTheme] = useState<Theme>('light');
  const [selectedLang, setSelectedLang] = useState('en');
  
  const themeDropdownRef = useRef<HTMLDivElement>(null);
  const notiDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const shortcutsDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(target)) {
        setIsThemeOpen(false);
      }
      if (notiDropdownRef.current && !notiDropdownRef.current.contains(target)) {
        setIsNotiOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(target)) {
        setIsProfileOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(target)) {
        setIsLangOpen(false);
      }
      if (shortcutsDropdownRef.current && !shortcutsDropdownRef.current.contains(target)) {
        setIsShortcutsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themes: { id: Theme; label: string; icon: React.ElementType }[] = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Monitor },
  ];

  const closeAll = () => {
    setIsThemeOpen(false);
    setIsNotiOpen(false);
    setIsProfileOpen(false);
    setIsLangOpen(false);
    setIsShortcutsOpen(false);
  };

  const IconButton = ({ 
    onClick, 
    isActive, 
    children, 
    className = "" 
  }: { 
    onClick: () => void; 
    isActive: boolean; 
    children: React.ReactNode;
    className?: string;
  }) => (
    <button 
      onClick={onClick}
      className={`p-2 rounded-lg transition-all duration-200 active:scale-95 ${
        isActive 
          ? 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
      } ${className}`}
    >
      {children}
    </button>
  );

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Orders Overview</h2>
      </div>

      <div className="flex-1 max-w-xl px-12">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search orders, customers, SKUs..."
            className="w-full bg-slate-50 border-slate-200 border rounded-lg py-2 pl-10 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Language Switcher */}
        <div className="relative" ref={langDropdownRef}>
          <IconButton onClick={() => { const c = isLangOpen; closeAll(); setIsLangOpen(!c); }} isActive={isLangOpen}>
            <Languages size={20} />
          </IconButton>
          {isLangOpen && (
            <div className="absolute right-0 mt-2 z-50 animate-dropdown">
              <LanguageDropdown 
                selectedId={selectedLang} 
                onSelect={(id) => {
                  setSelectedLang(id);
                  setIsLangOpen(false);
                }} 
              />
            </div>
          )}
        </div>

        {/* Theme Selector */}
        <div className="relative" ref={themeDropdownRef}>
          <IconButton onClick={() => { const c = isThemeOpen; closeAll(); setIsThemeOpen(!c); }} isActive={isThemeOpen}>
            <Sun size={20} />
          </IconButton>

          {isThemeOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 z-50 animate-dropdown">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    setActiveTheme(theme.id);
                    setIsThemeOpen(false);
                  }}
                  className={`w-[calc(100%-12px)] mx-1.5 flex items-center gap-3 px-3 py-2 text-sm transition-all rounded-lg ${
                    activeTheme === theme.id 
                      ? 'bg-indigo-50 text-indigo-600 font-semibold' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <theme.icon size={18} className={activeTheme === theme.id ? 'text-indigo-500' : 'text-slate-400'} />
                  {theme.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Shortcuts */}
        <div className="relative" ref={shortcutsDropdownRef}>
          <IconButton onClick={() => { const c = isShortcutsOpen; closeAll(); setIsShortcutsOpen(!c); }} isActive={isShortcutsOpen}>
            <LayoutGrid size={20} />
          </IconButton>
          {isShortcutsOpen && (
            <div className="absolute right-0 mt-2 z-50 animate-dropdown">
              <ShortcutsDropdown />
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notiDropdownRef}>
          <IconButton onClick={() => { const c = isNotiOpen; closeAll(); setIsNotiOpen(!c); }} isActive={isNotiOpen}>
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </IconButton>
          {isNotiOpen && (
            <div className="absolute right-0 mt-2 z-50 animate-dropdown">
              <NotificationsDropdown />
            </div>
          )}
        </div>
        
        <div className="h-8 w-px bg-slate-200 mx-2"></div>

        {/* Profile */}
        <div className="relative" ref={profileDropdownRef}>
          <div 
            onClick={() => {
              const current = isProfileOpen;
              closeAll();
              setIsProfileOpen(!current);
            }}
            className={`flex items-center gap-3 cursor-pointer group p-1 pr-2 rounded-xl transition-all duration-200 active:scale-95 ${
              isProfileOpen ? 'bg-slate-100 ring-1 ring-slate-200' : 'hover:bg-slate-50'
            }`}
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                alt="Alex Rivera"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-transparent group-hover:ring-indigo-200 transition-all shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-bold text-slate-800 leading-none">Alex Rivera</p>
              <p className="text-[11px] text-slate-500 font-medium mt-1 uppercase tracking-tighter">Warehouse Lead</p>
            </div>
          </div>
          
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 z-50 animate-dropdown">
              <ProfileDropdown 
                onProfileClick={() => {
                  onViewChange?.('profile');
                  setIsProfileOpen(false);
                }} 
              />
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes dropdown-enter {
          from { 
            opacity: 0; 
            transform: translateY(10px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        .animate-dropdown {
          animation: dropdown-enter 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: top right;
        }
      `}</style>
    </header>
  );
};
