'use client';

import React, { useEffect, useState } from 'react';
import { SchemaSelectView } from '@/components/catalog/SchemaSelectView';
import { Catalog, ColumnInfo } from '@/lib/types';
import { specificTableSchemaRelation } from '@/actions/catalog';
import { useParams } from 'next/navigation';
import AddDescriptionView from '@/components/catalog/AddDescriptionView';
import { useCatalog } from '@/hooks/catalog.hooks';

export default function CatalogGeneratePage() {
  const { id } = useParams<{ id: string }>();
  const [selectedTables, setSelectedTables] = useState<{
    [key: string]: string[];
  }>({});

  const [catalog, setCatalog] = useState<Catalog>({
    schemas: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const { data: existingCatalog, isLoading: loadingExistingCatalog } =
    useCatalog(id, !!id);

  const handleGenerateCatalog = async () => {
    setIsLoading(true);
    for (const schema in selectedTables) {
      const tables = selectedTables[schema];
      const response = await specificTableSchemaRelation(id, schema, tables);
      setCatalog((prev) => ({
        schemas: [
          ...prev.schemas,
          {
            name: schema,
            description:
              existingCatalog?.schemas.find((s) => s.name === schema)
                ?.description ?? '',
            tables: Object.keys(response.data).map((key) => ({
              name: key,
              description:
                existingCatalog?.schemas
                  .find((s) => s.name === schema)
                  ?.tables.find((t) => t.name === key)?.description ?? '',
              columns: response.data[key].map((column: ColumnInfo) => ({
                name: column.columnName,
                columnType: column.columnType,
                isNullable: column.isNullable,
                isPrimaryKey: column.isPrimaryKey,
                isUnique: column.isUnique,
                isForeignKey: column.isForeignKey,
                ...(column.isForeignKey
                  ? { foreignKeyReference: column.foreignKeyReference }
                  : {}),
              })),
            })),
          },
        ],
      }));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!!existingCatalog && !loadingExistingCatalog) {
      const selectedTables = existingCatalog.schemas.reduce((acc, schema) => {
        acc[schema.name] = schema.tables.map((table) => table.name);
        return acc;
      }, {} as { [key: string]: string[] });
      setSelectedTables(selectedTables);
    }
  }, [existingCatalog, loadingExistingCatalog]);

  return (
    <div className='flex h-full md:gap-6 xl:gap-10 justify-center p-4'>
      {!catalog.schemas.length || isLoading ? (
        <SchemaSelectView
          selectedTables={selectedTables}
          setSelectedTables={setSelectedTables}
          handleGenerateCatalog={handleGenerateCatalog}
          isLoading={isLoading}
          loadingExistingCatalog={loadingExistingCatalog}
        />
      ) : (
        <AddDescriptionView
          projectId={id}
          catalog={catalog}
          setCatalog={setCatalog}
        />
      )}
    </div>
  );
}
