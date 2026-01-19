"use client";

import React, { useState } from "react";
import { ArrowRight, Clock, RefreshCw } from "lucide-react";

/**
 * AssignmentSimulator
 * 
 * Visualizes the difference between Blocking (=) and Non-Blocking (<=) assignments.
 * Scenario: Swap two registers A and B.
 * Initial: A=1, B=2.
 * Target: A=2, B=1.
 */
const AssignmentSimulator = () => {
    const [mode, setMode] = useState<'blocking' | 'nonblocking'>('blocking');
    const [step, setStep] = useState(0); // 0: Init, 1: Exec Line 1, 2: Exec Line 2

    // State values
    const [regA, setRegA] = useState(1);
    const [regB, setRegB] = useState(2);

    // Shadow registers for non-blocking (RHS evaluation)
    const [shadowA, setShadowA] = useState<number | null>(null);
    const [shadowB, setShadowB] = useState<number | null>(null);

    const reset = () => {
        setStep(0);
        setRegA(1);
        setRegB(2);
        setShadowA(null);
        setShadowB(null);
    };

    const nextStep = () => {
        if (step >= 2) return;

        if (mode === 'blocking') {
            // Blocking: Immediate update
            if (step === 0) {
                // Line 1: A = B;
                setRegA(regB); // A becomes 2
                setStep(1);
            } else if (step === 1) {
                // Line 2: B = A;
                setRegB(regA); // B becomes A (which is now 2) -> ERROR: B=2, A=2
                setStep(2);
            }
        } else {
            // Non-Blocking: Evaluate RHS first, Update Later (simulated here)
            // Ideally non-blocking happens all at "end of time step", 
            // but for visualization we often show: "Evaluate Right Hand Side" -> "Update Left Hand Side"

            // Let's simplify: 
            // Step 1: Evaluate RHS for ALL statements (scheduled)
            // Step 2: Update LHS

            if (step === 0) {
                // Schedule updates
                setShadowA(regB); // A gets B's *current* value (2)
                setShadowB(regA); // B gets A's *current* value (1)
                setStep(1);
            } else if (step === 1) {
                // Apply updates
                if (shadowA !== null) setRegA(shadowA);
                if (shadowB !== null) setRegB(shadowB);
                setStep(2);
            }
        }
    };

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-mono">

            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
                    <button
                        onClick={() => { setMode('blocking'); reset(); }}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${mode === 'blocking' ? 'bg-rose-100 text-rose-700' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        Blocking (=)
                    </button>
                    <button
                        onClick={() => { setMode('nonblocking'); reset(); }}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${mode === 'nonblocking' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        Non-Blocking (&lt;=)
                    </button>
                </div>

                <div className="flex gap-2">
                    <button onClick={reset} className="p-2 text-slate-400 hover:text-slate-600 border border-slate-200 rounded bg-white"><RefreshCw className="w-4 h-4" /></button>
                    <button
                        onClick={nextStep}
                        disabled={step >= 2}
                        className={`px-6 py-2 rounded-lg font-bold shadow-sm transition-all flex items-center gap-2 ${step >= 2 ? 'bg-slate-200 text-slate-400' : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'}`}
                    >
                        {step === 0 ? "Execute Step 1" : step === 1 ? "Execute Step 2" : "Finished"} <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Code View */}
            <div className="mb-8 bg-slate-900 rounded-lg p-4 text-slate-300 shadow-inner relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-slate-800 text-xs px-2 py-1 text-slate-400 rounded-bl">verilog</div>
                <div className={`p-2 border-l-4 transition-colors ${step === 1 && mode === 'blocking' ? 'border-yellow-400 bg-white/5' : 'border-transparent'}`}>
                    1. {mode === 'blocking' ? 'A = B;' : 'A <= B;'} <span className="text-slate-500">// {mode === 'blocking' ? 'Set A to B immediately' : 'Schedule A to get B'}</span>
                </div>
                <div className={`p-2 border-l-4 transition-colors ${step === 2 && mode === 'blocking' ? 'border-yellow-400 bg-white/5' : ''} ${(step === 1 && mode === 'nonblocking') ? 'border-transparent' : ''}`}>
                    2. {mode === 'blocking' ? 'B = A;' : 'B <= A;'} <span className="text-slate-500">// {mode === 'blocking' ? 'Set B to A (new value!)' : 'Schedule B to get A'}</span>
                </div>
                {mode === 'nonblocking' && step === 1 && (
                    <div className="mt-2 text-emerald-400 text-sm border-t border-slate-700 pt-2">
                        &gt; Scheduled Updates: A&larr;{shadowA}, B&larr;{shadowB}
                    </div>
                )}
            </div>

            {/* Registers Visualization */}
            <div className="flex justify-center gap-16">

                {/* Register A */}
                <div className="flex flex-col items-center">
                    <div className="text-sm font-bold text-slate-500 mb-2">Reg A</div>
                    <div className={`w-20 h-20 flex items-center justify-center text-3xl font-black rounded-xl border-2 shadow-lg transition-all duration-500
                        ${step > 0 && regA !== 1 ? "border-amber-500 bg-amber-50 text-amber-700 scale-110" : "border-slate-300 bg-white text-slate-700"}
                    `}>
                        {regA}
                    </div>
                    {mode === 'blocking' && step >= 1 && regA === 2 && (
                        <div className="text-xs text-amber-600 mt-2 font-bold animate-bounce">Modified!</div>
                    )}
                </div>

                {/* Register B */}
                <div className="flex flex-col items-center">
                    <div className="text-sm font-bold text-slate-500 mb-2">Reg B</div>
                    <div className={`w-20 h-20 flex items-center justify-center text-3xl font-black rounded-xl border-2 shadow-lg transition-all duration-500
                         ${step > 1 && regB !== 2 ? "border-amber-500 bg-amber-50 text-amber-700 scale-110" : "border-slate-300 bg-white text-slate-700"}
                    `}>
                        {regB}
                    </div>
                    {/* Error Label for Blocking Swap Failure */}
                    {mode === 'blocking' && step === 2 && regA === 2 && regB === 2 && (
                        <div className="text-xs text-red-500 mt-2 font-bold bg-red-50 px-2 py-1 rounded">SWAP FAILED</div>
                    )}
                    {mode === 'nonblocking' && step === 2 && regA === 2 && regB === 1 && (
                        <div className="text-xs text-emerald-600 mt-2 font-bold bg-emerald-50 px-2 py-1 rounded">SWAP SUCCESS</div>
                    )}
                </div>

            </div>

            {/* Explanation Box */}
            <div className="mt-8 text-center text-sm text-slate-600 bg-white p-4 rounded-lg border border-slate-200">
                {step === 0 && "Initial State: A=1, B=2. Goal: Swap them."}
                {step === 1 && mode === 'blocking' && "Line 1 executed: A is now 2. The old value of A (1) is lost!"}
                {step === 1 && mode === 'nonblocking' && "RHS Evaluated: Both assignments read current values (A=1, B=2) and schedule updates."}
                {step === 2 && mode === 'blocking' && "Line 2 executed: B gets A's NEW value (2). Result: A=2, B=2."}
                {step === 2 && mode === 'nonblocking' && "Update Complete: Scheduled values applied simultaneously. A becomes 2, B becomes 1."}
            </div>

        </div>
    );
};

export default AssignmentSimulator;
