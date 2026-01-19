"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Clock, Zap, CheckCircle } from "lucide-react";
import ResetLogicExplorer from "./ResetLogicExplorer";

export default function Page() {
    const currentSlug = "how-to-code-a-sequential-circuit-always-posedge-clk";
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
                How to Code Sequential Logic <br />

            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Sequential circuits have memory. They only update their state on the rising edge of the clock.
                This introduces the concept of <strong>Reset</strong> strategies.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Zap className="w-8 h-8 text-indigo-600" />
                    1. Synchronous vs. Asynchronous Reset
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        The biggest design decision you make in an RTL block is often the reset style.
                        <br />
                        Experiment below to feel the difference in timing.
                    </p>
                </div>
                <ResetLogicExplorer />
            </div>

            {/* --- Theory: Key Concepts --- */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <div className="bg-rose-100 p-1 rounded"><Zap className="w-4 h-4 text-rose-600" /></div> Asynchronous Reset
                    </h3>
                    <pre className="text-xs bg-slate-900 text-slate-300 p-3 rounded mb-3 overflow-x-auto">
                        always @(posedge clk or posedge rst)
                    </pre>
                    <ul className="text-sm space-y-2 text-gray-600 ml-4 list-disc">
                        <li><strong>Sensitivity List:</strong> Includes BOTH clock and reset.</li>
                        <li><strong>Behavior:</strong> Resets immediately, even without a clock.</li>
                        <li><strong>Pros:</strong> Guaranteed reset even if clock is dead. Data path is clean.</li>
                        <li><strong>Cons:</strong> Susceptible to glitches on the reset line. Requires synchronization (Reset Bridge) to release safely.</li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <div className="bg-emerald-100 p-1 rounded"><Clock className="w-4 h-4 text-emerald-600" /></div> Synchronous Reset
                    </h3>
                    <pre className="text-xs bg-slate-900 text-slate-300 p-3 rounded mb-3 overflow-x-auto">
                        always @(posedge clk) // No rst!
                    </pre>
                    <ul className="text-sm space-y-2 text-gray-600 ml-4 list-disc">
                        <li><strong>Sensitivity List:</strong> Only Clock.</li>
                        <li><strong>Behavior:</strong> Resets only on the active clock edge.</li>
                        <li><strong>Pros:</strong> 100% synchronous. Filters out glitches between clocks. Easier STA (Static Timing Analysis).</li>
                        <li><strong>Cons:</strong> Needs a running clock to work. Reset logic adds to the data path delay.</li>
                    </ul>
                </div>

            </div>

            {/* --- The Checklist --- */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 mb-12 text-slate-300 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6">Sequential Logic Checklist</h2>
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="text-white block">Use Non-Blocking Assignments (`&lt;=`)</strong>
                            <p className="text-sm text-slate-400">Always use `&lt;=` for registering outputs. This ensures data from the <i>previous</i> clock cycle is used, matching hardware reality.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="text-white block">Define Reset Behavior</strong>
                            <p className="text-sm text-slate-400">Every flip-flop (usually) needs a known initial state. Don't leave it undefined.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="text-white block">Don't Mix Edges</strong>
                            <p className="text-sm text-slate-400">Avoid `always @(posedge clk or negedge rst)`. Standardize on active-high or active-low for the entire design to avoid confusion.</p>
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
