"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Activity, ShieldCheck, HelpCircle, Calculator } from "lucide-react";
import MetastabilityVisualizer from "./MetastabilityVisualizer";

export default function Page() {
    const currentSlug = "what-is-metastability-and-how-to-prevent-it-with-synchronizers";
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
                Metastability
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                The phenomenon where a digital system enters an indeterminate state (neither 0 nor 1) due to timing violations.
                If not handled, this can propagate through the system and cause catastrophic failure.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Activity className="w-8 h-8 text-rose-600" />
                    1. The Concept
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        Metastability is statistically probabilistic. It behaves like a ball balanced on a hill.
                        Eventually, thermal noise will push it to '0' or '1', but the time it takes to settle is unknown.
                    </p>
                </div>
                <MetastabilityVisualizer />
            </div>

            {/* --- Theory: The Math --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Calculator className="w-8 h-8 text-indigo-600" />
                    2. The Physics of Failure
                </h2>
                <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-200">
                    <p className="text-indigo-900 mb-6 leading-relaxed">
                        The probability of failure is defined by the <strong>Mean Time Between Failures (MTBF)</strong>.
                        We want this number to be in <i>billions of years</i>.
                    </p>

                    <div className="bg-white p-6 rounded-xl border border-indigo-200 text-center mb-6">
                        <div className="text-2xl font-mono font-bold text-indigo-800 mb-2">
                            <i>MTBF</i> = <span className="inline-block fraction"><span className="border-b border-indigo-800 block"><i>e</i><sup><i>t<sub>settle</sub></i> / &tau;</sup></span><span className="block"><i>T<sub>window</sub></i> &middot; <i>f<sub>clk</sub></i> &middot; <i>f<sub>data</sub></i></span></span>
                        </div>
                    </div>

                    <ul className="space-y-3 text-indigo-800 text-sm">
                        <li><strong>&tau; (Tau):</strong> The resolving time constant of the Flip-Flop. Depends on the transistor technology (smaller is better).</li>
                        <li><strong><i>t<sub>settle</sub></i>:</strong> The time we wait before sampling. In a synchronizer, this is one full clock cycle.</li>
                        <li><strong><i>f<sub>clk</sub></i> & <i>f<sub>data</sub></i>:</strong> Higher frequencies increase the collision probability (Linear impact).</li>
                        <li><strong>Exponential Term:</strong> The waiting time (<i>t<sub>settle</sub></i>) has an <strong>exponential</strong> effect on safety. Waiting just a little longer makes the system drastically safer.</li>
                    </ul>
                </div>
            </div>

            {/* --- Theory: The Solution --- */}
            <div className="space-y-12 mb-16">

                {/* The Solution */}
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <ShieldCheck className="w-6 h-6 text-emerald-600" /> The 2-Flip-Flop Synchronizer
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        The industrial standard for safely crossing single-bit signals between asynchronous clock domains.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-gray-900 mb-2">Mechanism</h4>
                            <ol className="list-decimal pl-5 text-gray-700 space-y-2">
                                <li><strong>FF 1</strong> samples the asynchronous input. It may go metastable.</li>
                                <li>The output of FF 1 is given one full clock cycle (<i>t<sub>clk</sub></i>) to settle.</li>
                                <li>Because of the exponential MTBF equation, the probability of it remaining metastable after <i>t<sub>clk</sub></i> is near zero.</li>
                                <li><strong>FF 2</strong> samples the stable output of FF 1.</li>
                            </ol>
                        </div>
                        <div className="bg-slate-100 p-5 rounded-xl border border-slate-200">
                            <h4 className="font-bold text-gray-900 mb-2">Trade-off</h4>
                            <p className="text-sm text-gray-600">
                                We gain Safety, but we pay in <strong>Latency</strong>.
                                <br />
                                The signal takes 2 full clock cycles to cross the boundary.
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
