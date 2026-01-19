"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Cpu, Zap, Activity, Code } from "lucide-react";
import StateEncodingVisualizer from "./StateEncodingVisualizer";

export default function Page() {
    const currentSlug = "state-assignment-binary-vs-gray-vs-one-hot-encoding";
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
                State Assignment: <br />

            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                After drawing an FSM's State Diagram, you must assign a unique binary code to each state (S<sub>0</sub>, S<sub>1</sub>, S<sub>2</sub>...).
                This step, called <strong>State Encoding</strong>, directly impacts your circuit's <strong>Area, Speed, and Power</strong>.
                There is no "one size fits all" choice.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Activity className="w-8 h-8 text-indigo-600" />
                    1. Interactive Encoding Laboratory
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        Use this tool to compare how many Flip-Flops are needed (Width) and how many bits toggle per transition (Power) for different encodings.
                        <br /><br />
                        <strong>Observe:</strong> Gray codes only change 1 bit at a time! One-Hot codes become very wide very fast!
                    </p>
                </div>
                <StateEncodingVisualizer />
            </div>

            {/* --- Theory Comparison --- */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">

                {/* Binary Encoding */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 text-indigo-600">
                        <Cpu className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Binary Encoding</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Assigns states in sequential binary order (000, 001, 010...).
                    </p>
                    <ul className="text-sm space-y-2">
                        <li className="flex gap-2">
                            <span className="font-bold text-green-600">Pros:</span>
                            <span className="text-gray-700">Minimum Flip-Flops (&lceil;log<sub>2</sub> N&rceil;). Good for CPLDs/ASICs where logic is cheap.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-bold text-red-600">Cons:</span>
                            <span className="text-gray-700">High decoding complexity. Simultaneous switching noise.</span>
                        </li>
                    </ul>
                </div>

                {/* Gray Encoding */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 text-emerald-600">
                        <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Gray Encoding</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Assigns codes so only <strong>one bit changes</strong> between adjacent states.
                    </p>
                    <ul className="text-sm space-y-2">
                        <li className="flex gap-2">
                            <span className="font-bold text-green-600">Pros:</span>
                            <span className="text-gray-700">Low Power (fewer toggles). Minimal Glitches. Best for Counters/Async logic.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-bold text-red-600">Cons:</span>
                            <span className="text-gray-700">Complex next-state logic. Harder to debug manually.</span>
                        </li>
                    </ul>
                </div>

                {/* One-Hot Encoding */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4 text-amber-600">
                        <Activity className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">One-Hot Encoding</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Uses one Flip-Flop per state. (3 States = 3 FFs: 001, 010, 100).
                    </p>
                    <ul className="text-sm space-y-2">
                        <li className="flex gap-2">
                            <span className="font-bold text-green-600">Pros:</span>
                            <span className="text-gray-700">Fastest (Decoding is just 1 logic gate). FPGA friendly (FFs are cheap).</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-bold text-red-600">Cons:</span>
                            <span className="text-gray-700">Uses many Flip-Flops (N). High wiring congestion.</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* --- Verilog --- */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 mb-12 text-slate-300 font-mono text-sm shadow-xl">
                <div className="flex items-center gap-2 mb-6 text-slate-100 border-b border-slate-700 pb-4">
                    <Code className="w-5 h-5 text-sky-400" />
                    <span className="font-bold text-lg">Verilog Implementation</span>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <p className="text-sky-400 font-bold mb-2">// Binary / Gray</p>
                        <p className="mb-4 text-slate-400 text-xs">Uses parameter constants.</p>
                        <pre>{`parameter S0 = 2'b00;
parameter S1 = 2'b01;
parameter S2 = 2'b10;
parameter S3 = 2'b11;

reg [1:0] state, next_state;`}</pre>
                    </div>

                    <div>
                        <p className="text-amber-400 font-bold mb-2">// One-Hot</p>
                        <p className="mb-4 text-slate-400 text-xs">Uses vector positions.</p>
                        <pre>{`parameter S0 = 4'b0001;
parameter S1 = 4'b0010;
parameter S2 = 4'b0100;
parameter S3 = 4'b1000;

reg [3:0] state, next_state;`}</pre>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800">
                    <p className="text-emerald-400 font-bold mb-2">Pro Tip: Let the Tool Decide!</p>
                    <p>
                        In modern synthesis, you actully write descriptive names (IDLE, READ, WRITE) and let the localized synthesis tool (Vivado/Quartus) choose the encoding:
                    </p>
                    <pre className="mt-2 text-slate-400">(* fsm_encoding = "one_hot" *) reg [1:0] state;</pre>
                </div>
            </div>

            <div className="mt-12">
                <SubtopicNav prev={navPrev} next={navNext} />
            </div>
        </div>
    );
}
