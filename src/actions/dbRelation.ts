'use server';

import { Client } from 'pg';
import { getDbUrl } from './metadata';
import { ActionResponse, ColumnInfo } from '@/lib/types';
import { ResponseType } from '@/lib/constants';

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
      bool_or(CASE 
        WHEN tc.constraint_type = 'PRIMARY KEY' THEN true
        ELSE false
      END) as is_primary_key,
      bool_or(CASE 
        WHEN tc.constraint_type = 'UNIQUE' THEN true
        ELSE false
      END) as is_unique,
      bool_or(CASE 
        WHEN tc.constraint_type = 'FOREIGN KEY' THEN true
        ELSE false
      END) as is_foreign_key,
      MAX(CASE 
        WHEN tc.constraint_type = 'FOREIGN KEY' THEN ccu.table_name 
        ELSE null
      END) as referenced_table,
      MAX(CASE 
        WHEN tc.constraint_type = 'FOREIGN KEY' THEN ccu.column_name
        ELSE null
      END) as referenced_column,
      bool_or(CASE 
        WHEN tc.constraint_type = 'FOREIGN KEY' AND EXISTS (
          SELECT 1 FROM information_schema.table_constraints tc2
          WHERE tc2.table_name = ccu.table_name
          AND tc2.constraint_type = 'UNIQUE'
          AND tc2.constraint_name = tc.constraint_name
        ) THEN true
        ELSE false
      END) as has_unique_constraint
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
    GROUP BY c.table_schema, c.table_name, c.column_name, c.udt_name, c.is_nullable, c.ordinal_position
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
                relationType: determineRelationType(
                  curr.has_unique_constraint,
                  curr.is_unique
                ),
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
                  relationType: determineRelationType(
                    curr.has_unique_constraint,
                    curr.is_unique
                  ),
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

function determineRelationType(
  hasUniqueConstraint: boolean,
  isUnique: boolean
): string {
  if (hasUniqueConstraint && isUnique) {
    return 'ONE_TO_ONE';
  } else if (isUnique) {
    return 'ONE_TO_ONE';
  } else {
    return 'ONE_TO_MANY';
  }
}
