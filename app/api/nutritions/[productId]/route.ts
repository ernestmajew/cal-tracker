import prisma from "@/prisma/prismaClient";
import {NextResponse} from "next/server";

export const GET = async (req: Request, context: { params: any})=> {
    const productId = parseInt(context.params.productId);
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            },
            include: {
                nutrition: true
            }
        });
        if (!product) {
            return new NextResponse(JSON.stringify({ error: 'Product not found' }), {status: 404});
        }
        return new NextResponse(JSON.stringify(product), {status: 200});
    } catch (error) {
        return new NextResponse('Internal Server Error' + error, {status: 500});
    }
}

export const PUT = async (req: Request, context: { params: any }) => {
    const productId = parseInt(context.params.productId);
    try {
        const body = await req.json();
        const { calories, protein, carbs, fat, sugar } = body;
        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            },
            include: {
                nutrition: true
            }
        });

        if (!product) {
            return new NextResponse(JSON.stringify({ error: 'Product not found' }), { status: 404 });
        }

        let nutrition;

        if (product.nutrition) {
            nutrition = await prisma.nutrition.update({
                where: {
                    id: product.nutrition.id
                },
                data: {
                    calories,
                    protein,
                    carbs,
                    fat,
                    sugar
                }
            });
        } else {
            nutrition = await prisma.nutrition.create({
                data: {
                    calories,
                    protein,
                    carbs,
                    fat,
                    sugar
                }
            });
        }

        const updatedProduct = await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                nutrition: {
                    connect: {
                        id: nutrition.id
                    }
                }
            }
        });

        return new NextResponse(JSON.stringify(updatedProduct), { status: 200 });
    } catch (error) {
        return new NextResponse('Internal Server Error' + error, { status: 500 });
    }
}