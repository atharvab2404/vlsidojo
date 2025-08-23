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
      // Check if user exists in DB
      const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
      if (dbUser && !dbUser.signupCompleted) {
        return "/myprofile"; // first-time user
      }
      return true;
    },
    async session({ session }) {
      const dbUser = await prisma.user.findUnique({ where: { email: session.user?.email! } });
      if (dbUser) session.user.signupCompleted = dbUser.signupCompleted;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith("/") ? baseUrl + url : baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
