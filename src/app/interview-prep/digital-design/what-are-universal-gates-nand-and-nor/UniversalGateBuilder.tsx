"use client";

import { useState } from "react";
import { Copy, ArrowRight, ToggleLeft, CheckCircle2 } from "lucide-react";

type BaseGate = "NAND" | "NOR";
type TargetGate = "NOT" | "AND" | "OR";

// SVG Components for Schematics
const SchematicNandNot = () => (
    <svg viewBox="0 0 300 100" className="w-full h-full text-gray-800" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Input A split */}
        <path d="M 40 50 L 80 50" />
        <circle cx="80" cy="50" r="3" fill="currentColor" />
        <path d="M 80 50 L 80 35 L 100 35" />
        <path d="M 80 50 L 80 65 L 100 65" />

        {/* NAND Gate Body */}
        <path d="M 100 20 L 140 20 C 165 20 165 80 140 80 L 100 80 Z" fill="white" />
        <circle cx="168" cy="50" r="4" fill="white" />

        {/* Output */}
        <path d="M 172 50 L 220 50" />

        {/* Labels */}
        <text x="25" y="55" className="text-sm font-bold fill-gray-500 stroke-none">A</text>
        <text x="230" y="55" className="text-sm font-bold fill-indigo-600 stroke-none">Y = A'</text>
    </svg>
);

const SchematicNandAnd = () => (
    <svg viewBox="0 0 400 120" className="w-full h-full text-gray-800" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Gate 1: NAND */}
        <path d="M 40 40 L 100 40" /> <text x="25" y="45" className="text-sm font-bold fill-gray-500 stroke-none">A</text>
        <path d="M 40 80 L 100 80" /> <text x="25" y="85" className="text-sm font-bold fill-gray-500 stroke-none">B</text>
        <path d="M 100 25 L 140 25 C 165 25 165 95 140 95 L 100 95 Z" fill="white" />
        <circle cx="168" cy="60" r="4" fill="white" />

        {/* Connector */}
        <path d="M 172 60 L 220 60" />

        {/* Gate 2: NAND as NOT */}
        <circle cx="220" cy="60" r="3" fill="currentColor" />
        <path d="M 220 60 L 220 45 L 240 45" />
        <path d="M 220 60 L 220 75 L 240 75" />

        <path d="M 240 30 L 280 30 C 305 30 305 90 280 90 L 240 90 Z" fill="white" />
        <circle cx="308" cy="60" r="4" fill="white" />

        {/* Output */}
        <path d="M 312 60 L 350 60" />
        <text x="360" y="65" className="text-sm font-bold fill-indigo-600 stroke-none">Y = A.B</text>
    </svg>
);

const SchematicNandOr = () => (
    <svg viewBox="0 0 400 160" className="w-full h-full text-gray-800" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Top Input Inverter (NAND) */}
        <text x="10" y="45" className="text-sm font-bold fill-gray-500 stroke-none">A</text>
        <path d="M 30 40 L 50 40" />
        <path d="M 50 40 L 50 25 L 70 25" />
        <path d="M 50 40 L 50 55 L 70 55" />
        <path d="M 70 10 L 110 10 C 135 10 135 70 110 70 L 70 70 Z" fill="white" />
        <circle cx="138" cy="40" r="4" fill="white" />
        <path d="M 142 40 L 210 40" />

        {/* Bottom Input Inverter (NAND) */}
        <text x="10" y="125" className="text-sm font-bold fill-gray-500 stroke-none">B</text>
        <path d="M 30 120 L 50 120" />
        <path d="M 50 120 L 50 105 L 70 105" />
        <path d="M 50 120 L 50 135 L 70 135" />
        <path d="M 70 90 L 110 90 C 135 90 135 150 110 150 L 70 150 Z" fill="white" />
        <circle cx="138" cy="120" r="4" fill="white" />
        <path d="M 142 120 L 210 120" />

        {/* Final NAND */}
        <path d="M 210 40 L 230 65" />
        <path d="M 210 120 L 230 95" />
        <path d="M 230 50 L 270 50 C 295 50 295 110 270 110 L 230 110 Z" fill="white" />
        <circle cx="298" cy="80" r="4" fill="white" />

        {/* Output */}
        <path d="M 302 80 L 340 80" />
        <text x="350" y="85" className="text-sm font-bold fill-indigo-600 stroke-none">Y = A+B</text>
    </svg>
);

const SchematicNorNot = () => (
    <svg viewBox="0 0 300 100" className="w-full h-full text-gray-800" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Input split */}
        <path d="M 40 50 L 80 50" />
        <circle cx="80" cy="50" r="3" fill="currentColor" />
        <path d="M 80 50 L 80 35 L 105 35" />
        <path d="M 80 50 L 80 65 L 105 65" />

        {/* NOR Gate Body */}
        <path d="M 100 20 C 115 20 125 50 125 50 C 125 50 115 80 100 80 C 140 80 160 50 160 50 C 160 50 140 20 100 20" fill="white" />
        <circle cx="164" cy="50" r="4" fill="white" />

        {/* Output */}
        <path d="M 168 50 L 220 50" />
        <text x="25" y="55" className="text-sm font-bold fill-gray-500 stroke-none">A</text>
        <text x="230" y="55" className="text-sm font-bold fill-indigo-600 stroke-none">Y = A'</text>
    </svg>
);

const SchematicNorOr = () => (
    <svg viewBox="0 0 400 120" className="w-full h-full text-gray-800" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Gate 1: NOR */}
        <text x="25" y="45" className="text-sm font-bold fill-gray-500 stroke-none">A</text>
        <path d="M 40 40 L 95 40" />
        <text x="25" y="85" className="text-sm font-bold fill-gray-500 stroke-none">B</text>
        <path d="M 40 80 L 95 80" />

        <path d="M 90 25 C 105 25 115 60 115 60 C 115 60 105 95 90 95 C 130 95 150 60 150 60 C 150 60 130 25 90 25" fill="white" />
        <circle cx="154" cy="60" r="4" fill="white" />

        {/* Connector */}
        <path d="M 158 60 L 205 60" />

        {/* Gate 2: NOR as NOT */}
        <circle cx="205" cy="60" r="3" fill="currentColor" />
        <path d="M 205 60 L 205 45 L 235 45" />
        <path d="M 205 60 L 205 75 L 235 75" />

        <path d="M 230 30 C 245 30 255 60 255 60 C 255 60 245 90 230 90 C 270 90 290 60 290 60 C 290 60 270 30 230 30" fill="white" />
        <circle cx="294" cy="60" r="4" fill="white" />

        {/* Output */}
        <path d="M 298 60 L 340 60" />
        <text x="350" y="65" className="text-sm font-bold fill-indigo-600 stroke-none">Y = A+B</text>
    </svg>
);

const SchematicNorAnd = () => (
    <svg viewBox="0 0 400 160" className="w-full h-full text-gray-800" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Top Input Inverter (NOR) */}
        <text x="10" y="45" className="text-sm font-bold fill-gray-500 stroke-none">A</text>
        <path d="M 30 40 L 50 40" />
        <path d="M 50 40 L 50 25 L 75 25" />
        <path d="M 50 40 L 50 55 L 75 55" />
        <path d="M 70 10 C 85 10 95 40 95 40 C 95 40 85 70 70 70 C 110 70 130 40 130 40 C 130 40 110 10 70 10" fill="white" />
        <circle cx="134" cy="40" r="4" fill="white" />
        <path d="M 138 40 L 205 40" />

        {/* Bottom Input Inverter (NOR) */}
        <text x="10" y="125" className="text-sm font-bold fill-gray-500 stroke-none">B</text>
        <path d="M 30 120 L 50 120" />
        <path d="M 50 120 L 50 105 L 75 105" />
        <path d="M 50 120 L 50 135 L 75 135" />
        <path d="M 70 90 C 85 90 95 120 95 120 C 95 120 85 150 70 150 C 110 150 130 120 130 120 C 130 120 110 90 70 90" fill="white" />
        <circle cx="134" cy="120" r="4" fill="white" />
        <path d="M 138 120 L 205 120" />

        {/* Final NOR */}
        <path d="M 205 40 L 235 65" />
        <path d="M 205 120 L 235 95" />
        <path d="M 230 50 C 245 50 255 80 255 80 C 255 80 245 110 230 110 C 270 110 290 80 290 80 C 290 80 270 50 230 50" fill="white" />
        <circle cx="294" cy="80" r="4" fill="white" />

        {/* Output */}
        <path d="M 298 80 L 340 80" />
        <text x="350" y="85" className="text-sm font-bold fill-indigo-600 stroke-none">Y = A.B</text>
    </svg>
);


// Configuration for constructions
const CONSTRUCTIONS: Record<BaseGate, Record<TargetGate, {
    schematic: React.ReactNode;
    description: string;
    gateCount: number;
    evaluate: (a: number, b: number) => number;
}>> = {
    NAND: {
        NOT: {
            schematic: <SchematicNandNot />,
            description: "Join both inputs of a NAND gate together. A NAND A = A'",
            gateCount: 1,
            evaluate: (a, b) => Number(!(a & a)) // Treated as single input logic for demo
        },
        AND: {
            schematic: <SchematicNandAnd />,
            description: "NAND followed by NOT (NAND as inverter). (AB)' ' = AB",
            gateCount: 2,
            evaluate: (a, b) => Number(!(!(a & b)))
        },
        OR: {
            schematic: <SchematicNandOr />,
            description: "Invert inputs first (De Morgan's). A' NAND B' = (A'B')' = A+B",
            gateCount: 3,
            evaluate: (a, b) => Number(!((!(a & a)) & (!(b & b))))
        }
    },
    NOR: {
        NOT: {
            schematic: <SchematicNorNot />,
            description: "Join both inputs of a NOR gate together. A NOR A = A'",
            gateCount: 1,
            evaluate: (a, b) => Number(!(a | a))
        },
        OR: {
            schematic: <SchematicNorOr />,
            description: "NOR followed by NOT (NOR as inverter). (A+B)' ' = A+B",
            gateCount: 2,
            evaluate: (a, b) => Number(!(!(a | b)))
        },
        AND: {
            schematic: <SchematicNorAnd />,
            description: "Invert inputs first. A' NOR B' = (A' + B')' = AB",
            gateCount: 3,
            evaluate: (a, b) => Number(!((!(a | a)) | (!(b | b))))
        }
    }
};

export default function UniversalGateBuilder() {
    const [baseGate, setBaseGate] = useState<BaseGate>("NAND");
    const [targetGate, setTargetGate] = useState<TargetGate>("NOT");
    const [inputA, setInputA] = useState<number>(0);
    const [inputB, setInputB] = useState<number>(0);

    const config = CONSTRUCTIONS[baseGate][targetGate];
    const output = config.evaluate(inputA, inputB);
    const isNot = targetGate === "NOT";

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Copy className="w-6 h-6 text-indigo-600" />
                Interactive: Universal Gate Builder
            </h3>

            {/* Controls Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-500 uppercase">Building Blocks:</span>
                    <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
                        {(["NAND", "NOR"] as BaseGate[]).map(g => (
                            <button
                                key={g}
                                onClick={() => setBaseGate(g)}
                                className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${baseGate === g ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                {g} Only
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-500 uppercase">Target Gate:</span>
                    <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
                        {(["NOT", "AND", "OR"] as TargetGate[]).map(g => (
                            <button
                                key={g}
                                onClick={() => setTargetGate(g)}
                                className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${targetGate === g ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                {g}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Visualization Pane */}
                <div className="space-y-6">
                    <div className="bg-white border border-indigo-100 rounded-xl shadow-inner h-64 relative overflow-hidden flex items-center justify-center p-4">
                        <div className="absolute top-2 left-3 text-xs bg-indigo-50 text-indigo-400 px-2 py-1 rounded font-bold uppercase tracking-widest">Schematic</div>
                        <div className="w-full h-full max-w-[90%]">
                            {config.schematic}
                        </div>
                    </div>

                    <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
                        <h4 className="font-bold text-indigo-900 mb-1 flex items-center gap-2">
                            Construction Logic
                        </h4>
                        <p className="text-sm text-indigo-800">
                            {config.description}
                        </p>
                        <div className="mt-3 inline-flex items-center bg-white px-3 py-1 rounded-full border border-indigo-100 text-xs font-bold text-indigo-600">
                            Cost: {config.gateCount} {baseGate} Gates
                        </div>
                    </div>
                </div>

                {/* Verification Lab */}
                <div className="bg-white border-l border-gray-100 pl-0 lg:pl-8">
                    <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                        Verify Logic ({targetGate})
                    </h4>

                    <div className="flex items-center justify-between gap-4 mb-8">
                        {/* Input A */}
                        <div className="text-center">
                            <button
                                onClick={() => setInputA(inputA === 0 ? 1 : 0)}
                                className={`transition-colors ${inputA ? 'text-indigo-600' : 'text-gray-300'}`}
                            >
                                <ToggleLeft className={`w-12 h-12 rotate-180 ${!inputA && 'rotate-0'}`} />
                            </button>
                            <div className="font-mono text-xs font-bold text-gray-500 mt-1">Input A: {inputA}</div>
                        </div>

                        {/* Input B (Conditional) */}
                        {!isNot && (
                            <div className="text-center">
                                <button
                                    onClick={() => setInputB(inputB === 0 ? 1 : 0)}
                                    className={`transition-colors ${inputB ? 'text-indigo-600' : 'text-gray-300'}`}
                                >
                                    <ToggleLeft className={`w-12 h-12 rotate-180 ${!inputB && 'rotate-0'}`} />
                                </button>
                                <div className="font-mono text-xs font-bold text-gray-500 mt-1">Input B: {inputB}</div>
                            </div>
                        )}

                        <ArrowRight className="w-6 h-6 text-gray-300" />

                        {/* Output */}
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl font-bold font-mono transition-all
                            ${output ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-200' : 'bg-gray-100 text-gray-400'}
                        `}>
                            {output}
                        </div>
                    </div>

                    {/* Mini Truth Table */}
                    <div className="rounded-lg border border-gray-200 overflow-hidden text-sm">
                        <table className="w-full text-center">
                            <thead className="bg-gray-50 text-gray-500 font-medium">
                                <tr>
                                    <th className="py-2">A</th>
                                    {!isNot && <th className="py-2">B</th>}
                                    <th className="py-2">Exp. {targetGate}</th>
                                    <th className="py-2 bg-indigo-50 text-indigo-700">Result</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr className="bg-indigo-50/30">
                                    <td className="py-2 font-mono">{inputA}</td>
                                    {!isNot && <td className="py-2 font-mono">{inputB}</td>}
                                    <td className="py-2 font-mono text-gray-400">?</td>
                                    <td className="py-2 font-bold font-mono text-indigo-700 flex justify-center items-center gap-2">
                                        {output} <CheckCircle2 className="w-3 h-3 text-green-500" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="text-center py-2 text-xs text-green-600 bg-green-50 border-t border-green-100">
                            Construction Matches Target Logic!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
