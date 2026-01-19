"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Zap, TrendingDown, Activity, Ruler } from "lucide-react";
import JitterSimulator from "./JitterSimulator";

export default function Page() {
    const currentSlug = "what-is-clock-jitter";
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
                Clock Jitter
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                The random, dynamic variation in the clock period or edge arrival times.
                Unlike skew (which is fixed), jitter is noise. It must always be subtracted from your timing budget.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Zap className="w-8 h-8 text-indigo-600" />
                    1. Jitter Simulator
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        Watch how increasing the noise level creates a "Region of Uncertainty".
                        <br />
                        Notice that <strong>Jitter hurts BOTH Setup and Hold simultaneously.</strong>
                    </p>
                </div>
                <JitterSimulator />
            </div>

            {/* --- Theory: Types of Jitter --- */}
            <div className="space-y-12 mb-16">

                <div className="grid md:grid-cols-2 gap-8">

                    <div className="bg-white p-6 rounded-2xl border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <TrendingDown className="w-5 h-5 text-indigo-600" /> Cycle-to-Cycle Jitter
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            The variation in period length between two <strong>adjacent</strong> clock cycles.
                        </p>
                        <div className="bg-indigo-50 p-3 rounded text-indigo-900 text-xs font-bold">
                            Critical for: Setup Time (Max Delay)
                        </div>
                        <p className="text-xs text-indigo-800 mt-2">
                            If cycle 1 is normal, but cycle 2 is short, the setup check fails.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-rose-600" /> Period Jitter
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            The deviation of a clock edge from its "ideal" or "perfect" position over time.
                        </p>
                        <div className="bg-rose-50 p-3 rounded text-rose-900 text-xs font-bold">
                            Critical for: Global timing budget
                        </div>
                    </div>

                </div>
            </div>

            {/* --- Jitter Budgeting --- */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm border-t-8 border-t-indigo-500">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Skew vs. Jitter</h3>
                    <p className="text-sm text-slate-500 mb-4 font-bold uppercase tracking-widest">Digital Design Interview 101</p>
                    <ul className="space-y-4 text-gray-700">
                        <li className="flex gap-3">
                            <strong className="text-indigo-600 w-16 text-right">Skew</strong>
                            <div>
                                Deterministic (Constant). Can be Positive or Negative. Can be engineered to fix timing (Useful).
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <strong className="text-rose-600 w-16 text-right">Jitter</strong>
                            <div>
                                Random (Dynamic). Fluctuates every cycle. Always reduces timing margins (Harmful).
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm border-t-8 border-t-rose-500">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">The Uncertainty Cost</h3>
                    <div className="bg-rose-50 p-4 rounded text-rose-900 font-mono text-sm mb-4">
                        <i>T<sub>unc</sub></i> = <i>Jitter</i>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                        We must act as if the clock is always in the <strong>worst-case position</strong>.
                        We subtract the Jitter value from our total time budget. This effectively lowers the maximum frequency our chip can run at.
                    </p>
                </div>
            </div>

            {/* --- Equations --- */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 mb-12 text-slate-300 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6">Worst-Case Equations</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-2">Adjusted Setup Constraint</h4>
                        <div className="font-mono text-lg text-white bg-slate-800 p-3 rounded border border-slate-700">
                            <i>T<sub>clk</sub></i> - <i>t<sub>jitter</sub></i> &ge; <i>T<sub>path</sub></i> + <i>T<sub>su</sub></i>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                            We assume the next clock edge arrives <strong>EARLY</strong> (period shrinks).
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-2">Adjusted Hold Constraint</h4>
                        <div className="font-mono text-lg text-white bg-slate-800 p-3 rounded border border-slate-700">
                            <i>T<sub>path</sub></i> &ge; <i>T<sub>h</sub></i> + <i>t<sub>jitter</sub></i>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                            We assume the capture clock edge arrives <strong>LATE</strong> (hold window extends).
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
