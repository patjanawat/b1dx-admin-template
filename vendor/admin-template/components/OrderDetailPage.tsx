import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Layout } from './Layout';
import { 
  Package, 
  User, 
  MapPin, 
  Truck, 
  CreditCard, 
  Calendar,
  ExternalLink,
  Clock,
  CheckCircle2,
  ShoppingCart,
  ArrowLeft,
  Download,
  Printer,
  Check,
  Hourglass
} from 'lucide-react';

// Mock data lookup (in a real app, this would be an API call)
const MOCK_ORDERS: Record<string, any> = {
  'ORD-20231024-001': {
    orderId: 'ORD-20231024-001',
    trackingId: 'PKG-992120',
    date: '24/10/2023 09:30',
    shop: 'Streetwear TH',
    statusKey: 'status.wait_confirm',
    items: 5,
    shipping: 'Kerry Express'
  },
  'ORD-20231024-002': {
    orderId: 'ORD-20231024-002',
    trackingId: 'PKG-992121',
    date: '24/10/2023 10:15',
    shop: 'Fashion Hub',
    statusKey: 'status.wait_confirm',
    items: 1,
    shipping: 'Flash Express'
  },
  'ORD-20231024-005': {
    orderId: 'ORD-20231024-005',
    trackingId: 'PKG-992125',
    date: '24/10/2023 11:00',
    shop: 'Beauty Direct',
    statusKey: 'status.wait_confirm',
    items: 10,
    shipping: 'J&T Express'
  }
};

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const order = id ? MOCK_ORDERS[id] : null;

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 py-20">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
          <Package size={40} />
        </div>
        <h1 className="text-2xl font-black">Order Not Found</h1>
        <p className="text-muted-foreground">The order you are looking for does not exist or has been removed.</p>
        <Button onClick={() => navigate('/')} variant="outline" className="rounded-xl font-bold">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-xl hover:bg-accent shadow-sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{order.orderId}</h1>
              <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 px-4 py-1.5 text-xs font-black uppercase tracking-widest rounded-full">
                {order.statusKey.replace('status.', '').replace('_', ' ')}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground font-medium mt-1">Placed on {order.date}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl font-bold gap-2 h-11 px-5 shadow-sm">
            <Printer size={18} />
            Print Label
          </Button>
          <Button className="rounded-xl font-bold gap-2 h-11 px-6 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20">
            <Download size={18} />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Customer & Shipping */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                <User size={14} />
                Customer Information
              </div>
              <div className="bg-card rounded-2xl p-6 space-y-3 border border-border shadow-sm">
                <p className="text-lg font-bold text-foreground">John Doe</p>
                <p className="text-sm text-muted-foreground font-medium">+66 81 234 5678</p>
                <p className="text-sm text-muted-foreground font-medium">john.doe@example.com</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                <MapPin size={14} />
                Shipping Address
              </div>
              <div className="bg-card rounded-2xl p-6 space-y-2 border border-border shadow-sm">
                <p className="text-sm font-bold text-foreground leading-relaxed">
                  123 Sukhumvit Road, Khlong Toei, Bangkok 10110, Thailand
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <Badge variant="outline" className="text-[10px] font-black uppercase tracking-tighter">Home</Badge>
                  <span className="text-[11px] text-muted-foreground font-bold">Default Address</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                <ShoppingCart size={14} />
                Order Items ({order.items})
              </div>
              <span className="text-base font-black text-primary">Total: ฿1,250.00</span>
            </div>
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-muted/30 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Product</th>
                    <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">Qty</th>
                    <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {[1, 2].map((item) => (
                    <tr key={item} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center shrink-0 border border-border">
                            <Package size={24} className="text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-foreground">Premium Cotton T-Shirt</p>
                            <p className="text-xs text-muted-foreground font-medium">SKU: TS-00{item}-BLK</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-bold text-center">1</td>
                      <td className="px-6 py-5 text-sm font-bold text-right">฿625.00</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Status & Timeline */}
        <div className="space-y-8">
          {/* Logistics & Payment */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">
              <Truck size={14} />
              Logistics
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-foreground">{order.shipping}</p>
                <p className="text-xs text-muted-foreground font-medium mt-1">Tracking: {order.trackingId}</p>
              </div>
              <button className="p-2.5 rounded-xl hover:bg-muted text-primary transition-colors border border-transparent hover:border-border">
                <ExternalLink size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">
              <CreditCard size={14} />
              Payment Method
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-foreground">Credit Card</p>
                <p className="text-xs text-muted-foreground font-medium mt-1">Paid on {order.date}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={20} />
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">
              <Clock size={14} />
              Order Timeline
            </div>
            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm space-y-8 relative 
              before:absolute before:left-[48px] before:top-0 before:bottom-0 before:w-px before:bg-linear-to-b before:from-transparent before:via-border/60 before:to-transparent
              after:absolute after:left-[48px] after:top-0 after:bottom-0 after:w-2 after:-translate-x-1/2 after:bg-linear-to-b after:from-transparent after:via-primary/5 after:to-transparent after:blur-[2px]">
              {[
                { status: 'Order Placed', time: order.date, active: true, desc: 'Order successfully created by customer' },
                { status: 'Payment Confirmed', time: order.date, active: true, desc: 'Payment verified via credit card' },
                { status: 'Processing', time: 'Pending', active: false, desc: 'Warehouse is preparing items' },
              ].map((step, idx) => (
                <div key={idx} className="flex gap-6 relative">
                  <div className={`w-8 h-8 rounded-full border-4 z-10 shrink-0 flex items-center justify-center relative overflow-hidden ${step.active ? 'bg-card border-emerald-500/20' : 'bg-card border-muted/30 text-muted-foreground'}`}>
                    {/* Faint background overlay to maintain the look while being opaque to the line */}
                    <div className={`absolute inset-0 ${step.active ? 'bg-emerald-500/10' : 'bg-muted/10'}`} />
                    
                    <div className="relative z-20 flex items-center justify-center w-full h-full">
                      {step.active ? (
                        <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center">
                          <Check size={10} strokeWidth={4} className="text-emerald-500" />
                        </div>
                      ) : (
                        <Hourglass size={12} className="opacity-60" />
                      )}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className={`text-sm font-bold ${step.active ? 'text-foreground' : 'text-muted-foreground'}`}>{step.status}</p>
                    <p className="text-xs text-muted-foreground font-medium">{step.time}</p>
                    <p className="text-[11px] text-muted-foreground/70 font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
