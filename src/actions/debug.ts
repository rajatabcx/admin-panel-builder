'use server';

import { ResponseType } from '@/lib/constants';
import { ActionResponse } from '@/lib/types';
import pg from 'pg';

export const testConnection = async (
  connectionString: string
): Promise<ActionResponse> => {
  const client = new pg.Client({
    connectionString,
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
