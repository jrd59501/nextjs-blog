'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Show the error in the browser console so we can see what broke
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center text-xl">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
}