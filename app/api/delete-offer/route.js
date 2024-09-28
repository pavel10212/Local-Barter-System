import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";


export async function DELETE(req) {
    const url = new URL(req.url)
    const offerId = url.searchParams.get("offerId")

    await prisma.offer.delete({
        where: {
            offerId
        }
    })
    return NextResponse.json("Offer deleted")
}