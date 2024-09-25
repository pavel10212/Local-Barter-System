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


        const item = await prisma.item.create({
            data: {
                name: body.name,
                description: body.description,
                itemOwner: {
                    connect: {userId: userId}
                },
                barters: {
                    create: {
                        itemSeeking: body.itemSeeking,
                        status: "OPEN",
                        itemOwner: {
                            connect: {userId: userId}
                        }
                    }
                }
            },
            include: {
                itemOwner: true,
                barters: true
            }
        });
        return NextResponse.json(item, {status: 201});
    } catch (error) {
        console.error("Error creating item:", error);
        return NextResponse.json({error: "Failed to create item", details: error.message}, {status: 500});
    }
}