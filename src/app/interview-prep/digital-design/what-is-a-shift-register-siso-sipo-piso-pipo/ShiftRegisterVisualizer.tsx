"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowDown, Play, RotateCcw, Download, Upload } from "lucide-react";

type Mode = "SISO" | "SIPO" | "PISO" | "PIPO";

const ShiftRegisterVisualizer = () => {
    const [mode, setMode] = useState<Mode>("SISO");
    const [register, setRegister] = useState<number[]>([0, 0, 0, 0]);
    const [serialIn, setSerialIn] = useState<number>(0);
    const [parallelIn, setParallelIn] = useState<number[]>([0, 0, 0, 0]);
    const [isAnimating, setIsAnimating] = useState(false);

    // Reset register when mode changes
    useEffect(() => {
        setRegister([0, 0, 0, 0]);
        setSerialIn(0);
        setIsAnimating(false);
    }, [mode]);

    const handleClock = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setRegister((prev) => {
                const next = [...prev];

                if (mode === "SISO" || mode === "SIPO") {
                    // Shift Right
                    next.pop();
                    next.unshift(serialIn);
                } else if (mode === "PIPO") {
                    // Parallel Load (Instant update on clock)
                    return [...parallelIn];
                } else if (mode === "PISO") {
                    // Shift Right standard, but has a "Load" switch usually. 
                    // For simplicity here, we'll implement PISO as: 
                    // Click 'Load' to load parallel data (async or sync), then Clock shifts it out.
                    // But strictly PISO usually has a Load/Shift control.
                    // Let's implement purely Shift behavior for the clock button here, 
                    // and a separate "Parallel Load" button for PISO/PIPO setup.

                    // If we are in Shift Mode for PISO:
                    next.pop();
                    next.unshift(serialIn); // Usually 0 or looping, let's inject SerialIn
                }

                return next;
            });
            setIsAnimating(false);
        }, 300); // Animation duration
    };

    const handleParallelLoad = () => {
        setRegister([...parallelIn]);
    };

    const toggleParallelBit = (index: number) => {
        const newIn = [...parallelIn];
        newIn[index] = newIn[index] === 0 ? 1 : 0;
        setParallelIn(newIn);
    };

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans">
            {/* Controls Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex gap-2 bg-white p-1 rounded-lg border border-slate-200">
                    {(["SISO", "SIPO", "PISO", "PIPO"] as Mode[]).map((m) => (
                        <button
                            key={m}
                            onClick={() => setMode(m)}
                            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${mode === m
                                    ? "bg-indigo-600 text-white shadow-md"
                                    : "text-slate-500 hover:bg-slate-100"
                                }`}
                        >
                            {m}
                        </button>
                    ))}
                </div>

                <div className="flex gap-3">
                    {/* Parallel Load Button (Visible for PISO/PIPO) */}
                    {(mode === "PISO" || mode === "PIPO") && (
                        <button
                            onClick={handleParallelLoad}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-lg hover:bg-emerald-200 font-bold transition-colors border border-emerald-200"
                        >
                            <Download className="w-4 h-4" />
                            Load Parallel Data
                        </button>
                    )}

                    <button
                        onClick={handleClock}
                        disabled={isAnimating}
                        className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-bold shadow-sm active:scale-95 transition-all disabled:opacity-50"
                    >
                        <Play className="w-4 h-4 fill-current" />
                        Trigger Clock
                    </button>

                    <button
                        onClick={() => setRegister([0, 0, 0, 0])}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                        title="Clear Register"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Main Visualizer Area */}
            <div className="relative flex flex-col items-center gap-12 py-8">

                {/* Parallel Inputs (Top) */}
                {(mode === "PIPO" || mode === "PISO") && (
                    <div className="flex gap-4 mb-2">
                        {parallelIn.map((bit, i) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                                <span className="text-xs font-mono text-slate-400">D{i}</span>
                                <button
                                    onClick={() => toggleParallelBit(i)}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm border-2 transition-colors ${bit === 1
                                            ? "bg-emerald-100 border-emerald-400 text-emerald-800"
                                            : "bg-white border-slate-300 text-slate-400"
                                        }`}
                                >
                                    {bit}
                                </button>
                                <ArrowDown className="w-4 h-4 text-emerald-400 mt-1" />
                            </div>
                        ))}
                    </div>
                )}

                {/* The Shift Register Chain */}
                <div className="flex items-center gap-2">
                    {/* Serial Input (Left) */}
                    {(mode === "SISO" || mode === "SIPO" || mode === "PISO") && (
                        <div className="flex items-center gap-2 mr-4">
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-xs font-bold text-slate-500 uppercase">Serial In</span>
                                <button
                                    onClick={() => setSerialIn(serialIn === 0 ? 1 : 0)}
                                    className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg border-2 shadow-sm transition-all ${serialIn === 1
                                            ? "bg-blue-100 border-blue-500 text-blue-700"
                                            : "bg-white border-slate-300 text-slate-400"
                                        }`}
                                >
                                    {serialIn}
                                </button>
                            </div>
                            <ArrowRight className={`w-6 h-6 text-slate-400 ${isAnimating ? "animate-pulse text-blue-500" : ""}`} />
                        </div>
                    )}

                    {/* Flip Flops */}
                    <div className="flex gap-4 p-4 bg-slate-200 rounded-xl border border-slate-300 shadow-inner">
                        {register.map((bit, i) => (
                            <div key={i} className="relative flex items-center">
                                {/* FF Box */}
                                <div className={`w-16 h-20 bg-white rounded-lg border-2 flex flex-col items-center justify-center shadow-sm relative transition-all duration-300 ${bit === 1 ? "border-indigo-500 shadow-indigo-100" : "border-slate-300"
                                    }`}>
                                    <span className="absolute top-1 left-2 text-[10px] text-slate-400 font-bold">D</span>
                                    <span className="absolute top-1 right-2 text-[10px] text-slate-400 font-bold">Q</span>
                                    <span className="absolute bottom-1 left-2 text-[10px] text-slate-400">CLK</span>

                                    <span className={`text-2xl font-bold ${bit === 1 ? "text-indigo-600" : "text-slate-300"}`}>
                                        {bit}
                                    </span>
                                </div>

                                {/* Arrow between FFs */}
                                {i < 3 && (
                                    <ArrowRight className={`w-6 h-6 mx-2 text-slate-400 transition-colors ${isAnimating ? "text-indigo-500" : ""}`} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Serial Output (Right) */}
                    {(mode === "SISO" || mode === "PISO") && (
                        <div className="flex items-center gap-2 ml-4">
                            <ArrowRight className={`w-6 h-6 text-slate-400 ${isAnimating ? "animate-pulse text-indigo-500" : ""}`} />
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-xs font-bold text-slate-500 uppercase">Serial Out</span>
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg border-2 transition-all ${register[3] === 1 // Last bit is usually the serial out
                                        ? "bg-indigo-100 border-indigo-500 text-indigo-700"
                                        : "bg-slate-100 border-slate-300 text-slate-300"
                                    }`}>
                                    {register[3]}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Parallel Outputs (Bottom) */}
                {(mode === "SIPO" || mode === "PIPO") && (
                    <div className="flex gap-20 mt-2 ml-4"> {/* Spacing hack to align with boxes */}
                        {register.map((bit, i) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                                <ArrowDown className={`w-4 h-4 mt-1 transition-colors ${bit === 1 ? "text-indigo-500" : "text-slate-300"}`} />
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm border-2 transition-colors ${bit === 1
                                        ? "bg-indigo-100 border-indigo-500 text-indigo-800"
                                        : "bg-slate-50 border-slate-200 text-slate-300"
                                    }`}>
                                    {bit}
                                </div>
                                <span className="text-xs font-mono text-slate-400">Q{i}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Explanation Footer */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-900">
                <strong>Current Mode: {mode}</strong>
                <p className="mt-1 opacity-90">
                    {mode === "SISO" && "Data enters serially from the left (one bit per clock) and exits serially from the right. Used for delays."}
                    {mode === "SIPO" && "Data enters serially, but all bits are available simultaneously at the outputs. Used for Serial-to-Parallel conversion."}
                    {mode === "PISO" && "Data is loaded in parallel (Load button), then shifted out serially. Used for Parallel-to-Serial conversion."}
                    {mode === "PIPO" && "Data is loaded in parallel and output in parallel. Acts as a simple storage register."}
                </p>
            </div>
        </div>
    );
};

export default ShiftRegisterVisualizer;
