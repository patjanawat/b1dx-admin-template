
import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Filter, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Order, OrderStatus } from 'b1dx/types';
import { FilterDropdown } from './FilterDropdown';
import { 
  AppTable, 
  AppTableHeader, 
  AppTableBody, 
  AppTableRow, 
  AppTableHead, 
  AppTableCell,
  AppButton,
  AppBadge
} from '@b1dx/ui';

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
    <AppBadge variant={variants[status]}>
      {status}
    </AppBadge>
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
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-20">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Orders</h3>
        <div className="flex gap-2">
          <div className="relative" ref={filterRef}>
            <AppButton 
              variant={isFilterOpen ? "secondary" : "outline"}
              size="sm"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="gap-2 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
            >
              <Filter size={14} />
              Filter
            </AppButton>
            
            {isFilterOpen && (
              <FilterDropdown 
                onClose={() => setIsFilterOpen(false)} 
                onApply={(f) => console.log(f)} 
              />
            )}
          </div>

          <AppButton size="sm" className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white border-0">
            <Plus size={16} />
            Create Order
          </AppButton>
        </div>
      </div>

      <AppTable>
        <AppTableHeader>
          <AppTableRow className="dark:bg-slate-800/30">
            <AppTableHead className="w-[120px] font-bold text-slate-500 dark:text-slate-400">Order ID</AppTableHead>
            <AppTableHead className="font-bold text-slate-500 dark:text-slate-400">Customer</AppTableHead>
            <AppTableHead className="font-bold text-slate-500 dark:text-slate-400">Date</AppTableHead>
            <AppTableHead className="font-bold text-slate-500 dark:text-slate-400">Status</AppTableHead>
            <AppTableHead className="text-right font-bold text-slate-500 dark:text-slate-400">Amount</AppTableHead>
            <AppTableHead className="text-right"></AppTableHead>
          </AppTableRow>
        </AppTableHeader>
        <AppTableBody>
          {orders.map((order) => (
            <AppTableRow key={order.id} className="dark:border-slate-800/50">
              <AppTableCell className="font-bold text-slate-900 dark:text-slate-200">{order.id}</AppTableCell>
              <AppTableCell>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm ${order.customerColor}`}>
                    {order.customerInitials}
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{order.customerName}</span>
                </div>
              </AppTableCell>
              <AppTableCell className="text-slate-500 dark:text-slate-400 text-sm">{order.date}</AppTableCell>
              <AppTableCell>
                <StatusBadge status={order.status} />
              </AppTableCell>
              <AppTableCell className="text-right font-bold text-slate-900 dark:text-slate-200">
                ${order.amount.toFixed(2)}
              </AppTableCell>
              <AppTableCell className="text-right">
                <AppButton variant="ghost" size="icon" className="h-8 w-8 dark:text-slate-500 dark:hover:text-slate-300">
                  <MoreHorizontal size={18} />
                </AppButton>
              </AppTableCell>
            </AppTableRow>
          ))}
        </AppTableBody>
      </AppTable>

      <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-800/20">
        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
          Showing {orders.length} of 1,284 results
        </p>
        <div className="flex gap-2">
          <AppButton variant="outline" size="sm" className="gap-1 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 h-8">
            <ChevronLeft size={14} />
            Previous
          </AppButton>
          <AppButton variant="outline" size="sm" className="gap-1 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 h-8">
            Next
            <ChevronRight size={14} />
          </AppButton>
        </div>
      </div>
    </div>
  );
};
