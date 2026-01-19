"use client";

import React, { useState, useEffect } from "react";
import { Play, RotateCcw, Repeat, Link as LinkIcon, AlertTriangle, ArrowRight } from "lucide-react";

type Type = "RING" | "JOHNSON";

const RingJohnsonVisualizer = () => {
    const [type, setType] = useState<Type>("RING");
    const [bits, setBits] = useState([1, 0, 0, 0]); // Init State
    const [isRunning, setIsRunning] = useState(false);

    // Initial setups logic
    const reset = () => {
        setIsRunning(false);
        if (type === "RING") {
            setBits([1, 0, 0, 0]); // Start with one hot
        } else {
            setBits([0, 0, 0, 0]); // Start with all zeros
        }
    };

    // Auto-switch bits on type change
    useEffect(() => {
        reset();
    }, [type]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setBits(prev => {
                    // Current Outline: [Q0, Q1, Q2, Q3]
                    // Shift Right: New Q0 needs to be determined.
                    // Wait, standard convention:
                    // D1 = Q0, D2 = Q1...
                    // So we are shifting RIGHT in array terms?
                    // Let's say array index 0 is Q0 (Left).
                    // Next State:
                    // Q1_new = Q0_old
                    // Q2_new = Q1_old
                    // Q3_new = Q2_old
                    // Q0_new = Feedback

                    const lastBit = prev[3]; // Q3
                    let feedback = 0;

                    if (type === "RING") {
                        feedback = lastBit; // Q3 -> D0
                    } else {
                        feedback = lastBit === 0 ? 1 : 0; // Q3' -> D0
                    }

                    return [feedback, prev[0], prev[1], prev[2]];
                });
            }, 800);
        }
        return () => clearInterval(interval);
    }, [isRunning, type]);

    const getValue = () => {
        // Just interpret as binary derived from Q3..Q0
        // But visual order is Q0..Q3 usually
        return 0; // Not really useful number here
    };

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans">
            <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                <div className="flex bg-white p-1 rounded-lg border border-slate-300 shadow-sm">
                    {(["RING", "JOHNSON"] as Type[]).map((t) => (
                        <button
                            key={t}
                            onClick={() => setType(t)}
                            className={`px-4 py-2 rounded-md font-bold text-sm transition-all flex items-center gap-2 ${type === t
                                ? "bg-indigo-600 text-white shadow-md"
                                : "text-slate-500 hover:text-indigo-600"
                                }`}
                        >
                            {t === "RING" ? <Repeat className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
                            {t} Counter
                        </button>
                    ))}
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setIsRunning(!isRunning)}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all ${isRunning
                            ? "bg-amber-100 text-amber-800 border-amber-300"
                            : "bg-indigo-600 text-white hover:bg-indigo-700"
                            }`}
                    >
                        <Play className="w-4 h-4 fill-current" />
                        {isRunning ? "Pause" : "Start"}
                    </button>
                    <button
                        onClick={reset}
                        className="p-2 bg-white border border-slate-300 text-slate-500 rounded-lg hover:bg-slate-100"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Circular Visualization */}
            <div className="relative h-64 bg-slate-900 rounded-xl flex items-center justify-center overflow-hidden shadow-inner">
                {/* Connection Ring */}
                <div className={`absolute w-48 h-48 border-4 border-dashed rounded-full opacity-30 animate-[spin_10s_linear_infinite] ${type === "RING" ? "border-emerald-500" : "border-pink-500"
                    }`}></div>

                {/* Feedback Path Label */}
                <div className="absolute top-4 font-mono text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-700">
                    Feedback: {type === "RING" ? "Q3 → D0" : "Q3' → D0 (Twisted)"}
                </div>

                {/* Nodes */}
                {/* Position them in a circle */}
                {[0, 1, 2, 3].map((i) => {
                    const angle = (i * 90) - 90; // Top, Right, Bottom, Left
                    // Wait, standard circle: 0 deg is Right.
                    // Let's manually place them for clarity:
                    // Q0: Top-Left, Q1: Top-Right, Q2: Bottom-Right, Q3: Bottom-Left?
                    // No, let's do a linear chain that wraps back visually, simpler to follow shift.

                    return null;
                })}

                <div className="flex gap-4 items-center relative z-10 p-8 border-2 border-slate-700 rounded-full bg-slate-800/80 backdrop-blur-sm">
                    {bits.map((val, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            {/* Arrow between them */}
                            {i > 0 && <ArrowRight className="text-slate-600 w-4 h-4" />}

                            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg transition-all duration-300 border-4 ${val === 1
                                ? "bg-indigo-500 border-indigo-300 text-white scale-110 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                                : "bg-slate-700 border-slate-600 text-slate-500 scale-100"
                                }`}>
                                {val}
                            </div>
                            <span className="text-xs font-mono text-slate-400">Q{i}</span>
                        </div>
                    ))}
                </div>

                {/* Feedback Arrow Visual */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* Curve from Q3 to Q0 */}
                    <path d="M 450 150 Q 300 300 150 150" fill="none" stroke={type === "RING" ? "#10b981" : "#ec4899"} strokeWidth="2" strokeDasharray="5,5" className="animate-pulse opacity-50" />
                    {/* Label */}
                    <text x="300" y="240" textAnchor="middle" fill={type === "RING" ? "#10b981" : "#ec4899"} fontSize="12" fontWeight="bold">
                        {type === "RING" ? "DIRECT" : "INVERTED"}
                    </text>
                </svg>
            </div>

            {/* State Analysis */}
            <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <h4 className="font-bold text-slate-700 text-sm mb-2">Current State (Binary)</h4>
                    <div className="font-mono text-2xl text-slate-800 tracking-widest">
                        {bits.join(" ")}
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <h4 className="font-bold text-slate-700 text-sm mb-2">Used States</h4>
                    <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-indigo-600">{type === "RING" ? "4" : "8"}</span>
                        <span className="text-xs text-slate-500">(Total Possible: 16)</span>
                    </div>
                </div>
            </div>

            {type === "RING" && bits.every(b => b === 0) && (
                <div className="mt-4 bg-red-100 text-red-800 p-3 rounded flex items-center gap-2 text-sm border border-red-200">
                    <AlertTriangle className="w-5 h-5" />
                    <strong>Crash!</strong> A Ring Counter needs an initial '1' to work. If it hits '0000', it stops forever.
                </div>
            )}
        </div>
    );
};

export default RingJohnsonVisualizer;
