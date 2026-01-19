"use client";

import { useState } from "react";
import { Equal, ChevronRight, ChevronLeft, Search } from "lucide-react";

export default function ComparatorVisualizer() {
    // 4-bit numbers
    const [a, setA] = useState<number[]>([0, 0, 0, 0]);
    const [b, setB] = useState<number[]>([0, 0, 0, 0]);

    const toggleBit = (setter: any, val: number[], idx: number) => {
        const newVal = [...val];
        newVal[idx] = newVal[idx] ^ 1;
        setter(newVal);
    };

    // --- LOGIC ---
    let result = "EQUAL";
    let decidingBit = -1;

    // Scan from MSB (3) down to LSB (0)
    for (let i = 3; i >= 0; i--) {
        if (a[i] > b[i]) {
            result = "GREATER";
            decidingBit = i;
            break;
        }
        if (a[i] < b[i]) {
            result = "LESS";
            decidingBit = i;
            break;
        }
    }

    const valA = a.reduce((acc, bit, i) => acc + bit * (2 ** i), 0);
    const valB = b.reduce((acc, bit, i) => acc + bit * (2 ** i), 0);

    return (
        <div className="flex flex-col items-center gap-12 select-none py-8">

            {/* --- INPUTS --- */}
            <div className="grid grid-cols-2 gap-16 bg-white p-8 rounded-3xl border border-gray-200 shadow-xl relative">
                {/* A */}
                <div className="flex flex-col items-center gap-4">
                    <span className="text-3xl font-bold text-indigo-600 font-mono">A</span>
                    <div className="flex flex-col gap-2">
                        {[3, 2, 1, 0].map(i => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="text-[10px] text-gray-300 font-bold w-4">bit{i}</span>
                                <button onClick={() => toggleBit(setA, a, i)} className={`w-12 h-12 rounded-lg font-mono text-xl font-bold border-2 transition-all ${a[i] ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-gray-50 text-gray-400 border-gray-200'}`}>
                                    {a[i]}
                                </button>
                            </div>
                        ))}
                    </div>
                    <span className="font-bold text-indigo-900 text-lg mt-2">{valA}</span>
                </div>

                {/* B */}
                <div className="flex flex-col items-center gap-4">
                    <span className="text-3xl font-bold text-emerald-600 font-mono">B</span>
                    <div className="flex flex-col gap-2">
                        {[3, 2, 1, 0].map(i => (
                            <div key={i} className="flex items-center gap-2 flex-row-reverse">
                                <span className="text-[10px] text-gray-300 font-bold w-4 text-right">bit{i}</span>
                                <button onClick={() => toggleBit(setB, b, i)} className={`w-12 h-12 rounded-lg font-mono text-xl font-bold border-2 transition-all ${b[i] ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-gray-50 text-gray-400 border-gray-200'}`}>
                                    {b[i]}
                                </button>
                            </div>
                        ))}
                    </div>
                    <span className="font-bold text-emerald-900 text-lg mt-2">{valB}</span>
                </div>

                {/* --- CENTER COMPARISON LOGIC --- */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                    {/* Logic Dots */}
                    <div className="flex flex-col gap-2 h-full justify-between py-12">
                        {[3, 2, 1, 0].map(i => {
                            const isDecider = i === decidingBit;
                            const isChecked = decidingBit === -1 || i > decidingBit; // Bits checked so far
                            return (
                                <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 
                                      ${isDecider ? 'bg-amber-500 scale-125 shadow-lg shadow-amber-200 z-10' : ''}
                                      ${!isDecider && isChecked ? 'bg-gray-200' : 'opacity-20 bg-gray-100'}
                                  `}>
                                    {isDecider && <Search className="w-4 h-4 text-white" />}
                                    {isChecked && !isDecider && <div className="w-2 h-2 bg-gray-400 rounded-full"></div>}
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>

            {/* --- RESULT --- */}
            <div className="flex gap-8">
                <div className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center border-4 transition-all duration-300 ${result === 'GREATER' ? 'bg-indigo-500 border-indigo-600 text-white shadow-xl scale-110' : 'bg-gray-100 border-gray-200 text-gray-300 opacity-50'}`}>
                    <ChevronRight className="w-12 h-12" />
                    <span className="text-xs font-bold">A &gt; B</span>
                </div>

                <div className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center border-4 transition-all duration-300 ${result === 'EQUAL' ? 'bg-blue-500 border-blue-600 text-white shadow-xl scale-110' : 'bg-gray-100 border-gray-200 text-gray-300 opacity-50'}`}>
                    <Equal className="w-10 h-10" />
                    <span className="text-xs font-bold">A = B</span>
                </div>

                <div className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center border-4 transition-all duration-300 ${result === 'LESS' ? 'bg-emerald-500 border-emerald-600 text-white shadow-xl scale-110' : 'bg-gray-100 border-gray-200 text-gray-300 opacity-50'}`}>
                    <ChevronLeft className="w-12 h-12" />
                    <span className="text-xs font-bold">A &lt; B</span>
                </div>
            </div>

            <div className="text-gray-500 text-sm font-bold bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                {decidingBit !== -1 ? (
                    <>Result determined at <span className="text-amber-600">Bit {decidingBit}</span>.</>
                ) : (
                    <>All bits match.</>
                )}
            </div>

        </div>
    );
}
