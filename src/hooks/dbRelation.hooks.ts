import { useQuery } from '@tanstack/react-query';
import { relation, specificTableSchemaRelation } from '@/actions/dbRelation';

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

export const useSpecificTableSchemaRelation = (
  schema: string,
  tables: string[],
  enabled: boolean
) => {
  return useQuery({
    queryKey: ['specificTableSchemaRelation', schema, tables],
    queryFn: async () => {
      const response = await specificTableSchemaRelation(schema, tables);
      return response;
    },
  });
};
