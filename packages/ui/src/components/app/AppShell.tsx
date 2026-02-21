import React from 'react';
import { AppSidebar } from './AppSidebar';
import { AppTopBar } from './AppTopBar';
import type { AppLayoutProps } from './appShellTypes';

export const AppShell: React.FC<AppLayoutProps> = ({ children, sidebarProps, topBarProps }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-200">
      <AppSidebar {...sidebarProps} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <AppTopBar {...topBarProps} />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-background">
          <div className="max-w-[1400px] mx-auto w-full space-y-8">
            {children}
          </div>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ddd;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ccc;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: #0f172a;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
        }
      `}</style>
    </div>
  );
};
