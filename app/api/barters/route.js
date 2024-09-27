import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";
import {auth} from "@/auth"

export async function GET() {
    try {
        const session = await auth()

        const barters = await prisma.barter.findMany({
            where: {
                barterOwner: {
                    userId: {
                        not: session.user.id
                    }
                }
            },
            include: {
                barterOwner: true,
                item: true
            }
        })
        return NextResponse.json(barters);
    } catch (error) {
        console.error("Error fetching barters:", error);
        return NextResponse.json(
            {message: "Error fetching barters"},
            {status: 500}
        );
    }
}