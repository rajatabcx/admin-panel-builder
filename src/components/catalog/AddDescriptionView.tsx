import React, { Dispatch, SetStateAction } from 'react';
import { ChevronRight, Loader } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';

import { Catalog } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUpdateCatalog } from '@/hooks/catalog.hooks';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

export default function AddDescriptionView({
  projectId,
  catalog,
  setCatalog,
}: {
  projectId: string;
  catalog: Catalog;
  setCatalog: Dispatch<SetStateAction<Catalog>>;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const debounced = useDebouncedCallback(
    (value: string, schema: string, table?: string) => {
      setCatalog((prev) => {
        if (table) {
          return {
            ...prev,
            schemas: prev.schemas.map((s) =>
              s.name === schema
                ? {
                    ...s,
                    tables: s.tables.map((t) =>
                      t.name === table ? { ...t, description: value } : t
                    ),
                  }
                : s
            ),
          };
        }
        return {
          ...prev,
          schemas: prev.schemas.map((s) =>
            s.name === schema ? { ...s, description: value } : s
          ),
        };
      });
    },
    500
  );

  const { mutateAsync: updateCatalog, isPending } = useUpdateCatalog();

  const handleUpdateCatalog = async () => {
    try {
      await updateCatalog({ projectId, catalog });
      queryClient.invalidateQueries({ queryKey: ['catalog', projectId] });
      router.push(`/dashboard/${projectId}/catalog`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='h-full flex flex-col gap-4 flex-1 items-center max-w-2xl'>
      <div className='flex justify-between items-center gap-4 w-full'>
        <div>
          <h1 className='text-base lg:text-xl font-semibold'>
            Add descriptions to your catalog
          </h1>
          <p className='text-sm text-muted-foreground'>
            This will help you generate better charts and insights. You can also
            skip this step and add descriptions later.
          </p>
        </div>
        <Button
          variant='outline'
          className='group'
          disabled={isPending}
          onClick={handleUpdateCatalog}
        >
          Skip{' '}
          {isPending ? (
            <Loader className='size-4 animate-spin ml-2' />
          ) : (
            <ChevronRight className='size-4 group-hover:translate-x-1 transition-transform' />
          )}
        </Button>
      </div>
      <div className='flex flex-col gap-4 flex-1 w-full mt-4'>
        {catalog.schemas.map((schema) => (
          <div key={schema.name}>
            <div className='flex flex-col gap-2 mb-2'>
              <Label>{schema.name} description</Label>
              <Input
                defaultValue={schema.description}
                placeholder='Description'
                onChange={(e) => debounced(e.target.value, schema.name)}
              />
            </div>
            <div className='flex flex-col gap-2 pl-6'>
              {schema.tables.map((table) => (
                <div key={table.name} className='flex flex-col gap-2'>
                  <Label>{table.name} description</Label>
                  <Input
                    defaultValue={table.description}
                    placeholder='Description'
                    onChange={(e) =>
                      debounced(e.target.value, schema.name, table.name)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className='flex justify-end mb-4'>
          <Button
            variant='secondary'
            className='group'
            disabled={isPending}
            onClick={handleUpdateCatalog}
          >
            Generate Catalog{' '}
            {isPending ? (
              <Loader className='size-4 animate-spin ml-2' />
            ) : (
              <ChevronRight className='size-4 group-hover:translate-x-1 transition-transform' />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
