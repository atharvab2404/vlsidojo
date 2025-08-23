import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // assuming you're using Prisma for DB

export async function GET(req: Request, { params }: { params: { email: string } }) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: params.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
