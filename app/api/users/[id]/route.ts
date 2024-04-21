import prisma from "@/prisma/prismaClient";
import {NextResponse} from "next/server";
import {getSession} from "@/utils/actions";

export const GET = async (req: Request, context: { params: any})=> {
    const session = await getSession();
    try {
        if (!session.id) {
            return new NextResponse('Session not found', { status: 404 });
        }
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(session.id),
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
    const session = await getSession();
    try {
        if (!session.id) {
            return new NextResponse('Session not found', { status: 404 });
        }
        const deletedUser = await prisma.user.delete({
            where: {
                id: parseInt(session.id),
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