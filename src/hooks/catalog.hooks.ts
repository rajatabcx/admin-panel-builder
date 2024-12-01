import { useQuery } from '@tanstack/react-query';

import { catalog, catalogExists } from '@/actions/catalog';

export const useCatalog = (projectId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['catalog', projectId],
    queryFn: async () => {
      const response = await catalog(projectId);
      return response.data;
    },
    enabled,
  });
};

export const useCatalogExists = (
  projectId: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['catalogExists', projectId],
    queryFn: async () => {
      const response = await catalogExists(projectId);
      return response.exists;
    },
    enabled,
  });
};
