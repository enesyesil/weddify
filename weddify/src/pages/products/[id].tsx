import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../prisma/prisma'; // Adjust path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Ensure `id` is valid
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  switch (req.method) {
    case 'GET': {
      // Fetch a product by ID
      try {
        const product = await prisma.product.findUnique({
          where: { id: Number(id) },
        });
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        return res.status(200).json(product);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch product' });
      }
    }

    case 'PUT': {
      // Update a product by ID
      const { name, price, description } = req.body;
      try {
        const updatedProduct = await prisma.product.update({
          where: { id: Number(id) },
          data: { name, price, description },
        });
        return res.status(200).json(updatedProduct);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to update product' });
      }
    }

    case 'DELETE': {
      // Delete a product by ID
      try {
        await prisma.product.delete({
          where: { id: Number(id) },
        });
        return res.status(200).json({ message: 'Product deleted successfully' });
      } catch (error) {
        return res.status(500).json({ error: 'Failed to delete product' });
      }
    }

    default:
      // Method not allowed
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
