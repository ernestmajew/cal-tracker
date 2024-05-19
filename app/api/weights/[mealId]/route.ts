import prisma from "@/prisma/prismaClient";
import {NextResponse} from "next/server";
import {getSession} from "@/utils/actions";

export const GET = async (req: Request, context: { params: any})=> {
    const mealId = parseInt(context.params.mealId);
    try {
        const session = await getSession();
        if (!session || !session.id) {
            return new NextResponse('Session not found', { status: 404 });
        }
        if (!mealId) {
            return new NextResponse('Invalid meal id', { status: 400 });
        }
        const weights = await prisma.productWeight.findMany({
            where: {
                mealId: mealId
            },
            include: {
                product: {
                    include: {
                        nutrition: true
                    }
                }
            }
        });
        if (!weights) {
            return new NextResponse(JSON.stringify({ error: 'Weights not found' }), {status: 404});
        }
        return new NextResponse(JSON.stringify(weights), {status: 200});
    } catch (error) {
        return new NextResponse('Internal Server Error' + error, {status: 500});
    }
}