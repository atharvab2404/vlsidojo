"use client";

import React, { useState } from "react";
import { ListOrdered, LayoutGrid, ArrowRight } from "lucide-react";

/**
 * PriorityVsParallelVisualizer
 * 
 * Demonstrates the hardware structure difference between if-else (Priority) 
 * and case statements (Parallel).
 */
const PriorityVsParallelVisualizer = () => {
    const [mode, setMode] = useState<'ifelse' | 'case'>('ifelse');

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans">

            {/* Controls */}
            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => setMode('ifelse')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-all font-bold ${mode === 'ifelse' ? 'border-amber-500 bg-amber-50 text-amber-800 shadow-md' : 'border-slate-200 bg-white text-slate-500 hover:border-amber-200'}`}
                >
                    <ListOrdered className="w-5 h-5" /> If-Else (Priority)
                </button>
                <button
                    onClick={() => setMode('case')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-all font-bold ${mode === 'case' ? 'border-indigo-500 bg-indigo-50 text-indigo-800 shadow-md' : 'border-slate-200 bg-white text-slate-500 hover:border-indigo-200'}`}
                >
                    <LayoutGrid className="w-5 h-5" /> Case (Parallel)
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* Code Window */}
                <div className="flex flex-col">
                    <div className="bg-slate-800 text-slate-400 text-xs px-4 py-2 rounded-t-lg border-b border-slate-700 font-mono">
                        decoder.v
                    </div>
                    <div className="bg-slate-900 p-6 rounded-b-lg overflow-x-auto min-h-[300px] font-mono text-sm text-sky-300 leading-relaxed shadow-inner">
                        {mode === 'ifelse' ? (
                            <>
                                <span className="text-pink-400">always</span> @(*) <span className="text-pink-400">begin</span><br />
                                &nbsp; <span className="text-pink-400">if</span> (sel_a) <br />
                                &nbsp; &nbsp; y = a;<br />
                                &nbsp; <span className="text-pink-400">else if</span> (sel_b) <br />
                                &nbsp; &nbsp; y = b;<br />
                                &nbsp; <span className="text-pink-400">else if</span> (sel_c) <br />
                                &nbsp; &nbsp; y = c;<br />
                                &nbsp; <span className="text-pink-400">else</span> <br />
                                &nbsp; &nbsp; y = d;<br />
                                <span className="text-pink-400">end</span>
                            </>
                        ) : (
                            <>
                                <span className="text-pink-400">always</span> @(*) <span className="text-pink-400">begin</span><br />
                                &nbsp; <span className="text-pink-400">case</span> (sel) <br />
                                &nbsp; &nbsp; 2'b00: y = a;<br />
                                &nbsp; &nbsp; 2'b01: y = b;<br />
                                &nbsp; &nbsp; 2'b10: y = c;<br />
                                &nbsp; &nbsp; 2'b11: y = d;<br />
                                &nbsp; <span className="text-pink-400">endcase</span><br />
                                <span className="text-pink-400">end</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Hardware Visualization */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">

                    <div className="absolute top-4 left-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Synthesized Hardware
                    </div>

                    {mode === 'ifelse' ? (
                        // PRIORITY CHAIN VISUALIZATION
                        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300 w-full px-4">
                            <div className="flex items-center gap-2 mb-8">
                                {/* Mux 1 */}
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-24 border-2 border-slate-700 bg-slate-50 relative flex items-center justify-center">
                                        <span className="text-xs font-bold">MUX</span>
                                        <div className="absolute -top-4 text-xs text-amber-600 font-bold">sel_a</div>
                                    </div>
                                </div>
                                <ArrowRight className="w-6 h-6 text-slate-300" />
                                {/* Mux 2 */}
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-24 border-2 border-slate-700 bg-slate-50 relative flex items-center justify-center">
                                        <span className="text-xs font-bold">MUX</span>
                                        <div className="absolute -top-4 text-xs text-amber-600 font-bold">sel_b</div>
                                    </div>
                                </div>
                                <ArrowRight className="w-6 h-6 text-slate-300" />
                                {/* Mux 3 */}
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-24 border-2 border-slate-700 bg-slate-50 relative flex items-center justify-center">
                                        <span className="text-xs font-bold">MUX</span>
                                        <div className="absolute -top-4 text-xs text-amber-600 font-bold">sel_c</div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full bg-amber-50 border border-amber-200 p-3 rounded text-sm text-center text-amber-900">
                                <strong className="block mb-1">Critical Path: High Delay 🐢</strong>
                                Signal 'd' must travel through 3 multiplexers to reach output.
                            </div>
                        </div>
                    ) : (
                        // PARALLEL MUX VISUALIZATION
                        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                            <div className="relative w-48 h-32 mb-8">
                                {/* Large Mux Trapezoid */}
                                <svg viewBox="0 0 200 120" className="w-full h-full drop-shadow-md">
                                    <path d="M 40 10 L 160 30 L 160 90 L 40 110 Z" fill="#eff6ff" stroke="#4f46e5" strokeWidth="2" />
                                    <text x="100" y="65" textAnchor="middle" fontSize="14" fill="#312e81" fontWeight="bold">4:1 MUX</text>

                                    {/* Inputs */}
                                    <line x1="10" y1="25" x2="40" y2="30" stroke="#94a3b8" strokeWidth="2" />
                                    <text x="0" y="28" fontSize="10" fill="#64748b">A</text>

                                    <line x1="10" y1="50" x2="40" y2="55" stroke="#94a3b8" strokeWidth="2" />
                                    <text x="0" y="53" fontSize="10" fill="#64748b">B</text>

                                    <line x1="10" y1="75" x2="40" y2="80" stroke="#94a3b8" strokeWidth="2" />
                                    <text x="0" y="78" fontSize="10" fill="#64748b">C</text>

                                    <line x1="10" y1="100" x2="40" y2="105" stroke="#94a3b8" strokeWidth="2" />
                                    <text x="0" y="103" fontSize="10" fill="#64748b">D</text>

                                    {/* Select */}
                                    <line x1="100" y1="120" x2="100" y2="100" stroke="#94a3b8" strokeWidth="2" />
                                    <text x="100" y="130" textAnchor="middle" fontSize="10" fill="#64748b">SEL[1:0]</text>

                                    {/* Output */}
                                    <line x1="160" y1="60" x2="200" y2="60" stroke="#94a3b8" strokeWidth="2" />
                                    <text x="180" y="55" fontSize="10" fill="#64748b">Y</text>
                                </svg>
                            </div>

                            <div className="w-full bg-indigo-50 border border-indigo-200 p-3 rounded text-sm text-center text-indigo-900">
                                <strong className="block mb-1">Critical Path: Low Delay 🐇</strong>
                                All inputs are equidistant from the output.
                            </div>
                        </div>
                    )}

                </div>

            </div>

            <div className="mt-6 p-4 rounded-lg bg-gray-100 border border-gray-200 text-sm text-gray-700">
                <p>
                    <strong>Concept:</strong> Priority logic checks conditions one by one (like a cascading waterfall). Parallel logic checks everything at once (like a wide highway).
                </p>
            </div>

        </div>
    );
};

export default PriorityVsParallelVisualizer;
