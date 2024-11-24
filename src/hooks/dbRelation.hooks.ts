import { useQuery } from '@tanstack/react-query';
import { relation } from '@/actions/dbRelation';

export const useRelation = (schema: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['relation', schema],
    queryFn: async () => {
      const response = await relation(schema);
      return response;
    },
    enabled,
  });
};
