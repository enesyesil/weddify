import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string; // Add the id property to the User type
  }

  interface Session {
    user: {
      id: string; // Include id in the session user
      email?: string | null;
      name?: string | null;
    };
  }

  interface JWT {
    id: string; // Include id in the JWT token
  }
}
