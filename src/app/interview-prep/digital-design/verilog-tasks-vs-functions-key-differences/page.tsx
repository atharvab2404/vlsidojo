"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Play, SkipForward, Clock } from "lucide-react";
import SimulationTimeTracker from "./SimulationTimeTracker";

export default function Page() {
    const currentSlug = "verilog-tasks-vs-functions-key-differences";
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
                Verilog Tasks vs. Functions <br />

            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                "Can a Function call a Task?" "Can a Task consume time?"
                These are standard interview screening questions. Let's master the differences.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Clock className="w-8 h-8 text-indigo-600" />
                    1. The Simulation Time Difference
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        The biggest structural difference is <strong>Time</strong>.
                        Executes the examples below to see how the simulation clock reacts.
                    </p>
                </div>
                <SimulationTimeTracker />
            </div>

            {/* --- Theory: Comparison Grid --- */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Breakdown</h2>
                <div className="grid md:grid-cols-2 gap-8">

                    {/* Functions */}
                    <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-indigo-200 p-2 rounded-lg text-indigo-800"><Play className="w-5 h-5" /></div>
                            <h3 className="text-xl font-bold text-indigo-900">Functions</h3>
                        </div>
                        <ul className="space-y-3 text-sm text-indigo-800">
                            <li className="flex gap-2">
                                <span className="font-bold min-w-[80px]">Timing:</span>
                                <span>Zero Delay. Executes in 0 simulation time. Cannot use `#`, `@`, `wait`.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold min-w-[80px]">Inputs:</span>
                                <span>Must have at least one input.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold min-w-[80px]">Outputs:</span>
                                <span>Returns exactly one value. (No output ports).</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold min-w-[80px]">Synthesis:</span>
                                <span>Synthesizable (Combinational Logic).</span>
                            </li>
                        </ul>
                    </div>

                    {/* Tasks */}
                    <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-amber-200 p-2 rounded-lg text-amber-800"><SkipForward className="w-5 h-5" /></div>
                            <h3 className="text-xl font-bold text-amber-900">Tasks</h3>
                        </div>
                        <ul className="space-y-3 text-sm text-amber-900">
                            <li className="flex gap-2">
                                <span className="font-bold min-w-[80px]">Timing:</span>
                                <span>Can consume time. Can use `#`, `@`, `wait`.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold min-w-[80px]">Inputs:</span>
                                <span>Can have zero or more inputs.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold min-w-[80px]">Outputs:</span>
                                <span>Can have zero or more `output` or `inout` ports.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold min-w-[80px]">Synthesis:</span>
                                <span>Generally NOT synthesizable (verification only). *Exception: Simple tasks without timing can sometimes be synthesized.</span>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* --- Hierarchy Rule --- */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 mb-12 text-slate-300 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-4">The Hierarchy Rule</h2>
                <p className="text-lg mb-6 text-gray-300">
                    Who can call whom?
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-emerald-900/40 border border-emerald-500/30 rounded">
                        <div className="font-bold text-emerald-400 mb-1">Task calling Function?</div>
                        <div className="text-white text-xl">✅ YES</div>
                    </div>
                    <div className="p-4 bg-rose-900/40 border border-rose-500/30 rounded">
                        <div className="font-bold text-rose-400 mb-1">Function calling Task?</div>
                        <div className="text-white text-xl">❌ NO</div>
                        <div className="text-xs text-rose-300 mt-1">Because a Function (0 time) cannot wait for a Task (+ time).</div>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <SubtopicNav prev={navPrev} next={navNext} />
            </div>
        </div>
    );
}
