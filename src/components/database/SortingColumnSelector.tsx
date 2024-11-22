import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { SortingColumn } from '@/lib/types';
import { SortingType } from '@/lib/utils';

export function SortingColumnSelector({
  columns,
  selectedColumn,
  setSelectedColumn,
}: {
  columns: string[];
  selectedColumn: SortingColumn[];
  setSelectedColumn: (column: SortingColumn[]) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex items-center gap-1'>
        <p className='text-xs font-medium'>Pick a column for sorting</p>
        <ChevronDown className='w-4 h-4' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-48'>
        {columns
          .filter((column) => !selectedColumn.some((c) => c.name === column))
          .map((column) => (
            <DropdownMenuItem asChild key={column}>
              <Button
                variant='ghost'
                className='w-full justify-start cursor-pointer text-xs'
                size='sm'
                onClick={() => {
                  setSelectedColumn([
                    ...selectedColumn,
                    { name: column, type: SortingType.ASC },
                  ]);
                }}
              >
                {column}
              </Button>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
