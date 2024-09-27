import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";


export async function POST(req) {
    try {
        const body = await req.json()

        const user = await prisma.user.findFirst({
            where: {
                userId: body.id,
            }
        })

        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({error: "Error fetching user"}, {status: 500})
    }
}