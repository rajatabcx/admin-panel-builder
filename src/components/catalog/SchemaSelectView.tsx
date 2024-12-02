import { Dispatch, SetStateAction } from 'react';
import { useParams } from 'next/navigation';
import { ChevronRight, Loader } from 'lucide-react';

import { SelectionSchema } from './SelectionSchema';
import { Skeleton } from '@/components/ui/skeleton';
import { useSchemas } from '@/hooks/metadata.hooks';
import { cn } from '@/lib/utils';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

export function SchemaSelectView({
  selectedTables,
  setSelectedTables,
  handleGenerateCatalog,
  isLoading,
  loadingExistingCatalog,
}: {
  selectedTables: { [key: string]: string[] };
  setSelectedTables: Dispatch<SetStateAction<{ [key: string]: string[] }>>;
  handleGenerateCatalog: () => void;
  isLoading: boolean;
  loadingExistingCatalog: boolean;
}) {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading: loadingSchemas } = useSchemas(id);

  return (
    <div className='h-full flex flex-col gap-4 flex-1 items-center max-w-2xl'>
      <div className='flex justify-between items-center gap-4 w-full'>
        <h1 className='text-base lg:text-xl font-semibold'>
          Select necessary schemas and tables
        </h1>
        <Button
          variant='secondary'
          onClick={handleGenerateCatalog}
          disabled={isLoading || !Object.keys(selectedTables).length}
          className='group'
        >
          Next Step{' '}
          {isLoading ? (
            <Loader className='animate-spin size-4' />
          ) : (
            <ChevronRight className='size-4 group-hover:translate-x-1 transition-transform' />
          )}
        </Button>
      </div>
      <div className='flex flex-col gap-3 flex-1 w-full'>
        {loadingSchemas || loadingExistingCatalog ? (
          Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              className={cn('h-5 w-full bg-muted-foreground rounded-full')}
              style={{
                width: `${50 + ((index * 17) % 41)}%`,
              }}
            />
          ))
        ) : (
          <Accordion type='multiple' className='w-full'>
            {data?.map((schema) => (
              <SelectionSchema
                key={schema}
                name={schema}
                selectedTables={selectedTables}
                setSelectedTables={setSelectedTables}
              />
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}
