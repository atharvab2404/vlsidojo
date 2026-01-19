"use client";

import React, { useState, useEffect, useRef } from "react";
import { Activity, ArrowRight, ShieldCheck, AlertTriangle } from "lucide-react";

/**
 * DomainBridge (CDC Visualizer)
 * 
 * Simulates passing a signal from Domain A (Fast) to Domain B (Slow).
 * - Shows the risk of "missing" a fast pulse if sampling is slow.
 * - Shows the risk of metastability if sampling near an edge.
 * - Toggle: Enable 2-FF Synchronizer to safely capture the signal.
 */
const DomainBridge = () => {
    // State
    const [useSynchronizer, setUseSynchronizer] = useState(false);
    const [isSimulating, setIsSimulating] = useState(false);

    // Status
    const [status, setStatus] = useState<"IDLE" | "SENDING" | "CAPTURED" | "MISSED" | "METASTABLE">("IDLE");

    // Simulation Config
    // Domain A (Launch): High Freq
    // Domain B (Capture): Variable (slower/asynchronous)

    const runSimulation = () => {
        if (isSimulating) return;
        setIsSimulating(true);
        setStatus("SENDING");

        // Simulation parameters
        // Pulse width vs Capture window

        // Random chance of failure without sync
        const roll = Math.random();

        setTimeout(() => {
            if (useSynchronizer) {
                // With 2-FF Sync, we always safely capture (adding latency)
                setTimeout(() => {
                    setStatus("CAPTURED");
                    setIsSimulating(false);
                }, 1500); // 2 cycle latency
            } else {
                // Without Sync:
                // 30% Chance: Missed (Pulse too short / Setup violation)
                // 30% Chance: Metastable (Sampled exactly on edge)
                // 40% Chance: Lucky Capture
                if (roll < 0.3) {
                    setStatus("MISSED");
                } else if (roll < 0.6) {
                    setStatus("METASTABLE");
                } else {
                    setStatus("CAPTURED");
                }
                setIsSimulating(false);
            }
        }, 1000); // Transmission time
    };

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans select-none">

            {/* Header */}
            <div className="text-center mb-8">
                <h3 className="text-lg font-bold text-slate-700 flex items-center justify-center gap-2">
                    <Activity className="w-5 h-5 text-indigo-600" /> The Domain Bridge
                </h3>
                <p className="text-sm text-slate-500 mt-2">
                    Crossing from <strong>Clk_A (Fast)</strong> to <strong>Clk_B (Slow/Async)</strong>.
                </p>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4 mb-10">
                <button
                    onClick={() => setUseSynchronizer(!useSynchronizer)}
                    className={`px-4 py-2 rounded-full font-bold text-sm border transition-all flex items-center gap-2 ${useSynchronizer ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'bg-slate-100 border-slate-300 text-slate-500 hover:bg-slate-200'}`}
                >
                    {useSynchronizer ? <ShieldCheck className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-400"></div>}
                    {useSynchronizer ? "Synchronizer ENABLED" : "Synchronizer DISABLED"}
                </button>

                <button
                    onClick={runSimulation}
                    disabled={isSimulating}
                    className={`px-6 py-2 rounded-full font-bold text-sm shadow-md transition-all ${isSimulating ? 'bg-slate-300 text-slate-500' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                >
                    {isSimulating ? "Transmitting..." : "Send Pulse"}
                </button>
            </div>

            {/* Diagram */}
            <div className="relative h-40 bg-white rounded-xl border border-slate-200 overflow-hidden mb-8 grid grid-cols-2">

                {/* Domain A */}
                <div className="border-r border-dashed border-slate-300 bg-indigo-50/30 flex flex-col items-center justify-center relative p-4">
                    <span className="absolute top-2 left-2 text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Domain A (Launch)</span>
                    <div className={`w-12 h-12 rounded bg-indigo-500 flex items-center justify-center text-white font-bold transition-transform ${status === 'SENDING' ? 'scale-110 shadow-lg' : ''}`}>
                        D
                    </div>
                </div>

                {/* Domain B */}
                <div className="bg-emerald-50/30 flex flex-col items-center justify-center relative p-4">
                    <span className="absolute top-2 right-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Domain B (Capture)</span>

                    {/* Synchronizer Chain Visual */}
                    {useSynchronizer ? (
                        <div className="flex items-center gap-1">
                            <div className={`w-8 h-8 rounded bg-emerald-300 flex items-center justify-center text-[10px] font-bold text-emerald-900 border border-emerald-500 ${isSimulating ? 'animate-pulse' : ''}`}>FF1</div>
                            <ArrowRight className="w-4 h-4 text-emerald-400" />
                            <div className={`w-8 h-8 rounded bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-white shadow-md`}>FF2</div>
                        </div>
                    ) : (
                        <div className={`w-12 h-12 rounded border-2 flex items-center justify-center font-bold transition-colors ${status === 'METASTABLE' ? 'bg-rose-500 text-white border-rose-600 animate-pulse' :
                                status === 'MISSED' ? 'bg-slate-200 text-slate-400 border-dashed border-slate-400' :
                                    status === 'CAPTURED' ? 'bg-emerald-500 text-white border-emerald-600' :
                                        'bg-slate-100 text-slate-300 border-slate-200'
                            }`}>
                            {status === 'METASTABLE' ? "?" : status === 'MISSED' ? "X" : status === 'CAPTURED' ? "D" : "-"}
                        </div>
                    )}

                </div>

                {/* Signal Arrow */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${isSimulating ? 'opacity-100 translate-x-4' : 'opacity-0 -translate-x-12'}`}>
                    <ArrowRight className="w-8 h-8 text-slate-400" />
                </div>

            </div>

            {/* Results Display */}
            <div className="h-20 flex items-center justify-center">
                {status === 'METASTABLE' && (
                    <div className="flex items-center gap-2 text-rose-600 font-bold bg-rose-50 px-4 py-2 rounded-lg border border-rose-200 animate-bounce">
                        <AlertTriangle className="w-5 h-5" /> Metastability Detected! Signal unknown.
                    </div>
                )}
                {status === 'MISSED' && (
                    <div className="text-slate-500 font-bold bg-slate-100 px-4 py-2 rounded-lg border border-slate-200">
                        Pulse Missed (Setup Violation / Capture too slow)
                    </div>
                )}
                {status === 'CAPTURED' && (
                    <div className="flex items-center gap-2 text-emerald-600 font-bold bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-200">
                        <ShieldCheck className="w-5 h-5" /> Signal Successfully Captured
                        {useSynchronizer && <span className="text-xs font-normal text-emerald-500 ml-1">(+2 Cycles Latency)</span>}
                    </div>
                )}
                {status === 'IDLE' && (
                    <span className="text-sm text-slate-400">Ready to transmit.</span>
                )}
                {status === 'SENDING' && (
                    <span className="text-sm text-indigo-500 font-bold animate-pulse">Transmitting signal...</span>
                )}
            </div>

        </div>
    );
};

export default DomainBridge;
