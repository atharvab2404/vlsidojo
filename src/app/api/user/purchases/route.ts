// app/api/user/purchases/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
  }

  const purchases = await prisma.purchase.findMany({
    where: { userId: session.user.id, status: "paid" },
    include: { dojo: true },
  });

  return NextResponse.json({ success: true, purchases });
}
