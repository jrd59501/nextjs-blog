import { signIn, signOut } from '../../../../../auth.config';

// Sign In button
export function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn();
      }}
    >
      <button className="w-full rounded-md bg-purple-600 p-2 text-sm text-white hover:bg-purple-700">
        Sign In
      </button>
    </form>
  );
}

// Sign Out button
export function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button className="w-full rounded-md border border-purple-600 p-2 text-sm text-purple-700 hover:bg-purple-100">
        Sign Out
      </button>
    </form>
  );
}