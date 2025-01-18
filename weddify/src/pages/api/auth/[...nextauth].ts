import NextAuth, { SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@prisma/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && (await bcrypt.compare(credentials.password, user.password))) {
          return {
            id: user.id.toString(),
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: { id: string; email: string } }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
