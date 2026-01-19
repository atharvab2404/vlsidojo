"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Layers, Cpu, Eye } from "lucide-react";
import AbstractionLevelExplorer from "./AbstractionLevelExplorer";

export default function Page() {
    const currentSlug = "structural-vs-behavioral-vs-dataflow-modeling-in-verilog";
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
                Structural vs. Behavioral <br />

            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Verilog allows you to describe hardware at different levels of abstraction.
                Knowing <i>when</i> to use each style is a key sign of a mature RTL engineer.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Layers className="w-8 h-8 text-indigo-600" />
                    1. The Three Layers of Abstraction
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        Compare how the EXACT SAME circuit (a Full Adder) is described in three completely different ways.
                    </p>
                </div>
                <AbstractionLevelExplorer />
            </div>

            {/* --- Theory: Detailed Breakdown --- */}
            <div className="space-y-12 mb-16">

                {/* 1. Structural */}
                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-700"><Layers className="w-5 h-5" /></div>
                        1. Structural Modeling
                    </h3>
                    <p className="text-gray-700 mb-4">
                        This is the lowest level of abstraction. You manually connect components (gates or other modules) using wires.
                    </p>
                    <ul className="list-disc ml-5 space-y-2 text-gray-600 mb-4">
                        <li><strong>Keywords:</strong> module instantiation, wire.</li>
                        <li><strong>Analogy:</strong> Breadboarding. You pick chips and wire them up.</li>
                        <li><strong>Use Case:</strong> Top-level hierarchy (connecting huge IP blocks) or Post-Synthesis Netlists.</li>
                    </ul>
                    <div className="bg-slate-900 p-4 rounded text-slate-300 font-mono text-sm border-l-4 border-indigo-500">
                        and U1 (w1, a, b); <br />
                        not U2 (w2, w1);
                    </div>
                </div>

                {/* 2. Dataflow */}
                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-700"><Cpu className="w-5 h-5" /></div>
                        2. Dataflow Modeling
                    </h3>
                    <p className="text-gray-700 mb-4">
                        Describes the constant flow of data using boolean equations or arithmetic.
                    </p>
                    <ul className="list-disc ml-5 space-y-2 text-gray-600 mb-4">
                        <li><strong>Keywords:</strong> <code>assign</code></li>
                        <li><strong>Analogy:</strong> Writing math formulas.</li>
                        <li><strong>Use Case:</strong> Simple Combinational Logic (Muxes, Adders, Decoders).</li>
                    </ul>
                    <div className="bg-slate-900 p-4 rounded text-slate-300 font-mono text-sm border-l-4 border-indigo-500">
                        assign sum = a ^ b; <br />
                        assign is_equal = (a == b);
                    </div>
                </div>

                {/* 3. Behavioral */}
                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-700"><Eye className="w-5 h-5" /></div>
                        3. Behavioral Modeling
                    </h3>
                    <p className="text-gray-700 mb-4">
                        The highest level. Describes the <strong>algorithm</strong> or <strong>functionality</strong> without worrying about the specific logic gates.
                    </p>
                    <ul className="list-disc ml-5 space-y-2 text-gray-600 mb-4">
                        <li><strong>Keywords:</strong> <code>always</code>, <code>if-else</code>, <code>case</code>, <code>reg</code>.</li>
                        <li><strong>Analogy:</strong> Writing C/Python code.</li>
                        <li><strong>Use Case:</strong> Complex Logic, FSMs, Sequential Circuits (Flip-Flops).</li>
                    </ul>
                    <div className="bg-slate-900 p-4 rounded text-slate-300 font-mono text-sm border-l-4 border-indigo-500">
                        always @(posedge clk) begin <br />
                        &nbsp; if (reset) count &lt;= 0; <br />
                        &nbsp; else count &lt;= count + 1; <br />
                        end
                    </div>
                </div>

            </div>

            {/* --- Comparison Table --- */}
            <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100 mb-12">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6">Cheat Sheet: When to use what?</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-indigo-200 text-indigo-800">
                                <th className="py-2 px-4">Requirement</th>
                                <th className="py-2 px-4">Preferred Style</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-700">
                            <tr className="bg-indigo-100/50">
                                <td className="py-3 px-4 font-bold">Connecting blocks (Top Level)</td>
                                <td className="py-3 px-4">Structural</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-bold">Simple Logic (Mux, Adder, Gates)</td>
                                <td className="py-3 px-4">Dataflow (`assign`)</td>
                            </tr>
                            <tr className="bg-indigo-100/50">
                                <td className="py-3 px-4 font-bold">Registers / Flip-Flops</td>
                                <td className="py-3 px-4">Behavioral (`always @posedge clk`)</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-bold">Finite State Machines</td>
                                <td className="py-3 px-4">Behavioral (`case`)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-12">
                <SubtopicNav prev={navPrev} next={navNext} />
            </div>
        </div>
    );
}
