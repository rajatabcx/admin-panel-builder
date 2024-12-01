import { getSchemas, getTables } from '@/actions/metadata';
import { useQuery } from '@tanstack/react-query';

export const useTables = (id: string, schema: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['tables', id, schema],
    queryFn: async () => {
      const response = await getTables(id, schema);
      return response.tables;
    },
    enabled,
  });
};

export const useSchemas = (id: string) => {
  return useQuery({
    queryKey: ['schemas', id],
    queryFn: async () => {
      const response = await getSchemas(id);
      return response.schemas;
    },
  });
};
