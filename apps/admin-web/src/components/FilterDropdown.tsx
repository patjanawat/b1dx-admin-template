
import React from 'react';
import { X, RotateCcw, Check } from 'lucide-react';
import { OrderStatus } from 'b1dx/types';

interface FilterDropdownProps {
  onClose: () => void;
  onApply: (filters: any) => void;
}

const STATUS_OPTIONS: OrderStatus[] = ['Pending', 'Processing', 'Shipped', 'Cancelled'];

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ onClose, onApply }) => {
  const [selectedStatus, setSelectedStatus] = React.useState<OrderStatus[]>([]);
  const [dateRange, setDateRange] = React.useState('all');

  const toggleStatus = (status: OrderStatus) => {
    setSelectedStatus(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
        <h3 className="font-bold text-slate-700 text-sm">Filter Options</h3>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-5 space-y-6">
        {/* Status Section */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 block">
            Order Status
          </label>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((status) => {
              const isActive = selectedStatus.includes(status);
              return (
                <button
                  key={status}
                  onClick={() => toggleStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    isActive 
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-600' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>
        </div>

        {/* Date Range Section */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 block">
            Date Range
          </label>
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full bg-slate-50 border-slate-200 rounded-lg py-2 px-3 text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
          </select>
        </div>

        {/* Price Range Section */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 block">
            Amount Range
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">$</span>
              <input 
                type="number" 
                placeholder="Min" 
                className="w-full bg-slate-50 border-slate-200 rounded-lg py-2 pl-7 pr-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">$</span>
              <input 
                type="number" 
                placeholder="Max" 
                className="w-full bg-slate-50 border-slate-200 rounded-lg py-2 pl-7 pr-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
        <button 
          onClick={() => {
            setSelectedStatus([]);
            setDateRange('all');
          }}
          className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <RotateCcw size={14} />
          Reset
        </button>
        <button 
          onClick={() => {
            onApply({ selectedStatus, dateRange });
            onClose();
          }}
          className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
        >
          <Check size={14} />
          Apply
        </button>
      </div>
    </div>
  );
};
