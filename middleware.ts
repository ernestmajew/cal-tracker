import {NextApiRequest} from "next";
import {verifyAuth} from "@/utils/actions";
import {NextResponse} from "next/server";

export async function middleware(req: NextApiRequest) {

    const verifiedToken =
        (await verifyAuth()
            .catch((error) => {
            console.log(error);
        }));

    if(!verifiedToken){
        return NextResponse.redirect(new URL('/login', req.url));
    }

}

//middleware is working on specified endpoints in matcher
export const config = {
    matcher: [
        // '/api/products',
        '/api/products/:id(\\d+)',
        '/api/users'
    ]
}