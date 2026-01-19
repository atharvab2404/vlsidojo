"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Bug, AlertTriangle, Search, Activity } from "lucide-react";
import FaultSimulator from "./FaultSimulator";

export default function Page() {
    const currentSlug = "testing-fault-models-stuck-at-0-and-stuck-at-1";
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
                Fault Models: Stuck-at-0 & Stuck-at-1
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Physical defects on a chip (dust, metal shorts, broken wires) are complex.
                To make testing manageable, we model them as logical faults: wires that are permanently "Stuck" at Logic 0 or Logic 1.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Bug className="w-8 h-8 text-rose-600" />
                    1. Interactive Fault Simulator
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        Can you find a test vector that detects a fault?
                        <br />
                        1. <strong>Click a wire</strong> to inject a fault (SA0 or SA1).
                        <br />
                        2. <strong>Toggle Inputs</strong> to try and "propagate" the error to the output Y.
                    </p>
                </div>
                <FaultSimulator />
            </div>

            {/* --- Theory: Definitions --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Search className="w-8 h-8 text-indigo-600" />
                    2. The Fault Models
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-2xl border border-blue-200 shadow-sm border-t-8 border-t-blue-500">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Stuck-at-0 (SA0)</h3>
                        <p className="text-gray-600 mb-4">
                            The node behaves as if it's tied to <strong>Ground (GND)</strong>.
                        </p>
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm">
                            <strong>Detection Strategy:</strong>
                            <br />
                            Try to drive the node to <strong>1</strong> (Logic High).
                            <br />
                            If the output shows '0' instead of '1', the fault is detected.
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-rose-200 shadow-sm border-t-8 border-t-rose-500">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Stuck-at-1 (SA1)</h3>
                        <p className="text-gray-600 mb-4">
                            The node behaves as if it's tied to <strong>Power (VDD)</strong>.
                        </p>
                        <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 text-sm">
                            <strong>Detection Strategy:</strong>
                            <br />
                            Try to drive the node to <strong>0</strong> (Logic Low).
                            <br />
                            If the output shows '1' instead of '0', the fault is detected.
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Theory: Sensitization --- */}
            <div className="space-y-12 mb-16">
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <Activity className="w-6 h-6 text-emerald-600" />
                        3. The 3 Steps to Fault Detection
                    </h3>
                    <p className="text-gray-700 mb-6">
                        To generate a test vector (ATPG - Automatic Test Pattern Generation), we follow these steps:
                    </p>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                            <div>
                                <h4 className="font-bold text-gray-900">Excitation (Sensitization)</h4>
                                <p className="text-sm text-gray-600">
                                    Force the faulty node to the <strong>opposite value</strong> of the fault.
                                    (e.g., If checking SA0, force inputs such that the good machine would produce a 1).
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                            <div>
                                <h4 className="font-bold text-gray-900">Propagation</h4>
                                <p className="text-sm text-gray-600">
                                    Set other inputs (side inputs) to values that allow the fault effect to pass through gates.
                                    <br />
                                    <i>Example:</i> To pass a value differently through an AND gate, the other input must be '1'. (If it's '0', the output is stuck at 0 regardless of our test).
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                            <div>
                                <h4 className="font-bold text-gray-900">Observation</h4>
                                <p className="text-sm text-gray-600">
                                    Ensure the path reaches a Primary Output or a Scan Flip-Flop.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <SubtopicNav prev={navPrev} next={navNext} />
            </div>
        </div>
    );
}
