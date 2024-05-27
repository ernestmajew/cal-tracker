import prisma from "@/prisma/prismaClient";
import {NextResponse} from "next/server";
import {comparePasswords, hashPassword} from "@/utils/password";
import {getSession} from "@/utils/actions";

// [{"id":4,
//  "username":"user1",
//  "email":"user1@example.com",
//  "password":"$2b$12$WbSsK8ISbmsX.BHa1bqo6.zbTDb5QfNOwt4XkgsWQXt11ZbSIIadW"}]

export const GET = async (req: Request, context: { params: any})=> {
    const session = await getSession();
    try {
        if (!session.id) {
            return new NextResponse('Session not found', { status: 404 });
        }
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(session.id),
            },
            select: {
                username: true,
                email: true,
                caloriesTarget: true,
                protein: true,
                carbs: true,
                fat: true,
                sugar: true
            },
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
            select: {
                email: true,
            }
        });
        if (!deletedUser) {
            return new NextResponse(JSON.stringify({ error: 'User not found' }), {status: 404});
        }
        return new NextResponse(JSON.stringify(deletedUser), {status: 200});
    } catch (error) {
        return new NextResponse('Internal Server Error' + error, {status: 500});
    }
}
export const POST = async (req: Request)=> {
    try {
        const body = await req.json();
        const { username, email, password } = body;
        const hash = await hashPassword(password);
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (existingUser) {
            return new NextResponse('Email already exists', { status: 400 });
        }
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hash,
            },
            select: {
                username: true,
                email: true,
            }
        });
        return new NextResponse(JSON.stringify(newUser), {status: 201});
    } catch (error) {
        return new NextResponse('Internal Server Error' + error, {status: 500});
    }
}

export const PUT = async (req: Request, context: { params: any }) => {
    const session = await getSession();
    try {
        if (!session.id) {
            return new NextResponse('Session not found', { status: 404 });
        }
        const body = await req.json();
        const { caloriesTarget, protein, carbs, fat, sugar } = body;
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(session.id) },
            data: {
                caloriesTarget,
                protein,
                carbs,
                fat,
                sugar
            },
            select: {
                id: true,
                email: true,
                username: true,
                caloriesTarget: true,
                protein: true,
                carbs: true,
                fat: true,
                sugar: true
            },
        });
        if (!updatedUser){
            return new NextResponse(JSON.stringify({ error: 'User not found' }), {status: 404});
        }
        return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
    } catch (error) {
        return new NextResponse('Internal Server Error' + error, {status: 500});
    }
};
