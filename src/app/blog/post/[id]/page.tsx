import Post from '@/app/ui/components/posts/Post';
import { connectToDB, getPosts } from '@/app/lib/data';

export default async function Page() {
  // Connect to the database and get the posts
  const client = await connectToDB();
  const posts = await getPosts();

  return (
    <>
      {client && <p className="text-green-500">Connected to database</p>}
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