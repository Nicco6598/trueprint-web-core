import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth, { type DefaultSession } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { db } from '@/db'
import { accounts, sessions, users, verificationTokens } from '@/db/schema'

// ── Type augmentation ────────────────────────────────────────────────────────
declare module 'next-auth' {
  interface Session {
    user: {
      role: 'admin' | 'brand'
    } & DefaultSession['user']
  }

  interface User {
    role: 'admin' | 'brand'
  }
}

// ── Auth config ──────────────────────────────────────────────────────────────
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      // Inject the role from the DB user into every session
      session.user.role = user.role ?? 'brand'
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
})
