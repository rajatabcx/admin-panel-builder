import React from 'react';
import { RefreshCw } from 'lucide-react';
import ReactJson from 'react-json-view';

import { Catalog } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useCatalog, useUpdateCatalog } from '@/hooks/catalog.hooks';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

export function CatalogViewer({
  projectId,
  catalog,
  isLoading,
}: {
  projectId: string;
  catalog: Catalog;
  isLoading: boolean;
}) {
  const { theme } = useTheme();

  const { data: existingCatalog } = useCatalog(projectId);
  const { mutateAsync: updateCatalog, isPending } = useUpdateCatalog();

  const handleUpdateCatalog = async () => {
    try {
      await updateCatalog({ projectId, catalog });
    } catch (error) {
      console.error(error);
    }
  };

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
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-semibold'>Catalog</h2>
        <Button
          variant='outline'
          onClick={handleUpdateCatalog}
          disabled={isPending}
        >
          {existingCatalog ? 'Update' : 'Generate'} Catalog
          <RefreshCw
            className={cn('w-4 h-4', isPending ? 'animate-spin' : '')}
          />
        </Button>
      </div>
      <ReactJson
        src={catalog}
        theme={theme === 'dark' ? 'railscasts' : 'rjv-default'}
      />
    </div>
  ) : existingCatalog?.schemas.length ? (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-semibold'>Existing Catalog</h2>
      </div>
      <ReactJson
        src={existingCatalog}
        theme={theme === 'dark' ? 'railscasts' : 'rjv-default'}
      />
    </div>
  ) : (
    <p className='flex items-center justify-center h-full'>
      Select schemas and click on generate to generate the catalog.
    </p>
  );
}
