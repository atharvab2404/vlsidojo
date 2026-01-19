"use client";

import { useState } from "react";
import { RefreshCcw } from "lucide-react";

export default function SRLatchVisualizer() {
    const [s, setS] = useState(0);
    const [r, setR] = useState(0);

    // Internal states
    // In a real circuit, Q and Qbar settle based on physics. In React, we simulate the logic.
    // NOR Latch Logic:
    // S=1, R=0 -> Set (Q=1, Qb=0)
    // S=0, R=1 -> Reset (Q=0, Qb=1)
    // S=0, R=0 -> Hold (Previous State)
    // S=1, R=1 -> Invalid (Both 0)

    const [q, setQ] = useState(0);
    const [qBar, setQBar] = useState(1); // Start in Reset state

    // We need useEffect to handle the 'Hold' and 'Invalid' transition logic properly? 
    // Or just compute 'next state' on click?
    // Let's do instant computation for responsiveness, but tracking previous state is tricky purely functionally.
    // Actually, we can just update state based on current S,R inputs.

    const handleToggle = (input: 'S' | 'R') => {
        const newS = input === 'S' ? (s ^ 1) : s;
        const newR = input === 'R' ? (r ^ 1) : r;

        setS(newS);
        setR(newR);

        // NOR Logic
        if (newS === 1 && newR === 1) {
            setQ(0);
            setQBar(0); // Invalid (both output 0 for NOR latch)
        } else if (newS === 1) {
            setQ(1);
            setQBar(0);
        } else if (newR === 1) {
            setQ(0);
            setQBar(1);
        } else {
            // Hold State (0,0) - Do nothing, keep existing Q/QBar
        }
    };

    const isInvalid = s === 1 && r === 1;

    return (
        <div className="flex flex-col items-center gap-12 select-none py-8">

            {/* --- INPUTS --- */}
            <div className="flex gap-20">
                <div className="flex flex-col items-center gap-2">
                    <button onClick={() => handleToggle('S')} className={`w-16 h-16 rounded-xl font-bold text-2xl border-4 transition-all shadow-lg active:scale-95 ${s ? 'bg-indigo-600 text-white border-indigo-700 shadow-indigo-200' : 'bg-white text-gray-400 border-gray-200'}`}>
                        S
                    </button>
                    <span className="text-xs font-bold text-gray-400">SET (1)</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <button onClick={() => handleToggle('R')} className={`w-16 h-16 rounded-xl font-bold text-2xl border-4 transition-all shadow-lg active:scale-95 ${r ? 'bg-orange-600 text-white border-orange-700 shadow-orange-200' : 'bg-white text-gray-400 border-gray-200'}`}>
                        R
                    </button>
                    <span className="text-xs font-bold text-gray-400">RESET (0)</span>
                </div>
            </div>

            {/* --- GATES VISUALIZATION (Simplified Cross-Coupled) --- */}
            <div className="relative w-full max-w-md h-64 bg-gray-900 rounded-3xl border-4 border-gray-800 shadow-2xl p-8">
                <div className="absolute top-4 left-4 text-gray-600 font-bold text-xs tracking-widest">NOR LATCH</div>

                {/* Lines */}
                {/* S Path */}
                <div className={`absolute top-16 left-0 w-1/3 h-1 ${s ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]' : 'bg-gray-700'}`}></div>
                {/* R Path */}
                <div className={`absolute bottom-16 left-0 w-1/3 h-1 ${r ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]' : 'bg-gray-700'}`}></div>

                {/* Gates (Abstract Boxes for simplicity in code-drawing) */}
                <div className="absolute top-10 left-1/3 w-16 h-16 border-2 border-gray-600 rounded-r-full flex items-center justify-center text-white font-bold bg-gray-800 z-10">
                    NOR
                </div>
                <div className="absolute bottom-10 left-1/3 w-16 h-16 border-2 border-gray-600 rounded-r-full flex items-center justify-center text-white font-bold bg-gray-800 z-10">
                    NOR
                </div>

                {/* Feedback Paths (Cross coupling) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-gray-600 stroke-2" style={{ zIndex: 0 }}>
                    {/* Feedback from Q to Bottom Gate */}
                    <path d="M 280 43 L 280 120 L 140 120 L 140 150" fill="none" className={`transition-all duration-300 ${q ? 'stroke-rose-500' : 'stroke-gray-700'}`} />
                    {/* Feedback from QBar to Top Gate */}
                    <path d="M 280 215 L 280 140 L 140 140 L 140 100" fill="none" className={`transition-all duration-300 ${qBar ? 'stroke-emerald-500' : 'stroke-gray-700'}`} />
                </svg>

                {/* Outputs */}
                <div className={`absolute top-16 right-0 w-1/3 h-1 ${q ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]' : 'bg-gray-700'}`}></div>
                <div className={`absolute bottom-16 right-0 w-1/3 h-1 ${qBar ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-gray-700'}`}></div>

                {/* Output Labels */}
                <span className={`absolute top-14 right-4 font-bold text-xl ${q ? 'text-rose-400' : 'text-gray-600'}`}>Q</span>
                <span className={`absolute bottom-14 right-4 font-bold text-xl ${qBar ? 'text-emerald-400' : 'text-gray-600'}`}>Q̅</span>

            </div>

            {/* --- STATUS --- */}
            <div className={`px-8 py-4 rounded-xl font-bold text-lg border-2 transition-all duration-300 flex items-center gap-3
                ${isInvalid ? 'bg-red-900 border-red-500 text-red-200 animate-pulse' :
                    (s === 0 && r === 0) ? 'bg-blue-900 border-blue-500 text-blue-200' : 'bg-gray-100 border-gray-200 text-gray-500'}
            `}>
                {isInvalid ? (
                    <>⚠️ INVALID STATE (Both 0)</>
                ) : (s === 0 && r === 0) ? (
                    <>🔒 HOLD STATE (Memory)</>
                ) : (s === 1) ? (
                    <>SET STATE (Q=1)</>
                ) : (
                    <>RESET STATE (Q=0)</>
                )}
            </div>

        </div>
    );
}
