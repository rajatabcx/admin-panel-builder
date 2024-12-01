import { SelectionSchema } from './SelectionSchema';
import { Skeleton } from '@/components/ui/skeleton';
import { useSchemas } from '@/hooks/metadata.hooks';
import { cn } from '@/lib/utils';
import { Accordion } from '@/components/ui/accordion';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';
import { useParams } from 'next/navigation';

export function SchemaSelectView({
  selectedTables,
  setSelectedTables,
  handleGenerateCatalog,
}: {
  selectedTables: { [key: string]: string[] };
  setSelectedTables: Dispatch<SetStateAction<{ [key: string]: string[] }>>;
  handleGenerateCatalog: () => void;
}) {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useSchemas(id);
  return (
    <div className='h-full flex flex-col gap-4'>
      <h1 className='text-2xl font-semibold'>
        Select necessary schemas and tables
      </h1>
      <div className='flex flex-col gap-3 overflow-x-hidden overflow-y-auto flex-1'>
        {isLoading ? (
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
      <div className='flex items-center justify-center gap-2'>
        <Button variant='secondary' onClick={handleGenerateCatalog}>
          Generate Catalog
        </Button>
      </div>
    </div>
  );
}
