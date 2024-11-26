'use server';

import { ResponseType } from '@/lib/constants';
import { ActionResponse } from '@/lib/types';
import pg from 'pg';

export const testConnection = async (): Promise<ActionResponse> => {
  const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  try {
    // Attempt to connect to the database
    await client.connect();
    return {
      type: ResponseType.SUCCESS,
      message: 'Connected to the database successfully!',
    };
  } catch (error: any) {
    console.error(error.stack);
    return {
      type: ResponseType.ERROR,
      message: 'Failed to connect to the database',
    };
  } finally {
    await client.end();
  }
};

export const mainData = async () => {
  const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  try {
    await client.connect();
    const query = `
    SELECT DISTINCT
      c.relname AS table_name,
      n.nspname AS schema_name,
      pg_get_userbyid(c.relowner) AS table_owner
    FROM pg_class c
    JOIN pg_namespace n ON c.relnamespace = n.oid
    WHERE c.relkind = 'r'  -- Only regular tables
    ORDER BY c.relname;
    `;
    const res = await client.query(query);
    return res.rows;
  } catch (error: any) {
    console.error(error.stack);
    return [];
  } finally {
    await client.end();
  }
};
