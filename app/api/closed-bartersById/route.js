import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    let statusCondition = {};
    if (status === 'CLOSED') {
        statusCondition = {
            status: {
                in: ['CLOSED']
            }
        };
    }

    // Fetch barters for the specified userId
    const closebBartersById = await prisma.barter.findMany({
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

    console.log("2Fetching barters for userId:", userId, "with status condition:", statusCondition);
    console.log("2Fetched barters:", closebBartersById);

    return NextResponse.json(closebBartersById);
}