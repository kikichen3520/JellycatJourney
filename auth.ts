import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google" || !user.email) return false;

      // Upsert into our own User table, keyed by googleId
      await prisma.user.upsert({
        where: { googleId: account.providerAccountId },
        update: {
          email: user.email,
          name: user.name ?? "",
          image: user.image ?? "",
        },
        create: {
          googleId: account.providerAccountId,
          email: user.email,
          name: user.name ?? "",
          image: user.image ?? "",
        },
      });

      return true;
    },
    async jwt({ token, account }) {
      // On first sign-in, attach our internal DB user id to the token
      if (account) {
        const dbUser = await prisma.user.findUnique({
          where: { googleId: account.providerAccountId },
        });
        if (dbUser) token.userId = dbUser.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Expose our internal DB user id on the session object
      if (token.userId) {
        (session.user as typeof session.user & { id: string }).id = token.userId as string;
      }
      return session;
    },
  },
});