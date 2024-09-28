import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";
import {auth} from "@/auth"

export async function POST(req) {
    try {
        const body = await req.json();
        const user = await auth()
        const {itemId, barterId} = body;

        const offer = await prisma.offer.findFirst({
            where: {
                barterId,
                itemId,
            }
        })

        console.log(offer)

        if (offer) {
            return NextResponse.json(
                {message: "This item has already been offered!"},
                {status: 400}
            );
        }

        const newOffer = await prisma.offer.create({
            data: {
                offerCreator: {
                    connect: {
                        userId: user.user.id
                    }
                },
                barter: {
                    connect: {
                        barterId
                    }
                },
                item: {
                    connect: {
                        itemId
                    }
                },
                status: "PENDING"
            },
            include: {
                offerCreator: true,
            }
        })
        return NextResponse.json(newOffer);
    } catch (error) {
        console.error("Error creating offer:", error);
        return NextResponse.json(
            {message: "Error creating offer"},
            {status: 500}
        );
    }
}