import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from "@prisma/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid event ID.' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const event = await prisma.event.findUnique({
        where: { id: parseInt(id, 10) },
        include: { guests: true },
      });

      if (!event) {
        return res.status(404).json({ error: 'Event not found.' });
      }

      if (event.userId !== parseInt(session.user.id, 10)) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      res.status(200).json(event);
    } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).json({ error: 'Failed to fetch event.' });
    }
  } else if (req.method === 'PUT') {
    const { name, date, location, message, headerText, footerText } = req.body;

    if (!name && !date && !location && !message && !headerText && !footerText) {
      return res.status(400).json({ error: 'No fields to update.' });
    }

    try {
      const event = await prisma.event.findUnique({ where: { id: parseInt(id, 10) } });
      if (!event) {
        return res.status(404).json({ error: 'Event not found.' });
      }

      if (event.userId !== parseInt(session.user.id, 10)) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      const updatedEvent = await prisma.event.update({
        where: { id: parseInt(id, 10) },
        data: {
          ...(name && { name }),
          ...(date && { date: new Date(date) }),
          ...(location && { location }),
          ...(message && { message }),
          ...(headerText && { headerText }),
          ...(footerText && { footerText }),
        },
      });
      res.status(200).json(updatedEvent);
    } catch (error) {
      console.error('Error updating event:', error);
      res.status(500).json({ error: 'Failed to update event.' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const event = await prisma.event.findUnique({ where: { id: parseInt(id, 10) } });
      if (!event) {
        return res.status(404).json({ error: 'Event not found.' });
      }

      if (event.userId !== parseInt(session.user.id, 10)) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      await prisma.event.delete({
        where: { id: parseInt(id, 10) },
      });
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ error: 'Failed to delete event.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
