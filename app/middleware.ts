"use server";

import {NextApiRequest} from "next";
import {verifyAuth} from "@/utils/actions";
import {NextResponse} from "next/server";

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

    if (req.url && req.url.startsWith('/dashboard') && !verifiedToken){
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