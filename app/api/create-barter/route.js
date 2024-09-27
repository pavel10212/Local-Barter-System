import {auth} from "@/auth";
import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";


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

        const formattedBarter = {
            barterId: barter.barterId,
            description: barter.description,
            itemSeeking: barter.itemSeeking,
            status: barter.status,
            createdAt: barter.createdAt,
            item: barter.item,
            barterOwner: barter.barterOwner
        };

        return NextResponse.json(formattedBarter, {status: 201});
    } catch (error) {
        console.error("Error creating item:", error);
        return NextResponse.json({error: "Failed to create item", details: error.message}, {status: 500});
    }
}