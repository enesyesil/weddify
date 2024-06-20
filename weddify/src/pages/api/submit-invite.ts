import { NextApiRequest, NextApiResponse } from 'next';

type InviteData = {
  firstName: string;
  lastName: string;
  attendees: number;
  message?: string;
};

let invites: InviteData[] = [];

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { firstName, lastName, attendees, message } = req.body;

    if (!firstName || !lastName || !attendees) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newInvite: InviteData = {
      firstName,
      lastName,
      attendees: parseInt(attendees, 10),
      message: message || '',
    };

    invites.push(newInvite);
    return res.status(200).json({ success: true, invite: newInvite });
  } else if (req.method === 'GET') {
    return res.status(200).json({ invites });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};
