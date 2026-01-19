"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle, Database, GitGraph, Grid, Cpu } from "lucide-react";

const FSMDesignExplorer = () => {
    const [step, setStep] = useState(1);

    const steps = [
        { id: 1, title: "1. Specification & Diagram", icon: GitGraph },
        { id: 2, title: "2. State Table", icon: Grid },
        { id: 3, title: "3. State Encoding", icon: Database },
        { id: 4, title: "4. Logic Minimization", icon: Cpu },
        { id: 5, title: "5. Circuit Diagram", icon: CheckCircle },
    ];

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans min-h-[500px] flex flex-col">
            {/* Steps Progress Bar */}
            <div className="flex justify-between mb-8 overflow-x-auto pb-4">
                {steps.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => setStep(s.id)}
                        className={`flex flex-col items-center gap-2 min-w-[100px] px-2 transition-all ${step === s.id ? "text-indigo-600 scale-105 font-bold" : "text-slate-400 hover:text-slate-600"}`}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step === s.id ? "bg-indigo-100 border-indigo-600" : "bg-white border-slate-300"}`}>
                            <s.icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs text-center">{s.title}</span>
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white p-8 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <span className="text-9xl font-black text-slate-800">{step}</span>
                </div>

                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Step 1: The Problem & State Diagram</h3>
                        <p className="text-gray-600 mb-6">
                            <strong>Goal:</strong> Design a "2-bit Gray Code Counter".
                            <br />
                            Sequence: 00 → 01 → 11 → 10 → (repeat).
                        </p>
                        <div className="flex justify-center my-8">
                            <div className="bg-slate-50 p-6 rounded-lg pointer-events-none">
                                {/* Simulated Diagram */}
                                <div className="flex gap-8 items-center">
                                    <div className="w-16 h-16 rounded-full border-2 border-indigo-500 flex items-center justify-center font-bold bg-indigo-50">S0 (00)</div>
                                    <ArrowRight className="text-slate-400" />
                                    <div className="w-16 h-16 rounded-full border-2 border-indigo-500 flex items-center justify-center font-bold bg-indigo-50">S1 (01)</div>
                                    <ArrowRight className="text-slate-400" />
                                    <div className="w-16 h-16 rounded-full border-2 border-indigo-500 flex items-center justify-center font-bold bg-indigo-50">S2 (11)</div>
                                    <ArrowRight className="text-slate-400" />
                                    <div className="w-16 h-16 rounded-full border-2 border-indigo-500 flex items-center justify-center font-bold bg-indigo-50">S3 (10)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Step 2: The State Transition Table</h3>
                        <p className="text-gray-600 mb-6">
                            List every possible <strong>Current State</strong> and determine the desired <strong>Next State</strong>.
                        </p>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                                    <th className="p-3">Current State (Q1 Q0)</th>
                                    <th className="p-3">Next State (Q1* Q0*)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                <tr><td className="p-3">0 0</td><td className="p-3 font-bold text-indigo-600">0 1</td></tr>
                                <tr><td className="p-3">0 1</td><td className="p-3 font-bold text-indigo-600">1 1</td></tr>
                                <tr><td className="p-3">1 1</td><td className="p-3 font-bold text-indigo-600">1 0</td></tr>
                                <tr><td className="p-3">1 0</td><td className="p-3 font-bold text-indigo-600">0 0</td></tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Step 3: State Encoding</h3>
                        <p className="text-gray-600 mb-4">
                            How do we represent states in binary?
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                                <h4 className="font-bold text-indigo-900 mb-2">Option A: Binary</h4>
                                <ul className="text-sm space-y-1 text-slate-700 font-mono">
                                    <li>S0 = 00</li>
                                    <li>S1 = 01</li>
                                    <li>S2 = 10</li>
                                    <li>S3 = 11</li>
                                </ul>
                                <p className="text-xs mt-2 text-indigo-700">Uses 2 Flip-Flops. Good.</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 opacity-60">
                                <h4 className="font-bold text-slate-900 mb-2">Option B: One-Hot</h4>
                                <ul className="text-sm space-y-1 text-slate-700 font-mono">
                                    <li>S0 = 0001</li>
                                    <li>S1 = 0010</li>
                                    <li>S2 = 0100</li>
                                    <li>S3 = 1000</li>
                                </ul>
                                <p className="text-xs mt-2 text-slate-500">Uses 4 Flip-Flops. Expensive.</p>
                            </div>
                        </div>
                        <p className="mt-4 text-green-700 font-bold text-center">We will select Binary Encoding (2 FFs).</p>
                    </div>
                )}

                {step === 4 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Step 4: K-Map Minimization</h3>
                        <p className="text-gray-600 mb-4">
                            Find Boolean Equations for next state bits ($D_1$ and $D_0$).
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                <h4 className="font-bold text-yellow-900 mb-2">For D0 (LSB)</h4>
                                <p className="font-mono text-sm mb-2 text-yellow-800">
                                    Input vector: 00 &rarr; 1, 01 &rarr; 1, 11 &rarr; 0, 10 &rarr; 0.
                                </p>
                                <div className="bg-white p-2 rounded shadow-sm text-center font-bold text-xl text-yellow-600 font-mono">
                                    D0 = Q1'
                                </div>
                            </div>
                            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                                <h4 className="font-bold text-emerald-900 mb-2">For D1 (MSB)</h4>
                                <p className="font-mono text-sm mb-2 text-emerald-800">
                                    Input vector: 00 &rarr; 0, 01 &rarr; 1, 11 &rarr; 1, 10 &rarr; 0.
                                </p>
                                <div className="bg-white p-2 rounded shadow-sm text-center font-bold text-xl text-emerald-600 font-mono">
                                    D1 = Q0
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Step 5: The Circuit</h3>
                        <p className="text-gray-600 mb-6">
                            Connect the logic gates to the D-Flip-Flops.
                        </p>
                        <div className="bg-slate-900 p-8 rounded-xl flex items-center justify-center gap-12 font-mono text-white">
                            {/* FF 0 */}
                            <div className="relative border-2 border-white p-4 w-24 h-32 flex flex-col justify-between items-center rounded bg-indigo-900">
                                <div className="absolute -top-6 text-yellow-400 font-bold">D0 = Q1'</div>
                                <span>D</span>
                                <span className="text-xs">Q0</span>
                                <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-l-transparent border-r-transparent border-b-white absolute bottom-4 left-0"></div>
                            </div>

                            {/* FF 1 */}
                            <div className="relative border-2 border-white p-4 w-24 h-32 flex flex-col justify-between items-center rounded bg-indigo-900">
                                <div className="absolute -top-6 text-emerald-400 font-bold">D1 = Q0</div>
                                <span>D</span>
                                <span className="text-xs">Q1</span>
                                <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-l-transparent border-r-transparent border-b-white absolute bottom-4 left-0"></div>
                            </div>
                        </div>
                        <p className="text-center mt-6 text-green-600 font-bold text-xl">Design Complete! ✅</p>
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
                <button
                    onClick={() => setStep(Math.max(1, step - 1))}
                    disabled={step === 1}
                    className="px-6 py-2 rounded-lg bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => setStep(Math.min(5, step + 1))}
                    disabled={step === 5}
                    className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
                >
                    Next Step <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default FSMDesignExplorer;
