import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function POST(req) {
    const {searchParams} = new URL(req.url);
    const offerId = searchParams.get("offerId");
    const action = searchParams.get("action");

    if (!offerId || !action) {
        return NextResponse.json({error: "Missing offerId or action"}, {status: 400});
    }

    let offerStatus, barterStatus;

    if (action === "accept") {
        offerStatus = "ACCEPTED";
        barterStatus = "CLOSED";
    } else if (action === "decline") {
        offerStatus = "DECLINED";
        barterStatus = "OPEN";
    } else {
        return NextResponse.json({error: "Invalid action"}, {status: 400});
    }

    try {
        const offer = await prisma.offer.update({
            where: {offerId},
            data: {status: offerStatus},
            include: {barter: true}
        });

        await prisma.barter.update({
            where: {barterId: offer.barterId},
            data: {status: barterStatus}
        });

        return NextResponse.json({message: `Barter ${action}ed successfully`});
    } catch (error) {
        console.error(`Error ${action}ing barter:`, error);
        return NextResponse.json({error: `Failed to ${action} barter`}, {status: 500});
    }
}