import React from 'react';
import { Button } from '../ui/button';
import { FileSpreadsheet, Trash2 } from 'lucide-react';

export function SelectedHeaderOptions({
  selected,
  handleExportCsv,
}: {
  selected: string[];
  handleExportCsv: () => void;
}) {
  return (
    <div className='flex items-center gap-2 px-4 py-3 w-full border-b'>
      <Button
        variant='destructive'
        className='flex items-center gap-2'
        size='sm'
      >
        <Trash2 className='w-4 h-4' /> Delete {selected.length} rows
      </Button>
      <Button
        size='sm'
        className='flex items-center gap-2'
        onClick={handleExportCsv}
      >
        Export CSV <FileSpreadsheet className='w-4 h-4' />
      </Button>
    </div>
  );
}
