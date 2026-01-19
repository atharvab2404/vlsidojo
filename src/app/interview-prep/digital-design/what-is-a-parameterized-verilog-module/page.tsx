"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Box, Lock, Settings } from "lucide-react";
import ParameterScaler from "./ParameterScaler";

export default function Page() {
    const currentSlug = "what-is-a-parameterized-verilog-module";
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
                Parameterized Modules <br />

            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Hard-coding constants (like `[7:0]` or `32'd1000`) is the enemy of reusable design.
                Verilog <strong>Parameters</strong> allow you to create dynamic, flexible hardware templates.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Settings className="w-8 h-8 text-indigo-600" />
                    1. Reusability in Action
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        Adjust the slider to request a different "flavor" of the Counter module.
                        Notice how the instantiation passes a new value to the <code>WIDTH</code> parameter.
                    </p>
                </div>
                <ParameterScaler />
            </div>

            {/* --- Theory: Concepts --- */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <div className="bg-indigo-100 p-1 rounded"><Box className="w-4 h-4 text-indigo-600" /></div> parameter
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        A constant that allows the module's behavior (Width, Depth, Latency) to be configured <strong>during instantiation</strong>.
                    </p>
                    <div className="bg-indigo-50 p-3 rounded font-mono text-xs text-indigo-900 mb-2">
                        module my_ram #(<br />
                        &nbsp; <strong>parameter</strong> DEPTH = 1024<br />
                        ) ( ... );
                    </div>
                    <ul className="text-sm space-y-2 text-indigo-800 ml-4 list-disc">
                        <li><strong>Scope:</strong> Public API (Changeable from outside).</li>
                        <li><strong>Use for:</strong> Bus widths, FIFO depths, Address maps.</li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <div className="bg-slate-100 p-1 rounded"><Lock className="w-4 h-4 text-slate-600" /></div> localparam
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        A constant used <strong>internally</strong> to calculate derived values. It cannot be overridden.
                    </p>
                    <div className="bg-slate-50 p-3 rounded font-mono text-xs text-slate-900 mb-2">
                        <strong>localparam</strong> ADDR_BITS = $clog2(DEPTH);
                    </div>
                    <ul className="text-sm space-y-2 text-slate-600 ml-4 list-disc">
                        <li><strong>Scope:</strong> Private (Internal calculation only).</li>
                        <li><strong>Use for:</strong> State machine states (`IDLE=0`, `RUN=1`), calculated constants.</li>
                    </ul>
                </div>

            </div>

            {/* --- Syntax Warning --- */}
            <div className="bg-rose-50 p-8 rounded-2xl border border-rose-100 mb-12">
                <h2 className="text-2xl font-bold text-rose-900 mb-4">⚠️ Use the Modern Syntax</h2>
                <p className="text-lg text-rose-800 mb-4">
                    Avoid <code>defparam</code>. It is deprecated and can cause compilation order issues.
                    Always use the <strong>Named Parameter Assignment</strong> syntax shown in the visualizer above:
                </p>
                <pre className="bg-white p-4 rounded border border-rose-200 text-rose-700 font-mono font-bold">
                    module_name #( .PARAM_NAME(VALUE) ) instance_name ( ... );
                </pre>
            </div>

            <div className="mt-12">
                <SubtopicNav prev={navPrev} next={navNext} />
            </div>
        </div>
    );
}
