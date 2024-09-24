import {NextResponse} from "next/server";
import {auth} from "./auth";

export default async function middleware(request) {
    try {
        const session = await auth();
        const {pathname, origin} = request.nextUrl;

        const publicRoutes = ["/login", "/register", "/"];



        if (publicRoutes.includes(pathname)) {
            return NextResponse.next();
        }

        if (!session) {
            return NextResponse.redirect(`${origin}/login`);
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Middleware error:", error);
        return NextResponse.error();
    }
}


export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}