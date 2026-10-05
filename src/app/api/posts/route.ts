import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// GET /api/posts → returns all posts as JSON
export async function GET() {
  try {
    const data = await sql`SELECT * FROM posts`;
    return NextResponse.json({ posts: data.rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Could not get posts' }, { status: 500 });
  }
}

// POST /api/posts → adds a new post to the database
export async function POST(request: Request) {
  // Read the data the form sent
  const body = await request.json();
  const title = body.title;
  const content = body.content;
  const date = body.date;

  // Make sure title and content are filled in
  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
  }

  try {
    // The database makes the id on its own
    await sql`
      INSERT INTO posts (author, title, content, date)
      VALUES ('Justin D', ${title}, ${content}, ${date})
    `;
    return NextResponse.json({ message: 'Post added' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Could not add post' }, { status: 500 });
  }
}