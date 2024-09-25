import prisma from "@/lib/prisma";
import {auth} from "@/auth"
import {NextResponse} from "next/server";

export async function GET() {
    const session = await auth()
    const items = await prisma.item.findMany({
        where: {
            itemOwner: {
                userId: session.user.id
            }
        }
    })

    return NextResponse.json(items)
}