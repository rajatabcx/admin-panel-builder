'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';

import { FooterOptionsMenu } from '@/components/database/FooterOptionsMenu';
import { HeaderOptionsMenu } from '@/components/database/HeaderOptionsMenu';
import { MainTable } from '@/components/database/MainTable';
import { Skeleton } from '@/components/ui/skeleton';
import { useTableData } from '@/hooks/metadata.hooks';

export default function TablePage() {
  const { table, schema } = useParams<{
    id: string;
    table: string;
    schema: string;
  }>();

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 100,
  });
  const [view, setView] = useState<'table' | 'card'>('table');

  const { data, isLoading } = useTableData(
    schema,
    table,
    pagination.page,
    pagination.limit,
    !!schema && !!table
  );

  return (
    <div className='w-full h-screen flex flex-col'>
      {/* header options menu */}
      <HeaderOptionsMenu view={view} setView={setView} />
      {/*main table  */}
      <div className='flex-1 overflow-auto'>
        {isLoading ? (
          <div className='px-4 py-2 space-y-2'>
            <Skeleton className='w-full h-6' />
            <Skeleton className='w-[80%] h-6' />
            <Skeleton className='w-[60%] h-6' />
            <Skeleton className='w-[40%] h-6' />
            <Skeleton className='w-[20%] h-6' />
          </div>
        ) : (
          <MainTable data={data?.data || []} headers={data?.columns || []} />
        )}
      </div>
      {/* footer options menu */}
      <FooterOptionsMenu
        pagination={pagination}
        setPagination={setPagination}
        total={data?.total || 0}
        pageCount={data?.pageCount || 0}
        isLoading={isLoading}
      />
    </div>
  );
}
