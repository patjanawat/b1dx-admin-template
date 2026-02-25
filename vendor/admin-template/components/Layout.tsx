import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

interface LayoutProps {
  children: React.ReactNode;
  activeView?: string;
  onViewChange?: (view: string) => void;
  onLogout?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange, onLogout }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-200">
      {/* Sidebar - Handles its own width based on collapse state */}
      <Sidebar activeView={activeView} onViewChange={onViewChange} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Navigation Bar */}
        <TopBar onViewChange={onViewChange} onLogout={onLogout} />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-background">
          <div className="max-w-[1400px] mx-auto w-full space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
