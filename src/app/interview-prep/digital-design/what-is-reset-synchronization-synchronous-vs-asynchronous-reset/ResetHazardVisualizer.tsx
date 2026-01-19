"use client";

import React, { useState } from "react";
import { Play, RotateCcw, AlertTriangle, ShieldCheck, Zap } from "lucide-react";

const ResetHazardVisualizer = () => {
    // 0 = Async Reset (Unsafe), 1 = Sync Reset Bridge (Safe)
    const [mode, setMode] = useState<"UNSAFE" | "SAFE">("UNSAFE");

    // Simulation States
    const [isPlaying, setIsPlaying] = useState(false);
    const [hazardOccurred, setHazardOccurred] = useState(false);

    // Let's envision a waveform animation.
    // Clock: Square wave.
    // Reset: Goes Low (Asserts), then High (Deasserts).
    // The "Deassertion" is the critical moment.

    // Visualize "Danger Zone" around Clock Rising Edge.

    const handleSimulate = () => {
        setIsPlaying(true);
        setHazardOccurred(false);

        // Simulating chaos
        setTimeout(() => {
            if (mode === "UNSAFE") {
                // In unsafe mode, we released reset right at the clock edge!
                setHazardOccurred(true);
            } else {
                // In safe mode, the synchronizer aligns it. No Hazard.
                setHazardOccurred(false);
            }
            setIsPlaying(false);
        }, 2000);
    };

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans">
            <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                <div className="flex bg-white p-1 rounded-lg border border-slate-300 shadow-sm">
                    <button
                        onClick={() => setMode("UNSAFE")}
                        className={`px-4 py-2 rounded-md font-bold text-sm transition-all flex items-center gap-2 ${mode === "UNSAFE"
                                ? "bg-red-100 text-red-700 border border-red-200 shadow-sm"
                                : "text-slate-500 hover:text-red-600"
                            }`}
                    >
                        <AlertTriangle className="w-4 h-4" /> Raw Async Reset
                    </button>
                    <button
                        onClick={() => setMode("SAFE")}
                        className={`px-4 py-2 rounded-md font-bold text-sm transition-all flex items-center gap-2 ${mode === "SAFE"
                                ? "bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm"
                                : "text-slate-500 hover:text-emerald-600"
                            }`}
                    >
                        <ShieldCheck className="w-4 h-4" /> Reset Synchronizer
                    </button>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handleSimulate}
                        disabled={isPlaying}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all ${isPlaying
                                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                                : "bg-indigo-600 text-white hover:bg-indigo-700"
                            }`}
                    >
                        <Play className="w-4 h-4 fill-current" />
                        {isPlaying ? "Simulating..." : "Test " + (mode === "UNSAFE" ? "Crash" : "Protection")}
                    </button>
                </div>
            </div>

            {/* Visual Area */}
            <div className="relative bg-white border border-slate-200 rounded-xl h-72 p-6 flex flex-col justify-center gap-8 overflow-hidden">

                {/* 1. Clock Signal */}
                <div className="relative h-12 flex items-center">
                    <div className="w-20 text-xs font-bold text-slate-500 uppercase text-right pr-4">CLK</div>
                    <div className="flex-1 h-full relative border-b border-slate-100">
                        {/* Static Clock Wave: Up/Down Pattern */}
                        <svg className="absolute top-0 left-0 w-full h-full" preserveAspectRatio="none">
                            <path d="M 0 40 L 50 40 L 50 0 L 100 0 L 100 40 L 150 40 L 150 0 L 200 0 L 200 40 L 250 40 L 250 0 L 300 0 L 300 40"
                                fill="none" stroke="#64748b" strokeWidth="2" />

                            {/* Danger Zones (Setup/Hold) around rising edges (50, 150, 250) */}
                            {[50, 150, 250].map(x => (
                                <rect key={x} x={x - 10} y="0" width="20" height="40" fill="red" opacity="0.1" />
                            ))}
                        </svg>
                        <div className="absolute top-0 right-0 text-[10px] text-red-300 font-bold p-1">Danger Zone (Setup/Hold)</div>
                    </div>
                </div>

                {/* 2. Reset Signal (The Input) */}
                <div className="relative h-12 flex items-center">
                    <div className="w-20 text-xs font-bold text-slate-500 uppercase text-right pr-4">RST_IN</div>
                    <div className="flex-1 h-full relative border-b border-slate-100">
                        {/* Animated Reset Line */}
                        <div className={`absolute left-0 h-full border-t-2 border-indigo-500 transition-all duration-[2000ms] ease-linear w-full ${isPlaying ? "translate-x-full" : "-translate-x-full"}`}></div>
                        {/* We simulate 'Deassertion' (Going High) happening AT a Clock Edge */}

                        {/* For visualization, let's just place a static 'event' marker that moves */}
                        <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-indigo-600 transition-all duration-[2000ms] ease-linear ${isPlaying ? "left-[150px]" : "left-0"}`}>
                            {/* This dot represents the transition edge */}
                        </div>
                        <div className="absolute top-0 left-[150px] h-full w-0.5 bg-indigo-300 border-l border-dashed"></div>
                        <span className="absolute top-0 left-[160px] text-xs text-indigo-500 font-bold">Reset Release</span>
                    </div>
                </div>

                {/* 3. System Status (Result) */}
                <div className="relative h-12 flex items-center bg-slate-50 rounded border border-slate-100 mt-4 px-4">
                    <span className="font-bold text-slate-700 mr-4">System State:</span>

                    {isPlaying ? (
                        <span className="text-slate-500 italic">Running...</span>
                    ) : (
                        hazardOccurred ? (
                            <div className="flex items-center gap-2 text-red-600 font-bold animate-pulse">
                                <Zap className="w-5 h-5" /> METASTABILITY! (System Crashed)
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-emerald-600 font-bold">
                                <ShieldCheck className="w-5 h-5" /> Stable. {mode === "SAFE" ? "(Synchronizer caught the glitch)" : "(Lucky timing... usually)"}
                            </div>
                        )
                    )}
                </div>

                {mode === "SAFE" && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-100/90 p-4 rounded-lg border-2 border-emerald-400 text-center shadow-lg backdrop-blur-sm">
                        <h4 className="font-bold text-emerald-900">Synchronizer Active</h4>
                        <p className="text-xs text-emerald-800">The "Double Flip-Flop" grabs the asynchronous reset and re-aligns it to the clock, ensuring it never hits the Logic Cloud during the danger zone.</p>
                    </div>
                )}
            </div>

            <div className="mt-6 text-sm text-slate-600 leading-relaxed">
                <strong>The Scenario:</strong> You pull your finger off the Reset button.
                <br />
                If that happens exactly nanoseconds before the Clock ticks (The Danger Zone), the Flip-Flops don't know whether to reset or run.
                <br />
                {mode === "UNSAFE"
                    ? <span className="text-red-600 font-bold">Without protection, the system enters an unknown random state.</span>
                    : <span className="text-emerald-600 font-bold">The Reset Synchronizer circuit forces the signal to wait for the NEXT clock cycle, guaranteeing safety.</span>
                }
            </div>
        </div>
    );
};

export default ResetHazardVisualizer;
