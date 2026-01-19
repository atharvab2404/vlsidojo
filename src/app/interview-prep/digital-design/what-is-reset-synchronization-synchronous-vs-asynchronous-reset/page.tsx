"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Zap, Layers, AlertTriangle } from "lucide-react";
import ResetHazardVisualizer from "./ResetHazardVisualizer";

export default function Page() {
    const currentSlug = "what-is-reset-synchronization-synchronous-vs-asynchronous-reset";
    const index = flatDigitalDesignTopics.findIndex((t) => t.slug === currentSlug);

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
                Reset Synchronization (The Reset Bridge)
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                There are two ways to reset a chip: <strong>Synchronously</strong> (wait for clock) and <strong>Asynchronously</strong> (immediate). But usually, we want the best of both worlds: Instant kill, safe recovery. This leads to the <strong>Reset Bridge</strong>.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <ShieldCheck className="w-8 h-8 text-indigo-600" />
                    1. The Hazard: Removal Recovery
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700">
                        The danger isn't when you PRESS reset (Assertion). The danger is when you RELEASE it (Deassertion).
                        <br />
                        If you release the reset button exactly as the clock ticks, the Flip-Flops get confused.
                    </p>
                </div>
                <ResetHazardVisualizer />
            </div>

            {/* --- The Comparisons --- */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">

                {/* Async Reset */}
                <div className="bg-red-50 p-8 rounded-2xl border border-red-200">
                    <h3 className="flex items-center gap-2 text-2xl font-bold text-red-900 mb-4">
                        <Zap className="w-6 h-6" />
                        Asynchronous Reset
                    </h3>
                    <p className="text-red-800 mb-4 text-sm leading-relaxed">
                        Reset pin connects directly to the Flip-Flop's CLR/PRE pin.
                    </p>
                    <ul className="space-y-2 text-red-900 text-sm list-disc pl-5">
                        <li>✅ <strong>Instant:</strong> Works even if clock is dead.</li>
                        <li>❌ <strong>Hazardous:</strong> "Removal Recovery Violation" if released near clock edge.</li>
                    </ul>
                </div>

                {/* Sync Reset */}
                <div className="bg-blue-50 p-8 rounded-2xl border border-blue-200">
                    <h3 className="flex items-center gap-2 text-2xl font-bold text-blue-900 mb-4">
                        <ShieldCheck className="w-6 h-6" />
                        Synchronous Reset
                    </h3>
                    <p className="text-blue-800 mb-4 text-sm leading-relaxed">
                        Reset signal is just another input to the combinational logic (D-input).
                    </p>
                    <ul className="space-y-2 text-blue-900 text-sm list-disc pl-5">
                        <li>✅ <strong>Safe:</strong> 100% synchronous. No metastability.</li>
                        <li>❌ <strong>Slow:</strong> Needs a clock edge to take effect.</li>
                        <li>❌ <strong>Misses Pulses:</strong> Short reset pulses might be ignored.</li>
                    </ul>
                </div>
            </div>

            {/* --- The Golden Solution --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Layers className="w-8 h-8 text-gray-700" />
                    2. The Industry Standard: Reset Bridge
                </h2>
                <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-200">
                    <p className="text-center font-bold text-emerald-900 mb-6 text-xl">"Asynchronous Assertion, Synchronous Deassertion"</p>

                    <div className="mermaid bg-white p-4 rounded-xl border border-emerald-100">
                        {`graph LR
                            VCC(VCC '1') --> D1
                            D1[FF 1] --Q--> D2[FF 2]
                            D2 --Q--> RstOut(System Reset)
                            
                            ExternalReset(Reset Button) --> CLR1(Clear 1)
                            ExternalReset --> CLR2(Clear 2)
                            
                            classDef ff fill:#e0e7ff,stroke:#4338ca,stroke-width:2px;
                            class D1,D2 ff;
                        `}
                    </div>
                    <p className="text-center text-xs text-emerald-600 mt-6 font-bold">
                        The External Reset clears BOTH Flip-Flops instantly (Async). <br />
                        When Reset is released, '1' ripples through the FFs synchronously with the Clock.
                    </p>
                </div>
            </div>

            {/* Interview Tip */}
            <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                <h4 className="flex items-center gap-2 font-bold text-amber-900 mb-2">
                    <AlertTriangle className="w-5 h-5" />
                    Why use two FFs?
                </h4>
                <p className="text-sm text-amber-800">
                    The first FF might go metastable when you release the reset button. The second FF "cleans up" that metastable state, ensuring the final output is a clean logic level. This is a standard <strong>2-FF Synchronizer</strong> chain.
                </p>
            </div>

            <SubtopicNav prev={navPrev} next={navNext} />
        </div>
    );
}
