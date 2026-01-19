"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Microscope, TrendingUp, AlertOctagon, ScanLine } from "lucide-react";
import ControllabilityDemo from "./ControllabilityDemo";

export default function Page() {
    const currentSlug = "what-is-design-for-testability-dft";
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
                Design for Testability (DFT)
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Chips are not just logical concepts; they are physical objects prone to manufacturing defects.
                DFT is the art of adding extra hardware to a chip solely to make it easier to test for these physical faults.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <ScanLine className="w-8 h-8 text-indigo-600" />
                    1. The "Black Box" Problem
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        In a complex chip, accessing internal logic is impossible from just the external pins.
                        <br />
                        Try the demo below. See how hard it is to toggle the internal wire using only the primary inputs, and how inserting a <strong>Test Point (Scan)</strong> solves this.
                    </p>
                </div>
                <ControllabilityDemo />
            </div>

            {/* --- Theory: The Rule of 10 --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-emerald-600" />
                    2. The Logic: Why do we need DFT?
                </h2>
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">The Rule of 10</h3>
                        <p className="text-gray-700 mb-4">
                            The cost of finding a defective chip increases by an order of magnitude at each stage of the product lifecycle.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-4">
                                <span className="w-20 text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-center">WAFER</span>
                                <span className="font-mono font-bold text-emerald-600">$0.10</span>
                                <span className="text-sm text-gray-500">Catch it here! (Wafer Sort)</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="w-20 text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-center">PACKAGE</span>
                                <span className="font-mono font-bold text-indigo-600">$1.00</span>
                                <span className="text-sm text-gray-500">Standard Test</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="w-20 text-xs font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded text-center">BOARD</span>
                                <span className="font-mono font-bold text-amber-600">$10.00</span>
                                <span className="text-sm text-gray-500">PCB Assembly</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="w-20 text-xs font-bold bg-rose-100 text-rose-700 px-2 py-1 rounded text-center">SYSTEM</span>
                                <span className="font-mono font-bold text-rose-600">$100.00</span>
                                <span className="text-sm text-gray-500">Inside the Phone/Car</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="w-20 text-xs font-bold bg-gray-200 text-gray-700 px-2 py-1 rounded text-center">FIELD</span>
                                <span className="font-mono font-bold text-gray-900">$1,000+</span>
                                <span className="text-sm text-gray-500">Recall / Reputation Damage</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* --- Theory: Key Metrics --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Microscope className="w-8 h-8 text-indigo-600" />
                    3. Key Metrics: Controllability & Observability
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-indigo-50 p-6 rounded-2xl border-l-4 border-indigo-500">
                        <h3 className="text-xl font-bold text-indigo-900 mb-2">Controllability</h3>
                        <p className="text-sm text-indigo-800 leading-relaxed">
                            How difficult is it to set a specific node inside the chip to a value of '0' or '1' by toggling only the primary input pins?
                            <br /><br />
                            <strong>Goal:</strong> High Controllability.
                        </p>
                    </div>
                    <div className="bg-emerald-50 p-6 rounded-2xl border-l-4 border-emerald-500">
                        <h3 className="text-xl font-bold text-emerald-900 mb-2">Observability</h3>
                        <p className="text-sm text-emerald-800 leading-relaxed">
                            How difficult is it to propagate a value from a specific internal node to a primary output pin where we can measure it?
                            <br /><br />
                            <strong>Goal:</strong> High Observability.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- Summary Table --- */}
            <div className="bg-slate-900 p-8 rounded-2xl text-slate-300">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <AlertOctagon className="w-6 h-6 text-amber-500" />
                    Design Verification vs. Manufacturing Test
                </h2>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-700 text-xs uppercase tracking-widest text-slate-500">
                            <th className="py-3 pr-4">Feature</th>
                            <th className="py-3 px-4">Design Verification (DV)</th>
                            <th className="py-3 px-4">Manufacturing Test (DFT)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-sm">
                        <tr>
                            <td className="py-4 pr-4 font-bold text-white">Goal</td>
                            <td className="py-4 px-4">Check if the <strong>Design</strong> is correct.</td>
                            <td className="py-4 px-4">Check if the <strong>Silicon</strong> is flawless.</td>
                        </tr>
                        <tr>
                            <td className="py-4 pr-4 font-bold text-white">Target</td>
                            <td className="py-4 px-4">RTL Logic / Algorithms.</td>
                            <td className="py-4 px-4">Transistors / Wires.</td>
                        </tr>
                        <tr>
                            <td className="py-4 pr-4 font-bold text-white">Simulation</td>
                            <td className="py-4 px-4">Functional (0, 1).</td>
                            <td className="py-4 px-4">Structural (Stuck-at types).</td>
                        </tr>
                        <tr>
                            <td className="py-4 pr-4 font-bold text-white">When?</td>
                            <td className="py-4 px-4">Before Tapeout.</td>
                            <td className="py-4 px-4">After Fabrication.</td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <div className="mt-12">
                <SubtopicNav prev={navPrev} next={navNext} />
            </div>
        </div>
    );
}
