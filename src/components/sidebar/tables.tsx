import React from 'react';
import { useTables } from '@/hooks/metadata.hooks';
import {
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { CollapsibleContent } from '@/components/ui/collapsible';
import { Eye, Table2, TableColumnsSplit } from 'lucide-react';
import Link from 'next/link';

export function Tables({
  id,
  selectedSchema,
}: {
  id: string;
  selectedSchema: string;
}) {
  const { data: tables, isLoading } = useTables(
    id,
    selectedSchema,
    !!selectedSchema || !!id
  );

  return (
    <CollapsibleContent>
      <SidebarMenuSub>
        {isLoading ? (
          Array(5)
            .fill(0)
            .map((_, index) => (
              <SidebarMenuSkeleton key={index} index={index} showIcon />
            ))
        ) : !tables?.length ? (
          <SidebarMenuSubItem className='text-sm text-muted-foreground'>
            No tables found
          </SidebarMenuSubItem>
        ) : (
          tables.map((table) => (
            <SidebarMenuSubItem key={table.name}>
              <SidebarMenuSubButton asChild>
                <Link
                  href={`/dashboard/${id}/${selectedSchema}/${table.name}`}
                  className='flex items-center gap-2'
                >
                  {table.type === 'partitioned_table' ? (
                    <TableColumnsSplit className='w-4 h-4 text-muted-foreground' />
                  ) : table.type === 'view' ? (
                    <Eye className='w-4 h-4 text-muted-foreground' />
                  ) : (
                    <Table2 className='w-4 h-4 text-muted-foreground' />
                  )}

                  <span>{table.name}</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))
        )}
      </SidebarMenuSub>
    </CollapsibleContent>
  );
}
