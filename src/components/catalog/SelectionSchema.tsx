import React, { Dispatch, SetStateAction, useState } from 'react';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useTables } from '@/hooks/metadata.hooks';
import { Skeleton } from '@/components/ui/skeleton';
import TableSelect from './TableSelect';
import { Checkbox } from '@/components/ui/checkbox';
import { useParams } from 'next/navigation';

export function SelectionSchema({
  name,
  selectedTables,
  setSelectedTables,
}: {
  name: string;
  selectedTables: { [key: string]: string[] };
  setSelectedTables: Dispatch<SetStateAction<{ [key: string]: string[] }>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { data: tables, isLoading } = useTables(id, name, isOpen);
  return (
    <div>
      <AccordionItem value={name} className='border-none'>
        <AccordionTrigger
          className='py-2'
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <div className='flex items-center gap-2'>
            <Checkbox
              className='size-4'
              checked={
                Object.keys(selectedTables).includes(name)
                  ? selectedTables[name].length === tables?.length
                    ? true
                    : 'indeterminate'
                  : false
              }
              onCheckedChange={(checked) => {
                setSelectedTables((prev) => {
                  if (checked) {
                    return {
                      ...prev,
                      [name]: [...(tables?.map((table) => table.name) || [])],
                    };
                  }
                  const { [name]: _, ...rest } = prev;
                  return rest;
                });
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              disabled={!tables?.length || isLoading}
            />
            <h1 className='text-base font-medium'>{name}</h1>
          </div>
        </AccordionTrigger>
        <AccordionContent className='pl-6 relative py-1'>
          <div
            dir='ltr'
            className='h-full w-px bg-muted absolute left-1.5 rtl:right-1.5 py-3 rounded-md hover:bg-slate-300 duration-300 ease-in-out'
            aria-hidden='true'
          ></div>
          <div className='flex flex-col gap-2'>
            {isLoading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className='h-4 w-full'
                  style={{
                    width: `${50 + ((index * 17) % 41)}%`,
                  }}
                />
              ))
            ) : tables?.length ? (
              tables?.map((table) => (
                <TableSelect
                  key={table.name}
                  name={table.name}
                  selected={selectedTables[name] || []}
                  schema={name}
                  handleSelect={setSelectedTables}
                />
              ))
            ) : (
              <p className='text-sm text-muted-foreground'>
                No tables available in this schema
              </p>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}
