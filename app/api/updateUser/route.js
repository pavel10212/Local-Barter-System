import prisma from "@/lib/prisma";
import {auth} from "@/auth";
import {NextResponse} from "next/server";

export async function PUT(req) {
    try {
        const session = await auth();

        const body = await req.json();
        const {firstName, lastName, email, address, phoneNumber, profilePictureUrl} = body;

        const updatedUser = await prisma.user.update({
            where: {
                userId: session.user.id
            },
            data: {
                firstName,
                lastName,
                email,
                address,
                phoneNumber,
                profilePictureUrl,
            }
        });

        return NextResponse.json({success: true, user: updatedUser});
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({error: "Failed to update user"}, {status: 500});
    }
}