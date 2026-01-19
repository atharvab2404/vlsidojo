"use client";

import React, { useState } from "react";
import { ArrowRight, Scissors, Layers, CheckCircle } from "lucide-react";

type State = {
    id: string;
    next0: string;
    next1: string;
    out: number; // Single output for simplicity
};

const INITIAL_STATES: State[] = [
    { id: "A", next0: "B", next1: "C", out: 0 },
    { id: "B", next0: "D", next1: "E", out: 0 },
    { id: "C", next0: "F", next1: "E", out: 0 }, // C equivalent to B? Not yet.
    { id: "D", next0: "A", next1: "A", out: 1 },
    { id: "E", next0: "A", next1: "A", out: 1 }, // E equivalent to D? Yes.
    { id: "F", next0: "D", next1: "E", out: 0 }, // F equivalent to B? Let's see.
];

const StateMinimizationVisualizer = () => {
    const [step, setStep] = useState<number>(0);

    // Partition logic mimicking the steps
    // Step 0: Initial Table
    // Step 1: P0 Partition by Output (Group 0 vs Group 1)
    // Step 2: P1 Partition by Next States in P0
    // Step 3: Final Merged Graph

    const renderStepContent = () => {
        switch (step) {
            case 0:
                return (
                    <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                        <h4 className="font-bold text-gray-800 flex items-center gap-2">
                            <Layers className="w-5 h-5 text-indigo-500" />
                            Step 0: The Original State Table
                        </h4>
                        <p className="text-sm text-gray-600">
                            We start with the raw state transition table. Notice we have 6 states (A-F).
                            Some might be redundant!
                        </p>
                        <div className="overflow-hidden rounded-xl border border-gray-200">
                            <table className="w-full text-sm text-center">
                                <thead className="bg-gray-50 text-gray-500">
                                    <tr>
                                        <th className="p-2">Current</th>
                                        <th className="p-2">Next (In=0)</th>
                                        <th className="p-2">Next (In=1)</th>
                                        <th className="p-2">Output</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {INITIAL_STATES.map((s) => (
                                        <tr key={s.id}>
                                            <td className="p-2 font-bold text-indigo-700">{s.id}</td>
                                            <td className="p-2">{s.next0}</td>
                                            <td className="p-2">{s.next1}</td>
                                            <td className={`p-2 font-bold ${s.out === 1 ? "text-amber-600" : "text-gray-400"}`}>
                                                {s.out}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                        <h4 className="font-bold text-gray-800 flex items-center gap-2">
                            <Scissors className="w-5 h-5 text-indigo-500" />
                            Step 1: Partition by Output (P₀)
                        </h4>
                        <p className="text-sm text-gray-600">
                            Split inputs into groups based on <strong>Output</strong>.
                            <br />
                            Group 1 (Out=0): A, B, C, F
                            <br />
                            Group 2 (Out=1): D, E
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                <div className="text-xs font-bold text-blue-600 mb-2">GROUP 1 (Z=0)</div>
                                <div className="flex gap-2">
                                    {['A', 'B', 'C', 'F'].map(s => <span key={s} className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm font-bold text-gray-700">{s}</span>)}
                                </div>
                            </div>
                            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                                <div className="text-xs font-bold text-amber-600 mb-2">GROUP 2 (Z=1)</div>
                                <div className="flex gap-2">
                                    {['D', 'E'].map(s => <span key={s} className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm font-bold text-gray-700">{s}</span>)}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                        <h4 className="font-bold text-gray-800 flex items-center gap-2">
                            <Layers className="w-5 h-5 text-indigo-500" />
                            Step 2: Check Successors (P₁)
                        </h4>
                        <p className="text-sm text-gray-600">
                            Do states in the same group go to the same <strong>Groups</strong>?
                            <br />
                            <strong>Check Group 2 (D, E):</strong>
                            <br />
                            D goes to (A, A) &rarr; (Grp1, Grp1). E goes to (A, A) &rarr; (Grp1, Grp1).
                            <br />
                            <span className="text-green-600 font-bold">Safe! D and E are equivalent.</span>
                            <br /><br />
                            <strong>Check Group 1 (A, B, C, F):</strong>
                            <br />
                            A &rarr; (B, C) &rarr; (Grp1, Grp1)
                            <br />
                            B &rarr; (D, E) &rarr; (Grp2, Grp2) <span className="text-red-500 font-bold">Diff! Split!</span>
                            <br />
                            C &rarr; (F, E) &rarr; (Grp1, Grp2) <span className="text-red-500 font-bold">Diff! Split!</span>
                            <br />
                            F &rarr; (D, E) &rarr; (Grp2, Grp2)
                        </p>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                        <h4 className="font-bold text-gray-800 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            Final Result: Equivalent Sets
                        </h4>
                        <p className="text-sm text-gray-600">
                            After refining partitions, we find the equivalent pairs:
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                                <div className="font-bold text-emerald-800 mb-1">State eq1 = (D, E)</div>
                                <div className="text-xs text-emerald-600">Both output 1 and go to A. Reduce to single state 'D'.</div>
                            </div>
                            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                                <div className="font-bold text-emerald-800 mb-1">State eq2 = (B, F)</div>
                                <div className="text-xs text-emerald-600">Both output 0 and go to (D, E). Reduce to single state 'B'.</div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <div className="font-bold text-gray-800 mb-1">State A</div>
                                <div className="text-xs text-gray-500">Unique.</div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <div className="font-bold text-gray-800 mb-1">State C</div>
                                <div className="text-xs text-gray-500">Unique.</div>
                            </div>
                        </div>
                        <div className="mt-4 p-3 bg-indigo-50 text-indigo-800 text-sm rounded-lg font-bold text-center">
                            Total States Reduced: 6 &rarr; 4 (33% Savings!)
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 my-8">

            {/* Progress Bar */}
            <div className="flex justify-between items-center mb-6 px-4">
                {[0, 1, 2, 3].map((s) => (
                    <div key={s} className="flex flex-col items-center relative z-10">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 
                        ${step >= s ? "bg-indigo-600 text-white shadow-md scale-110" : "bg-gray-100 text-gray-400"}`}
                        >
                            {s}
                        </div>
                    </div>
                ))}
                {/* Connecting line */}
                <div className="absolute left-10 right-10 h-1 bg-gray-100 -z-0 mx-12">
                    <div
                        className="h-full bg-indigo-200 transition-all duration-500 ease-out"
                        style={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[300px] bg-slate-50/50 rounded-xl p-6 border border-slate-100 flex flex-col justify-center">
                {renderStepContent()}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
                <button
                    onClick={() => setStep(Math.max(0, step - 1))}
                    disabled={step === 0}
                    className="px-4 py-2 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Back
                </button>
                <button
                    onClick={() => setStep(Math.min(3, step + 1))}
                    disabled={step === 3}
                    className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                >
                    Next Step
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default StateMinimizationVisualizer;
