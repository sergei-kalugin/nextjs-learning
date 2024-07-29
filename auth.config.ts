import {NextAuthConfig} from "next-auth";

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl}}) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl

      return true;
    }
  }
} satisfies NextAuthConfig;
