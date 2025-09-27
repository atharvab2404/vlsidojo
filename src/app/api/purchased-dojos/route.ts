// src/app/api/purchased-dojos/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; // adjust import if needed
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ purchased: [] }, { status: 401 });
    }

    // ✅ Fetch all purchased dojo IDs for this user
    const purchases = await prisma.purchase.findMany({
      where: {
        user: { email: session.user.email },
        status: "paid",
      },
      select: { dojoId: true },
    });

    const purchased = purchases.map((p) => p.dojoId);

    return NextResponse.json({ purchased });
  } catch (err) {
    console.error("[purchased-dojos] error", err);
    return NextResponse.json({ purchased: [] }, { status: 500 });
  }
}
