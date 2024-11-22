'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';

import { FooterOptionsMenu } from '@/components/database/FooterOptionsMenu';
import { HeaderOptionsMenu } from '@/components/database/HeaderOptionsMenu';
import { MainTable } from '@/components/database/MainTable';
import { Skeleton } from '@/components/ui/skeleton';
import { SelectedHeaderOptions } from '@/components/database/SelectedHeaderOptions';
import { useRows } from '@/hooks/dbOpertions.hooks';
import { convertRowsToCsv, handleDownload } from '@/lib/utils';
import { SortingColumn } from '@/lib/types';

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
  const [selected, setSelected] = useState<string[]>([]);
  const [sortingColumns, setSortingColumns] = useState<SortingColumn[]>([]);

  const { data, isLoading, isFetching } = useRows({
    schema,
    table,
    page: pagination.page,
    limit: pagination.limit,
    sortingColumns,
    enabled: !!schema && !!table,
  });

  const handleExportCsv = () => {
    const csv = convertRowsToCsv(
      data?.columns.map((column) => column.name) || [],
      data?.data.filter((row) => selected.includes(row.id)) || []
    );
    handleDownload(csv, `${table}_rows.csv`);
  };

  const handleApplySorting = (data: SortingColumn[]) => {
    setSortingColumns(data);
  };

  return (
    <div className='w-full h-screen flex flex-col'>
      {/* header options menu */}
      {!!selected.length ? (
        <SelectedHeaderOptions
          selected={selected}
          handleExportCsv={handleExportCsv}
        />
      ) : (
        <HeaderOptionsMenu
          view={view}
          setView={setView}
          columns={data?.columns.map((column) => column.name) || []}
          handleApplySorting={handleApplySorting}
        />
      )}
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
          <MainTable
            data={data?.data || []}
            headers={data?.columns || []}
            selected={selected}
            setSelected={setSelected}
          />
        )}
      </div>
      {/* footer options menu */}
      <FooterOptionsMenu
        pagination={pagination}
        setPagination={setPagination}
        total={data?.total || 0}
        pageCount={data?.pageCount || 0}
        isLoading={isLoading || isFetching}
      />
    </div>
  );
}
