"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Cpu, Link as LinkIcon, Box, Layers } from "lucide-react";
import ScanChainVisualizer from "./ScanChainVisualizer";

export default function Page() {
    const currentSlug = "dft-techniques-scan-chains-boundary-scan-and-bist";
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
                DFT Techniques: Scan, JTAG & BIST
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                How do we actually implement DFT? We don't just add random test points.
                We use three industry-standard architectures: <strong>Internal Scan</strong> (for logic), <strong>JTAG</strong> (for pins/board), and <strong>BIST</strong> (for memory/self-test).
            </p>

            {/* --- Visualizer: Scan Chains --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <LinkIcon className="w-8 h-8 text-amber-600" />
                    1. Internal Scan Chains
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        The most common DFT technique. We replace every standard D-Flip-Flop with a <strong>Scan Flip-Flop</strong> (Mux + FF).
                        <br />
                        When the <strong>Scan Enable (SE)</strong> signal is high, all FFs connect to form a giant path.
                    </p>
                </div>
                <ScanChainVisualizer />
            </div>

            {/* --- Theory: The Big 3 --- */}
            <div className="space-y-16 mb-16">

                {/* JTAG */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <Box className="w-8 h-8 text-indigo-600" />
                        2. Boundary Scan (JTAG / IEEE 1149.1)
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-2xl border border-indigo-100 shadow-sm">
                            <h3 className="text-xl font-bold text-indigo-900 mb-4">Purpose</h3>
                            <p className="text-gray-700 mb-4">
                                Originally designed to test the <strong>Boundary</strong> of the chip (the pins) to ensure it was soldered correctly to the PCB (Board).
                                Today, it's also the "Gateway" to access Internal Scan Chains and Debuggers.
                            </p>
                            <div className="p-4 bg-indigo-50 rounded border border-indigo-200 text-sm italic text-indigo-800">
                                "Did the pin break? Is the wire on the PCB cut?" &rarr; JTAG answers this.
                            </div>
                        </div>
                        <div className="bg-slate-900 p-8 rounded-2xl text-slate-300">
                            <h3 className="text-xl font-bold text-white mb-4">The TAP Controller Pins</h3>
                            <ul className="space-y-3 font-mono text-sm">
                                <li className="flex items-center gap-2"><span className="text-amber-400 font-bold">TCK</span> Test Clock</li>
                                <li className="flex items-center gap-2"><span className="text-amber-400 font-bold">TMS</span> Test Mode Select (FSM Control)</li>
                                <li className="flex items-center gap-2"><span className="text-amber-400 font-bold">TDI</span> Test Data In (Serial Input)</li>
                                <li className="flex items-center gap-2"><span className="text-amber-400 font-bold">TDO</span> Test Data Out (Serial Output)</li>
                                <li className="flex items-center gap-2 text-slate-500"><span className="text-slate-600 font-bold">TRST</span> Test Reset (Optional)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* BIST */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <Cpu className="w-8 h-8 text-emerald-600" />
                        3. Built-In Self-Test (BIST)
                    </h2>
                    <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-200 shadow-sm">
                        <p className="text-emerald-900 text-lg mb-6 max-w-3xl">
                            Sometimes, moving data in and out via JTAG/Scan is too slow (especially for Gigabit Memories).
                            So, we put the <strong>Tester INSIDE the chip</strong>.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-xl border border-emerald-100">
                                <h4 className="font-bold text-emerald-800 mb-2">LBIST (Logic BIST)</h4>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    <li>Uses an <strong>LFSR</strong> (Linear Feedback Shift Register) to generate pseudo-random patterns automatically.</li>
                                    <li>Uses a <strong>MISR</strong> to compress the results into a "Signature".</li>
                                    <li>The chip checks its own Signature against the expected one.</li>
                                </ul>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-emerald-100">
                                <h4 className="font-bold text-emerald-800 mb-2">MBIST (Memory BIST)</h4>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    <li><strong>Critical</strong> for SRAMs/Caches.</li>
                                    <li>Runs algorithms like "March C-" to check for stuck bits and coupling faults in RAM cells.</li>
                                    <li>Runs at full speed (at-speed testing).</li>
                                </ul>
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
