import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/prismaClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        method,
        query: { id },
        body,
    } = req;

    const productId = parseInt(id as string);

    switch (method) {
        case 'GET':
            try {
                const product = await prisma.product.findUnique({
                    where: {
                        id: productId,
                    },
                    include: {
                        category: true,
                    },
                });

                if (!product) {
                    res.status(404).json({ error: 'Product not found' });
                    return;
                }

                res.status(200).json(product);
            } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;
        case 'PUT':
            try {
                const { name, categoryId } = body;
                const updatedProduct = await prisma.product.update({
                    where: {
                        id: productId,
                    },
                    data: {
                        name,
                        categoryId,
                    },
                });
                res.status(200).json(updatedProduct);
            } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;
        case 'DELETE':
            try {
                const deletedProduct = await prisma.product.delete({
                    where: {
                        id: productId,
                    },
                });
                res.status(200).json(deletedProduct);
            } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}