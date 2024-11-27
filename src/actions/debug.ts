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

    // Query to get all schemas and their tables
    const query = `
   SELECT user_profiles.name 
FROM user_profiles 
JOIN departments ON user_profiles.id = departments.hod_id 
JOIN colleges ON departments.college_id = colleges.id 
WHERE LOWER(colleges.slug) ILIKE LOWER('%bppimt%') 
AND LOWER(departments.name) ILIKE LOWER('%electronics%')
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
