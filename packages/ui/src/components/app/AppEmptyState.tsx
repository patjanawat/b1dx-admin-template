import React from 'react';

export interface AppEmptyStateProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export const AppEmptyState = ({ title, description, actions }: AppEmptyStateProps) => (
  <section className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-950 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50">
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      {description ? <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p> : null}
    </div>
    {actions ? <div className="mt-2 flex flex-wrap items-center justify-center gap-2">{actions}</div> : null}
  </section>
);
