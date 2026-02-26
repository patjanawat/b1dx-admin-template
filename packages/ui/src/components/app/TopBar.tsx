'use client';

import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from './Avatar';
import { Badge } from './Badge';
import { Button } from './Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './DropdownMenu';
import { Input } from './Input';

export interface TopBarProps {
  title?: string;
  actions?: React.ReactNode;
  userMenu?: React.ReactNode;
  notifications?: React.ReactNode;
  search?: {
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  };
}

const SearchIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const BellIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.7 21a2 2 0 0 1-3.4 0" />
  </svg>
);

export const TopBar = ({ title, actions, userMenu, notifications, search }: TopBarProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-background px-4 shadow-sm transition-colors duration-200 md:px-8">
      <div className="flex min-w-0 items-center gap-3">
        {title ? (
          <h2 className="truncate text-xl font-bold tracking-tight text-foreground">{title}</h2>
        ) : null}
      </div>

      {search ? (
        <div className="flex-1 px-4 md:px-12">
          <div className="group relative max-w-xl">
            <SearchIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
              size={18}
            />
            <Input
              type="text"
              placeholder={search.placeholder ?? 'Search'}
              onChange={search.onChange}
              className="w-full pl-10"
              aria-label={search.placeholder ?? 'Search'}
            />
          </div>
        </div>
      ) : (
        <div className="flex-1" />
      )}

      <div className="flex items-center gap-2">
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}

        {notifications ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-10 w-10">
                <BellIcon size={20} />
                <Badge
                  variant="destructive"
                  className="absolute right-2 top-2 h-2 w-2 rounded-full px-0 py-0"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-0 border-none shadow-none">
              {notifications}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}

        {userMenu ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage alt="User avatar" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium text-foreground sm:block">Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-0 border-none shadow-none">
              {userMenu}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </header>
  );
};
