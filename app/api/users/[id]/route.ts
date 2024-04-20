import prisma from "@/prisma/prismaClient";
import {NextResponse} from "next/server";

export const GET = async (req: Request, context: { params: any})=> {
    const userId = parseInt(context.params.id);
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            }
        });
        if (!user) {
            return new NextResponse(JSON.stringify({ error: 'User not found' }), {status: 404});
        }
        return new NextResponse(JSON.stringify(user), {status: 200});
    } catch (error) {
        return new NextResponse('Internal Server Error' + error, {status: 500});
    }
}

export const DELETE = async (req: Request, context: { params: any})=> {
    const userId = parseInt(context.params.id);
    try {
        const deletedUser = await prisma.user.delete({
            where: {
                id: userId,
            },
        });
        if (!deletedUser) {
            return new NextResponse(JSON.stringify({ error: 'User not found' }), {status: 404});
        }
        return new NextResponse(JSON.stringify(deletedUser), {status: 200});
    } catch (error) {
        return new NextResponse('Internal Server Error' + error, {status: 500});
    }
}