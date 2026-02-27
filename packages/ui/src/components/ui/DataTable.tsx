import * as React from 'react';
import {
  type ColumnDef,
  type OnChangeFn,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './Table';
import { cn } from '../../lib/cn';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ChevronsUpDown } from 'lucide-react';

export interface DataTablePaginationConfig {
  pageIndex: number;
  pageSize: number;
  total: number;
  onPageChange: (pageIndex: number) => void;
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
}

export interface DataTableProps<TData, TValue = unknown> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  columnVisibility?: VisibilityState;
  pagination?: DataTablePaginationConfig;
  className?: string;
  /** Show skeleton rows when loading */
  isLoading?: boolean;
  /** Text shown when there are no rows */
  noResultsText?: string;
}

export function DataTable<TData, TValue = unknown>({
  columns,
  data,
  sorting,
  onSortingChange,
  rowSelection,
  onRowSelectionChange,
  columnVisibility,
  pagination,
  className,
  isLoading,
  noResultsText = 'No results.',
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sorting ?? [],
      rowSelection: rowSelection ?? {},
      columnVisibility: columnVisibility ?? {},
    },
    onSortingChange,
    onRowSelectionChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    enableRowSelection: !!onRowSelectionChange,
    enableSorting: true,
  });

  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.pageSize)
    : 0;

  const pageIndex = pagination?.pageIndex ?? 0;

  return (
    <div className={cn('rounded-xl border border-border bg-card shadow-sm overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <Table className="[&>div]:overflow-visible">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-border hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        'px-4 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap',
                        canSort && 'cursor-pointer select-none hover:text-foreground transition-colors'
                      )}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    >
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center gap-1">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {canSort && (
                            <span className="ml-0.5">
                              {sorted === 'asc' ? (
                                <ChevronUp size={12} className="text-primary" />
                              ) : sorted === 'desc' ? (
                                <ChevronDown size={12} className="text-primary" />
                              ) : (
                                <ChevronsUpDown size={12} className="opacity-30" />
                              )}
                            </span>
                          )}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  {columns.map((_, j) => (
                    <TableCell key={j} className="px-4 py-4">
                      <div className="h-4 w-full animate-pulse rounded bg-muted" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-sm text-muted-foreground"
                >
                  {noResultsText}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                  className="hover:bg-accent/30 transition-colors group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-3.5">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && (totalPages > 1 || pagination.pageSizeOptions) && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border bg-muted/20 px-6 py-4">
          {/* Left: page size selector */}
          <div className="flex items-center gap-2">
            {pagination.pageSizeOptions && pagination.onPageSizeChange ? (
              <>
                <span className="text-[13px] text-muted-foreground font-medium whitespace-nowrap">
                  Rows per page:
                </span>
                <select
                  value={pagination.pageSize}
                  onChange={(e) => pagination.onPageSizeChange!(Number(e.target.value))}
                  className="h-9 rounded-lg border border-border bg-background px-2 text-sm font-bold text-foreground/70 outline-none transition-all hover:bg-accent focus:border-primary focus:ring-2 focus:ring-ring focus:ring-offset-1 cursor-pointer"
                >
                  {pagination.pageSizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <p className="text-[13px] text-muted-foreground font-medium">
                {pagination.total === 0
                  ? 'No results'
                  : `Showing ${pageIndex * pagination.pageSize + 1}–${Math.min(
                      (pageIndex + 1) * pagination.pageSize,
                      pagination.total
                    )} of ${pagination.total}`}
              </p>
            )}
          </div>

          {/* Center: showing text (only when page size selector is present) */}
          {pagination.pageSizeOptions && (
            <p className="text-[13px] text-muted-foreground font-medium">
              {pagination.total === 0
                ? 'No results'
                : `Showing ${pageIndex * pagination.pageSize + 1}–${Math.min(
                    (pageIndex + 1) * pagination.pageSize,
                    pagination.total
                  )} of ${pagination.total}`}
            </p>
          )}

          {/* Right: page buttons */}
          {totalPages > 1 && (
            <div className="flex items-center gap-1.5">
              <PaginationButton
                onClick={() => pagination.onPageChange(pageIndex - 1)}
                disabled={pageIndex === 0}
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </PaginationButton>

              {buildPageNumbers(pageIndex, totalPages).map((page, i) =>
                page === null ? (
                  <span key={`ellipsis-${i}`} className="w-9 text-center text-muted-foreground font-bold">
                    …
                  </span>
                ) : (
                  <PaginationButton
                    key={page}
                    onClick={() => pagination.onPageChange(page)}
                    isActive={page === pageIndex}
                  >
                    {page + 1}
                  </PaginationButton>
                )
              )}

              <PaginationButton
                onClick={() => pagination.onPageChange(pageIndex + 1)}
                disabled={pageIndex >= totalPages - 1}
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </PaginationButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Pagination helpers ─────────────────────────────────────────── */

interface PaginationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

const PaginationButton = ({ isActive, className, ...props }: PaginationButtonProps) => (
  <button
    type="button"
    className={cn(
      'flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-bold transition-all',
      'hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40',
      isActive
        ? 'border-transparent bg-primary text-primary-foreground shadow-md shadow-primary/20'
        : 'border-border bg-background text-foreground/70 hover:bg-accent',
      className
    )}
    {...props}
  />
);

/** Returns an array of page indices (0-based) with null for ellipsis */
function buildPageNumbers(current: number, total: number): (number | null)[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i);

  const pages: (number | null)[] = [0];

  if (current > 2) pages.push(null);

  const start = Math.max(1, current - 1);
  const end = Math.min(total - 2, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 3) pages.push(null);

  pages.push(total - 1);
  return pages;
}
