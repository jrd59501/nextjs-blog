import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  providers: [], // empty for now, Google gets added next video
} satisfies NextAuthConfig;

// Turn on NextAuth and get the tools we need
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);