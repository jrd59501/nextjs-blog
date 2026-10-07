import { createClient, sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

// Try to connect to the database.
// Returns the client if it works, or nothing if it fails.
export async function connectToDB() {
  const client = createClient();

  try {
    await client.connect();
    return client;
  } catch (error) {
    console.error('Error connecting to database', error);
  }
}

// Get all the posts from the database
export async function getPosts() {
  // Don't cache this, always get the latest posts
  noStore();

  try {
    // FAKE DELAY for testing the loading page
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql`SELECT * FROM posts`;
    return data.rows;
  } catch (error) {
    console.error('Error getting posts', error);
  }
}