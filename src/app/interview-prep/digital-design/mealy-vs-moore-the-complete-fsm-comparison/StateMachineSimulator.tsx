"use client";

import React, { useState, useEffect } from "react";
import { Play, RotateCcw, Zap, ArrowRight, MousePointerClick } from "lucide-react";

type Mode = "MEALY" | "MOORE";

const StateMachineSimulator = () => {
    const [mode, setMode] = useState<Mode>("MOORE");
    const [currentState, setCurrentState] = useState(0); // 0 or 1
    const [input, setInput] = useState(0);
    const [clockPulse, setClockPulse] = useState(false);

    // Calculate Output
    // Moore: Output depends ONLY on State. Let's say State 1 -> Output 1.
    // Mealy: Output depends on State AND Input. Let's say State 0 & Input 1 -> Output 1.
    const output = mode === "MOORE"
        ? (currentState === 1 ? 1 : 0)
        : (currentState === 0 && input === 1 ? 1 : 0);

    const handleClock = () => {
        setClockPulse(true);
        setTimeout(() => setClockPulse(false), 200);

        // State Transition Logic (Same for both for simplicity)
        // S0 + Input 1 -> S1
        // S1 + Input 0 -> S0
        setCurrentState(prev => {
            if (prev === 0 && input === 1) return 1;
            if (prev === 1 && input === 0) return 0;
            return prev;
        });
    };

    const reset = () => {
        setCurrentState(0);
        setInput(0);
    };

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans">
            {/* Header Controls */}
            <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
                <div className="flex bg-white p-1 rounded-lg border border-slate-300 shadow-sm">
                    {(["MOORE", "MEALY"] as Mode[]).map((m) => (
                        <button
                            key={m}
                            onClick={() => { setMode(m); reset(); }}
                            className={`px-4 py-2 rounded-md font-bold text-sm transition-all ${mode === m
                                    ? "bg-indigo-600 text-white shadow-md"
                                    : "text-slate-500 hover:text-indigo-600"
                                }`}
                        >
                            {m} Machine
                        </button>
                    ))}
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setInput(prev => prev === 0 ? 1 : 0)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-mono font-bold transition-all ${input === 1
                                ? "bg-green-100 border-green-400 text-green-800"
                                : "bg-slate-100 border-slate-300 text-slate-400"
                            }`}
                    >
                        <MousePointerClick className="w-4 h-4" />
                        Input: {input}
                    </button>

                    <button
                        onClick={handleClock}
                        className="flex items-center gap-2 px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 font-bold active:scale-95 transition-all"
                    >
                        <Play className="w-4 h-4 fill-current" />
                        Pulse Clock
                    </button>
                </div>
            </div>

            {/* Diagram Area */}
            <div className="relative h-64 bg-white rounded-xl border border-slate-200 mb-6 flex items-center justify-center overflow-hidden">
                {/* Visualizing Edges */}
                <div className="absolute inset-0 flex items-center justify-center gap-32">

                    {/* S0 Node */}
                    <div className={`relative transition-all duration-300 z-10 ${currentState === 0 ? "scale-110" : "scale-100 opacity-60"
                        }`}>
                        <div className={`w-24 h-24 rounded-full flex flex-col items-center justify-center border-4 shadow-lg transition-colors ${currentState === 0 ? "border-indigo-600 bg-indigo-50" : "border-slate-300 bg-white"
                            }`}>
                            <span className="font-bold text-xl text-slate-800">S0</span>
                            {mode === "MOORE" && (
                                <span className="text-xs bg-slate-200 px-2 py-0.5 rounded-full mt-1">Out: 0</span>
                            )}
                        </div>
                    </div>

                    {/* S1 Node */}
                    <div className={`relative transition-all duration-300 z-10 ${currentState === 1 ? "scale-110" : "scale-100 opacity-60"
                        }`}>
                        <div className={`w-24 h-24 rounded-full flex flex-col items-center justify-center border-4 shadow-lg transition-colors ${currentState === 1 ? "border-indigo-600 bg-indigo-50" : "border-slate-300 bg-white"
                            }`}>
                            <span className="font-bold text-xl text-slate-800">S1</span>
                            {mode === "MOORE" && (
                                <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full mt-1 font-bold">Out: 1</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Arrows (Simplistic Overlay) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                        </marker>
                    </defs>
                    {/* Arrow S0 -> S1 (Input 1) */}
                    <path d="M 330 110 Q 400 60 470 110" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    {/* Arrow S1 -> S0 (Input 0) */}
                    <path d="M 470 146 Q 400 196 330 146" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />

                    {/* Text Labels on Arrows */}
                    <text x="400" y="80" textAnchor="middle" className="text-xs fill-slate-500 font-mono bg-white">Input=1 {mode === "MEALY" ? "/ Out=1" : ""}</text>
                    <text x="400" y="180" textAnchor="middle" className="text-xs fill-slate-500 font-mono">Input=0 {mode === "MEALY" ? "/ Out=0" : ""}</text>
                </svg>

                {/* Mealy Glitch visualization: Shows active path if Mealy */}
                {mode === "MEALY" && currentState === 0 && input === 1 && (
                    <div className="absolute top-[80px] left-1/2 -translate-x-1/2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs border border-yellow-300 font-bold animate-pulse">
                        Mealy Output Active!
                    </div>
                )}
            </div>

            {/* Output Dashboard */}
            <div className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${output === 1 ? "bg-green-50 border-green-300" : "bg-white border-slate-200"}`}>
                <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full shadow-inner ${output === 1 ? "bg-green-500 animate-pulse ring-2 ring-green-200" : "bg-slate-300"}`}></div>
                    <span className="font-bold text-slate-700 uppercase tracking-wider">System Output (Y)</span>
                </div>
                <div className="text-right">
                    <span className="block text-2xl font-mono font-bold text-slate-800">{output}</span>
                </div>
            </div>

            {/* Explanation Box */}
            <div className="mt-6 text-sm text-slate-600 bg-indigo-50/50 p-4 rounded-lg border border-indigo-100">
                <strong className="text-indigo-900 block mb-1">Observation:</strong>
                {mode === "MOORE" ? (
                    <p>
                        In <strong>Moore</strong>, toggle the Input. Notice the Output DOES NOT change immediately.
                        It only changes when you click <strong>Pulse Clock</strong> and the state actually updates to S1.
                        <br />
                        <span className="text-xs mt-1 block text-slate-500">Output depends ONLY on Current State.</span>
                    </p>
                ) : (
                    <p>
                        In <strong>Mealy</strong>, toggle the Input while in S0. Notice the Output changes <strong>INSTANTLY</strong>!
                        You don't need to wait for the clock. This makes Mealy faster but can cause temporary "glitches" if input is noisy.
                        <br />
                        <span className="text-xs mt-1 block text-slate-500">Output depends on Current State AND Input.</span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default StateMachineSimulator;
