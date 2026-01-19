"use client";

import { useState } from "react";
import { Plus, ArrowRight, CornerDownRight } from "lucide-react";

export default function AdderVisualizer() {
    const [mode, setMode] = useState<'HALF' | 'FULL'>('HALF');

    // Inputs: A, B, Cin (Cin only used in Full Adder)
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [cin, setCin] = useState(0);

    // Logic Calculation
    // Half Adder: Sum = A ^ B, Carry = A & B
    // Full Adder: Sum = A ^ B ^ Cin, Carry = (A&B) | (Cin&(A^B))

    let sum, carry;

    if (mode === 'HALF') {
        sum = a ^ b;
        carry = a & b;
    } else {
        sum = a ^ b ^ cin;
        // Majority function for Carry
        carry = (a & b) | (b & cin) | (a & cin);
    }

    // Helper for table highlighting
    const isRowActive = (rA: number, rB: number, rCin?: number) => {
        if (mode === 'HALF') return a === rA && b === rB;
        return a === rA && b === rB && cin === rCin;
    };

    return (
        <div className="flex flex-col items-center gap-12 select-none py-8">

            {/* Mode Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-xl">
                <button
                    onClick={() => setMode('HALF')}
                    className={`px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2
            ${mode === 'HALF' ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Half Adder
                </button>
                <button
                    onClick={() => setMode('FULL')}
                    className={`px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2
            ${mode === 'FULL' ? 'bg-white shadow text-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Full Adder
                </button>
            </div>

            <div className="flex flex-col lg:flex-row w-full max-w-6xl justify-center items-center lg:items-start gap-12">

                {/* --- SCHEMATIC VIEW --- */}
                <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl relative w-full max-w-md flex flex-col items-center min-h-[400px]">
                    <h3 className="absolute top-4 left-6 text-xs font-bold text-gray-400 tracking-widest">{mode} ADDER CIRCUIT</h3>

                    {/* Inputs */}
                    <div className="flex gap-8 mb-12 mt-8">
                        <div className="flex flex-col items-center gap-2">
                            <button onClick={() => setA(a ^ 1)} className={`w-12 h-12 rounded-xl font-bold text-2xl border-2 transition-all ${a ? 'bg-indigo-500 text-white border-indigo-600 shadow-lg' : 'bg-gray-50 text-gray-300 border-gray-200'}`}>{a}</button>
                            <span className="text-xs font-bold text-gray-400">A</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <button onClick={() => setB(b ^ 1)} className={`w-12 h-12 rounded-xl font-bold text-2xl border-2 transition-all ${b ? 'bg-indigo-500 text-white border-indigo-600 shadow-lg' : 'bg-gray-50 text-gray-300 border-gray-200'}`}>{b}</button>
                            <span className="text-xs font-bold text-gray-400">B</span>
                        </div>
                        {mode === 'FULL' && (
                            <div className="flex flex-col items-center gap-2 animate-in fade-in zoom-in duration-300">
                                <button onClick={() => setCin(cin ^ 1)} className={`w-12 h-12 rounded-xl font-bold text-2xl border-2 transition-all ${cin ? 'bg-amber-500 text-white border-amber-600 shadow-lg' : 'bg-gray-50 text-gray-300 border-gray-200'}`}>{cin}</button>
                                <span className="text-xs font-bold text-gray-400">C<sub>in</sub></span>
                            </div>
                        )}
                    </div>

                    {/* The Black Box Logic */}
                    <div className="w-64 h-32 bg-gray-800 rounded-xl relative flex items-center justify-center border-4 border-gray-700 shadow-2xl mb-12">
                        <Plus className="text-gray-600 w-16 h-16 opacity-20" />
                        <span className="absolute text-white font-bold text-lg tracking-widest">
                            {mode === 'HALF' ? 'A + B' : 'A + B + C'}
                        </span>
                    </div>

                    {/* Outputs */}
                    <div className="flex gap-16">
                        <div className="flex flex-col items-center gap-2">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-3xl border-4 transition-all ${sum ? 'bg-emerald-500 text-white border-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.5)]' : 'bg-gray-100 text-gray-300 border-gray-200'}`}>
                                {sum}
                            </div>
                            <span className="text-sm font-bold text-gray-500">SUM (S)</span>
                            <span className="text-[10px] text-gray-400 font-mono">LSB</span>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-3xl border-4 transition-all ${carry ? 'bg-amber-500 text-white border-amber-600 shadow-[0_0_20px_rgba(245,158,11,0.5)]' : 'bg-gray-100 text-gray-300 border-gray-200'}`}>
                                {carry}
                            </div>
                            <span className="text-sm font-bold text-gray-500">CARRY (C<sub>out</sub>)</span>
                            <span className="text-[10px] text-gray-400 font-mono">MSB</span>
                        </div>
                    </div>

                    <div className="absolute top-1/2 right-4 flex flex-col gap-1 items-end opacity-20">
                        <div className="flex items-center gap-1">
                            <span className="text-[10px] font-bold">XOR</span> <ArrowRight className="w-3 h-3" />
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-[10px] font-bold">AND</span> <CornerDownRight className="w-3 h-3" />
                        </div>
                    </div>

                </div>

                {/* --- LIVE TRUTH TABLE --- */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm">
                    <h3 className="font-bold text-gray-500 mb-4 text-center text-xs tracking-wider uppercase">{mode} Adder Truth Table</h3>
                    <table className="border-collapse text-center w-full min-w-[300px]">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-400 text-xs">
                                {mode === 'FULL' && <th className="p-2 text-amber-500">C<sub>mn</sub></th>}
                                <th className="p-2">A</th>
                                <th className="p-2">B</th>
                                <th className="p-2 border-l border-gray-100 text-emerald-600">Sum</th>
                                <th className="p-2 text-amber-600">Carry</th>
                            </tr>
                        </thead>
                        <tbody className="font-mono text-gray-600">
                            {mode === 'HALF' ? (
                                // Half Adder Table (4 rows)
                                [
                                    [0, 0, 0, 0],
                                    [0, 1, 1, 0],
                                    [1, 0, 1, 0],
                                    [1, 1, 0, 1]
                                ].map(([rA, rB, rS, rC], idx) => (
                                    <tr key={idx} className={`transition-colors duration-200 ${isRowActive(rA, rB) ? 'bg-indigo-50 font-bold text-indigo-900 shadow-sm scale-[1.02]' : ''}`}>
                                        <td className="p-3">{rA}</td>
                                        <td className="p-3">{rB}</td>
                                        <td className="p-3 border-l border-gray-100">{rS}</td>
                                        <td className="p-3">{rC}</td>
                                    </tr>
                                ))
                            ) : (
                                // Full Adder Table (8 rows)
                                [
                                    [0, 0, 0, 0, 0],
                                    [0, 0, 1, 1, 0],
                                    [0, 1, 0, 1, 0],
                                    [0, 1, 1, 0, 1],
                                    [1, 0, 0, 1, 0],
                                    [1, 0, 1, 0, 1],
                                    [1, 1, 0, 0, 1],
                                    [1, 1, 1, 1, 1],
                                ].map(([rA, rB, rCin, rS, rC], idx) => ( // Note: My array order is A, B, Cin. Headers are Cin, A, B. Let's fix loop data or headers.
                                    // Standard Table Order is usually A, B, Cin from 000 to 111.
                                    // Let's stick to standard count for clarity.
                                    <tr key={idx} className={`transition-colors duration-200 ${isRowActive(rA, rB, rCin) ? 'bg-indigo-50 font-bold text-indigo-900 shadow-sm scale-[1.02]' : ''}`}>
                                        <td className="p-2 text-amber-600/70">{rCin}</td>
                                        <td className="p-2">{rA}</td>
                                        <td className="p-2">{rB}</td>
                                        <td className="p-2 border-l border-gray-100">{rS}</td>
                                        <td className="p-2">{rC}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

            <div className="bg-gray-50 p-6 rounded-xl text-center max-w-lg border border-gray-200">
                {mode === 'HALF' ? (
                    <p className="text-gray-700">
                        <strong>Half Adder</strong> adds two bits.
                        <br />
                        It produces a Sum and a Carry, but <strong>cannot accept a Carry-In</strong> from a previous stage.
                    </p>
                ) : (
                    <p className="text-gray-700">
                        <strong>Full Adder</strong> adds three bits (A, B, C<sub>in</sub>).
                        <br />
                        This capability allows us to chain them together to create <strong>Multi-bit Adders</strong> (Ripple Carry).
                    </p>
                )}
            </div>

        </div>
    );
}
