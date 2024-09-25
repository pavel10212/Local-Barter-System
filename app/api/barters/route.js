import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function GET() {
    try {
        const barters = await prisma.barter.findMany({
            include: {
                itemOwner: true,
                itemOffered: true
            }
        });

        return new NextResponse(200, barters);
    } catch (error) {
        console.error("Error fetching barters:", error);
        return new NextResponse(500, {message: "Error fetching barters"});
    }
}