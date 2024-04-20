import prisma from "@/prisma/prismaClient";
import {NextResponse} from "next/server";
import {comparePasswords} from "@/utils/password";
import {getSession, login} from "@/utils/actions";
import jwt from "jsonwebtoken";

export const GET = async (req: Request)=> {
    try {
        const session = await getSession();
        if (!session) {
            return new NextResponse('Session not found', { status: 404 });
        }
        return new NextResponse(JSON.stringify(session), { status: 200 });
    } catch (error) {
        return new NextResponse('Internal Server Error' + error, { status: 500 });
    }
}

export const POST = async (req: Request)=> {
    try {
        const { email, password } = await req.json();
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return new NextResponse('User not found', { status: 404 });
        }
        const isPasswordMatch = await comparePasswords(password, user.password);
        if (!isPasswordMatch) {
            return new NextResponse('Incorrect password', { status: 401 });
        }
        const session = await getSession();
        session.id = String(user.id);
        session.username = user.email;
        session.isLoggedIn = true;
        session.token = jwt.sign({ username: user.email }, process.env.JWT_SECRET!);
        await session.save();
        return new NextResponse(JSON.stringify(session), { status: 200 });
    } catch (error) {
        return new NextResponse('Internal Server Error' + error, { status: 500 });
    }
}

export const DELETE = async (req: Request)=> {
    try {
        const session = await getSession();
        if (!session.isLoggedIn) {
            return new NextResponse('Session not found', { status: 404 });
        }
        session.destroy();
        return new NextResponse('Session destroyed successfully', { status: 200 });
    } catch (error) {
        return new NextResponse('Internal Server Error' + error, { status: 500 });
    }
}