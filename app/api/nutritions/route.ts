import prisma from "@/prisma/prismaClient";
import {NextResponse} from "next/server";

export const GET = async (req: Request)=> {
    try {
        const nutritions = await prisma.nutrition.findMany({
        });
        if (!nutritions) {
            return new NextResponse(JSON.stringify({ error: 'Nutritions not found' }), {status: 404});
        }
        return new NextResponse(JSON.stringify(nutritions), {status: 200});
    } catch (error) {
        return new NextResponse('Internal Server Error' + error, {status: 500});
    }
}