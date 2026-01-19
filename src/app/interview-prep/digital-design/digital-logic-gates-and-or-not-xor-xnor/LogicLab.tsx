"use client";

import { useState } from "react";
import { Lightbulb, ToggleLeft, ToggleRight, CheckCircle2 } from "lucide-react";

type GateType = "AND" | "OR" | "NOT" | "NAND" | "NOR" | "XOR" | "XNOR";

const GATES: Record<GateType, {
    description: string;
    truthTable: { a: number; b: number; out: number }[];
    evaluate: (a: number, b: number) => number;
}> = {
    AND: {
        description: "Output is 1 only if BOTH inputs are 1.",
        evaluate: (a, b) => a & b,
        truthTable: [
            { a: 0, b: 0, out: 0 },
            { a: 0, b: 1, out: 0 },
            { a: 1, b: 0, out: 0 },
            { a: 1, b: 1, out: 1 },
        ]
    },
    OR: {
        description: "Output is 1 if AT LEAST ONE input is 1.",
        evaluate: (a, b) => a | b,
        truthTable: [
            { a: 0, b: 0, out: 0 },
            { a: 0, b: 1, out: 1 },
            { a: 1, b: 0, out: 1 },
            { a: 1, b: 1, out: 1 },
        ]
    },
    NOT: {
        description: "Inverter. Output is opposite of input. (Ignores Input B)",
        evaluate: (a, b) => Number(!a),
        truthTable: [
            { a: 0, b: 0, out: 1 },
            { a: 1, b: 0, out: 0 },
        ]
    },
    XOR: {
        description: "Exclusive OR. Output is 1 if inputs are DIFFERENT.",
        evaluate: (a, b) => a ^ b,
        truthTable: [
            { a: 0, b: 0, out: 0 },
            { a: 0, b: 1, out: 1 },
            { a: 1, b: 0, out: 1 },
            { a: 1, b: 1, out: 0 },
        ]
    },
    XNOR: {
        description: "Exclusive NOR. Output is 1 if inputs are SAME.",
        evaluate: (a, b) => Number(a === b),
        truthTable: [
            { a: 0, b: 0, out: 1 },
            { a: 0, b: 1, out: 0 },
            { a: 1, b: 0, out: 0 },
            { a: 1, b: 1, out: 1 },
        ]
    },
    NAND: {
        description: "Not AND. Output is 0 only if BOTH inputs are 1.",
        evaluate: (a, b) => Number(!(a & b)),
        truthTable: [
            { a: 0, b: 0, out: 1 },
            { a: 0, b: 1, out: 1 },
            { a: 1, b: 0, out: 1 },
            { a: 1, b: 1, out: 0 },
        ]
    },
    NOR: {
        description: "Not OR. Output is 1 only if BOTH inputs are 0.",
        evaluate: (a, b) => Number(!(a | b)),
        truthTable: [
            { a: 0, b: 0, out: 1 },
            { a: 0, b: 1, out: 0 },
            { a: 1, b: 0, out: 0 },
            { a: 1, b: 1, out: 0 },
        ]
    }
};

export default function LogicLab() {
    const [selectedGate, setSelectedGate] = useState<GateType>("AND");
    const [inputA, setInputA] = useState<number>(0);
    const [inputB, setInputB] = useState<number>(0);

    const gate = GATES[selectedGate];
    const output = gate.evaluate(inputA, inputB);

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-yellow-500" />
                Interactive: Logic Lab
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Controls */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Gate</label>
                        <select
                            value={selectedGate}
                            onChange={(e) => setSelectedGate(e.target.value as GateType)}
                            className="w-full text-lg p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            {Object.keys(GATES).map((g) => (
                                <option key={g} value={g}>{g} Gate</option>
                            ))}
                        </select>
                        <p className="text-sm text-gray-500 mt-2 italic">{gate.description}</p>
                    </div>

                    <div className="flex gap-8 justify-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                        {/* Input A */}
                        <div className="text-center">
                            <span className="block font-bold text-gray-700 mb-2">Input A</span>
                            <button
                                onClick={() => setInputA(inputA === 0 ? 1 : 0)}
                                className={`text-4xl transition-colors ${inputA ? 'text-green-600' : 'text-gray-400'}`}
                            >
                                {inputA ? <ToggleRight className="w-12 h-12" /> : <ToggleLeft className="w-12 h-12" />}
                            </button>
                            <div className="font-mono font-bold mt-1 text-xl">{inputA}</div>
                        </div>

                        {/* Input B (Hidden for NOT) */}
                        {selectedGate !== "NOT" && (
                            <div className="text-center">
                                <span className="block font-bold text-gray-700 mb-2">Input B</span>
                                <button
                                    onClick={() => setInputB(inputB === 0 ? 1 : 0)}
                                    className={`text-4xl transition-colors ${inputB ? 'text-green-600' : 'text-gray-400'}`}
                                >
                                    {inputB ? <ToggleRight className="w-12 h-12" /> : <ToggleLeft className="w-12 h-12" />}
                                </button>
                                <div className="font-mono font-bold mt-1 text-xl">{inputB}</div>
                            </div>
                        )}
                    </div>

                    {/* Output Display */}
                    <div className={`p-6 rounded-xl border-2 flex items-center justify-between shadow-sm transition-all duration-300 ${output ? 'bg-yellow-50 border-yellow-400' : 'bg-gray-100 border-gray-300'}`}>
                        <div>
                            <span className="block text-sm font-bold uppercase tracking-wider text-gray-500">Output Z</span>
                            <span className={`text-3xl font-extrabold ${output ? 'text-yellow-600' : 'text-gray-400'}`}>
                                {output}
                            </span>
                        </div>
                        <Lightbulb className={`w-10 h-10 transition-all duration-300 ${output ? 'text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)] fill-yellow-500' : 'text-gray-300'}`} />
                    </div>
                </div>

                {/* Right Truth Table */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                    <table className="w-full text-center border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider border-b border-gray-200">
                                <th className="py-3 px-4 border-r border-gray-200">A</th>
                                {selectedGate !== "NOT" && <th className="py-3 px-4 border-r border-gray-200">B</th>}
                                <th className="py-3 px-4 bg-yellow-50/50 text-yellow-900">Output</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 font-mono text-lg text-gray-800 bg-white">
                            {gate.truthTable.map((row, idx) => {
                                // Highlight active row
                                const isActive = row.a === inputA && (selectedGate === "NOT" || row.b === inputB);
                                return (
                                    <tr key={idx} className={`transition-colors ${isActive ? 'bg-blue-100 ring-1 ring-inset ring-blue-300' : 'hover:bg-gray-50'}`}>
                                        <td className="py-3 border-r border-gray-100">{row.a}</td>
                                        {selectedGate !== "NOT" && <td className="py-3 border-r border-gray-100">{row.b}</td>}
                                        <td className={`py-3 font-bold ${row.out ? 'text-yellow-600' : 'text-gray-400'}`}>
                                            {row.out}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="p-3 text-center text-xs text-gray-500 bg-gray-50 border-t border-gray-200">
                        Values match switches
                    </div>
                </div>
            </div>
        </div>
    );
}
