import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function FooterOptionsMenu({
  pagination,
  setPagination,
  total,
  pageCount,
  isLoading,
}: {
  pagination: { page: number; limit: number };
  setPagination: (pagination: { page: number; limit: number }) => void;
  total: number;
  pageCount: number;
  isLoading: boolean;
}) {
  const [paginationState, setPaginationState] = useState({
    total,
    pageCount,
  });

  useEffect(() => {
    if (!!total) {
      setPaginationState((prev) => ({ ...prev, total }));
    }
    if (!!pageCount) {
      setPaginationState((prev) => ({ ...prev, pageCount }));
    }
  }, [total, pageCount]);

  return (
    <div className='flex items-center justify-end w-full px-4 py-2 border-t gap-2'>
      <Button
        variant='outline'
        size='icon'
        disabled={pagination.page === 1 || isLoading}
        onClick={() => {
          setPagination({ ...pagination, page: pagination.page - 1 });
        }}
      >
        <ArrowLeft className='w-4 h-4' />
      </Button>
      <span className='text-xs text-muted-foreground'>
        page {pagination.page} of {paginationState.pageCount}
      </span>
      <Button
        variant='outline'
        size='icon'
        disabled={pagination.page === pageCount || isLoading}
        onClick={() => {
          setPagination({ ...pagination, page: pagination.page + 1 });
        }}
      >
        <ArrowRight className='w-4 h-4' />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='sm' disabled={isLoading}>
            {pagination.limit} Rows
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup
            value={pagination.limit.toString()}
            onValueChange={(value) => {
              setPagination({ page: 1, limit: Number(value) });
            }}
          >
            <DropdownMenuRadioItem value='50'>50</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='100'>100</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='250'>250</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='500'>500</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <span className='text-xs text-muted-foreground'>
        {paginationState.total} rows
      </span>
    </div>
  );
}
