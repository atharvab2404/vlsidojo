"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Zap, Layers, AlertOctagon } from "lucide-react";
import BusArchitectureExplorer from "./BusArchitectureExplorer";

export default function Page() {
    const currentSlug = "bus-implementation-tri-state-buffers-vs-multiplexers";
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
                Bus Implementation <br />

            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                In the 80s, we used Tri-State buses everywhere. Today, they are banned inside the chip (ASIC). Why?
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Zap className="w-8 h-8 text-indigo-600" />
                    1. The Contention Problem
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        Tri-state logic relies on the high-impedance (Z) state. If two drivers try to drive the bus at the same time (one High, one Low), you get a <strong>short circuit</strong>.
                    </p>
                </div>
                <BusArchitectureExplorer />
            </div>

            {/* --- Theory: Comparison --- */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <div className="bg-rose-100 p-1 rounded"><AlertOctagon className="w-4 h-4 text-rose-600" /></div> Tri-State Logic (The 'Z' State)
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        Drivers can disconnect themselves from the bus (High-Z).
                    </p>
                    <ul className="text-sm space-y-2 text-rose-700 ml-4 list-disc">
                        <li><strong>Risk:</strong> Bus Contention (High Current).</li>
                        <li><strong>Risk:</strong> Floating nets (intermediate voltages causing leakage).</li>
                        <li><strong>Testing:</strong> Hard to test with scan chains (DFT).</li>
                        <li><strong>Verdict:</strong> <strong>BANNED</strong> for internal logic. Only used for IO Pads (getting off the chip).</li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <div className="bg-emerald-100 p-1 rounded"><Layers className="w-4 h-4 text-emerald-600" /></div> Multiplexer Logic
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        A central selector chooses which driver gets through.
                    </p>
                    <ul className="text-sm space-y-2 text-emerald-800 ml-4 list-disc">
                        <li><strong>Safety:</strong> No contention possible. One driver is always selected.</li>
                        <li><strong>DFT:</strong> Easy to test automatically.</li>
                        <li><strong>Usage:</strong> All modern on-chip buses (AMBA AXI, AHB, Avalon) are Mux-based.</li>
                        <li><strong>Verdict:</strong> The standard for internal design.</li>
                    </ul>
                </div>

            </div>

            {/* --- Definition --- */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 mb-12 text-slate-300 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-4">What is `Z`?</h2>
                <p className="text-lg mb-4">
                    <strong>Z = High Impedance.</strong> It means "Disconnected". It's like cutting the wire.
                </p>
                <div className="font-mono text-sm bg-black/50 p-4 rounded text-emerald-400">
                    assign data_bus = (enable) ? data_out : 1'bz;
                </div>
                <p className="text-xs text-slate-500 mt-2">
                    Use this coding style ONLY when inferring an IO Pad at the top level of your chip. Never continuously assign 'Z' deep in your hierarchy.
                </p>
            </div>

            <div className="mt-12">
                <SubtopicNav prev={navPrev} next={navNext} />
            </div>
        </div>
    );
}
