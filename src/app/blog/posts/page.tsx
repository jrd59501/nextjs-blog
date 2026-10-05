import Link from 'next/link';
import Post from '@/app/ui/components/posts/Post';
import { connectToDB, getPosts } from '@/app/lib/data';

// Always get fresh posts from the database (don't use a saved copy)
export const dynamic = 'force-dynamic';

export default async function Page() {
  // Connect to the database and get the posts
  const client = await connectToDB();
  const posts = await getPosts();

  return (
    <>
      {client && <p className="text-green-500">Connected to database</p>}

      <Link
        href="/blog/post/insert"
        className="inline-block outline outline-1 border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white my-5 py-2 px-4 rounded"
      >
        New +
      </Link>

      <h1>Posts</h1>
      {posts?.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          date={post.date}
        />
      ))}
    </>
  );
}