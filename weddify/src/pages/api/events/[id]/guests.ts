import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/prisma"; // Adjust path as necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // This is the event ID

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid event ID.' });
  }

  if (req.method === 'GET') {
    // Handle GET requests to fetch guests for a specific event
    try {
      const guests = await prisma.guest.findMany({
        where: { eventId: parseInt(id, 10) },
      });
      return res.status(200).json(guests);
    } catch (error) {
      console.error('Error fetching guests:', error);
      return res.status(500).json({ error: 'Failed to fetch guests.' });
    }
  } else if (req.method === 'POST') {
    // Handle POST requests to add a new guest to the event
    const { firstName, lastName, howMany } = req.body;

    if (!firstName || !lastName || !howMany) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    try {
      const newGuest = await prisma.guest.create({
        data: {
          firstName,
          lastName,
          howMany: parseInt(howMany, 10),
          eventId: parseInt(id, 10),
        },
      });

      return res.status(201).json({ success: true, guest: newGuest });
    } catch (error) {
      console.error('Error creating guest:', error);
      return res.status(500).json({ error: 'Failed to create guest.' });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
