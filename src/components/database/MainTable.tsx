import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCellValue } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import ExpandedData from './ExpandedData';

export function MainTable({
  data,
  headers,
}: {
  data: any[];
  headers: { name: string; type: string }[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[65px] border-l border-r'>#</TableHead>
          {headers.map((header) => (
            <TableHead
              key={header.name}
              className='w-[250px] border-r border-l'
            >
              <p className='flex items-center gap-2'>
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
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell className='w-[65px] group border-l border-r'>
              <div className='flex items-center gap-3'>
                <Checkbox className='border-muted-foreground' />
                <ExpandedData data={row} />
              </div>
            </TableCell>
            {headers.map((header) => (
              <TableCell
                key={header.name}
                className='w-[250px] truncate border-r border-l'
              >
                <div className='line-clamp-1'>
                  {formatCellValue(row[header.name], header.type)}
                </div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
