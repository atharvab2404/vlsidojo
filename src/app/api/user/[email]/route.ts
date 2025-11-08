import { NextResponse } from "next/server";
import type { Params } from "next/dist/server/request-types"; 
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  context: { params: Params }
) {
  try {
    const email = context.params.email;

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    let user = await prisma.user.findUnique({
      where: { email },
    });

    // ✅ If user doesn't exist, create it
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
