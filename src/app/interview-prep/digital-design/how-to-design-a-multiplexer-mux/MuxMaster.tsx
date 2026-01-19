"use client";

import { useState } from "react";
import { ArrowRight, GitMerge, Settings2 } from "lucide-react";

export default function MuxMaster() {
    // Inputs (I0 - I3)
    const [inputs, setInputs] = useState([0, 0, 0, 0]);

    // Select Lines (S1, S0)
    const [s1, setS1] = useState(0);
    const [s0, setS0] = useState(0);

    // Calculate Selected Index (Binary to Decimal)
    const selectedIndex = (s1 * 2) + s0;

    // Output is whatever is at the selected index
    const output = inputs[selectedIndex];

    const toggleInput = (index: number) => {
        const newInputs = [...inputs];
        newInputs[index] = newInputs[index] === 0 ? 1 : 0;
        setInputs(newInputs);
    };

    return (
        <div className="flex flex-col items-center gap-8 mt-8 select-none">

            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl relative w-full max-w-2xl">

                <div className="flex items-center gap-2 mb-8 justify-center">
                    <Settings2 className="w-6 h-6 text-indigo-600" />
                    <h3 className="text-xl font-bold text-gray-900">4:1 Multiplexer (Mux)</h3>
                </div>

                <div className="flex justify-between items-center relative">

                    {/* INPUTS COLUMN */}
                    <div className="flex flex-col gap-4 z-10">
                        {inputs.map((val, idx) => {
                            const isSelected = idx === selectedIndex;
                            return (
                                <div key={idx} className="flex items-center gap-3">
                                    <span className={`text-xs font-bold font-mono w-6 text-right ${isSelected ? 'text-indigo-600' : 'text-gray-400'}`}>I<sub>{idx}</sub></span>
                                    <button
                                        onClick={() => toggleInput(idx)}
                                        className={`w-12 h-12 rounded-lg font-bold text-xl border-2 transition-all active:scale-95
                                ${val ? 'bg-indigo-500 text-white border-indigo-600' : 'bg-white text-gray-300 border-gray-200'}
                                ${isSelected ? 'ring-2 ring-indigo-400 ring-offset-2' : 'opacity-70 grayscale'}
                                `}
                                    >
                                        {val}
                                    </button>

                                    {/* Path Line Start */}
                                    <div className={`w-8 h-1 transition-colors duration-300 ${isSelected ? (val ? 'bg-indigo-500' : 'bg-gray-300') : 'bg-gray-100'}`}></div>
                                </div>
                            );
                        })}
                    </div>

                    {/* THE MUX TRAPEZOID */}
                    <div className="flex-1 flex items-center justify-center relative h-80 mx-4">
                        {/* SVG Shape for Mux Trapezoid */}
                        <svg className="absolute inset-0 w-full h-full drop-shadow-lg" viewBox="0 0 100 200" preserveAspectRatio="none">
                            <polygon points="20,10 80,40 80,160 20,190" fill="white" stroke="#e5e7eb" strokeWidth="2" />
                        </svg>

                        {/* Internal Routing Visualization */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center z-10 pointer-events-none">
                            {/* We draw the 'selected path' dynamically */}
                            <svg className="absolute inset-0 w-full h-full overflow-visible">
                                {/* We approximate connection points based on CSS Layout */}
                                {/* Connect Input Y-positions to Center */}
                                <line
                                    x1="0" y1={25 + (selectedIndex * 16.6) + "%"} // Rough calc based on 4 items spacing
                                    x2="100%" y2="50%"
                                    stroke={output ? "#6366f1" : "#d1d5db"}
                                    strokeWidth="4"
                                    strokeDasharray="5"
                                    className="animate-pulse" // Make it flow
                                />
                            </svg>
                            <span className="bg-indigo-50 text-indigo-800 text-xs font-bold px-2 py-1 rounded">
                                SEL: {selectedIndex}
                            </span>
                        </div>

                        {/* SELECT LINES (Bottom) */}
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
                            <div className="flex flex-col items-center gap-1">
                                <div className={`w-1 h-8 bg-gray-300 ${s1 ? 'bg-indigo-400' : ''}`}></div>
                                <button
                                    onClick={() => setS1(s1 ^ 1)}
                                    className={`w-10 h-10 rounded-full font-bold border-2 transition-colors ${s1 ? 'bg-indigo-600 text-white border-indigo-800' : 'bg-white text-gray-400 border-gray-300'}`}
                                >
                                    {s1}
                                </button>
                                <span className="text-[10px] font-bold text-gray-400">S<sub>1</sub></span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <div className={`w-1 h-8 bg-gray-300 ${s0 ? 'bg-indigo-400' : ''}`}></div>
                                <button
                                    onClick={() => setS0(s0 ^ 1)}
                                    className={`w-10 h-10 rounded-full font-bold border-2 transition-colors ${s0 ? 'bg-indigo-600 text-white border-indigo-800' : 'bg-white text-gray-400 border-gray-300'}`}
                                >
                                    {s0}
                                </button>
                                <span className="text-[10px] font-bold text-gray-400">S<sub>0</sub></span>
                            </div>
                        </div>
                    </div>

                    {/* OUTPUT */}
                    <div className="flex items-center gap-3 z-10">
                        <div className={`w-12 h-1 transition-colors duration-300 ${output ? 'bg-indigo-500 shadow-[0_0_10px_indigo]' : 'bg-gray-300'}`}></div>
                        <div>
                            <div className={`w-16 h-16 rounded-xl font-bold text-3xl flex items-center justify-center transition-all shadow-xl border-2
                         ${output ? 'bg-indigo-500 text-white border-indigo-600 shadow-indigo-300 scale-110' : 'bg-gray-100 text-gray-300 border-gray-200'}`}>
                                {output}
                            </div>
                            <div className="text-center text-[10px] font-bold text-gray-400 mt-2">OUTPUT</div>
                        </div>
                    </div>

                </div>

                <div className="text-center mt-16 text-sm text-gray-500 bg-gray-50 p-3 rounded-xl">
                    Formula: <span className="font-mono text-indigo-600 font-bold">Index = (S1 &times; 2) + S0 = {selectedIndex}</span>.
                    Route <strong>I<sub>{selectedIndex}</sub></strong> to Output.
                </div>
            </div>
        </div>
    );
}
