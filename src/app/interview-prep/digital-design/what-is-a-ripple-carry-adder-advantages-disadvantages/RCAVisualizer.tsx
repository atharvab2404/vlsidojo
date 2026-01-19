"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Clock } from "lucide-react";

export default function RCAVisualizer() {
    // 4-bit numbers A and B
    const [a, setA] = useState<number[]>([0, 0, 0, 0]); // LSB at index 0
    const [b, setB] = useState<number[]>([0, 0, 0, 0]);
    const [cin, setCin] = useState(0);

    // State for the "Ripple" animation
    const [carries, setCarries] = useState<number[]>([0, 0, 0, 0, 0]); // c0..c4
    const [sums, setSums] = useState<number[]>([0, 0, 0, 0]);
    const [activeStage, setActiveStage] = useState(-1); // Which bit is currently calculating
    const [isCalculating, setIsCalculating] = useState(false);

    const toggleBit = (setter: any, val: number[], idx: number) => {
        if (isCalculating) return;
        const newVal = [...val];
        newVal[idx] = newVal[idx] ^ 1;
        setter(newVal);
    };

    const startAddition = () => {
        setIsCalculating(true);
        setCarries([cin, 0, 0, 0, 0]);
        setSums([0, 0, 0, 0]);
        setActiveStage(-1);

        let currentC = cin;
        let stage = 0;

        // Simulate Ripple Delay
        const interval = setInterval(() => {
            if (stage > 3) {
                clearInterval(interval);
                setIsCalculating(false);
                setActiveStage(-1);
                return;
            }

            setActiveStage(stage);

            // Calculate Current Stage Logic
            const bitA = a[stage];
            const bitB = b[stage];

            const sum = bitA ^ bitB ^ currentC;
            const nextC = (bitA & bitB) | (bitB & currentC) | (bitA & currentC);

            setSums(prev => {
                const newSums = [...prev];
                newSums[stage] = sum;
                return newSums;
            });

            setCarries(prev => {
                const newCarries = [...prev];
                newCarries[stage + 1] = nextC;
                return newCarries;
            });

            currentC = nextC;
            stage++;
        }, 800); // 800ms delay per stage to visualize the ripple
    };

    return (
        <div className="flex flex-col items-center gap-8 select-none py-8">

            {/* Controls */}
            <div className="flex gap-12 items-end mb-8 bg-gray-50 p-6 rounded-2xl border border-gray-200">
                {/* Input A */}
                <div className="flex flex-col gap-2 items-center">
                    <span className="font-bold text-gray-500 text-sm">Input A (4-bit)</span>
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
                    <span className="font-bold text-gray-500 text-sm">Input B (4-bit)</span>
                    <div className="flex gap-2 flex-row-reverse">
                        {[3, 2, 1, 0].map(i => (
                            <button key={i} onClick={() => toggleBit(setB, b, i)} className={`w-10 h-10 rounded shadow-sm border font-mono font-bold transition-all ${b[i] ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-white text-gray-400'}`}>
                                {b[i]}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={startAddition}
                    disabled={isCalculating}
                    className="h-12 px-6 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-amber-200 transition-all active:scale-95 flex items-center gap-2"
                >
                    {isCalculating ? <Clock className="animate-spin" /> : "Calculate"}
                </button>
            </div>

            {/* The Chain */}
            <div className="flex flex-row-reverse gap-4 items-center overflow-x-auto p-4 w-full justify-center">
                {[3, 2, 1, 0].map(i => (
                    <div key={i} className="flex items-center">

                        {/* Full Adder Box */}
                        <div className={`relative w-24 h-32 rounded-xl border-4 flex flex-col items-center justify-center transition-all duration-500 
                             ${activeStage === i ? 'bg-amber-100 border-amber-400 scale-110 shadow-xl z-10' : 'bg-gray-100 border-gray-300'}
                             ${activeStage > i ? 'bg-gray-100 opacity-60' : ''}
                         `}>
                            <span className="absolute top-2 text-[10px] text-gray-400 font-bold">FA {i}</span>

                            {/* Inputs Display */}
                            <div className="flex gap-2 text-xs font-mono font-bold mb-2">
                                <span className="text-indigo-600">A={a[i]}</span>
                                <span className="text-emerald-600">B={b[i]}</span>
                            </div>

                            {/* Logic Viz */}
                            <div className="text-xs text-center text-gray-500 leading-tight">
                                Wait for C<sub>{i}</sub>...
                            </div>

                            {/* Sum Output */}
                            <div className={`absolute -bottom-6 w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-500 ${activeStage >= i ? 'bg-blue-500 text-white border-blue-600 scale-100' : 'bg-gray-200 text-transparent scale-0'}`}>
                                {sums[i]}
                            </div>
                        </div>

                        {/* Carry Line (Leftward) */}
                        {i > 0 && (
                            <div className="flex flex-col items-center mx-2 w-16">
                                <div className={`h-1 w-full bg-gray-200 relative overflow-hidden rounded`}>
                                    <div className={`absolute inset-0 bg-amber-500 transition-transform duration-700 ${activeStage >= i - 1 ? 'translate-x-0' : '-translate-x-full'}`}></div>
                                </div>
                                <span className={`text-xs font-bold transition-colors duration-500 mt-1 ${activeStage >= i - 1 ? 'text-amber-600' : 'text-gray-300'}`}>
                                    C<sub>{i}</sub>={carries[i]}
                                </span>
                            </div>
                        )}
                    </div>
                ))}

                {/* Initial Carry In */}
                <div className="flex flex-col items-center ml-2 opacity-50">
                    <span className="text-xs text-gray-400">Cin=0</span>
                    <ArrowRight className="w-4 h-4 text-gray-300" />
                </div>

            </div>

            {/* Final Result Display */}
            <div className={`mt-8 p-4 rounded-xl border-2 transition-all duration-500 ${!isCalculating && activeStage === -1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h3 className="text-center text-gray-400 text-xs tracking-widest font-bold uppercase mb-2">Final 5-bit Result</h3>
                <div className="flex text-3xl font-mono font-bold text-gray-800 gap-2">
                    <span className="text-amber-500">{carries[4]}</span>
                    <span>{sums[3]}</span>
                    <span>{sums[2]}</span>
                    <span>{sums[1]}</span>
                    <span>{sums[0]}</span>
                </div>
            </div>

        </div>
    );
}
