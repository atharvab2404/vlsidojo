// app/api/payments/webhook/route.ts
import crypto from "crypto";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  // For webhook signature you must compute HMAC over the RAW body text
  const bodyText = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(bodyText)
    .digest("hex");

  if (expected !== signature) {
    console.warn("Webhook invalid signature");
    return new Response("invalid signature", { status: 400 });
  }

  // Parse JSON after signature is validated
  const payload = JSON.parse(bodyText);

  // Example: handle payment.captured or order.paid
  if (payload.event === "payment.captured" || payload.event === "order.paid") {
    const payment = payload.payload.payment.entity;
    // TODO: update DB reliably here (idempotent: check if payment id already processed)
  }

  return NextResponse.json({ ok: true });
}
