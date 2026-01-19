"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Search, GitGraph, Repeat, Network } from "lucide-react";
import SequenceDetectorVisualizer from "./SequenceDetectorVisualizer";

export default function Page() {
    const currentSlug = "fsm-design-problem-how-to-design-a-sequence-detector-e-g-1011";
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
                Sequence Detector Design ("1011" Example)
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                The most classic Digital Design Interview question is: <strong>"Design an FSM to detect the pattern 1011."</strong> This tests your ability to translate a temporal pattern into a spatial state machine.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Search className="w-8 h-8 text-indigo-600" />
                    1. Interactive Detector
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700">
                        This FSM tracks the history of bits.
                        <br />
                        <strong>Goal:</strong> Detect <strong>1-0-1-1</strong>.
                        <br />
                        Watch how the State Bubbles light up as the sequence matches.
                    </p>
                </div>
                <SequenceDetectorVisualizer />
            </div>

            {/* --- Theory: Overlapping vs Non-Overlapping --- */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-16">
                <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Repeat className="w-6 h-6" />
                    Crucial Concept: Overlapping vs Non-Overlapping
                </h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                    Does the end of one pattern count as the start of the next?
                    <br /><br />
                    <strong>Input Stream:</strong> <span className="font-mono bg-white px-1 border rounded">1 0 1 1 0 1 1</span>
                    <br />
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                        <h4 className="font-bold text-indigo-900 mb-2">Overlapping (Our Example)</h4>
                        <p className="text-sm text-gray-600">
                            Detects: <strong>Twice</strong>.
                            <br />
                            The final '1' of the first '1011' is reused as the first '1' of the second '1011'.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 opacity-60">
                        <h4 className="font-bold text-gray-900 mb-2">Non-Overlapping</h4>
                        <p className="text-sm text-gray-600">
                            Detects: <strong>Once</strong>.
                            <br />
                            After detection, the machine resets explicitly to State 0. It ignores the reused bit.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- Design Walkthrough --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Network className="w-8 h-8 text-gray-700" />
                    2. Designing the State Diagram
                </h2>
                <div className="space-y-4">
                    <p className="text-gray-700">We need a state for every partial match.</p>

                    <ul className="grid gap-4 md:grid-cols-2">
                        <li className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                            <span className="font-bold text-indigo-600 block mb-1">State S0 (Init)</span>
                            Waiting for first '1'.
                            <br /><span className="text-xs text-gray-400">If 0, stay S0. If 1, go S1.</span>
                        </li>
                        <li className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                            <span className="font-bold text-indigo-600 block mb-1">State S1 (Got 1)</span>
                            Have '1'. Waiting for '0'.
                            <br /><span className="text-xs text-gray-400">If 1, stay S1 (still have a '1'). If 0, go S2.</span>
                        </li>
                        <li className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                            <span className="font-bold text-indigo-600 block mb-1">State S2 (Got 10)</span>
                            Have '10'. Waiting for '1'.
                            <br /><span className="text-xs text-gray-400">If 0, Reset S0 (Chain broken). If 1, go S3.</span>
                        </li>
                        <li className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                            <span className="font-bold text-indigo-600 block mb-1">State S3 (Got 101)</span>
                            Have '101'. Waiting for '1'.
                            <br /><span className="text-xs text-gray-400">If 0, Go S2 (have '10' again). If 1, Output=1 and Go S1 (Overlap!).</span>
                        </li>
                    </ul>
                </div>
            </div>

            <SubtopicNav prev={navPrev} next={navNext} />
        </div>
    );
}
