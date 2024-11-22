import { deleteRows, rows } from '@/actions/dbOperations';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SortingColumn } from '@/lib/types';

export const useRows = ({
  enabled,
  limit,
  page,
  schema,
  sortingColumns,
  table,
}: {
  schema: string;
  table: string;
  page: number;
  limit: number;
  sortingColumns: SortingColumn[];
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ['rows', schema, table, page, limit, sortingColumns],
    queryFn: async () => {
      const response = await rows({
        schema,
        table,
        page,
        pageSize: limit,
        sortingColumns,
      });
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
