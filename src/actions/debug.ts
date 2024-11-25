'use server';

import pg from 'pg';

export const debug = async () => {
  const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
  try {
    // Attempt to connect to the database
    await client.connect();
    console.log('Connected to the database successfully!');

    // Optionally, you can run a simple query to ensure everything is working
    const res = await client.query('SELECT NOW()');
    console.log('Current time in DB:', res.rows[0]);
  } catch (error: any) {
    console.error(error.message);
    return [];
  }
};
