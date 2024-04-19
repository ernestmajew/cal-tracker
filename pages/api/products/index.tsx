import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/prismaClient';
import {middleware} from "@/middleware";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body } = req;
    await middleware(req);
    switch (method) {
        case 'GET':
            try {
                const products = await prisma.product.findMany({
                    include: {
                        category: true,
                    },
                });
                res.status(200).json(products);
            } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;
        case 'POST':
            try {
                const { name, categoryId } = body;
                const newProduct = await prisma.product.create({
                    data: {
                        name,
                        categoryId,
                    },
                });
                res.status(201).json(newProduct);
            } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}