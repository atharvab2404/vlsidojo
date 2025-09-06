import { NextResponse } from "next/server";

const DISCOUNTS: Record<string, number> = {
  SAVE20: 0.20, // 20% off
  SAVE10: 0.10, // 10% off
};

export async function POST(req: Request) {
  const { code } = await req.json();
  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const discountRate = DISCOUNTS[code.toUpperCase()];
  if (!discountRate) {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }

  return NextResponse.json({ discountRate });
}
