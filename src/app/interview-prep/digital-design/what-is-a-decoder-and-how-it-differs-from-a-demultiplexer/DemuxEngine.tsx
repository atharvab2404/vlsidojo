"use client";

import { useState } from "react";
import { GitBranch, Power } from "lucide-react";

export default function DemuxEngine() {
    const [mode, setMode] = useState<'DEMUX' | 'DECODER'>('DEMUX');

    // Demux Input (Data line)
    const [dataInput, setDataInput] = useState(1);

    // Select Lines (S1, S0)
    const [s1, setS1] = useState(0);
    const [s0, setS0] = useState(0);

    // Calculate Selected Index (Binary to Decimal)
    const selectedIndex = (s1 * 2) + s0;

    // Outputs (Y0 - Y3)
    // For Demux: selected output gets dataInput, others 0.
    // For Decoder: selected output is 1 (Active High), others 0 (assuming Enable is Active). 
    // Wait, Decoder is basically Demux with Input=1.
    const effectiveInput = mode === 'DECODER' ? 1 : dataInput;

    return (
        <div className="flex flex-col items-center gap-8 mt-8 select-none">

            {/* Mode Switcher */}
            <div className="flex bg-gray-100 p-1 rounded-xl">
                <button
                    onClick={() => setMode('DEMUX')}
                    className={`px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2
            ${mode === 'DEMUX' ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <GitBranch className="w-4 h-4" /> Demux (1:4)
                </button>
                <button
                    onClick={() => setMode('DECODER')}
                    className={`px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2
            ${mode === 'DECODER' ? 'bg-white shadow text-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <Power className="w-4 h-4" /> Decoder (2-to-4)
                </button>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl relative w-full max-w-2xl min-h-[400px] flex items-center">

                <div className="flex items-center justify-between w-full h-full relative">

                    {/* --- INPUT SIDE (Left) --- */}
                    <div className="flex flex-col items-center justify-center gap-4 z-10 w-24">
                        {mode === 'DEMUX' ? (
                            <>
                                <span className="text-xs font-bold text-gray-400">DATA IN</span>
                                <button
                                    onClick={() => setDataInput(dataInput ^ 1)}
                                    className={`w-16 h-16 rounded-xl font-bold text-3xl border-2 transition-all active:scale-95 flex items-center justify-center shadow-lg
                            ${dataInput ? 'bg-indigo-500 text-white border-indigo-600' : 'bg-white text-gray-300 border-gray-200'}`}
                                >
                                    {dataInput}
                                </button>
                                <div className={`h-1 w-full transition-colors ${dataInput ? 'bg-indigo-500' : 'bg-gray-200'}`}></div>
                            </>
                        ) : (
                            <>
                                <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold text-center">
                                    Enable Fixed to 1
                                </div>
                                <div className="w-16 h-16 rounded-xl font-bold text-3xl flex items-center justify-center bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed opacity-50">
                                    1
                                </div>
                                <div className="h-1 w-full bg-emerald-500"></div>
                            </>
                        )}
                    </div>

                    {/* --- THE BOX (Middle) --- */}
                    <div className="flex-1 h-80 mx-4 relative flex items-center justify-center">
                        {/* Trapezoid Shape mirrored? Generally Demux is drawn as Trapezoid getting bigger right side */}
                        <svg className="absolute inset-0 w-full h-full drop-shadow-md" viewBox="0 0 100 200" preserveAspectRatio="none">
                            <polygon points="20,80 80,10 80,190 20,120" fill="white" stroke="#e5e7eb" strokeWidth="2" />
                        </svg>

                        {/* Internal Routing Viz */}
                        <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                            {/* Line from Input (Left Center) to Selected Output (Right Spread) */}
                            <line
                                x1="0" y1="50%"
                                x2="100%" y2={20 + (selectedIndex * 20) + "%"} // Map 0->20%, 3->80% roughly
                                stroke={(effectiveInput) ? (mode === 'DEMUX' ? "#6366f1" : "#10b981") : "#d1d5db"}
                                strokeWidth="4"
                                strokeDasharray="6"
                                className={effectiveInput ? "animate-pulse" : ""}
                            />
                        </svg>

                        {/* Select Lines Controls (Bottom) */}
                        <div className="absolute -bottom-12 flex gap-6">
                            <div className="flex flex-col items-center gap-1">
                                <div className={`w-1 h-12 bg-gray-200 ${s1 ? (mode === 'DEMUX' ? 'bg-indigo-300' : 'bg-emerald-300') : ''}`}></div>
                                <button
                                    onClick={() => setS1(s1 ^ 1)}
                                    className={`w-10 h-10 rounded-full font-bold border-2 transition-colors ${s1 ? (mode === 'DEMUX' ? 'bg-indigo-600 border-indigo-800' : 'bg-emerald-600 border-emerald-800') + ' text-white' : 'bg-white text-gray-400 border-gray-300'}`}
                                >
                                    {s1}
                                </button>
                                <span className="text-[10px] font-bold text-gray-400">S<sub>1</sub></span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <div className={`w-1 h-12 bg-gray-200 ${s0 ? (mode === 'DEMUX' ? 'bg-indigo-300' : 'bg-emerald-300') : ''}`}></div>
                                <button
                                    onClick={() => setS0(s0 ^ 1)}
                                    className={`w-10 h-10 rounded-full font-bold border-2 transition-colors ${s0 ? (mode === 'DEMUX' ? 'bg-indigo-600 border-indigo-800' : 'bg-emerald-600 border-emerald-800') + ' text-white' : 'bg-white text-gray-400 border-gray-300'}`}
                                >
                                    {s0}
                                </button>
                                <span className="text-[10px] font-bold text-gray-400">S<sub>0</sub></span>
                            </div>
                        </div>

                    </div>

                    {/* --- OUTPUTS SIDE (Right) --- */}
                    <div className="flex flex-col gap-4 z-10 w-24">
                        {[0, 1, 2, 3].map((idx) => {
                            const isSelected = idx === selectedIndex;
                            const val = isSelected ? effectiveInput : 0;
                            const activeColor = mode === 'DEMUX' ? 'bg-indigo-500 border-indigo-600' : 'bg-emerald-500 border-emerald-600';

                            return (
                                <div key={idx} className="flex items-center gap-2">
                                    {/* Connector */}
                                    <div className={`w-6 h-1 transition-colors ${isSelected && effectiveInput ? (mode === 'DEMUX' ? 'bg-indigo-500' : 'bg-emerald-500') : 'bg-gray-200'}`}></div>

                                    <div className={`w-12 h-12 rounded-lg font-bold text-xl flex items-center justify-center border-2 transition-all
                                ${val ? `${activeColor} text-white shadow-md scale-110` : 'bg-white text-gray-300 border-gray-200'}
                             `}>
                                        {val}
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 font-mono">Y<sub>{idx}</sub></span>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>

            <div className="text-center text-sm text-gray-500 max-w-md">
                {mode === 'DEMUX' ? (
                    <p>Routing <strong>Data Input</strong> to <strong className="text-indigo-600">Output Y<sub>{selectedIndex}</sub></strong> based on Select Lines.</p>
                ) : (
                    <p>Decoding Binary <strong className="text-emerald-600">{s1}{s0}</strong> to activate <strong className="text-emerald-600">Line Y<sub>{selectedIndex}</sub></strong>.</p>
                )}
            </div>

        </div>
    );
}
