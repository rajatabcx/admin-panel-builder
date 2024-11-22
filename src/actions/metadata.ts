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

export async function getTableData(
  schema: string,
  table: string,
  page: number = 1,
  pageSize: number = 10
): Promise<
  ActionResponse & {
    data: any[];
    total: number;
    pageCount: number;
    columns: Array<{ name: string; type: string }>;
  }
> {
  const dbUrl = await getDbUrl();
  if (!table)
    return {
      type: ResponseType.ERROR,
      message: 'Table is required',
      data: [],
      total: 0,
      pageCount: 0,
      columns: [],
    };

  const client = new Client({ connectionString: dbUrl });

  try {
    await client.connect();

    // Get column information
    const columnQuery = `
      SELECT column_name, udt_name
      FROM information_schema.columns
      WHERE table_schema = $1 
      AND table_name = $2
      ORDER BY ordinal_position;
    `;
    const columnResult = await client.query(columnQuery, [schema, table]);
    const columns = columnResult.rows.map((row) => ({
      name: row.column_name,
      type: row.udt_name,
    }));

    // Calculate offset
    const offset = (page - 1) * pageSize;

    // First get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM ${schema}.${table}
    `;
    const countResult = await client.query(countQuery);
    const total = parseInt(countResult.rows[0].total);
    const pageCount = Math.ceil(total / pageSize);

    // Then fetch paginated data
    const dataQuery = `
      SELECT *
      FROM ${schema}.${table}
      LIMIT ${pageSize}
      OFFSET ${offset}
    `;
    const dataResult = await client.query(dataQuery);

    return {
      data: dataResult.rows,
      total,
      pageCount,
      columns,
      type: ResponseType.SUCCESS,
      message: 'Table data fetched successfully',
    };
  } catch (error: any) {
    return {
      type: ResponseType.ERROR,
      message: error.message,
      data: [],
      total: 0,
      pageCount: 0,
      columns: [],
    };
  } finally {
    await client.end();
  }
}
