import React from 'react';
import { ArrowUpDown, Filter, LayoutGrid, Plus, Table } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

export function HeaderOptionsMenu({
  view,
  setView,
}: {
  view: 'table' | 'card';
  setView: (view: 'table' | 'card') => void;
}) {
  return (
    <div className='flex items-center justify-between w-full px-4 py-3 border-b'>
      <div className='flex items-center gap-2'>
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
        <Button variant='ghost' size='sm'>
          <Filter className='w-4 h-4' />
        </Button>
        <Button variant='ghost' size='sm'>
          <ArrowUpDown className='w-4 h-4' />
        </Button>
        <Separator orientation='vertical' className='h-4' />
        <Button size='sm'>
          <Plus className='w-4 h-4' /> Insert
        </Button>
      </div>
    </div>
  );
}
