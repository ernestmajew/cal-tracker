import prisma from "@/prisma/prismaClient";
import {NextResponse} from "next/server";

export const GET = async (req: Request, context: { params: any})=> {
    const productId = parseInt(context.params.id);
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
            return new NextResponse(JSON.stringify({ error: 'Product not found' }), {status: 404});
        }
        return new NextResponse(JSON.stringify(product), {status: 200});
    } catch (error) {
        return new NextResponse('Internal Server Error' + error, {status: 500});
    }
}

export const DELETE = async (req: Request, context: { params: any})=> {
    const productId = parseInt(context.params.id);
    try {
        const deletedProduct = await prisma.product.delete({
            where: {
                id: productId,
            },
        });
        if (!deletedProduct) {
            return new NextResponse(JSON.stringify({ error: 'Product not found' }), {status: 404});
        }
        return new NextResponse(JSON.stringify(deletedProduct), {status: 200});
    } catch (error) {
        return new NextResponse('Internal Server Error' + error, {status: 500});
    }
}

export const PUT = async (req: Request, context: { params: any})=> {
    const productId = parseInt(context.params.id);
    try {
        const body = await req.json();
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
        if (!updatedProduct) {
            return new NextResponse(JSON.stringify({ error: 'Product not found' }), {status: 404});
        }
        return new NextResponse(JSON.stringify(updatedProduct), {status: 200});
    } catch (error) {
        return new NextResponse('Internal Server Error' + error, {status: 500});
    }
}