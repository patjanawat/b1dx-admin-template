import React from 'react';

import { Button } from './Button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export type FilterDropdownOption = {
  label: string;
  value: string;
};

export type FilterDropdownValue = {
  statuses: string[];
  dateRange: string;
};

export type FilterDropdownProps = {
  triggerLabel?: string;
  title?: string;
  statusOptions?: FilterDropdownOption[];
  dateRangeOptions?: FilterDropdownOption[];
  onApply?: (value: FilterDropdownValue) => void;
};

const DEFAULT_STATUS_OPTIONS: FilterDropdownOption[] = [
  { label: 'Pending', value: 'pending' },
  { label: 'Processing', value: 'processing' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Cancelled', value: 'cancelled' },
];

const DEFAULT_DATE_OPTIONS: FilterDropdownOption[] = [
  { label: 'All Time', value: 'all' },
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 Days', value: 'last7days' },
  { label: 'Last 30 Days', value: 'last30days' },
];

/**
 * Usage:
 *   <FilterDropdown
 *     onApply={(value) => console.log(value)}
 *   />
 */
export const FilterDropdown = ({
  triggerLabel = 'Filter',
  title = 'Filter Options',
  statusOptions = DEFAULT_STATUS_OPTIONS,
  dateRangeOptions = DEFAULT_DATE_OPTIONS,
  onApply,
}: FilterDropdownProps) => {
  const [selectedStatus, setSelectedStatus] = React.useState<string[]>([]);
  const [dateRange, setDateRange] = React.useState(dateRangeOptions[0]?.value ?? 'all');

  const toggleStatus = (status: string) => {
    setSelectedStatus((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const resetFilters = () => {
    setSelectedStatus([]);
    setDateRange(dateRangeOptions[0]?.value ?? 'all');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          {triggerLabel}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" side="bottom" className="p-0">
        <div className="overflow-hidden rounded-xl">
          <div className="flex items-center justify-between border-b border-border bg-muted/40 px-5 py-4">
            <h3 className="text-sm font-bold text-foreground">{title}</h3>
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-accent"
              aria-label="Reset filters"
            >
              ⟲
            </button>
          </div>

          <div className="space-y-6 p-5">
            <div>
              <label className="mb-3 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Status
              </label>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((status) => {
                  const isActive = selectedStatus.includes(status.value);
                  return (
                    <button
                      key={status.value}
                      type="button"
                      onClick={() => toggleStatus(status.value)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-background text-muted-foreground hover:bg-accent'
                      }`}
                    >
                      {status.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="mb-3 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Date Range
              </label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  {dateRangeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t border-border bg-muted/30 p-4">
            <Button variant="outline" size="sm" className="flex-1" onClick={resetFilters}>
              Reset
            </Button>
            <Button
              size="sm"
              className="flex-1"
              onClick={() =>
                onApply?.({
                  statuses: selectedStatus,
                  dateRange,
                })
              }
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
