import prisma from "@/lib/prisma";
import {auth} from "@/auth"
import {NextResponse} from "next/server";

export async function GET() {
    const session = await auth()

    const incomingBarters = await prisma.barter.findMany({
        where: {
            userId: session.user.id,
            status: "Counter-offered"
        },
        include: {
            itemOffered: true,
            barterOwner: true,
            counterOfferUser: true,
            counterOfferedItem: true
        }
    })

    console.log(incomingBarters)

    return NextResponse.json(incomingBarters)
}