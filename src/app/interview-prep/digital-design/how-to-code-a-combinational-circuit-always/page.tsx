"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Code, AlertTriangle, FileCode } from "lucide-react";
import CombVsLatchAnalyzer from "./CombVsLatchAnalyzer";

export default function Page() {
    const currentSlug = "how-to-code-a-combinational-circuit-always";
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
                How to Code Combinational Logic <br />

            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                While <code>assign</code> statements are great for simple logic, complex combinational circuits (like Priority Encoders or ALUs) are often cleaner to write using procedural coding similar to C/Software.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-indigo-600" />
                    1. The Inferred Latch Trap
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        The #1 danger when using <code>always</code> blocks for combinational logic is accidentally creating memory (Latches).
                        <br />
                        Toggle the "ELSE" block below to see synthesis results.
                    </p>
                </div>
                <CombVsLatchAnalyzer />
            </div>

            {/* --- Theory: Key Concepts --- */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <FileCode className="w-5 h-5 text-indigo-600" /> The `reg` Confusion
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        In Verilog, any signal on the Left-Hand Side (LHS) of an assignment inside an <code>always</code> block <strong>MUST be declared as `reg`</strong>.
                    </p>
                    <div className="bg-amber-50 p-3 rounded border border-amber-200 text-amber-800 text-sm font-bold">
                        ⚠️ Myth Buster: A `reg` declaration does NOT mean a hardware register (Flip-Flop) will be created. It's just a variable type.
                    </div>
                </div>

                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                    <h3 className="text-xl font-bold text-indigo-900 mb-3 flex items-center gap-2">
                        <Code className="w-5 h-5 text-indigo-600" /> The Sensitivity List
                    </h3>
                    <p className="text-sm text-indigo-800 mb-4 leading-relaxed">
                        Always use <code>always @(*)</code> (Verilog-2001) instead of listing signals manually like <code>always @(a or b or c)</code>.
                    </p>
                    <ul className="text-sm space-y-2 text-indigo-800 list-disc ml-4">
                        <li><strong>Safe:</strong> Automatically includes all input signals.</li>
                        <li><strong>Prevents Mismatches:</strong> If you miss a signal in the list, simulation won't update, but synthesis WILL (because it ignores the list). This creates a simulation-synthesis mismatch disaster.</li>
                    </ul>
                </div>

            </div>

            {/* --- The Golden Rule --- */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 mb-12 text-slate-300 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6">The Golden Rule of Combinational Coding</h2>
                <p className="mb-6 leading-relaxed text-lg text-emerald-400">
                    "Every output variable must be assigned a value in EVERY possible branch of execution."
                </p>
                <div className="grid md:grid-cols-2 gap-8 font-mono text-sm">
                    <div>
                        <div className="text-rose-400 font-bold mb-2">BAD (Latch Inferred)</div>
                        <pre className="bg-black/30 p-4 rounded border border-rose-900/50">
                            always @(*) begin{"\n"}
                            if (en) y = a;{"\n"}
  // Missing else!{"\n"}
                            end
                        </pre>
                    </div>
                    <div>
                        <div className="text-emerald-400 font-bold mb-2">GOOD (Combinational)</div>
                        <pre className="bg-black/30 p-4 rounded border border-emerald-900/50">
                            always @(*) begin{"\n"}
                            y = 0; // Default assignment{"\n"}
                            if (en) y = a;{"\n"}
                            end
                        </pre>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <SubtopicNav prev={navPrev} next={navNext} />
            </div>
        </div>
    );
}
