import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { guestId } = req.query;

  if (!guestId || typeof guestId !== 'string') {
    return res.status(400).json({ error: 'Invalid guest ID.' });
  }

  if (req.method === 'GET') {
    try {
      const guest = await prisma.guest.findUnique({
        where: { id: parseInt(guestId, 10) },
        include: { event: true },
      });
      if (!guest) {
        return res.status(404).json({ error: 'Guest not found.' });
      }
      res.status(200).json(guest);
    } catch (error) {
      console.error('Error fetching guest:', error);
      res.status(500).json({ error: 'Failed to fetch guest.' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.guest.delete({
        where: { id: parseInt(guestId, 10) },
      });
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting guest:', error);
      res.status(500).json({ error: 'Failed to delete guest.' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { firstName, lastName } = req.body;
      const updatedGuest = await prisma.guest.update({
        where: { id: parseInt(guestId, 10) },
        data: { firstName, lastName },
      });
      res.status(200).json(updatedGuest);
    } catch (error) {
      console.error('Error updating guest:', error);
      res.status(500).json({ error: 'Failed to update guest.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
