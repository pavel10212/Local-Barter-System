import prisma from "@/lib/prisma";
import {auth} from "@/auth";
import {NextResponse} from "next/server";


export async function POST(req) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    const {firstName, lastName, email, address, phoneNumber} = req.body

    const user = await prisma.user.update({
        where: {
            id: session.user.id
        },
        data: {
            firstName,
            lastName,
            email,
            address,
            phoneNumber
        }
    })

    return NextResponse.json(user)
}