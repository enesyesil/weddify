import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/../../prisma/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const events = await prisma.event.findMany();
      return res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      return res.status(500).json({ error: 'Failed to fetch events.' });
    }
  } else if (req.method === 'POST') {
    const { name, date, location, userId } = req.body;

    if (!name || !date || !location || !userId) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    try {
      const newEvent = await prisma.event.create({
        data: {
          name,
          date: new Date(date),
          location,
          userId: parseInt(userId, 10),
          attendees: 0, // Default attendees to 0
        },
      });
      return res.status(201).json(newEvent);
    } catch (error) {
      console.error('Error creating event:', error);
      return res.status(500).json({ error: 'Failed to create event.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
