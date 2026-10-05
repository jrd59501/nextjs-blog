import { posts } from '@/app/lib/placeholder-data';
import Post from '@/app/ui/components/posts/Post';

export default function Page({ params }: { params: { id: string } }) {
  // Find the post whose id matches the id in the URL
  const post = posts.find((p) => p.id === params.id);

  // If no post has that id, show a message
  if (!post) {
    return <h1>Post not found</h1>;
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