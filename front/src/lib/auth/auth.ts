import NextAuth, { NextAuthConfig } from "next-auth"
import "next-auth/jwt"

import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

import { NextResponse } from "next/server"

export const authConfig = {
  debug: !!process.env.AUTH_DEBUG,
  providers: [
    Google,
    Credentials({
      name: 'Guest User',
      async authorize() {
        const user = { name: 'Guest User', email: 'guest@example.com' };
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

      const isGuest = auth?.user && auth.user.email === "guest@example.com";
      if (isGuest && !pathname.startsWith('/room')) return false

      if (pathname.startsWith('/auth') && !!auth) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      return !!auth
    },
    jwt({ token, user }) {
      if (user) token.id = user.id

      return token
    },
    session({ session, token }) {
      if (token?.accessToken) session.accessToken = token.accessToken

      session.user.id = token.id ?? ""

      return session
    },
  },
  events: {
    signIn: () => removeUserFromRoom(),
    signOut: () => removeUserFromRoom(),
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

declare module "next-auth" {
  interface Session {
    accessToken?: string,
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string,
    id?: string,
  }
}

import { PARTYKIT_URL } from "@/app/env";

async function removeUserFromRoom() {
  const session = await auth();
  if (session?.user) {
    const url = `${PARTYKIT_URL}/parties/conns/list`;
    await fetch(url, {
      method: "DELETE",
      body: JSON.stringify(session.user.id),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
