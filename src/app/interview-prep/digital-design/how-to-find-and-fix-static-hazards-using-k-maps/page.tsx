"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Grid, ShieldCheck, Scale } from "lucide-react";
import HazardHunter from "./HazardHunter";

export default function Page() {
    const currentSlug = "how-to-find-and-fix-static-hazards-using-k-maps";
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
                Fixing Hazards with K-Maps
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Hazards are caused by delays, but they can be spotted instantly using a Karnaugh Map.
                Any two adjacent 1s that are NOT covered by a common group represent a potential glitch.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Grid className="w-8 h-8 text-indigo-600" />
                    1. Hazard Hunter
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        In the K-Map below, we have two groups (Blue and Purple).
                        Transitioning between them (from cell 011 to 111) requires jumping a "gap" where no term is holding the output high.
                        <br /><br />
                        <strong>Click "Enable Fix"</strong> to add a bridging group (Green). This redundant logic covers the transition!
                    </p>
                </div>
                <HazardHunter />
            </div>

            {/* --- Theory --- */}
            <div className="space-y-12 mb-16">

                <div className="grid md:grid-cols-2 gap-8">

                    <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-200">
                        <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                            <ShieldCheck className="w-6 h-6" /> The Golden Rule
                        </h3>
                        <p className="text-emerald-800 leading-relaxed mb-6">
                            "If any two adjacent 1s are grouped by DIFFERENT Prime Implicants, and no third group covers BOTH of them, a Static 1-Hazard exists."
                        </p>
                        <ul className="list-disc pl-5 text-emerald-800 space-y-2 text-sm">
                            <li><strong>Adjacent 1s:</strong> A single bit change (input transition).</li>
                            <li><strong>Different Groups:</strong> One gate turns OFF, another turns ON.</li>
                            <li><strong>No Third Group:</strong> No safety net.</li>
                        </ul>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm border-t-8 border-t-indigo-500">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Scale className="w-6 h-6" /> The Trade-off
                        </h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            To fix the glitch, we deliberately make the circuit <strong>less minimal</strong>.
                        </p>
                        <p className="text-sm text-gray-600">
                            We optimize for <strong>Signal Integrity</strong>, sacrificing <strong>Area</strong> (we pay for an extra AND gate).
                            In Control Logic (FSMs), glitches can be fatal (triggering wrong states), so this redundancy is mandatory.
                        </p>
                    </div>

                </div>

                {/* Mathematical Proof */}
                <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-slate-300">
                    <h3 className="text-2xl font-bold text-white mb-6">Boolean Algebra Proof</h3>
                    <p className="mb-4">
                        Why does adding a term fix logic errors? It comes from the <strong>Consensus Theorem</strong>.
                    </p>
                    <div className="font-mono bg-slate-800 p-4 rounded-lg border border-slate-700 mb-4 text-center text-lg text-emerald-400">
                        AB + A'C + BC = AB + A'C
                    </div>
                    <p className="text-sm text-slate-400 mb-6">
                        Algebraically, the term <strong>BC</strong> is redundant (it disappears).
                        But physically, when A transitions ($1 \to 0$ or $0 \to 1$), there is a moment where both $AB$ and $A'C$ are False due to delay.
                        <br /><br />
                        BC is independent of A! If B=1 and C=1, BC holds the output HIGH regardless of what A is doing.
                    </p>
                </div>

            </div>

            <div className="mt-12">
                <SubtopicNav prev={navPrev} next={navNext} />
            </div>
        </div>
    );
}
