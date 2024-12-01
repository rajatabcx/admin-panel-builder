'use client';

import CreateProject from '@/components/project/CreateProject';
import { useProjects } from '@/hooks/project.hooks';
import React from 'react';

export default function DashboardPage() {
  const { data: projects } = useProjects();
  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1>Projects</h1>
        <CreateProject />
      </div>
      <div>
        <pre>{JSON.stringify(projects, null, 2)}</pre>
      </div>
    </div>
  );
}
