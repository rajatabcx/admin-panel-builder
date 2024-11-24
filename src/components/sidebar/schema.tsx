'use client';

import { Database, TableProperties } from 'lucide-react';

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
import { Tables } from './tables';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export function Schema({
  schemas,
  defaultSchema,
}: {
  schemas: string[];
  defaultSchema: string;
}) {
  const router = useRouter();
  const { schema } = useParams<{ schema: string; id: string }>();

  return (
    <>
      <Select
        value={schema || defaultSchema}
        onValueChange={(value) => {
          router.push(`/dashboard/1/${value}`);
        }}
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
      <SidebarMenuItem>
        <SidebarMenuButton tooltip='Database' asChild>
          <Link href={`/dashboard/1/${schema || defaultSchema}/database`}>
            <Database className='size-5' />
            <span>Database</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <Collapsible asChild open={true} className='group/collapsible'>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip='Tables' className='hover:!bg-sidebar'>
              <TableProperties className='size-5' />
              <span>Tables</span>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <Tables selectedSchema={schema || defaultSchema} />
        </SidebarMenuItem>
      </Collapsible>
    </>
  );
}
