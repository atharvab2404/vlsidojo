"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Box, LayoutTemplate, Split } from "lucide-react";
import FSMCodingStyleVisualizer from "./FSMCodingStyleVisualizer";

export default function Page() {
    const currentSlug = "fsm-verilog-coding-styles-1-process-2-process-3-process";
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
                FSM Coding Styles <br />

            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Every engineer has a preference, but the <strong>2-Process</strong> style is generally considered the industry standard for readability and synthesis safety.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <LayoutTemplate className="w-8 h-8 text-indigo-600" />
                    1. Architecture Comparison
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        Explore how splitting the FSM logic into different <code>always</code> blocks changes the structure.
                    </p>
                </div>
                <FSMCodingStyleVisualizer />
            </div>

            {/* --- Theory: Pros and Cons --- */}
            <div className="space-y-8 mb-16">

                {/* 1-Process */}
                <div className="bg-white p-6 rounded-xl border-l-4 border-indigo-500 shadow-sm">
                    <h3 className="text-xl font-bold text-indigo-900 mb-2">1-Process Style</h3>
                    <p className="text-sm text-gray-600 mb-2">Everything in one `always @(posedge clk)` block.</p>
                    <ul className="text-sm ml-5 list-disc text-gray-700">
                        <li>outputs are registered (glitch-free).</li>
                        <li>Logic and state updates are mixed, making complex FSMs hard to read.</li>
                    </ul>
                </div>

                {/* 2-Process */}
                <div className="bg-emerald-50 p-6 rounded-xl border-l-4 border-emerald-500 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold text-emerald-900">2-Process Style (Recommended)</h3>
                        <span className="bg-emerald-200 text-emerald-800 text-xs font-bold px-2 py-1 rounded">INDUSTRY STANDARD</span>
                    </div>
                    <p className="text-sm text-emerald-800 mb-2">Separates <strong>Seq (State)</strong> from <strong>Comb (Next State/Output)</strong>.</p>
                    <ul className="text-sm ml-5 list-disc text-emerald-800">
                        <li>Clear separation of concerns.</li>
                        <li>Easier to debug (can see `next_state` separately in waveform).</li>
                        <li><strong>Note:</strong> Outputs are combinational (can be glitchy). If registered outputs are needed, use 3-process or add a register stage.</li>
                    </ul>
                </div>

                {/* 3-Process */}
                <div className="bg-white p-6 rounded-xl border-l-4 border-amber-500 shadow-sm">
                    <h3 className="text-xl font-bold text-amber-900 mb-2">3-Process Style</h3>
                    <p className="text-sm text-gray-600 mb-2">Seq (State) + Comb (Next State) + Comb (Output).</p>
                    <ul className="text-sm ml-5 list-disc text-gray-700">
                        <li>Maximum modularity.</li>
                        <li>Great for Moore FSMs where output depends only on state.</li>
                        <li>Can be verbose (lots of code).</li>
                    </ul>
                </div>

            </div>

            {/* --- Interview Question --- */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 mb-12 text-slate-300 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-4">Interview Question</h2>
                <p className="text-lg text-emerald-300 mb-2">"What is the difference between Moore and Mealy machines?"</p>
                <p className="leading-relaxed mb-2">
                    <strong>Moore:</strong> Output depends ONLY on current state.
                </p>
                <p className="leading-relaxed">
                    <strong>Mealy:</strong> Output depends on current state AND current input. (Responses are faster, but glitches are more likely).
                </p>
            </div>

            <div className="mt-12">
                <SubtopicNav prev={navPrev} next={navNext} />
            </div>
        </div>
    );
}
