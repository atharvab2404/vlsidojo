// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";

// export async function GET(req: NextRequest) {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) {
//     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//   }

//   const user = await prisma.user.findUnique({
//     where: { email: session.user.email },
//   });

//   if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

//   return NextResponse.json(user);
// }

// export async function POST(req: NextRequest) {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) {
//     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//   }

//   const data = await req.json();

//   try {
//     const updatedUser = await prisma.user.update({
//       where: { email: session.user.email },
//       data: {
//         phone: data.phone,
//         college: data.college,
//         education: data.education,
//         branch: data.branch,
//         year: data.year,
//         company: data.company,
//         signupCompleted: true,
//       },
//     });

//     return NextResponse.json(updatedUser);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const data = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        phone: data.phone,
        college: data.college,
        education: data.education,
        branch: data.branch,
        year: data.year,
        company: data.company,
        signupCompleted: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
