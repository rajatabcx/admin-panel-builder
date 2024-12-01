import { useMutation, useQuery } from '@tanstack/react-query';

import { createProject, getProjects } from '@/actions/project';
import { Project } from '@/lib/types';
import { handleResponse } from '@/lib/handleResponse';
import { testConnection } from '@/actions/debug';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await getProjects();
      return response;
    },
  });
};

export const useCreateProject = () => {
  return useMutation({
    mutationFn: async (project: Project) => {
      const response = await createProject(project);
      handleResponse(response);
      return response;
    },
  });
};

export const useTestConnection = () => {
  return useMutation({
    mutationFn: async (connectionString: string) => {
      const response = await testConnection(connectionString);
      handleResponse(response);
      return response;
    },
  });
};
