"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, GitMerge, AlertTriangle, ShieldCheck, Zap } from "lucide-react";
import DomainBridge from "./DomainBridge";

export default function Page() {
    const currentSlug = "what-is-clock-domain-crossing-cdc";
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
                Clock Domain Crossing (CDC)
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                A CDC occurs when a signal is launched by one clock (<i>Clk<sub>A</sub></i>) and captured by a <i>different, asynchronous</i> clock (<i>Clk<sub>B</sub></i>).
                Because the phase relationship is random, Setup/Hold time violations are <strong>inevitable</strong>.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <GitMerge className="w-8 h-8 text-indigo-600" />
                    1. The Domain Bridge
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        Try sending a data pulse from Domain A (Fast) to Domain B (Slow).
                        <br />
                        Without a synchronizer, you risk the signal arriving exactly at the clock edge (Metastability) or being missed entirely (Pulse Width Violation).
                    </p>
                </div>
                <DomainBridge />
            </div>

            {/* --- Theory: The Golden Rules --- */}
            <div className="space-y-12 mb-16">

                {/* Single Bit */}
                <div className="bg-white p-8 rounded-2xl border border-emerald-200 shadow-sm border-t-8 border-t-emerald-500">
                    <h3 className="text-2xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                        <ShieldCheck className="w-6 h-6" /> Single-Bit Solution
                    </h3>
                    <p className="text-gray-700 mb-6 font-bold">
                        Use a 2-Flip-Flop Synchronizer.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-emerald-900 mb-2 uppercase tracking-widest text-xs">For Control Signals</h4>
                            <p className="text-sm text-gray-600 mb-4">
                                Applicable for: <i>Enable, Reset, Start, Done</i> flags.
                            </p>
                            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                                <li>Protects against Metastability.</li>
                                <li>Valid Output is delayed by 2 cycles of <i>Clk<sub>B</sub></i>.</li>
                                <li>Requires Source Signal to be stable for at least 1.5 cycles of <i>Clk<sub>B</sub></i> (otherwise, use a Pulse Stretcher).</li>
                            </ul>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-center justify-center font-mono text-emerald-800 text-sm">
                            Signal &rarr; FF1 (<i>Clk<sub>B</sub></i>) &rarr; FF2 (<i>Clk<sub>B</sub></i>) &rarr; Out
                        </div>
                    </div>
                </div>

                {/* Multi Bit */}
                <div className="bg-white p-8 rounded-2xl border border-rose-200 shadow-sm border-t-8 border-t-rose-500">
                    <h3 className="text-2xl font-bold text-rose-900 mb-4 flex items-center gap-2">
                        <Zap className="w-6 h-6" /> Multi-Bit Solution
                    </h3>
                    <p className="text-gray-700 mb-6 font-bold">
                        NEVER synchronize individual bits of a bus. (Data Incoherency)
                    </p>

                    <div className="bg-rose-50 p-6 rounded-xl border border-rose-100 mb-6">
                        <h4 className="font-bold text-rose-800 mb-2">Why?</h4>
                        <p className="text-sm text-rose-800">
                            Imagine sending "00" &rarr; "11".
                            Due to wire delays, Bit 0 might arrive early, while Bit 1 arrives late.
                            A synchronizer might snap a picture in the middle, seeing "01" or "10". This creates a fake value that never existed.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-gray-900 mb-2">Case A: Counters</h4>
                            <p className="text-sm text-gray-600 mb-2">
                                Use <strong>Gray Code</strong>.
                            </p>
                            <p className="text-xs text-gray-500">
                                Gray codes only change 1 bit at a time. Even if sampled mid-transition, the result is either the "Old Value" or "New Value". Never a fake value.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-2">Case B: Data Bus</h4>
                            <p className="text-sm text-gray-600 mb-2">
                                Use an <strong>Asynchronous FIFO</strong>.
                            </p>
                            <p className="text-xs text-gray-500">
                                Write Data using <i>Clk<sub>A</sub></i>. Read Data using <i>Clk<sub>B</sub></i>.
                                The FIFO handles the pointer crossing internally (using Gray codes).
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
