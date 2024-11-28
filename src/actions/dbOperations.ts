'use server';

import { ActionResponse, FilterColumn, SortingColumn } from '@/lib/types';
import { getDbUrl } from './metadata';
import { ResponseType } from '@/lib/constants';
import { Client } from 'pg';

const extractUsername = async (connectionString: string): Promise<string> => {
  const regex = /postgresql:\/\/([^:]+):/;
  const match = connectionString.match(regex);
  return match ? match[1] : '';
};

const getColumns = async (schema: string, table: string) => {
  const dbUrl = await getDbUrl();
  const client = new Client({
    connectionString: dbUrl,
    ssl: {
      rejectUnauthorized: false,
    },
  });

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
    const ownerQuery = `
      SELECT DISTINCT
        c.relname AS table_name,
        n.nspname AS schema_name,
        pg_get_userbyid(c.relowner) AS table_owner
      FROM pg_class c
      JOIN pg_namespace n ON c.relnamespace = n.oid
      WHERE c.relkind = 'r'  
        AND n.nspname = $1   
        AND c.relname = $2   
      LIMIT 1;
      `;
    const columnResult = await client.query(columnQuery, [schema, table]);
    const ownerResult = await client.query(ownerQuery, [schema, table]);

    const username = await extractUsername(dbUrl);

    const columns = columnResult.rows.map((row) => ({
      name: row.column_name,
      type: row.udt_name,
    }));
    console.log(ownerResult.rows[0]?.table_owner, username);
    return {
      columns,
      editable:
        ownerResult.rows[0]?.table_owner === username ||
        username.split('.')[0] === ownerResult.rows[0]?.table_owner, //supabase
    };
  } catch (error) {
    console.log(error);
    return {
      columns: [],
      editable: false,
    };
  } finally {
    await client.end();
  }
};

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
    editable: boolean;
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
      editable: false,
    };

  const client = new Client({
    connectionString: dbUrl,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  const { columns, editable } = await getColumns(schema, table);

  try {
    await client.connect();

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

    const updatedFilterColumns: (FilterColumn & { order?: number })[] = [];
    let order = 1;
    for (const filter of filteredColumns) {
      if (filter.operator !== 'IS' && filter.operator !== 'IS NOT') {
        updatedFilterColumns.push({ ...filter, order });
        order++;
      } else {
        updatedFilterColumns.push({ ...filter });
      }
    }

    // Then fetch paginated data
    const dataQuery = `
        SELECT *
        FROM ${schema}.${table}
        ${
          updatedFilterColumns.length
            ? `WHERE ${updatedFilterColumns
                .map(
                  (column) =>
                    `${column.name} ${column.operator} ${
                      column.operator === 'IS' || column.operator === 'IS NOT'
                        ? `${column.value}`
                        : `$${column.order}`
                    }`
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

    const filterValues = updatedFilterColumns
      .filter(
        (column) => column.operator !== 'IS' && column.operator !== 'IS NOT'
      )
      .map((column) =>
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
      editable,
    };
  } catch (error: any) {
    console.log(error);
    return {
      type: ResponseType.ERROR,
      message: error.message,
      data: [],
      total: 0,
      pageCount: 0,
      columns,
      editable: false,
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
