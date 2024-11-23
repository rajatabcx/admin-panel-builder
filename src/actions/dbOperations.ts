'use server';

import { ActionResponse, FilterColumn, SortingColumn } from '@/lib/types';
import { getDbUrl } from './metadata';
import { ResponseType } from '@/lib/constants';
import { Client } from 'pg';

export async function rows({
  schema,
  table,
  sortingColumns = [],
  filteredColumns = [],
  page = 1,
  pageSize = 10,
}: {
  schema: string;
  table: string;
  page?: number;
  pageSize?: number;
  sortingColumns?: SortingColumn[];
  filteredColumns?: FilterColumn[];
}): Promise<
  ActionResponse & {
    data: any[];
    total: number;
    pageCount: number;
    columns: Array<{ name: string; type: string }>;
  }
> {
  const dbUrl = await getDbUrl();
  if (!table || !schema || !dbUrl)
    return {
      type: ResponseType.ERROR,
      message: 'Table, schema or dbUrl is required',
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
        ${
          filteredColumns.length
            ? `WHERE ${filteredColumns
                .map(
                  (column, index) =>
                    `${column.name} ${column.operator} $${index + 1}`
                )
                .join(' AND ')}`
            : ''
        }
        ${
          sortingColumns.length
            ? `ORDER BY ${sortingColumns
                .map((column) => `${column.name} ${column.type.toUpperCase()}`)
                .join(', ')}`
            : ''
        }
        LIMIT ${pageSize}
        OFFSET ${offset};
      `;

    const filterValues = filteredColumns.map((column) =>
      column.operator === '~~*' || column.operator === '~~'
        ? `%${column.value}%`
        : column.value
    );
    const dataResult = await client.query(dataQuery, filterValues);

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

export async function deleteRows(
  schema: string,
  table: string,
  ids: string[]
): Promise<ActionResponse> {
  const dbUrl = await getDbUrl();
  if (!table)
    return {
      type: ResponseType.ERROR,
      message: 'Table is required',
    };

  const client = new Client({ connectionString: dbUrl });

  try {
    await client.connect();

    // delete rows
    const deleteQuery = `
        DELETE FROM ${schema}.${table}
        WHERE id IN (${ids.join(',')})
      `;
    await client.query(deleteQuery);
    return {
      type: ResponseType.SUCCESS,
      message: 'Rows deleted successfully',
    };
  } catch (error: any) {
    return {
      type: ResponseType.ERROR,
      message: error.message,
    };
  } finally {
    await client.end();
  }
}
