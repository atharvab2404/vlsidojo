"use client";

import React, { useState } from 'react';
import { ArrowRight, Play, RotateCcw, Download, Upload } from 'lucide-react';

const ScanChainVisualizer = () => {
    // 4 Flip-Flops
    // State represents the Q output of each FF
    const [q, setQ] = useState([0, 0, 0, 0]);

    // Inputs from the "Logic Cloud" (Combinational Logic results waiting to be captured)
    const [logicInputs, setLogicInputs] = useState([1, 0, 1, 1]);

    // Scan In Input (from Tester)
    const [scanIn, setScanIn] = useState(1);

    // Scan Enable Signal
    const [se, setSe] = useState(0); // 0 = Functional (Capture), 1 = Scan (Shift)

    // History log for visualization
    const [log, setLog] = useState<string[]>([]);

    const handleClock = () => {
        const newQ = [...q];
        let action = "";

        if (se === 1) {
            // --- SCAN MODE (SHIFT) ---
            // Q0 takes ScanIn
            // Q1 takes Q0
            // Q2 takes Q1
            // Q3 takes Q2
            newQ[3] = q[2];
            newQ[2] = q[1];
            newQ[1] = q[0];
            newQ[0] = scanIn;
            action = `SHIFT: In(${scanIn}) -> Q0, Q0->Q1, Q1->Q2, Q2->Out(${q[3]})`;
        } else {
            // --- FUNCTIONAL MODE (CAPTURE) ---
            // Q0 takes Logic0
            // Q1 takes Logic1
            // ...
            newQ[0] = logicInputs[0];
            newQ[1] = logicInputs[1];
            newQ[2] = logicInputs[2];
            newQ[3] = logicInputs[3];
            action = `CAPTURE: Logic(${logicInputs.join('')}) -> Q`;
        }

        setQ(newQ);
        setLog(prev => [action, ...prev].slice(0, 3));
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Control Panel */}
            <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">

                {/* Global Controls */}
                <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-slate-500 uppercase">Input (SI)</span>
                        <button
                            onClick={() => setScanIn(scanIn === 0 ? 1 : 0)}
                            className={`w-12 h-10 rounded font-mono font-bold text-lg border transition-all ${scanIn ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-gray-500 border-gray-300'}`}
                        >
                            {scanIn}
                        </button>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-slate-500 uppercase">Mode (SE)</span>
                        <button
                            onClick={() => setSe(se === 0 ? 1 : 0)}
                            className={`px-4 h-10 rounded font-bold transition-all flex items-center gap-2 border ${se === 1
                                    ? "bg-amber-500 text-white border-amber-600 shadow-md"
                                    : "bg-emerald-600 text-white border-emerald-700 shadow-md"
                                }`}
                        >
                            {se === 1 ? "SCAN (Shift)" : "FUNC (Capture)"}
                        </button>
                    </div>
                </div>

                {/* Clock */}
                <button
                    onClick={handleClock}
                    className="px-6 py-3 bg-slate-800 text-white rounded-lg font-bold hover:bg-slate-700 transition-colors flex items-center gap-2 shadow-lg active:scale-95 transform"
                >
                    <Play className="w-5 h-5 fill-current" />
                    CLOCK PULSE
                </button>
            </div>

            {/* Schematic */}
            <div className="bg-slate-900 rounded-2xl p-6 relative overflow-hidden min-h-[300px] border border-slate-700 shadow-inner flex flex-col items-center justify-center select-none">

                {/* Legend */}
                <div className="flex gap-4 mb-4 text-xs text-slate-400">
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-amber-500 rounded"></div> Path if SE=1</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-emerald-500 rounded"></div> Path if SE=0</div>
                </div>

                <div className="flex items-center justify-center w-full gap-2 md:gap-4 overflow-x-auto pb-4">

                    {/* Input Arrow */}
                    <div className="flex flex-col items-center justify-center gap-2">
                        <span className="text-slate-400 text-xs font-mono">SI</span>
                        <ArrowRight className={`w-6 h-6 ${se === 1 ? 'text-amber-500 animate-pulse' : 'text-slate-700'}`} />
                    </div>

                    {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center">

                            {/* The Scan Cell (Mux + FF) */}
                            <div className="relative bg-slate-800 border border-slate-600 rounded-lg p-2 w-32 flex flex-col gap-2">
                                {/* Label */}
                                <span className="absolute -top-3 left-2 bg-slate-900 px-1 text-xs text-slate-400 font-mono">FF{i}</span>

                                {/* Mux Symbol */}
                                <div className="h-16 w-full flex relative">
                                    {/* Mux Trapezoid */}
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-12 bg-slate-700 clip-path-trapezoid flex flex-col justify-between py-1 px-1">
                                        <span className={`text-[8px] font-mono leading-none ${se === 0 ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>0 (D)</span>
                                        <span className={`text-[8px] font-mono leading-none ${se === 1 ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>1 (SI)</span>
                                    </div>

                                    {/* DFF Box */}
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-white border-2 border-slate-400 rounded flex items-center justify-center text-xl font-bold font-mono text-slate-900">
                                        {q[i]}
                                    </div>

                                    {/* Wire: Mux to DFF */}
                                    <div className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-slate-500"></div>

                                    {/* Logic Input (Vertical) */}
                                    <div className="absolute -top-4 left-0 flex flex-col items-center">
                                        <span className="text-[10px] text-emerald-500 font-mono mb-1">{logicInputs[i]}</span>
                                        <div className={`w-0.5 h-6 ${se === 0 ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Arrow to Next */}
                            {i < 3 && (
                                <div className="w-8 h-0.5 md:w-16 relative">
                                    <div className={`absolute inset-0 ${se === 1 ? 'bg-amber-500' : 'bg-slate-700'} transition-colors`}></div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Scan Out Arrow */}
                    <div className="flex flex-col items-center justify-center gap-2 pl-4">
                        <ArrowRight className={`w-6 h-6 ${se === 1 ? 'text-amber-500 animate-pulse' : 'text-slate-700'}`} />
                        <span className="text-slate-400 text-xs font-mono">SO</span>
                    </div>

                </div>

                <div className="mt-6 flex flex-col gap-1 w-full max-w-lg">
                    {log.map((entry, idx) => (
                        <div key={idx} className={`text-xs font-mono p-1 rounded ${idx === 0 ? 'text-white bg-slate-800' : 'text-slate-500'}`}>
                            {idx === 0 ? '> ' : '  '} {entry}
                        </div>
                    ))}
                </div>
            </div>

            {/* Explainer Box */}
            <div className={`p-6 rounded-xl border-l-4 transition-colors ${se === 1 ? "bg-amber-50 border-amber-500" : "bg-emerald-50 border-emerald-500"}`}>
                <h4 className={`font-bold text-lg mb-2 ${se === 1 ? "text-amber-900" : "text-emerald-900"}`}>
                    Current Mode: {se === 1 ? "SCAN (Shift)" : "FUNCTIONAL (Capture)"}
                </h4>
                <p className={`text-sm leading-relaxed ${se === 1 ? "text-amber-800" : "text-emerald-800"}`}>
                    {se === 1
                        ? <>In Scan Mode, the Mux selects the <strong>'1'</strong> input. The Flip-Flops are chained together. Each clock pulse shifts data one step to the right. Use this to load test patterns (Vectors) and unload results.</>
                        : <>In Functional Mode, the Mux selects the <strong>'0'</strong> input. The Flip-Flops act normally, capturing data from the Combinational Logic clouds (shown as green vertical inputs).</>
                    }
                </p>
            </div>
        </div>
    );
};

export default ScanChainVisualizer;
