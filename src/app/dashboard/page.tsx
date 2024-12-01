'use client';

import CreateProject from '@/components/project/CreateProject';
import ProjectCard from '@/components/project/ProjectCard';
import { useProjects } from '@/hooks/project.hooks';
import React from 'react';

export default function DashboardPage() {
  const { data } = useProjects();
  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-semibold'>Projects</h1>
        <CreateProject />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6'>
        {data?.projects.length ? (
          data.projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              description={project.description}
              name={project.name}
            />
          ))
        ) : (
          <div>No projects found</div>
        )}
      </div>
    </div>
  );
}
