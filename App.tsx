import React from 'react';
import { Toaster } from 'sonner';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { StatCard } from './components/StatCard';
import { OrdersTable } from './components/OrdersTable';
import { ProductFilterPage } from './components/ProductFilterPage';
import { LoginPage } from './components/LoginPage';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';
import { ResetPasswordPage } from './components/ResetPasswordPage';
import { UserProfilePage } from './components/UserProfilePage';
import { OrderManagementPage } from './components/OrderManagementPage';
import { OrderDetailPage } from './components/OrderDetailPage';
import { INITIAL_ORDERS, STATS_DATA } from './constants';
import { 
  Download, 
  Search, 
  Settings, 
  User, 
  CreditCard, 
  Bell, 
  ChevronDown, 
  Facebook, 
  Truck, 
  Filter, 
  ArrowUpDown 
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './components/ui/select';

export default function Page() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const orders = INITIAL_ORDERS;
  const stats = STATS_DATA;

  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage onLogin={() => window.location.href = '/'} onForgotPassword={() => {}} />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage onBackToLogin={() => {}} />} />
        <Route path="/reset-password" element={<ResetPasswordPage onBackToLogin={() => {}} onResetSuccess={() => {}} />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <Layout activeView="dashboard" onViewChange={() => {}} onLogout={() => {}}>
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <h1 className="text-2xl font-bold tracking-tight text-slate-800">Orders Overview</h1>
                  <p className="text-sm text-slate-400 font-medium">Efficiently manage all incoming customer orders across channels.</p>
                </div>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold gap-2 shadow-sm">
                  <Download size={16} /> Export Excel
                </Button>
              </div>

              {/* Warehouse Tabs */}
              <div className="flex items-center gap-6 border-b border-slate-200 pb-2">
                <button className="text-sm font-bold text-blue-500 border-b-2 border-blue-500 pb-2 -mb-[10px]">All Warehouses</button>
                <button className="text-sm font-bold text-slate-400 hover:text-slate-600 pb-2">SAUCE THAI</button>
                <button className="text-sm font-bold text-slate-400 hover:text-slate-600 pb-2">Warehouse B</button>
                <button className="text-sm font-bold text-slate-400 hover:text-slate-600 pb-2">Warehouse C</button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => <StatCard key={idx} {...stat} />)}
              </div>

              {/* Search & Filters Card */}
              <Card className="border-none shadow-sm bg-white rounded-2xl">
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    <div className="md:col-span-3 space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Search By</label>
                      <Select defaultValue="recipient">
                        <SelectTrigger className="bg-slate-50 border-slate-100 h-11">
                          <SelectValue placeholder="Recipient Name" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recipient">Recipient Name</SelectItem>
                          <SelectItem value="order-id">Order ID</SelectItem>
                          <SelectItem value="tracking">Tracking ID</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-5 space-y-1.5">
                      <div className="relative">
                        <Input 
                          placeholder="Enter search keywords..." 
                          className="bg-slate-50 border-slate-100 h-11 pl-4"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-4 flex gap-2">
                      <Button className="flex-1 bg-blue-500 hover:bg-blue-600 h-11 font-bold gap-2">
                        <Search size={18} /> Search
                      </Button>
                      <Button variant="outline" className="flex-1 border-slate-200 h-11 font-bold gap-2 text-slate-600">
                        <Filter size={18} /> Advanced
                      </Button>
                      <Button variant="outline" className="flex-1 border-slate-200 h-11 font-bold gap-2 text-slate-600">
                        <ArrowUpDown size={18} /> Sort
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Warehouse</label>
                      <div className="relative">
                        <Select defaultValue="sauce-thai">
                          <SelectTrigger className="bg-white border-slate-200 h-11">
                            <SelectValue placeholder="Select Warehouse" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sauce-thai">SAUCE THAI</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="absolute right-10 top-1/2 -translate-y-1/2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">2</div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sales Channel</label>
                      <div className="relative">
                        <Select defaultValue="facebook">
                          <SelectTrigger className="bg-white border-slate-200 h-11">
                            <div className="flex items-center gap-2">
                              <Facebook size={16} className="text-blue-600" />
                              <SelectValue placeholder="Select Channel" />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="facebook">Facebook</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="absolute right-10 top-1/2 -translate-y-1/2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">2</div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Logistics</label>
                      <div className="relative">
                        <Select defaultValue="best">
                          <SelectTrigger className="bg-white border-slate-200 h-11">
                            <div className="flex items-center gap-2">
                              <Truck size={16} className="text-orange-500" />
                              <SelectValue placeholder="Select Logistics" />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="best">BEST Express</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="absolute right-10 top-1/2 -translate-y-1/2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">1</div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Print Status</label>
                      <div className="relative">
                        <Select defaultValue="not-scheduled">
                          <SelectTrigger className="bg-white border-slate-200 h-11">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="not-scheduled">Not yet scheduled</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="absolute right-10 top-1/2 -translate-y-1/2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">1</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Table Section with Tabs */}
              <div className="space-y-4">
                <Tabs defaultValue="account" className="w-full" onValueChange={() => navigate('/product-filter')}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <TabsList className="bg-slate-100 p-1 h-12 rounded-xl">
                      <TabsTrigger value="account" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg h-10 px-6 gap-2 font-bold text-slate-600">
                        <User size={18} /> Account
                      </TabsTrigger>
                      <TabsTrigger value="billing" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg h-10 px-6 gap-2 font-bold text-slate-400">
                        <CreditCard size={18} /> Billing
                      </TabsTrigger>
                      <TabsTrigger value="notifications" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg h-10 px-6 gap-2 font-bold text-slate-400">
                        <Bell size={18} /> Notifications
                      </TabsTrigger>
                      <TabsTrigger value="settings" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg h-10 px-6 gap-2 font-bold text-slate-400">
                        <Settings size={18} /> Settings
                      </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-4">
                      <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <Input placeholder="Search orders..." className="pl-10 bg-slate-50 border-slate-100 h-10" />
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Filter By:</span>
                        <Button variant="outline" size="sm" className="h-8 rounded-lg px-3 text-[11px] font-bold border-slate-200 text-slate-600">All Statuses</Button>
                        <Button variant="outline" size="sm" className="h-8 rounded-lg px-3 text-[11px] font-bold border-slate-200 text-slate-600">Last 30 Days</Button>
                      </div>
                    </div>
                  </div>

                  <TabsContent value="account" className="mt-0 border-none p-0">
                    <OrdersTable orders={orders} />
                  </TabsContent>
                  <TabsContent value="billing" className="mt-0 border-none p-0">
                    <OrdersTable orders={orders.slice(0, 2)} />
                  </TabsContent>
                  <TabsContent value="notifications" className="mt-0 border-none p-0">
                    <OrdersTable orders={orders.slice(1, 3)} />
                  </TabsContent>
                  <TabsContent value="settings" className="mt-0 border-none p-0">
                    <OrdersTable orders={[]} />
                  </TabsContent>
                </Tabs>
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

        <Route path="/product-filter" element={
          <Layout activeView="processing-orders" onViewChange={() => {}} onLogout={() => {}}>
            <ProductFilterPage />
          </Layout>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
