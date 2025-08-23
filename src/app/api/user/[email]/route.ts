import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust if needed

export async function GET(
  req: Request,
  { params }: { params: { email: string } }
) {
  try {
    const { email } = params;

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    let user = await prisma.user.findUnique({
      where: { email },
    });

    // ✅ If user doesn't exist, create a new entry
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: email.split("@")[0], // default name from email
          image: "/default-profile.png", // fallback image
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
