
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye
} from 'lucide-react';
import { Order, OrderStatus } from '../types';
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
import { Checkbox } from './ui/checkbox';

interface OrdersTableProps {
  orders: Order[];
}

const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
  if (status === 'WAIT FOR CONFIRM') {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200">
        <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
        <span className="text-[10px] font-bold text-orange-600 uppercase tracking-tight">WAIT FOR CONFIRM</span>
      </div>
    );
  }

  return (
    <div className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200">
      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">{status}</span>
    </div>
  );
};

export const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-b border-slate-200">
            <TableHead className="w-[50px] pl-6">
              <Checkbox className="rounded-[4px]" />
            </TableHead>
            <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-400 py-4">ลำดับ</TableHead>
            <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-400 py-4">ORDER ID</TableHead>
            <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-400 py-4">รหัสพัสดุ</TableHead>
            <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-400 py-4">วันที่สร้าง</TableHead>
            <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-400 py-4">ร้านค้า</TableHead>
            <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-400 py-4">จำนวน SKU</TableHead>
            <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-400 py-4">จำนวนชิ้น</TableHead>
            <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-400 py-4">ช่องทาง</TableHead>
            <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-400 py-4">SHIPPING</TableHead>
            <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-400 py-4">STATUS</TableHead>
            <TableHead className="font-bold text-[11px] uppercase tracking-wider text-slate-400 py-4 text-right pr-6">MANAGE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={order.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors group">
              <TableCell className="pl-6">
                <Checkbox className="rounded-[4px]" />
              </TableCell>
              <TableCell className="text-[12px] font-medium text-slate-500">{index + 1}</TableCell>
              <TableCell 
                className="font-bold text-[12px] text-blue-500 hover:underline cursor-pointer"
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                {order.id}
              </TableCell>
              <TableCell className="text-[12px] font-medium text-slate-500">{order.trackingId}</TableCell>
              <TableCell className="text-[12px] font-medium text-slate-400 leading-tight">
                {order.createdDate.split(' ')[0]}<br/>
                <span className="text-[10px]">{order.createdDate.split(' ')[1]}</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-orange-100 flex items-center justify-center text-[10px] text-orange-600 font-bold">
                    {order.shopName.charAt(0)}
                  </div>
                  <span className="text-[12px] font-bold text-slate-700">{order.shopName}</span>
                </div>
              </TableCell>
              <TableCell className="text-[12px] font-medium text-slate-600 text-center">{order.skuCount}</TableCell>
              <TableCell className="text-[12px] font-medium text-slate-600 text-center">{order.itemCount}</TableCell>
              <TableCell>
                <div className="px-2 py-0.5 rounded bg-slate-900 text-white text-[9px] font-bold inline-block uppercase tracking-tighter">
                  {order.channel}
                </div>
              </TableCell>
              <TableCell className="text-[12px] font-medium text-slate-600">{order.shipping}</TableCell>
              <TableCell>
                <StatusBadge status={order.status} />
              </TableCell>
              <TableCell className="text-right pr-6">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                  <Eye size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 font-medium">Items per page:</span>
            <Select defaultValue="50">
              <SelectTrigger className="h-8 w-[65px] text-[11px] font-bold bg-slate-50 border-slate-200">
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
          <p className="text-[11px] text-slate-400 font-medium">
            Showing <span className="font-bold text-slate-700">1-50</span> of <span className="font-bold text-slate-700">1,240</span> results
          </p>
        </div>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-slate-600">
            <ChevronsLeft size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-slate-600">
            <ChevronLeft size={16} />
          </Button>
          <div className="flex items-center gap-1 px-2">
            <Button variant="secondary" size="sm" className="h-8 w-8 p-0 font-bold text-xs bg-blue-500 text-white hover:bg-blue-600">1</Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 font-bold text-xs text-slate-400 hover:text-slate-600">2</Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 font-bold text-xs text-slate-400 hover:text-slate-600">3</Button>
            <span className="text-slate-300 px-1">...</span>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 font-bold text-xs text-slate-400 hover:text-slate-600">25</Button>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
            <ChevronRight size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
            <ChevronsRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
