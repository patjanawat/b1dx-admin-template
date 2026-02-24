import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Languages, 
  Sun, 
  Moon, 
  Monitor, 
  LayoutGrid 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NotificationsDropdown } from './NotificationsDropdown';
import { ProfileDropdown } from './ProfileDropdown';
import { LanguageDropdown } from './LanguageDropdown';
import { ShortcutsDropdown } from './ShortcutsDropdown';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

type Theme = 'light' | 'dark' | 'system';

interface TopBarProps {
  onViewChange?: (view: string) => void;
  onLogout?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onViewChange, onLogout }) => {
  const { t, i18n } = useTranslation();
  
  const [activeTheme, setActiveTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'light';
    }
    return 'light';
  });
  
  // Theme Logic
  useEffect(() => {
    const root = window.document.documentElement;
    const applyTheme = (theme: Theme) => {
      root.classList.remove('light', 'dark');
      
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
      localStorage.setItem('theme', theme);
    };

    applyTheme(activeTheme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (activeTheme === 'system') applyTheme('system');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [activeTheme]);

  const themes: { id: Theme; label: string; icon: React.ElementType }[] = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Monitor },
  ];

  const CurrentThemeIcon = themes.find(t => t.id === activeTheme)?.icon || Sun;

  return (
    <header className="h-16 bg-background border-b border-border flex items-center justify-between px-8 sticky top-0 z-30 shadow-sm transition-colors duration-200">
      <div className="flex items-center">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {t('common.orders')}
        </h2>
      </div>

      <div className="flex-1 max-w-xl px-12">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
          <Input
            type="text"
            placeholder={t('common.search_placeholder')}
            className="w-full pl-10"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Language Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Languages size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-0 border-none shadow-none">
            <LanguageDropdown 
              selectedId={i18n.language.split('-')[0]} 
              onSelect={(id) => {
                i18n.changeLanguage(id);
              }} 
            />
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <CurrentThemeIcon size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 p-1.5 bg-popover border border-border rounded-xl shadow-2xl">
            {themes.map((theme) => (
              <DropdownMenuItem
                key={theme.id}
                onClick={() => setActiveTheme(theme.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer ${
                  activeTheme === theme.id 
                    ? 'bg-accent text-accent-foreground font-semibold' 
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <theme.icon size={18} className={activeTheme === theme.id ? 'text-primary' : 'text-muted-foreground'} />
                {theme.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Shortcuts */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <LayoutGrid size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-0 border-none shadow-none">
            <ShortcutsDropdown />
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-0 border-none shadow-none">
            <NotificationsDropdown />
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Separator orientation="vertical" className="h-8 mx-2" />

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer group p-1 pr-2 rounded-xl transition-all duration-200 hover:bg-accent">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                  alt="Alex Rivera"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-transparent group-hover:ring-primary/20 transition-all shadow-sm"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-background rounded-full"></span>
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-bold text-foreground leading-none">Alex Rivera</p>
                <p className="text-[11px] text-muted-foreground font-medium mt-1 uppercase tracking-tighter">Warehouse Lead</p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-0 border-none shadow-none">
            <ProfileDropdown 
              onProfileClick={() => onViewChange?.('profile')} 
              onLogout={onLogout}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
