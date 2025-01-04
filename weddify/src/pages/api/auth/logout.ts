import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, destroySession } from '../../../lib/session';

export default async function logoutHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      // Retrieve session
      const session = await getSession(req, res);

      if (!session) {
        return res.status(401).json({ error: 'Not logged in.' });
      }

      // Destroy session
      await destroySession(req, res);

      // Return success response
      return res.status(200).json({ message: 'Logged out successfully.' });
    } catch (error) {
      console.error('Error during logout:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  } else {
    // Restrict to POST method
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
