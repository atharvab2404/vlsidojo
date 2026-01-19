"use client";

import React, { useState } from "react";
import { Activity, Zap, Play, ArrowRight } from "lucide-react";

/**
 * GlitchMaker
 * 
 * Demonstrates a Static 1-Hazard.
 * Circuit: F = AB + A'C.
 * Condition: B=1, C=1.
 * Ideal Logic: F = A(1) + A'(1) = 1.
 * 
 * Hazard: When A transitions 1->0, the inverter delay causes A' to stay 0 for a moment.
 * Result: Both terms are 0. Output drops to 0 temporarily (Glitch).
 */
const GlitchMaker = () => {
    const [delay, setDelay] = useState(2); // Inverter Delay (simulated units)
    const [isSimulating, setIsSimulating] = useState(false);

    // Waveform State
    // 0: Initial Steady State (A=1)
    // 1: A drops to 0. A' is still 0 (Glitch Start).
    // 2: A' rises to 1 (Glitch End).
    const [step, setStep] = useState(0);

    const runSimulation = () => {
        if (isSimulating) return;
        setIsSimulating(true);
        setStep(0);

        // Step 1: A switches 1->0 instantly
        setTimeout(() => {
            setStep(1);
        }, 1000);

        // Step 2: A' switches 0->1 after delay
        setTimeout(() => {
            setStep(2);
            setIsSimulating(false);
        }, 1000 + (delay * 500));
    };

    // Calculate signals based on step
    const signalA = step === 0 ? 1 : 0;

    // A_prime depends on delay. At step 1, it's theoretically "waiting".
    // In our sim, Step 1 is the "Hazard Window".
    const signalAPrime = step === 2 ? 1 : 0;

    // Logic: F = (A & B) | (A' & C)
    // Fixed B=1, C=1
    const term1 = signalA & 1; // A & 1
    const term2 = signalAPrime & 1; // A' & 1
    const signalF = term1 | term2;

    const hasGlitch = step === 1 && signalF === 0;

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans select-none">

            {/* Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">

                <div className="flex-1 w-full">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">
                        Inverter Propagation Delay
                    </label>
                    <div className="flex items-center gap-4">
                        <input
                            type="range" min="1" max="5" step="1"
                            value={delay}
                            onChange={(e) => setDelay(parseInt(e.target.value))}
                            disabled={isSimulating}
                            className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 disabled:opacity-50"
                        />
                        <span className="font-mono font-bold text-slate-700 w-12 text-right">{delay}ns</span>
                    </div>
                </div>

                <button
                    onClick={runSimulation}
                    disabled={isSimulating}
                    className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all ${isSimulating ? 'bg-slate-100 text-slate-400' : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105'}`}
                >
                    <Play className={`w-5 h-5 ${isSimulating ? '' : 'fill-white'}`} />
                    {isSimulating ? "Simulating..." : "Trigger Transition"}
                </button>
            </div>

            {/* Circuit Visualization */}
            <div className="relative bg-white p-8 rounded-xl border border-slate-200 mb-8 overflow-hidden min-h-[300px]">

                {/* Inputs */}
                <div className="absolute left-4 top-10 flex flex-col gap-12">

                    {/* Signal A */}
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-700">A</span>
                        <div className={`w-12 h-8 flex items-center justify-center rounded border-2 font-mono transition-colors ${signalA ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'bg-slate-100 border-slate-300 text-slate-500'}`}>
                            {signalA}
                        </div>
                    </div>

                    {/* Signal B (Fixed 1) */}
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-400">B</span>
                        <div className="w-12 h-8 flex items-center justify-center rounded border-2 border-slate-200 bg-slate-50 text-slate-400 font-mono">
                            1
                        </div>
                    </div>

                </div>

                {/* Logic Gates */}
                <div className="absolute left-40 top-8 flex flex-col gap-8">

                    {/* Top Path: AND(A, B) */}
                    <div className="relative top-4">
                        <div className="w-16 h-12 border-2 border-slate-800 rounded-r-full flex items-center justify-center bg-white z-10 relative">
                            <span className="text-[10px] font-bold">&</span>
                        </div>
                        <div className={`absolute left-16 top-1/2 w-16 h-1 transition-colors ${term1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                    </div>

                    {/* Inverter Path Note */}
                    <div className="absolute left-[-60px] top-[140px] flex items-center">
                        <div className="w-16 h-1 bg-slate-400"></div>
                        <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[12px] border-l-slate-800 relative flex items-center justify-center">
                            <div className="absolute -right-1 w-2 h-2 rounded-full border border-slate-800 bg-white"></div>
                        </div>
                        {/* Delay Bubble */}
                        <div className={`absolute top-[-30px] left-4 bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-rose-200 animate-pulse`}>
                            Delay: {delay}ns
                        </div>
                    </div>

                    {/* Bottom Path: AND(A', C) */}
                    <div className="relative top-[80px]">
                        <div className="w-16 h-12 border-2 border-slate-800 rounded-r-full flex items-center justify-center bg-white z-10 relative">
                            <span className="text-[10px] font-bold">&</span>
                        </div>
                        <div className={`absolute left-16 top-1/2 w-16 h-1 transition-colors ${term2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                    </div>

                </div>

                {/* OR Gate & Output */}
                <div className="absolute right-20 top-[60px]">
                    <div className="w-16 h-16 border-2 border-slate-800 rounded-r-[50%] flex items-center justify-center bg-white relative z-10">
                        <span className="text-[10px] font-bold relative left-2">OR</span>
                        {/* Input curves */}
                        <div className="absolute left-[-2px] top-0 bottom-0 w-2 bg-white rounded-r-[50%] border-r-2 border-slate-800"></div>
                    </div>

                    {/* Final Output Wire */}
                    <div className={`absolute left-16 top-1/2 w-16 h-2 transition-colors duration-75 ${signalF ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                        <ArrowRight className={`absolute -right-4 -top-3 w-8 h-8 ${signalF ? 'text-emerald-500' : 'text-rose-500'}`} />
                    </div>
                </div>

                {/* Glitch Indicator */}
                {hasGlitch && (
                    <div className="absolute right-10 top-2 bg-rose-500 text-white px-4 py-2 rounded-full font-bold animate-bounce shadow-lg flex items-center gap-2">
                        <Zap className="w-4 h-4 fill-white" /> GLITCH DETECTED!
                    </div>
                )}

            </div>

            {/* Waveform View */}
            <div className="bg-slate-900 rounded-xl p-6 relative h-40">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-widest absolute top-2 left-2">Logic Analyzer</span>

                <div className="flex h-full items-end gap-1">
                    {/* Pre-transition */}
                    <div className="flex-1 bg-emerald-500/20 h-full relative border-t-2 border-emerald-500">
                        <span className="absolute bottom-2 left-2 text-emerald-400 text-xs">Stable 1</span>
                    </div>

                    {/* Transition Point */}
                    <div className="w-0.5 h-full bg-slate-700 dashed"></div>

                    {/* The Glitch Window */}
                    {isSimulating || step > 0 ? (
                        <div
                            className={`h-full relative transition-[width] duration-[200ms] ease-linear border-b-2 border-t-0 ${step >= 1 ? 'border-rose-500 bg-rose-500/20' : 'border-slate-800'}`}
                            style={{ flex: step >= 1 ? delay : 0.001 }}
                        >
                            {step >= 1 && (
                                <span className="absolute top-2 w-full text-center text-rose-400 text-[10px] font-bold">
                                    GLITCH (0)
                                </span>
                            )}
                        </div>
                    ) : null}

                    {/* Post-Glitch */}
                    {step === 2 && (
                        <div className="flex-1 bg-emerald-500/20 h-full relative border-t-2 border-emerald-500 animate-in fade-in slide-in-from-right-4">
                            <span className="absolute bottom-2 right-2 text-emerald-400 text-xs">Recovered 1</span>
                        </div>
                    )}
                </div>

            </div>

        </div>
    );
};

export default GlitchMaker;
