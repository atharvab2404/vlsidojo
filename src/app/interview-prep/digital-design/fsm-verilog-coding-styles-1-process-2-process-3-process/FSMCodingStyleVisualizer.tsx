"use client";

import React, { useState } from "react";
import { Box, ArrowRight, Database, GitMerge, FileCode } from "lucide-react";

/**
 * FSMCodingStyleVisualizer
 * 
 * Demonstrates the architectural difference between 1, 2, and 3 process FSMs.
 */
const FSMCodingStyleVisualizer = () => {
    const [style, setStyle] = useState<1 | 2 | 3>(2);

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans">

            {/* Style Switcher */}
            <div className="flex justify-center gap-2 mb-8">
                <button
                    onClick={() => setStyle(1)}
                    className={`px-4 py-2 rounded-lg border font-bold transition-all ${style === 1 ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                >
                    1-Process (Single)
                </button>
                <button
                    onClick={() => setStyle(2)}
                    className={`px-4 py-2 rounded-lg border font-bold transition-all ${style === 2 ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                >
                    2-Process (Standard)
                </button>
                <button
                    onClick={() => setStyle(3)}
                    className={`px-4 py-2 rounded-lg border font-bold transition-all ${style === 3 ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                >
                    3-Process (Modular)
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* Code Skeleton */}
                <div className="flex flex-col">
                    <div className="bg-slate-800 text-slate-400 text-xs px-4 py-2 rounded-t-lg border-b border-slate-700 font-mono flex items-center gap-2">
                        <FileCode className="w-4 h-4" /> fsm_style_{style}.v
                    </div>
                    <div className="bg-slate-900 p-6 rounded-b-lg overflow-x-auto min-h-[350px] font-mono text-sm text-sky-300 leading-relaxed shadow-inner">
                        {style === 1 && (
                            <>
                                <span className="text-slate-500">// 1. Single Process: Logic + Registers + Output</span><br />
                                <span className="text-pink-400">always</span> @(<span className="text-yellow-400">posedge clk</span>) <span className="text-pink-400">begin</span><br />
                                &nbsp; <span className="text-pink-400">case</span> (state)<br />
                                &nbsp; &nbsp; S0: <span className="text-pink-400">begin</span><br />
                                &nbsp; &nbsp; &nbsp; out &lt;= 0;<br />
                                &nbsp; &nbsp; &nbsp; <span className="text-pink-400">if</span>(in) state &lt;= S1;<br />
                                &nbsp; &nbsp; <span className="text-pink-400">end</span><br />
                                &nbsp; <span className="text-pink-400">endcase</span><br />
                                <span className="text-pink-400">end</span>
                            </>
                        )}
                        {style === 2 && (
                            <>
                                <span className="text-slate-500">// 2a. Sequential Block: Memory</span><br />
                                <span className="text-pink-400">always</span> @(<span className="text-yellow-400">posedge clk</span>) <span className="text-pink-400">begin</span><br />
                                &nbsp; current_state &lt;= next_state;<br />
                                <span className="text-pink-400">end</span><br /><br />

                                <span className="text-slate-500">// 2b. Combinational Block: Next State + Output</span><br />
                                <span className="text-pink-400">always</span> @(*) <span className="text-pink-400">begin</span><br />
                                &nbsp; next_state = current_state;<br />
                                &nbsp; out = 0;<br />
                                &nbsp; <span className="text-pink-400">case</span> (current_state) ... <span className="text-pink-400">endcase</span><br />
                                <span className="text-pink-400">end</span>
                            </>
                        )}
                        {style === 3 && (
                            <>
                                <span className="text-slate-500">// 3a. Sequential Block: Memory</span><br />
                                <span className="text-pink-400">always</span> @(<span className="text-yellow-400">posedge clk</span>) ...<br /><br />

                                <span className="text-slate-500">// 3b. Combinational Block: Next State Logic</span><br />
                                <span className="text-pink-400">always</span> @(*) <span className="text-pink-400">begin</span><br />
                                &nbsp; <span className="text-slate-500">// Calculate next_state only</span><br />
                                <span className="text-pink-400">end</span><br /><br />

                                <span className="text-slate-500">// 3c. Combinational Block: Output Logic</span><br />
                                <span className="text-pink-400">always</span> @(*) <span className="text-pink-400">begin</span><br />
                                &nbsp; <span className="text-slate-500">// Calculate output only</span><br />
                                <span className="text-pink-400">end</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Block Diagram Visualization */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col items-center justify-center min-h-[350px]">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8 w-full text-center">
                        Structure Diagram
                    </div>

                    <div className="flex gap-4 items-center animate-in fade-in zoom-in duration-300">
                        {style === 1 && (
                            <div className="w-48 h-48 bg-indigo-100 border-2 border-indigo-500 rounded-xl flex flex-col items-center justify-center shadow-lg relative">
                                <span className="font-bold text-indigo-800">1 GIANT BLOCK</span>
                                <span className="text-xs text-indigo-600 text-center px-4 mt-2">Registers + Next State Logic + Output Logic Mixed</span>
                                <div className="absolute top-2 right-2 text-indigo-400"><Database className="w-5 h-5" /></div>
                            </div>
                        )}

                        {style === 2 && (
                            <>
                                <div className="flex flex-col gap-4">
                                    <div className="w-40 h-24 bg-amber-100 border-2 border-amber-500 rounded-lg flex flex-col items-center justify-center shadow-md">
                                        <span className="font-bold text-amber-900">COMB Logic</span>
                                        <span className="text-[10px] text-amber-700">Next State + Output</span>
                                        <GitMerge className="w-4 h-4 text-amber-600 mt-1" />
                                    </div>
                                    <ArrowDown className="w-6 h-6 text-slate-300 self-center" />
                                    <div className="w-40 h-16 bg-blue-100 border-2 border-blue-500 rounded-lg flex flex-col items-center justify-center shadow-md">
                                        <span className="font-bold text-blue-900">SEQ Logic</span>
                                        <span className="text-[10px] text-blue-700">State Registers</span>
                                        <Database className="w-4 h-4 text-blue-600 mt-1" />
                                    </div>
                                </div>
                                <div className="h-32 w-2 border-l-2 border-dashed border-slate-300 mx-2"></div>
                                <div className="text-xs text-slate-400 italic w-24">Feedback Loop (Next &rarr; Curr)</div>
                            </>
                        )}

                        {style === 3 && (
                            <div className="grid grid-cols-2 gap-4">
                                {/* Next State Logic */}
                                <div className="col-span-1 w-32 h-20 bg-amber-50 border border-amber-300 rounded flex flex-col items-center justify-center">
                                    <span className="text-xs font-bold text-amber-800">Next State Logic</span>
                                </div>

                                {/* Output Logic */}
                                <div className="col-span-1 w-32 h-20 bg-emerald-50 border border-emerald-300 rounded flex flex-col items-center justify-center">
                                    <span className="text-xs font-bold text-emerald-800">Output Logic</span>
                                </div>

                                {/* State Registers */}
                                <div className="col-span-2 w-full h-16 bg-blue-50 border-2 border-blue-400 rounded flex flex-col items-center justify-center mt-2">
                                    <span className="text-sm font-bold text-blue-800">State Registers (SEQ)</span>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

            </div>

            <div className="mt-6 p-4 rounded-lg bg-gray-100 border border-gray-200 text-sm text-gray-700">
                {style === 1 ? (
                    <p><strong>Pros:</strong> Very compact. <strong>Cons:</strong> Hard to debug. Can be confusing to read since logic and memory are mixed.</p>
                ) : style === 2 ? (
                    <p><strong>Pros:</strong> <span className="text-emerald-600 font-bold">Standard Choice.</span> Better readability. Separates combinational decisions from sequential updates.</p>
                ) : (
                    <p><strong>Pros:</strong> Modular. Output logic is clearly separated. Good for Moore machines. <strong>Cons:</strong> More verbosity.</p>
                )}
            </div>

        </div>
    );
};

// Helper icon
const ArrowDown = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
);

export default FSMCodingStyleVisualizer;
