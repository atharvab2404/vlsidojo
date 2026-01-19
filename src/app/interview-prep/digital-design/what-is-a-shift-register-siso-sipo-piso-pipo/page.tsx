"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowDown, Cpu, Network, Upload, Layers } from "lucide-react";
import ShiftRegisterVisualizer from "./ShiftRegisterVisualizer";

export default function Page() {
    const currentSlug = "what-is-a-shift-register-siso-sipo-piso-pipo";
    const index = flatDigitalDesignTopics.findIndex((t) => t.slug === currentSlug);

    // Explicitly handle previous/next topic logic to strictly return { title, href } or null
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
                Shift Registers
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                A <strong>Shift Register</strong> is a cascade of Flip-Flops sharing the same clock, used to store or move data. It is the fundamental building block for data transmission, encryption, and signal processing.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Cpu className="w-8 h-8 text-indigo-600" />
                    1. Interactive Universal Shift Register
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700">
                        Explore the four modes of operation. Notice how data moves differently in each mode.
                        <br />
                        <strong>SISO/SIPO:</strong> Push "Trigger Clock" to shift the Serial Input into the chain.
                        <br />
                        <strong>PISO/PIPO:</strong> Use "Load Parallel Data" to set the state instantly (in this model), then Clock to shift (PISO) or hold (PIPO).
                    </p>
                </div>

                <ShiftRegisterVisualizer />
            </div>

            {/* --- Circuit Diagram --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Layers className="w-8 h-8 text-indigo-600" />
                    2. Circuit Diagram (4-Bit SISO)
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center">
                    <p className="text-gray-600 mb-6 text-center">
                        The simplest Shift Register (SISO) is just a chain of D Flip-Flops.
                        <br />
                        Notice how the output of one stage (Q) feeds the input (D) of the next.
                    </p>
                    <div className="bg-white p-4 rounded-lg shadow-sm w-full border border-gray-100 overflow-x-auto">
                        <img
                            src="/images/circuits/shift-register-4bit.svg"
                            alt="4-Bit Shift Register Schematic"
                            className="h-48 min-w-[600px] mx-auto"
                        />
                    </div>
                </div>
            </div>

            {/* --- Theory Section --- */}
            <div className="space-y-12 mb-16">

                {/* Introduction Table */}
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">The 4 Classifications</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* SISO */}
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <h4 className="flex items-center gap-2 text-lg font-bold text-indigo-900 mb-2">
                                <ArrowRight className="w-5 h-5" />
                                SISO (Serial-In Serial-Out)
                            </h4>
                            <p className="text-slate-700 text-sm mb-4">
                                Data enters bit-by-bit and leaves bit-by-bit.
                            </p>
                            <ul className="text-sm list-disc pl-5 text-slate-600 space-y-1">
                                <li><strong>Latency:</strong> N clock cycles to fill. N cycles to empty.</li>
                                <li><strong>Use Case:</strong> Temporal Delay Lines, SISO buffers.</li>
                            </ul>
                        </div>

                        {/* SIPO */}
                        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
                            <h4 className="flex items-center gap-2 text-lg font-bold text-emerald-900 mb-2">
                                <Network className="w-5 h-5" />
                                SIPO (Serial-In Parallel-Out)
                            </h4>
                            <p className="text-emerald-800 text-sm mb-4">
                                Data enters bit-by-bit but is read all at once.
                            </p>
                            <ul className="text-sm list-disc pl-5 text-emerald-700 space-y-1">
                                <li><strong>Latency:</strong> N clock cycles to load valid word.</li>
                                <li><strong>Use Case:</strong> Deserialization (e.g., UART receiver, SPI MOSI to Byte).</li>
                            </ul>
                        </div>

                        {/* PISO */}
                        <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                            <h4 className="flex items-center gap-2 text-lg font-bold text-amber-900 mb-2">
                                <Upload className="w-5 h-5" />
                                PISO (Parallel-In Serial-Out)
                            </h4>
                            <p className="text-amber-800 text-sm mb-4">
                                Data is loaded instantly (parallel) and shifted out bit-by-bit.
                            </p>
                            <ul className="text-sm list-disc pl-5 text-amber-700 space-y-1">
                                <li><strong>Latency:</strong> 1 cycle to load, N to empty.</li>
                                <li><strong>Use Case:</strong> Serialization (e.g., UART transmitter, SPI MISO).</li>
                            </ul>
                        </div>

                        {/* PIPO */}
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-2">
                                <ArrowDown className="w-5 h-5" />
                                PIPO (Parallel-In Parallel-Out)
                            </h4>
                            <p className="text-slate-700 text-sm mb-4">
                                Data is loaded instantly and read instantly.
                            </p>
                            <ul className="text-sm list-disc pl-5 text-slate-600 space-y-1">
                                <li><strong>Latency:</strong> 1 cycle.</li>
                                <li><strong>Use Case:</strong> Just a standard "Register" or Buffer. Not really "shifting" effectively, but structurally similar.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Real World Applications */}
                <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100">
                    <h3 className="text-2xl font-bold text-indigo-900 mb-4">Real World Usage</h3>
                    <p className="text-indigo-800 leading-relaxed mb-6">
                        Shift registers aren't just for moving bits. They power complex logic:
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/80 p-4 rounded-lg">
                            <h5 className="font-bold text-indigo-900">Communication Protocols</h5>
                            <p className="text-sm text-indigo-700">UART, SPI, I2C all use Shift Registers to convert internal parallel data (bytes) to wire-level serial data.</p>
                        </div>
                        <div className="bg-white/80 p-4 rounded-lg">
                            <h5 className="font-bold text-indigo-900">Linear Feedback Shift Registers (LFSR)</h5>
                            <p className="text-sm text-indigo-700">By XORing specific taps and feeding them back to the input, you create pseudo-random number generators (used in cryptography and testing).</p>
                        </div>
                    </div>
                </div>

                {/* Interview Stumper */}
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm border-l-4 border-l-amber-500">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Interview Stumper</h3>
                    <p className="text-gray-700 font-medium mb-4">
                        "For a 4-bit SIPO register, how many clock pulses are needed to have a valid output?"
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 font-mono">
                        Answer: 4 Clock Pulses.
                        <br />
                        T1: D0 loaded.
                        <br />
                        T2: D0→Q1, D1 loaded.
                        <br />
                        T3: D0→Q2...
                        <br />
                        T4: D0→Q3. All 4 bits are now in place.
                    </div>
                </div>

            </div>

            <SubtopicNav prev={navPrev} next={navNext} />
        </div>
    );
}
