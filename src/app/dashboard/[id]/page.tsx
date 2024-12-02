'use client';

import { useProject } from '@/hooks/project.hooks';
import { useParams } from 'next/navigation';

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { data: project } = useProject(id, !!id);
  return (
    <div className='p-4 w-full h-full'>
      <h1 className='text-2xl font-bold'>{project?.name}</h1>
      <p className='text-sm text-muted-foreground'>{project?.description}</p>
    </div>
  );
}
