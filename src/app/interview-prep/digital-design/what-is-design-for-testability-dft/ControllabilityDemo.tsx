"use client";

import React, { useState } from 'react';
import { Play, Eye, MousePointerClick, Zap } from 'lucide-react';

const ControllabilityDemo = () => {
    const [inputs, setInputs] = useState([0, 0, 0, 0]); // Primary Inputs
    const [testPointEnabled, setTestPointEnabled] = useState(false);
    const [scanValue, setScanValue] = useState(0); // Value injected via Scan Chain

    // Logic: A simple chain of AND gates
    // Gate 1: In0 & In1
    // Gate 2: Gate1 & In2 (Or ScanValue if enabled)
    // Gate 3: Gate2 & In3

    const wire1 = inputs[0] & inputs[1];

    // Wire 2 is the Critical Net. If Test Point is enabled, we Control it directly.
    const wire2_premux = wire1 & inputs[2];
    const wire2 = testPointEnabled ? scanValue : wire2_premux;

    const output = wire2 & inputs[3];

    const toggleInput = (idx: number) => {
        const newInputs = [...inputs];
        newInputs[idx] = newInputs[idx] === 0 ? 1 : 0;
        setInputs(newInputs);
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-100 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-4">
                    <span className="font-bold text-slate-700">DFT Mode:</span>
                    <button
                        onClick={() => setTestPointEnabled(!testPointEnabled)}
                        className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${testPointEnabled
                                ? "bg-indigo-600 text-white shadow-lg"
                                : "bg-white text-slate-500 border border-slate-300 hover:bg-slate-50"
                            }`}
                    >
                        {testPointEnabled ? <Zap className="w-4 h-4" /> : <MousePointerClick className="w-4 h-4" />}
                        {testPointEnabled ? "Test Point INSERTED" : "No DFT"}
                    </button>
                </div>

                {testPointEnabled && (
                    <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4">
                        <span className="text-sm font-bold text-indigo-700">Scan Chain Control:</span>
                        <button
                            onClick={() => setScanValue(scanValue === 0 ? 1 : 0)}
                            className={`w-12 h-8 rounded flex items-center justify-center font-mono font-bold transition-colors ${scanValue ? "bg-emerald-500 text-white" : "bg-slate-700 text-white"
                                }`}
                        >
                            {scanValue}
                        </button>
                    </div>
                )}
            </div>

            {/* Schematic */}
            <div className="bg-slate-900 rounded-2xl p-8 relative overflow-hidden min-h-[250px] border border-slate-700 shadow-inner flex items-center justify-center">
                <svg viewBox="0 0 800 200" className="w-full h-full max-w-4xl">
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* --- Wire Styles --- */}
                    {/* Helper to get color based on logic level */}
                    {/* 0 = Gray/Dark, 1 = Green/Bright */}

                    {/* --- Input 0 --- */}
                    <rect x="20" y="40" width="30" height="30" rx="4" fill={inputs[0] ? "#10b981" : "#334155"} className="cursor-pointer" onClick={() => toggleInput(0)} />
                    <text x="35" y="60" textAnchor="middle" fill="white" fontSize="12" pointerEvents="none">{inputs[0]}</text>
                    <path d="M50,55 L100,55" stroke={inputs[0] ? "#10b981" : "#475569"} strokeWidth="3" />

                    {/* --- Input 1 --- */}
                    <rect x="20" y="90" width="30" height="30" rx="4" fill={inputs[1] ? "#10b981" : "#334155"} className="cursor-pointer" onClick={() => toggleInput(1)} />
                    <text x="35" y="110" textAnchor="middle" fill="white" fontSize="12" pointerEvents="none">{inputs[1]}</text>
                    <path d="M50,105 L100,105 L100,85" stroke={inputs[1] ? "#10b981" : "#475569"} strokeWidth="3" fill="none" />

                    {/* --- Gate 1 (AND) --- */}
                    <g transform="translate(100, 50)">
                        <path d="M0,0 V40 H20 A20,20 0 0,0 20,-40 H0 Z" transform="translate(0, 20)" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
                    </g>
                    {/* Wire 1 Output */}
                    <path d="M140,70 L250,70" stroke={wire1 ? "#10b981" : "#475569"} strokeWidth="3" />


                    {/* --- Input 2 --- */}
                    <rect x="200" y="110" width="30" height="30" rx="4" fill={inputs[2] ? "#10b981" : "#334155"} className="cursor-pointer" onClick={() => toggleInput(2)} />
                    <text x="215" y="130" textAnchor="middle" fill="white" fontSize="12" pointerEvents="none">{inputs[2]}</text>
                    <path d="M230,125 L250,125 L250,100" stroke={inputs[2] ? "#10b981" : "#475569"} strokeWidth="3" fill="none" />

                    {/* --- Gate 2 (AND) --- */}
                    <g transform="translate(250, 65)">
                        <path d="M0,0 V40 H20 A20,20 0 0,0 20,-40 H0 Z" transform="translate(0, 20)" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
                    </g>

                    {/* --- TEST POINT INSERTION (MUX) --- */}
                    {testPointEnabled ? (
                        <g>
                            {/* Mux Symbol */}
                            <path d="M320,60 L320,130 L350,120 L350,70 Z" fill="#6366f1" stroke="white" strokeWidth="2" />
                            <text x="335" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">DFT</text>

                            {/* Logic Path entering Mux (0 input) */}
                            <path d="M290,85 L320,85" stroke={wire2_premux ? "#10b981" : "#475569"} strokeWidth="3" />

                            {/* Scan Path entering Mux (1 input) */}
                            <path d="M300,150 L300,110 L320,110" stroke={scanValue ? "#10b981" : "#475569"} strokeWidth="3" strokeDasharray="4,4" fill="none" />
                            <text x="300" y="165" textAnchor="middle" fill="#6366f1" fontSize="10">SCAN IN</text>

                            {/* Mux Output */}
                            <path d="M350,95 L450,95" stroke={wire2 ? "#10b981" : "#475569"} strokeWidth="3" />
                        </g>
                    ) : (
                        // Normal Wire if no DFT
                        <path d="M290,85 L450,85" stroke={wire2 ? "#10b981" : "#475569"} strokeWidth="3" />
                    )}


                    {/* --- Input 3 --- */}
                    <rect x="400" y="130" width="30" height="30" rx="4" fill={inputs[3] ? "#10b981" : "#334155"} className="cursor-pointer" onClick={() => toggleInput(3)} />
                    <text x="415" y="150" textAnchor="middle" fill="white" fontSize="12" pointerEvents="none">{inputs[3]}</text>
                    <path d="M430,145 L450,145 L450,115" stroke={inputs[3] ? "#10b981" : "#475569"} strokeWidth="3" fill="none" />

                    {/* --- Gate 3 (AND) --- */}
                    <g transform="translate(450, 80)">
                        <path d="M0,0 V40 H20 A20,20 0 0,0 20,-40 H0 Z" transform="translate(0, 20)" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
                    </g>

                    {/* --- Final Output --- */}
                    <path d="M490,100 L550,100" stroke={output ? "#10b981" : "#475569"} strokeWidth="3" />
                    <circle cx="560" cy="100" r="10" fill={output ? "#10b981" : "#334155"} stroke="white" strokeWidth="2" />
                    <text x="560" y="130" textAnchor="middle" fill="white" fontSize="12">OUT</text>

                </svg>

                {/* Status Overlay */}
                <div className="absolute top-4 right-4 bg-black/60 rounded-lg p-3 backdrop-blur-sm border border-slate-600">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-xs text-slate-300">Controllability:</span>
                            <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                                <div className={`h-full transition-all duration-500 ${testPointEnabled ? "w-full bg-emerald-500" : "w-[20%] bg-rose-500"}`}></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-xs text-slate-300">Observability:</span>
                            <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                                <div className={`h-full transition-all duration-500 ${testPointEnabled ? "w-full bg-emerald-500" : "w-[20%] bg-rose-500"}`}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`p-6 rounded-xl border-l-4 transition-colors ${testPointEnabled ? "bg-indigo-50 border-indigo-500" : "bg-white border-slate-300"}`}>
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    {testPointEnabled ? <Zap className="w-5 h-5 text-indigo-600" /> : <Eye className="w-5 h-5 text-slate-400" />}
                    {testPointEnabled ? "High Controllability acheived!" : "Low Controllability"}
                </h4>
                <p className="text-slate-700 text-sm leading-relaxed">
                    {testPointEnabled
                        ? "With the Scan Point inserted, we can force the middle of the circuit to '0' or '1' instantly, bypassing the logic before it. We now have full control over the second half of the circuit."
                        : "To switch the output to '1', you currently need ALL inputs to be '1'. If Gate 1 is broken (stuck-at-0), it is very hard to propagate that fault to the output to detect it. This 'Logic Depth' makes testing expensive."}
                </p>
            </div>
        </div>
    );
};

export default ControllabilityDemo;
