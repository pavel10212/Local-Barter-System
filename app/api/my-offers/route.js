import prisma from "@/lib/prisma";
import {auth} from "@/auth"
import {NextResponse} from "next/server";

export async function GET() {
    const session = await auth()

    const myOffers = await prisma.offer.findMany({
        where: {
            userId: session.user.id
        },
        include: {
            item: true,
            barter: {
                include: {
                    item: true,
                    barterOwner: true,
                }
            },
            offerCreator: true,
        }
    })

    return NextResponse.json(myOffers)
}