// app/api/payments/create-order/route.ts
import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const KEY_ID = process.env.RAZORPAY_KEY_ID || "";
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";

const razorpay = new Razorpay({
  key_id: KEY_ID,
  key_secret: KEY_SECRET,
});

const DISCOUNTS: Record<string, number> = {
  SAVE20: 0.20,
  SAVE10: 0.10,
};

function normalizePriceToPaise(price: any) {
  if (typeof price !== "number") return 0;
  if (price < 1000) return Math.round(price * 100); // treat as rupees -> paise
  return Math.round(price); // already paise
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ✅ 1. items[] is required
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: "items[] required for order creation" },
        { status: 400 }
      );
    }

    // ✅ 2. Compute total price in paise
    let amountPaise = body.items.reduce((acc: number, it: any) => {
      const price = it?.price ?? 0;
      const qty = Number(it?.quantity ?? 1);
      const ppaise = normalizePriceToPaise(price);
      return acc + ppaise * Math.max(1, qty);
    }, 0);

    console.log("[create-order] computed base amount:", amountPaise);

    // ✅ 3. Apply discount if valid
    let discountApplied = null;
    if (body.code) {
      const normalized = String(body.code).toUpperCase();
      const discountRate = DISCOUNTS[normalized];
      if (discountRate) {
        const discountAmount = Math.floor(amountPaise * discountRate);
        amountPaise -= discountAmount;
        discountApplied = normalized;
        console.log(
          `[create-order] discount ${normalized} (-${discountRate * 100}%), final amount:`,
          amountPaise
        );
      }
    }

    if (amountPaise <= 0) {
      return NextResponse.json(
        { error: "Invalid final amount after discount" },
        { status: 400 }
      );
    }

    // ✅ 4. Create Razorpay order with discounted amount
    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: {
        items: JSON.stringify(body.items ?? []),
        discountCode: discountApplied,
      },
    });

    console.log("[create-order] order created:", order);

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
