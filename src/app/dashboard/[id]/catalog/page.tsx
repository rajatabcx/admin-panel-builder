import { NoCatalogCard } from '@/components/catalog/NoCatalogCard';
import { CatalogExistsCard } from '@/components/catalog/CatalogExistsCard';
import { catalogExists } from '@/actions/catalog';

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { exists } = await catalogExists(id);

  return (
    <div className='p-4 h-full'>
      {!exists ? (
        <div className='flex h-full items-center justify-center'>
          <NoCatalogCard id={id} />
        </div>
      ) : (
        <div className='flex h-full items-center justify-center'>
          <CatalogExistsCard id={id} />
        </div>
      )}
    </div>
  );
}
