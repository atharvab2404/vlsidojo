"use client";

import React, { useState } from "react";
import { AlertCircle, CheckCircle, Unlock, Lock } from "lucide-react";

/**
 * CombVsLatchAnalyzer
 * 
 * Demonstrates the most common error in Verilog Procedural Combinational Logic:
 * Inferred Latches due to incomplete assignment.
 */
const CombVsLatchAnalyzer = () => {
    const [hasElse, setHasElse] = useState(true);

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans">

            <div className="grid md:grid-cols-2 gap-8">

                {/* Code Window */}
                <div className="flex flex-col">
                    <div className="bg-slate-800 text-slate-400 text-xs px-4 py-2 rounded-t-lg border-b border-slate-700 font-mono">
                        mux_logic.v
                    </div>
                    <div className="bg-slate-900 p-6 rounded-b-lg overflow-x-auto min-h-[250px] relative">
                        <pre className="font-mono text-sm text-sky-300 leading-relaxed">
                            <span className="text-pink-400">always</span> @(*) <span className="text-pink-400">begin</span><br />
                            &nbsp; <span className="text-pink-400">if</span> (sel) <span className="text-pink-400">begin</span><br />
                            &nbsp; &nbsp; y = a;<br />
                            &nbsp; <span className="text-pink-400">end</span>
                            <div className={`transition-all duration-300 overflow-hidden ${hasElse ? 'max-h-20 opacity-100' : 'max-h-0 opacity-50'}`}>
                                <span className="text-pink-400">  else begin</span><br />
                                &nbsp; &nbsp; y = b;<br />
                                <span className="text-pink-400">  end</span>
                            </div>
                            <span className="text-pink-400">end</span>
                        </pre>

                        {/* Toggle Button Overlaid */}
                        <div className="absolute right-4 top-[50%] -translate-y-[50%] flex flex-col items-center gap-2">
                            <button
                                onClick={() => setHasElse(!hasElse)}
                                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-lg ${hasElse ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-rose-500 text-white hover:bg-rose-600'}`}
                            >
                                {hasElse ? "Remove ELSE" : "Add ELSE"}
                            </button>
                            <span className="text-[10px] text-slate-500 font-bold bg-white/10 px-2 py-0.5 rounded">
                                Try it!
                            </span>
                        </div>
                    </div>
                </div>

                {/* Synthesis Result Window */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden transition-colors duration-500">

                    <div className="absolute top-4 left-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Synthesis Result
                    </div>

                    {hasElse ? (
                        // COMBINATIONAL MUX
                        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                            <div className="relative w-32 h-24">
                                {/* Mux Trapezoid */}
                                <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-md">
                                    <path d="M 20 10 L 80 25 L 80 55 L 20 70 Z" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
                                    <text x="50" y="45" textAnchor="middle" fontSize="10" fill="#1e40af" fontWeight="bold">MUX</text>

                                    {/* Inputs */}
                                    <line x1="0" y1="20" x2="20" y2="25" stroke="#94a3b8" strokeWidth="2" />
                                    <text x="5" y="18" fontSize="8" fill="#64748b">A</text>

                                    <line x1="0" y1="60" x2="20" y2="55" stroke="#94a3b8" strokeWidth="2" />
                                    <text x="5" y="68" fontSize="8" fill="#64748b">B</text>

                                    {/* Output */}
                                    <line x1="80" y1="40" x2="100" y2="40" stroke="#94a3b8" strokeWidth="2" />
                                    <text x="90" y="35" fontSize="8" fill="#64748b">Y</text>
                                </svg>
                            </div>

                            <div className="mt-4 flex items-center gap-2 text-emerald-600 font-bold px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                                <CheckCircle className="w-4 h-4" /> Combinational Circuit
                            </div>
                        </div>
                    ) : (
                        // INFERRED LATCH
                        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                            <div className="relative w-24 h-24 border-2 border-rose-500 bg-rose-50 rounded flex items-center justify-center shadow-lg">
                                <div className="absolute top-1 left-2 text-[10px] font-bold text-rose-300">D</div>
                                <div className="absolute bottom-1 left-2 text-[10px] font-bold text-rose-300">EN</div>
                                <div className="absolute top-1 right-2 text-[10px] font-bold text-rose-300">Q</div>
                                <Lock className="w-8 h-8 text-rose-500" />
                                <div className="absolute -bottom-6 w-full text-center text-[10px] font-bold text-rose-500 uppercase">
                                    Transparent Latch
                                </div>
                            </div>

                            <div className="mt-8 flex items-center gap-2 text-rose-600 font-bold px-3 py-1 bg-rose-50 rounded-full border border-rose-100 animate-pulse">
                                <AlertCircle className="w-4 h-4" /> Inferred Latch Warning!
                            </div>
                        </div>
                    )}

                </div>

            </div>

            <div className={`mt-6 p-4 rounded-lg text-sm border-l-4 transition-colors duration-300 ${hasElse ? 'bg-blue-50 border-blue-400 text-blue-900' : 'bg-amber-50 border-amber-500 text-amber-900'}`}>
                {hasElse ? (
                    <p>
                        <strong>Perfect!</strong> Because <strong>y</strong> is assigned a value in ALL possible paths (if and else), the synthesizer creates a MUX. The output depends ONLY on current inputs.
                    </p>
                ) : (
                    <p>
                        <strong>Memory Created:</strong> When <code>sel</code> is 0, what is <code>y</code>? Verilog assumes it must <strong>keep its previous value</strong>. To remember the past, hardware needs storage (a Latch). This is bad for combinational paths.
                    </p>
                )}
            </div>

        </div>
    );
};

export default CombVsLatchAnalyzer;
