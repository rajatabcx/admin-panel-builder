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

  const client = new Client({ connectionString: dbUrl });

  try {
    await client.connect();

    // Fetch schemas, tables, and columns
    const schemaQuery = `
    SELECT DISTINCT table_schema
    FROM information_schema.columns
    WHERE table_schema NOT IN ('pg_catalog', 'information_schema')
    ORDER BY table_schema;
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
): Promise<ActionResponse & { tables: string[] }> {
  const dbUrl = await getDbUrl();

  if (!schema || !dbUrl)
    return {
      type: ResponseType.ERROR,
      message: 'Schema and database URL are required',
      tables: [],
    };

  const client = new Client({ connectionString: dbUrl });

  try {
    await client.connect();

    // Fetch schemas, tables, and columns
    const schemaQuery = `
        SELECT DISTINCT table_name
        FROM information_schema.columns
        WHERE table_schema = '${schema}'
        ORDER BY table_name;
      `;
    const schemaResult = await client.query(schemaQuery);

    return {
      tables: schemaResult.rows.map((row) => row.table_name),
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
