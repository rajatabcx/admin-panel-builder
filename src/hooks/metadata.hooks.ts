import { getTables } from '@/actions/metadata';
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
