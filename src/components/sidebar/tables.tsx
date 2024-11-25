import React from 'react';
import { useTables } from '@/hooks/metadata.hooks';
import {
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { CollapsibleContent } from '@/components/ui/collapsible';
import { Table2 } from 'lucide-react';
import Link from 'next/link';

export function Tables({ selectedSchema }: { selectedSchema: string }) {
  const { data: tables, isLoading } = useTables(
    selectedSchema,
    !!selectedSchema
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
            <SidebarMenuSubItem key={table}>
              <SidebarMenuSubButton asChild>
                <Link
                  href={`/dashboard/1/${selectedSchema}/table/${table}`}
                  className='flex items-center gap-2'
                >
                  <Table2 className='w-4 h-4' />
                  <span>{table}</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))
        )}
      </SidebarMenuSub>
    </CollapsibleContent>
  );
}
