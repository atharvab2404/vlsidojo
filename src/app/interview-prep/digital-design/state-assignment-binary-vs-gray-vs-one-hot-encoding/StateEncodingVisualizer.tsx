"use client";

import React, { useState, useEffect } from "react";
import { Copy, RefreshCw, Zap, Layers, Activity } from "lucide-react";

/**
 * Utility to generate Gray Code
 */
const getGrayCode = (n: number, bits: number): string => {
    const gray = n ^ (n >> 1);
    return gray.toString(2).padStart(bits, "0");
};

/**
 * Utility to generate One-Hot Code
 */
const getOneHotCode = (n: number, states: number): string => {
    // One-Hot: Bit 'n' is 1, rest 0.
    // 1 << n
    // But usually for states 0..N, we map:
    // State 0: 0001
    // State 1: 0010
    // ...
    // Padding to N bits
    const val = BigInt(1) << BigInt(n);
    // Convert to binary string of length 'states'
    // Reverse order? Typically S0 is LSB (00...01) or specific index.
    // Let's print visually.
    let s = "";
    for (let i = states - 1; i >= 0; i--) {
        s += i === n ? "1" : "0";
    }
    return s;
};

const StateEncodingVisualizer = () => {
    const [numStates, setNumStates] = useState<number>(4);
    const [encodingType, setEncodingType] = useState<"binary" | "gray" | "onehot">("binary");
    const [highlightChange, setHighlightChange] = useState<boolean>(true);

    // Calculate bits needed
    const bitsBinary = Math.ceil(Math.log2(numStates));
    const bitsTotal = encodingType === "onehot" ? numStates : bitsBinary;

    // Generate Table Data
    const tableData = Array.from({ length: numStates }, (_, i) => {
        let code = "";
        if (encodingType === "binary") {
            code = i.toString(2).padStart(bitsBinary, "0");
        } else if (encodingType === "gray") {
            code = getGrayCode(i, bitsBinary);
        } else {
            code = getOneHotCode(i, numStates);
        }
        return { state: `S${i}`, code, prevCode: "" }; // prevCode filled in next pass if needed
    });

    // Helper to count bit flips from prev state
    const getBitFlips = (curr: string, prev: string) => {
        if (!prev) return 0;
        let flips = 0;
        for (let i = 0; i < curr.length; i++) {
            if (curr[i] !== prev[i]) flips++;
        }
        return flips;
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 my-8">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-indigo-600" />
                    State Encoding Visualizer
                </h3>
            </div>

            {/* Controls */}
            <div className="grid md:grid-cols-2 gap-6 mb-8 bg-slate-50 p-4 rounded-xl">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Number of States (N)</label>
                    <div className="flex items-center gap-4">
                        <input
                            type="range"
                            min="2"
                            max="8"
                            value={numStates}
                            onChange={(e) => setNumStates(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <span className="font-mono font-bold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-md">{numStates}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                        Higher N increases required Flip-Flops (Width).
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Encoding Style</label>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setEncodingType("binary")}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${encodingType === "binary" ? "bg-indigo-600 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}
                        >
                            Binary
                        </button>
                        <button
                            onClick={() => setEncodingType("gray")}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${encodingType === "gray" ? "bg-emerald-600 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}
                        >
                            Gray
                        </button>
                        <button
                            onClick={() => setEncodingType("onehot")}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${encodingType === "onehot" ? "bg-amber-600 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}
                        >
                            One-Hot
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Panel */}
            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-100">
                    <div className="text-xs text-indigo-600 font-semibold uppercase tracking-wider mb-1">Total Flip-Flops</div>
                    <div className="text-2xl font-bold text-indigo-900">{bitsTotal}</div>
                    <div className="text-xs text-indigo-400">Bits Width</div>
                </div>
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                    <div className="text-xs text-emerald-600 font-semibold uppercase tracking-wider mb-1">Avg Bit Flips</div>
                    <div className="text-2xl font-bold text-emerald-900">
                        {encodingType === 'gray' ? '1.0' : encodingType === 'onehot' ? '2.0' : (numStates / 2).toFixed(1) /* Approx */}
                    </div>
                    <div className="text-xs text-emerald-400">Power Metric (Lower is better)</div>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                    <div className="text-xs text-amber-600 font-semibold uppercase tracking-wider mb-1">Decoding Logic</div>
                    <div className="text-sm font-bold text-amber-900 mt-2">
                        {encodingType === 'onehot' ? 'Simple (Low Area)' : 'Complex (Muxes)'}
                    </div>
                </div>
            </div>

            {/* Visual Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-sm text-center">
                    <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                        <tr>
                            <th className="p-3 w-20">State</th>
                            <th className="p-3">Encoding (Flip-Flop Values)</th>
                            <th className="p-3 w-32">Bit Flips</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {tableData.map((row, idx) => {
                            const prevRow = tableData[idx - 1] || tableData[tableData.length - 1]; // Circular check for last->first? Or just prev.
                            // Let's compare with previous row for transition cost
                            const flips = idx === 0 ? 0 : getBitFlips(row.code, prevRow.code);

                            return (
                                <tr key={row.state} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-3 font-mono font-bold text-slate-700 bg-slate-50/50">{row.state}</td>
                                    <td className="p-3 font-mono text-base tracking-widest text-slate-800">
                                        {row.code.split('').map((bit, bitIdx) => {
                                            // Highlight changed bits
                                            const prevBit = idx > 0 ? prevRow.code[bitIdx] : bit;
                                            const isChanged = prevBit !== bit;
                                            return (
                                                <span
                                                    key={bitIdx}
                                                    className={`${isChanged && idx > 0 ? (encodingType === 'gray' ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold') : ''}`}
                                                >
                                                    {bit}
                                                </span>
                                            );
                                        })}
                                    </td>
                                    <td className="p-3">
                                        {idx > 0 && (
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${flips === 1 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                                {flips} Flip{flips !== 1 ? 's' : ''}
                                            </span>
                                        )}
                                        {idx === 0 && <span className="text-slate-400">-</span>}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center italic">
                *Bit Flips shows transitions from State N-1 to State N.
            </p>
        </div>
    );
};

export default StateEncodingVisualizer;
