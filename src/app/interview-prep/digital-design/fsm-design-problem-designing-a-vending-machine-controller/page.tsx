"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Coins, Workflow, Code } from "lucide-react";
import VendingMachineVisualizer from "./VendingMachineVisualizer";

export default function Page() {
    const currentSlug = "fsm-design-problem-designing-a-vending-machine-controller";
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
                This is a classic <span className="font-bold text-gray-800">System Design</span> question for entry-level digital design roles.
                <br />
                <strong>The Goal:</strong> Design a controller that accepts Nickels (5&cent;) and Dimes (10&cent;) and dispenses a soda when the total reaches 15&cent;.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Coins className="w-8 h-8 text-indigo-600" />
                    1. Interactive Soda Machine
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        Test the logic below. Try reaching 15&cent; using only Nickels (5+5+5) or a mix (10+5).
                        <br />
                        Note what happens if you put in two Dimes (20&cent;) &mdash; do you get change?
                    </p>
                </div>
                <VendingMachineVisualizer />
            </div>

            {/* --- Theory: State Diagram --- */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Workflow className="w-5 h-5 text-indigo-600" /> The Logic (States)
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        We track the <strong>acccumulated value</strong>.
                    </p>
                    <ul className="text-sm space-y-3 text-gray-600">
                        <li className="flex gap-2">
                            <span className="font-bold text-indigo-600 w-8">S0:</span>
                            <span>0&cent; collected. Waiting.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-bold text-indigo-600 w-8">S5:</span>
                            <span>5&cent; collected. Need 10&cent; more.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-bold text-indigo-600 w-8">S10:</span>
                            <span>10&cent; collected. Need 5&cent; more.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-bold text-emerald-600 w-8">S15:</span>
                            <span>15&cent;+ collected. <strong className="text-emerald-600">Dispense!</strong></span>
                        </li>
                    </ul>
                </div>

                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                    <h3 className="text-xl font-bold text-indigo-900 mb-3 flex items-center gap-2">
                        <Workflow className="w-5 h-5 text-indigo-600" /> The Transitions
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        How we move between states based on inputs (N=Nickel, D=Dime).
                    </p>
                    <ul className="text-sm space-y-2 text-indigo-800 font-mono">
                        <li>S0 &rarr; (N) &rarr; S5</li>
                        <li>S0 &rarr; (D) &rarr; S10</li>
                        <li className="border-t border-indigo-200 mt-2 pt-2">S5 &rarr; (N) &rarr; S10</li>
                        <li>S5 &rarr; (D) &rarr; S15 (Dispense)</li>
                        <li className="border-t border-indigo-200 mt-2 pt-2">S10 &rarr; (N) &rarr; S15 (Dispense)</li>
                        <li>S10 &rarr; (D) &rarr; S15 (Dispense + Change)</li>
                    </ul>
                </div>

            </div>

            {/* --- Verilog --- */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 mb-12 text-slate-300 font-mono text-sm shadow-xl">
                <div className="flex items-center gap-2 mb-6 text-slate-100 border-b border-slate-700 pb-4">
                    <Code className="w-5 h-5 text-sky-400" />
                    <span className="font-bold text-lg">Verilog Implementation</span>
                </div>

                <pre className="overflow-x-auto whitespace-pre">{`module vending_machine (
    input clk,
    input rst_n,
    input nickel,  // 5 cents
    input dime,    // 10 cents
    output reg dispense,
    output reg change
);

    // State Encoding
    parameter S0 = 2'b00, S5 = 2'b01, S10 = 2'b10, S15 = 2'b11;
    reg [1:0] state, next_state;

    // Sequential Logic
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) state <= S0;
        else state <= next_state;
    end

    // Combinational Logic (Next State & Output)
    always @(*) begin
        // Defaults
        next_state = state;
        dispense = 0;
        change = 0;

        case (state)
            S0: begin
                if (nickel) next_state = S5;
                if (dime)   next_state = S10;
            end
            S5: begin
                if (nickel) next_state = S10;
                if (dime)   begin next_state = S15; dispense = 1; end // Mealy style output for speed? Or go to state?
                // Visualizer simplifies to Moore (Reach S15 -> Output). 
                // In code, we often check transition to ready the output.
            end
            S10: begin
                if (nickel) begin next_state = S15; dispense = 1; end
                if (dime)   begin next_state = S15; dispense = 1; change = 1; end
            end
            S15: begin
                // Auto reset
                next_state = S0;
            end
        endcase
    end
endmodule`}</pre>
            </div>

            <div className="mt-12">
                <SubtopicNav prev={navPrev} next={navNext} />
            </div>
        </div>
    );
}
