"use client";

import { useState } from "react";
import { ArrowDown, Plus, Minus } from "lucide-react";

export default function SubtractorVisualizer() {
    // 4-bit inputs
    const [a, setA] = useState<number[]>([0, 0, 0, 0]);
    const [b, setB] = useState<number[]>([0, 0, 0, 0]);

    // Mode: Add or Subtract
    const [isSub, setIsSub] = useState(true);

    const toggleBit = (setter: any, val: number[], idx: number) => {
        const newVal = [...val];
        newVal[idx] = newVal[idx] ^ 1;
        setter(newVal);
    };

    // --- LOGIC ---
    // If Subtracting: B becomes 1's complement (inverted)
    // Cin becomes 1 (for 2's complement)
    const effectiveB = b.map(bit => isSub ? (bit ^ 1) : bit);
    const cin = isSub ? 1 : 0;

    // Perform Addition
    let currentC = cin;
    const sum = [];
    const carries = [cin];

    for (let i = 0; i < 4; i++) {
        const bitA = a[i];
        const bitB = effectiveB[i];
        const s = bitA ^ bitB ^ currentC;
        const nextC = (bitA & bitB) | (bitB & currentC) | (bitA & currentC);

        sum.push(s);
        currentC = nextC;
        carries.push(currentC);
    }

    // For Subtraction: 
    // Carry Out = 1 means Expected Result (Positive). 
    // Carry Out = 0 means result is negative (in 2's comp form). 
    // But for this simple viz, we just show the raw bits.

    // Calculate Decimal Value for display
    const valA = a.reduce((acc, bit, i) => acc + bit * (2 ** i), 0);
    const valB = b.reduce((acc, bit, i) => acc + bit * (2 ** i), 0);
    const result = isSub ? (valA - valB) : (valA + valB);

    return (
        <div className="flex flex-col items-center gap-8 select-none py-8">

            {/* Mode Switch */}
            <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
                <button onClick={() => setIsSub(false)} className={`px-6 py-2 rounded-md font-bold text-sm transition-all ${!isSub ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}>Adder (A+B)</button>
                <button onClick={() => setIsSub(true)} className={`px-6 py-2 rounded-md font-bold text-sm transition-all ${isSub ? 'bg-white shadow text-rose-600' : 'text-gray-500'}`}>Subtractor (A-B)</button>
            </div>

            <div className="flex flex-col lg:flex-row gap-16 items-center">

                {/* --- INPUTS PANE --- */}
                <div className="flex flex-col gap-8 bg-gray-50 p-6 rounded-2xl border border-gray-200">
                    <div className="flex flex-col gap-2 items-center">
                        <span className="font-bold text-gray-500 text-xs tracking-wider">INPUT A (minuend)</span>
                        <div className="flex gap-2 flex-row-reverse">
                            {[3, 2, 1, 0].map(i => (
                                <button key={i} onClick={() => toggleBit(setA, a, i)} className={`w-10 h-10 rounded shadow-sm border font-mono font-bold transition-all ${a[i] ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-gray-400'}`}>
                                    {a[i]}
                                </button>
                            ))}
                        </div>
                        <span className="text-xs text-indigo-600 font-bold">= {valA}</span>
                    </div>

                    <div className="flex justify-center text-gray-400">
                        {isSub ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                    </div>

                    <div className="flex flex-col gap-2 items-center">
                        <span className="font-bold text-gray-500 text-xs tracking-wider">INPUT B (subtrahend)</span>
                        <div className="flex gap-2 flex-row-reverse">
                            {[3, 2, 1, 0].map(i => (
                                <button key={i} onClick={() => toggleBit(setB, b, i)} className={`w-10 h-10 rounded shadow-sm border font-mono font-bold transition-all ${b[i] ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-white text-gray-400'}`}>
                                    {b[i]}
                                </button>
                            ))}
                        </div>
                        <span className="text-xs text-emerald-600 font-bold">= {valB}</span>
                    </div>
                </div>

                {/* --- CIRCUIT TRANSFORMATION VISUALIZATION --- */}
                <div className="relative p-8 border-4 border-gray-800 rounded-2xl bg-gray-900 text-white flex flex-col items-center gap-8 shadow-2xl">
                    <div className="absolute top-2 left-4 text-xs font-bold text-gray-500 tracking-widest">INTERNAL ALU LOGIC</div>

                    {/* B Processing Layer */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex gap-4">
                            {[3, 2, 1, 0].reverse().map(i => (
                                <div key={i} className="flex flex-col items-center">
                                    <span className="text-[10px] text-gray-500 mb-1">B{i}</span>
                                    <div className={`w-8 h-8 rounded border flex items-center justify-center font-mono font-bold text-sm ${isSub && b[i] !== effectiveB[i] ? 'bg-rose-500 border-rose-400' : 'bg-gray-700 border-gray-600 text-gray-400'}`}>
                                        {effectiveB[i]}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-[10px] text-rose-300 font-mono h-4">
                            {isSub ? "Inverted (1's Comp)" : "Unchanged"}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500">
                        <ArrowDown className="w-5 h-5" />
                        <span className="text-xs font-bold">+ Carry In = {cin}</span>
                    </div>

                    {/* Adder Block */}
                    <div className="w-full bg-gray-800 border-2 border-gray-600 rounded-lg p-4 flex flex-col items-center">
                        <span className="text-xs font-bold text-gray-400 mb-2">4-BIT BINARY ADDER</span>
                        <div className="flex gap-4 mb-2">
                            {sum.map((sBit, i) => ( // Note: Logic computed LSB->MSB, but usually displayed MSB->LSB. Let's reverse for display.
                                null
                            ))}
                            {/* Correct Display Loop (MSB to LSB) */}
                            {[3, 2, 1, 0].map(i => (
                                <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-2 ${sum[i] ? 'bg-amber-500 text-white border-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-gray-700 text-gray-500 border-gray-600'}`}>
                                    {sum[i]}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>

            {/* --- RESULT INTERPRETATION --- */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-500 max-w-xl text-center">
                <h3 className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-1">Interpretation</h3>
                <p className="text-2xl font-bold text-gray-800">
                    {valA} {isSub ? '-' : '+'} {valB} = <span className="text-indigo-600">{result}</span>
                </p>
                {isSub && result < 0 && (
                    <p className="text-xs text-rose-500 mt-2 font-bold bg-rose-50 inline-block px-2 py-1 rounded">
                        Negative Result (Shown in 2's Complement)
                    </p>
                )}
            </div>

        </div>
    );
}
