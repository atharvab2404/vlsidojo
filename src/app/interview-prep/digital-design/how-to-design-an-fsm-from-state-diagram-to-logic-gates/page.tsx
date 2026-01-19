"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Database, GitGraph, Grid, Cpu, ListOrdered } from "lucide-react";
import FSMDesignExplorer from "./FSMDesignExplorer";

export default function Page() {
    const currentSlug = "how-to-design-an-fsm-from-state-diagram-to-logic-gates";
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
                FSM Design Steps: From Problem to Circuit
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Designing a Finite State Machine is the most "systematic" skill in digital logic. Whether you are building a simple counter or a complex CPU controller, the process is <strong>identical</strong>. Master these 5 steps.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <ListOrdered className="w-8 h-8 text-indigo-600" />
                    Interactive Design Walkthrough
                </h2>
                <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl border border-slate-700 shadow-sm mb-6">
                    <p>
                        Let's design a <strong>2-Bit Gray Code Counter</strong> together.
                        <br />
                        Click "Next Step" to see how we transform a requirement into actual gates.
                    </p>
                </div>
                <FSMDesignExplorer />
            </div>

            {/* --- Theory Detail --- */}
            <div className="space-y-16 mb-16">
                <h2 className="text-3xl font-bold text-gray-900 border-b pb-2 border-gray-200">The 5-Step Recipe</h2>

                {/* Step 1 */}
                <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl">1</div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">State Diagram</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Translate the English requirement into "Bubbles and Arrows".
                            <br />
                            Ask yourself: <strong>"How many states do I need?"</strong>
                        </p>
                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 text-sm text-orange-900">
                            <strong>Tip:</strong> Always label your transitions clearly. Is it a Mealy (Input/Output) or Moore (Output in Bubble) design?
                        </div>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl">2</div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">State Transition Table</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Convert the diagram into a Truth Table.
                            <br />
                            <strong>Inputs:</strong> Current State (Q<sub>n</sub>), External Inputs (In).
                            <br />
                            <strong>Outputs:</strong> Next State (Q<sub>n+1</sub>), External Outputs (Out).
                        </p>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl">3</div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">State Encoding</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            You must decide how to represent "Bubbles" in binary.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h4 className="font-bold text-gray-900 mb-2">Binary Encoding</h4>
                                <p className="text-sm text-gray-600 mb-2">Uses min bits (&lceil;log<sub>2</sub> N&rceil;).</p>
                                <div className="font-mono text-xs bg-gray-100 p-2 rounded">
                                    00, 01, 10, 11
                                </div>
                                <p className="text-xs text-green-600 mt-2 font-bold">Good for area (fewer FFs).</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h4 className="font-bold text-gray-900 mb-2">One-Hot Encoding</h4>
                                <p className="text-sm text-gray-600 mb-2">Uses 1 bit per state ($N$).</p>
                                <div className="font-mono text-xs bg-gray-100 p-2 rounded">
                                    0001, 0010, 0100, 1000
                                </div>
                                <p className="text-xs text-green-600 mt-2 font-bold">Good for speed (simpler next-state logic).</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl">4</div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Logic Minimization (K-Map)</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Use K-Maps to find the simplest Boolean equation for <strong>each Flip-Flop input</strong>.
                            <br />
                            For a 2-bit counter, you need equations for D<sub>1</sub> and D<sub>0</sub>.
                        </p>
                    </div>
                </div>

                {/* Step 5 */}
                <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl">5</div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Circuit Implementation</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Draw the schematic.
                            <br />
                            Connect your logic clouds to the $D$ inputs of the Flip-Flops. Connect the $Q$ outputs back to the inputs of the clouds (Feedback).
                        </p>
                    </div>
                </div>
            </div>

            <SubtopicNav prev={navPrev} next={navNext} />
        </div>
    );
}
