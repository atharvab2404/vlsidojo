// app/api/payments/verify/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

type VerifyBody = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  items: string[]; // array of dojo IDs
  userEmail: string;
};

export async function POST(req: Request) {
  try {
    const body: VerifyBody = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, items, userEmail } = body;

    // --------------------------
    // Basic validation
    // --------------------------
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ success: false, error: "Missing razorpay_* fields" }, { status: 400 });
    }

    if (!userEmail) {
      return NextResponse.json({ success: false, error: "Missing userEmail" }, { status: 400 });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, error: "No dojo IDs provided" }, { status: 400 });
    }

    // --------------------------
    // Verify Razorpay signature
    // --------------------------
    const signString = `${razorpay_order_id}|${razorpay_payment_id}`;
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      console.error("[verify] RAZORPAY_KEY_SECRET not set");
      return NextResponse.json({ success: false, error: "Server misconfiguration" }, { status: 500 });
    }

    const expectedSignature = crypto.createHmac("sha256", secret).update(signString).digest("hex");

    let signatureValid = false;
    try {
      const a = Buffer.from(expectedSignature, "utf8");
      const b = Buffer.from(String(razorpay_signature), "utf8");
      signatureValid = a.length === b.length && crypto.timingSafeEqual(a, b);
    } catch {
      signatureValid = expectedSignature === String(razorpay_signature);
    }

    if (!signatureValid) {
      console.error("[verify] signature mismatch", { expected: expectedSignature, received: razorpay_signature });
      return NextResponse.json({ success: false, error: "Invalid signature. Verification failed." }, { status: 400 });
    }

    // --------------------------
    // Find user
    // --------------------------
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!user) {
      console.error("[verify] user not found for email:", userEmail);
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    // --------------------------
    // Validate dojo IDs & upsert purchases
    // --------------------------
    const ops = [];
    for (const dojoId of items) {
      const dojo = await prisma.dojo.findUnique({ where: { id: dojoId } });
      if (!dojo) {
        console.error("[verify] dojo not found:", dojoId);
        return NextResponse.json({ success: false, error: `Dojo not found: ${dojoId}` }, { status: 400 });
      }

      ops.push(
        prisma.purchase.upsert({
          where: { userId_dojoId: { userId: user.id, dojoId } },
          update: {
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            status: "paid",
          },
          create: {
            userId: user.id,
            dojoId,
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            status: "paid",
          },
        })
      );
    }

    // --------------------------
    // Execute all upserts in a transaction
    // --------------------------
    await prisma.$transaction(ops);

    // --------------------------
    // Return success
    // --------------------------
    return NextResponse.json({
      success: true,
      message: "Payment verified and dojos unlocked",
      unlockedCount: items.length,
    });
  } catch (err) {
    console.error("[verify] unexpected error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
