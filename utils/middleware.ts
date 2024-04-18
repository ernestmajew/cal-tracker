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
        return
    }

    if (req.url && req.url.includes('/login') && verifiedToken){
        redirect("/dashboard");
    }

    if (!verifiedToken && req.url){
        redirect("/");
    }

    return
}

export const config = {
    matcher: [
        '/api/products/*'
    ]
}