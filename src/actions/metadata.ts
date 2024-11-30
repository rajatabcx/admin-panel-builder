'use server';

import { ResponseType } from '@/lib/constants';
import { ActionResponse } from '@/lib/types';
import { Client } from 'pg';

export async function getDbUrl(): Promise<string> {
  return process.env.DATABASE_URL!;
}

export async function getSchemas(): Promise<
  ActionResponse & { schemas: string[] }
> {
  const dbUrl = await getDbUrl();

  if (!dbUrl)
    return {
      type: ResponseType.ERROR,
      message: 'Database URL is required',
      schemas: [],
    };

  const client = new Client({
    connectionString: dbUrl,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();

    // Fetch schemas, tables, and columns
    const schemaQuery = `
SELECT nspname AS table_schema
FROM pg_catalog.pg_namespace
WHERE nspname NOT LIKE 'pg_toast%' AND nspname NOT LIKE 'pg_temp_%' AND nspname NOT IN ('pg_catalog', 'information_schema')
ORDER BY nspname;
  `;
    const schemaResult = await client.query(schemaQuery);
    return {
      schemas: schemaResult.rows.map((row) => row.table_schema),
      type: ResponseType.SUCCESS,
      message: 'Schemas fetched successfully',
    };
  } catch (error: any) {
    return {
      type: ResponseType.ERROR,
      message: error.message,
      schemas: [],
    };
  } finally {
    await client.end();
  }
}

export async function getTables(
  schema: string
): Promise<ActionResponse & { tables: Array<{ name: string; type: string }> }> {
  const dbUrl = await getDbUrl();

  if (!schema || !dbUrl)
    return {
      type: ResponseType.ERROR,
      message: 'Schema and database URL are required',
      tables: [],
    };

  const client = new Client({
    connectionString: dbUrl,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();

    const tableQuery = `
        SELECT DISTINCT c.relname as table_name, 
               CASE c.relkind
                 WHEN 'r' THEN 'table'
                 WHEN 'v' THEN 'view'
                 WHEN 'm' THEN 'materialized_view'
                 WHEN 'f' THEN 'foreign_table'
                 WHEN 'p' THEN 'partitioned_table'
                 ELSE c.relkind::text
               END as table_type
        FROM pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = $1
        AND c.relkind IN ('r','v','m','f','p')
        ORDER BY c.relname;
      `;
    const tableResult = await client.query(tableQuery, [schema]);

    return {
      tables: tableResult.rows.map((row) => ({
        name: row.table_name,
        type: row.table_type,
      })),
      type: ResponseType.SUCCESS,
      message: 'Tables fetched successfully',
    };
  } catch (error: any) {
    return {
      type: ResponseType.ERROR,
      message: error.message,
      tables: [],
    };
  } finally {
    await client.end();
  }
}

export async function customTypeValues(
  typeName: string
): Promise<ActionResponse & { values: string[] }> {
  const dbUrl = await getDbUrl();

  if (!dbUrl || !typeName)
    return {
      type: ResponseType.ERROR,
      message: 'Database URL and type name are required',
      values: [],
    };

  const client = new Client({
    connectionString: dbUrl,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    const enumQuery = `
    SELECT e.enumlabel AS value
    FROM pg_type t
    JOIN pg_enum e ON t.oid = e.enumtypid
    WHERE t.typname = $1;
  `;
    const enumResult = await client.query(enumQuery, [typeName]);
    return {
      values: enumResult.rows.map((row) => row.value),
      type: ResponseType.SUCCESS,
      message: 'Custom type values fetched successfully',
    };
  } catch (error: any) {
    return {
      type: ResponseType.ERROR,
      message: error.message,
      values: [],
    };
  }
}
