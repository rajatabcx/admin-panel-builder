import React, { Dispatch, SetStateAction } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  ArrowUpDown,
  CircleX,
  EyeOff,
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
} from 'lucide-react';
import { SortingColumn } from '@/lib/types';
import { SortingType } from '@/lib/utils';

export default function SortingMenu({
  columnName,
  columnType,
  setHiddenColumns,
  sortingColumns,
  setSortingColumns,
}: {
  columnName: string;
  columnType: string;
  setHiddenColumns: Dispatch<SetStateAction<string[]>>;
  sortingColumns: SortingColumn[];
  setSortingColumns: Dispatch<SetStateAction<SortingColumn[]>>;
}) {
  const existingSorting = sortingColumns.find(
    (sort) => sort.name === columnName
  );
  // TODO: update the sorting icons for different types of columns
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          {existingSorting?.type === SortingType.ASC ? (
            <ArrowDownNarrowWide className='w-4 h-4' />
          ) : existingSorting?.type === SortingType.DESC ? (
            <ArrowDownWideNarrow className='w-4 h-4' />
          ) : (
            <ArrowUpDown className='w-4 h-4' />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='bottom' align='start'>
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => {
            setSortingColumns((prev) => {
              if (existingSorting) {
                if (existingSorting.type === SortingType.DESC) {
                  return prev.map((sort) =>
                    sort.name === columnName
                      ? { name: columnName, type: SortingType.ASC }
                      : sort
                  );
                }
                return prev;
              }

              return [...prev, { name: columnName, type: SortingType.ASC }];
            });
          }}
        >
          <ArrowDownNarrowWide className='w-4 h-4' /> Sort Ascending
        </DropdownMenuItem>
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => {
            setSortingColumns((prev) => {
              if (existingSorting) {
                if (existingSorting.type === SortingType.ASC) {
                  return prev.map((sort) =>
                    sort.name === columnName
                      ? { name: columnName, type: SortingType.DESC }
                      : sort
                  );
                }
                return prev;
              }

              return [...prev, { name: columnName, type: SortingType.DESC }];
            });
          }}
        >
          <ArrowDownWideNarrow className='w-4 h-4' /> Sort Descending
        </DropdownMenuItem>
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => {
            setSortingColumns((prev) =>
              prev.filter((sort) => sort.name !== columnName)
            );
          }}
        >
          <CircleX className='w-4 h-4' /> Clear Sorting
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => setHiddenColumns((prev) => [...prev, columnName])}
        >
          <EyeOff className='w-4 h-4' /> Hide Column
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
