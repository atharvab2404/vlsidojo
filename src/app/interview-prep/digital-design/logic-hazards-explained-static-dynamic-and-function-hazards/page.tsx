"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Zap, Activity, AlertTriangle, GitGraph } from "lucide-react";
import GlitchMaker from "./GlitchMaker";

export default function Page() {
    const currentSlug = "logic-hazards-explained-static-dynamic-and-function-hazards";
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
                Logic Hazards
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                A <strong>Logic Hazard</strong> is a temporary fluctuation in the output of a combinational circuit that should theoretically remain constant.
                They are caused by unequal propagation delays in parallel paths.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Zap className="w-8 h-8 text-indigo-600" />
                    1. The Glitch Maker
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        Consider the standard Multiplexer equation: <strong>F = SB + S'A</strong>.
                        <br />
                        If Inputs A=1 and B=1, the output should stay <strong>1</strong> even if Select (S) toggles.
                        However, the inverter on S (creating S') introduces a delay.
                        <br /><br />
                        <strong>Run the simulation below.</strong> Watch for the "Static 1-Hazard" (Output Briefly Drops to 0).
                    </p>
                </div>
                <GlitchMaker />
            </div>

            {/* --- Theory: Types of Hazards --- */}
            <div className="space-y-12 mb-16">

                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <Activity className="w-8 h-8 text-rose-600" /> Taxonomy of Glitches
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Static 1-Hazard */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Most Common</div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Static 1-Hazard</h4>
                        <div className="bg-indigo-50 p-3 rounded font-mono text-center text-indigo-900 border border-indigo-100 mb-3">
                            1 &rarr; <span className="text-rose-600 font-bold">0</span> &rarr; 1
                        </div>
                        <p className="text-sm text-gray-600">
                            Occurs in Sum-of-Products (SOP) circuits (AND-OR logic).
                            Caused when two adjacent 1s in a K-Map are not covered by a common term.
                        </p>
                    </div>

                    {/* Static 0-Hazard */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Dual</div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Static 0-Hazard</h4>
                        <div className="bg-slate-50 p-3 rounded font-mono text-center text-slate-800 border border-slate-200 mb-3">
                            0 &rarr; <span className="text-rose-600 font-bold">1</span> &rarr; 0
                        </div>
                        <p className="text-sm text-gray-600">
                            Occurs in Product-of-Sums (POS) circuits (OR-AND logic).
                        </p>
                    </div>

                    {/* Dynamic Hazard */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-2">Complex</div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Dynamic Hazard</h4>
                        <div className="bg-rose-50 p-3 rounded font-mono text-center text-rose-900 border border-rose-100 mb-3">
                            1 &rarr; 0 &rarr; 1 &rarr; 0
                        </div>
                        <p className="text-sm text-gray-600">
                            Occurs in multi-level circuits. The output changes multiple times.
                            Caused by signal traversing paths with significantly different delays.
                        </p>
                    </div>
                </div>

                {/* Function vs Logic Hazards */}
                <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-slate-300">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <GitGraph className="w-5 h-5 text-emerald-400" /> Logic Hazard vs. Function Hazard
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-emerald-400 mb-2">Logic Hazard</h4>
                            <p className="text-sm mb-2">
                                Caused by <strong>ONE</strong> input variable changing.
                            </p>
                            <p className="text-xs text-slate-500">
                                Can be fixed by adding redundant logic gates (Consensus Terms).
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-rose-400 mb-2">Function Hazard</h4>
                            <p className="text-sm mb-2">
                                Caused by <strong>TWO or MORE</strong> input variables changing simultaneously.
                            </p>
                            <p className="text-xs text-slate-500">
                                Cannot be fixed by logic design alone. Requires verifying that inputs don't change at the same time (e.g., using Gray Codes or Synchronizers).
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {/* --- Solution --- */}
            <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-200 mb-12">
                <h2 className="text-2xl font-bold text-emerald-900 mb-4 flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6" /> The Solution (Redundancy)
                </h2>
                <p className="text-emerald-800 leading-relaxed mb-6">
                    Hazards are essentially "race conditions" between a signal ($A$) and its inverted self ($A'$).
                    The solution is to add a redundant term that stays TRUE regardless of whether $A$ is 0 or 1.
                </p>
                <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm max-w-lg mx-auto">
                    <p className="font-mono text-lg text-center text-emerald-900">
                        F = AB + A'C + <span className="font-bold underline text-emerald-600 decoration-wavy">BC</span>
                    </p>
                    <p className="text-xs text-center text-emerald-600 mt-2">
                        The term <strong>BC</strong> is called the <strong>Consensus Term</strong>.
                        <br />
                        When B=1 and C=1, BC=1. This holds the output HIGH while A switches.
                    </p>
                </div>
            </div>

            <div className="mt-12">
                <SubtopicNav prev={navPrev} next={navNext} />
            </div>
        </div>
    );
}
