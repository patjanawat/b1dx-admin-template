import React from 'react';
import { TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { StatItem } from '../types';
import { Card, CardContent } from './ui/card';

export const StatCard: React.FC<StatItem> = ({ label, value, change, changeType, icon, iconBg, iconColor, footerText }) => {
  const getFooterIcon = () => {
    switch (changeType) {
      case 'positive': return <TrendingUp size={14} className="text-emerald-500" />;
      case 'warning': return <AlertCircle size={14} className="text-amber-500" />;
      case 'danger': return <AlertCircle size={14} className="text-rose-500" />;
      default: return <CheckCircle2 size={14} className="text-emerald-500" />;
    }
  };

  const getFooterColor = () => {
    switch (changeType) {
      case 'positive': return 'text-emerald-600 dark:text-emerald-400';
      case 'warning': return 'text-amber-600 dark:text-amber-400';
      case 'danger': return 'text-rose-600 dark:text-rose-400';
      default: return 'text-emerald-600 dark:text-emerald-400';
    }
  };

  return (
    <Card className="hover:border-border transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-muted-foreground tracking-tight truncate">
              {label}
            </p>
            <h3 className="text-2xl font-bold text-foreground tracking-tight mt-0.5">
              {value}
            </h3>
            
            <div className={`mt-2.5 flex items-center gap-1.5 font-medium text-xs ${getFooterColor()}`}>
              <div className="shrink-0">{getFooterIcon()}</div>
              {change && <span>{change}</span>}
              <span className={`${change ? 'text-muted-foreground font-normal' : ''} truncate`}>
                {footerText}
              </span>
            </div>
          </div>
          
          <div className={`${iconBg} ${iconColor} w-12 h-12 flex items-center justify-center rounded-xl shrink-0 shadow-sm border border-border/50`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};