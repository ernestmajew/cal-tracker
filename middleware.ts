"use server";

import {NextApiRequest, NextApiResponse} from "next";
import jwt from "jsonwebtoken";
import {getSession, verifyAuth} from "@/utils/actions";
import { getIronSession} from "iron-session";
import {defaultSession, SessionData, sessionOptions } from "@/utils/lib";
import {cookies} from "next/headers";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {NextResponse} from "next/server";
import {redirect} from "next/navigation";

export async function middleware(req: NextApiRequest) {

    const verifiedToken =
        (await verifyAuth()
            .catch((error) => {
            console.log(error);
        }));
    console.log("TOKEN")
    console.log(verifiedToken);



    if (req.url && req.url.startsWith('/login') && !verifiedToken){
        return NextResponse.rewrite(new URL('/login', req.url))
    }

    if (req.url && req.url.includes('/login') && verifiedToken){
        return NextResponse.rewrite(new URL('/dashboard', req.url))
    }

    if (req.url && req.url.includes('/api/products') && verifiedToken){
        return NextResponse.rewrite(new URL('/api/products', req.url))
    }

    if (!verifiedToken && req.url){
        return NextResponse.rewrite(new URL('/login', req.url))
    }

    return
}

// export const config = {
//     matcher: [
//         '/api/products/*'
//     ]
// }