
import React, { useState, useRef, useEffect } from 'react';
import { 
  MoreHorizontal, 
  Filter, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search
} from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { FilterDropdown } from './FilterDropdown';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from './ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';

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
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="px-6 py-4 flex items-center justify-between border-b border-border bg-card sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Select defaultValue="none">
            <SelectTrigger className="h-9 w-[140px] text-xs font-bold bg-muted/20 border-border/50">
              <SelectValue placeholder="Bulk Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Bulk Action</SelectItem>
              <SelectItem value="mark-shipped">Mark as Shipped</SelectItem>
              <SelectItem value="mark-processing">Mark as Processing</SelectItem>
              <SelectItem value="cancel">Cancel Orders</SelectItem>
              <SelectItem value="export">Export Selected</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" variant="secondary" className="h-9 px-5 font-bold text-xs bg-primary/10 text-primary hover:bg-primary/20 border-none shadow-none">Apply</Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground">Filter by:</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 rounded-full px-4 text-[11px] font-bold bg-muted/20 border-border/50">
                All Statuses
              </Button>
              <Button variant="outline" size="sm" className="h-8 rounded-full px-4 text-[11px] font-bold bg-muted/20 border-border/50">
                Last 30 Days
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/10 hover:bg-muted/10 border-b border-border/50">
            <TableHead className="w-[50px] pl-6">
              <Checkbox className="rounded-[4px]" />
            </TableHead>
            <TableHead className="font-black text-[10px] uppercase tracking-wider text-muted-foreground py-4">Order ID</TableHead>
            <TableHead className="font-black text-[10px] uppercase tracking-wider text-muted-foreground py-4">Package ID</TableHead>
            <TableHead className="font-black text-[10px] uppercase tracking-wider text-muted-foreground py-4">Date</TableHead>
            <TableHead className="font-black text-[10px] uppercase tracking-wider text-muted-foreground py-4">Shop</TableHead>
            <TableHead className="font-black text-[10px] uppercase tracking-wider text-muted-foreground py-4">SKU</TableHead>
            <TableHead className="font-black text-[10px] uppercase tracking-wider text-muted-foreground py-4">Items</TableHead>
            <TableHead className="font-black text-[10px] uppercase tracking-wider text-muted-foreground py-4">Channel</TableHead>
            <TableHead className="font-black text-[10px] uppercase tracking-wider text-muted-foreground py-4">Logistics</TableHead>
            <TableHead className="font-black text-[10px] uppercase tracking-wider text-muted-foreground py-4">Tracking</TableHead>
            <TableHead className="font-black text-[10px] uppercase tracking-wider text-muted-foreground py-4 text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="border-border/30 hover:bg-muted/5 transition-colors group">
              <TableCell className="pl-6">
                <Checkbox className="rounded-[4px]" />
              </TableCell>
              <TableCell 
                className="font-bold text-[13px] text-primary hover:underline cursor-pointer decoration-primary/30 underline-offset-4"
                onClick={() => window.open(`/orders/${order.id}`, '_blank')}
              >
                #{order.id}
              </TableCell>
              <TableCell className="text-[12px] font-medium text-muted-foreground">PKG-10224</TableCell>
              <TableCell className="text-[12px] font-medium text-muted-foreground">{order.date}</TableCell>
              <TableCell className="text-[12px] font-bold text-foreground/80">Official Store</TableCell>
              <TableCell className="text-[12px] font-medium text-muted-foreground">3</TableCell>
              <TableCell className="text-[12px] font-medium text-muted-foreground">5</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-[8px] text-white font-bold">f</div>
                  <span className="text-[12px] font-medium text-muted-foreground">Facebook</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-none text-[9px] font-black px-2 py-0.5 rounded-sm uppercase">BEST</Badge>
              </TableCell>
              <TableCell className="text-[11px] font-medium text-muted-foreground/70">TRK88291011</TableCell>
              <TableCell className="text-center">
                <StatusBadge status={order.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-card">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-muted-foreground font-medium">Items per page:</span>
            <Select defaultValue="50">
              <SelectTrigger className="h-8 w-[60px] text-[12px] font-bold bg-muted/10 border-border/50">
                <SelectValue placeholder="50" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-[12px] text-muted-foreground font-medium">
            Showing <span className="font-bold text-foreground">1-50</span> of <span className="font-bold text-foreground">1,240</span> results
          </p>
        </div>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/50 hover:text-foreground">
            <ChevronsLeft size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/50 hover:text-foreground">
            <ChevronLeft size={16} />
          </Button>
          <div className="flex items-center gap-1 px-2">
            <Button variant="secondary" size="sm" className="h-8 w-8 p-0 font-bold text-xs bg-primary text-primary-foreground">1</Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 font-bold text-xs text-muted-foreground hover:text-foreground">2</Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 font-bold text-xs text-muted-foreground hover:text-foreground">3</Button>
            <span className="text-muted-foreground px-1">...</span>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 font-bold text-xs text-muted-foreground hover:text-foreground">25</Button>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <ChevronRight size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <ChevronsRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
