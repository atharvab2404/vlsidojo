import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
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
      return true;
    },

    async session({ session }) {
        if (!session.user?.email) return session;

        const dbUser = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { id: true, signupCompleted: true }
        });

        if (dbUser) {
            // ✅ Inject ID into session
            session.user.id = dbUser.id;
            session.user.signupCompleted = dbUser.signupCompleted;
        }

        return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/api/auth/callback")) {
        return `${baseUrl}/myprofile`;
      }

      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;

      return baseUrl;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
