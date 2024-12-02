'use client';
import React, { Fragment } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useParams, usePathname } from 'next/navigation';
import { useProject } from '@/hooks/project.hooks';
import { Skeleton } from '../ui/skeleton';
import { handlePage } from '@/lib/utils';

export function Header() {
  const { id, schema, table } = useParams<{
    id: string;
    schema?: string;
    table?: string;
  }>();
  const { data, isLoading } = useProject(id, !!id);
  const pathname = usePathname();

  const crumbs = handlePage(pathname, schema, table);

  return (
    <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
      <SidebarTrigger className='-ml-1' />
      <Separator orientation='vertical' className='mr-2 h-4' />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/dashboard/${id}`}>
              {isLoading ? <Skeleton className='w-20 h-5' /> : data?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {Array.isArray(crumbs) ? (
            crumbs.map((crumb, index) => (
              <Fragment key={crumb}>
                <BreadcrumbItem>
                  <BreadcrumbPage>{crumb}</BreadcrumbPage>
                </BreadcrumbItem>
                {index !== crumbs.length - 1 ? <BreadcrumbSeparator /> : null}
              </Fragment>
            ))
          ) : (
            <BreadcrumbItem>
              <BreadcrumbPage>{crumbs}</BreadcrumbPage>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
