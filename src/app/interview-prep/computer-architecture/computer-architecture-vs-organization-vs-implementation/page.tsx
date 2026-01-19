"use client";

import { flatComputerArchitectureTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Layers, Cpu, Hammer, Search, BookOpen, AlertTriangle } from "lucide-react";
import LayerVisualizer from "./LayerVisualizer";

export default function Page() {
    const currentSlug = "computer-architecture-vs-organization-vs-implementation";
    const index = flatComputerArchitectureTopics.findIndex((t) => t.slug === currentSlug);
    const prev = index > 0 ? flatComputerArchitectureTopics[index - 1] : null;
    const next =
        index < flatComputerArchitectureTopics.length - 1
            ? flatComputerArchitectureTopics[index + 1]
            : null;

    const navPrev = prev ? { title: prev.title, href: `/interview-prep/computer-architecture/${prev.slug}` } : null;
    const navNext = next ? { title: next.title, href: `/interview-prep/computer-architecture/${next.slug}` } : null;

    return (
        <div className="max-w-5xl mx-auto text-gray-800">
            <div className="mb-8">
                <Link
                    href="/interview-prep/computer-architecture"
                    className="inline-flex items-center text-amber-600 hover:text-amber-800 transition-colors mb-4 font-medium"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Curriculum
                </Link>
            </div>

            <h1 className="text-5xl font-extrabold text-gray-900 mb-8 tracking-tight leading-tight">
                Architecture vs. Organization vs. Implementation
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                "Computer Architecture" is often used loosely to describe the whole field, but strictly speaking, it refers to the <strong>Interface</strong> (ISA).
                To design high-performance systems, you must understand the clear separation between the Contract (ISA), the Strategy (Organization), and the Physics (Implementation).
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Layers className="w-8 h-8 text-amber-600" />
                    1. The Abstraction Stack
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-8">
                    <p className="text-gray-700 leading-relaxed">
                        Computers are built in layers to manage complexity. A change in the "Implementation" layer (e.g., using a new transistor type) should generally NOT break the "Architecture" layer (the software).
                        <br />
                        Explore the stack below to see the responsibilities of each layer.
                    </p>
                </div>
                <LayerVisualizer />
            </div>

            {/* --- Theory: The Definitions --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Search className="w-8 h-8 text-amber-600" />
                    2. Detailed Breakdown
                </h2>

                <div className="space-y-12">

                    {/* Architecture */}
                    <div className="bg-white p-8 rounded-2xl border border-indigo-100 shadow-sm border-l-8 border-l-indigo-500">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600 mt-1">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Architecture (The ISA)</h3>
                                <p className="text-lg text-gray-700 font-medium">The Programmer's Contract.</p>
                            </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-6">
                            The <strong>Instruction Set Architecture (ISA)</strong> defines everything a machine language programmer (or a compiler) needs to know to correctly write a program.
                            It is an abstraction that hides the hardware details.
                            <br /><br />
                            It includes:
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <ul className="space-y-3 text-sm text-gray-700">
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                                    <strong>Instruction Types:</strong> Load/Store, ALU (Add/Sub), Control (Branch/Jump).
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                                    <strong>Data Types:</strong> Integers (8, 16, 32, 64-bit), Floating Point (IEEE 754).
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                                    <strong>Registers:</strong> Visible state (e.g., 32 GPRs in RISC-V, RAX/RBX in x86).
                                </li>
                            </ul>
                            <ul className="space-y-3 text-sm text-gray-700">
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                                    <strong>Addressing Modes:</strong> How to calculate memory addresses (Register Indirect, PC-Relative).
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                                    <strong>Memory Consistency Model:</strong> Rules for ordering loads/stores in multi-thread envs (TSO vs Weak).
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                                    <strong>Exception Handling:</strong> What happens on Interrupts/Traps?
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Organization */}
                    <div className="bg-white p-8 rounded-2xl border border-amber-100 shadow-sm border-l-8 border-l-amber-500">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-amber-50 rounded-lg text-amber-600 mt-1">
                                <Cpu className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Organization (Microarchitecture)</h3>
                                <p className="text-lg text-gray-700 font-medium">The Designer's Strategy.</p>
                            </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-6">
                            Also called <strong>μArch (Microarchitecture)</strong>. This connects the ISA to the hardware.
                            If five different teams implement the x86 ISA, they will produce five different Microarchitectures.
                            <br /><br />
                            Key design decisions include:
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <ul className="space-y-3 text-sm text-gray-700">
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                                    <strong>Pipelining:</strong> How many stages? (5-stage vs 20-stage deep pipeline).
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                                    <strong>Instruction Scheduling:</strong> In-Order vs Out-of-Order execution.
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                                    <strong>Branch Prediction:</strong> Static vs Dynamic (Tournament, TAGE).
                                </li>
                            </ul>
                            <ul className="space-y-3 text-sm text-gray-700">
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                                    <strong>Cache Hierarchy:</strong> Sizes, Associativity, Inclusion policies (L1/L2/L3).
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                                    <strong>Superscalar Width:</strong> How many instructions to issue per cycle? (2-wide, 8-wide).
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                                    <strong>Interconnects:</strong> Ring vs Mesh bus topologies.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Implementation */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm border-l-8 border-l-slate-600">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-slate-100 rounded-lg text-slate-600 mt-1">
                                <Hammer className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Implementation</h3>
                                <p className="text-lg text-gray-700 font-medium">The Physical Realization.</p>
                            </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-6">
                            This is the domain of <strong>Physical Design (PD)</strong> and Process Engineers.
                            Even with the exact same Microarchitecture RTL, you can have different implementations (e.g., one optimized for Low Power, one for High Performance).
                            <br /><br />
                            It includes:
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <ul className="space-y-3 text-sm text-gray-700">
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                                    <strong>Process Technology:</strong> 7nm, 5nm, 3nm GAA (Gate-All-Around).
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                                    <strong>Circuit Design:</strong> SRAM cell design (6T vs 8T), Standard Cell Libraries.
                                </li>
                            </ul>
                            <ul className="space-y-3 text-sm text-gray-700">
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                                    <strong>Packaging:</strong> Wire bonding vs Flip-Chip, 2.5D Interposers, 3D Stacking.
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                                    <strong>Logic Styling:</strong> Static CMOS vs Domino Logic.
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- Case Study --- */}
            <div className="bg-slate-900 text-slate-300 p-8 rounded-2xl mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-emerald-400" />
                    Case Study: The x86 Lineage
                </h2>
                <p className="leading-relaxed mb-6">
                    The <strong>x86 ISA</strong> has remained largely compatible for 40+ years. However, the Machine Organization has changed drastically.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">1978</span>
                        <h4 className="text-lg font-bold text-white mt-1">Intel 8086</h4>
                        <div className="mt-3 text-sm space-y-1 text-slate-400">
                            <p>• No Pipeline</p>
                            <p>• No Cache</p>
                            <p>• Microcoded Control</p>
                        </div>
                    </div>

                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">1995</span>
                        <h4 className="text-lg font-bold text-white mt-1">Pentium Pro</h4>
                        <div className="mt-3 text-sm space-y-1 text-slate-400">
                            <p>• Out-of-Order Execution</p>
                            <p>• Super-pipelined</p>
                            <p>• Integrated L2 Cache</p>
                        </div>
                    </div>

                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">2020s</span>
                        <h4 className="text-lg font-bold text-white mt-1">Golden Cove</h4>
                        <div className="mt-3 text-sm space-y-1 text-slate-400">
                            <p>• 6-wide Decode</p>
                            <p>• Massive Reorder Buffer</p>
                            <p>• 10nm Enhanced SuperFin</p>
                        </div>
                    </div>
                </div>
                <p className="mt-6 text-sm text-slate-400 italic text-center bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                    <strong>Insight:</strong> The 8086 code can still run on the Golden Cove core, despite the billions of transistors difference in Implementation/Organization.
                </p>
            </div>


            {/* --- Warning --- */}
            <div className="bg-amber-50 p-6 rounded-2xl border-l-4 border-amber-500 mb-12">
                <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-amber-600 mt-1" />
                    <div>
                        <h4 className="text-lg font-bold text-amber-900 mb-2">Why does this distinction matter for Interviews?</h4>
                        <p className="text-amber-800 leading-relaxed text-sm">
                            Interviewers will check if you know which layer you are solving a problem in.
                            <br />
                            <br />
                            • If asked to "Speed up a matrix multiplication", are you changing the <strong>Algorithm</strong> (Software), adding <strong>SIMD Instructions</strong> (ISA), increasing <strong>Cache Size</strong> (Microarch), or increasing <strong>Frequency</strong> (Implementation)?
                            <br />
                            • <strong>Always clarify the constraint.</strong>
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <SubtopicNav prev={navPrev} next={navNext} />
            </div>
        </div>
    );
}
