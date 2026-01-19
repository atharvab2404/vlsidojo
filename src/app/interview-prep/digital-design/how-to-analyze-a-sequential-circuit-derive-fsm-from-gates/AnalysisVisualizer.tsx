"use client";

import React, { useState } from "react";
import { ArrowRight, Lightbulb, PlayCircle, Layers } from "lucide-react";

const AnalysisVisualizer = () => {
    const [step, setStep] = useState(0);

    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <div className="space-y-4 animate-in fade-in zoom-in">
                        <h4 className="font-bold text-gray-800 flex items-center gap-2">
                            <Layers className="w-5 h-5 text-indigo-600" />
                            Step 1: Identify the Flip-Flop Equations
                        </h4>
                        <p className="text-sm text-gray-600">
                            Look at the D inputs of each Flip-Flop. Write the boolean equation in terms of Inputs (X) and Current State (Q).
                        </p>
                        <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm text-emerald-400">
                            DA = (X & QB) | (X' & QA)<br />
                            DB = X & QA'
                        </div>
                        <p className="text-xs text-gray-400 italic">Here, A and B are the outputs of two D Flip-Flops.</p>
                    </div>
                );
            case 1:
                return (
                    <div className="space-y-4 animate-in fade-in zoom-in">
                        <h4 className="font-bold text-gray-800 flex items-center gap-2">
                            <Layers className="w-5 h-5 text-indigo-600" />
                            Step 2: Construct the State Table
                        </h4>
                        <p className="text-sm text-gray-600">
                            List all combinations of Current State (AB) and Input (X). Calculate Next State (A+ B+).
                            <br /> Since D-FF Next State = D Input, just plug in the values!
                        </p>
                        <div className="overflow-hidden rounded-lg border border-gray-200">
                            <table className="w-full text-sm text-center">
                                <thead className="bg-gray-50 text-gray-600 font-bold">
                                    <tr>
                                        <th className="p-2">Present (AB)</th>
                                        <th className="p-2">Input (X)</th>
                                        <th className="p-2 bg-indigo-50 text-indigo-700">Next (A+ B+)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 font-mono text-gray-700">
                                    <tr><td>00</td><td>0</td><td>00</td></tr>
                                    <tr><td>00</td><td>1</td><td>01</td></tr>
                                    <tr><td>01</td><td>0</td><td>00</td></tr>
                                    <tr className="bg-amber-50"><td>01 (B=1)</td><td>1 (X=1)</td><td className="font-bold text-amber-700">10 (Toggle!)</td></tr>
                                    <tr><td>10</td><td>...</td><td>...</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4 animate-in fade-in zoom-in">
                        <h4 className="font-bold text-gray-800 flex items-center gap-2">
                            <Layers className="w-5 h-5 text-indigo-600" />
                            Step 3: Draw the State Diagram
                        </h4>
                        <p className="text-sm text-gray-600">
                            Each row in the table becomes an arrow in the diagram.
                            <br />
                            <span className="font-bold text-indigo-600">01 --(X=1)&rarr; 10</span>
                        </p>
                        <div className="flex justify-center py-6">
                            <div className="relative w-64 h-32 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-around">
                                <div className="w-10 h-10 rounded-full bg-white border-2 border-indigo-500 flex items-center justify-center font-bold text-indigo-700 shadow-sm z-10">01</div>
                                <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-indigo-300"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3 bg-white px-2 text-xs font-bold text-indigo-600">X=1</div>
                                <div className="w-10 h-10 rounded-full bg-white border-2 border-indigo-500 flex items-center justify-center font-bold text-indigo-700 shadow-sm z-10">10</div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 my-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-indigo-100 p-2 rounded-lg">
                    <Lightbulb className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Analysis Walkthrough</h3>
            </div>

            <div className="min-h-[250px] bg-slate-50 rounded-xl border border-slate-100 p-6 flex flex-col justify-center">
                {renderStep()}
            </div>

            <div className="flex justify-between mt-6">
                <button
                    onClick={() => setStep(Math.max(0, step - 1))}
                    disabled={step === 0}
                    className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-700 disabled:opacity-30"
                >
                    Back
                </button>
                <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i === step ? 'bg-indigo-600' : 'bg-gray-300'}`} />
                    ))}
                </div>
                <button
                    onClick={() => setStep(Math.min(2, step + 1))}
                    disabled={step === 2}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-sm flex items-center gap-2"
                >
                    Next <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default AnalysisVisualizer;
