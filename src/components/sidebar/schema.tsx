'use client';

import { TableProperties } from 'lucide-react';

import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useState } from 'react';
import { Tables } from './tables';
import { useParams } from 'next/navigation';

export function Schema({
  schemas,
  defaultSchema,
}: {
  schemas: string[];
  defaultSchema: string;
}) {
  const { schema } = useParams<{ schema: string }>();

  const [selectedSchema, setSelectedSchema] = useState(schema || defaultSchema);

  return (
    <>
      <Select
        value={selectedSchema}
        onValueChange={(value) => setSelectedSchema(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder='Select a schema' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className='text-sm p-1'>Schemas</SelectLabel>
            {!schemas.length ? (
              <p className='text-sm p-1'>No schemas found</p>
            ) : (
              schemas.map((schema) => (
                <SelectItem value={schema} key={schema}>
                  {schema}
                </SelectItem>
              ))
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Collapsible asChild open={true} className='group/collapsible'>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip='Tables' className='hover:!bg-sidebar'>
              <TableProperties className='size-5' />
              <span>Tables</span>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <Tables selectedSchema={selectedSchema} />
        </SidebarMenuItem>
      </Collapsible>
    </>
  );
}
