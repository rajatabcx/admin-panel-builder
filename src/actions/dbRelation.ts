'use server';

import { Client } from 'pg';
import { getDbUrl } from './metadata';
import { ActionResponse } from '@/lib/types';
import { ResponseType } from '@/lib/constants';

interface ColumnInfo {
  table_name: string;
  column_name: string;
  udt_name: string;
  is_nullable: boolean;
  is_primary_key: boolean;
  is_unique: boolean;
  is_foreign_key: boolean;
  foreign_key_reference?: {
    table: string;
    column: string;
  };
}

type Relation = {
  [key: string]: ColumnInfo[];
};

export async function relation(
  schema: string
): Promise<ActionResponse & { data: Relation }> {
  const dbUrl = await getDbUrl();
  if (!dbUrl || !schema) {
    return {
      type: ResponseType.ERROR,
      message: 'dbUrl or schema is required',
      data: {},
    };
  }
  const client = new Client({ connectionString: dbUrl });

  try {
    await client.connect();
    const query = `
    SELECT 
      c.table_name,
      c.column_name,
      c.udt_name,
      c.is_nullable = 'YES' as is_nullable,
      CASE 
        WHEN tc.constraint_type = 'PRIMARY KEY' THEN true
        ELSE false
      END as is_primary_key,
      CASE 
        WHEN tc.constraint_type = 'UNIQUE' THEN true
        ELSE false
      END as is_unique,
      CASE 
        WHEN tc.constraint_type = 'FOREIGN KEY' THEN true
        ELSE false
      END as is_foreign_key,
      ccu.table_name as referenced_table,
      ccu.column_name as referenced_column
    FROM information_schema.columns c
    LEFT JOIN information_schema.key_column_usage kcu
      ON c.table_schema = kcu.table_schema 
      AND c.table_name = kcu.table_name 
      AND c.column_name = kcu.column_name
    LEFT JOIN information_schema.table_constraints tc
      ON kcu.constraint_name = tc.constraint_name
      AND kcu.table_schema = tc.table_schema
    LEFT JOIN information_schema.constraint_column_usage ccu
      ON tc.constraint_name = ccu.constraint_name
    WHERE c.table_schema = $1
    ORDER BY c.table_name, c.ordinal_position;
  `;

    const result = await client.query(query, [schema]);
    return {
      type: ResponseType.SUCCESS,
      message: 'Relation fetched successfully',
      data: result.rows.reduce((acc, curr) => {
        if (acc[curr.table_name]) {
          acc[curr.table_name].push({
            columnName: curr.column_name,
            columnType: curr.udt_name,
            isNullable: curr.is_nullable,
            isPrimaryKey: curr.is_primary_key,
            isUnique: curr.is_unique,
            isForeignKey: curr.is_foreign_key,
            ...(curr.is_foreign_key && {
              foreignKeyReference: {
                table: curr.referenced_table,
                column: curr.referenced_column,
              },
            }),
          });
        } else {
          acc[curr.table_name] = [
            {
              columnName: curr.column_name,
              columnType: curr.udt_name,
              isNullable: curr.is_nullable,
              isPrimaryKey: curr.is_primary_key,
              isUnique: curr.is_unique,
              isForeignKey: curr.is_foreign_key,
              ...(curr.is_foreign_key && {
                foreignKeyReference: {
                  table: curr.referenced_table,
                  column: curr.referenced_column,
                },
              }),
            },
          ];
        }
        return acc;
      }, {}),
    };
  } catch (error: any) {
    return {
      type: ResponseType.ERROR,
      message: error.message,
      data: {},
    };
  } finally {
    await client.end();
  }
}
