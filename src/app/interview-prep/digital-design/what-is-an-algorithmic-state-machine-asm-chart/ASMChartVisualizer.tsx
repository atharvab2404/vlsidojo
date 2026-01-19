"use client";

import React, { useState } from "react";
import { ArrowDown, Check, X, RotateCcw, Play } from "lucide-react";

/**
 * ASMChartVisualizer
 * 
 * Demonstrates the flow of an Algorithmic State Machine Chart.
 * Example Logic: A simple "Pattern Search" or "Handshake".
 * 
 * Structure:
 * 1. State Box (Square)
 * 2. Decision Box (Diamond)
 * 3. Conditional Output Box (Rounded/Oval)
 */
const ASMChartVisualizer = () => {
    const [activeBlock, setActiveBlock] = useState<string>("S0"); // ID of active block
    const [inputValue, setInputValue] = useState(0); // Simulated Input 'X'
    const [log, setLog] = useState<string[]>(["Start: In State S0"]);

    // Blocks: S0, Dec1, S1, Dec2
    // S0 -> Check X. 
    // If X=0 -> Stay S0. 
    // If X=1 -> Go S1 (Output Z1 conditionally?).

    const step = () => {
        let nextBlock = activeBlock;
        let message = "";

        switch (activeBlock) {
            case "S0":
                nextBlock = "DEC_0";
                message = "Exiting State S0. Checking Input...";
                break;
            case "DEC_0":
                if (inputValue === 1) {
                    nextBlock = "CMD_1"; // Conditional Output? Or just straight to next state logic block? 
                    // ASM Charts can have conditional output boxes on the path.
                    message = "Input is 1. Path -> True.";
                } else {
                    nextBlock = "S0_LOOP_BACK"; // Visual delay state
                    message = "Input is 0. Path -> False (Wait).";
                }
                break;
            case "S0_LOOP_BACK":
                nextBlock = "S0";
                message = "Returning to S0.";
                break;
            case "CMD_1":
                // This represents a conditional output box or just transition path
                nextBlock = "S1";
                message = "Transitioning to S1.";
                break;
            case "S1":
                nextBlock = "DEC_1";
                message = "In State S1. Checking Exit Cond...";
                break;
            case "DEC_1":
                if (inputValue === 1) {
                    nextBlock = "S0"; // Reset
                    message = "Input is 1. Resetting to S0.";
                } else {
                    nextBlock = "S1_LOOP_BACK";
                    message = "Input is 0. Holding in S1.";
                }
                break;
            case "S1_LOOP_BACK":
                nextBlock = "S1";
                message = "Returning to S1.";
                break;
            default:
                nextBlock = "S0";
        }

        setActiveBlock(nextBlock);

        // Simple flashing effect for loop backs
        if (nextBlock.includes("LOOP_BACK")) {
            setTimeout(() => {
                setActiveBlock(nextBlock === "S0_LOOP_BACK" ? "S0" : "S1");
            }, 500);
        }

        setLog(prev => [message, ...prev.slice(0, 4)]);
    };

    const reset = () => {
        setActiveBlock("S0");
        setLog(["Reset System."]);
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 font-sans">

            <div className="flex flex-col md:flex-row gap-8">

                {/* --- Left: The ASM Chart (SVG/CSS) --- */}
                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-8 relative min-h-[400px] flex justify-center">

                    <div className="relative flex flex-col items-center gap-8 w-64">

                        {/* STATE S0 */}
                        <div className={`relative w-32 h-16 border-2 flex items-center justify-center font-bold shadow-sm transition-all duration-300
                            ${activeBlock === "S0" || activeBlock === "S0_LOOP_BACK" ? "bg-indigo-100 border-indigo-600 text-indigo-900 scale-105 shadow-md" : "bg-white border-slate-400 text-slate-600"}
                        `}>
                            <span className="absolute -left-8 -top-2 text-xs font-mono text-slate-400">STATE</span>
                            S0
                            {/* Loop back path visual */}
                            <svg className="absolute -left-12 top-8 w-12 h-20 text-slate-300 fill-none stroke-current stroke-2 pointer-events-none overflow-visible">
                                <path d="M 0 0 L -20 0 L -20 -50 L 10 -50" className={activeBlock === "S0_LOOP_BACK" ? "stroke-indigo-500" : ""} />
                            </svg>
                        </div>

                        <ArrowDown className="w-6 h-6 text-slate-300" />

                        {/* DECISION 0 */}
                        <div className={`relative w-24 h-24 rotate-45 border-2 flex items-center justify-center bg-white z-10 transition-all duration-300
                             ${activeBlock === "DEC_0" ? "bg-amber-50 border-amber-500 shadow-md scale-110" : "border-slate-400"}
                        `}>
                            <div className="-rotate-45 text-center font-bold text-xs text-slate-700">
                                Input<br />X=1?
                            </div>

                            {/* False Path (Left) */}
                            <div className="absolute -left-8 top-12 -rotate-45 text-xs font-bold text-red-500 bg-white px-1">No (0)</div>
                            {/* True Path (Bottom) */}
                            <div className="absolute -bottom-8 left-12 -rotate-45 text-xs font-bold text-emerald-600 bg-white px-1">Yes (1)</div>
                        </div>

                        <div className="h-8 w-0 border-l-2 border-slate-300 border-dashed" />

                        {/* CONDITIONAL OUTPUT / PATH */}
                        <div className={`relative w-40 h-12 rounded-full border-2 border-dashed flex items-center justify-center text-xs font-mono transition-all duration-300
                             ${activeBlock === "CMD_1" ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-bold scale-105" : "border-slate-300 text-slate-400"}
                        `}>
                            Conditional Out (Z=1)
                        </div>

                        <ArrowDown className="w-6 h-6 text-slate-300" />

                        {/* STATE S1 */}
                        <div className={`relative w-32 h-16 border-2 flex items-center justify-center font-bold shadow-sm transition-all duration-300
                            ${activeBlock === "S1" || activeBlock === "S1_LOOP_BACK" ? "bg-indigo-100 border-indigo-600 text-indigo-900 scale-105 shadow-md" : "bg-white border-slate-400 text-slate-600"}
                        `}>
                            <span className="absolute -left-8 -top-2 text-xs font-mono text-slate-400">STATE</span>
                            S1
                        </div>

                    </div>
                </div>

                {/* --- Right: Controls --- */}
                <div className="w-full md:w-64 space-y-6">

                    <div className="bg-slate-900 rounded-xl p-4 text-white">
                        <div className="text-xs text-slate-400 font-bold uppercase mb-2">Simulated Input X</div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setInputValue(0)}
                                className={`flex-1 py-2 rounded font-bold text-sm transition-colors border ${inputValue === 0 ? "bg-red-500 border-red-400 text-white" : "bg-transparent border-slate-600 text-slate-400"}`}
                            >
                                0
                            </button>
                            <button
                                onClick={() => setInputValue(1)}
                                className={`flex-1 py-2 rounded font-bold text-sm transition-colors border ${inputValue === 1 ? "bg-emerald-500 border-emerald-400 text-white" : "bg-transparent border-slate-600 text-slate-400"}`}
                            >
                                1
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <button
                            onClick={step}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
                        >
                            <Play className="w-4 h-4" /> Step ASM
                        </button>
                        <button
                            onClick={reset}
                            className="w-full py-2 bg-white border border-slate-200 text-slate-600 rounded-lg font-bold text-sm hover:bg-slate-50 flex items-center justify-center gap-2"
                        >
                            <RotateCcw className="w-3 h-3" /> Reset
                        </button>
                    </div>

                    <div className="bg-slate-100 rounded-lg p-3 text-xs font-mono text-slate-600 min-h-[100px]">
                        <div className="font-bold text-slate-400 mb-2 border-b border-slate-200 pb-1">EXECUTION LOG</div>
                        {log.map((l, i) => (
                            <div key={i} className={i === 0 ? "text-indigo-600 font-bold" : "opacity-70"}>
                                &gt; {l}
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ASMChartVisualizer;
