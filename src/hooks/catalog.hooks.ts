import { useMutation, useQuery } from '@tanstack/react-query';

import { catalog, catalogExists, upsertCatalog } from '@/actions/catalog';
import { Catalog } from '@/lib/types';
import { handleResponse } from '@/lib/handleResponse';

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

export const useUpdateCatalog = () => {
  return useMutation({
    mutationFn: async ({
      projectId,
      catalog,
    }: {
      projectId: string;
      catalog: Catalog;
    }) => {
      const response = await upsertCatalog(projectId, catalog);
      handleResponse(response);
      return response;
    },
  });
};
