'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Flex, Typography, Button } from '@mysuf1020/mylib-ui';

export interface TablePaginationProps {
  totalData: number;
  currentPage?: number;
  limitPerPage?: number;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

export function TablePagination({
  totalData,
  currentPage = 1,
  limitPerPage = 10,
  onPageChange,
  onLimitChange,
}: TablePaginationProps) {
  const [limit, setLimit] = useState(limitPerPage);
  const totalPages = Math.ceil(totalData / limit) || 1;
  const firstNo = totalData === 0 ? 0 : (currentPage - 1) * limit + 1;
  const lastNo = Math.min(currentPage * limit, totalData);

  return (
    <Flex justifyContent="end" alignItems="center" gap="6" className="pt-3 px-2 text-xs text-slate-600 font-medium">
      <Flex alignItems="center" gap="2">
        <Typography level="sm" className="text-slate-600">Baris per halaman</Typography>
        <select
          value={limit}
          onChange={(e) => {
            const newLimit = Number(e.target.value);
            setLimit(newLimit);
            onLimitChange?.(newLimit);
          }}
          className="bg-transparent border-0 font-semibold text-slate-800 focus:outline-none cursor-pointer text-xs pr-1"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </Flex>

      <Flex alignItems="center" gap="1.5" className="text-slate-700">
        <span>{firstNo}-{lastNo}</span>
        <span>dari</span>
        <span>{totalData}</span>
      </Flex>

      <Flex alignItems="center" gap="1">
        <Button
          variant="ghost"
          size="icon-sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange?.(currentPage - 1)}
          className="h-8 w-8 rounded-lg hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-slate-700" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
          className="h-8 w-8 rounded-lg hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 text-slate-700" />
        </Button>
      </Flex>
    </Flex>
  );
}
