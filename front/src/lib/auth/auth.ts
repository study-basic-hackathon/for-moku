import { AUTH_DEBUG } from "@/app/env";
import NextAuth, { NextAuthConfig } from "next-auth"
import "next-auth/jwt"

import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

import { NextResponse } from "next/server"

export const GUEST_EMAIL = 'guest@example.com'

export const authConfig = {
  debug: AUTH_DEBUG,
  providers: [
    Google,
    Credentials({
      name: 'Guest User',
      async authorize() {
        const user = { name: 'Guest User', email: GUEST_EMAIL };
        return user;
      }
    })
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async authorized({ request, auth }) {
      const { pathname } = request.nextUrl

      if (pathname === "/sandbox") return true

      const isGuest = auth?.user && auth.user.email === GUEST_EMAIL;
      if (isGuest && !pathname.startsWith('/room')) return false

      if (pathname.startsWith('/auth') && !!auth) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      return !!auth
    },
    jwt({ token, user, trigger, session }) {
      if (user) token.id = user.id

      if (trigger === "update" && session.roomId) {
        token.roomId = session.roomId;
      }

      return token
    },
    session({ session, token }) {
      if (token?.accessToken) session.accessToken = token.accessToken

      session.user.id = token.id ?? ""
      session.roomId = token.roomId;

      return session
    },
  },
  events: {
    signIn: async () => await removeUserFromRoom(),
    signOut: async () => await removeUserFromRoom(),
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

declare module "next-auth" {
  interface Session {
    accessToken?: string,
    roomId?: string,
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string,
    id?: string,
    roomId?: string,
  }
}

import { PARTYKIT_URL } from "@/app/env";

async function removeUserFromRoom() {
  const session = await auth();

  if (session?.user && session.roomId) {
    const { user, roomId } = session;
    await fetch(`${PARTYKIT_URL}/parties/for-moku-server/${roomId}`, {
      method: "DELETE",
      body: JSON.stringify(user.id),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
