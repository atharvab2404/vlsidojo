"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Cpu, Activity, Clock, RefreshCw } from "lucide-react";
import SerialAdderVisualizer from "./SerialAdderVisualizer";

export default function Page() {
    const currentSlug = "fsm-design-problem-designing-a-serial-adder-mealy-and-moore";
    const index = flatDigitalDesignTopics.findIndex((t) => t.slug === currentSlug);
    const prev = index > 0 ? flatDigitalDesignTopics[index - 1] : null;
    const next =
        index < flatDigitalDesignTopics.length - 1
            ? flatDigitalDesignTopics[index + 1]
            : null;

    const navPrev = prev ? { title: prev.title, href: `/interview-prep/digital-design/${prev.slug}` } : null;
    const navNext = next ? { title: next.title, href: `/interview-prep/digital-design/${next.slug}` } : null;

    return (
        <div className="max-w-5xl mx-auto text-gray-800">
            <div className="mb-8">
                <Link
                    href="/interview-prep/digital-design"
                    className="inline-flex items-center text-amber-600 hover:text-amber-800 transition-colors mb-4 font-medium"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Curriculum
                </Link>
            </div>

            <h1 className="text-5xl font-extrabold text-gray-900 mb-8 tracking-tight leading-tight">
                FSM Design Problem: <br />

            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                A 32-bit Ripple Carry Adder requires 32 Full Adders. That's a lot of hardware.
                <br />
                What if we could use <strong>just 1 Full Adder</strong> to do the same job?
                That is the power of the <strong>Serial Adder</strong>. It trades <i>time</i> for <i>space</i>.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Activity className="w-8 h-8 text-indigo-600" />
                    1. Interactive Serial Simulator
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        Watch how the circuit processes the numbers <strong>one bit at a time</strong> (LSB first).
                        <br />
                        The <strong>Carry Flip-Flop</strong> is the "memory" that remembers the carry from the previous bit position.
                    </p>
                </div>
                <SerialAdderVisualizer />
            </div>

            {/* --- Theory Comparison --- */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-indigo-600" /> Parallel Adder (Ripple/CLA)
                    </h3>
                    <ul className="text-sm space-y-3 text-gray-600">
                        <li><strong>Hardware:</strong> N Full Adders (Large area).</li>
                        <li><strong>Speed:</strong> 1 Clock Cycle (Combinational).</li>
                        <li><strong>Input:</strong> All bits available at once.</li>
                        <li className="text-red-600 font-bold">Expensive for large N.</li>
                    </ul>
                </div>

                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                    <h3 className="text-xl font-bold text-indigo-900 mb-3 flex items-center gap-2">
                        <RefreshCw className="w-5 h-5 text-indigo-600" /> Serial Adder
                    </h3>
                    <ul className="text-sm space-y-3 text-indigo-800">
                        <li><strong>Hardware:</strong> 1 Full Adder + 1 D-Flip Flop.</li>
                        <li><strong>Speed:</strong> N Clock Cycles (Sequential).</li>
                        <li><strong>Input:</strong> Bits arrive sequentially (LSB first).</li>
                        <li className="text-green-700 font-bold">Tiny area! Great for low-cost chips.</li>
                    </ul>
                </div>

            </div>

            {/* --- FSM Analysis --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Clock className="w-8 h-8 text-gray-700" />
                    2. The FSM Internal Logic
                </h2>

                <p className="text-gray-700 mb-6">
                    The Serial Adder is a classic <strong>Mealy Machine</strong>.
                </p>

                <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-bold uppercase">
                            <tr>
                                <th className="px-6 py-3">Present State (Cin)</th>
                                <th className="px-6 py-3">Input (A, B)</th>
                                <th className="px-6 py-3">Next State (Cout)</th>
                                <th className="px-6 py-3">Output (Sum)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[
                                [0, "0 0", 0, 0],
                                [0, "0 1", 0, 1],
                                [0, "1 0", 0, 1],
                                [0, "1 1", 1, 0],
                                [1, "0 0", 0, 1],
                                [1, "0 1", 1, 0],
                                [1, "1 0", 1, 0],
                                [1, "1 1", 1, 1],
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-gray-50">
                                    <td className="px-6 py-3 font-mono text-amber-600 font-bold">{row[0]}</td>
                                    <td className="px-6 py-3 font-mono">{row[1]}</td>
                                    <td className="px-6 py-3 font-mono text-amber-600">{row[2]}</td>
                                    <td className="px-6 py-3 font-mono text-emerald-600 font-bold">{row[3]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- Verilog --- */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 mb-12 text-slate-300 font-mono text-sm shadow-xl">
                <h3 className="text-white font-bold text-lg mb-4">Verilog Implementation</h3>
                <pre className="overflow-x-auto whitespace-pre">{`module serial_adder (
    input clk,
    input rst_n,     // Synchronous reset
    input a,         // Single bit input A
    input b,         // Single bit input B
    output sum       // Single bit output Sum
);
    reg carry;
    
    // Combinational Sum Logic (Mealy Output)
    // Sum depends on current Inputs (a,b) and current State (carry)
    assign sum = a ^ b ^ carry;

    // Sequential Logic (Next State)
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            carry <= 1'b0;
        end else begin
            // Majority function for Carry Out
            carry <= (a & b) | (b & carry) | (a & carry);
        end
    end

endmodule`}</pre>
            </div>

            <div className="mt-12">
                <SubtopicNav prev={navPrev} next={navNext} />
            </div>
        </div>
    );
}
