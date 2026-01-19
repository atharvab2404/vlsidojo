"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Search, Database, PenTool } from "lucide-react";
import AnalysisVisualizer from "./AnalysisVisualizer";

export default function Page() {
    const currentSlug = "how-to-analyze-a-sequential-circuit-derive-fsm-from-gates";
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
                Analyzing Sequential Circuits: <br />

            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Usually, we design <i>forward</i> (Idea &rarr; Gates). But sometimes you need to reverse-engineer a circuit to understand what it does.
                This process converts a Gate-Level Schematic back into a readable <strong>State Diagram</strong>.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <AnalysisVisualizer />
            </div>

            {/* --- Theory Steps --- */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                        <Search className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">1. Excitation Equations</h3>
                    <p className="text-sm text-gray-600">
                        Trace the circuit wires to find the boolean expression for each Flip-Flop input (D, T, or J/K).
                        <br />
                        <span className="font-mono bg-gray-100 text-gray-800 px-1 rounded">D = f(inputs, current_state)</span>
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 text-amber-600">
                        <Database className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">2. Transition Table</h3>
                    <p className="text-sm text-gray-600">
                        Plug every combination of Inputs and Present States into your equations to find the Next State.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 text-emerald-600">
                        <PenTool className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">3. State Diagram</h3>
                    <p className="text-sm text-gray-600">
                        Draw circles for states and arrows for transitions. Analyze the flow to identify the function (Example: "Oh, it's a 3-bit UP Counter!").
                    </p>
                </div>
            </div>

            <div className="mt-12">
                <SubtopicNav prev={navPrev} next={navNext} />
            </div>
        </div>
    );
}
