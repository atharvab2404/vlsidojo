"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, ListOrdered, LayoutGrid, Zap } from "lucide-react";
import PriorityVsParallelVisualizer from "./PriorityVsParallelVisualizer";

export default function Page() {
    const currentSlug = "verilog-if-else-vs-case-statements-synthesis-priority";
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
                Verilog <code>if-else</code> vs. <code>case</code> <br />

            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Syntactically, they look similar. Hardwarily, they produce very different circuits.
                Understanding <strong>Priority Logic</strong> vs. <strong>Parallel Logic</strong> is essential for timing closure.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Zap className="w-8 h-8 text-indigo-600" />
                    1. The Hardware Difference
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        Toggle between the two styles to see how the synthesizer constructs the logic gates.
                        Notice the difference in path depth (Delay).
                    </p>
                </div>
                <PriorityVsParallelVisualizer />
            </div>

            {/* --- Theory: Detailed Comparison --- */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <div className="bg-amber-100 p-1 rounded"><ListOrdered className="w-4 h-4 text-amber-600" /></div> If-Else Statements
                    </h3>
                    <p className="text-sm font-bold text-amber-600 mb-2 uppercase tracking-wide">Infers Priority Logic</p>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        The tool assumes the <i>order matters</i>. It checks the first condition; if false, it checks the second, and so on.
                    </p>
                    <ul className="text-sm space-y-2 text-gray-600 ml-4 list-disc">
                        <li><strong>Hardware:</strong> Cascaded chain of multiplexers.</li>
                        <li><strong>Latency:</strong> High. The last signal in the chain has the longest delay.</li>
                        <li><strong>Use for:</strong> Signals that MUST have priority (e.g., Asynchronous Reset, Emergency Stop).</li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <div className="bg-indigo-100 p-1 rounded"><LayoutGrid className="w-4 h-4 text-indigo-600" /></div> Case Statements
                    </h3>
                    <p className="text-sm font-bold text-indigo-600 mb-2 uppercase tracking-wide">Infers Parallel Logic</p>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        The tool assumes conditions are <i>mutually exclusive</i> (only one can be true at a time). It checks them all simultaneously.
                    </p>
                    <ul className="text-sm space-y-2 text-gray-600 ml-4 list-disc">
                        <li><strong>Hardware:</strong> One large, wide multiplexer.</li>
                        <li><strong>Latency:</strong> Low. Balanced delay for all inputs.</li>
                        <li><strong>Use for:</strong> State Machines, Instruction Decoders, Address decoding.</li>
                    </ul>
                </div>

            </div>

            {/* --- Interview Tip --- */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 mb-12 text-slate-300 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-4">Interview Question</h2>
                <p className="text-lg text-emerald-300 mb-2">"When should you choose `if-else` over `case`?"</p>
                <p className="leading-relaxed">
                    <strong>Answer:</strong> Choose `if-else` when priority is required (e.g., a priority encoder or reset logic). Choose `case` when inputs are mutually exclusive (e.g., a state machine) to get better timing performance (less delay).
                </p>
            </div>

            <div className="mt-12">
                <SubtopicNav prev={navPrev} next={navNext} />
            </div>
        </div>
    );
}
