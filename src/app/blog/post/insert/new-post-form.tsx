"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  // One piece of state for each form field
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [generating, setGenerating] = useState(false);

  // Today's date, like 2026-10-07
  const date = new Date().toISOString().slice(0, 10);

  // Ask the AI to write the content based on the title
  async function handleGenerate() {
    setError('');
    setGenerating(true);

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title }),
    });

    if (response.ok) {
      const data = await response.json();
      setContent(data.content); // put the AI text in the Content box
    } else if (response.status === 400) {
      setError('Type a title first, then click Generate.');
    } else {
      setError('The AI could not write the post. Try again.');
    }

    setGenerating(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // stop the page from reloading

    // Send the new post to our API route
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title, content: content, date: date }),
    });

    if (response.ok) {
      // It worked, so go back to the posts list
      router.push('/blog/posts');
      router.refresh();
    } else if (response.status === 401) {
      setError('You need to sign in to add a post.');
    } else {
      setError('Something went wrong. Try a different title.');
    }
  }

  return (
    <div className="bg-white p-8 rounded shadow">
      <h2 className="text-2xl mb-4 text-purple-700">New Blog Post</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-2 border-purple-100 p-2 rounded-md focus:border-purple-200 focus:outline-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="content" className="block font-medium">Content:</label>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={generating}
              className="text-sm border border-purple-600 text-purple-700 px-3 py-1 rounded-md hover:bg-purple-100 disabled:opacity-50"
            >
              {generating ? 'Writing...' : '✨ Generate with AI'}
            </button>
          </div>
          <textarea
            id="content"
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full mt-2 border-2 border-purple-100 p-2 rounded-md focus:border-purple-200 focus:outline-none"
          ></textarea>
        </div>

        <div>
          <label htmlFor="date" className="block font-medium">Date:</label>
          <input
            type="text"
            id="date"
            value={date}
            readOnly
            className="w-full border-2 border-purple-100 p-2 rounded-md bg-gray-50"
          />
        </div>

        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
          Submit
        </button>
      </form>
    </div>
  );
}