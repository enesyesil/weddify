import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Missing user ID' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { subscription: true, subscriptionEnd: true },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const hasActiveSubscription =
      user.subscription !== 'none' && user.subscriptionEnd && new Date(user.subscriptionEnd) > new Date();

    res.status(200).json({ hasActiveSubscription });
  } catch (error) {
    console.error('Error checking subscription:', error);
    res.status(500).json({ error: 'Failed to check subscription' });
  }
}
