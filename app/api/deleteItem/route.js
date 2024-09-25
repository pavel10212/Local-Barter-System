import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";
import {del} from "@vercel/blob"

export async function POST(req) {
    try {
        const body = await req.json()

        const item = await prisma.item.findUnique({
            where: {
                itemId: body.id
            }
        })
        if (!item) {
            return NextResponse.json({message: "Item not found"}, {status: 404});
        }

        if (item.image) {
            await del(item.image)
        }

        await prisma.item.delete({
            where: {
                itemId: body.id
            }
        })
        return NextResponse.json({message: "Item deleted"})
    } catch (error) {
        console.error(error)
        return NextResponse.json({message: "Failed to delete item"}, {status: 500});
    }
}