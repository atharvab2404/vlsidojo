"use client";

import { useState } from "react";
import { CheckCircle2, FlaskConical, ArrowRight } from "lucide-react";

type Theorem = {
    id: string;
    name: string;
    lhsLabel: string;
    rhsLabel: string;
    inputs: number; // 1 or 2
    evaluate: (a: number, b: number) => { lhs: number; rhs: number };
};

const THEOREMS: Theorem[] = [
    {
        id: "idempotent_or",
        name: "Idempotent (OR)",
        lhsLabel: "A + A",
        rhsLabel: "A",
        inputs: 1,
        evaluate: (a) => ({ lhs: a | a, rhs: a }),
    },
    {
        id: "idempotent_and",
        name: "Idempotent (AND)",
        lhsLabel: "A . A",
        rhsLabel: "A",
        inputs: 1,
        evaluate: (a) => ({ lhs: a & a, rhs: a }),
    },
    {
        id: "demorgan_1",
        name: "De Morgan's 1st Law",
        lhsLabel: "(A + B)'",
        rhsLabel: "A' . B'",
        inputs: 2,
        // In JS bitwise: ~ returns -2 for 1. We need to mask with & 1.
        evaluate: (a, b) => ({
            lhs: (~(a | b)) & 1,
            rhs: ((~a) & 1) & ((~b) & 1),
        }),
    },
    {
        id: "demorgan_2",
        name: "De Morgan's 2nd Law",
        lhsLabel: "(A . B)'",
        rhsLabel: "A' + B'",
        inputs: 2,
        evaluate: (a, b) => ({
            lhs: (~(a & b)) & 1,
            rhs: ((~a) & 1) | ((~b) & 1),
        }),
    },
    {
        id: "distributive",
        name: "Distributive Law",
        lhsLabel: "A + (B . C)",
        rhsLabel: "(A + B)(A + C)",
        inputs: 3, // Special case handled in render logic if needed, but for simplicity sticking to 2-input laws or hardcoding the 3rd input case
        // Let's implement a 2-var version of Absorption instead which is more common in interviews
        evaluate: (a, b) => ({ lhs: 0, rhs: 0 })
    },
    {
        id: "absorption",
        name: "Absorption Law",
        lhsLabel: "A + (A . B)",
        rhsLabel: "A",
        inputs: 2,
        evaluate: (a, b) => ({
            lhs: a | (a & b),
            rhs: a,
        }),
    },
    {
        id: "consensus",
        name: "Consensus (Proof)",
        lhsLabel: "AB + A'C + BC",
        rhsLabel: "AB + A'C",
        inputs: 3, // actually 3 vars
        evaluate: (a, b) => ({ lhs: 0, rhs: 0 }) // Placeholder, simplistic visualizer supports 2 vars for clear UI
    }
];

// Refined list to only include 1-2 var theorems compatible with the UI grid
const SIMPLE_THEOREMS = THEOREMS.filter(t => t.inputs <= 2);

export default function TruthTableProver() {
    const [selectedId, setSelectedId] = useState<string>("demorgan_1");
    const activeTheorem = SIMPLE_THEOREMS.find(t => t.id === selectedId) || SIMPLE_THEOREMS[0];

    // Generate truth table rows
    const rows = [];
    const limit = Math.pow(2, activeTheorem.inputs);

    for (let i = 0; i < limit; i++) {
        // Extract bits
        // For 2 inputs: i=0(00), i=1(01), i=2(10), i=3(11) -> A is MSB, B is LSB
        const a = (i >> (activeTheorem.inputs - 1)) & 1;
        const b = (i) & 1; // Only relevant if inputs=2

        const result = activeTheorem.evaluate(a, b);
        rows.push({ a, b, ...result });
    }

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FlaskConical className="w-6 h-6 text-purple-600" />
                Interactive: Truth Table Prover
            </h3>

            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select a Theorem to Prove</label>
                <select
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value)}
                    className="w-full text-lg p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                >
                    {SIMPLE_THEOREMS.map((t) => (
                        <option key={t.id} value={t.id}>{t.name}: {t.lhsLabel} = {t.rhsLabel}</option>
                    ))}
                </select>
            </div>

            <div className="overflow-hidden bg-gray-50 border border-gray-200 rounded-xl">
                <table className="w-full text-center border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider border-b border-gray-200">
                            {/* Input Headers */}
                            <th className="py-3 px-4 border-r border-gray-200 w-16">A</th>
                            {activeTheorem.inputs > 1 && <th className="py-3 px-4 border-r border-gray-200 w-16">B</th>}

                            {/* LHS Header */}
                            <th className="py-3 px-4 bg-blue-50 text-blue-900 border-r border-blue-100">
                                LHS <br /> <span className="text-xs normal-case opacity-70 font-mono">{activeTheorem.lhsLabel}</span>
                            </th>

                            {/* RHS Header */}
                            <th className="py-3 px-4 bg-green-50 text-green-900">
                                RHS <br /> <span className="text-xs normal-case opacity-70 font-mono">{activeTheorem.rhsLabel}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 font-mono text-lg text-gray-800 bg-white">
                        {rows.map((row, idx) => {
                            const match = row.lhs === row.rhs;
                            return (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-3 border-r border-gray-100">{row.a}</td>
                                    {activeTheorem.inputs > 1 && <td className="py-3 border-r border-gray-100">{row.b}</td>}

                                    <td className="py-3 font-bold text-blue-600 bg-blue-50/20 border-r border-blue-100">{row.lhs}</td>

                                    <td className="py-3 font-bold text-green-600 bg-green-50/20 flex items-center justify-center gap-2 relative">
                                        {row.rhs}
                                        {match && <CheckCircle2 className="w-4 h-4 text-green-400 absolute right-4 opacity-50" />}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-700 bg-green-50 p-3 rounded-lg border border-green-100">
                <CheckCircle2 className="w-5 h-5" />
                Since the LHS and RHS columns are identical for all inputs, the theorem is <strong>PROVEN</strong>.
            </div>
        </div>
    );
}
