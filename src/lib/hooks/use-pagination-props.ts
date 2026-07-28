import { useState } from 'react';
import { PaginationProps } from '@/components/common/dynamic-table-container';

export function usePaginationProps({
  totalData = 0,
  initialPage = 1,
  initialLimit = 10,
  onPageChange,
  onLimitChange,
}: {
  totalData: number;
  initialPage?: number;
  initialLimit?: number;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}): PaginationProps {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const totalPage = Math.ceil(totalData / limit) || 1;
  const firstNo = (page - 1) * limit + 1;
  const currentRangeDataLength = Math.max(0, Math.min(limit, totalData - firstNo + 1));

  return {
    current_page: page,
    total_page: totalPage,
    total_data: totalData,
    total: totalData,
    limit_per_page: limit,
    dataLength: currentRangeDataLength,
    onLimitChange: (value: string) => {
      const newLimit = Number(value);
      setLimit(newLimit);
      setPage(1);
      if (onLimitChange) onLimitChange(newLimit);
    },
    onNextPage: (currentPage: number) => {
      const next = currentPage + 1;
      setPage(next);
      if (onPageChange) onPageChange(next);
    },
    onPrevPage: (currentPage: number) => {
      const prev = Math.max(1, currentPage - 1);
      setPage(prev);
      if (onPageChange) onPageChange(prev);
    },
  };
}
