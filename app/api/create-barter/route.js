import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";
import {auth} from '@/auth'

export async function POST(req) {
    try {
        const body = await req.json();
        const session = await auth()
        if (!session) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
        const userId = session.user.id;

        const barter = await prisma.barter.create({
            data: {
                itemOffered: {
                    connect: {
                        itemId: body.itemId
                    }
                },
                itemSeeking: body.itemSeeking,
                description: body.description,
                status: "OPEN",
                barterOwner: {
                    connect: {
                        userId
                    }
                }
            },
            include: {
                itemOffered: true,
                barterOwner: true
            }
        });

        return NextResponse.json(barter, {status: 201});
    } catch (error) {
        console.error("Error creating item:", error);
        return NextResponse.json({error: "Failed to create item", details: error.message}, {status: 500});
    }
}