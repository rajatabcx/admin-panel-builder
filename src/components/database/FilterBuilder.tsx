import React, { useState } from 'react';
import { Filter, Plus, X } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FilterColumn, FilterOperatorSymbol } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { filterOperators } from '@/lib/constants';

export default function FilterBuilder({
  filteredColumns,
  columns,
}: {
  filteredColumns: number;
  columns: string[];
}) {
  const [selectedColumn, setSelectedColumn] = useState<FilterColumn[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant={!!filteredColumns ? 'outline' : 'ghost'} size='sm'>
          <Filter className='w-4 h-4' />{' '}
          {!!filteredColumns
            ? `Filtered by ${filteredColumns} rules`
            : 'Filter'}
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
              className='flex items-center justify-between py-2 gap-2'
              key={index}
            >
              <Select
                value={column.name}
                onValueChange={(value) => {
                  setSelectedColumn(
                    selectedColumn.map((c, idx) =>
                      idx === index ? { ...c, name: value } : c
                    )
                  );
                }}
              >
                <SelectTrigger className='w-[128px] text-xs py-0 px-2'>
                  <span className='line-clamp-1 w-full text-left max-w-[80px]'>
                    {column.name}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {columns.map((column) => (
                    <SelectItem value={column} key={column}>
                      {column}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={column.operator}
                onValueChange={(value) => {
                  setSelectedColumn(
                    selectedColumn.map((c, idx) =>
                      idx === index
                        ? {
                            ...c,
                            operator: value as FilterOperatorSymbol,
                          }
                        : c
                    )
                  );
                }}
              >
                <SelectTrigger className='min-w-[52px] text-xs py-0 px-2'>
                  <span>{column.operator}</span>
                </SelectTrigger>
                <SelectContent>
                  {filterOperators.map((operator) => (
                    <SelectItem value={operator.symbol} key={operator.symbol}>
                      {operator.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                className='w-[150px] text-xs py-0 px-2'
                placeholder='value'
                value={column.value}
                onChange={(e) => {
                  setSelectedColumn(
                    selectedColumn.map((c, idx) =>
                      idx === index ? { ...c, value: e.target.value } : c
                    )
                  );
                }}
              />
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
          ))
        ) : (
          <>
            <h1 className='text-sm font-medium'>
              No filter applied to this view
            </h1>
            <p className='text-xs text-muted-foreground'>
              Add a column below to filter the view.
            </p>
          </>
        )}
        <Separator className='my-2' />
        <div className='flex items-center justify-between'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              setSelectedColumn([
                ...selectedColumn,
                { name: columns[0], operator: '=', value: '' },
              ]);
            }}
            className='flex items-center gap-1'
          >
            Add filter <Plus className='w-4 h-4' />
          </Button>

          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              //   handleApplyFiltering(selectedColumn);
              setIsOpen(false);
            }}
          >
            Apply Filter
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
