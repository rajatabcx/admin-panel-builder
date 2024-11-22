import { getTableData, getTables } from '@/actions/metadata';
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

export const useTableData = (
  schema: string,
  table: string,
  page: number,
  limit: number,
  enabled: boolean
) => {
  return useQuery({
    queryKey: ['tableData', schema, table, page, limit],
    queryFn: async () => {
      const response = await getTableData(schema, table, page, limit);
      return response;
    },
    enabled,
  });
};
