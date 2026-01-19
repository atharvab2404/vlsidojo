"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Download, RotateCw, Cpu, Layers } from "lucide-react";
import ParallelLoadCounterVisualizer from "./ParallelLoadCounterVisualizer";

export default function Page() {
    const currentSlug = "how-to-design-a-synchronous-counter-with-parallel-load";
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
                How to Design a Synchronous Counter with Parallel Load
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Standard counters always start from 0 and go up. But what if you want to start counting from 5? Or 10? This is called <strong>Presetting</strong>. To achieve this, we modify the hardware by injecting a <strong>Multiplexer (Mux)</strong> before every Flip-Flop.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Download className="w-8 h-8 text-indigo-600" />
                    1. Interactive Parallel Load
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700">
                        <strong>Try this:</strong>
                        <br />
                        1. Toggle the <strong>Parallel Input</strong> switches to set a number (e.g., 1010 = 10).
                        <br />
                        2. Switch Control to <span className="text-amber-600 font-bold bg-amber-50 px-1 rounded">LOAD</span>.
                        <br />
                        3. Pulse the Clock. Notice the counter jumps instantly to 10.
                        <br />
                        4. Switch Control back to <span className="text-emerald-600 font-bold bg-emerald-50 px-1 rounded">COUNT</span> and pulse again. It counts up from 10.
                    </p>
                </div>

                <ParallelLoadCounterVisualizer />
            </div>

            {/* --- Theory Section --- */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">

                {/* The Problem */}
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                    <h3 className="flex items-center gap-2 text-2xl font-bold text-slate-800 mb-4">
                        <RotateCw className="w-6 h-6" />
                        The Design Challenge
                    </h3>
                    <p className="text-slate-700 mb-4 text-sm leading-relaxed">
                        A basic counter's Next State logic is hardwired:
                    </p>
                    <div className="bg-white p-3 rounded border border-slate-200 font-mono text-center text-slate-600 mb-4">
                        Q(next) = Q(current) + 1
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">
                        We need a way to <strong>override</strong> this "+1" logic based on a command signal.
                    </p>
                </div>

                {/* The Solution */}
                <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-200">
                    <h3 className="flex items-center gap-2 text-2xl font-bold text-indigo-900 mb-4">
                        <Cpu className="w-6 h-6" />
                        The Mux Solution
                    </h3>
                    <p className="text-indigo-800 mb-4 text-sm leading-relaxed">
                        We place a <strong>2:1 Multiplexer</strong> in front of the D input of <em>every</em> flip-flop stage.
                    </p>
                    <ul className="space-y-2 text-indigo-900 text-sm list-disc pl-5">
                        <li><strong>Select Line:</strong> Connected to the generic LOAD signal.</li>
                        <li><strong>Input 0 (Load=0):</strong> Connected to the "+1" Count Logic.</li>
                        <li><strong>Input 1 (Load=1):</strong> Connected to the External Parallel Input pin.</li>
                    </ul>
                </div>
            </div>

            {/* --- Hardware Diagram --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Layers className="w-8 h-8 text-gray-700" />
                    2. Hardware Structure
                </h2>
                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                    <p className="text-center font-bold text-gray-500 mb-6">Internal Layout of a Single Bit Slice</p>

                    <div className="mermaid">
                        {`graph LR
                            %% Nodes
                            CountLogic["Count Logic (+1)"]
                            ParInput(Parallel In)
                            Mux{2:1 MUX}
                            DFF[D Flip-Flop]
                            Load(Load Signal)
                            
                            %% Connections
                            CountLogic --0--> Mux
                            ParInput --1--> Mux
                            Load --Select--> Mux
                            Mux --D--> DFF
                            DFF --Q--> CountLogic
                            DFF --Q--> Output
                        `}
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-6">
                        When Load=1, the feedback loop (+1) is broken, and new data enters.
                    </p>
                </div>
            </div>

            <SubtopicNav prev={navPrev} next={navNext} />
        </div>
    );
}
