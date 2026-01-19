"use client";

import { useState } from "react";
import { ArrowRight, GitMerge } from "lucide-react";

export default function CascadedMuxVisualizer() {
    const [inputs, setInputs] = useState<number[]>([1, 0, 1, 0]);
    const [s0, setS0] = useState(0); // Level 1 select
    const [s1, setS1] = useState(0); // Level 2 select

    // Mux 1 (Top Left): Selects between I0 and I1 based on S0
    const m1_out = inputs[s0];

    // Mux 2 (Bottom Left): Selects between I2 and I3 based on S0
    const m2_out = inputs[2 + s0];

    // Mux 3 (Right): Selects between m1_out and m2_out based on S1
    const final_out = s1 === 0 ? m1_out : m2_out;

    const toggleInput = (idx: number) => {
        const newInputs = [...inputs];
        newInputs[idx] = newInputs[idx] ^ 1;
        setInputs(newInputs);
    };

    return (
        <div className="flex flex-col items-center gap-12 select-none py-8">

            {/* Controls */}
            <div className="flex gap-12 text-sm">
                <div className="flex flex-col items-center gap-2">
                    <span className="font-bold text-gray-500">Stage 1 Select (S<sub>0</sub>)</span>
                    <button
                        onClick={() => setS0(s0 ^ 1)}
                        className={`w-12 h-12 rounded-full font-bold text-xl border-2 transition-colors ${s0 ? 'bg-indigo-600 text-white border-indigo-800' : 'bg-white text-gray-400 border-gray-300'}`}
                    >
                        {s0}
                    </button>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className="font-bold text-gray-500">Stage 2 Select (S<sub>1</sub>)</span>
                    <button
                        onClick={() => setS1(s1 ^ 1)}
                        className={`w-12 h-12 rounded-full font-bold text-xl border-2 transition-colors ${s1 ? 'bg-purple-600 text-white border-purple-800' : 'bg-white text-gray-400 border-gray-300'}`}
                    >
                        {s1}
                    </button>
                </div>
            </div>

            <div className="relative w-full max-w-3xl h-[400px] bg-white rounded-3xl border border-gray-200 shadow-xl overflow-visible p-8">

                <div className="absolute inset-0 flex items-center justify-between px-12">

                    {/* --- STAGE 1 (Left) -- */}
                    <div className="flex flex-col gap-16">

                        {/* Mux 1 (Top) */}
                        <div className={`relative w-24 h-24 bg-gray-50 border-2 rounded-lg flex flex-col items-center justify-center transition-colors ${s1 === 0 && 'border-purple-300 shadow-purple-100 shadow-lg'}`}>
                            <span className="text-xs font-bold text-gray-400 absolute top-1">MUX 1</span>
                            {/* Inputs */}
                            <div className="absolute -left-6 top-4 flex items-center">
                                <button onClick={() => toggleInput(0)} className={`w-8 h-8 flex items-center justify-center rounded font-bold text-sm border hover:scale-110 transition-transform ${inputs[0] ? 'bg-indigo-100 text-indigo-700 border-indigo-300' : 'bg-white text-gray-400 border-gray-200'}`}>{inputs[0]}</button>
                                <div className={`w-4 h-0.5 ${s0 === 0 ? 'bg-indigo-500 h-1' : 'bg-gray-200'}`}></div>
                                <span className="text-[10px] text-gray-400 absolute -top-4">I<sub>0</sub></span>
                            </div>
                            <div className="absolute -left-6 bottom-4 flex items-center">
                                <button onClick={() => toggleInput(1)} className={`w-8 h-8 flex items-center justify-center rounded font-bold text-sm border hover:scale-110 transition-transform ${inputs[1] ? 'bg-indigo-100 text-indigo-700 border-indigo-300' : 'bg-white text-gray-400 border-gray-200'}`}>{inputs[1]}</button>
                                <div className={`w-4 h-0.5 ${s0 === 1 ? 'bg-indigo-500 h-1' : 'bg-gray-200'}`}></div>
                                <span className="text-[10px] text-gray-400 absolute -bottom-4">I<sub>1</sub></span>
                            </div>
                            {/* Select */}
                            <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-center text-[10px] text-indigo-500 font-bold">S<sub>0</sub></div>

                            {/* Status */}
                            <div className={`font-bold text-lg ${m1_out ? 'text-indigo-600' : 'text-gray-300'}`}>{m1_out}</div>
                        </div>

                        {/* Mux 2 (Bottom) */}
                        <div className={`relative w-24 h-24 bg-gray-50 border-2 rounded-lg flex flex-col items-center justify-center transition-colors ${s1 === 1 && 'border-purple-300 shadow-purple-100 shadow-lg'}`}>
                            <span className="text-xs font-bold text-gray-400 absolute top-1">MUX 2</span>
                            {/* Inputs */}
                            <div className="absolute -left-6 top-4 flex items-center">
                                <button onClick={() => toggleInput(2)} className={`w-8 h-8 flex items-center justify-center rounded font-bold text-sm border hover:scale-110 transition-transform ${inputs[2] ? 'bg-indigo-100 text-indigo-700 border-indigo-300' : 'bg-white text-gray-400 border-gray-200'}`}>{inputs[2]}</button>
                                <div className={`w-4 h-0.5 ${s0 === 0 ? 'bg-indigo-500 h-1' : 'bg-gray-200'}`}></div>
                                <span className="text-[10px] text-gray-400 absolute -top-4">I<sub>2</sub></span>
                            </div>
                            <div className="absolute -left-6 bottom-4 flex items-center">
                                <button onClick={() => toggleInput(3)} className={`w-8 h-8 flex items-center justify-center rounded font-bold text-sm border hover:scale-110 transition-transform ${inputs[3] ? 'bg-indigo-100 text-indigo-700 border-indigo-300' : 'bg-white text-gray-400 border-gray-200'}`}>{inputs[3]}</button>
                                <div className={`w-4 h-0.5 ${s0 === 1 ? 'bg-indigo-500 h-1' : 'bg-gray-200'}`}></div>
                                <span className="text-[10px] text-gray-400 absolute -bottom-4">I<sub>3</sub></span>
                            </div>
                            {/* Select */}
                            <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-center text-[10px] text-indigo-500 font-bold">S<sub>0</sub></div>

                            {/* Status */}
                            <div className={`font-bold text-lg ${m2_out ? 'text-indigo-600' : 'text-gray-300'}`}>{m2_out}</div>
                        </div>

                    </div>

                    {/* --- CONNECTIONS --- */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                        {/* Path from Mux 1 to Mux 3 */}
                        <path
                            d="M 220 100 C 300 100, 300 200, 400 180"
                            fill="none"
                            stroke={s1 === 0 ? "#9333ea" : "#e5e7eb"}
                            strokeWidth={s1 === 0 ? "3" : "2"}
                            strokeDasharray={s1 === 0 ? "4" : ""}
                            className={s1 === 0 && m1_out ? "animate-pulse" : ""}
                        />
                        {/* Path from Mux 2 to Mux 3 */}
                        <path
                            d="M 220 300 C 300 300, 300 200, 400 220"
                            fill="none"
                            stroke={s1 === 1 ? "#9333ea" : "#e5e7eb"}
                            strokeWidth={s1 === 1 ? "3" : "2"}
                            strokeDasharray={s1 === 1 ? "4" : ""}
                            className={s1 === 1 && m2_out ? "animate-pulse" : ""}
                        />
                    </svg>

                    {/* --- STAGE 2 (Right) -- */}
                    <div className="flex flex-col items-center justify-center">

                        {/* Mux 3 */}
                        <div className="relative w-32 h-48 bg-purple-50 border-2 border-purple-200 rounded-lg flex flex-col items-center justify-center shadow-lg">
                            <span className="text-xs font-bold text-purple-400 absolute top-2">MUX 3</span>

                            {/* Inputs are effectively internal wires coming from svg */}

                            {/* Select */}
                            <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-center text-[10px] text-purple-600 font-bold">S<sub>1</sub></div>

                            {/* Final Output */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-gray-400">Y =</span>
                                <div className={`w-12 h-12 flex items-center justify-center rounded-lg text-2xl font-bold transition-all ${final_out ? 'bg-purple-600 text-white shadow-lg shadow-purple-200 scale-110' : 'bg-gray-200 text-gray-400'}`}>
                                    {final_out}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Output Wire */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center pr-8">
                        <ArrowRight className={`w-8 h-8 ${final_out ? 'text-purple-600' : 'text-gray-300'}`} />
                    </div>

                </div>
            </div>

            <p className="text-center text-gray-500 max-w-lg">
                Currently selecting <strong>I<sub>{(s1 * 2) + s0}</sub></strong>.
                <br />
                Notice how <strong>S<sub>1</sub></strong> picks which <em>group</em> (Top or Bottom pair) passes through, and <strong>S<sub>0</sub></strong> picks the specific line within that group.
            </p>

        </div>
    );
}
