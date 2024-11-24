'use client';
import React from 'react';

import { useRelation } from '@/hooks/dbRelation.hooks';
import { useParams } from 'next/navigation';

export default function DatabasePage() {
  const { schema } = useParams<{ schema: string }>();
  const { data } = useRelation(schema, !!schema);
  return (
    <pre className='text-xs text-muted-foreground'>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
