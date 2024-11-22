import React from 'react';
import { LayoutGrid, Plus, Table } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';
import SortBuilder from './SortBuilder';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SortingColumn } from '@/lib/types';
import FilterBuilder from './FilterBuilder';

export function HeaderOptionsMenu({
  view,
  setView,
  columns,
  handleApplySorting,
  filteredColumns,
  sortingColumns,
}: {
  view: 'table' | 'card';
  setView: (view: 'table' | 'card') => void;
  columns: string[];
  handleApplySorting: (data: SortingColumn[]) => void;
  filteredColumns: number;
  sortingColumns: number;
}) {
  return (
    <div className='flex items-center justify-between w-full px-4 py-3 border-b'>
      <div className='flex items-center gap-2'>
        <SidebarTrigger className='block md:hidden' />

        <Toggle
          variant='outline'
          size='sm'
          pressed={view === 'table'}
          onPressedChange={() => setView('table')}
          className={cn(
            'border-none shadow-none text-xs',
            view !== 'table' ? 'text-muted-foreground' : ''
          )}
        >
          <Table className='w-4 h-4' /> Table
        </Toggle>
        <Toggle
          variant='outline'
          size='sm'
          pressed={view === 'card'}
          onPressedChange={() => setView('card')}
          className={cn(
            'border-none shadow-none text-xs',
            view !== 'card' ? 'text-muted-foreground' : ''
          )}
        >
          <LayoutGrid className='w-4 h-4' /> Card
        </Toggle>
      </div>
      <div className='flex items-center gap-2'>
        <FilterBuilder
          columns={columns}
          // handleApplyFiltering={handleApplyFiltering}
          filteredColumns={filteredColumns}
        />
        <SortBuilder
          columns={columns}
          handleApplySorting={handleApplySorting}
          sortingColumns={sortingColumns}
        />
        <Separator orientation='vertical' className='h-4' />
        <Button size='sm'>
          <Plus className='w-4 h-4' /> Insert
        </Button>
      </div>
    </div>
  );
}
