   // app/api/incoming-barterById/route.js (for App Router)
   import { NextResponse } from 'next/server';
   import prisma from '@/lib/prisma';

   export async function GET(request) {
     const { searchParams } = new URL(request.url);
     const userId = searchParams.get('userId');

     if (!userId) {
       return NextResponse.json({ error: "User ID is required" }, { status: 400 });
     }

     try {
       const incomingBarters = await prisma.barter.findMany({
         where: {
           userId: userId,
         },
         include: {
           barterOwner: true,
           item: true,
           offers: {
             include: {
               item: true,
               offerCreator: true,
             },
           },
         }
       });

       return NextResponse.json(incomingBarters);
     } catch (error) {
       console.error("Error fetching incoming barters:", error);
       return NextResponse.json({ error: "Failed to fetch incoming barters" }, { status: 500 });
     }
   }