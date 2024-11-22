import { deleteRows, rows } from '@/actions/dbOperations';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useRows = (
  schema: string,
  table: string,
  page: number,
  limit: number,
  enabled: boolean
) => {
  return useQuery({
    queryKey: ['tableData', schema, table, page, limit],
    queryFn: async () => {
      const response = await rows(schema, table, page, limit);
      return response;
    },
    enabled,
  });
};

export const useDeleteRows = (schema: string, table: string, ids: string[]) => {
  return useMutation({
    mutationFn: async () => {
      const response = await deleteRows(schema, table, ids);
      return response;
    },
  });
};
