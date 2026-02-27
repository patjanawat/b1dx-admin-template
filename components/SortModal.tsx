import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ArrowUpDown, SortAsc, SortDesc, Check } from 'lucide-react';

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSort: (key: string, direction: 'asc' | 'desc') => void;
  currentSort: { key: string; direction: 'asc' | 'desc' } | null;
}

export const SortModal: React.FC<SortModalProps> = ({
  isOpen,
  onClose,
  onSort,
  currentSort,
}) => {
  const [sortKey, setSortKey] = React.useState(currentSort?.key || 'date');
  const [direction, setDirection] = React.useState<'asc' | 'desc'>(currentSort?.direction || 'desc');

  const handleApply = () => {
    onSort(sortKey, direction);
    onClose();
  };

  const sortOptions = [
    { label: 'Order Date', value: 'date' },
    { label: 'Order ID', value: 'orderId' },
    { label: 'Status', value: 'statusKey' },
    { label: 'Shop Name', value: 'shop' },
    { label: 'SKU Count', value: 'sku' },
    { label: 'Item Count', value: 'items' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden rounded-2xl border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 bg-muted/30 border-b border-border">
          <DialogTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <ArrowUpDown size={22} />
            </div>
            Sort Orders
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-8">
          <div className="space-y-4">
            <Label className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">Sort By Field</Label>
            <div className="grid grid-cols-1 gap-3">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortKey(option.value)}
                  className={`flex items-center justify-between px-5 py-4 rounded-xl border transition-all ${
                    sortKey === option.value
                      ? 'bg-primary/5 border-primary text-primary shadow-sm'
                      : 'bg-muted/30 border-border text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  <span className="text-sm font-bold">{option.label}</span>
                  {sortKey === option.value && <Check size={18} className="text-primary" />}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">Direction</Label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setDirection('asc')}
                className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border transition-all ${
                  direction === 'asc'
                    ? 'bg-primary/5 border-primary text-primary shadow-sm'
                    : 'bg-muted/30 border-border text-muted-foreground hover:bg-muted/50'
                }`}
              >
                <SortAsc size={24} />
                <span className="text-xs font-black uppercase tracking-widest">Ascending</span>
              </button>
              <button
                onClick={() => setDirection('desc')}
                className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border transition-all ${
                  direction === 'desc'
                    ? 'bg-primary/5 border-primary text-primary shadow-sm'
                    : 'bg-muted/30 border-border text-muted-foreground hover:bg-muted/50'
                }`}
              >
                <SortDesc size={24} />
                <span className="text-xs font-black uppercase tracking-widest">Descending</span>
              </button>
            </div>
          </div>
        </div>

        <DialogFooter className="px-8 py-6 bg-muted/30 border-t border-border">
          <div className="flex items-center gap-3 w-full">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 rounded-xl font-bold border-border"
            >
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              className="flex-1 h-12 rounded-xl font-bold gap-2 shadow-lg shadow-primary/20"
            >
              Apply Sort
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
