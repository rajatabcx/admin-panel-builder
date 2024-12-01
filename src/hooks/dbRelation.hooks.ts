import { useQuery } from '@tanstack/react-query';
import { relation } from '@/actions/dbRelation';

export const useRelation = (id: string, schema: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['relation', id, schema],
    queryFn: async () => {
      const response = await relation(id, schema);
      return response;
    },
    enabled,
  });
};
