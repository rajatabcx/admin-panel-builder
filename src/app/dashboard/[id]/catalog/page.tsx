'use client';
import { useParams } from 'next/navigation';
import ReactJson from 'react-json-view';
import { useTheme } from 'next-themes';
import Link from 'next/link';

import { NoCatalogCard } from '@/components/catalog/NoCatalogCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useCatalog } from '@/hooks/catalog.hooks';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export default function CatalogPage() {
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading: catalogIsLoading } = useCatalog(id);

  return (
    <div className='p-4 h-full'>
      {catalogIsLoading ? (
        <div className='flex flex-col gap-4'>
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton
              key={index}
              className='h-5'
              style={{ width: `${50 + ((index * 17) % 41)}%` }}
            />
          ))}
        </div>
      ) : !data ? (
        <div className='flex h-full items-center justify-center'>
          <NoCatalogCard id={id} />
        </div>
      ) : (
        <div>
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-2xl font-semibold'>Catalog</h1>
            <Link
              href={`/dashboard/${id}/catalog/generate`}
              className={cn(buttonVariants({ variant: 'outline' }))}
            >
              Update Catalog
            </Link>
          </div>
          <ReactJson
            src={data}
            theme={theme === 'dark' ? 'railscasts' : 'rjv-default'}
            enableClipboard={false}
            displayDataTypes={false}
            displayObjectSize={false}
            collapsed={3}
          />
        </div>
      )}
    </div>
  );
}
