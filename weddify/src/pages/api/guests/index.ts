import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const guests = await prisma.guest.findMany();
      res.status(200).json(guests);
    } catch (error) {
      console.error('Error fetching guests:', error);
      res.status(500).json({ error: 'Failed to fetch guests.' });
    }
  } else if (req.method === 'POST') {
    const { firstName, lastName, eventId } = req.body;

    if (!firstName || !lastName || !eventId) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const eventIdInt = parseInt(eventId, 10);

    if (isNaN(eventIdInt)) {
      return res.status(400).json({ error: 'Invalid event ID.' });
    }

    try {
      const newGuest = await prisma.guest.create({
        data: {
          firstName,
          lastName,
          howMany:1,
          eventId: eventIdInt,
        },
      });

      res.status(201).json(newGuest);
    } catch (error) {
      console.error('Error creating guest:', error);
      res.status(500).json({ error: 'Failed to create guest.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
