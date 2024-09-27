import prisma from "@/lib/prisma";
import {auth} from "@/auth"
import {NextResponse} from "next/server";

export async function POST(req) {
    try {
        const body = await req.json()

        const session = await auth()

        const barter = await prisma.barter.update({
            where: {
                barterId: body.barter
            },
            data: {
                counterOfferedItem: {
                    connect: {
                        itemId: body.item
                    }
                },
                counterOfferUser: {
                    connect: {
                        userId: session.user.id
                    }
                },
                status: "Counter-offered"
            },
            include: {
                barterOwner: true,
                itemOffered: true,
                counterOfferedItem: true,
                counterOfferUser: true
            }
        });

        return NextResponse.json(barter, {status: 201})
    } catch (error) {
        console.error("Error creating item:", error)
        return NextResponse.json({error: "Failed to create item", details: error.message}, {status: 500})
    }
}