'use client';

import CreateProject from '@/components/project/CreateProject';
import ProjectCard from '@/components/project/ProjectCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useProjects } from '@/hooks/project.hooks';
import React from 'react';

export default function DashboardPage() {
  const { data, isLoading } = useProjects();
  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-semibold'>Projects</h1>
        <CreateProject />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6'>
        {isLoading ? (
          Array.from({ length: 9 }).map((_, index) => (
            <Skeleton key={index} className='h-48' />
          ))
        ) : data?.projects.length ? (
          data.projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              description={project.description}
              name={project.name}
            />
          ))
        ) : (
          <div className='col-span-full flex justify-center'>
            <div className='flex flex-col gap-2 items-center'>
              <h1 className='text-2xl font-semibold'>No projects found</h1>
              <p className='text-muted-foreground'>
                Create a project to get started
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
