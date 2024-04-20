import prisma from "@/prisma/prismaClient";
import {NextResponse} from "next/server";

export const GET = async (req: Request)=> {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true,
            },
        });
        return new NextResponse(JSON.stringify(products), {status: 200});
    } catch (error) {
        return new NextResponse('Internal Server Error' + error, {status: 500});
    }
}

export const POST = async (req: Request)=> {
    try {
        const body = await req.json();
        const { name, categoryId } = body;
        const newProduct = await prisma.product.create({
            data: {
                name,
                categoryId,
            },
        });
        return new NextResponse(JSON.stringify(newProduct), {status: 201});
    } catch (error) {
        return new NextResponse('Internal Server Error' + error, {status: 500});
    }
}