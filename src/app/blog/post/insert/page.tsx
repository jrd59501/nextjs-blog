import { redirect } from 'next/navigation';
import { auth } from '../../../../../auth.config';
import NewPostForm from './new-post-form';

export default async function Page() {
  // Check who is logged in
  const session = await auth();

  // Not logged in? Send them back to the posts list
  if (!session?.user) {
    redirect('/blog/posts');
  }

  // Logged in, so show the form
  return <NewPostForm />;
}