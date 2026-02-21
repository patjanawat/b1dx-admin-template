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
import type { AppTheme, AppThemeOption, AppTopBarProps } from './appShellTypes';

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

export const TopBar: React.FC<AppTopBarProps> = ({
  title,
  search,
  language,
  notifications,
  shortcuts,
  profile,
  showThemeToggle = true,
  themeOptions
}) => {
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  const [activeTheme, setActiveTheme] = useState<AppTheme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as AppTheme) || 'light';
    }
    return 'light';
  });

  const themeDropdownRef = useRef<HTMLDivElement>(null);
  const notiDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const shortcutsDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = window.document.documentElement;
    const applyTheme = (theme: AppTheme) => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const useDark = theme === 'dark' || (theme === 'system' && prefersDark);
      root.classList.toggle('dark', useDark);
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

  const themes: AppThemeOption[] = themeOptions ?? [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Monitor }
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
    className = ''
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
          ? 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:ring-indigo-800'
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
      } ${className}`}
    >
      {children}
    </button>
  );

  const CurrentThemeIcon = themes.find((t) => t.id === activeTheme)?.icon || Sun;
  const unreadCount = notifications?.newCount ?? notifications?.items.filter((item) => item.unread).length ?? 0;

  const searchInputProps =
    search && search.value !== undefined ? { value: search.value } : {};

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30 shadow-sm transition-colors duration-200 dark:bg-slate-900 dark:border-slate-800">
      <div className="flex items-center">
        {title && (
          <h2 className="text-xl font-bold text-slate-800 tracking-tight dark:text-slate-100">
            {title}
          </h2>
        )}
      </div>

      {search && (
        <div className="flex-1 max-w-xl px-12">
          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder={search.placeholder}
              className="w-full bg-slate-50 border-slate-200 border rounded-lg py-2 pl-10 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:focus:bg-slate-900"
              onChange={(event) => search.onChange?.(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  search.onSubmit?.(event.currentTarget.value);
                }
              }}
              {...searchInputProps}
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        {language && (
          <div className="relative" ref={langDropdownRef}>
            <IconButton
              onClick={() => {
                const current = isLangOpen;
                closeAll();
                setIsLangOpen(!current);
              }}
              isActive={isLangOpen}
            >
              <Languages size={20} />
            </IconButton>
            {isLangOpen && (
              <div className="absolute right-0 mt-2 z-50 animate-dropdown">
                <LanguageDropdown
                  items={language.items}
                  selectedId={language.selectedId}
                  onSelect={(id) => {
                    language.onSelect(id);
                    setIsLangOpen(false);
                  }}
                />
              </div>
            )}
          </div>
        )}

        {showThemeToggle && (
          <div className="relative" ref={themeDropdownRef}>
            <IconButton
              onClick={() => {
                const current = isThemeOpen;
                closeAll();
                setIsThemeOpen(!current);
              }}
              isActive={isThemeOpen}
            >
              <CurrentThemeIcon size={20} />
            </IconButton>

            {isThemeOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 z-50 animate-dropdown dark:bg-slate-800 dark:border-slate-700">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setActiveTheme(theme.id);
                      setIsThemeOpen(false);
                    }}
                    className={`w-[calc(100%-12px)] mx-1.5 flex items-center gap-3 px-3 py-2 text-sm transition-all rounded-lg ${
                      activeTheme === theme.id
                        ? 'bg-indigo-50 text-indigo-600 font-semibold dark:bg-indigo-900/40 dark:text-indigo-300'
                        : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700'
                    }`}
                  >
                    <theme.icon
                      size={18}
                      className={activeTheme === theme.id ? 'text-indigo-500 dark:text-indigo-400' : 'text-slate-400'}
                    />
                    {theme.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {shortcuts && (
          <div className="relative" ref={shortcutsDropdownRef}>
            <IconButton
              onClick={() => {
                const current = isShortcutsOpen;
                closeAll();
                setIsShortcutsOpen(!current);
              }}
              isActive={isShortcutsOpen}
            >
              <LayoutGrid size={20} />
            </IconButton>
            {isShortcutsOpen && (
              <div className="absolute right-0 mt-2 z-50 animate-dropdown">
                <ShortcutsDropdown {...shortcuts} />
              </div>
            )}
          </div>
        )}

        {notifications && (
          <div className="relative" ref={notiDropdownRef}>
            <IconButton
              onClick={() => {
                const current = isNotiOpen;
                closeAll();
                setIsNotiOpen(!current);
              }}
              isActive={isNotiOpen}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              )}
            </IconButton>
            {isNotiOpen && (
              <div className="absolute right-0 mt-2 z-50 animate-dropdown">
                <NotificationsDropdown {...notifications} />
              </div>
            )}
          </div>
        )}

        {(profile || notifications || shortcuts || language || showThemeToggle) && (
          <div className="h-8 w-px bg-slate-200 mx-2 dark:bg-slate-700"></div>
        )}

        {profile && (
          <div className="relative" ref={profileDropdownRef}>
            <div
              onClick={() => {
                const current = isProfileOpen;
                closeAll();
                setIsProfileOpen(!current);
              }}
              className={`flex items-center gap-3 cursor-pointer group p-1 pr-2 rounded-xl transition-all duration-200 active:scale-95 ${
                isProfileOpen
                  ? 'bg-slate-100 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="relative">
                {profile.user.avatarUrl ? (
                  <img
                    src={profile.user.avatarUrl}
                    alt={profile.user.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-transparent group-hover:ring-indigo-200 transition-all shadow-sm dark:group-hover:ring-indigo-800"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold shadow-sm dark:bg-slate-800 dark:text-slate-200">
                    {getInitials(profile.user.name)}
                  </div>
                )}
                <span
                  className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-white rounded-full dark:border-slate-800 ${
                    profile.user.statusClassName ?? 'bg-emerald-500'
                  }`}
                ></span>
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-bold text-slate-800 leading-none dark:text-slate-200">
                  {profile.user.name}
                </p>
                {profile.user.subtitle && (
                  <p className="text-[11px] text-slate-500 font-medium mt-1 uppercase tracking-tighter dark:text-slate-400">
                    {profile.user.subtitle}
                  </p>
                )}
              </div>
            </div>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 z-50 animate-dropdown">
                <ProfileDropdown {...profile} />
              </div>
            )}
          </div>
        )}
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
