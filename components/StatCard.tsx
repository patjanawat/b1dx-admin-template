import React from 'react';
import { TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { StatItem } from '../types';
import { Card, CardContent } from './ui/card';

export const StatCard: React.FC<StatItem> = ({ label, value, icon, iconBg, iconColor }) => {
  return (
    <Card className="hover:border-border transition-all duration-200 border-none shadow-sm bg-white">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`${iconBg} ${iconColor} w-14 h-14 flex items-center justify-center rounded-xl shrink-0 border border-slate-100`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">
              {label}
            </p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">
              {value}
            </h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
