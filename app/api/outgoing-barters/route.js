import prisma from "@/lib/prisma";
import {auth} from "@/auth"
import {NextResponse} from "next/server";

export async function GET() {
    const session = await auth()

    const outgoingBarters = await prisma.barter.findMany({
        where: {
            status: "counter-offered",
            counterOfferUserId: session.user.id
        }
    })

    return NextResponse.json(outgoingBarters)
}