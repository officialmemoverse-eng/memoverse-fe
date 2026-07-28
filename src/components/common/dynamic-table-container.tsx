'use client';

import { FC, PropsWithChildren, useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Flex, Button } from '@mysuf1020/mylib-ui';
import { cn } from '@/lib/utils';
export type Pagination = {
  current_page: number;
  limit_per_page: number;
  total?: number;
  total_page?: number;
  total_data?: number;
};

export type PaginationProps = Pagination & {
  dataLength: number;
  onLimitChange?: (value: string) => void;
  onNextPage?: (currentPage: number) => void;
  onPrevPage?: (currentPage: number) => void;
};

type DynamicTableContainerProps = {
  controls?: React.ReactNode;
  table?: React.ReactElement;
  pagination?: PaginationProps;
  className?: string;
};

export const DynamicTableContainer: FC<PropsWithChildren<DynamicTableContainerProps>> = ({
  controls,
  table,
  pagination,
  className,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const currentPage = Number(pagination?.current_page || 1);
  const totalPages = pagination?.total_page || 1;
  const firstNo = pagination
    ? pagination.limit_per_page * pagination.current_page - pagination.limit_per_page + 1
    : 0;
  const lastNo = pagination && pagination.dataLength ? firstNo + pagination.dataLength - 1 : 0;
  const dropdownItems = ['10', '25', '50'];

  return (
    <div className={cn('flex flex-col gap-4 transition-none w-full', className)}>
      {controls && <div className="w-full">{controls}</div>}

      {/* Table Box Container - White Background fits exact table dimensions */}
      {/* onClickCapture prevents 3-dots action button clicks from triggering row detail onClickRow */}
      <div
        className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden"
        onClickCapture={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest('.mylib-table-action') || target.closest('[data-slot="dropdown-menu-content"]')) {
            e.stopPropagation();
          }
        }}
      >
        <div className="w-full overflow-x-auto">
          {table}
        </div>
      </div>

      {/* Pagination Container at bottom right */}
      <div className="shrink-0 pt-1">
        {pagination && (
          <Flex alignItems="center" justifyContent="end" gap="6" className="w-full text-xs text-slate-600 font-medium">
            <Flex alignItems="center" gap="2" className="relative">
              <span className="text-slate-600 font-normal">Baris per halaman</span>
              <button
                type="button"
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex items-center gap-1 font-semibold text-slate-800 hover:text-slate-900 cursor-pointer focus:outline-none px-1 py-0.5 rounded-md hover:bg-slate-200/50 transition-colors"
              >
                <span>{pagination.limit_per_page}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-700 shrink-0" />
              </button>

              {openDropdown && (
                <div className="absolute bottom-full right-0 mb-1 w-20 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50 animate-in fade-in zoom-in-95">
                  {dropdownItems.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        pagination.onLimitChange?.(item);
                        setOpenDropdown(false);
                      }}
                      className={cn(
                        'w-full text-left px-3 py-1 text-xs hover:bg-slate-50 transition-colors font-medium',
                        String(pagination.limit_per_page) === item ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-slate-700'
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </Flex>

            <Flex alignItems="center" gap="1.5" className="text-slate-700">
              <span className="font-medium">{pagination?.total_data === 0 ? 0 : firstNo}-{lastNo}</span>
              <span className="text-slate-500 font-normal">dari</span>
              <span className="font-medium">{pagination?.total_data}</span>
            </Flex>

            <Flex alignItems="center" gap="1">
              <Button
                variant="ghost"
                size="icon-sm"
                disabled={currentPage <= 1}
                onClick={() => pagination?.onPrevPage?.(currentPage)}
                className="h-8 w-8 rounded-lg hover:bg-slate-200/50 disabled:opacity-30 cursor-pointer flex items-center justify-center"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                disabled={currentPage >= totalPages}
                onClick={() => pagination?.onNextPage?.(currentPage)}
                className="h-8 w-8 rounded-lg hover:bg-slate-200/50 disabled:opacity-30 cursor-pointer flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </Button>
            </Flex>
          </Flex>
        )}
      </div>
    </div>
  );
};
