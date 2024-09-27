import prisma from "@/lib/prisma";
import { auth } from "@/auth"
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    // Fetch barters for the specified userId
    const incomingBartersById = await prisma.barter.findMany({
        where: {
            userId: userId,
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

    return NextResponse.json(incomingBartersById);
}