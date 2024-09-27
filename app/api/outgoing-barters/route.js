import prisma from "@/lib/prisma";
import {auth} from "@/auth"
import {NextResponse} from "next/server";

export async function GET() {
    const session = await auth()
    const outgoingBarters = await prisma.barter.findMany({
        where: {
            offers: {
                some: {
                    userId: session.user.id
                }
            }
        },
        include: {
            barterOwner: true,
            item: true,
            offers: true,
        }
    })

    return NextResponse.json(outgoingBarters)
}