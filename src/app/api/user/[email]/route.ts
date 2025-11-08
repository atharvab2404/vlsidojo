// src/app/api/user/[email]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, context: any) {
  try {
    const email = context?.params?.email;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    let user = await prisma.user.findUnique({
      where: { email },
    });

    // Create the user if it doesn't exist
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: email.split("@")[0],
          image: "/default-profile.png",
        },
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching/creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
