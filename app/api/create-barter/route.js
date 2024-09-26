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
        console.log(body)

        const barter = await prisma.barter.create({
            data: {
                itemOffered: {
                    connect: {
                        id: body.itemOfferedId
                    }
                }
            }
        })




    } catch (error) {
        console.error("Error creating item:", error);
        return NextResponse.json({error: "Failed to create item", details: error.message}, {status: 500});
    }
}