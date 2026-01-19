"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Battery, Zap, Thermometer, Flame } from "lucide-react";
import PowerMeter from "./PowerMeter";

export default function Page() {
    const currentSlug = "static-vs-dynamic-power-consumption-equation-reduction-techniques";
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
                Power Consumption
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                In modern VLSI (7nm, 5nm, 3nm), Power allows the chip to run.
                Thermal Design Power (TDP) often limits performance more than frequency.
                We divide power into three categories: Dynamic (Switching), Short-Circuit, and Static (Leakage).
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Thermometer className="w-8 h-8 text-rose-600" />
                    1. Power Meter
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        Experiment with the parameters.
                        <br />
                        Notice that <strong>Dynamic Power</strong> scales quadratically with Voltage (<i>V</i><sup>2</sup>), while <strong>Static Power</strong> scales linearly (<i>V</i>).
                        This is why lowering voltage (DVFS) provides massive power savings.
                    </p>
                </div>
                <PowerMeter />
            </div>

            {/* --- Theory: The Equations --- */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">

                {/* Dynamic Power */}
                <div className="bg-indigo-50 p-6 rounded-2xl border-t-4 border-indigo-500 shadow-sm">
                    <h3 className="text-lg font-bold text-indigo-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5" /> Dynamic (Switching)
                    </h3>
                    <p className="text-xs text-indigo-800 mb-4 h-10">
                        Energy to charge/discharge load capacitance (<i>C<sub>L</sub></i>).
                    </p>
                    <div className="bg-white p-3 rounded-lg border border-indigo-200 text-center mb-3">
                        <div className="text-sm font-mono font-bold text-indigo-700">
                            <i>P<sub>dyn</sub></i> = &alpha; &middot; <i>C<sub>L</sub></i> &middot; <i>V<sub>dd</sub></i><sup>2</sup> &middot; <i>f</i>
                        </div>
                    </div>
                    <p className="text-xs text-indigo-900">
                        <strong>&alpha;:</strong> Activity Factor (0.1 = switches 10% of time).
                    </p>
                </div>

                {/* Short Circuit Power */}
                <div className="bg-amber-50 p-6 rounded-2xl border-t-4 border-amber-500 shadow-sm">
                    <h3 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
                        <Flame className="w-5 h-5" /> Short-Circuit
                    </h3>
                    <p className="text-xs text-amber-800 mb-4 h-10">
                        Current flow from <i>V<sub>dd</sub></i> to <i>Gnd</i> during the brief moment when both PMOS and NMOS are ON during switching.
                    </p>
                    <div className="bg-white p-3 rounded-lg border border-amber-200 text-center mb-3">
                        <div className="text-sm font-mono font-bold text-amber-700">
                            <i>P<sub>sc</sub></i> = <i>I<sub>peak</sub></i> &middot; <i>t<sub>sc</sub></i> &middot; <i>V<sub>dd</sub></i> &middot; <i>f</i>
                        </div>
                    </div>
                    <p className="text-xs text-amber-900">
                        Depends on <strong>Input Slew</strong> (Rise/Fall time).
                    </p>
                </div>

                {/* Static Power */}
                <div className="bg-rose-50 p-6 rounded-2xl border-t-4 border-rose-500 shadow-sm">
                    <h3 className="text-lg font-bold text-rose-900 mb-3 flex items-center gap-2">
                        <Battery className="w-5 h-5" /> Static (Leakage)
                    </h3>
                    <p className="text-xs text-rose-800 mb-4 h-10">
                        Sub-threshold leakage (<i>I<sub>sub</sub></i>) and Gate Tunneling (<i>I<sub>gate</sub></i>). Consumed even when clock is stopped.
                    </p>
                    <div className="bg-white p-3 rounded-lg border border-rose-200 text-center mb-3">
                        <div className="text-sm font-mono font-bold text-rose-700">
                            <i>P<sub>stat</sub></i> = <i>I<sub>leak</sub></i> &middot; <i>V<sub>dd</sub></i>
                        </div>
                    </div>
                    <p className="text-xs text-rose-900">
                        Dominates at &lt; 65nm nodes.
                    </p>
                </div>

            </div>

            {/* --- Reduction Techniques Cheat Sheet --- */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 mb-12 text-slate-300 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6">Reduction Techniques</h2>
                <div className="space-y-4">

                    <div className="flex items-center justify-between p-3 bg-slate-800 rounded border border-slate-700">
                        <div>
                            <h4 className="font-bold text-white">Clock Gating</h4>
                            <p className="text-xs text-slate-400">Stops the clock (&alpha; &approx; 0).</p>
                        </div>
                        <div className="text-emerald-400 text-xs font-mono font-bold uppercase">Dynamic Power</div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-800 rounded border border-slate-700">
                        <div>
                            <h4 className="font-bold text-white">DVFS (Dynamic V & F Scaling)</h4>
                            <p className="text-xs text-slate-400">Lowers voltage (<i>V</i><sup>2</sup>) and frequency (<i>f</i>) when idle.</p>
                        </div>
                        <div className="text-emerald-400 text-xs font-mono font-bold uppercase">Dynamic Power</div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-800 rounded border border-slate-700">
                        <div>
                            <h4 className="font-bold text-white">Power Gating (PSO)</h4>
                            <p className="text-xs text-slate-400">Physically cuts off <i>V<sub>dd</sub></i> using a Sleep Transistor.</p>
                        </div>
                        <div className="text-rose-400 text-xs font-mono font-bold uppercase">Static Power</div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-800 rounded border border-slate-700">
                        <div>
                            <h4 className="font-bold text-white">Multi-Vt Cells (HVT/LVT)</h4>
                            <p className="text-xs text-slate-400">Use High-Vt cells for non-critical paths to reduce leakage.</p>
                        </div>
                        <div className="text-rose-400 text-xs font-mono font-bold uppercase">Static Power</div>
                    </div>

                </div>
            </div>

            <div className="mt-12">
                <SubtopicNav prev={navPrev} next={navNext} />
            </div>
        </div>
    );
}
