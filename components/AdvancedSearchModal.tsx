import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Search, RotateCcw, X } from 'lucide-react';

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (filters: any) => void;
}

export const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({
  isOpen,
  onClose,
  onSearch,
}) => {
  const [filters, setFilters] = React.useState({
    orderId: '',
    trackingId: '',
    recipientName: '',
    phone: '',
    startDate: '',
    endDate: '',
    warehouse: 'all',
    channel: 'all',
    logistics: 'all',
    printStatus: 'all',
    paymentStatus: 'all',
  });

  const handleReset = () => {
    setFilters({
      orderId: '',
      trackingId: '',
      recipientName: '',
      phone: '',
      startDate: '',
      endDate: '',
      warehouse: 'all',
      channel: 'all',
      logistics: 'all',
      printStatus: 'all',
      paymentStatus: 'all',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden rounded-2xl border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 bg-muted/30 border-b border-border">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Search size={22} />
              </div>
              Advanced Search
            </DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Section 1: Order Details */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">Order Details</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="orderId" className="text-xs font-bold">Order ID</Label>
                <Input
                  id="orderId"
                  placeholder="e.g. ORD-2023..."
                  value={filters.orderId}
                  onChange={(e) => setFilters({ ...filters, orderId: e.target.value })}
                  className="h-11 rounded-xl bg-muted/30 border-border focus:bg-background transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trackingId" className="text-xs font-bold">Tracking ID</Label>
                <Input
                  id="trackingId"
                  placeholder="e.g. PKG-..."
                  value={filters.trackingId}
                  onChange={(e) => setFilters({ ...filters, trackingId: e.target.value })}
                  className="h-11 rounded-xl bg-muted/30 border-border focus:bg-background transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Recipient Info */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">Recipient Information</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="recipientName" className="text-xs font-bold">Recipient Name</Label>
                <Input
                  id="recipientName"
                  placeholder="Enter name..."
                  value={filters.recipientName}
                  onChange={(e) => setFilters({ ...filters, recipientName: e.target.value })}
                  className="h-11 rounded-xl bg-muted/30 border-border focus:bg-background transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs font-bold">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="08x-xxx-xxxx"
                  value={filters.phone}
                  onChange={(e) => setFilters({ ...filters, phone: e.target.value })}
                  className="h-11 rounded-xl bg-muted/30 border-border focus:bg-background transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Date Range */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">Date Range</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-xs font-bold">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                  className="h-11 rounded-xl bg-muted/30 border-border focus:bg-background transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-xs font-bold">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                  className="h-11 rounded-xl bg-muted/30 border-border focus:bg-background transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Filters */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">Status & Source</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold">Warehouse</Label>
                <Select value={filters.warehouse} onValueChange={(v) => setFilters({ ...filters, warehouse: v })}>
                  <SelectTrigger className="h-11 rounded-xl bg-muted/30 border-border focus:bg-background transition-all">
                    <SelectValue placeholder="Select warehouse" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border shadow-2xl">
                    <SelectItem value="all">All Warehouses</SelectItem>
                    <SelectItem value="sauce-thai">SAUCE THAI</SelectItem>
                    <SelectItem value="warehouse-b">Warehouse B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold">Sales Channel</Label>
                <Select value={filters.channel} onValueChange={(v) => setFilters({ ...filters, channel: v })}>
                  <SelectTrigger className="h-11 rounded-xl bg-muted/30 border-border focus:bg-background transition-all">
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border shadow-2xl">
                    <SelectItem value="all">All Channels</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="shopee">Shopee</SelectItem>
                    <SelectItem value="lazada">Lazada</SelectItem>
                    <SelectItem value="tiktok">TikTok Shop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold">Logistics</Label>
                <Select value={filters.logistics} onValueChange={(v) => setFilters({ ...filters, logistics: v })}>
                  <SelectTrigger className="h-11 rounded-xl bg-muted/30 border-border focus:bg-background transition-all">
                    <SelectValue placeholder="Select logistics" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border shadow-2xl">
                    <SelectItem value="all">All Logistics</SelectItem>
                    <SelectItem value="best-express">BEST Express</SelectItem>
                    <SelectItem value="kerry">Kerry Express</SelectItem>
                    <SelectItem value="flash">Flash Express</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold">Payment Status</Label>
                <Select value={filters.paymentStatus} onValueChange={(v) => setFilters({ ...filters, paymentStatus: v })}>
                  <SelectTrigger className="h-11 rounded-xl bg-muted/30 border-border focus:bg-background transition-all">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border shadow-2xl">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="cod">COD</SelectItem>
                    <SelectItem value="unpaid">Unpaid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </form>

        <DialogFooter className="px-8 py-6 bg-muted/30 border-t border-border flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={handleReset}
            className="font-bold text-muted-foreground hover:text-foreground gap-2"
          >
            <RotateCcw size={16} />
            Reset Filters
          </Button>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 rounded-xl font-bold border-border"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="px-8 rounded-xl font-bold gap-2 shadow-lg shadow-primary/20"
            >
              <Search size={18} />
              Apply Search
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
