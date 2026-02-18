
import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Filter, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { FilterDropdown } from './FilterDropdown';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from './ui/Table';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

interface OrdersTableProps {
  orders: Order[];
}

const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
  const variants: Record<OrderStatus, "warning" | "secondary" | "success" | "destructive"> = {
    'Pending': 'warning',
    'Processing': 'secondary',
    'Shipped': 'success',
    'Cancelled': 'destructive',
  };

  return (
    <Badge variant={variants[status]}>
      {status}
    </Badge>
  );
};

export const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-20">
        <h3 className="text-lg font-semibold text-slate-900">Recent Orders</h3>
        <div className="flex gap-2">
          <div className="relative" ref={filterRef}>
            <Button 
              variant={isFilterOpen ? "secondary" : "outline"}
              size="sm"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="gap-2"
            >
              <Filter size={14} />
              Filter
            </Button>
            
            {isFilterOpen && (
              <FilterDropdown 
                onClose={() => setIsFilterOpen(false)} 
                onApply={(f) => console.log(f)} 
              />
            )}
          </div>

          <Button size="sm" className="gap-2">
            <Plus size={16} />
            Create Order
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-bold text-slate-900">{order.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${order.customerColor}`}>
                    {order.customerInitials}
                  </div>
                  <span className="font-medium text-slate-700">{order.customerName}</span>
                </div>
              </TableCell>
              <TableCell className="text-slate-500">{order.date}</TableCell>
              <TableCell>
                <StatusBadge status={order.status} />
              </TableCell>
              <TableCell className="text-right font-bold text-slate-900">
                ${order.amount.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal size={18} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
        <p className="text-xs text-slate-500 font-medium">Showing {orders.length} of 1,284 results</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <ChevronLeft size={14} />
            Previous
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            Next
            <ChevronRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};
