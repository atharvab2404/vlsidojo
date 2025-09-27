import { NextResponse } from "next/server";

const DISCOUNTS: Record<string, number> = {
  SAVE20: 0.20, // 20% off
  SAVE10: 0.10, // 10% off
};

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json(
        { error: "No code provided" },
        { status: 400 }
      );
    }

    const normalizedCode = code.toUpperCase();
    const discountRate = DISCOUNTS[normalizedCode];

    if (!discountRate) {
      return NextResponse.json(
        { error: "Invalid code" },
        { status: 400 }
      );
    }

    // ✅ Return normalized code + discount rate
    return NextResponse.json({
      valid: true,
      code: normalizedCode,
      discountRate,
    });
  } catch (err) {
    console.error("discount validate error:", err);
    return NextResponse.json(
      { error: "Failed to validate discount" },
      { status: 500 }
    );
  }
}
