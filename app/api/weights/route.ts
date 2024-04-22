import prisma from "@/prisma/prismaClient";
import {NextResponse} from "next/server";

export const GET = async (req: Request)=> {
    try {
        const weights = await prisma.productWeight.findMany({
        });
        if (!weights) {
            return new NextResponse(JSON.stringify({ error: 'Products weights not found' }), {status: 404});
        }
        return new NextResponse(JSON.stringify(weights), {status: 200});
    } catch (error) {
        return new NextResponse('Internal Server Error' + error, {status: 500});
    }
}
