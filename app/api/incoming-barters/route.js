import prisma from "@/lib/prisma";
import {auth} from "@/auth"
import {NextResponse} from "next/server";

export async function GET() {
    const session = await auth()

    const incomingBarters = await prisma.barter.findMany({
        where: {
            userId: session.user.id,
            status: "counter-offered"
        }
    })

    return NextResponse.json(incomingBarters)
}