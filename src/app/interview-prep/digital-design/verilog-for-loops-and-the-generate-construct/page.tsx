"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Repeat, Layers, Cpu } from "lucide-react";
import LoopUnroller from "./LoopUnroller";

export default function Page() {
    const currentSlug = "verilog-for-loops-and-the-generate-construct";
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
                Verilog Loops &amp; Generate <br />

            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                The biggest misconception software engineers have when learning Verilog:
                "Loops iterate over time." <strong>False.</strong> In hardware, loops iterate over <strong>Space</strong> (Hardware Units).
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Repeat className="w-8 h-8 text-indigo-600" />
                    1. The "Unrolling" Concept
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        See how a loop of 4 iterations is transformed by the tool into 4 parallel hardware blocks.
                    </p>
                </div>
                <LoopUnroller />
            </div>

            {/* --- Theory: Comparison Grid --- */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <div className="bg-indigo-100 p-1 rounded"><Cpu className="w-4 h-4 text-indigo-600" /></div> Procedural For Loop
                    </h3>
                    <pre className="text-xs bg-slate-900 text-slate-300 p-3 rounded mb-3 overflow-x-auto">
                        always @(*) begin{"\n"}
                        for(i=0; i&lt;4; i=i+1) begin{"\n"}
                        y[i] = a[i];{"\n"}
                        end{"\n"}
                        end
                    </pre>
                    <ul className="text-sm space-y-2 text-indigo-800 ml-4 list-disc">
                        <li><strong>Location:</strong> Inside `always` blocks.</li>
                        <li><strong>Purpose:</strong> Describing repetitive <strong>Logic</strong> equations (MUXes, Encoders, Reordering).</li>
                        <li><strong>Constraint:</strong> Loop bounds must be static constants!</li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <div className="bg-emerald-100 p-1 rounded"><Layers className="w-4 h-4 text-emerald-600" /></div> Generate For Loop
                    </h3>
                    <pre className="text-xs bg-slate-900 text-slate-300 p-3 rounded mb-3 overflow-x-auto">
                        genvar i;{"\n"}
                        generate{"\n"}
                        for(i=0; i&lt;4; i=i+1) begin : u_blk{"\n"}
                        MY_MOD u_inst (...);{"\n"}
                        end{"\n"}
                        endgenerate
                    </pre>
                    <ul className="text-sm space-y-2 text-emerald-800 ml-4 list-disc">
                        <li><strong>Location:</strong> Outside `always` blocks (Module level).</li>
                        <li><strong>Purpose:</strong> Instantiating multiple copies of a <strong>Module</strong>.</li>
                        <li><strong>Constraint:</strong> Uses `genvar` index.</li>
                    </ul>
                </div>

            </div>

            {/* --- Interview Question --- */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 mb-12 text-slate-300 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-4">Interview Question</h2>
                <p className="text-lg text-emerald-300 mb-2">"Is a for loop synthesizable in Verilog?"</p>
                <p className="leading-relaxed">
                    <strong>Answer:</strong> Yes, BUT only if the loop bounds are static (constant at compile time). The synthesizer must know exactly how many times to unroll the hardware. If the loop bound is a dynamic signal (`i &lt; my_input_signal`), it is NOT synthesizable.
                </p>
            </div>

            <div className="mt-12">
                <SubtopicNav prev={navPrev} next={navNext} />
            </div>
        </div>
    );
}
