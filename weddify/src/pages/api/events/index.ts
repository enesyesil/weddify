import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../../prisma/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = parseInt(session.user.id, 10);

  if (req.method === 'GET') {
    try {
      const events = await prisma.event.findMany({
        where: { userId },
        include: { guests: true },
      });
      res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ error: 'Failed to fetch events.' });
    }
  } else if (req.method === 'POST') {
    const { name, date, location, message, headerText, footerText } = req.body;

    if (!name || !date || !location) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    try {
      const newEvent = await prisma.event.create({
        data: {
          name,
          date: new Date(date),
          location,
          userId,
          attendees: 0, // Default attendees count
          message: message || null, // Ensure this property exists in your Prisma schema before using it
          headerText: headerText || null,
          footerText: footerText || null,
        },
      });
      res.status(201).json(newEvent);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ error: 'Failed to create event.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
