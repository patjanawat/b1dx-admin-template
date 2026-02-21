import React, { useState } from 'react';
import { Toaster } from 'sonner';
import { StatCard } from './components/StatCard';
import { OrdersTable } from './components/OrdersTable';
import { LoginPage } from './components/LoginPage';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';
import { ResetPasswordPage } from './components/ResetPasswordPage';
import { UserProfilePage } from './components/UserProfilePage';
import { OrderManagementPage } from './components/OrderManagementPage';
import { INITIAL_ORDERS, STATS_DATA } from './constants';
import { Calendar, Download } from 'lucide-react';
import { Button, Layout } from '@b1dx/ui';
import { useAdminShellConfig } from './appShellConfig';

type ViewState = 'login' | 'forgot-password' | 'reset-password' | 'dashboard' | 'profile' | 'processing-orders';

export default function Page() {
  const [view, setView] = useState<ViewState>('dashboard');
  const [orders] = useState(INITIAL_ORDERS);
  const [stats] = useState(STATS_DATA);

  if (view === 'login') {
    return (
      <>
        <Toaster position="top-right" richColors />
        <LoginPage 
          onLogin={() => setView('dashboard')} 
          onForgotPassword={() => setView('forgot-password')}
        />
      </>
    );
  }

  if (view === 'forgot-password') {
    return (
      <>
        <Toaster position="top-right" richColors />
        <ForgotPasswordPage 
          onBackToLogin={() => setView('login')} 
        />
      </>
    );
  }

  if (view === 'reset-password') {
    return (
      <>
        <Toaster position="top-right" richColors />
        <ResetPasswordPage 
          onBackToLogin={() => setView('login')}
          onResetSuccess={() => setView('login')}
        />
      </>
    );
  }

  const handleLogout = () => {
    setView('login');
  };
  const handleViewChange = (newView: string) => setView(newView as ViewState);

  const { sidebarProps, topBarProps } = useAdminShellConfig({
    activeView: view,
    onViewChange: handleViewChange,
    onLogout: handleLogout
  });

  return (
    <>
      <Toaster position="top-right" richColors />
      <Layout 
        sidebarProps={sidebarProps}
        topBarProps={topBarProps}
      >
        {view === 'profile' ? (
          <UserProfilePage 
            onCancel={() => setView('dashboard')} 
            onSave={() => setView('dashboard')} 
          />
        ) : view === 'processing-orders' ? (
          <OrderManagementPage />
        ) : (
          <div className="flex flex-col gap-8">
            {/* Dashboard Header with Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white drop-shadow-sm">
                  Dashboard Overview
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                  Welcome back, Alex. Here's what's happening today.
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hidden sm:flex gap-2 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 shadow-sm border-slate-200"
                >
                  <Calendar size={16} className="text-indigo-500" />
                  Oct 24, 2023
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex gap-2 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 shadow-sm border-slate-200"
                >
                  <Download size={16} className="text-emerald-500" />
                  Export
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <StatCard key={idx} {...stat} />
              ))}
            </div>

            {/* Dashboard Sections Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Main Table - Spans 2 columns */}
              <div className="xl:col-span-2 space-y-4">
                <OrdersTable orders={orders} />
              </div>

              {/* Sidebar Insights & Marketing section */}
              <div className="space-y-6">
                {/* Quick Insights Card */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Insights</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
                      <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">Peak Sales Hour</p>
                      <p className="text-lg font-bold text-slate-800 dark:text-slate-200">2:00 PM - 4:00 PM</p>
                      <p className="text-xs text-indigo-500 mt-2 font-medium">↑ 14% more than average</p>
                    </div>
                    
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                      <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">Top Region</p>
                      <p className="text-lg font-bold text-slate-800 dark:text-slate-200">California, US</p>
                      <p className="text-xs text-emerald-500 mt-2 font-medium">32% of total volume</p>
                    </div>

                    <div className="pt-2">
                      <button className="w-full text-center py-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                        View Detailed Analytics
                      </button>
                    </div>
                  </div>
                </div>

                {/* Upgrade Promo Card */}
                <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl p-6 text-white shadow-lg shadow-indigo-100 dark:shadow-indigo-900/40 overflow-hidden relative group">
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold mb-2">Upgrade to Pro</h3>
                    <p className="text-indigo-100 text-sm mb-4 leading-relaxed">Get advanced AI-driven stock forecasting and multi-warehouse support.</p>
                    <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors">
                      Learn More
                    </button>
                  </div>
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}
