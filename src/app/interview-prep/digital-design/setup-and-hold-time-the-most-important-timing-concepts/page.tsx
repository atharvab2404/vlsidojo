"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Clock, Timer, Calculator, Ruler } from "lucide-react";
import TimingZoneSimulator from "./TimingZoneSimulator";

export default function Page() {
    const currentSlug = "setup-and-hold-time-the-most-important-timing-concepts";
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
                Setup and Hold Time
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                The fundamental constraints that determine the maximum speed of any chip.
                If these are violated, the Flip-Flop enters <strong>Metastability</strong> and the system fails.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Timer className="w-8 h-8 text-indigo-600" />
                    1. The Timing Window
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        The visualizer below simulates the "Data Validity Window" required by a Flip-Flop.
                        Move the slider to change when the data arrives relative to the clock edge (at t=0).
                    </p>
                </div>
                <TimingZoneSimulator />
            </div>

            {/* --- Theory: Launch vs Capture --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Ruler className="w-8 h-8 text-gray-700" />
                    2. Launch vs. Capture Edges
                </h2>
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <p className="text-gray-700 leading-relaxed mb-6">
                        In a synchronous path, data moves from a <strong>Launch Flop (FF1)</strong> to a <strong>Capture Flop (FF2)</strong>.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <div>
                            <h4 className="font-bold text-gray-900 mb-2">Launch Edge (Start)</h4>
                            <p className="text-sm text-gray-600">
                                The active clock edge (e.g., posedge) at <i>t = 0</i> that updates FF1.
                                New data starts propagating through the combinational logic.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-2">Capture Edge (Finish)</h4>
                            <p className="text-sm text-gray-600">
                                The <strong>next</strong> active clock edge at <i>t = T<sub>clk</sub></i> that updates FF2.
                                The data MUST arrive before this edge.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Theory: Derivations --- */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">

                {/* Setup Analysis */}
                <div className="bg-indigo-50 p-8 rounded-2xl border-t-4 border-indigo-600 shadow-sm">
                    <h3 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
                        <Clock className="w-6 h-6" /> Setup Check (Max Delay)
                    </h3>
                    <p className="text-indigo-800 text-sm mb-6 leading-relaxed">
                        Ensures data arrives <strong>fast enough</strong> to be captured by the next clock edge.
                    </p>

                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-indigo-200">
                            <span className="text-xs text-indigo-500 font-bold uppercase tracking-widest block mb-1">Data Arrival Time</span>
                            <code className="text-lg font-mono font-bold text-indigo-700">
                                T<sub>arr</sub> = T<sub>clk_q</sub> + T<sub>comb</sub>
                            </code>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-indigo-200">
                            <span className="text-xs text-indigo-500 font-bold uppercase tracking-widest block mb-1">Data Required Time</span>
                            <code className="text-lg font-mono font-bold text-indigo-700">
                                T<sub>req</sub> = T<sub>clk</sub> - T<sub>setup</sub>
                            </code>
                        </div>
                        <div className="bg-indigo-600 p-4 rounded-lg text-white text-center">
                            <span className="text-xs font-bold uppercase tracking-widest block mb-1 opacity-75">Setup Constraint</span>
                            <code className="text-xl font-mono font-bold">
                                T<sub>arr</sub> &le; T<sub>req</sub>
                            </code>
                        </div>
                        <p className="text-xs text-indigo-700">
                            <strong>Setup Slack</strong> = <i>T<sub>req</sub></i> - <i>T<sub>arr</sub></i>. (Must be positive).
                        </p>
                    </div>
                </div>

                {/* Hold Analysis */}
                <div className="bg-purple-50 p-8 rounded-2xl border-t-4 border-purple-600 shadow-sm">
                    <h3 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                        <Clock className="w-6 h-6" /> Hold Check (Min Delay)
                    </h3>
                    <p className="text-purple-800 text-sm mb-6 leading-relaxed">
                        Ensures data is <strong>slow enough</strong> so it doesn't race through and overwrite the <i>current</i> data before it's securely captured.
                        Hold check is performed at the <strong>same</strong> clock edge.
                    </p>

                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-purple-200">
                            <span className="text-xs text-purple-500 font-bold uppercase tracking-widest block mb-1">New Data Arrival Time</span>
                            <code className="text-lg font-mono font-bold text-purple-700">
                                T<sub>arr</sub> = T<sub>clk_q</sub> + T<sub>comb</sub>
                            </code>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-purple-200">
                            <span className="text-xs text-purple-500 font-bold uppercase tracking-widest block mb-1">Data Required Time</span>
                            <code className="text-lg font-mono font-bold text-purple-700">
                                T<sub>req</sub> = T<sub>hold</sub>
                            </code>
                        </div>
                        <div className="bg-purple-600 p-4 rounded-lg text-white text-center">
                            <span className="text-xs font-bold uppercase tracking-widest block mb-1 opacity-75">Hold Constraint</span>
                            <code className="text-xl font-mono font-bold">
                                T<sub>arr</sub> &ge; T<sub>req</sub>
                            </code>
                        </div>
                        <p className="text-xs text-purple-700">
                            <strong>Hold Slack</strong> = <i>T<sub>arr</sub></i> - <i>T<sub>req</sub></i>. (Must be positive).
                        </p>
                    </div>
                </div>

            </div>

            {/* --- Calculator / Summary Table --- */}
            <div className="bg-slate-900 rounded-2xl p-8 text-slate-300">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Calculator className="w-6 h-6 text-emerald-400" />
                    Summary: Fixing Timing Violations
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-700 text-xs uppercase tracking-widest text-slate-500">
                                <th className="py-3 pr-4">Violation Type</th>
                                <th className="py-3 px-4">Problem</th>
                                <th className="py-3 px-4">Dependency</th>
                                <th className="py-3 px-4 text-right">Fix</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 text-sm">
                            <tr>
                                <td className="py-4 pr-4 font-bold text-rose-400">Setup Violation</td>
                                <td className="py-4 px-4">Data too slow.</td>
                                <td className="py-4 px-4">Depends on Frequency (<i>T<sub>clk</sub></i>).</td>
                                <td className="py-4 px-4 text-right">Reduce Freq, Pipelining, Optimize Logic.</td>
                            </tr>
                            <tr>
                                <td className="py-4 pr-4 font-bold text-amber-400">Hold Violation</td>
                                <td className="py-4 px-4">Data too fast (Race Condition).</td>
                                <td className="py-4 px-4"><strong>Independent</strong> of Frequency.</td>
                                <td className="py-4 px-4 text-right">Add Buffers (Delay).</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-12">
                <SubtopicNav prev={navPrev} next={navNext} />
            </div>
        </div>
    );
}
