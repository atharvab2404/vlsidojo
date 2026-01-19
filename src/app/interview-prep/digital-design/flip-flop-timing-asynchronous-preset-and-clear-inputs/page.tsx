"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Power, Zap, AlertTriangle, Layers } from "lucide-react";
import PresetClearVisualizer from "./PresetClearVisualizer";

export default function Page() {
    const currentSlug = "flip-flop-timing-asynchronous-preset-and-clear-inputs";
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
                Flip-Flop Timing: Async Preset & Clear
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Standard Flip-Flop inputs (D, J, K, T) are <strong>Synchronous</strong>—they wait for the clock edge. However, real-world chips need a way to force a state <strong>immediately</strong>, regardless of the clock. This is where <strong>Preset (PRE)</strong> and <strong>Clear (CLR)</strong> come in.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Power className="w-8 h-8 text-indigo-600" />
                    1. Interactive Async Control
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700">
                        Try this:
                        <br />
                        1. Toggle <strong>PRE'</strong> to 0 (Active). Notice Q becomes 1 immediately. Does the Clock work? No.
                        <br />
                        2. Toggle <strong>CLR'</strong> to 0 (Active). Notice Q becomes 0 immediately.
                        <br />
                        3. Set both to 1 (Inactive). Now the <strong>Pulse Clock</strong> button works as normal.
                    </p>
                </div>

                <PresetClearVisualizer />
            </div>

            {/* --- Circuit Diagram --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Layers className="w-8 h-8 text-indigo-600" />
                    2. Circuit Diagram
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center">
                    <p className="text-gray-600 mb-6 text-center">
                        The symbolic representation highlights the priority override nature of PRE and CLR.
                        <br />
                        Notice they tap directly into the Flip-Flop block, drawn on Top/Bottom to distinguish from Sync inputs.
                    </p>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 max-w-lg w-full">
                        <img
                            src="/images/circuits/dff-async-preset-clear.svg"
                            alt="D Flip-Flop with Async Inputs"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </div>

            {/* --- Theory Section --- */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">

                {/* Active Low Explained */}
                <div className="bg-amber-50 p-8 rounded-2xl border border-amber-200">
                    <h3 className="flex items-center gap-2 text-2xl font-bold text-amber-900 mb-4">
                        <Zap className="w-6 h-6" />
                        Why "Active Low"?
                    </h3>
                    <p className="text-amber-800 mb-4 text-sm leading-relaxed">
                        You'll notice these inputs are often labeled with a bar (e.g., <span className="overline">PRE</span>) or a bubble. This means they are <strong>Active Low</strong>.
                    </p>
                    <ul className="space-y-3 text-amber-900 text-sm">
                        <li className="flex gap-2">
                            <span className="font-bold bg-white px-2 rounded border border-amber-200">0</span>
                            <strong>Active:</strong> The function triggers (Resets logic).
                        </li>
                        <li className="flex gap-2">
                            <span className="font-bold bg-white px-2 rounded border border-amber-200">1</span>
                            <strong>Inactive:</strong> The flip-flop operates normally (Sync mode).
                        </li>
                    </ul>
                    <p className="text-xs text-amber-700 mt-4 italic">
                        Why? Because in TTL/CMOS logic, "0" (Ground) is essentially the "default" power-on state or easier to pull down safely for resets.
                    </p>
                </div>

                {/* Priority Rule */}
                <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-200">
                    <h3 className="flex items-center gap-2 text-2xl font-bold text-indigo-900 mb-4">
                        <AlertTriangle className="w-6 h-6" />
                        Priority: Async &gt; Sync
                    </h3>
                    <p className="text-indigo-800 mb-4 text-sm leading-relaxed">
                        The most defining feature of these inputs is their <strong>Priority</strong>.
                    </p>
                    <div className="bg-white/60 p-4 rounded-xl text-sm font-medium text-indigo-900 space-y-2">
                        <p>If PRE/CLR are active, the Clock is <strong>IGNORED</strong>.</p>
                        <p>If PRE/CLR are active, the D/J/K input is <strong>IGNORED</strong>.</p>
                    </div>
                    <p className="text-indigo-800 mt-4 text-sm leading-relaxed">
                        This is physically implemented by wiring these transistors directly to the internal feedback loop, bypassing the clock gating logic.
                    </p>
                </div>
            </div>

            {/* Application Note */}
            <div className="bg-slate-900 text-slate-200 p-8 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">Use Case: Power-On Reset (POR)</h3>
                <p className="leading-relaxed text-slate-300">
                    When you first turn on a computer, the flip-flops settle into random states (0 or 1). This is chaos for a CPU!
                    <br /><br />
                    To fix this, a <strong>Power-On Reset</strong> circuit holds the <strong>Clear</strong> line Logic 0 (Active) for a few milliseconds while power stabilizes. This forces <strong>ALL</strong> flip-flops in the system to a known '0' state before the extensive logic begins.
                </p>
            </div>

            <SubtopicNav prev={navPrev} next={navNext} />
        </div>
    );
}
