import prisma from "@/lib/prisma";
import {auth} from "@/auth"
import {NextResponse} from "next/server";

export async function GET() {
    const session = await auth()

    const incomingBarters = await prisma.barter.findMany({
        where: {
            userId: session.user.id,
        },
        include: {
            barterOwner: true,
            item: true,
            offers: {
                include: {
                    item: true,
                    offerCreator: true,
                },
            },
        }
    })

    return NextResponse.json(incomingBarters)
}