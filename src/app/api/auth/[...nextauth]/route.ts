import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user }) {
      // Always allow sign in; redirection is handled in `redirect`
      return true;
    },
    async session({ session }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user?.email! },
      });

      if (dbUser) {
        session.user.signupCompleted = dbUser.signupCompleted;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      // If redirect comes from provider callback → decide where to send them
      if (url.startsWith("/api/auth/callback")) {
        // At this point, session will have `signupCompleted` (set in session() above)
        // NextAuth doesn’t pass session here directly, but since user just logged in,
        // safest is to always send them to `/myprofile` first if not complete.
        return `${baseUrl}/myprofile`;
      }

      // Default safe redirects
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
