import { deleteRows, rows } from '@/actions/dbOperations';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FilterColumn, SortingColumn } from '@/lib/types';

export const useRows = ({
  id,
  enabled,
  limit,
  page,
  schema,
  sortingColumns,
  table,
  filteredColumns,
  universalSearch,
}: {
  id: string;
  schema: string;
  table: string;
  page: number;
  limit: number;
  sortingColumns: SortingColumn[];
  filteredColumns: FilterColumn[];
  enabled: boolean;
  universalSearch: string;
}) => {
  return useQuery({
    queryKey: [
      'rows',
      id,
      schema,
      table,
      page,
      limit,
      sortingColumns,
      filteredColumns,
      universalSearch,
    ],
    queryFn: async () => {
      const response = await rows({
        id,
        schema,
        table,
        page,
        pageSize: limit,
        sortingColumns,
        filteredColumns,
        universalSearch,
      });
      return response;
    },
    enabled,
  });
};

export const useDeleteRows = ({
  id,
  schema,
  table,
  ids,
}: {
  id: string;
  schema: string;
  table: string;
  ids: string[];
}) => {
  return useMutation({
    mutationFn: async () => {
      const response = await deleteRows({ id, schema, table, ids });
      return response;
    },
  });
};
