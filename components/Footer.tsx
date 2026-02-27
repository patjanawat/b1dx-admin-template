import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="flex items-center justify-between py-4 px-8 border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="flex items-center gap-8 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
          SYSTEM ONLINE
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" />
          LAST SYNC: 1 MIN AGO
        </div>
      </div>
      
      <div className="flex items-center gap-6 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
        <p>OMS Pro v2.4.0-build.821</p>
        <p>© 2026 OMS Pro. All rights reserved.</p>
      </div>
    </footer>
  );
};
