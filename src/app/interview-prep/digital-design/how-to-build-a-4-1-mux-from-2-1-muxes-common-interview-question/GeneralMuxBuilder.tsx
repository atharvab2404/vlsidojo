"use client";

import { useState, useMemo } from "react";
import { ArrowDown, Layers, Calculator } from "lucide-react";

export default function GeneralMuxBuilder() {
    const [nValue, setNValue] = useState<number>(53);

    // Calculate the Reduction Layers
    const layers = useMemo(() => {
        let currentInputs = nValue;
        const stages = [];
        let totalMuxes = 0;

        // Safety brake for visualization to prevent crashing inputs > 1000
        // We will still calculate math correctly though? 
        // Actually typically visualizer limits 64 or 128 for DOM sanity.
        // Let's calculate purely math first.

        while (currentInputs > 1) {
            const muxesThisLayer = Math.floor(currentInputs / 2);
            const passThrough = currentInputs % 2;
            const nextInputs = muxesThisLayer + passThrough;

            stages.push({
                inputs: currentInputs,
                muxes: muxesThisLayer,
                passThrough: passThrough,
                nextInputs: nextInputs
            });

            totalMuxes += muxesThisLayer;
            currentInputs = nextInputs;
        }

        return { stages, totalMuxes };
    }, [nValue]);

    return (
        <div className="flex flex-col gap-12 select-none py-8">

            {/* Input Section */}
            <div className="flex flex-col items-center gap-6 bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <label className="text-xl font-bold text-gray-700 flex items-center gap-3">
                    <Calculator className="w-6 h-6 text-indigo-600" />
                    I want to build a:
                </label>
                <div className="flex items-center gap-4">
                    <input
                        type="number"
                        min="2"
                        max="1024"
                        value={nValue}
                        onChange={(e) => setNValue(Math.max(2, parseInt(e.target.value) || 2))}
                        className="w-32 text-center text-4xl font-extrabold text-indigo-600 border-b-4 border-indigo-200 focus:border-indigo-600 outline-none bg-transparent"
                    />
                    <span className="text-4xl font-extrabold text-gray-400">: 1 Mux</span>
                </div>
                <p className="text-gray-500 text-sm">
                    (Using only 2:1 Muxes)
                </p>
            </div>

            {/* Formula & Result */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
                {/* Quick Answer */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8 rounded-2xl text-white shadow-xl flex flex-col items-center justify-center text-center">
                    <h3 className="text-lg font-medium opacity-80 mb-2">Total 2:1 Muxes Required</h3>
                    <div className="text-6xl font-extrabold tracking-tighter mb-4">
                        {layers.totalMuxes}
                    </div>
                    <div className="px-4 py-1 bg-white/20 rounded-full text-sm font-bold backdrop-blur-sm">
                        Formula: N - 1
                    </div>
                </div>

                {/* Breakdown */}
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-4 overflow-y-auto max-h-[300px]">
                    <h3 className="font-bold text-gray-700 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-gray-400" />
                        Stage-by-Stage Breakdown
                    </h3>
                    <div className="space-y-4 relative">
                        {/* Vertical Line */}
                        <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-100"></div>

                        {layers.stages.map((stage, idx) => (
                            <div key={idx} className="relative flex items-center gap-4 text-sm z-10 transition-all hover:translate-x-1">
                                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs ring-4 ring-white">
                                    {idx + 1}
                                </div>
                                <div className="flex-1 bg-gray-50 p-3 rounded-lg border border-gray-100 flex justify-between items-center">
                                    <span className="text-gray-500">
                                        <strong className="text-gray-900">{stage.inputs}</strong> Inputs
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <ArrowDown className="w-3 h-3 text-gray-300 -rotate-90" />
                                        <span className="font-bold text-indigo-600">{stage.muxes} Muxes</span>
                                    </div>
                                    <span className="text-gray-400 text-xs">
                                        ({stage.passThrough} left over)
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div className="relative flex items-center gap-4 text-sm z-10 pl-10">
                            <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-bold text-xs">
                                DONE
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visualizer (Only if N is reasonable) */}
            {nValue <= 32 && (
                <div className="w-full overflow-x-auto pb-8">
                    <h3 className="text-center text-gray-400 font-bold mb-6 text-sm uppercase tracking-widest">Architecture Visualization</h3>

                    <div className="flex flex-col items-center gap-8 min-w-max px-8">
                        {layers.stages.map((stage, layerIdx) => (
                            <div key={layerIdx} className="flex gap-2 justify-center items-end relative">

                                {/* Render the inputs/muxes for this layer */}
                                {Array.from({ length: stage.muxes }).map((_, mIdx) => (
                                    <div key={mIdx} className="flex flex-col items-center gap-1 mx-1">
                                        {/* Connection Lines entering */}
                                        <div className="flex gap-4 mb-1">
                                            <div className="w-0.5 h-4 bg-gray-300"></div>
                                            <div className="w-0.5 h-4 bg-gray-300"></div>
                                        </div>
                                        {/* The Mux Box */}
                                        <div className="w-12 h-10 bg-indigo-50 border border-indigo-200 rounded text-[10px] text-indigo-400 flex items-center justify-center font-bold shadow-sm">
                                            2:1
                                        </div>
                                        {/* Output line */}
                                    </div>
                                ))}

                                {/* Render Pass throughs */}
                                {stage.passThrough > 0 && (
                                    <div className="flex flex-col items-center gap-1 mx-1 ml-4 opacity-50">
                                        <div className="w-0.5 h-full bg-gray-300 border-l border-dashed border-gray-400 h-[60px]"></div>
                                    </div>
                                )}

                            </div>
                        ))}
                        {/* Final Output */}
                        <div className="flex flex-col items-center">
                            <div className="w-0.5 h-8 bg-gray-300"></div>
                            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-200">
                                Out
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {nValue > 32 && (
                <div className="text-center text-gray-400 italic bg-gray-50 p-8 rounded-xl border border-dashed border-gray-200">
                    Visualization disabled for N &gt; 32 to keep your screen clean.
                    <br />
                    The math above holds true!
                </div>
            )}

        </div>
    );
}
