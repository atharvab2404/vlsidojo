"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Box, Diamond, Command, Activity } from "lucide-react";
import ASMChartVisualizer from "./ASMChartVisualizer";

export default function Page() {
    const currentSlug = "what-is-an-algorithmic-state-machine-asm-chart";
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
                What is an <br />

            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                The <strong>Algorithmic State Machine (ASM)</strong> chart is a flowchart-like alternative to the traditional State Diagram.
                <br /><br />
                It is preferred for complex digital controls because it clearer shows the <strong>timing</strong> and <strong>flow</strong> of operations within a single clock cycle.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Activity className="w-8 h-8 text-indigo-600" />
                    1. Interactive ASM Walker
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        Step through the logic flow. Notice how "Decision Boxes" (Diamonds) determine the path taken before the next clock edge.
                        <br />
                        Try toggling input <strong>X</strong> before stepping.
                    </p>
                </div>
                <ASMChartVisualizer />
            </div>

            {/* --- Theory: Components --- */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
                    <Box className="w-12 h-12 text-indigo-600 mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">State Box</h3>
                    <p className="text-sm text-gray-600">
                        A rectangle representing a stable state (e.g., S0). Outputs listed here are <strong>Moore Outputs</strong> (depend only on state).
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
                    <Diamond className="w-12 h-12 text-amber-500 mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Decision Box</h3>
                    <p className="text-sm text-gray-600">
                        A diamond representing an Input condition (e.g., is Reset high?). It splits the path.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
                    <Command className="w-12 h-12 text-emerald-500 mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Conditional Output</h3>
                    <p className="text-sm text-gray-600">
                        An oval (rounded rect) on a path. Represents <strong>Mealy Outputs</strong> that happen immediately if that path is taken.
                    </p>
                </div>

            </div>

            {/* --- Comparison --- */}
            <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100 mb-12">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6">ASM Chart vs. State Diagram</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-indigo-200 text-indigo-800">
                                <th className="py-2 px-4">Feature</th>
                                <th className="py-2 px-4">State Diagram</th>
                                <th className="py-2 px-4">ASM Chart</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-700">
                            <tr className="bg-indigo-100/50">
                                <td className="py-3 px-4 font-bold">Visual Style</td>
                                <td className="py-3 px-4">Bubbles & Arrows</td>
                                <td className="py-3 px-4">Flowchart (Programmer friendly)</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-bold">Timing</td>
                                <td className="py-3 px-4">Implicit (Edges usually mean clock)</td>
                                <td className="py-3 px-4">Explicit (One pass = One Clock)</td>
                            </tr>
                            <tr className="bg-indigo-100/50">
                                <td className="py-3 px-4 font-bold">Complexity</td>
                                <td className="py-3 px-4">Gets messy with many inputs</td>
                                <td className="py-3 px-4">Scales better for large controllers</td>
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
