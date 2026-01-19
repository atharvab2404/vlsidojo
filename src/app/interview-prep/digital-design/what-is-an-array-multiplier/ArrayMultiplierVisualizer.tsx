"use client";

import { useState } from "react";
import { ArrowDown, X, Plus } from "lucide-react";

export default function ArrayMultiplierVisualizer() {
    // 2-bit inputs
    const [a, setA] = useState<number[]>([0, 0]); // a1 a0
    const [b, setB] = useState<number[]>([0, 0]); // b1 b0

    const toggleBit = (setter: any, val: number[], idx: number) => {
        const newVal = [...val];
        newVal[idx] = newVal[idx] ^ 1;
        setter(newVal);
    };

    // --- LOGIC ---
    // Partial Products (AND gates)
    // Row 0: A multiplied by b0
    const pp0_0 = a[0] & b[0]; // a0b0
    const pp0_1 = a[1] & b[0]; // a1b0

    // Row 1: A multiplied by b1 (Shifted)
    const pp1_0 = a[0] & b[1]; // a0b1
    const pp1_1 = a[1] & b[1]; // a1b1

    // Summation Stage
    // P0 = pp0_0
    const p0 = pp0_0;

    // P1 = pp0_1 + pp1_0
    const s1 = pp0_1 ^ pp1_0;
    const c1 = pp0_1 & pp1_0; // Carry to next stage
    const p1 = s1;

    // P2 = pp1_1 + c1
    const s2 = pp1_1 ^ c1;
    const c2 = pp1_1 & c1; // Carry to P3
    const p2 = s2;

    // P3 = c2
    const p3 = c2;

    const valA = a[1] * 2 + a[0];
    const valB = b[1] * 2 + b[0];
    const product = valA * valB;

    return (
        <div className="flex flex-col items-center gap-12 select-none py-8">

            {/* --- CONTROLS --- */}
            <div className="flex gap-12 items-center bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 tracking-wider">INPUT A</span>
                    <div className="flex gap-2">
                        <button onClick={() => toggleBit(setA, a, 1)} className={`w-12 h-12 rounded-lg font-mono font-bold text-xl border-2 transition-all ${a[1] ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-gray-300'}`}>{a[1]}</button>
                        <button onClick={() => toggleBit(setA, a, 0)} className={`w-12 h-12 rounded-lg font-mono font-bold text-xl border-2 transition-all ${a[0] ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-gray-300'}`}>{a[0]}</button>
                    </div>
                </div>

                <X className="text-gray-300 w-8 h-8" />

                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 tracking-wider">INPUT B</span>
                    <div className="flex gap-2">
                        <button onClick={() => toggleBit(setB, b, 1)} className={`w-12 h-12 rounded-lg font-mono font-bold text-xl border-2 transition-all ${b[1] ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-white text-gray-300'}`}>{b[1]}</button>
                        <button onClick={() => toggleBit(setB, b, 0)} className={`w-12 h-12 rounded-lg font-mono font-bold text-xl border-2 transition-all ${b[0] ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-white text-gray-300'}`}>{b[0]}</button>
                    </div>
                </div>
            </div>

            {/* --- THE ARRAY GRID --- */}
            <div className="relative p-8 bg-gray-900 rounded-3xl shadow-2xl border-4 border-gray-800 flex flex-col items-center gap-8">
                <div className="absolute top-4 left-6 text-xs font-bold text-gray-500 tracking-widest">2x2 ARRAY STRUCTURE</div>

                {/* Level 1: Partial Products Generation */}
                <div className="grid grid-cols-2 gap-x-16 gap-y-8">
                    {/* Row 0 PPs */}
                    <div className={`flex flex-col items-center p-2 rounded border border-dashed transition-all ${pp0_1 ? 'border-amber-500 bg-amber-500/10' : 'border-gray-700'}`}>
                        <span className="text-[10px] text-gray-500 mb-1">A1 • B0</span>
                        <span className={`font-mono font-bold text-lg ${pp0_1 ? 'text-amber-400' : 'text-gray-600'}`}>{pp0_1}</span>
                    </div>
                    <div className={`flex flex-col items-center p-2 rounded border border-dashed transition-all ${pp0_0 ? 'border-amber-500 bg-amber-500/10' : 'border-gray-700'}`}>
                        <span className="text-[10px] text-gray-500 mb-1">A0 • B0</span>
                        <span className={`font-mono font-bold text-lg ${pp0_0 ? 'text-amber-400' : 'text-gray-600'}`}>{pp0_0}</span>
                        <ArrowDown className="w-4 h-4 text-gray-600 mt-2" />
                        <span className="text-xs font-bold text-blue-400 mt-1">P0</span>
                    </div>

                    {/* Row 1 PPs (Shifted Visually in Logic, but grid here) */}
                    <div className={`flex flex-col items-center p-2 rounded border border-dashed transition-all ${pp1_1 ? 'border-amber-500 bg-amber-500/10' : 'border-gray-700'}`}>
                        <span className="text-[10px] text-gray-500 mb-1">A1 • B1</span>
                        <span className={`font-mono font-bold text-lg ${pp1_1 ? 'text-amber-400' : 'text-gray-600'}`}>{pp1_1}</span>
                    </div>
                    <div className={`flex flex-col items-center p-2 rounded border border-dashed transition-all ${pp1_0 ? 'border-amber-500 bg-amber-500/10' : 'border-gray-700'}`}>
                        <span className="text-[10px] text-gray-500 mb-1">A0 • B1</span>
                        <span className={`font-mono font-bold text-lg ${pp1_0 ? 'text-amber-400' : 'text-gray-600'}`}>{pp1_0}</span>
                    </div>
                </div>

                {/* Level 2: Adder Stage (Simplified Viz) */}
                <div className="w-full h-px bg-gray-700 my-2 relative">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 px-2 text-xs text-gray-500">ADDER STAGE</span>
                </div>

                <div className="flex gap-4 items-end">
                    {/* P3 (Carry 2) */}
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-xs text-gray-500">P3</span>
                        <div className={`w-10 h-10 rounded font-mono font-bold text-xl flex items-center justify-center border-2 transition-all ${p3 ? 'bg-blue-500 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-gray-700 text-gray-600'}`}>
                            {p3}
                        </div>
                    </div>
                    {/* P2 (Sum 2) */}
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-xs text-gray-500">P2</span>
                        <div className={`w-10 h-10 rounded font-mono font-bold text-xl flex items-center justify-center border-2 transition-all ${p2 ? 'bg-blue-500 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-gray-700 text-gray-600'}`}>
                            {p2}
                        </div>
                    </div>
                    {/* P1 (Sum 1) */}
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-xs text-gray-500">P1</span>
                        <div className={`w-10 h-10 rounded font-mono font-bold text-xl flex items-center justify-center border-2 transition-all ${p1 ? 'bg-blue-500 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-gray-700 text-gray-600'}`}>
                            {p1}
                        </div>
                    </div>
                    {/* P0 (Direct) */}
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-xs text-gray-500">P0</span>
                        <div className={`w-10 h-10 rounded font-mono font-bold text-xl flex items-center justify-center border-2 transition-all ${p0 ? 'bg-blue-500 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-gray-700 text-gray-600'}`}>
                            {p0}
                        </div>
                    </div>
                </div>

            </div>

            <div className="bg-white px-8 py-4 rounded-xl shadow-lg border-l-4 border-blue-500">
                <p className="text-xl font-bold text-gray-800">
                    Result: <span className="text-indigo-600">{valA}</span> × <span className="text-emerald-600">{valB}</span> = <span className="text-blue-600">{product}</span> (Binary: {p3}{p2}{p1}{p0})
                </p>
            </div>

        </div>
    );
}
