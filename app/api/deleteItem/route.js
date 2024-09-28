import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";
import {del} from "@vercel/blob";

export async function DELETE(req) {
    try {
        const {searchParams} = new URL(req.url);
        const itemId = searchParams.get("itemId");

        const item = await prisma.item.findUnique({
            where: {
                itemId: itemId
            }
        });

        if (!item) {
            return NextResponse.json({message: "Item not found"}, {status: 404});
        }

        if (item.image) {
            await del(item.image);
        }

        await prisma.item.delete({
            where: {
                itemId: itemId
            }
        });

        return NextResponse.json({message: "Item deleted successfully"});
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "Failed to delete item"}, {status: 500});
    }
}