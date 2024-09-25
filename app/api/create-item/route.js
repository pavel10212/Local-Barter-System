import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";
import {auth} from "@/auth"


export async function POST(req) {
    try {
        const body = await req.json()
        const session = await auth()
        const item = await prisma.item.create({
            data: {
                name: body.name,
                description: body.description,
                image: body.image,
                itemOwner: {
                    connect: {
                        userId: session.user.id
                    }
                }
            }
        })

        return NextResponse.json(item)

    } catch (error) {
        console.error(error)
        return NextResponse.error(new Error("Failed to create item"))
    }
}