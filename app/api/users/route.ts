import prisma from "@/prisma/prismaClient";
import {NextResponse} from "next/server";
import {comparePasswords, hashPassword} from "@/utils/password";

// [{"id":4,
//  "username":"user1",
//  "email":"user1@example.com",
//  "password":"$2b$12$WbSsK8ISbmsX.BHa1bqo6.zbTDb5QfNOwt4XkgsWQXt11ZbSIIadW"}]

export const GET = async (req: Request)=> {
    try {
        const users = await prisma.user.findMany({});
        return new NextResponse(JSON.stringify(users), {status: 200});
    } catch (error) {
        return new NextResponse('Internal Server Error' + error, {status: 500});
    }
}

export const POST = async (req: Request)=> {
    try {
        const body = await req.json();
        const { username, email, password } = body;
        const hash = await hashPassword(password);
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hash, // Storing the hashed password in the database
            },
        });
        return new NextResponse(JSON.stringify(newUser), {status: 201});
    } catch (error) {
        return new NextResponse('Internal Server Error' + error, {status: 500});
    }
}
