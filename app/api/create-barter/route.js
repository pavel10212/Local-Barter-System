import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";
import {auth} from '@/auth'

export async function POST(req) {
    try {
        const body = await req.json();
        const {itemId, itemSeeking, description} = body;
        const session = await auth()
        const userId = session.user.id;

        const barter = await prisma.barter.create({
            data: {
                description,
                itemSeeking,
                barterOwner: {
                    connect: {
                        userId
                    }
                },
                status: "open",
                item: {
                    connect: {
                        itemId
                    }
                }
            },
            include: {
                item: true,
                barterOwner: true,
            }
        });


        return NextResponse.json(barter, {status: 201});
    } catch
        (error) {
        console.error("Error creating item:", error);
        return NextResponse.json({error: "Failed to create item", details: error.message}, {status: 500});
    }
}