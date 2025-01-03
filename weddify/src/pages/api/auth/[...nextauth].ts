import NextAuth, { SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default NextAuth({
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
            id: user.id.toString(), // Ensure id is returned as a string
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy, // Use JWT for session handling
  },
  callbacks: {
    async jwt({ token, user }: { token: any, user?: any }) {
      if (user) {
        token.id = user.id; // Add id to the token
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      if (token) {
        session.user = {
          id: token.id as string, // Add id to the session
          email: token.email,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
