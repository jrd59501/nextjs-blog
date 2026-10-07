import { NextResponse } from 'next/server';
import { auth } from '../../../../auth.config';

// POST /api/generate → asks Gemini to write a blog post from a title
export async function POST(request: Request) {
  // Only logged-in users can use the AI (protects our free quota)
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'You need to sign in first' }, { status: 401 });
  }

  // Get the title from the form
  const body = await request.json();
  const title = body.title;

  if (!title) {
    return NextResponse.json({ error: 'Please type a title first' }, { status: 400 });
  }

  // Check the key is loaded
  if (!process.env.GEMINI_API_KEY) {
    console.log('Gemini error: GEMINI_API_KEY is missing from .env.local');
    return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
  }

  try {
    // Ask Gemini to write the post (the key stays on the server)
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
      {
        method: 'POST',
         signal: AbortSignal.timeout(30000), // stop waiting after 30 seconds
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          model: 'gemini-3.7-flash',
          reasoning_effort: 'low',
          messages: [
            {
              role: 'system',
              content: 'You write short, friendly blog posts. Keep it under 150 words. Plain text only, no markdown.',
            },
            {
              role: 'user',
              content: 'Write a blog post titled: ' + title,
            },
          ],
        }),
      }
    );

    // If Google said no, print the reason in the terminal
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Gemini error:', response.status, errorText);
      return NextResponse.json({ error: 'The AI could not write the post' }, { status: 500 });
    }

    // Pull the text out of the AI's answer
    const data = await response.json();
    const text = data.choices[0].message.content;

    return NextResponse.json({ content: text }, { status: 200 });
  } catch (error) {
    console.log('Gemini error (crash):', error);
    return NextResponse.json({ error: 'The AI could not write the post' }, { status: 500 });
  }
}