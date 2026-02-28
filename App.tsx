import React from 'react';
import { Toaster } from 'sonner';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { StatCard } from './components/StatCard';
import { OrdersTable } from './components/OrdersTable';
import { LoginPage } from './components/LoginPage';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';
import { ResetPasswordPage } from './components/ResetPasswordPage';
import { UserProfilePage } from './components/UserProfilePage';
import { OrderManagementPage } from './components/OrderManagementPage';
import { OrderDetailPage } from './components/OrderDetailPage';
import { INITIAL_ORDERS, STATS_DATA } from './constants';
import { Calendar, Download } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';

export default function Page() {
  const orders = INITIAL_ORDERS;
  const stats = STATS_DATA;

  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage onLogin={() => window.location.href = '/'} onForgotPassword={() => {}} />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage onBackToLogin={() => {}} />} />
        <Route path="/reset-password" element={<ResetPasswordPage onBackToLogin={() => {}} onResetSuccess={() => {}} />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <Layout activeView="dashboard" onViewChange={() => {}} onLogout={() => {}}>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <h1 className="text-3xl font-extrabold tracking-tight text-foreground drop-shadow-sm">Dashboard Overview</h1>
                  <p className="text-muted-foreground font-medium">Welcome back, Alex. Here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="hidden sm:flex gap-2 shadow-sm">
                    <Calendar size={16} className="text-primary" /> Oct 24, 2023
                  </Button>
                  <Button variant="outline" size="sm" className="flex gap-2 shadow-sm">
                    <Download size={16} className="text-emerald-500" /> Export
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => <StatCard key={idx} {...stat} />)}
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-4">
                  <OrdersTable orders={orders} />
                </div>
                <div className="space-y-6">
                  <Card className="rounded-xl shadow-sm">
                    <CardHeader><CardTitle className="text-lg font-bold">Quick Insights</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Peak Sales Hour</p>
                        <p className="text-lg font-bold text-foreground">2:00 PM - 4:00 PM</p>
                        <p className="text-xs text-primary/70 mt-2 font-medium">↑ 14% more than average</p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">Top Region</p>
                        <p className="text-lg font-bold text-foreground">California, US</p>
                        <p className="text-xs text-emerald-500 mt-2 font-medium">32% of total volume</p>
                      </div>
                      <div className="pt-2">
                        <Button variant="ghost" className="w-full text-primary hover:text-primary/80 font-bold">View Detailed Analytics</Button>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-6 text-primary-foreground shadow-lg shadow-primary/20 overflow-hidden relative group">
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold mb-2">Upgrade to Pro</h3>
                      <p className="text-primary-foreground/80 text-sm mb-4 leading-relaxed">Get advanced AI-driven stock forecasting and multi-warehouse support.</p>
                      <Button variant="secondary" size="sm" className="font-bold">Learn More</Button>
                    </div>
                    <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </Layout>
        } />

        <Route path="/processing-orders" element={
          <Layout activeView="processing-orders" onViewChange={() => {}} onLogout={() => {}}>
            <OrderManagementPage />
          </Layout>
        } />

        <Route path="/profile" element={
          <Layout activeView="profile" onViewChange={() => {}} onLogout={() => {}}>
            <UserProfilePage onCancel={() => {}} onSave={() => {}} />
          </Layout>
        } />

        <Route path="/orders/:id" element={
          <Layout activeView="processing-orders" onViewChange={() => {}} onLogout={() => {}}>
            <OrderDetailPage />
          </Layout>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
