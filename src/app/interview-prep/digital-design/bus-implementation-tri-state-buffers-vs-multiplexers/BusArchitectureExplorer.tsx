"use client";

import React, { useState } from "react";
import { Zap, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";

/**
 * BusArchitectureExplorer
 * 
 * Visualizes Tri-State vs Mux-based bus architecture.
 * Shows "Contention" error when multiple tri-state drivers are active.
 */
const BusArchitectureExplorer = () => {
    const [mode, setMode] = useState<'tristate' | 'mux'>('tristate');
    // Driver Enables for Tri-State
    const [enA, setEnA] = useState(false);
    const [enB, setEnB] = useState(false);
    // Select for Mux
    const [sel, setSel] = useState(0);

    // Contention Detection
    const contention = mode === 'tristate' && enA && enB;
    const floating = mode === 'tristate' && !enA && !enB;

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans">

            {/* Mode Switch */}
            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => setMode('tristate')}
                    className={`px-4 py-2 rounded text-sm font-bold transition-all ${mode === 'tristate' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-500 border border-slate-200'}`}
                >
                    Tri-State Logic (Legacy/IO)
                </button>
                <button
                    onClick={() => setMode('mux')}
                    className={`px-4 py-2 rounded text-sm font-bold transition-all ${mode === 'mux' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-500 border border-slate-200'}`}
                >
                    Multiplexer Logic (On-Chip)
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* Controls Area */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
                        <h3 className="font-bold text-slate-700 mb-4 uppercase text-xs tracking-wider">Driver Controls</h3>

                        {mode === 'tristate' ? (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200">
                                    <span className="font-mono text-sm font-bold text-slate-600">Driver A Enable</span>
                                    <button
                                        onClick={() => setEnA(!enA)}
                                        className={`w-12 h-6 rounded-full p-1 transition-colors ${enA ? 'bg-emerald-500' : 'bg-slate-300'}`}
                                    >
                                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${enA ? 'translate-x-6' : 'translate-x-0'}`} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200">
                                    <span className="font-mono text-sm font-bold text-slate-600">Driver B Enable</span>
                                    <button
                                        onClick={() => setEnB(!enB)}
                                        className={`w-12 h-6 rounded-full p-1 transition-colors ${enB ? 'bg-emerald-500' : 'bg-slate-300'}`}
                                    >
                                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${enB ? 'translate-x-6' : 'translate-x-0'}`} />
                                    </button>
                                </div>
                                <p className="text-xs text-slate-500 mt-2">
                                    Enable both to see what happens ("Contention").
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <span className="block text-sm text-slate-600 mb-2">Select Active Source:</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setSel(0)}
                                        className={`flex-1 py-2 rounded font-bold transition-all border ${sel === 0 ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-white border-slate-200 text-slate-400'}`}
                                    >
                                        Source A
                                    </button>
                                    <button
                                        onClick={() => setSel(1)}
                                        className={`flex-1 py-2 rounded font-bold transition-all border ${sel === 1 ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-white border-slate-200 text-slate-400'}`}
                                    >
                                        Source B
                                    </button>
                                </div>
                                <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1 font-bold">
                                    <CheckCircle className="w-3 h-3" /> Impossible to crash!
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Circuit Visualization */}
                <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 relative flex flex-col items-center justify-center min-h-[300px]">

                    {contention && (
                        <div className="absolute inset-0 bg-rose-500/20 z-10 animate-pulse flex items-center justify-center pointer-events-none rounded-xl">
                            <div className="bg-rose-600 text-white px-6 py-3 rounded-full font-black shadow-lg flex items-center gap-2 animate-bounce">
                                <Zap className="w-6 h-6 fill-white" /> SHORT CIRCUIT!
                            </div>
                        </div>
                    )}

                    {mode === 'tristate' ? (
                        <div className="relative w-full h-full flex flex-col items-center justify-center gap-8">
                            {/* The Bus Line */}
                            <div className={`w-2 h-40 transition-colors ${contention ? 'bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.6)]' : floating ? 'bg-slate-700 dashed border-2 border-slate-500' : 'bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.4)]'}`}></div>

                            {/* Driver A */}
                            <div className="absolute top-[10%] -left-4 md:left-4 flex items-center">
                                <div className="text-white font-mono text-xs mr-2">Val: 1</div>
                                <div className={`w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-b-[10px] border-b-transparent transition-colors ${enA ? 'border-l-emerald-400' : 'border-l-slate-600'}`}></div>
                                <div className={`h-0.5 w-12 transition-colors ${enA ? 'bg-emerald-400' : 'bg-slate-700'}`}></div>
                            </div>

                            {/* Driver B */}
                            <div className="absolute top-[50%] -right-4 md:right-4 flex items-center flex-row-reverse">
                                <div className="text-white font-mono text-xs ml-2">Val: 0</div>
                                <div className={`w-0 h-0 border-t-[10px] border-t-transparent border-r-[20px] border-b-[10px] border-b-transparent transition-colors ${enB ? 'border-r-emerald-400' : 'border-r-slate-600'}`}></div>
                                <div className={`h-0.5 w-12 transition-colors ${enB ? 'bg-emerald-400' : 'bg-slate-700'}`}></div>
                            </div>

                            {/* Status Text */}
                            <div className="absolute bottom-4 text-xs font-mono font-bold">
                                {contention ? <span className="text-rose-400">STATUS: CONTENTION (X)</span> :
                                    floating ? <span className="text-yellow-400">STATUS: HIGH-Z (Z)</span> :
                                        <span className="text-emerald-400">STATUS: DRIVING {enA ? '1' : '0'}</span>}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            {/* Mux Graphic */}
                            <div className="relative w-32 h-24 mb-4">
                                <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-lg">
                                    <path d="M 20 10 L 80 25 L 80 55 L 20 70 Z" fill="#1e293b" stroke="#6366f1" strokeWidth="2" />
                                    <text x="50" y="45" textAnchor="middle" fontSize="10" fill="#818cf8" fontWeight="bold">MUX</text>

                                    {/* Input A */}
                                    <line x1="0" y1="20" x2="20" y2="25" stroke={sel === 0 ? "#34d399" : "#475569"} strokeWidth={sel === 0 ? 3 : 1} />
                                    <text x="5" y="15" fontSize="8" fill="#cbd5e1">A</text>

                                    {/* Input B */}
                                    <line x1="0" y1="60" x2="20" y2="55" stroke={sel === 1 ? "#34d399" : "#475569"} strokeWidth={sel === 1 ? 3 : 1} />
                                    <text x="5" y="65" fontSize="8" fill="#cbd5e1">B</text>

                                    {/* Output */}
                                    <line x1="80" y1="40" x2="100" y2="40" stroke="#34d399" strokeWidth="3" />
                                </svg>
                            </div>
                            <div className="text-emerald-400 font-mono text-sm font-bold">
                                Output: {sel === 0 ? "Source A" : "Source B"}
                            </div>
                        </div>
                    )}
                </div>

            </div>

            <div className={`mt-6 p-4 rounded-lg border text-sm ${contention ? 'bg-rose-100 border-rose-300 text-rose-900' : 'bg-slate-100 border-slate-200 text-slate-700'}`}>
                {contention ? (
                    <p className="flex items-center gap-2 font-bold">
                        <AlertTriangle className="w-5 h-5" />
                        DANGER: Driver A is pulling voltage UP, Driver B is pulling DOWN. Massive current flows. Chip burns out.
                    </p>
                ) : (
                    <p>
                        {mode === 'tristate' ? "Tri-state buses rely on careful timing to ensure only one driver is active at a time. If both overlap -> Smoke." : "Multiplexers inherently prevent contention. You simply select which data flows."}
                    </p>
                )}
            </div>

        </div>
    );
};

export default BusArchitectureExplorer;
