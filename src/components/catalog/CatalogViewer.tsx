import React from 'react';
import { Catalog } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';

export function CatalogViewer({
  catalog,
  isLoading,
}: {
  catalog: Catalog;
  isLoading: boolean;
}) {
  return isLoading ? (
    <div className='flex flex-col gap-4 justify-center h-full'>
      {Array.from({ length: 20 }).map((_, index) => (
        <Skeleton
          key={index}
          className='h-5'
          style={{ width: `${50 + ((index * 17) % 41)}%` }}
        />
      ))}
    </div>
  ) : !!catalog.schemas.length ? (
    <pre className='text-lect'>{JSON.stringify(catalog, null, 2)}</pre>
  ) : (
    <p className='flex items-center justify-center h-full'>
      Select schemas and click on generate to generate the catalog.
    </p>
  );
}
