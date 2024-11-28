'use client';

import React, { useState } from 'react';
import { CatalogViewer } from '@/components/catalog/CatalogViewer';
import { SchemaSelectView } from '@/components/catalog/SchemaSelectView';

export default function CatalogPage() {
  const [selectedTables, setSelectedTables] = useState<{
    [key: string]: string[];
  }>({});

  const handleGenerateCatalog = () => {
    console.log(selectedTables);
  };

  return (
    <div className='flex h-full md:gap-6 xl:gap-10 justify-between p-4'>
      <div className='w-[30%]'>
        <SchemaSelectView
          selectedTables={selectedTables}
          setSelectedTables={setSelectedTables}
          handleGenerateCatalog={handleGenerateCatalog}
        />
      </div>
      <div className='flex-1'>
        <CatalogViewer />
      </div>
    </div>
  );
}
