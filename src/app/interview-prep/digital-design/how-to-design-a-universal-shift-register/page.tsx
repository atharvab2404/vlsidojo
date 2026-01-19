"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Cpu, Settings, Code } from "lucide-react";

export default function Page() {
    const currentSlug = "how-to-design-a-universal-shift-register";
    const index = flatDigitalDesignTopics.findIndex((t) => t.slug === currentSlug);

    // Explicitly handle previous/next topic logic to strictly return { title, href } or null
    const prevTopic = index > 0 ? flatDigitalDesignTopics[index - 1] : null;
    const nextTopic = index < flatDigitalDesignTopics.length - 1 ? flatDigitalDesignTopics[index + 1] : null;

    const navPrev = prevTopic ? { title: prevTopic.title, href: `/interview-prep/digital-design/${prevTopic.slug}` } : null;
    const navNext = nextTopic ? { title: nextTopic.title, href: `/interview-prep/digital-design/${nextTopic.slug}` } : null;

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

            <h1 className="text-5xl font-extrabold text-gray-900 mb-8 tracking-tight">
                Designing a Universal Shift Register
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                A "Universal" Shift Register can do it all: value holding, shifting left, shifting right, and parallel loading. The secret to this versatility is connecting a <strong>Multiplexer</strong> to the input of every Flip-Flop.
            </p>

            {/* --- Theory Section --- */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">

                {/* The Architecture */}
                <div className="space-y-6">
                    <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                        <h3 className="flex items-center gap-2 text-2xl font-bold text-indigo-900 mb-4">
                            <Settings className="w-6 h-6" />
                            The Logic: 4:1 Mux
                        </h3>
                        <p className="text-indigo-800 mb-4 text-sm leading-relaxed">
                            For every bit in the register, we need to choose between 4 possible next states. A <strong>4:1 Mux</strong> is the perfect tool for this choice.
                        </p>
                        <ul className="space-y-3 text-sm text-indigo-900 font-medium">
                            <li className="flex items-center gap-2">
                                <span className="bg-white px-2 py-1 rounded border border-indigo-200 font-mono text-xs">00</span>
                                Hold Information
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="bg-white px-2 py-1 rounded border border-indigo-200 font-mono text-xs">01</span>
                                Shift Right (Input from Left)
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="bg-white px-2 py-1 rounded border border-indigo-200 font-mono text-xs">10</span>
                                Shift Left (Input from Right)
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="bg-white px-2 py-1 rounded border border-indigo-200 font-mono text-xs">11</span>
                                Parallel Load (External Input)
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Diagram */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4 text-center">Structure of 1 Bit Slice</h3>
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl">
                        <div className="text-xs font-mono mb-4 text-gray-500">Mermaid Diagram Rendering...</div>

                        {/* Mermaid Diagram */}
                        <div className="mermaid">
                            {`
                            graph TD
                                subgraph "One Bit Slice"
                                    Mux[4:1 Multiplexer]
                                    DFF[D Flip-Flop]
                                    
                                    Hold[Q (Feedback)] -->|In 0| Mux
                                    Right[Left Neighbor] -->|In 1| Mux
                                    Left[Right Neighbor] -->|In 2| Mux
                                    Load[Parallel Data] -->|In 3| Mux
                                    
                                    Mux -->|D| DFF
                                    DFF -->|Q| Out[Output]
                                    DFF -->|Q| Hold
                                end
                                S1[Select S1] --> Mux
                                S0[Select S0] --> Mux
                                Clk[Clock] --> DFF
                            `}
                        </div>
                    </div>
                    <p className="text-xs text-center text-gray-500 mt-4">
                        This structure is repeated N times.
                    </p>
                </div>
            </div>

            {/* --- Verilog Snippet --- */}
            <div className="bg-slate-900 text-slate-200 p-8 rounded-2xl border border-slate-700 font-mono text-sm mb-16 overflow-x-auto">
                <div className="flex items-center gap-2 text-slate-400 mb-4 border-b border-slate-700 pb-2">
                    <Code className="w-5 h-5" />
                    <strong>Verilog Implementation</strong>
                </div>
                <pre>{`module universal_shift_reg (
    input clk, rst,
    input [1:0] mode, // 00=Hold, 01=Right, 10=Left, 11=Load
    input [3:0] par_in,
    input s_in_right, s_in_left,
    output reg [3:0] q
);

    always @(posedge clk or posedge rst) begin
        if (rst) 
            q <= 4'b0000;
        else begin
            case (mode)
                2'b00: q <= q;                 // Hold
                2'b01: q <= {s_in_right, q[3:1]}; // Shift Right
                2'b10: q <= {q[2:0], s_in_left};  // Shift Left
                2'b11: q <= par_in;            // Parallel Load
            endcase
        end
    end
endmodule`}</pre>
            </div>

            <SubtopicNav prev={navPrev} next={navNext} />
        </div>
    );
}
