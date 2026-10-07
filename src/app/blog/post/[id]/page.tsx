import { notFound } from 'next/navigation';
import Post from '@/app/ui/components/posts/Post';
import { getPosts } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
  // Get all posts from the database
  const posts = await getPosts();

  // Find the post whose id matches the id in the URL
  const post = posts?.find((p) => p.id === params.id);

  // If there's no post with that id, show the 404 page
  if (!post) {
    notFound();
  }

  return (
    <>
      <h1>Post</h1>
      <Post
        id={post.id}
        title={post.title}
        content={post.content}
        date={post.date}
      />
    </>
  );
}