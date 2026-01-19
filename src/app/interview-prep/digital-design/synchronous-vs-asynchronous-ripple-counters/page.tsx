"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Clock, Zap, Activity, AlertTriangle, Layers, Percent } from "lucide-react";
import CounterVisualizer from "./CounterVisualizer";

export default function Page() {
    const currentSlug = "synchronous-vs-asynchronous-ripple-counters";
    const index = flatDigitalDesignTopics.findIndex((t) => t.slug === currentSlug);

    // Explicitly handle previous/next topic logic to strictly return { title, href } or null
    const prevTopic = index > 0 ? flatDigitalDesignTopics[index - 1] : null;
    const nextTopic = index < flatDigitalDesignTopics.length - 1 ? flatDigitalDesignTopics[index + 1] : null;

    const navPrev = prevTopic ? { title: prevTopic.title, href: `/interview-prep/digital-design/${prevTopic.slug}` } : null;
    const navNext = nextTopic ? { title: nextTopic.title, href: `/interview-prep/digital-design/${nextTopic.slug}` } : null;

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

            <h1 className="text-5xl font-extrabold text-gray-900 mb-8 tracking-tight">
                Synchronous vs Asynchronous (Ripple) Counters
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Counters are the heartbeat of digital systems, used for counting events, measuring time, or dividing frequencies. The fundamental design choice is: <strong>Do you clock them all at once (Sync) or let them trigger each other (Async/Ripple)?</strong>
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Activity className="w-8 h-8 text-indigo-600" />
                    1. Logic Analyzer: Visualizing the Delay
                </h2>
                <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl border border-slate-700 shadow-sm mb-6">
                    <p>
                        The tool below simulates a <strong>Logic Analyzer</strong> trace.
                        <br />
                        <span className="text-emerald-400 font-bold">Green Traces (Sync):</span> Notice how all bits (Q0-Q3) change <em>exactly</em> when the clock edge hits.
                        <br />
                        <span className="text-amber-500 font-bold">Amber Traces (Ripple):</span> Notice the "staircase" effect. Q1 waits for Q0. Q2 waits for Q1. This is the <strong>Propagation Delay</strong> accumulating visually!
                    </p>
                </div>

                <CounterVisualizer />
            </div>

            {/* --- Theory Section: Deep Dive --- */}
            <div className="space-y-16 mb-16">

                {/* 1. Asynchronous (Ripple) Counter */}
                <section>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2 border-gray-200">2. Asynchronous (Ripple) Counters</h3>
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <div className="prose text-gray-700">
                            <p className="mb-4">
                                In a Ripple Counter, the flip-flops are chained in series. The output of one stage (Q<sub>n</sub>) acts as the <strong>Clock</strong> for the next stage (Q<sub>n+1</sub>).
                            </p>
                            <h4 className="font-bold text-gray-900 mb-2">Key Characteristics:</h4>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li><strong>Hardware:</strong> Minimal. Just T-Flip-Flops. No extra logic gates needed.</li>
                                <li><strong>Power:</strong> Very Low. Only the bits that need to toggle actually change state. Higher bits toggle very rarely.</li>
                                <li><strong>Speed:</strong> <span className="text-red-600 font-bold">Slow.</span> The "Critical Path" is the sum of delays through the entire chain.</li>
                            </ul>
                            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 text-sm font-mono text-amber-900">
                                Max Frequency f_max = 1 / (N × t_pd)
                            </div>
                        </div>

                        {/* Mermaid Diagram: Ripple Structure */}
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col items-center">
                            <h5 className="font-bold text-gray-500 text-sm mb-4">Hardware Structure (3-Bit Ripple)</h5>
                            <div className="mermaid">
                                {`
                            graph LR
                                Clkin((Clock)) --> FF0
                                FF0[FF0 T=1]
                                FF0 --Q0--> FF1
                                FF1[FF1 T=1]
                                FF1 --Q1--> FF2
                                FF2[FF2 T=1]
                                FF2 --Q2--> Out
                            `}
                            </div>
                            <p className="text-xs text-center text-gray-400 mt-4">Notice how the Clock does NOT reach FF1 or FF2 directly.</p>
                        </div>
                    </div>
                </section>

                {/* 2. Frequency Division Application */}
                <section className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100">
                    <h3 className="flex items-center gap-3 text-2xl font-bold text-indigo-900 mb-4">
                        <Percent className="w-6 h-6" />
                        Application: Frequency Division
                    </h3>
                    <p className="text-indigo-800 mb-6 leading-relaxed">
                        While Ripple counters are "bad" for fast counting, they are <strong>excellent</strong> frequency dividers.
                        Each stage divides the input frequency by 2.
                    </p>
                    <div className="grid grid-cols-4 gap-4 text-center">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="text-xs text-gray-500">Output Q0</div>
                            <div className="text-xl font-bold text-indigo-600">f / 2</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="text-xs text-gray-500">Output Q1</div>
                            <div className="text-xl font-bold text-indigo-600">f / 4</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="text-xs text-gray-500">Output Q2</div>
                            <div className="text-xl font-bold text-indigo-600">f / 8</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="text-xs text-gray-500">Output Q3</div>
                            <div className="text-xl font-bold text-indigo-600">f / 16</div>
                        </div>
                    </div>
                </section>

                {/* 3. Synchronous Counter */}
                <section>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2 border-gray-200">3. Synchronous Counters</h3>
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        {/* Mermaid Diagram: Sync Structure */}
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col items-center order-2 md:order-1">
                            <h5 className="font-bold text-gray-500 text-sm mb-4">Hardware Structure</h5>
                            <div className="mermaid">
                                {`
                            graph TD
                                Clkin((Clock)) --> FF0
                                Clkin --> FF1
                                Clkin --> FF2
                                
                                FF0[FF0] -->|Q0| AND1
                                AND1[AND] -->|T1| FF1
                                FF1[FF1] -->|Q1| AND2
                                FF0 --> AND2
                                AND2[AND] -->|T2| FF2
                            `}
                            </div>
                            <p className="text-xs text-center text-gray-400 mt-4">Clock hits ALL Flip-Flops simultaneously.</p>
                        </div>

                        <div className="prose text-gray-700 order-1 md:order-2">
                            <p className="mb-4">
                                In a Synchronous Counter, every flip-flop is connected to the <strong>same Master Clock</strong>. Logic gates (AND gates) are used to calculate "Next State" logic for input T/D/J/K.
                            </p>
                            <h4 className="font-bold text-gray-900 mb-2">Key Characteristics:</h4>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li><strong>Hardware:</strong> More complex. Requires AND gates forming a "Carry Chain" to determine when a bit should toggle (Toggle only if all lower bits are 1).</li>
                                <li><strong>Power:</strong> Higher. Logic gates consume dynamic power on every clock edge.</li>
                                <li><strong>Speed:</strong> <span className="text-emerald-600 font-bold">Fast.</span> The delay does NOT stack with N. It is constant.</li>
                            </ul>
                            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 text-sm font-mono text-emerald-900">
                                Max Frequency f_max = 1 / (t_pd + t_gate_delay)
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Glitch Analysis */}
                <section className="bg-red-50 p-8 rounded-2xl border border-red-100">
                    <h3 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-6 h-6" />
                        Deep Dive: The "Intermediate State" Glitch
                    </h3>
                    <p className="text-red-800 mb-6 leading-relaxed">
                        The most critical interview question: "Why is a Ripple Counter bad for decoding?"
                        <br />
                        Let's look at the transition from <strong>3 (011) to 4 (100)</strong> in a Ripple Counter:
                    </p>

                    <div className="overflow-x-auto">
                        <table className="w-full text-center text-sm mb-6 bg-white rounded-lg overflow-hidden border border-red-200">
                            <thead className="bg-red-100 text-red-900 font-bold">
                                <tr>
                                    <th className="p-3">Time Step</th>
                                    <th>Event</th>
                                    <th>Q2 Q1 Q0</th>
                                    <th>Decimal Value</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                <tr className="border-b">
                                    <td className="p-2 font-mono text-gray-500">T=0</td>
                                    <td>Initial State</td>
                                    <td className="font-mono font-bold">0 1 1</td>
                                    <td>3</td>
                                    <td className="text-green-600">Valid</td>
                                </tr>
                                <tr className="bg-yellow-50 border-b">
                                    <td className="p-2 font-mono text-gray-500">T + t_pd</td>
                                    <td>Q0 Toggles (1→0)</td>
                                    <td className="font-mono font-bold">0 1 <span className="text-red-600">0</span></td>
                                    <td className="text-red-600 font-bold">2</td>
                                    <td className="text-red-600 font-bold text-xs uppercase">Glitch State!</td>
                                </tr>
                                <tr className="bg-yellow-50 border-b">
                                    <td className="p-2 font-mono text-gray-500">T + 2*t_pd</td>
                                    <td>Q1 Toggles (1→0)</td>
                                    <td className="font-mono font-bold">0 <span className="text-red-600">0</span> 0</td>
                                    <td className="text-red-600 font-bold">0</td>
                                    <td className="text-red-600 font-bold text-xs uppercase">Glitch State!</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-mono text-gray-500">T + 3*t_pd</td>
                                    <td>Q2 Toggles (0→1)</td>
                                    <td className="font-mono font-bold"><span className="text-green-600">1</span> 0 0</td>
                                    <td>4</td>
                                    <td className="text-green-600">Final Stable</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-red-800 text-sm italic">
                        If you had logic waiting for "Count = 2", it would falsely trigger for a few nanoseconds during the transition from 3 to 4.
                    </p>
                </section>

                {/* 5. Summary Comparison */}
                <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Comparison Summary</h3>
                    <table className="w-full text-left border-collapse bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="p-4">Feature</th>
                                <th className="p-4">Ripple Counter</th>
                                <th className="p-4">Synchronous Counter</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            <tr>
                                <td className="p-4 font-bold text-gray-900">Clock Connection</td>
                                <td className="p-4 text-gray-600">Only to LSB (Chain Reaction)</td>
                                <td className="p-4 text-gray-600">To ALL Flip-Flops (Parallel)</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold text-gray-900">Circuit Complexity</td>
                                <td className="p-4 text-green-600">Simple (Low Area)</td>
                                <td className="p-4 text-amber-600">Complex (Adders/Gates needed)</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold text-gray-900">Speed (Max Freq)</td>
                                <td className="p-4 text-red-600">Decreases as N increases ($1/N$)</td>
                                <td className="p-4 text-green-600">High & Constant</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold text-gray-900">Glitch Free?</td>
                                <td className="p-4 text-red-600">No (Intermediate States)</td>
                                <td className="p-4 text-green-600">Yes (Outputs change together)</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>

            <SubtopicNav prev={navPrev} next={navNext} />
        </div>
    );
}
