import React from 'react';
import { Filter, LayoutGrid, Plus, Table } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';
import SortBuilder from './SortBuilder';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { FilterColumn, SortingColumn } from '@/lib/types';
import FilterBuilder from './FilterBuilder';
import { Input } from '@/components/ui/input';

export function HeaderOptionsMenu({
  view,
  setView,
  columns,
  handleApplySorting,
  filteredColumns,
  sortingColumns,
  handleApplyFilter,
  editable,
  engineerMode,
  setSearch,
}: {
  view: 'table' | 'card';
  setView: (view: 'table' | 'card') => void;
  columns: string[];
  handleApplySorting: (data: SortingColumn[]) => void;
  filteredColumns: number;
  sortingColumns: number;
  handleApplyFilter: (data: FilterColumn[]) => void;
  editable: boolean;
  engineerMode: boolean;
  setSearch: (search: string) => void;
}) {
  return (
    <div className='flex items-center justify-between w-full px-4 py-3 border-b bg-background'>
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
        {engineerMode ? null : (
          <Input
            placeholder='Search for anything...'
            onChange={(e) => setSearch(e.target.value)}
            className='w-[350px] h-full'
          />
        )}
        {engineerMode ? (
          <>
            <FilterBuilder
              columns={columns}
              handleApplyFilter={handleApplyFilter}
              filteredColumns={filteredColumns}
            />
            <SortBuilder
              columns={columns}
              handleApplySorting={handleApplySorting}
              sortingColumns={sortingColumns}
            />
          </>
        ) : (
          null
        )}
        {editable ? (
          <>
            <Separator orientation='vertical' className='h-4' />
            <Button size='sm'>
              <Plus className='w-4 h-4' /> Insert
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
}
