import { auth } from '../../../../../auth.config';
import { SignIn, SignOut } from './auth-component';

export default async function UserButton() {
  // Check who is logged in
  const session = await auth();

  // Nobody logged in, so show Sign In
  if (!session?.user) {
    return <SignIn />;
  }

  // Someone is logged in, so show their email and Sign Out
  return (
    <div className="flex flex-col gap-2">
     <p className="text-sm font-medium">{session.user.name}</p>
     <p className="text-xs text-gray-600">{session.user.email}</p>
      <SignOut />
    </div>
  );
}