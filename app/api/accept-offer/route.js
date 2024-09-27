import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function POST(req) {
    try {
        const body = await req.json()

        const updatedBarter = await prisma.barter.update({
            where: {
                barterId: body.barterId
            },
            data: {
                status: "Accepted"
            },
            include: {
                itemOffered: true,
                barterOwner: true,
                counterOfferUser: true,
                counterOfferedItem: true
            }
        })

        return NextResponse.json(updatedBarter)

    } catch (error) {
        return NextResponse.error({
            message: error.message
        })
    }
}