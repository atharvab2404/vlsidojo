"use client";

import React, { useState } from "react";
import { Play, RotateCcw, ArrowRight, Download, Upload, FastForward } from "lucide-react";

/**
 * Parallel Load Counter Visualizer
 * Demonstrates a 4-bit synchronous counter with a MUX-based Load control.
 */
const ParallelLoadCounterVisualizer = () => {
    const [count, setCount] = useState(0);
    const [inputData, setInputData] = useState(10); // Default to '1010'
    const [isLoadMode, setIsLoadMode] = useState(false); // 0 = Count, 1 = Load
    const [clockPulse, setClockPulse] = useState(false);

    // Derived Bits for Display
    const countBits = [
        (count >> 3) & 1,
        (count >> 2) & 1,
        (count >> 1) & 1,
        count & 1
    ]; // MSB -> LSB

    const inputBits = [
        (inputData >> 3) & 1,
        (inputData >> 2) & 1,
        (inputData >> 1) & 1,
        inputData & 1
    ];

    const toggleInputBit = (idx: number) => {
        // idx 0 is MSB in our display array (bit 3)
        // bitPos = 3 - idx
        const bitPos = 3 - idx;
        const mask = 1 << bitPos;
        setInputData(prev => prev ^ mask);
    };

    const handleClock = () => {
        setClockPulse(true);
        setTimeout(() => setClockPulse(false), 200);

        if (isLoadMode) {
            // LOAD: D = Input
            setCount(inputData);
        } else {
            // COUNT: D = Q + 1
            setCount(prev => (prev + 1) % 16);
        }
    };

    const handleReset = () => {
        setCount(0);
    };

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans">

            {/* Control Panel */}
            <div className="flex flex-wrap justify-between items-end mb-8 gap-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">

                {/* Parallel Input Switches */}
                <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Parallel Input (P3..P0)</span>
                    <div className="flex gap-2">
                        {inputBits.map((bit, i) => (
                            <button
                                key={i}
                                onClick={() => toggleInputBit(i)}
                                className={`w-10 h-14 rounded border-2 flex flex-col items-center justify-end pb-2 font-mono font-bold transition-all ${bit === 1
                                        ? "bg-indigo-100 border-indigo-500 text-indigo-700 translate-y-0"
                                        : "bg-slate-100 border-slate-300 text-slate-400 translate-y-1"
                                    }`}
                            >
                                {bit}
                                <span className="text-[10px] opacity-50 font-sans">
                                    {i === 0 ? "MSB" : i === 3 ? "LSB" : ""}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mode Switch */}
                <div className="flex flex-col gap-2 items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Control Signal</span>
                    <button
                        onClick={() => setIsLoadMode(!isLoadMode)}
                        className={`px-4 py-2 rounded-full font-bold text-sm border-2 flex items-center gap-2 transition-all w-40 justify-center ${isLoadMode
                                ? "bg-amber-100 border-amber-500 text-amber-800 shadow-inner"
                                : "bg-emerald-100 border-emerald-500 text-emerald-800 shadow-md"
                            }`}
                    >
                        {isLoadMode ? (
                            <>
                                <Download className="w-4 h-4" /> LOAD
                            </>
                        ) : (
                            <>
                                <FastForward className="w-4 h-4" /> COUNT
                            </>
                        )}
                    </button>
                </div>

                {/* Clock & Reset */}
                <div className="flex gap-2">
                    <button
                        onClick={handleClock}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-900 font-bold active:scale-95 transition-all shadow-lg"
                    >
                        <Play className="w-5 h-5 fill-current" />
                        Pulse Clock
                    </button>
                    <button
                        onClick={handleReset}
                        className="p-3 bg-white border border-slate-300 text-slate-500 rounded-lg hover:bg-slate-100 transition-colors"
                        title="Reset to 0"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Circuit Visualization */}
            <div className="relative bg-slate-900 rounded-xl p-8 overflow-hidden min-h-[200px] flex items-center justify-center gap-4">

                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                </div>

                {/* Data Path Animations */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* If Load Mode, show flow from Input to Count */}
                    {isLoadMode && (
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 text-amber-400 text-xs font-mono font-bold animate-pulse">
                            MUX Selects Parallel Input
                        </div>
                    )}
                    {!isLoadMode && (
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 text-emerald-400 text-xs font-mono font-bold animate-pulse">
                            MUX Selects Next Count (Q+1)
                        </div>
                    )}
                </div>

                {/* Counter Output Display */}
                <div className="flex gap-4 items-center z-10">
                    <div className="text-slate-400 font-mono text-sm rotate-180" style={{ writingMode: "vertical-rl" }}>
                        OUTPUT Q
                    </div>
                    {countBits.map((bit, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <div className={`w-16 h-20 rounded-lg border-2 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center text-3xl font-bold font-mono transition-all duration-200 ${bit === 1
                                    ? "bg-indigo-600 border-indigo-400 text-white shadow-[0_0_20px_rgba(79,70,229,0.5)]"
                                    : "bg-slate-800 border-slate-600 text-slate-600"
                                }`}>
                                {bit}
                            </div>
                            <span className="text-xs text-slate-500 font-mono">Q{3 - i}</span>
                        </div>
                    ))}
                    <div className="ml-4 text-center">
                        <div className="text-4xl font-black text-white">{count}</div>
                        <div className="text-xs text-slate-500 uppercase mt-1">Decimal</div>
                    </div>
                </div>

            </div>

            {/* Logical Explanation */}
            <div className={`mt-6 p-4 rounded-lg text-sm border text-center transition-colors ${isLoadMode
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : "bg-emerald-50 text-emerald-800 border-emerald-200"
                }`}>
                <strong>Next State Logic:</strong>
                <br />
                {isLoadMode
                    ? <span>Q(next) = <span className="font-bold underline">Parallel Input ({inputData})</span>. The generic "Count Logic" is ignored.</span>
                    : <span>Q(next) = <span className="font-bold underline">Current Count + 1 ({(count + 1) % 16})</span>. The Parallel Input is ignored.</span>
                }
            </div>
        </div>
    );
};

export default ParallelLoadCounterVisualizer;
