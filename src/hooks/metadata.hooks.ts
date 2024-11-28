import { getSchemas, getTables } from '@/actions/metadata';
import { useQuery } from '@tanstack/react-query';

export const useTables = (schema: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['tables', schema],
    queryFn: async () => {
      const response = await getTables(schema);
      return response.tables;
    },
    enabled,
  });
};

export const useSchemas = () => {
  return useQuery({
    queryKey: ['schemas'],
    queryFn: async () => {
      const response = await getSchemas();
      return response.schemas;
    },
  });
};
