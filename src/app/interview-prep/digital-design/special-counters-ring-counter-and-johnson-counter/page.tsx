"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Repeat, Link as LinkIcon, AlertTriangle, Layers } from "lucide-react";
import RingJohnsonVisualizer from "./RingJohnsonVisualizer";

export default function Page() {
    const currentSlug = "special-counters-ring-counter-and-johnson-counter";
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
                Special Counters: Ring & Johnson
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Not all counters count in binary (0, 1, 2, 3...). Some generate specific <strong>patterns</strong> by shifting bits in a loop. These are modified Shift Registers where the output is fed back to the input.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Repeat className="w-8 h-8 text-indigo-600" />
                    1. Interactive Pattern Generator
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700">
                        Watch how the feedback loop changes the pattern:
                        <br />
                        <strong>Ring:</strong> "Hot Potato". A single 1 circulates.
                        <br />
                        <strong>Johnson:</strong> "Twisted". Fills with 1s, then empties with 0s.
                    </p>
                </div>
                <RingJohnsonVisualizer />
            </div>

            {/* --- Circuit Diagrams --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Layers className="w-8 h-8 text-indigo-600" />
                    2. Circuit Diagrams
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center">
                        <h5 className="font-bold text-gray-500 text-sm mb-4">4-Bit Ring Counter</h5>
                        <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 w-full overflow-x-auto">
                            <img
                                src="/images/circuits/ring-counter-4bit.svg"
                                alt="4-Bit Ring Counter Schematic"
                                className="w-full h-auto min-w-[300px]"
                            />
                        </div>
                        <p className="text-xs text-center text-gray-400 mt-2">Feedback is DIRECT (Q to D)</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center">
                        <h5 className="font-bold text-gray-500 text-sm mb-4">4-Bit Johnson Counter</h5>
                        <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 w-full overflow-x-auto">
                            <img
                                src="/images/circuits/johnson-counter-4bit.svg"
                                alt="4-Bit Johnson Counter Schematic"
                                className="w-full h-auto min-w-[300px]"
                            />
                        </div>
                        <p className="text-xs text-center text-gray-400 mt-2">Feedback is INVERTED (Q' to D)</p>
                    </div>
                </div>
            </div>

            {/* --- Comparison --- */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">

                {/* Ring Counter */}
                <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-200">
                    <h3 className="flex items-center gap-2 text-2xl font-bold text-emerald-900 mb-4">
                        <Repeat className="w-6 h-6" />
                        Ring Counter
                    </h3>
                    <div className="bg-white p-3 rounded border border-emerald-100 font-mono text-center text-emerald-700 mb-4 font-bold">
                        Feedback: D(next) = Q(last)
                    </div>
                    <ul className="space-y-3 text-emerald-900 text-sm list-disc pl-5">
                        <li><strong>States:</strong> N (for N flip-flops).</li>
                        <li><strong>Pattern:</strong> 1000 &#8594; 0100 &#8594; 0010 &#8594; 0001.</li>
                        <li>
                            <strong>Pros:</strong> No decoder needed! Each state is already One-Hot.
                        </li>
                        <li>
                            <strong>Cons:</strong> Inefficient use of Flip-Flops (N states vs $2^N$). Needs initialization (Start with 1).
                        </li>
                    </ul>
                </div>

                {/* Johnson Counter */}
                <div className="bg-pink-50 p-8 rounded-2xl border border-pink-200">
                    <h3 className="flex items-center gap-2 text-2xl font-bold text-pink-900 mb-4">
                        <LinkIcon className="w-6 h-6" />
                        Johnson Counter
                    </h3>
                    <div className="bg-white p-3 rounded border border-pink-100 font-mono text-center text-pink-700 mb-4 font-bold">
                        Feedback: D(next) = Q'(last)
                    </div>
                    <ul className="space-y-3 text-pink-900 text-sm list-disc pl-5">
                        <li><strong>States:</strong> 2N (Double the Ring Counter).</li>
                        <li><strong>Pattern:</strong> 0000 &#8594; 1000 &#8594; 1100 &#8594; 1110...</li>
                        <li>
                            <strong>Pros:</strong> More states per FF. Glitch-free decoding (adjacent states only change by 1 bit - akin to Gray code).
                        </li>
                        <li>
                            <strong>Cons:</strong> Requires decoding logic for use.
                        </li>
                    </ul>
                </div>
            </div>

            {/* --- Unused States --- */}
            <div className="bg-amber-50 p-8 rounded-2xl border border-amber-200 mb-16">
                <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6" />
                    Interview Question: The "Lockout" Problem
                </h2>
                <p className="text-amber-800 leading-relaxed mb-4">
                    <strong>Q: What happens if a 4-bit Ring Counter (N=4) enters the state 1010 due to noise?</strong>
                    <br /><br />
                    <strong>A:</strong> It gets stuck in a loop of unused states!
                    <br />
                    1010 &#8594; 0101 &#8594; 1010...
                    <br />
                    It never returns to the valid One-Hot sequence.
                    <br /><br />
                    <strong>Solution:</strong> We design <strong>Self-Correcting</strong> logic. For example, instead of a simple wire, the feedback logic checks: "If 0000, force insert a 1".
                </p>
            </div>

            <SubtopicNav prev={navPrev} next={navNext} />
        </div>
    );
}
