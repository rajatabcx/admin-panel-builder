'use client';
import { NoCatalogCard } from '@/components/catalog/NoCatalogCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useCatalog } from '@/hooks/catalog.hooks';
import { useParams } from 'next/navigation';

export default function CatalogPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading: catalogIsLoading } = useCatalog(id);

  return (
    <div className='flex h-full items-center justify-center p-4'>
      {catalogIsLoading ? (
        <div>
          {Array.from({ length: 20 }).map((_, index) => (
            <Skeleton
              key={index}
              className='h-5'
              style={{ width: `${50 + ((index * 17) % 41)}%` }}
            />
          ))}
        </div>
      ) : !data ? (
        <NoCatalogCard id={id} />
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
