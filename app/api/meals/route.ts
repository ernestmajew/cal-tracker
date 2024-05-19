import prisma from "@/prisma/prismaClient";
import {NextResponse} from "next/server";
import {getSession} from "@/utils/actions";

interface Product {
    productId: number;
    weight: number;
}

export const GET = async (req: Request)=> {
    const session = await getSession();
    try {
        if (!session.id) {
            return new NextResponse('Session not found', { status: 404 });
        }
        const meals = await prisma.meal.findMany({
            where: {
                userId: parseInt(session.id)
            },
            include: {
                products: true
            }
        });
        return new NextResponse(JSON.stringify(meals), {status: 200});
    } catch (error) {
        return new NextResponse('Internal Server Error' + error, {status: 500});
    }
}

export const POST = async (req: Request)=> {
    const session = await getSession();
    try {
        const body = await req.json();
        const { name, products } = body;
        if (!session.id) {
            return new NextResponse('Session not found', { status: 404 });
        }
        const newMeal = await prisma.meal.create({
            data: {
                name,
                date: new Date(),
                products: {
                    createMany: {
                        data: products.map((product: Product) => ({
                            weight: product.weight,
                            product: {
                                connect: { id: product.productId }
                            }
                        })),
                    },
                },
                user: {
                    connect: { id: parseInt(session.id) }
                }
            },
            include: {
                products: true,
                user: true
            },
        });
        return new NextResponse(JSON.stringify(newMeal), {status: 201});
    } catch (error) {
        return new NextResponse('Internal Server Error' + error, {status: 500});
    }
}