"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, CheckCircle, Code } from "lucide-react";
import AssignmentSimulator from "./AssignmentSimulator";

export default function Page() {
    const currentSlug = "blocking-vs-non-blocking-assignments-the-1-verilog-question";
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
                Blocking vs. Non-Blocking <br />

            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                If you mess this up in an interview, the interview is likely over.
                <br />
                It determines whether your simulation matches synthesis, and whether your race conditions will haunt you forever.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Code className="w-8 h-8 text-indigo-600" />
                    1. The Swap Experiment
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        Try to swap registers <strong>A</strong> and <strong>B</strong>.
                        <br />
                        Notice how <strong>Blocking (=)</strong> fails because it updates <i>immediately</i>, destroying the old value before it can be used.
                    </p>
                </div>
                <AssignmentSimulator />
            </div>

            {/* --- Theory: The Golden Rules --- */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">

                <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100">
                    <h3 className="text-xl font-bold text-rose-900 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-rose-600" /> Blocking (=)
                    </h3>
                    <p className="font-mono text-sm bg-white p-2 rounded border border-rose-200 mb-3">
                        always @(*) begin <br /> &nbsp; y = a & b; <br /> end
                    </p>
                    <ul className="text-sm space-y-2 text-rose-800 list-disc ml-4">
                        <li><strong>Executes Sequentially:</strong> Line 1 finishes before Line 2 starts.</li>
                        <li><strong>Use for:</strong> Combinational Logic.</li>
                        <li><strong>Why?</strong> Logic gates propagate instantly (conceptually). We want the new value immediately for the next equation.</li>
                    </ul>
                </div>

                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                    <h3 className="text-xl font-bold text-emerald-900 mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-600" /> Non-Blocking (&lt;=)
                    </h3>
                    <p className="font-mono text-sm bg-white p-2 rounded border border-emerald-200 mb-3">
                        always @(posedge clk) begin <br /> &nbsp; q &lt;= d; <br /> end
                    </p>
                    <ul className="text-sm space-y-2 text-emerald-800 list-disc ml-4">
                        <li><strong>Executes Concurrently:</strong> All RHS evaluated first, then all LHS updated.</li>
                        <li><strong>Use for:</strong> Sequential Logic (Flip-Flops).</li>
                        <li><strong>Why?</strong> Simulates the hardware reality where all FFs update on the <i>same</i> clock edge, using values from <i>before</i> the edge.</li>
                    </ul>
                </div>

            </div>

            {/* --- The Verilog Race --- */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 mb-12 text-slate-300 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6">Why not mix them?</h2>
                <p className="mb-4 leading-relaxed">
                    Mixing assignment types in the same `always` block is strictly forbidden in RTL guidelines (though syntactically valid). It creates unpredictable <strong>Race Conditions</strong> where the simulation result depends on the order the compiler executes the statements.
                </p>
                <div className="font-mono text-sm bg-black/30 p-4 rounded border border-slate-700 text-yellow-500">
                    Warning: Variable 'a' is driven by both blocking and non-blocking assignments.
                </div>
            </div>

            <div className="mt-12">
                <SubtopicNav prev={navPrev} next={navNext} />
            </div>
        </div>
    );
}
