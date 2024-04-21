import prisma from "@/prisma/prismaClient";
import {NextResponse} from "next/server";

export const GET = async (req: Request)=> {
    try {
        const products = await prisma.product.findMany({
        });
        return new NextResponse(JSON.stringify(products), {status: 200});
    } catch (error) {
        return new NextResponse('Internal Server Error' + error, {status: 500});
    }
}

export const POST = async (req: Request)=> {
    try {
        const body = await req.json();
        const { name, nutrition } = body;
        const newNutrition = await prisma.nutrition.create({
            data: {
                ...nutrition,
            },
        });
        const newProduct = await prisma.product.create({
            data: {
                name,
                nutrition: {
                    connect: { id: newNutrition.id },
                },
            },
            include: {
                nutrition: true,
            },
        });
        return new NextResponse(JSON.stringify(newProduct), {status: 201});
    } catch (error) {
        return new NextResponse('Internal Server Error' + error, {status: 500});
    }
}