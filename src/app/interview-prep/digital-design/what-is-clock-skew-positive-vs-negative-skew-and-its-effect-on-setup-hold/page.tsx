"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, GitCommit, TrendingUp, TrendingDown, Divide } from "lucide-react";
import SkewAnalyzer from "./SkewAnalyzer";

export default function Page() {
    const currentSlug = "what-is-clock-skew-positive-vs-negative-skew-and-its-effect-on-setup-hold";
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
                Clock Skew
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                The difference in arrival time of the same clock edge at two different Flip-Flops.
                Clock Skew is unavoidable due to wire delays, but it can be used strategically to fix timing violations.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <GitCommit className="w-8 h-8 text-indigo-600 rotate-90" />
                    1. Skew Analyzer
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        Experiment with the slider. See what happens when the Capture Clock arrives <strong>Late (Positive Skew)</strong> or <strong>Early (Negative Skew)</strong>.
                        We deliberately made the Logic Delay very long here, so you might <i>need</i> Positive Skew to fix the Setup time!
                    </p>
                </div>
                <SkewAnalyzer />
            </div>

            {/* --- Theory: Useful vs Harmful --- */}
            <div className="space-y-12 mb-16">

                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">The Two Faces of Skew</h3>
                    <p className="text-gray-700 mb-6">
                        Let <i>t<sub>skew</sub></i> = <i>t<sub>capture</sub></i> - <i>t<sub>launch</sub></i>.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Positive Skew */}
                        <div className="border border-emerald-100 bg-emerald-50 rounded-xl overflow-hidden">
                            <div className="bg-emerald-100 p-4 border-b border-emerald-200">
                                <h4 className="font-bold text-emerald-900 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5" /> Positive Skew
                                </h4>
                                <p className="text-xs text-emerald-700">Capture CLK arrives LATER.</p>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <span className="text-xs font-bold bg-emerald-200 text-emerald-800 px-2 py-1 rounded">EFFECT ON SETUP</span>
                                    <p className="text-sm font-bold text-emerald-900 mt-2">Useful Skew (Helps)</p>
                                    <p className="text-xs text-emerald-800 mt-1">
                                        It essentially "expands" the clock cycle for this path.
                                        <i>T<sub>period</sub></i> + <i>t<sub>skew</sub></i>
                                    </p>
                                </div>
                                <div>
                                    <span className="text-xs font-bold bg-rose-200 text-rose-800 px-2 py-1 rounded">EFFECT ON HOLD</span>
                                    <p className="text-sm font-bold text-rose-900 mt-2">Harmful Skew (Hurts)</p>
                                    <p className="text-xs text-rose-800 mt-1">
                                        The capture flop stays transparent longer, increasing risk of race-through.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Negative Skew */}
                        <div className="border border-rose-100 bg-rose-50 rounded-xl overflow-hidden">
                            <div className="bg-rose-100 p-4 border-b border-rose-200">
                                <h4 className="font-bold text-rose-900 flex items-center gap-2">
                                    <TrendingDown className="w-5 h-5" /> Negative Skew
                                </h4>
                                <p className="text-xs text-rose-700">Capture CLK arrives EARLIER.</p>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <span className="text-xs font-bold bg-rose-200 text-rose-800 px-2 py-1 rounded">EFFECT ON SETUP</span>
                                    <p className="text-sm font-bold text-rose-900 mt-2">Harmful Skew (Hurts)</p>
                                    <p className="text-xs text-rose-800 mt-1">
                                        It "shrinks" the effective clock cycle.
                                        <i>T<sub>period</sub></i> - <i>t<sub>skew</sub></i>
                                    </p>
                                </div>
                                <div>
                                    <span className="text-xs font-bold bg-emerald-200 text-emerald-800 px-2 py-1 rounded">EFFECT ON HOLD</span>
                                    <p className="text-sm font-bold text-emerald-900 mt-2">Useful Skew (Helps)</p>
                                    <p className="text-xs text-emerald-800 mt-1">
                                        Capture flop closes fast, preventing race-through.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* --- Equation Cheat Sheet --- */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 mb-12 text-slate-300 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6">Review: Skew Equations</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-2">Setup check with Skew</h4>
                        <div className="font-mono text-lg text-white bg-slate-800 p-3 rounded border border-slate-700">
                            <i>T<sub>launch</sub></i> + <i>T<sub>comb</sub></i> &le; <i>T<sub>capture</sub></i> + <i>T<sub>period</sub></i> - <i>T<sub>setup</sub></i>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                            Rearranging: <i>T<sub>comb</sub></i> &le; <i>T<sub>period</sub></i> - <i>T<sub>setup</sub></i> + <strong>Skew</strong>
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-2">Hold check with Skew</h4>
                        <div className="font-mono text-lg text-white bg-slate-800 p-3 rounded border border-slate-700">
                            <i>T<sub>launch</sub></i> + <i>T<sub>comb</sub></i> &ge; <i>T<sub>capture</sub></i> + <i>T<sub>hold</sub></i>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                            Rearranging: <i>T<sub>comb</sub></i> &ge; <i>T<sub>hold</sub></i> + <strong>Skew</strong>
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <SubtopicNav prev={navPrev} next={navNext} />
            </div>
        </div>
    );
}
