import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const barters = await prisma.barter.findMany({
      include: {
        itemOwner: true,
        itemOffered: true
      }
    });
    return new Response(JSON.stringify({ barters }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching barters:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch barters" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}