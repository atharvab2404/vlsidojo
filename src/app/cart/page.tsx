"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import Navbar from "@/components/Navbar";
import { categories } from "../../data/projectCategories";

const BG = "bg-[#1a1a2e]";
const SUCCESS = "#4ade80";
const ACCENT = "#38bdf8";

function formatPaise(paise: number) {
  return `₹${(paise / 100).toFixed(2)}`;
}

export default function CartPage() {
  const { data: session } = useSession();
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);

  const [discountCode, setDiscountCode] = useState("");
  const [discountRate, setDiscountRate] = useState(0);
  const [discountMessage, setDiscountMessage] = useState("");
  const [discountStatus, setDiscountStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const subtotalPaise = useMemo(
    () =>
      items.reduce((s, it) => {
        const p = it.price ?? 0;
        const normalized = p < 1000 ? Math.round(p * 100) : p;
        return s + normalized * (it.quantity ?? 1);
      }, 0),
    [items]
  );
  const discountPaise = Math.floor(subtotalPaise * discountRate);
  const totalPaise = Math.max(0, subtotalPaise - discountPaise);

  const allProjects = useMemo(
    () =>
      (categories ?? []).flatMap((cat: any) =>
        (cat.projects ?? []).map((p: any) => ({
          ...p,
          _categoryGroup: cat.title,
        }))
      ),
    []
  );

  if (!session) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center px-4 pt-28">
          <div className="max-w-xl text-center p-8 rounded-lg bg-[#0b1220]">
            <img
              src="/login.png"
              alt="Login Illustration"
              className="mx-auto mb-6 w-80 h-80 object-contain"
            />
            <h2 className="text-2xl font-semibold text-slate-50 mb-3">
              Please log in to view your cart
            </h2>
            <p className="text-slate-400 mb-6">
              You must be signed in to purchase Dojos.
            </p>
            <Link
              href="/api/auth/signin"
              className="inline-block px-5 py-2 rounded-md text-slate-900 font-medium"
              style={{ background: ACCENT }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </>
    );
  }

  const applyDiscount = async () => {
    if (!discountCode.trim()) {
      setDiscountStatus("error");
      setDiscountMessage("Please enter a discount code.");
      return;
    }
    setDiscountStatus("loading");
    setDiscountMessage("");
    try {
      const res = await fetch("/api/discounts/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: discountCode.trim(),
          items: items.map((i) => ({ id: i.id, price: i.price })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        const msg = data?.error || "Invalid code";
        setDiscountStatus("error");
        setDiscountMessage(msg);
        setDiscountRate(0);
        return;
      }
      if (typeof data.discountRate === "number") {
        setDiscountRate(data.discountRate);
        setDiscountStatus("success");
        setDiscountMessage("✅ Discount applied!");
      } else {
        setDiscountStatus("success");
        setDiscountMessage("✅ Code accepted");
      }
    } catch {
      setDiscountStatus("error");
      setDiscountMessage("Could not validate code. Try again.");
      setDiscountRate(0);
    }
  };

  const proceedToPayment = async () => {
  setLoadingCheckout(true);
  try {
    const payload = {
      items: items.map((it) => ({
        id: it.id,
        title: it.title,
        price: typeof it.price === "number" ? it.price : 0,
        quantity: it.quantity ?? 1,
      })),
      code: discountCode.trim() || null,  // ✅ send discount code, not totalPaise
    };

    const res = await fetch("/api/payments/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const orderData = await res.json();

    if (!res.ok || !orderData?.id) {
      alert("❌ Failed to create payment order");
      return;
    }

    if (typeof (window as any).Razorpay === "undefined") {
      alert("❌ Razorpay SDK not loaded.");
      return;
    }

    const options: any = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderData.amount, // ✅ already discounted from backend
      currency: orderData.currency || "INR",
      name: "Dojo Platform",
      description: "Purchase Dojos",
      order_id: orderData.id,
      prefill: {
        email: session?.user?.email || "",
        name: session?.user?.name || "",
      },
      handler: async function (response: any) {
        try {
          const verifyRes = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              items: items.map((i) => i.id),
              userEmail: session?.user?.email,
            }),
          });

          const verifyData = await verifyRes.json();
          if (!verifyRes.ok || !verifyData.success) {
            alert("❌ Payment verified but dojo unlock failed.");
            return;
          }

          clearCart();
          alert("✅ Payment successful! All selected dojos unlocked.");
        } catch (e) {
          console.error("[verify] error:", e);
          alert("❌ Payment verification request failed.");
        }
      },
      theme: { color: "#38bdf8" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.on("payment.failed", (resp: any) => {
      console.error("Payment failed event:", resp);
      alert("❌ Payment failed. Try again.");
    });

    rzp.open();
  } catch (err) {
    console.error("proceedToPayment error:", err);
    alert("❌ Something went wrong.");
  } finally {
    setLoadingCheckout(false);
  }
};


  return (
    <>
      <Navbar />
      <main className={`${BG} min-h-screen py-16 px-4 sm:px-8 pt-28`}>
        <div className="max-w-[1100px] mx-auto">
          {items.length === 0 ? (
            // ✅ Empty cart state
            <div className="text-center">
              <img
                src="/images/empty-cart.png"
                alt="Empty Cart"
                className="mx-auto mb-8 object-contain opacity-90 
                           w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
              />
              <h1 className="text-3xl font-semibold text-slate-50 mb-2">
                Your Cart is Empty
              </h1>
              <p className="text-slate-400 mb-6">
                Time to start your journey and master a new skill.
              </p>
              <Link
                href="/#projects"
                className="inline-block w-full md:w-auto px-6 py-3 rounded-lg font-semibold text-slate-900"
                style={{
                  background: `linear-gradient(90deg, ${ACCENT}, #7dd3fc)`,
                }}
              >
                Explore Dojos
              </Link>
            </div>
          ) : (
            // ✅ Non-empty cart state
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
              {/* Left column */}
              <section className="md:col-span-3">
                <h1 className="text-3xl font-semibold text-slate-50 mb-2">
                  Your Cart
                </h1>
                <p className="text-sm text-slate-400 mb-6">
                  {items.length} Item{items.length > 1 ? "s" : ""}
                </p>
                <div className="rounded-lg border border-slate-700 bg-[#0f1724] divide-y divide-slate-700">
                  {items.map((item) => {
                    const project =
                      allProjects.find(
                        (p: any) => p.id === item.id || p.name === item.title
                      ) ?? null;
                    const displayImage =
                      item.thumbnail || project?.image || "/projects/alu.png";
                    const displayCategory =
                      item.category ||
                      project?.label ||
                      project?._categoryGroup ||
                      "Dojo";
                    const displayDescription =
                      item.description || project?.description || "";
                    const itemPricePaise =
                      (item.price ?? 0) < 1000
                        ? Math.round((item.price ?? 0) * 100)
                        : item.price ?? 0;

                    return (
                      <div
                        key={item.id}
                        className="flex items-start justify-between px-5 py-6"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-20 h-20 relative rounded-md overflow-hidden bg-white/3 flex-shrink-0">
                            <Image
                              src={displayImage}
                              alt={item.title}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                          <div className="max-w-[56%]">
                            <p className="text-slate-50 font-semibold">
                              {item.title}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-xs text-slate-400 px-2 py-1 rounded-full bg-white/2">
                                {displayCategory}
                              </span>
                              <span className="text-xs text-slate-400">
                                Project
                              </span>
                            </div>
                            {displayDescription && (
                              <p className="text-sm text-slate-400 mt-2 line-clamp-3">
                                {displayDescription}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right mr-4">
                            <p className="text-slate-50 font-medium">
                              {formatPaise(itemPricePaise)}
                            </p>
                            <p className="text-sm text-slate-400">
                              Qty: {item.quantity ?? 1}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 rounded-full hover:bg-red-500/10"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <Link
                    href="/#projects"
                    className="text-sky-400 hover:underline text-sm"
                  >
                    ← Continue Exploring Dojos
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm("Clear your cart?")) clearCart();
                    }}
                    className="text-sm text-slate-400 hover:text-red-300"
                  >
                    Clear Cart
                  </button>
                </div>
              </section>

              {/* Right column */}
              <aside className="md:col-span-2">
                <div className="rounded-lg border border-slate-700 bg-[#0f1724] p-8">
                  <h2 className="text-xl font-semibold text-slate-50 mb-4">
                    Order Summary
                  </h2>
                  <div className="space-y-3 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-sm">Subtotal</span>
                      <span className="text-sm">
                        {formatPaise(subtotalPaise)}
                      </span>
                    </div>
                    {discountPaise > 0 && (
                      <div className="flex justify-between">
                        <span className="text-sm">
                          Discount ({discountCode.toUpperCase()})
                        </span>
                        <span className="text-sm" style={{ color: SUCCESS }}>
                          -{formatPaise(discountPaise)}
                        </span>
                      </div>
                    )}
                  </div>
                  <hr className="border-slate-700 my-4" />
                  <div className="flex justify-between items-end">
                    <p className="text-sm text-slate-300">Total</p>
                    <p className="text-2xl font-bold text-slate-50">
                      {formatPaise(totalPaise)}
                    </p>
                  </div>
                  {/* Discount input */}
                  <div className="mt-6 flex gap-2">
                    <input
                      value={discountCode}
                      onChange={(e) => {
                        setDiscountCode(e.target.value);
                        setDiscountStatus("idle");
                        setDiscountMessage("");
                      }}
                      placeholder="Discount Code"
                      className="flex-1 px-3 py-2 rounded-md bg-[#0b1220] text-slate-300 border border-slate-700"
                    />
                    <button
                      onClick={applyDiscount}
                      className="px-4 py-2 rounded-md bg-[#0b1220] text-slate-300 border border-slate-700"
                    >
                      Apply
                    </button>
                  </div>
                  {discountMessage && (
                    <p
                      className={`mt-2 text-sm ${
                        discountStatus === "success"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {discountMessage}
                    </p>
                  )}
                  {/* Checkout */}
                  <button
                    onClick={proceedToPayment}
                    disabled={loadingCheckout}
                    className="mt-6 w-full px-4 py-3 rounded-lg font-semibold text-white"
                    style={{
                      background: `linear-gradient(90deg, #3b82f6, #38bdf8)`,
                    }}
                  >
                    {loadingCheckout ? "Processing…" : "🔒 Secure Checkout"}
                  </button>

                  {/* Image at bottom */}
                  <div className="mt-8">
                    <img
                      src="/images/payment-img.png"
                      alt="Checkout Illustration"
                      className="w-full h-auto rounded-lg object-contain max-h-48 md:max-h-64"
                    />
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
