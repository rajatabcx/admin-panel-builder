'use client';
import React from 'react';
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
import { useParams } from 'next/navigation';
import { useProject } from '@/hooks/project.hooks';
import { Skeleton } from '../ui/skeleton';

export function Header() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useProject(id, !!id);
  return (
    <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
      <SidebarTrigger className='-ml-1' />
      <Separator orientation='vertical' className='mr-2 h-4' />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className='hidden md:block'>
            <BreadcrumbLink href={`/dashboard/${id}`}>
              {isLoading ? <Skeleton className='w-20 h-5' /> : data?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className='hidden md:block' />
          <BreadcrumbItem>
            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
