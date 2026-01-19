"use client";

import React, { useState } from "react";
import { Copy, Layers, Cpu, ArrowDown } from "lucide-react";

/**
 * LoopUnroller
 * 
 * Demonstrates how Verilog loops are 'unrolled' into parallel hardware.
 */
const LoopUnroller = () => {
    const [mode, setMode] = useState<'procedural' | 'generate'>('procedural');
    const iterations = 4;

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans">

            {/* Mode Switch */}
            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => setMode('procedural')}
                    className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-bold transition-all ${mode === 'procedural' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-500 border border-slate-200'}`}
                >
                    <Cpu className="w-4 h-4" /> Procedural Loop (Logic)
                </button>
                <button
                    onClick={() => setMode('generate')}
                    className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-bold transition-all ${mode === 'generate' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-500 border border-slate-200'}`}
                >
                    <Layers className="w-4 h-4" /> Generate Loop (Instances)
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* Code Input */}
                <div className="flex flex-col">
                    <div className="bg-slate-800 text-slate-400 text-xs px-4 py-2 rounded-t-lg border-b border-slate-700 font-mono">
                        source_code.v
                    </div>
                    <div className="bg-slate-900 p-6 rounded-b-lg overflow-x-auto min-h-[300px] font-mono text-sm text-sky-300 leading-relaxed shadow-inner">
                        {mode === 'procedural' ? (
                            <>
                                <span className="text-slate-500">// Bitwise Output Inversion</span><br />
                                <span className="text-pink-400">always</span> @(*) <span className="text-pink-400">begin</span><br />
                                &nbsp; <span className="text-pink-400">integer</span> i;<br />
                                &nbsp; <span className="text-pink-400">for</span> (i = 0; i &lt; 4; i = i + 1) <span className="text-pink-400">begin</span><br />
                                &nbsp; &nbsp; y[i] = ~a[i];<br />
                                &nbsp; <span className="text-pink-400">end</span><br />
                                <span className="text-pink-400">end</span>
                            </>
                        ) : (
                            <>
                                <span className="text-slate-500">// Array of AND Gates</span><br />
                                <span className="text-pink-400">genvar</span> i;<br />
                                <span className="text-pink-400">generate</span><br />
                                &nbsp; <span className="text-pink-400">for</span> (i = 0; i &lt; 4; i = i + 1) <span className="text-pink-400">begin</span> : u_block<br />
                                &nbsp; &nbsp; AND_GATE u_and (<br />
                                &nbsp; &nbsp; &nbsp; .a( a[i] ), <br />
                                &nbsp; &nbsp; &nbsp; .b( b[i] ), <br />
                                &nbsp; &nbsp; &nbsp; .y( y[i] )<br />
                                &nbsp; &nbsp; );<br />
                                &nbsp; <span className="text-pink-400">end</span><br />
                                <span className="text-pink-400">endgenerate</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Synthesis Output Visualization */}
                <div className="flex flex-col items-center justify-center relative">

                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden md:block">
                        <ArrowDown className="w-8 h-8 text-slate-300 -rotate-90" />
                    </div>

                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 w-full text-center">
                        Synthesizer "Unrolls" Data
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-6 w-full min-h-[300px] flex flex-col gap-3 shadow-sm overflow-hidden animate-in fade-in slide-in-from-left-4 duration-500">
                        {Array.from({ length: iterations }).map((_, i) => (
                            <div key={i} className={`p-3 rounded border flex items-center gap-3 animate-in slide-in-from-bottom-${i + 1} duration-700 delay-${i * 100} ${mode === 'procedural' ? 'bg-indigo-50 border-indigo-200' : 'bg-emerald-50 border-emerald-200'}`}>
                                <div className={`font-mono text-xs font-bold px-2 py-1 rounded text-white ${mode === 'procedural' ? 'bg-indigo-500' : 'bg-emerald-500'}`}>
                                    i={i}
                                </div>
                                <div className="font-mono text-sm text-slate-700">
                                    {mode === 'procedural' ? (
                                        <span>y[{i}] = ~a[{i}];</span>
                                    ) : (
                                        <span>u_block[{i}].u_and ( .a(a[{i}]), ... );</span>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div className="flex-1 border-t-2 border-slate-100 border-dashed mt-2"></div>
                        <div className="text-center text-xs text-slate-400 italic">
                            Result: 4 Copies in Parallel (NOT a time loop!)
                        </div>
                    </div>

                </div>

            </div>

            <div className="mt-6 p-4 rounded-lg bg-indigo-50 border border-indigo-200 text-sm text-indigo-900 flex items-start gap-3">
                <Copy className="w-5 h-5 shrink-0" />
                <p>
                    <strong>Key Insight:</strong> Verilog loops don't execute one by one over time (like C++ or Python). They exist only to tell the synthesizer to <strong>Copy & Paste</strong> the hardware logic N times.
                </p>
            </div>

        </div>
    );
};

export default LoopUnroller;
