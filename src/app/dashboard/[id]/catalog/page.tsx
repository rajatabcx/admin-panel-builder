'use client';

import React, { useState } from 'react';
import { CatalogViewer } from '@/components/catalog/CatalogViewer';
import { SchemaSelectView } from '@/components/catalog/SchemaSelectView';
import { Catalog, ColumnInfo } from '@/lib/types';
import { specificTableSchemaRelation } from '@/actions/dbRelation';

export default function CatalogPage() {
  const [selectedTables, setSelectedTables] = useState<{
    [key: string]: string[];
  }>({});

  const [catalog, setCatalog] = useState<Catalog>({
    schemas: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateCatalog = async () => {
    setIsLoading(true);
    for (const schema in selectedTables) {
      const tables = selectedTables[schema];
      const response = await specificTableSchemaRelation(schema, tables);
      setCatalog((prev) => ({
        schemas: [
          ...prev.schemas,
          {
            name: schema,
            description: '',
            tables: Object.keys(response.data).map((key) => ({
              name: key,
              description: '',
              columns: response.data[key].map((column: ColumnInfo) => ({
                name: column.columnName,
                description: '',
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

  return (
    <div className='flex h-full md:gap-6 xl:gap-10 justify-between p-4'>
      <div className='w-[40%]'>
        <SchemaSelectView
          selectedTables={selectedTables}
          setSelectedTables={setSelectedTables}
          handleGenerateCatalog={handleGenerateCatalog}
        />
      </div>
      <div className='flex-1 overflow-y-auto'>
        <CatalogViewer catalog={catalog} isLoading={isLoading} />
      </div>
    </div>
  );
}
