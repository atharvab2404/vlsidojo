"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Clock, Search, ShieldCheck, Zap } from "lucide-react";
import TimingPathVisualizer from "./TimingPathVisualizer";

export default function Page() {
    const currentSlug = "what-is-static-timing-analysis-sta";
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
                Static Timing Analysis (STA)
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                The method used to validate the timing performance of a digital design.
                Unlike dynamic simulation, which verifies <strong>functionality</strong>, STA exhaustively verifies <strong>timing</strong> without needing test vectors.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Search className="w-8 h-8 text-indigo-600" />
                    1. The 4 Timing Paths
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        STA breaks the entire design down into thousands of "Timing Paths".
                        The tool calculates the delay for <strong>every single path</strong> and compares it against the clock constraint.
                        <br /><br />
                        Click below to visualize the four types of timing paths.
                    </p>
                </div>
                <TimingPathVisualizer />
            </div>

            {/* --- Theory: STA vs Dynamic --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <ShieldCheck className="w-8 h-8 text-emerald-600" />
                    2. STA vs. Dynamic Simulation
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Dynamic Simulation</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Running Verilog simulation (e.g., mismatched pairs, testbenches).
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="text-rose-500 font-bold">&#10007;</span>
                                <span><strong>Vector Dependent:</strong> Only checks scenarios you explicitly write tests for.</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="text-rose-500 font-bold">&#10007;</span>
                                <span><strong>Slow:</strong> Calculating delays for millions of cycles takes hours/days.</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="text-emerald-500 font-bold">&#10003;</span>
                                <span><strong>Functionality:</strong> Verifies the logic is correct (1 + 1 = 2).</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-200 shadow-sm">
                        <h3 className="text-xl font-bold text-indigo-900 mb-4">Static Timing Analysis (STA)</h3>
                        <p className="text-sm text-indigo-800 mb-4">
                            Mathematical analysis of delays.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm text-indigo-800">
                                <span className="text-emerald-600 font-bold">&#10003;</span>
                                <span><strong>Vector Independent:</strong> Checks ALL possible paths simultaneously.</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-indigo-800">
                                <span className="text-emerald-600 font-bold">&#10003;</span>
                                <span><strong>Fast:</strong> Can analyze a full chip in minutes.</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-indigo-800">
                                <span className="text-amber-600 font-bold">&#9888;</span>
                                <span><strong>Pessimistic:</strong> Assumes worst-case conditions (PVT).</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* --- Theory: Key Concepts --- */}
            <div className="space-y-12 mb-16">
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Concepts</h3>

                    <div className="space-y-8">
                        <div>
                            <h4 className="font-bold text-lg text-indigo-600 mb-2">1. Startpoint & Endpoint</h4>
                            <p className="text-gray-700 mb-2">Every path must start at a <strong>Startpoint</strong> and end at an <strong>Endpoint</strong>.</p>
                            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                                <li><strong>Startpoints:</strong> Input Ports, Clock pins of Flip-Flops.</li>
                                <li><strong>Endpoints:</strong> Output Ports, D pins of Flip-Flops.</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg text-indigo-600 mb-2">2. Setup & Hold</h4>
                            <p className="text-gray-700 mb-2">
                                STA checks two main conditions for every synchronous path:
                            </p>
                            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                                <li><strong>Setup (Max Delay):</strong> Can the data get there <i>fast enough</i> before the next clock edge?</li>
                                <li><strong>Hold (Min Delay):</strong> Does the data stay stable <i>long enough</i> so it doesn't race through?</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg text-indigo-600 mb-2">3. Slack</h4>
                            <p className="text-gray-700 mb-2">The difference between Required Time and Arrival Time.</p>
                            <div className="bg-slate-100 p-3 rounded font-mono text-sm inline-block">
                                <i>Slack</i> = <i>Data Required Time</i> - <i>Data Arrival Time</i>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                                <span className="text-emerald-600 font-bold">Positive Slack:</span> Met timing (Good). <br />
                                <span className="text-rose-600 font-bold">Negative Slack:</span> Violated timing (Bad).
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
