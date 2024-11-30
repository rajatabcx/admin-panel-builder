import React, { useState } from 'react';
import { ArrowUpDown, X } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SortingColumnSelector } from './SortingColumnSelector';
import { Switch } from '@/components/ui/switch';
import { SortingColumn } from '@/lib/types';
import { SortingType } from '@/lib/utils';

export default function SortBuilder({
  columns,
  handleApplySorting,
  sortingColumns,
}: {
  columns: string[];
  handleApplySorting: (data: SortingColumn[]) => void;
  sortingColumns: number;
}) {
  const [selectedColumn, setSelectedColumn] = useState<SortingColumn[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant={!!sortingColumns ? 'secondary' : 'ghost'} size='sm'>
          <ArrowUpDown className='w-4 h-4' />{' '}
          {!!sortingColumns ? `Sorted by ${sortingColumns} rules` : 'Sort'}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side='bottom'
        align='end'
        sideOffset={12}
        className='w-[385px] border bg-primary-foreground'
      >
        {!!selectedColumn.length ? (
          selectedColumn.map((column, index) => (
            <div
              className='flex items-center justify-between py-2'
              key={column.name}
            >
              <p className='text-xs font-medium'>
                <span className='text-muted-foreground'>
                  {index > 0 ? 'then' : 'sort'} by:
                </span>{' '}
                {column.name}
              </p>
              <div className='flex items-center gap-1'>
                <p className='text-xs text-muted-foreground flex items-center gap-1'>
                  Ascending:{' '}
                  <Switch
                    checked={column.type === SortingType.ASC}
                    onCheckedChange={(check) => {
                      setSelectedColumn(
                        selectedColumn.map((c, i) =>
                          i === index
                            ? {
                                ...c,
                                type: check
                                  ? SortingType.ASC
                                  : SortingType.DESC,
                              }
                            : c
                        )
                      );
                    }}
                    className=''
                  />
                </p>
                <Button
                  variant='ghost'
                  size='sm'
                  className='p-0 h-auto hover:bg-transparent'
                  onClick={() => {
                    setSelectedColumn(
                      selectedColumn.filter((_, i) => i !== index)
                    );
                  }}
                >
                  <X className='w-4 h-4' />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <>
            <h1 className='text-sm font-medium'>
              No sort applied to this view
            </h1>
            <p className='text-xs text-muted-foreground'>
              Add a column below to sort the view.
            </p>
          </>
        )}
        <Separator className='my-2' />
        <div className='flex items-center justify-between'>
          <SortingColumnSelector
            columns={columns}
            selectedColumn={selectedColumn}
            setSelectedColumn={setSelectedColumn}
          />

          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              handleApplySorting(selectedColumn);
              setIsOpen(false);
            }}
          >
            Apply sorting
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
