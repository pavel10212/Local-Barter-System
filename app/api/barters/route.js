import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const barters = await prisma.barter.findMany({
            include: {
                barterOwner: true,
                item: true
            }
        })
        return NextResponse.json(barters);
    } catch (error) {
        console.error("Error fetching barters:", error);
        return NextResponse.json(
            { message: "Error fetching barters" },
            { status: 500 }
        );
    }
}