"use client";

import React, { useState } from "react";
import { Copy, Layers, Eye, Cpu } from "lucide-react";

type Style = 'structural' | 'dataflow' | 'behavioral';

/**
 * AbstractionLevelExplorer
 * 
 * Visualizes the same circuit (Full Adder) in three different Verilog modeling styles.
 */
const AbstractionLevelExplorer = () => {
    const [style, setStyle] = useState<Style>('dataflow');

    const getCode = (s: Style) => {
        switch (s) {
            case 'structural':
                return `module full_adder (
    input a, b, cin,
    output sum, cout
);
    wire w1, w2, w3;

    // Gate Instantiation (Netlist)
    xor u1 (w1, a, b);
    xor u2 (sum, w1, cin);
    and u3 (w2, w1, cin);
    and u4 (w3, a, b);
    or  u5 (cout, w2, w3);

endmodule`;
            case 'dataflow':
                return `module full_adder (
    input a, b, cin,
    output sum, cout
);
    
    // Continuous Assignment (Equations)
    assign sum = a ^ b ^ cin;
    assign cout = (a & b) | (cin & (a ^ b));

endmodule`;
            case 'behavioral':
                return `module full_adder (
    input a, b, cin,
    output reg sum, cout
);

    // Procedural Block (Algorithm)
    always @(*) begin
        {cout, sum} = a + b + cin;
    end

endmodule`;
        }
    };

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans">

            {/* Controls */}
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
                <button
                    onClick={() => setStyle('structural')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-all font-bold ${style === 'structural' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md' : 'border-slate-200 bg-white text-slate-500 hover:border-indigo-300'}`}
                >
                    <Layers className="w-4 h-4" /> Structural
                </button>
                <button
                    onClick={() => setStyle('dataflow')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-all font-bold ${style === 'dataflow' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md' : 'border-slate-200 bg-white text-slate-500 hover:border-indigo-300'}`}
                >
                    <Cpu className="w-4 h-4" /> Dataflow
                </button>
                <button
                    onClick={() => setStyle('behavioral')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-all font-bold ${style === 'behavioral' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md' : 'border-slate-200 bg-white text-slate-500 hover:border-indigo-300'}`}
                >
                    <Eye className="w-4 h-4" /> Behavioral
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* Code Window */}
                <div className="flex flex-col">
                    <div className="bg-slate-800 text-slate-400 text-xs px-4 py-2 rounded-t-lg border-b border-slate-700 flex justify-between items-center">
                        <span className="font-mono">full_adder.v</span>
                        <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        </div>
                    </div>
                    <div className="bg-slate-900 p-6 rounded-b-lg overflow-x-auto min-h-[300px]">
                        <pre className="font-mono text-sm text-sky-300 whitespace-pre">
                            {getCode(style)}
                        </pre>
                    </div>
                </div>

                {/* Visual Representation Window */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
                    <div className="absolute top-4 left-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Visual Abstraction
                    </div>

                    {/* STRUCTURAL VISUAL */}
                    {style === 'structural' && (
                        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                            <div className="flex flex-wrap justify-center gap-4 mb-8">
                                <div className="p-3 border-2 border-slate-800 rounded flex items-center justify-center bg-white shadow-sm font-bold w-16 h-12">XOR</div>
                                <div className="p-3 border-2 border-slate-800 rounded flex items-center justify-center bg-white shadow-sm font-bold w-16 h-12">AND</div>
                                <div className="p-3 border-2 border-slate-800 rounded flex items-center justify-center bg-white shadow-sm font-bold w-16 h-12">OR</div>
                            </div>
                            <div className="text-center text-sm text-slate-500 max-w-xs">
                                <strong>Netlist View:</strong><br />
                                Manually wiring discrete instances.<br />
                                Looks like a schematic.
                            </div>
                        </div>
                    )}

                    {/* DATAFLOW VISUAL */}
                    {style === 'dataflow' && (
                        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                            <div className="font-mono text-xl text-slate-800 bg-slate-100 p-4 rounded-lg border border-slate-300 mb-6">
                                Sum = A ⊕ B ⊕ Cin
                            </div>
                            <div className="text-center text-sm text-slate-500 max-w-xs">
                                <strong>Equation View:</strong><br />
                                Describes signal flow logic.<br />
                                Closest to Boolean Algebra.
                            </div>
                        </div>
                    )}

                    {/* BEHAVIORAL VISUAL */}
                    {style === 'behavioral' && (
                        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                            <div className="w-32 h-32 bg-slate-800 rounded-lg flex items-center justify-center text-white font-bold shadow-xl mb-6 relative">
                                <div className="absolute -left-4 top-4 text-xs text-slate-500">a,b,c</div>
                                <div className="absolute -right-8 top-4 text-xs text-slate-500">sum,cout</div>
                                BLACK BOX
                            </div>
                            <div className="text-center text-sm text-slate-500 max-w-xs">
                                <strong>High-Level View:</strong><br />
                                "I don't care about gates. Just give me the Result of A+B+C."
                            </div>
                        </div>
                    )}

                </div>

            </div>

            <div className="mt-8 bg-amber-50 border-l-4 border-amber-400 p-4 text-sm text-amber-900">
                <p className="font-bold mb-1">💡 Key Takeaway</p>
                {style === 'structural' && "Structural is verbose but precise. It's mostly used for the final synthesized netlist, not manual design."}
                {style === 'dataflow' && "Dataflow is great for simple combinational logic. It cleanly maps inputs to outputs."}
                {style === 'behavioral' && "Behavioral is the standard for complex design (FSMs, CPUs). It lets the synthesizer figure out the gates."}
            </div>

        </div>
    );
};

export default AbstractionLevelExplorer;
