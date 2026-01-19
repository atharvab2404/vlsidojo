"use client";

import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Zap, Bug } from 'lucide-react';

type WireState = 'normal' | 'sa0' | 'sa1';

const FaultSimulator = () => {
    const [inputs, setInputs] = useState<[number, number]>([0, 0]);

    // Fault States for the 3 wires: Input A, Input B, Output Y
    const [faults, setFaults] = useState<[WireState, WireState, WireState]>(['normal', 'normal', 'normal']);

    // True Logic (NAND Gate)
    const expectedOutput = !(inputs[0] && inputs[1]) ? 1 : 0;

    // Faulty Logic Calculation
    const getWireValue = (val: number, fault: WireState) => {
        if (fault === 'sa0') return 0;
        if (fault === 'sa1') return 1;
        return val;
    };

    const valA = getWireValue(inputs[0], faults[0]);
    const valB = getWireValue(inputs[1], faults[1]);

    // Logic: NAND
    const internalNand = !(valA && valB) ? 1 : 0;

    const actualOutput = getWireValue(internalNand, faults[2]);

    const isFaultDetected = actualOutput !== expectedOutput;
    const hasFault = faults.some(f => f !== 'normal');

    const cycleFault = (index: number) => {
        const states: WireState[] = ['normal', 'sa0', 'sa1'];
        const currentIdx = states.indexOf(faults[index]);
        const nextState = states[(currentIdx + 1) % 3];

        const newFaults = [...faults] as [WireState, WireState, WireState];
        newFaults[index] = nextState;
        setFaults(newFaults);
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Control Panel */}
            <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-500 uppercase">Input Vector</span>
                        <div className="flex gap-2 mt-1">
                            <button
                                onClick={() => setInputs([inputs[0] === 0 ? 1 : 0, inputs[1]])}
                                className={`w-10 h-10 rounded font-mono font-bold border transition-all ${inputs[0] ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-gray-500 border-gray-300'}`}
                            >
                                A={inputs[0]}
                            </button>
                            <button
                                onClick={() => setInputs([inputs[0], inputs[1] === 0 ? 1 : 0])}
                                className={`w-10 h-10 rounded font-mono font-bold border transition-all ${inputs[1] ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-gray-500 border-gray-300'}`}
                            >
                                B={inputs[1]}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 border ${hasFault
                            ? (isFaultDetected ? "bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-rose-100 text-rose-800 border-rose-300")
                            : "bg-gray-100 text-gray-500 border-gray-200"
                        }`}>
                        {hasFault ? (
                            isFaultDetected ? <><CheckCircle className="w-5 h-5" /> FAULT DETECTED</> : <><AlertTriangle className="w-5 h-5" /> FAULT MASKED</>
                        ) : (
                            <><CheckCircle className="w-5 h-5" /> NO FAULTS</>
                        )}
                    </div>
                </div>
            </div>

            {/* Schematic */}
            <div className="bg-slate-900 rounded-2xl p-8 relative overflow-hidden min-h-[300px] border border-slate-700 shadow-inner flex items-center justify-center select-none">
                <svg viewBox="0 0 600 250" className="w-full h-full max-w-2xl">

                    {/* --- Wires & Inputs --- */}

                    {/* Wire A */}
                    <g onClick={() => cycleFault(0)} className="cursor-pointer hover:opacity-80 transition-opacity">
                        <path d="M50,80 L200,80" stroke={inputs[0] ? "#10b981" : "#334155"} strokeWidth="4" />
                        <rect x="20" y="65" width="30" height="30" rx="4" fill={inputs[0] ? "#10b981" : "#334155"} />
                        <text x="35" y="85" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">A</text>
                        {/* Fault Indicator */}
                        {faults[0] !== 'normal' && (
                            <g transform="translate(100, 80)">
                                <circle r="12" fill="#ef4444" stroke="white" strokeWidth="2" />
                                <text dy="5" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                                    {faults[0] === 'sa0' ? 'SA0' : 'SA1'}
                                </text>
                            </g>
                        )}
                    </g>
                    {/* Value after fault A */}
                    <text x="180" y="70" fill={valA ? "#10b981" : "#64748b"} fontSize="12" fontFamily="monospace">{valA}</text>


                    {/* Wire B */}
                    <g onClick={() => cycleFault(1)} className="cursor-pointer hover:opacity-80 transition-opacity">
                        <path d="M50,170 L200,170" stroke={inputs[1] ? "#10b981" : "#334155"} strokeWidth="4" />
                        <rect x="20" y="155" width="30" height="30" rx="4" fill={inputs[1] ? "#10b981" : "#334155"} />
                        <text x="35" y="175" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">B</text>
                        {/* Fault Indicator */}
                        {faults[1] !== 'normal' && (
                            <g transform="translate(100, 170)">
                                <circle r="12" fill="#ef4444" stroke="white" strokeWidth="2" />
                                <text dy="5" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                                    {faults[1] === 'sa0' ? 'SA0' : 'SA1'}
                                </text>
                            </g>
                        )}
                    </g>
                    {/* Value after fault B */}
                    <text x="180" y="160" fill={valB ? "#10b981" : "#64748b"} fontSize="12" fontFamily="monospace">{valB}</text>


                    {/* --- NAND Gate --- */}
                    <g transform="translate(200, 65)">
                        <path d="M0,0 V120 H50 A60,60 0 0,0 50,-120 H0 Z" transform="translate(0, 60)" fill="#1e293b" stroke="#cbd5e1" strokeWidth="3" />
                        <circle cx="116" cy="60" r="6" fill="none" stroke="#cbd5e1" strokeWidth="3" />
                        <text x="30" y="70" fill="#94a3b8" fontSize="20" fontWeight="bold">NAND</text>
                    </g>


                    {/* Wire Output */}
                    <g onClick={() => cycleFault(2)} className="cursor-pointer hover:opacity-80 transition-opacity">
                        <path d="M322,125 L450,125" stroke={actualOutput ? "#10b981" : "#334155"} strokeWidth="4" />
                        {/* Fault Indicator */}
                        {faults[2] !== 'normal' && (
                            <g transform="translate(380, 125)">
                                <circle r="12" fill="#ef4444" stroke="white" strokeWidth="2" />
                                <text dy="5" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                                    {faults[2] === 'sa0' ? 'SA0' : 'SA1'}
                                </text>
                            </g>
                        )}
                    </g>

                    {/* Output Box */}
                    <rect x="450" y="100" width="120" height="50" rx="8" fill={actualOutput ? "#10b981" : "#334155"} stroke="white" strokeWidth="2" />
                    <text x="510" y="130" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
                        Y = {actualOutput}
                    </text>

                    <text x="510" y="170" textAnchor="middle" fill="#94a3b8" fontSize="12">
                        Expected: {expectedOutput}
                    </text>

                </svg>

                <div className="absolute top-4 right-4 bg-black/60 text-xs text-slate-400 p-2 rounded backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-1">
                        <Bug className="w-3 h-3 text-red-500" />
                        <span>Click wires to inject faults</span>
                    </div>
                </div>
            </div>

            {hasFault && (
                <div className={`p-4 rounded-lg text-sm border-l-4 ${isFaultDetected ? "bg-emerald-50 border-emerald-500 text-emerald-900" : "bg-rose-50 border-rose-500 text-rose-900"}`}>
                    <p className="font-bold mb-1">
                        {isFaultDetected ? "Success! Fault Detected." : "Failure! Fault Masked."}
                    </p>
                    <p className="opacity-80">
                        {isFaultDetected
                            ? `The physical defect changed the logic functionality for this input vector (Expected ${expectedOutput}, got ${actualOutput}). The tester will flag this chip as bad.`
                            : `The physical defect did NOT affect the output for this specific input vector. The tester thinks the chip is fine, but it's actually broken.`}
                    </p>
                </div>
            )}
        </div>
    );
};

export default FaultSimulator;
