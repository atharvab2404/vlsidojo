"use client";

import React, { useState, useEffect, useRef } from "react";
import { RefreshCcw, Activity, ArrowRight } from "lucide-react";

/**
 * MetastabilityVisualizer
 * 
 * Simulations:
 * 1. Physics Analogy: Ball on a Hill.
 * 2. Circuit behavior: 2-FF Synchronizer.
 */
const MetastabilityVisualizer = () => {
    const [mode, setMode] = useState<'analogy' | 'circuit'>('analogy');

    // -- Physics State --
    const [ballPos, setBallPos] = useState(50); // 0 (left) to 100 (right). 50 is PEAK.
    const [isMetastable, setIsMetastable] = useState(false);
    const [settledValue, setSettledValue] = useState<0 | 1 | null>(null);

    // Trigger the simulation
    const triggerMetastability = () => {
        setBallPos(50);
        setIsMetastable(true);
        setSettledValue(null);

        // Random time to settle (simulating mean time between failures MTBF parameters)
        const settleTime = 1000 + Math.random() * 2000;
        const finalVal = Math.random() > 0.5 ? 1 : 0;

        setTimeout(() => {
            setIsMetastable(false);
            setSettledValue(finalVal);
            setBallPos(finalVal === 1 ? 90 : 10);
        }, settleTime);
    };

    // -- Render --
    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans select-none">

            {/* Mode Switch */}
            <div className="flex gap-2 mb-8 justify-center">
                <button
                    onClick={() => setMode('analogy')}
                    className={`px-4 py-2 rounded-lg font-bold transition-all ${mode === 'analogy' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
                >
                    Physics Analogy
                </button>
                <button
                    onClick={() => setMode('circuit')}
                    className={`px-4 py-2 rounded-lg font-bold transition-all ${mode === 'circuit' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
                >
                    Synchronizer Circuit
                </button>
            </div>

            {/* ANALOGY MODE */}
            {mode === 'analogy' && (
                <div className="flex flex-col items-center">
                    <div className="w-full h-64 bg-slate-900 rounded-xl relative overflow-hidden mb-6 shadow-inner flex items-end justify-center">

                        {/* The Hill (SVG) */}
                        <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
                            {/* Hill Shape */}
                            <path d="M0,256 Q150,256 300,50 T600,256 L600,256 L0,256" fill="#1e293b" className="text-slate-800" />
                            {/* Curve visualization */}
                            <path d="M0,200 Q250,200 320,50 T640,200" fill="none" stroke="#475569" strokeWidth="4" />
                        </svg>

                        {/* The Ball */}
                        <div
                            className={`w-8 h-8 rounded-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.8)] border-2 border-white absolute transition-all duration-300 ease-out z-10`}
                            style={{
                                bottom: isMetastable ? '180px' : '40px', // Hand-tuned for the visual curve approximation
                                left: isMetastable ? 'calc(50% - 16px)' : (settledValue === 1 ? '80%' : '20%'),
                                transform: isMetastable ? 'translateX(-2px)' : 'none',
                                animation: isMetastable ? 'wobble 0.1s infinite' : 'none'
                            }}
                        >
                            {/* Inner Shine */}
                            <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-50"></div>
                        </div>

                        {/* Labels */}
                        <div className="absolute bottom-4 left-10 text-slate-500 font-bold text-xl">Logic 0</div>
                        <div className="absolute bottom-4 right-10 text-slate-500 font-bold text-xl">Logic 1</div>
                        <div className="absolute top-10 text-slate-500 font-mono text-xs text-center">
                            METASTABLE STATE<br />(Undefined Voltage)
                        </div>

                    </div>

                    <div className="text-center space-y-4">
                        <p className="text-slate-600 max-w-md mx-auto">
                            When Setup/Hold is violated, the data gets stuck "on top of the hill". It can stay there for an indefinite amount of time before randomly falling to 0 or 1.
                        </p>
                        <button
                            onClick={triggerMetastability}
                            disabled={isMetastable}
                            className={`px-8 py-3 rounded-xl font-bold text-lg shadow-lg flex items-center gap-2 mx-auto transition-all ${isMetastable ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-rose-500 text-white hover:bg-rose-600 hover:scale-105'}`}
                        >
                            <Activity className="w-5 h-5" />
                            {isMetastable ? "System Failure..." : "Trigger Timing Violation"}
                        </button>
                    </div>

                    <style jsx>{`
                        @keyframes wobble {
                            0% { transform: translateX(-2px); }
                            50% { transform: translateX(2px); }
                            100% { transform: translateX(-2px); }
                        }
                    `}</style>
                </div>
            )}

            {/* CIRCUIT MODE */}
            {mode === 'circuit' && (
                <div className="flex flex-col items-center animate-in fade-in duration-300">

                    {/* Circuit Diagram */}
                    <div className="w-full bg-slate-100 p-8 rounded-xl border border-slate-300 mb-6 flex items-center justify-center gap-4 overflow-x-auto">

                        {/* Async Input */}
                        <div className="flex flex-col items-center">
                            <span className="font-bold text-slate-700 mb-2">Async Input</span>
                            <div className="w-16 h-1 bg-slate-400 relative">
                                <ArrowRight className="absolute -right-2 -top-2 text-slate-400 w-4 h-4" />
                            </div>
                        </div>

                        {/* FF 1 (Metastable) */}
                        <div className="relative group">
                            <div className="w-24 h-28 bg-rose-100 border-2 border-rose-400 rounded-lg flex flex-col items-center justify-center shadow-lg">
                                <span className="font-bold text-rose-800">FF 1</span>
                                <span className="text-[10px] text-rose-600 mt-1 center text-center px-1">Captures Glitch</span>
                            </div>
                            {/* Clock */}
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                <div className="h-4 w-0.5 bg-slate-400"></div>
                                <span className="text-xs font-mono text-slate-500">CLK</span>
                            </div>
                        </div>

                        {/* Interconnect */}
                        <div className="flex flex-col items-center w-24">
                            <span className="text-[10px] text-slate-500 bg-white px-2 py-1 rounded border mb-2">Wait 1 Cycle</span>
                            <div className="w-full h-1 bg-indigo-300 relative animate-pulse">
                                <ArrowRight className="absolute -right-2 -top-2 text-indigo-300 w-4 h-4" />
                            </div>
                        </div>

                        {/* FF 2 (Stable) */}
                        <div className="relative">
                            <div className="w-24 h-28 bg-emerald-100 border-2 border-emerald-400 rounded-lg flex flex-col items-center justify-center shadow-lg">
                                <span className="font-bold text-emerald-800">FF 2</span>
                                <span className="text-[10px] text-emerald-600 mt-1 center text-center px-1">Samples Stable</span>
                            </div>
                            {/* Clock */}
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                <div className="h-4 w-0.5 bg-slate-400"></div>
                                <span className="text-xs font-mono text-slate-500">CLK</span>
                            </div>
                        </div>

                        {/* Output */}
                        <div className="flex flex-col items-center ml-4">
                            <span className="font-bold text-slate-700 mb-2">Clean Output</span>
                            <div className="w-16 h-1 bg-emerald-400 relative">
                                <ArrowRight className="absolute -right-2 -top-2 text-emerald-400 w-4 h-4" />
                            </div>
                        </div>

                    </div>

                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 text-sm text-indigo-900 max-w-2xl">
                        <h4 className="font-bold mb-2 flex items-center gap-2">
                            <RefreshCcw className="w-4 h-4" /> The 2-FF Synchronizer
                        </h4>
                        <p>
                            1. <strong>FF 1</strong> catches the asynchronous signal. It might go metastable (wobble).
                            <br />
                            2. We give it <strong>one full clock cycle</strong> to settle down.
                            <br />
                            3. <strong>FF 2</strong> samples the output of FF 1. By this time, the wobble has stopped, and FF 2 sees a clean 0 or 1.
                        </p>
                    </div>

                </div>
            )}

        </div>
    );
};

export default MetastabilityVisualizer;
