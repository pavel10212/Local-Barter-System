import prisma from "@/lib/prisma";
import {auth} from "@/auth"
import {NextResponse} from "next/server";

export async function GET() {
    const session = await auth()
    if (!session) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    const user = await prisma.user.findFirst({
        where: {
            id: session.id
        },
    })
    return NextResponse.json(user)
}