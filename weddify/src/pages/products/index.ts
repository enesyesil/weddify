import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from './../../../prisma/prisma'; // Adjust path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST': {
      // Create a new product
      const { name, price, description } = req.body;
      try {
        const newProduct = await prisma.product.create({
          data: { name, price, description },
        });
        return res.status(201).json(newProduct);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to create product' });
      }
    }

    case 'GET': {
      // Fetch all products
      try {
        const products = await prisma.product.findMany();
        return res.status(200).json(products);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch products' });
      }
    }

    default:
      // Method not allowed
      res.setHeader('Allow', ['POST', 'GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
