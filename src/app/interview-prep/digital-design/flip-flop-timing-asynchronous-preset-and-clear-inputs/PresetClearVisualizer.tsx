"use client";

import React, { useState, useEffect } from "react";
import { Play, RotateCcw, Zap, AlertCircle } from "lucide-react";

const PresetClearVisualizer = () => {
    const [dInput, setDInput] = useState(0);
    const [qOutput, setQOutput] = useState(0);
    const [preset, setPreset] = useState(1); // Active Low (1 = inactive)
    const [clear, setClear] = useState(1);   // Active Low (1 = inactive)
    const [clockState, setClockState] = useState(0);
    const [message, setMessage] = useState("Ready. Toggle Inputs or Pulse Clock.");

    // Effect: Handle Async Logic (Immediate, independent of clock)
    useEffect(() => {
        if (preset === 0 && clear === 1) {
            setQOutput(1);
            setMessage("PRESET (Async) forced Q to 1. Clock ignored.");
        } else if (clear === 0 && preset === 1) {
            setQOutput(0);
            setMessage("CLEAR (Async) forced Q to 0. Clock ignored.");
        } else if (preset === 0 && clear === 0) {
            setQOutput(1); // Usually unstable, but often 1 or 1*
            setMessage("INVALID STATE! Both Preset & Clear active (0). Avoid this.");
        } else {
            // Both inactive (1, 1). Normal operation awaits clock.
            setMessage("Async inputs inactive. Waiting for Clock Edge...");
        }
    }, [preset, clear]);

    const handleClockEdge = () => {
        // Toggle Clock Visual
        setClockState(1);
        setTimeout(() => setClockState(0), 300);

        // Logic
        if (preset === 0 || clear === 0) {
            // Async overrides Sync
            return;
        }

        // Normal D-FF behavior on edge
        setQOutput(dInput);
        setMessage(`Clock Edge! Captured D=${dInput}.`);
    };

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans">
            <div className="flex flex-col md:flex-row gap-12 items-center justify-center">

                {/* Inputs Control Panel */}
                <div className="flex flex-col gap-6">
                    {/* Async Controls */}
                    <div className="bg-amber-100 p-4 rounded-xl border border-amber-200">
                        <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                            <Zap className="w-4 h-4 fill-current" />
                            Async Inputs (Active Low)
                        </h4>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setPreset(preset === 0 ? 1 : 0)}
                                className={`px-4 py-2 rounded-lg font-mono font-bold transition-all border-2 ${preset === 0
                                        ? "bg-red-500 border-red-700 text-white shadow-inner"
                                        : "bg-white border-amber-300 text-amber-900 hover:bg-amber-50"
                                    }`}
                            >
                                PRE' = {preset}
                            </button>
                            <button
                                onClick={() => setClear(clear === 0 ? 1 : 0)}
                                className={`px-4 py-2 rounded-lg font-mono font-bold transition-all border-2 ${clear === 0
                                        ? "bg-red-500 border-red-700 text-white shadow-inner"
                                        : "bg-white border-amber-300 text-amber-900 hover:bg-amber-50"
                                    }`}
                            >
                                CLR' = {clear}
                            </button>
                        </div>
                    </div>

                    {/* Sync Controls */}
                    <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
                        <h4 className="font-bold text-indigo-900 mb-2">Synchronous Inputs</h4>
                        <div className="flex gap-4 items-center">
                            <button
                                onClick={() => setDInput(dInput === 0 ? 1 : 0)}
                                className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg border-2 transition-all ${dInput === 1
                                        ? "bg-indigo-500 border-indigo-700 text-white"
                                        : "bg-white border-indigo-200 text-gray-400"
                                    }`}
                            >
                                {dInput}
                            </button>
                            <span className="text-sm font-bold text-indigo-800">D Input</span>
                        </div>

                        <button
                            onClick={handleClockEdge}
                            disabled={preset === 0 || clear === 0}
                            className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-bold shadow-sm transition-all ${preset === 0 || clear === 0
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                                    : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"
                                }`}
                        >
                            <Play className="w-4 h-4 fill-current" />
                            Pulse Clock (CLK)
                        </button>
                    </div>
                </div>

                {/* Flip Flop Visual */}
                <div className="relative w-48 h-56 bg-white rounded-xl border-4 border-gray-800 shadow-xl flex flex-col items-center justify-center">
                    {/* Top Preset */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <div className={`w-1 h-6 ${preset === 0 ? "bg-red-500" : "bg-gray-300"}`}></div>
                        <div className={`w-3 h-3 rounded-full border-2 border-gray-800 bg-white -mb-1.5 z-10 ${preset === 0 ? "bg-red-100" : ""}`}></div>
                        <span className="text-xs font-bold mt-1 text-gray-500">PRE'</span>
                    </div>

                    {/* Bottom Clear */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col-reverse items-center">
                        <div className={`w-1 h-6 ${clear === 0 ? "bg-red-500" : "bg-gray-300"}`}></div>
                        <div className={`w-3 h-3 rounded-full border-2 border-gray-800 bg-white -mt-1.5 z-10 ${clear === 0 ? "bg-red-100" : ""}`}></div>
                        <span className="text-xs font-bold mb-1 text-gray-500">CLR'</span>
                    </div>

                    {/* Left Inputs */}
                    <div className="absolute left-0 top-1/3 -translate-x-full pr-2 flex items-center">
                        <span className="mr-2 font-bold text-indigo-700">D={dInput}</span>
                        <div className="w-8 h-1 bg-indigo-500"></div>
                    </div>
                    <div className="absolute left-0 bottom-1/3 -translate-x-full pr-2 flex items-center">
                        <div className={`w-8 h-1 transition-colors ${clockState ? "bg-indigo-500" : "bg-gray-300"}`}></div>
                        {/* Clock Triangle */}
                        <div className="absolute left-0 w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-gray-800 border-b-[6px] border-b-transparent"></div>
                    </div>

                    {/* Right Output */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full pl-2 flex items-center">
                        <div className={`w-12 h-1 transition-colors ${qOutput === 1 ? "bg-emerald-500" : "bg-gray-300"}`}></div>
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-4 transition-all ${qOutput === 1
                                ? "bg-emerald-100 border-emerald-500 text-emerald-700 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                                : "bg-slate-100 border-slate-300 text-slate-400"
                            }`}>
                            {qOutput}
                        </div>
                    </div>

                    <span className="text-5xl font-black text-gray-100 select-none">D-FF</span>
                </div>
            </div>

            {/* Status Message */}
            <div className={`mt-8 p-4 rounded-lg border flex items-center gap-3 transition-colors ${preset === 0 || clear === 0
                    ? "bg-red-50 border-red-200 text-red-900"
                    : "bg-blue-50 border-blue-200 text-blue-900"
                }`}>
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{message}</span>
            </div>
        </div>
    );
};

export default PresetClearVisualizer;
