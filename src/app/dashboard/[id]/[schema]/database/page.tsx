import { relation } from '@/actions/dbRelation';
import React from 'react';

export default async function DatabasePage({
  params,
}: {
  params: Promise<{ id: string; schema: string }>;
}) {
  const { schema } = await params;
  const data = await relation(schema);
  return (
    <pre className='text-xs text-muted-foreground'>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
