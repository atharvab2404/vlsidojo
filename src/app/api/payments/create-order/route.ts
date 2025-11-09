// app/api/payments/create-order/route.ts
import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DISCOUNTS: Record<string, number> = {
  SAVE20: 0.20,
  SAVE10: 0.10,
};

function normalizePriceToPaise(price: any) {
  if (typeof price !== "number") return 0;
  if (price < 1000) return Math.round(price * 100);
  return Math.round(price);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ✅ Initialize Razorpay ONLY at runtime
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: "items[] required for order creation" },
        { status: 400 }
      );
    }

    // ✅ Calculate total price
    let amountPaise = body.items.reduce((acc: number, it: any) => {
      const price = it?.price ?? 0;
      const qty = Number(it?.quantity ?? 1);
      const ppaise = normalizePriceToPaise(price);
      return acc + ppaise * Math.max(1, qty);
    }, 0);

    // ✅ Discount
    let discountApplied = null;
    if (body.code) {
      const normalized = String(body.code).toUpperCase();
      const discountRate = DISCOUNTS[normalized];
      if (discountRate) {
        const discountAmount = Math.floor(amountPaise * discountRate);
        amountPaise -= discountAmount;
        discountApplied = normalized;
      }
    }

    if (amountPaise <= 0) {
      return NextResponse.json(
        { error: "Invalid final amount after discount" },
        { status: 400 }
      );
    }

    // ✅ Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: {
        items: JSON.stringify(body.items ?? []),
        discountCode: discountApplied,
      },
    });

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      discountApplied,
    });
  } catch (err: any) {
    console.error("[create-order] error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}
