
import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
}

export const Badge = ({ className = '', variant = 'default', ...props }: BadgeProps) => {
  const baseStyles = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2';
  
  const variants = {
    default: 'border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80',
    secondary: 'border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80',
    destructive: 'border-transparent bg-red-100 text-red-700 hover:bg-red-100/80',
    outline: 'text-slate-950',
    success: 'border-transparent bg-emerald-100 text-emerald-700 hover:bg-emerald-100/80',
    warning: 'border-transparent bg-amber-100 text-amber-700 hover:bg-amber-100/80',
  };

  return <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props} />;
};
