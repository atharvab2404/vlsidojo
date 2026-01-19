"use client";

import React, { useState } from "react";
import { Lock, Unlock, CheckCircle, AlertOctagon, Wrench } from "lucide-react";

/**
 * LatchDetective
 * 
 * Interactive tool to fix inferred latches in code snippets.
 */
const LatchDetective = () => {
    const [fixApplied, setFixApplied] = useState<'none' | 'default_assignment' | 'full_case'>('none');

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans">

            <div className="grid md:grid-cols-2 gap-8">

                {/* Code Window */}
                <div className="flex flex-col">
                    <div className="bg-slate-800 text-slate-400 text-xs px-4 py-2 rounded-t-lg border-b border-slate-700 font-mono flex items-center gap-2">
                        alu_decoder.v
                        {fixApplied !== 'none' && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                    </div>
                    <div className="bg-slate-900 p-6 rounded-b-lg overflow-x-auto min-h-[300px] font-mono text-sm text-sky-300 leading-relaxed relative">

                        <span className="text-pink-400">always</span> @(*) <span className="text-pink-400">begin</span><br />

                        {/* Fix Strategy 1: Default Assignment */}
                        <div className={`transition-all duration-300 ${fixApplied === 'default_assignment' ? 'max-h-8 opacity-100 bg-emerald-500/20 px-2 -mx-2 rounded' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                            &nbsp; result = 0; <span className="text-emerald-400">// Fix: Default value!</span>
                        </div>

                        &nbsp; <span className="text-pink-400">case</span> (opcode)<br />
                        &nbsp; &nbsp; 2'b00: result = a + b;<br />
                        &nbsp; &nbsp; 2'b01: result = a - b;<br />
                        &nbsp; &nbsp; 2'b10: result = a & b;<br />

                        {/* Fix Strategy 2: Default Case */}
                        <div className={`transition-all duration-300 ${fixApplied === 'full_case' ? 'max-h-8 opacity-100 bg-emerald-500/20 px-2 -mx-2 rounded' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                            &nbsp; &nbsp; <span className="text-pink-400">default</span>: result = 0; <span className="text-emerald-400">// Fix: Catch-all!</span>
                        </div>

                        &nbsp; <span className="text-pink-400">endcase</span><br />
                        <span className="text-pink-400">end</span>

                        {fixApplied === 'none' && (
                            <div className="absolute inset-x-0 bottom-4 text-center">
                                <span className="inline-block bg-rose-500/20 text-rose-300 px-3 py-1 rounded text-xs border border-rose-500/50 animate-pulse">
                                    ⚠️ Missing 2'b11 coverage!
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Analysis & Controls */}
                <div className="flex flex-col gap-6">

                    {/* Status Display */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col items-center justify-center h-48 relative overflow-hidden transition-colors duration-500">
                        {fixApplied === 'none' ? (
                            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                                <div className="relative mb-4">
                                    <Lock className="w-16 h-16 text-rose-500" />
                                    <div className="absolute -top-1 -right-1 flex h-4 w-4">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500"></span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-rose-600 mb-1">LATCH DETECTED</h3>
                                <p className="text-xs text-slate-500 text-center max-w-[200px]">
                                    If <code>opcode</code> is <code>2'b11</code>, "result" keeps its old value.
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                                <Unlock className="w-16 h-16 text-emerald-500 mb-4" />
                                <h3 className="text-lg font-bold text-emerald-600 mb-1">CLEAN LOGIC</h3>
                                <p className="text-xs text-slate-500 text-center max-w-[200px]">
                                    Combinational MUX created. No memory inferred.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Fix Actions */}
                    <div className="flex flex-col gap-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Choose a Fix Strategy:</label>

                        <button
                            onClick={() => setFixApplied(fixApplied === 'default_assignment' ? 'none' : 'default_assignment')}
                            className={`p-3 rounded-lg border text-left transition-all flex items-center gap-3
                                ${fixApplied === 'default_assignment'
                                    ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500'
                                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                                }`}
                        >
                            <div className={`p-2 rounded ${fixApplied === 'default_assignment' ? 'bg-emerald-200 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                <Wrench className="w-4 h-4" />
                            </div>
                            <div>
                                <div className={`text-sm font-bold ${fixApplied === 'default_assignment' ? 'text-emerald-700' : 'text-slate-700'}`}>Method 1: Default Assignment</div>
                                <div className="text-xs text-slate-500">Assign a value at the very top. Best practice!</div>
                            </div>
                        </button>

                        <button
                            onClick={() => setFixApplied(fixApplied === 'full_case' ? 'none' : 'full_case')}
                            className={`p-3 rounded-lg border text-left transition-all flex items-center gap-3
                                ${fixApplied === 'full_case'
                                    ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500'
                                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                                }`}
                        >
                            <div className={`p-2 rounded ${fixApplied === 'full_case' ? 'bg-emerald-200 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                <AlertOctagon className="w-4 h-4" />
                            </div>
                            <div>
                                <div className={`text-sm font-bold ${fixApplied === 'full_case' ? 'text-emerald-700' : 'text-slate-700'}`}>Method 2: Default Case</div>
                                <div className="text-xs text-slate-500">Add a `default` clause to handle missing cases.</div>
                            </div>
                        </button>

                    </div>

                </div>

            </div>

            <div className="mt-6 p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-sm text-yellow-800 flex items-start gap-3">
                <div className="bg-yellow-100 p-1 rounded shrink-0">💡</div>
                <p>
                    <strong>Pro Tip:</strong> Method 1 (Default Assignment) is often preferred because it covers <i>everything</i> in the block automatically, even if you have complex nested if-else statements later.
                </p>
            </div>

        </div>
    );
};

export default LatchDetective;
