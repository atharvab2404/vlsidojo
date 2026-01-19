"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Wrench, AlertTriangle, CheckCircle, Calculator } from "lucide-react";
import ViolationRepairShop from "./ViolationRepairShop";

export default function Page() {
    const currentSlug = "how-to-fix-setup-and-hold-violations-interview-guide";
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
                How to Fix Timing Violations
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Finding a violation is easy (Static Timing Analysis tools report it). Fixing it requires understanding the physics of the circuit.
                The fix depends entirely on whether it is a Setup (Max Delay) or Hold (Min Delay) violation.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Wrench className="w-8 h-8 text-indigo-600" />
                    1. Interactive Timing Repair Shop
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        Switch between a <strong>Setup Violation</strong> and a <strong>Hold Violation</strong>.
                        Attempt to fix them using the available components. Note how changing the clock frequency only solves one type of failure.
                    </p>
                </div>
                <ViolationRepairShop />
            </div>

            {/* --- Theory: Proofs & Tactics --- */}
            <div className="space-y-12 mb-16">

                {/* Setup Fixes */}
                <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100">
                    <h3 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
                        How to Fix Setup Violations
                    </h3>
                    <p className="text-indigo-800 mb-6">
                        <strong>Root Cause:</strong> Data arrival path is too long (<i>T<sub>comb</sub></i> is too high) relative to the clock period (<i>T<sub>clk</sub></i>).
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-indigo-900 mb-4 uppercase tracking-widest text-sm">Industrial Techniques</h4>
                            <ul className="space-y-3 text-indigo-800 text-sm">
                                <li className="flex gap-2">
                                    <span className="font-bold">1. Reduce Frequency (<i>T<sub>clk</sub></i> &uarr;):</span>
                                    <span>The easiest fix. If you lower the MHz, you give the signal more time to arrive.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-bold">2. Pipelining:</span>
                                    <span>Break long combinational paths by inserting a register (FF). This reduces max <i>T<sub>comb</sub></i> but adds latency.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-bold">3. Cell Swapping (LVT):</span>
                                    <span>Swap standard cells for Low-Voltage Threshold (LVT) cells. They switch faster but leak more power.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-indigo-200">
                            <h4 className="font-bold text-indigo-900 mb-2 uppercase tracking-widest text-xs">Mathematical Proof</h4>
                            <p className="text-xs text-indigo-700 mb-2">Setup Constraint:</p>
                            <div className="font-mono text-sm text-indigo-900 font-bold mb-4">
                                T<sub>clk</sub> &ge; T<sub>clk_q</sub> + T<sub>comb</sub> + T<sub>setup</sub>
                            </div>
                            <p className="text-xs text-indigo-700">
                                Notice that <strong>T<sub>clk</sub></strong> is on the left side.
                                Increasing T<sub>clk</sub> (Reducing Freq) makes the inequality easier to satisfy.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Hold Fixes */}
                <div className="bg-purple-50 p-8 rounded-2xl border border-purple-100">
                    <h3 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                        How to Fix Hold Violations
                    </h3>
                    <p className="text-purple-800 mb-6">
                        <strong>Root Cause:</strong> Data arrival path is too short (Data races through).
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-purple-900 mb-4 uppercase tracking-widest text-sm">Industrial Techniques</h4>
                            <ul className="space-y-3 text-purple-800 text-sm">
                                <li className="flex gap-2">
                                    <span className="font-bold">1. Add Delay (Buffers):</span>
                                    <span>Insert buffers in the data path to intentionally slow signal propagation.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-bold">2. Downsizing Cells:</span>
                                    <span>Use smaller drive-strength cells (more delay).</span>
                                </li>
                                <li className="flex gap-2 text-rose-600 font-bold bg-rose-100 p-2 rounded">
                                    <AlertTriangle className="w-4 h-4" />
                                    <span>Changing Frequency DOES NOT WORK.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-purple-200">
                            <h4 className="font-bold text-purple-900 mb-2 uppercase tracking-widest text-xs">Mathematical Proof</h4>
                            <p className="text-xs text-purple-700 mb-2">Hold Constraint:</p>
                            <div className="font-mono text-sm text-purple-900 font-bold mb-4">
                                T<sub>clk_q</sub> + T<sub>comb</sub> &ge; T<sub>hold</sub>
                            </div>
                            <p className="text-xs text-purple-700">
                                <strong>T<sub>clk</sub></strong> is completely absent from this equation.
                                Hold violations are independent of clock speed. You cannot fix them by slowing down the clock.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="mt-12">
                <SubtopicNav prev={navPrev} next={navNext} />
            </div>
        </div>
    );
}
