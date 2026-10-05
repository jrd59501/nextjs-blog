import { createClient } from '@vercel/postgres';

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