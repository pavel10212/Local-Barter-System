import prisma from "@/lib/prisma";
import {auth} from "@/auth"
import {NextResponse} from "next/server";

export async function GET() {
    const session = await auth()

    const outgoingBarters = await prisma.barter.findMany({
        where: {
            status: "Counter-offered",
            counterOfferUserId: session.user.id
        },
        include: {
            itemOffered: true,
            barterOwner: true,
            counterOfferUser: true,
            counterOfferedItem: true,
        }
    })

    console.log(outgoingBarters)

    return NextResponse.json(outgoingBarters)
}