"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Scissors, Shrink, Layers } from "lucide-react";
import StateMinimizationVisualizer from "./StateMinimizationVisualizer";

export default function Page() {
    const currentSlug = "state-minimization-the-partitioning-method-explained";
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
                State Minimization: <br />

            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                FSM design often yields redundant states. Removing them reduces the number of Flip-Flops and logic gates needed.
                The <strong>Partitioning Method</strong> (or Equivalence Class partitioning) is the most systematic way to do this.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Scissors className="w-8 h-8 text-indigo-600" />
                    1. Step-by-Step Minimization
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        Two states are equivalent if:
                        <br />
                        1. They have the <strong>same Output</strong>.
                        <br />
                        2. For every input, they transition to <strong>equivalent Next States</strong>.
                    </p>
                </div>
                <StateMinimizationVisualizer />
            </div>

            {/* --- Theory --- */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">

                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                    <h3 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
                        <Shrink className="w-6 h-6" />
                        Why Minimize?
                    </h3>
                    <ul className="space-y-4 text-indigo-800">
                        <li className="flex gap-3 items-start">
                            <span className="bg-white text-indigo-600 font-bold rounded px-2 py-0.5 shadow-sm border border-indigo-200">1</span>
                            <span><strong>Reduce Hardware:</strong> Fewer states often means fewer bits. 6 states require 3 Flip-Flops. 4 states require only 2 Flip-Flops!</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="bg-white text-indigo-600 font-bold rounded px-2 py-0.5 shadow-sm border border-indigo-200">2</span>
                            <span><strong>Simplify Logic:</strong> Even if FF count stays the same (e.g. 7 &rarr; 5 states), the combinational logic for Next State/Output becomes simpler with more "Don't Cares".</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Layers className="w-6 h-6 text-gray-600" />
                        The Algorithm
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                        Recursive refinement until no groups change.
                    </p>
                    <ol className="list-decimal pl-5 space-y-3 text-gray-700 text-sm">
                        <li><strong>Step P0:</strong> Partition states into groups based solely on Outputs (e.g. {`{Z=0}, {Z=1}`}).</li>
                        <li><strong>Step P(k+1):</strong> Check if states in a group transition to the <i>same groups</i>. If not, split them.</li>
                        <li><strong>Repeat:</strong> Continue until P(k+1) is identical to P(k).</li>
                    </ol>
                </div>
            </div>

            <div className="mt-12">
                <SubtopicNav prev={navPrev} next={navNext} />
            </div>
        </div>
    );
}
