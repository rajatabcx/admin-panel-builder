import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn, formatCellValue } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import ExpandedData from './ExpandedData';
import { Card } from '@/components/ui/card';

export function MainTable({
  data,
  headers,
  selected,
  setSelected,
  errorMessage,
  error,
  tableName,
}: {
  data: any[];
  headers: { name: string; type: string }[];
  selected: string[];
  setSelected: (selected: string[]) => void;
  errorMessage: string;
  error: boolean;
  tableName: string;
}) {
  if (!headers.length) {
    return <Card>{error ? errorMessage : 'No data found'}</Card>;
  }

  return (
    <Table className='border-l'>
      <TableHeader>
        <TableRow>
          <TableHead className='border-l border-r'>
            <div className='w-[65px]'>
              <Checkbox
                checked={
                  selected.length
                    ? selected.length === data.length
                      ? true
                      : 'indeterminate'
                    : false
                }
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelected(data.map((row) => row.id));
                  } else {
                    setSelected([]);
                  }
                }}
              />
            </div>
          </TableHead>
          {headers.map((header) => (
            <TableHead key={header.name} className='border-r border-l'>
              <p className='flex items-center gap-2 w-[250px] truncate'>
                {header.name}
                <span className='text-xs text-muted-foreground'>
                  ({header.type})
                </span>
              </p>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {!data.length ? (
          <TableRow>
            <TableCell colSpan={headers.length + 1}>
              <p className='text-center text-base text-muted-foreground'>
                {error ? errorMessage : 'No data found'}
              </p>
            </TableCell>
          </TableRow>
        ) : (
          data.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell
                className={cn(
                  'group border-l border-r',
                  index === data.length - 1 ? 'border-b' : ''
                )}
              >
                <div className='flex items-center gap-4 w-[65px]'>
                  <Checkbox
                    className='border-muted-foreground'
                    checked={selected.includes(row.id)}
                    onCheckedChange={(checked) => {
                      setSelected(
                        checked
                          ? [...selected, row.id]
                          : selected.filter((id) => id !== row.id)
                      );
                    }}
                  />
                  <ExpandedData data={row} tableName={tableName} updating />
                </div>
              </TableCell>
              {headers.map((header) => (
                <TableCell
                  key={header.name}
                  className={cn(
                    'truncate border-r border-l',
                    index === data.length - 1 ? 'border-b' : ''
                  )}
                >
                  <div className='w-[250px] truncate'>
                    {formatCellValue(row[header.name], header.type)}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
