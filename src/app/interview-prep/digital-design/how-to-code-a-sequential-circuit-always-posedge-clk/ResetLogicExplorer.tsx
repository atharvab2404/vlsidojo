"use client";

import React, { useState, useEffect } from "react";
import { Zap, Activity, Power } from "lucide-react";

/**
 * ResetLogicExplorer
 * 
 * Visualizes Sync vs Async reset in Verilog.
 */
const ResetLogicExplorer = () => {
    const [resetStyle, setResetStyle] = useState<'async' | 'sync'>('async');
    const [dInput, setDInput] = useState(1);
    const [resetInput, setResetInput] = useState(0); // 0 = Inactive, 1 = Active (Asserted)
    const [qOutput, setQOutput] = useState(0);
    const [triggerAnimation, setTriggerAnimation] = useState(false);

    // Effect to handle Async Reset immediately
    useEffect(() => {
        if (resetStyle === 'async' && resetInput === 1) {
            setQOutput(0);
        }
    }, [resetStyle, resetInput]);

    const handleClockEdge = () => {
        setTriggerAnimation(true);
        setTimeout(() => setTriggerAnimation(false), 300);

        if (resetStyle === 'async') {
            if (resetInput === 1) {
                setQOutput(0);
            } else {
                setQOutput(dInput);
            }
        } else {
            // Sync Reset: Only checked at clock edge!
            if (resetInput === 1) {
                setQOutput(0);
            } else {
                setQOutput(dInput);
            }
        }
    };

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans">

            {/* Controls */}
            <div className="flex justify-center mb-8 bg-white p-2 rounded-lg border border-slate-200 shadow-sm inline-flex">
                <button
                    onClick={() => setResetStyle('async')}
                    className={`px-4 py-2 rounded text-sm font-bold transition-all ${resetStyle === 'async' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    Asynchronous Reset
                </button>
                <button
                    onClick={() => setResetStyle('sync')}
                    className={`px-4 py-2 rounded text-sm font-bold transition-all ${resetStyle === 'sync' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    Synchronous Reset
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* Code Window */}
                <div className="flex flex-col">
                    <div className="bg-slate-800 text-slate-400 text-xs px-4 py-2 rounded-t-lg border-b border-slate-700 font-mono flex items-center gap-2">
                        d_ff.v
                    </div>
                    <div className="bg-slate-900 p-6 rounded-b-lg overflow-x-auto min-h-[250px] font-mono text-sm text-sky-300 leading-relaxed">
                        {resetStyle === 'async' ? (
                            <>
                                <span className="text-pink-400">always</span> @(<span className="text-yellow-400">posedge clk</span> or <span className="text-yellow-400">posedge rst</span>) <span className="text-pink-400">begin</span><br />
                                &nbsp; <span className="text-pink-400">if</span> (rst) <span className="text-slate-500">// Check RST first!</span><br />
                                &nbsp; &nbsp; q {"<="} 0;<br />
                                &nbsp; <span className="text-pink-400">else</span><br />
                                &nbsp; &nbsp; q {"<="} d;<br />
                                <span className="text-pink-400">end</span>
                            </>
                        ) : (
                            <>
                                <span className="text-pink-400">always</span> @(<span className="text-yellow-400">posedge clk</span>) <span className="text-pink-400">begin</span><br />
                                <span className="text-slate-500 select-none opacity-50 block mb-1"> // No rst in sensitivity list!</span>
                                &nbsp; <span className="text-pink-400">if</span> (rst) <span className="text-slate-500">// Check RST only at CLK edge</span><br />
                                &nbsp; &nbsp; q {"<="} 0;<br />
                                &nbsp; <span className="text-pink-400">else</span><br />
                                &nbsp; &nbsp; q {"<="} d;<br />
                                <span className="text-pink-400">end</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Simulation Controls */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-6 relative">

                    <div className="absolute top-4 left-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Interactive Testbench
                    </div>

                    <div className="mt-8 flex flex-col gap-4">
                        {/* D Input */}
                        <div className="flex items-center justify-between bg-slate-50 p-3 rounded border border-slate-200">
                            <span className="font-bold text-slate-700">D (Data)</span>
                            <button
                                onClick={() => setDInput(dInput === 0 ? 1 : 0)}
                                className={`w-12 h-6 rounded-full p-1 transition-colors ${dInput === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${dInput === 1 ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        {/* Reset Input */}
                        <div className="flex items-center justify-between bg-slate-50 p-3 rounded border border-slate-200">
                            <span className="font-bold text-slate-700 flex items-center gap-2">
                                <Power className="w-4 h-4" /> RST (Reset)
                            </span>
                            <button
                                onClick={() => setResetInput(resetInput === 0 ? 1 : 0)}
                                className={`w-12 h-6 rounded-full p-1 transition-colors ${resetInput === 1 ? 'bg-rose-500' : 'bg-slate-300'}`}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${resetInput === 1 ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        {/* Clock Button */}
                        <button
                            onClick={handleClockEdge}
                            className={`mt-2 py-3 rounded-lg font-bold text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-2
                                ${triggerAnimation ? 'bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'}
                            `}
                        >
                            <Activity className={`w-5 h-5 ${triggerAnimation ? 'animate-ping' : ''}`} />
                            Apply Clock Edge (posedge)
                        </button>

                        {/* Output Display */}
                        <div className="mt-4 flex flex-col items-center">
                            <div className="text-xs text-slate-500 uppercase font-bold mb-2">Q Output</div>
                            <div className={`w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-black shadow-inner transition-all duration-300
                                ${qOutput === 1 ? 'bg-emerald-100 text-emerald-600 border-4 border-emerald-500' : 'bg-slate-100 text-slate-400 border-4 border-slate-300'}
                             `}>
                                {qOutput}
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div className="mt-6 p-4 rounded-lg bg-indigo-50 border border-indigo-200 text-sm text-indigo-900">
                {resetStyle === 'async' ? (
                    <p>
                        <strong>Try this:</strong> Set <strong>RST</strong> to ON. Notice Q drops to 0 <i>immediately</i>, without pressing Clock. That's <strong>Asynchronous</strong>. The flip-flop clears the moment reset arrives.
                    </p>
                ) : (
                    <p>
                        <strong>Try this:</strong> Set <strong>RST</strong> to ON. Notice Q <strong>stays unchanged</strong> until you press "Apply Clock Edge". That's <strong>Synchronous</strong>. The reset is just another data input sampled at the clock edge.
                    </p>
                )}
            </div>

        </div>
    );
};

export default ResetLogicExplorer;
