import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    let statusCondition = {};
    if (status === 'open') {
        statusCondition = {
            status: {
                in: ['open', 'offer-received']
            }
        };
    }

    // Fetch barters for the specified userId
    const incomingBartersById = await prisma.barter.findMany({
        where: {
            userId: userId,
            ...statusCondition
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
    });

    console.log("Fetching barters for userId:", userId, "with status condition:", statusCondition);
    console.log("Fetched barters:", incomingBartersById);

    return NextResponse.json(incomingBartersById);
}