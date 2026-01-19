"use client";

import { flatComputerArchitectureTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Clock, Activity, TrendingUp, AlertCircle, Info } from "lucide-react";
import ThroughputDemo from "./ThroughputDemo";

export default function Page() {
    const currentSlug = "performance-metrics-latency-and-throughput";
    const index = flatComputerArchitectureTopics.findIndex((t) => t.slug === currentSlug);
    const prev = index > 0 ? flatComputerArchitectureTopics[index - 1] : null;
    const next =
        index < flatComputerArchitectureTopics.length - 1
            ? flatComputerArchitectureTopics[index + 1]
            : null;

    const navPrev = prev ? { title: prev.title, href: `/interview-prep/computer-architecture/${prev.slug}` } : null;
    const navNext = next ? { title: next.title, href: `/interview-prep/computer-architecture/${next.slug}` } : null;

    return (
        <div className="max-w-5xl mx-auto text-gray-800">
            <div className="mb-8">
                <Link
                    href="/interview-prep/computer-architecture"
                    className="inline-flex items-center text-amber-600 hover:text-amber-800 transition-colors mb-4 font-medium"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Curriculum
                </Link>
            </div>

            <h1 className="text-5xl font-extrabold text-gray-900 mb-8 tracking-tight leading-tight">
                Performance Metrics: Latency vs. Throughput
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                In Computer Architecture, "Performance" is a loaded term. To a gamer, it means framerate (Throughput). To a trader, it means reaction speed (Lawency).
                Before designing any system, you must define which metric you are optimizing for.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Activity className="w-8 h-8 text-amber-600" />
                    1. Interactive Demo
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-8">
                    <p className="text-gray-700 leading-relaxed">
                        Observe how **Pipelining** changes the metrics. notice that Latency (time for one red box to cross) stays roughly the same, but Throughput (boxes per second) skyrockets.
                    </p>
                </div>
                <ThroughputDemo />
            </div>

            {/* --- Theory: Definitions --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Info className="w-8 h-8 text-amber-600" />
                    2. The Fundamental Metrics
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Latency */}
                    <div className="bg-white p-8 rounded-2xl border border-indigo-100 shadow-sm relative overflow-hidden group hover:border-indigo-300 transition-all">
                        <div className="absolutetop-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 text-indigo-600">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Latency</h3>
                            <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wide mb-4">Response Time</p>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                The time between the start and the completion of a <strong>single event</strong>.
                            </p>
                            <div className="bg-indigo-50 p-4 rounded-lg text-sm text-indigo-900 font-mono">
                                Latency = Finish_Time - Start_Time
                            </div>
                            <ul className="mt-6 space-y-2 text-sm text-gray-600">
                                <li className="flex items-center gap-2">👇 Lower is better</li>
                                <li className="flex items-center gap-2">📏 Unit: Seconds, Cycles</li>
                                <li className="flex items-center gap-2">🚗 Analogy: Time to drive from A to B</li>
                            </ul>
                        </div>
                    </div>

                    {/* Throughput */}
                    <div className="bg-white p-8 rounded-2xl border border-emerald-100 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-all">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 text-emerald-600">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Throughput</h3>
                            <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide mb-4">Bandwidth</p>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                The total amount of work done in a <strong>given unit of time</strong>.
                            </p>
                            <div className="bg-emerald-50 p-4 rounded-lg text-sm text-emerald-900 font-mono">
                                Throughput = Total_Tasks / Total_Time
                            </div>
                            <ul className="mt-6 space-y-2 text-sm text-gray-600">
                                <li className="flex items-center gap-2">👆 Higher is better</li>
                                <li className="flex items-center gap-2">📏 Unit: IPC, MIPS, GB/s</li>
                                <li className="flex items-center gap-2">🚗 Analogy: Cars arriving per hour</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Theory: The Trade-off --- */}
            <div className="bg-white p-8 rounded-2xl border border-amber-200 shadow-sm mb-16">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">The Conflict: Latency vs. Throughput</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                    Often, improving one metric degrades the other. This is a fundamental trade-off in hardware design.
                </p>

                <h4 className="text-lg font-bold text-gray-800 mb-3">Example: The "Deep Pipeline" Effect</h4>
                <p className="text-gray-600 mb-4">
                    To increase frequency (and thus Throughput), we often cut a 5-stage pipeline into a 20-stage pipeline (like the Intel NetBurst architecture).
                </p>
                <div className="grid md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <div>
                        <h5 className="font-bold text-emerald-600 mb-2">Benefit (Throughput)</h5>
                        <p className="text-sm text-gray-600">
                            Since each stage is smaller, the clock can run faster (e.g., 4 GHz). We complete more instructions per second if the pipe is full.
                        </p>
                    </div>
                    <div>
                        <h5 className="font-bold text-red-600 mb-2">Cost (Latency)</h5>
                        <p className="text-sm text-gray-600">
                            A single instruction now takes 20 cycles instead of 5. Even though cycles are shorter, the overhead of 20 pipeline latches adds up, increasing total wall-clock latency per instruction.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- Key Takeaways Box --- */}
            <div className="bg-slate-900 text-slate-300 p-8 rounded-2xl">
                <div className="flex items-start gap-4">
                    <AlertCircle className="w-8 h-8 text-amber-400 mt-1" />
                    <div>
                        <h4 className="text-xl font-bold text-white mb-3">The "Iron Law" Preview</h4>
                        <p className="leading-relaxed text-slate-400">
                            These metrics come together in the famous Iron Law of Processor Performance, which we will cover next:
                            <br /><br />
                            <span className="font-mono text-amber-300 text-lg">Time/Program = (Instr/Program) × (Cycles/Instr) × (Time/Cycle)</span>
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
