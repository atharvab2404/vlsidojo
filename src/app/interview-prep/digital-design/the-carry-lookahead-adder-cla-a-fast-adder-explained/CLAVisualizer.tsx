"use client";

import { useState } from "react";
import { Zap, FastForward } from "lucide-react";

export default function CLAVisualizer() {
    const [a, setA] = useState<number[]>([0, 0, 0, 0]);
    const [b, setB] = useState<number[]>([0, 0, 0, 0]);

    const toggleBit = (setter: any, val: number[], idx: number) => {
        const newVal = [...val];
        newVal[idx] = newVal[idx] ^ 1;
        setter(newVal);
    };

    // --- CLA LOGIC ---
    // 1. Calculate Generate (G) and Propagate (P) for each bit
    // G = A & B
    // P = A ^ B (or A|B)
    const g = a.map((val, i) => val & b[i]);
    const p = a.map((val, i) => val ^ b[i]);

    // 2. Calculate Carries instantly using logic equations (Lookahead)
    // C0 = Cin (Assume 0)
    // C1 = G0 + P0C0
    // C2 = G1 + P1G0 + P1P0C0
    // ...
    const cin = 0;
    const c = [cin];
    // Calculate subsequent carries based on current Inputs
    for (let i = 0; i < 4; i++) {
        c[i + 1] = g[i] | (p[i] & c[i]);
    }

    // 3. Calculate Sums
    // S = P ^ C
    const s = p.map((val, i) => val ^ c[i]);

    return (
        <div className="flex flex-col items-center gap-8 select-none py-8">
            <div className="flex gap-12 items-end mb-4 bg-gray-50 p-6 rounded-2xl border border-gray-200">
                {/* Input A */}
                <div className="flex flex-col gap-2 items-center">
                    <span className="font-bold text-gray-500 text-sm">Input A</span>
                    <div className="flex gap-2 flex-row-reverse">
                        {[3, 2, 1, 0].map(i => (
                            <button key={i} onClick={() => toggleBit(setA, a, i)} className={`w-10 h-10 rounded shadow-sm border font-mono font-bold transition-all ${a[i] ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-gray-400'}`}>
                                {a[i]}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Input B */}
                <div className="flex flex-col gap-2 items-center">
                    <span className="font-bold text-gray-500 text-sm">Input B</span>
                    <div className="flex gap-2 flex-row-reverse">
                        {[3, 2, 1, 0].map(i => (
                            <button key={i} onClick={() => toggleBit(setB, b, i)} className={`w-10 h-10 rounded shadow-sm border font-mono font-bold transition-all ${b[i] ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-white text-gray-400'}`}>
                                {b[i]}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- VISUALIZATION OF PARALLELISM --- */}
            <div className="flex flex-col gap-4 w-full max-w-2xl relative">

                {/* Step 1: P & G Generation (Parallel) */}
                <div className="flex justify-between px-8">
                    {[3, 2, 1, 0].map(i => (
                        <div key={i} className="flex flex-col items-center gap-1 animate-in slide-in-from-top fade-in duration-500">
                            <div className="w-16 h-20 bg-blue-50 rounded border border-blue-200 flex flex-col items-center justify-center shadow-sm">
                                <span className="text-[10px] text-gray-400 font-bold mb-1">Bit {i}</span>
                                <div className="font-mono text-xs font-bold text-indigo-700">G={g[i]}</div>
                                <div className="font-mono text-xs font-bold text-purple-600">P={p[i]}</div>
                            </div>
                            <div className="h-6 w-0.5 bg-gray-300"></div>
                        </div>
                    ))}
                </div>

                {/* Step 2: The Lookahead Unit (Centralized) */}
                <div className="h-24 bg-gray-800 rounded-xl mx-4 flex items-center justify-center relative shadow-xl overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse"></div>
                    <div className="relative z-10 flex items-center gap-4 text-white font-bold tracking-widest">
                        <Zap className="text-yellow-400 w-6 h-6 fill-current" />
                        LOOKAHEAD LOGIC UNIT
                        <Zap className="text-yellow-400 w-6 h-6 fill-current" />
                    </div>
                    {/* Visualizing "Instance" Calculation */}
                    <div className="absolute bottom-1 w-full text-center text-[10px] text-gray-400 font-mono">
                        Calculates C1, C2, C3, C4 simultaneously!
                    </div>
                </div>

                {/* Step 3: Carries Distributed Back */}
                <div className="flex justify-between px-8 relative">
                    {/* Wires from Unit to Sums */}
                    {[3, 2, 1, 0].map(i => (
                        <div key={i} className="flex flex-col items-center gap-1 -mt-2">
                            <div className="h-6 w-0.5 bg-gray-300"></div>
                            <div className="w-16 h-16 bg-white rounded border-2 border-emerald-500 flex flex-col items-center justify-center shadow-md">
                                <span className="text-[10px] text-gray-400 font-bold">SUM {i}</span>
                                <span className="text-2xl font-bold text-gray-800">{s[i]}</span>
                            </div>
                            <div className="text-[10px] font-bold text-amber-600 mt-1">
                                (C{i}={c[i]})
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <div className="flex items-center gap-2 text-gray-500 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-200 mt-4">
                <FastForward className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-bold">Total Delay: 3 Gate Levels (Constant for N)</span>
            </div>

        </div>
    );
}
