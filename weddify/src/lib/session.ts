import { getServerSession } from 'next-auth/next';
import NextAuth from "../pages/api/auth/[...nextauth]";

import { NextApiRequest, NextApiResponse } from 'next';

export async function getSession(req: NextApiRequest, res: NextApiResponse) {
  return getServerSession(req, res, NextAuth);
}

export async function destroySession(req: NextApiRequest, res: NextApiResponse) {
  // Destroy session by setting an expired cookie
  res.setHeader('Set-Cookie', 'next-auth.session-token=; Path=/; Max-Age=0; HttpOnly');
}
