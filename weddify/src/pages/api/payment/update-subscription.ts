import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { plan, userId } = req.body; // Expect `userId` from the session or request body

  if (!userId || !plan) {
    return res.status(400).json({ error: 'Missing required fields: userId or plan' });
  }

  try {
    // Calculate subscription end date (e.g., 1 month from now)
    const subscriptionEnd = new Date();
    subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1);

    // Update user subscription in the database
    await prisma.user.update({
      where: { id: userId },
      data: {
        subscription: plan, // 'basic', 'premium', or 'enterprise'
        subscriptionEnd,
      },
    });

    res.status(200).json({ message: 'Subscription updated successfully' });
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).json({ error: 'Failed to update subscription' });
  }
}
