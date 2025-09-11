// app/api/payments/create-order/route.ts
import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const KEY_ID = process.env.RAZORPAY_KEY_ID || "";
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";

if (!KEY_ID || !KEY_SECRET) {
  console.error(
    "Missing Razorpay keys: set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env.local"
  );
}

const razorpay = new Razorpay({
  key_id: KEY_ID,
  key_secret: KEY_SECRET,
});

function normalizePriceToPaise(price: any) {
  // Accept a number price in either rupees (e.g. 9.99) or paise (if already >1000)
  if (typeof price !== "number") return 0;
  if (price < 1000) return Math.round(price * 100); // treat as rupees -> paise
  return Math.round(price); // treat as already paise
}

export async function POST(req: NextRequest) {
  try {
    if (!KEY_ID || !KEY_SECRET) {
      return NextResponse.json(
        { error: "Server missing Razorpay credentials (RAZORPAY_KEY_ID/SECRET)" },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    console.log("[create-order] request body:", JSON.stringify(body));

    // 1. Try to compute amountPaise in order of precedence:
    // - server-side compute from items[] if provided
    // - else accept amount or totalPaise passed by client (but validate)
    let amountPaise = 0;

    if (Array.isArray(body.items) && body.items.length > 0) {
      // If client passed items, compute authoritative total here (recommended)
      amountPaise = body.items.reduce((acc: number, it: any) => {
        const price = it?.price ?? 0;
        const qty = Number(it?.quantity ?? 1);
        const ppaise = normalizePriceToPaise(price);
        return acc + ppaise * Math.max(1, qty);
      }, 0);
      console.log("[create-order] computed amountPaise from items:", amountPaise);
    } else if (typeof body.amount === "number") {
      amountPaise = Math.floor(body.amount);
      console.log("[create-order] using body.amount (paise):", amountPaise);
    } else if (typeof body.totalPaise === "number") {
      amountPaise = Math.floor(body.totalPaise);
      console.log("[create-order] using body.totalPaise:", amountPaise);
    }

    // final validation
    if (!amountPaise || amountPaise <= 0) {
      return NextResponse.json(
        { error: "Invalid or missing amount. Send items[] or amount (paise)." },
        { status: 400 }
      );
    }

    // Razorpay expects integer paise
    const options = {
      amount: amountPaise,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      payment_capture: 1,
      notes: {
        // optionally pass items or user info in notes
        items: JSON.stringify(body.items ?? []),
        clientSentAmount: body.amount ?? body.totalPaise ?? null,
      },
    };

    const order = await razorpay.orders.create(options);

    console.log("[create-order] razorpay order created:", {
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });

    // Persist order in your DB here if you have one (recommended)
    // e.g. await prisma.order.create({ data: {...} })

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err: any) {
    console.error("[create-order] error:", err?.message ?? err);
    return NextResponse.json(
      { error: err?.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}
