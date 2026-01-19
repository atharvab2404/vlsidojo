"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Lock, Unlock, ShieldCheck, Bug } from "lucide-react";
import LatchDetective from "./LatchDetective";

export default function Page() {
    const currentSlug = "how-to-create-an-inadvertent-latch-in-verilog-and-how-to-fix-it";
    const index = flatDigitalDesignTopics.findIndex((t) => t.slug === currentSlug);
    const prev = index > 0 ? flatDigitalDesignTopics[index - 1] : null;
    const next =
        index < flatDigitalDesignTopics.length - 1
            ? flatDigitalDesignTopics[index + 1]
            : null;

    const navPrev = prev ? { title: prev.title, href: `/interview-prep/digital-design/${prev.slug}` } : null;
    const navNext = next ? { title: next.title, href: `/interview-prep/digital-design/${next.slug}` } : null;

    return (
        <div className="max-w-5xl mx-auto text-gray-800">
            <div className="mb-8">
                <Link
                    href="/interview-prep/digital-design"
                    className="inline-flex items-center text-amber-600 hover:text-amber-800 transition-colors mb-4 font-medium"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Curriculum
                </Link>
            </div>

            <h1 className="text-5xl font-extrabold text-gray-900 mb-8 tracking-tight leading-tight">
                What is an Inadvertent Latch? <br />

            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                "Inferred Latches" are the silent killers of timing analysis. They happen when your combinational logic accidentally remembers its previous state.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Bug className="w-8 h-8 text-indigo-600" />
                    1. Latch Detective
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        Below is a classic buggy <code>case</code> statement. It handles inputs 0, 1, and 2, but forgets 3.
                        <br />
                        See what happens when you apply different fixes.
                    </p>
                </div>
                <LatchDetective />
            </div>

            {/* --- Theory: How they happen --- */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">

                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <div className="bg-rose-100 p-2 rounded-lg text-rose-700"><Lock className="w-5 h-5" /></div>
                        The Cause
                    </h3>
                    <p className="text-gray-700 mb-4">
                        Combinational logic (Adders, Muxes) should have NO memory. Output depends ONLY on current Input.
                    </p>
                    <p className="text-gray-700 mb-4">
                        If you write code where—under certain conditions—the output is <strong>not assigned a new value</strong>, Verilog assumes the output must <strong>keep its old value</strong>.
                    </p>
                    <p className="font-bold text-rose-600">
                        Keeping old value = Memory = Latch.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700"><ShieldCheck className="w-5 h-5" /></div>
                        The Recommended Fix
                    </h3>
                    <p className="text-gray-700 mb-4">
                        While adding <code>else</code> or <code>default</code> works, the most robust way to code complex logic is the <strong>"Default Assignment at Top"</strong> pattern.
                    </p>
                    <div className="bg-slate-900 p-4 rounded text-slate-300 font-mono text-sm border-l-4 border-emerald-500">
                        always @(*) begin <br />
                        &nbsp; <span className="text-emerald-400">y = 0; // 1. Safe Default</span> <br />
                        &nbsp; if (en) y = a; <br />
                        &nbsp; // Even if 'if' fails, y is 0. No Latch! <br />
                        end
                    </div>
                </div>

            </div>

            {/* --- Self Assignment Trap --- */}
            <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100 mb-12">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6">The "Self-Assignment" Trap</h2>
                <p className="text-indigo-800 mb-4">
                    Be careful! Writing <code>a = a;</code> explicitly tells the tool "Keep the old value". This creates a latch just as surely as missing the assignment entirely.
                </p>
                <div className="bg-white p-4 rounded border border-indigo-200 font-mono text-sm text-gray-600">
                    if (en) <br />
                    &nbsp; q = d; <br />
                    else <br />
                    &nbsp; <span className="text-rose-600 font-bold">q = q; // BAD! Creates Latch.</span>
                </div>
            </div>

            <div className="mt-12">
                <SubtopicNav prev={navPrev} next={navNext} />
            </div>
        </div>
    );
}
