// src/app/api/purchased-dojos/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ purchased: [] }, { status: 401 });
    }

    // ✅ Strongly typed result inferred directly from Prisma
    const purchases = await prisma.purchase.findMany({
      where: {
        user: { email: session.user.email },
        status: "paid",
      },
      select: { dojoId: true },
    });

    // ✅ Explicit type to silence TypeScript
    const purchased = purchases.map((p: { dojoId: string }) => p.dojoId);

    return NextResponse.json({ purchased });
  } catch (err) {
    console.error("[purchased-dojos] error", err);
    return NextResponse.json({ purchased: [] }, { status: 500 });
  }
}
