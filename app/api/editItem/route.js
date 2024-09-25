import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";
import {del} from "@vercel/blob";

export async function POST(req) {
    try {
        const body = await req.json();
        const {id, name, description, image} = body;

        const currentItem = await prisma.item.findUnique({
            where: {itemId: id},
        });

        const imageChanged = currentItem.image !== image;

        if (imageChanged) {
            await del(currentItem.image);
        }

        const updatedItem = await prisma.item.update({
            where: {
                itemId: id
            },
            data: {
                name,
                description,
                image: imageChanged ? image : undefined,
            }
        });

        return NextResponse.json(updatedItem);
    } catch (error) {
        console.error(error);
        return NextResponse.error(new Error("Failed to update item"));
    }
}