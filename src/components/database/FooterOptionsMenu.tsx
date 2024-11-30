import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, HardHat, RefreshCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { Toggle } from '@/components/ui/toggle';

export function FooterOptionsMenu({
  pagination,
  setPagination,
  total,
  pageCount,
  isLoading,
  setSelected,
  engineerMode,
  setEngineerMode,
}: {
  pagination: { page: number; limit: number };
  setPagination: (pagination: { page: number; limit: number }) => void;
  total: number;
  pageCount: number;
  isLoading: boolean;
  setSelected: Dispatch<SetStateAction<string[]>>;
  engineerMode: boolean;
  setEngineerMode: Dispatch<SetStateAction<boolean>>;
}) {
  const [paginationState, setPaginationState] = useState({
    total,
    pageCount,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!!total) {
      setPaginationState((prev) => ({ ...prev, total }));
    }
    if (!!pageCount) {
      setPaginationState((prev) => ({ ...prev, pageCount }));
    }
  }, [total, pageCount]);

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['rows'] });
  };

  return (
    <div className='flex items-center justify-between w-full px-4 py-2 border-t gap-2 bg-background'>
      <div>
        <Button
          variant='ghost'
          size='sm'
          onClick={handleRefresh}
          disabled={isLoading}
        >
          <RefreshCcw
            className={cn('w-4 h-4', isLoading ? 'animate-spin' : null)}
          />{' '}
          Refresh
        </Button>
        <Toggle
          defaultChecked={engineerMode}
          onClick={() => setEngineerMode(!engineerMode)}
        >
          <HardHat className='w-4 h-4' />
          Engineer Mode
        </Toggle>
      </div>
      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          size='icon'
          disabled={pagination.page === 1 || isLoading}
          onClick={() => {
            setSelected([]);
            setPagination({ ...pagination, page: pagination.page - 1 });
          }}
        >
          <ArrowLeft className='w-4 h-4' />
        </Button>
        <span className='text-xs text-muted-foreground'>
          page {pagination.page} of{' '}
          {!paginationState.pageCount ? 1 : paginationState.pageCount}
        </span>
        <Button
          variant='outline'
          size='icon'
          disabled={
            !paginationState.pageCount ||
            pagination.page === paginationState.pageCount ||
            isLoading
          }
          onClick={() => {
            setSelected([]);
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
                setSelected([]);
                setPagination({ page: 1, limit: Number(value) });
              }}
            >
              <DropdownMenuRadioItem value='50'>50</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='100'>100</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='250'>250</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='500'>500</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='1000'>1000</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <span className='text-xs text-muted-foreground'>
          {paginationState.total} rows
        </span>
      </div>
    </div>
  );
}
