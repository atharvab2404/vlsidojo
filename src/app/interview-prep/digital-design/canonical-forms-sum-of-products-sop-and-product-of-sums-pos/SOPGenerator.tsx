"use client";

import { useState } from "react";
import { Copy, RefreshCw, Calculator, Sigma, Pi } from "lucide-react";

export default function SOPGenerator() {
    // 3-variable Truth Table has 8 rows (0 to 7)
    // State stores the Output Y for each row (initially all 0)
    const [outputs, setOutputs] = useState<number[]>(Array(8).fill(0));

    const toggleOutput = (index: number) => {
        const newOutputs = [...outputs];
        newOutputs[index] = newOutputs[index] === 0 ? 1 : 0;
        setOutputs(newOutputs);
    };

    const reset = () => setOutputs(Array(8).fill(0));

    // Helper to get binary string
    const toBin = (n: number) => n.toString(2).padStart(3, '0');

    // Generate Expressions
    const generateSOP = () => {
        const minterms = outputs
            .map((out, idx) => (out === 1 ? idx : -1))
            .filter((idx) => idx !== -1);

        if (minterms.length === 0) return "0 (Logic Low)";
        if (minterms.length === 8) return "1 (Logic High)";

        const expression = minterms.map(m => {
            const bin = toBin(m);
            return `${bin[0] === '0' ? "A'" : "A"}${bin[1] === '0' ? "B'" : "B"}${bin[2] === '0' ? "C'" : "C"}`
        }).join(" + ");

        return expression;
    };

    const generatePOS = () => {
        const maxterms = outputs
            .map((out, idx) => (out === 0 ? idx : -1)) // Maxterms correspond to 0s
            .filter((idx) => idx !== -1);

        if (maxterms.length === 0) return "1 (Logic High)"; // No 0s means always 1
        if (maxterms.length === 8) return "0 (Logic Low)"; // All 0s means always 0

        const expression = maxterms.map(m => {
            const bin = toBin(m);
            // INVERT logic for Maxterms: 0 -> A, 1 -> A'
            const termA = bin[0] === '0' ? "A" : "A'";
            const termB = bin[1] === '0' ? "B" : "B'";
            const termC = bin[2] === '0' ? "C" : "C'";
            return `(${termA} + ${termB} + ${termC})`;
        }).join(" . ");

        return expression;
    };

    const getShorthandSOP = () => {
        const indices = outputs.map((out, i) => out === 1 ? i : -1).filter(i => i !== -1);
        return `Σ m(${indices.join(", ")})`;
    };

    const getShorthandPOS = () => {
        const indices = outputs.map((out, i) => out === 0 ? i : -1).filter(i => i !== -1);
        return `Π M(${indices.join(", ")})`;
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-indigo-600" />
                Interactive: Canonical Form Generator
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Truth Table Input */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Truth Table</span>
                        <button onClick={reset} className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1 transition-colors">
                            <RefreshCw className="w-3 h-3" /> Reset
                        </button>
                    </div>
                    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                        <table className="w-full text-center text-sm">
                            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                                <tr>
                                    <th className="py-2 w-12 border-r border-gray-100">Dec</th>
                                    <th className="py-2 w-8">A</th>
                                    <th className="py-2 w-8">B</th>
                                    <th className="py-2 w-8 border-r border-gray-100">C</th>
                                    <th className="py-2 cursor-help text-indigo-600" title="Click rows to toggle">Y (Output)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 font-mono">
                                {outputs.map((out, i) => {
                                    const bin = toBin(i);
                                    return (
                                        <tr
                                            key={i}
                                            onClick={() => toggleOutput(i)}
                                            className={`cursor-pointer transition-colors duration-150 group
                                        ${out === 1 ? 'bg-green-50/60 hover:bg-green-100/60' : 'hover:bg-gray-50'}
                                    `}
                                        >
                                            <td className="py-1.5 border-r border-gray-100 text-gray-400 font-sans">{i}</td>
                                            <td className="py-1.5 text-gray-600">{bin[0]}</td>
                                            <td className="py-1.5 text-gray-600">{bin[1]}</td>
                                            <td className="py-1.5 border-r border-gray-100 text-gray-600">{bin[2]}</td>
                                            <td className="py-1.5 font-bold">
                                                <span className={`px-2 py-0.5 rounded ${out === 1 ? 'bg-green-200 text-green-800' : 'bg-gray-100 text-gray-400'}`}>
                                                    {out}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Results Area */}
                <div className="space-y-6 flex flex-col justify-center">

                    {/* SOP Result */}
                    <div className="bg-white p-4 rounded-xl border border-green-200 shadow-[0_2px_10px_rgba(34,197,94,0.05)] relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-bold text-green-800 flex items-center gap-2">
                                <Sigma className="w-5 h-5" /> SOP (Sum of Products)
                            </h4>
                            <span className="text-xs font-mono text-green-600 bg-green-50 px-2 py-1 rounded">Focus on 1s</span>
                        </div>
                        <div className="font-mono text-sm text-gray-800 break-words mb-2 pl-7 border-l-2 border-green-500">
                            Y = {generateSOP()}
                        </div>
                        <div className="font-mono text-xs text-green-600 opacity-70">
                            Shorthand: {getShorthandSOP()}
                        </div>
                    </div>

                    {/* POS Result */}
                    <div className="bg-white p-4 rounded-xl border border-red-200 shadow-[0_2px_10px_rgba(239,68,68,0.05)] relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-bold text-red-900 flex items-center gap-2">
                                <Pi className="w-5 h-5" /> POS (Product of Sums)
                            </h4>
                            <span className="text-xs font-mono text-red-600 bg-red-50 px-2 py-1 rounded">Focus on 0s</span>
                        </div>
                        <div className="font-mono text-sm text-gray-800 break-words mb-2 pl-7 border-l-2 border-red-500">
                            Y = {generatePOS()}
                        </div>
                        <div className="font-mono text-xs text-red-600 opacity-70">
                            Shorthand: {getShorthandPOS()}
                        </div>
                    </div>

                    <div className="bg-indigo-50 p-4 rounded-lg text-xs leading-relaxed text-indigo-800 border-l-4 border-indigo-400">
                        <strong>Observation:</strong><br />
                        SOP describes when the output is <strong>ON</strong>.<br />
                        POS describes when the output is <strong>NOT OFF</strong>.<br />
                        Logically, they represent the exact same function!
                    </div>

                </div>

            </div>
        </div>
    );
}
