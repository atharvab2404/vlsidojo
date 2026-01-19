"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Box, Check, Cpu } from "lucide-react";
import ChipFab from "./ChipFab";

export default function Page() {
    const currentSlug = "the-vlsi-design-flow-explained-rtl-to-gdsii";
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
                The VLSI Design Flow
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                How do we go from a text file (Verilog) to a physical silicon chip (GDSII)?
                This journey is known as the <strong>ASIC Flow</strong> (Application Specific Integrated Circuit).
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Box className="w-8 h-8 text-indigo-600" />
                    1. ChipFab Flowchart
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        The flow is divided into two major worlds: <strong>Front-End</strong> (Logic Design) and <strong>Back-End</strong> (Physical Design).
                        <br />
                        Hover over each stage below to explore the Inputs, Outputs, and purpose of every step.
                    </p>
                </div>
                <ChipFab />
            </div>

            {/* --- Theory: The Terms --- */}
            <div className="space-y-12 mb-16">

                <div className="grid md:grid-cols-2 gap-8">

                    <div className="bg-white p-6 rounded-2xl border border-gray-200">
                        <h3 className="text-xl font-bold text-indigo-900 mb-3 flex items-center gap-2">
                            <Cpu className="w-5 h-5" /> Front-End Design
                        </h3>
                        <p className="text-gray-600 mb-4">
                            The domain of Logic Designers and Verification Engineers.
                        </p>
                        <ul className="space-y-3 text-sm text-gray-700">
                            <li className="flex gap-2">
                                <span className="font-bold w-24">Micro-Arch:</span>
                                <span>Determining pipelines, bus widths, and block diagrams.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold w-24">RTL:</span>
                                <span>Writing Verilog/SystemVerilog code.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold w-24">Verification:</span>
                                <span>Writing UVM testbenches to prove "It works as spec'd".</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold w-24">Synthesis:</span>
                                <span>Translating RTL into technology-specific logic gates (NAND, NOR, D-FF). Result: The Netlist.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200">
                        <h3 className="text-xl font-bold text-rose-900 mb-3 flex items-center gap-2">
                            <Check className="w-5 h-5" /> Back-End Design
                        </h3>
                        <p className="text-gray-600 mb-4">
                            The domain of Physical Design (PD) Engineers.
                        </p>
                        <ul className="space-y-3 text-sm text-gray-700">
                            <li className="flex gap-2">
                                <span className="font-bold w-24">Floorplan:</span>
                                <span>Placing macros (RAMs) and defining core area/power ring.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold w-24">Placement:</span>
                                <span>Automatically placing millions of standard cells.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold w-24">CTS:</span>
                                <span>Clock Tree Synthesis. Building the balanced H-tree to deliver clock to every FF.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold w-24">Routing:</span>
                                <span>Connecting the wires (Metal 1, Metal 2...).</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-slate-300">
                    <h3 className="text-2xl font-bold text-white mb-6">Signoff Checks</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <h4 className="font-bold text-white mb-2">STA</h4>
                            <p className="text-xs text-slate-400">
                                Static Timing Analysis. Checking Setup/Hold for every single path.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-2">DRC</h4>
                            <p className="text-xs text-slate-400">
                                Design Rule Check. Does the geometry match foundry rules? (e.g., metal spacing).
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-2">LVS</h4>
                            <p className="text-xs text-slate-400">
                                Layout vs Schematic. Does the drawn layout match the netlist logic?
                            </p>
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
