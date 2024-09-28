import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function DELETE(req) {
    const url = new URL(req.url)
    const barterId = url.searchParams.get("barterId")

    await prisma.barter.delete({
        where: {
            barterId
        }
    })
    return NextResponse.json("Barter deleted")
}