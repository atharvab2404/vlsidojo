"use client";

import React, { useState } from "react";
import { Sliders, Box, Layers } from "lucide-react";

/**
 * ParameterScaler
 * 
 * Visualizes how Verilog parameters allow a single module definition
 * to scale to different bit-widths.
 */
const ParameterScaler = () => {
    const [width, setWidth] = useState(8);

    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        // Snap to common widths for cleaner demo
        if (val <= 6) setWidth(4);
        else if (val <= 12) setWidth(8);
        else if (val <= 24) setWidth(16);
        else setWidth(32);
    };

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans">

            {/* Controls */}
            <div className="flex flex-col items-center mb-8">
                <label className="mb-2 font-bold text-slate-700 flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-indigo-500" /> Parameter: WIDTH = {width}
                </label>
                <input
                    type="range"
                    min="4"
                    max="32"
                    step="4"
                    value={width}
                    onChange={handleWidthChange}
                    className="w-full max-w-xs h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between w-full max-w-xs text-xs text-slate-400 mt-1 font-mono">
                    <span>4</span>
                    <span>8</span>
                    <span>16</span>
                    <span>32</span>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* Instantiation Code */}
                <div className="flex flex-col">
                    <div className="bg-slate-800 text-slate-400 text-xs px-4 py-2 rounded-t-lg border-b border-slate-700 font-mono">
                        top_module.v
                    </div>
                    <div className="bg-slate-900 p-6 rounded-b-lg overflow-x-auto min-h-[250px] font-mono text-sm text-sky-300 leading-relaxed flex flex-col justify-center">
                        <span className="text-slate-500 mb-4">// Instantiating the Generic Counter</span>
                        <div>
                            my_counter <br />
                            #(<br />
                            &nbsp; .WIDTH(<span className="text-emerald-400 font-bold">{width}</span>) <span className="text-slate-500">// Overriding default!</span><br />
                            ) <br />
                            u_counter_0 (<br />
                            &nbsp; .clk(clk),<br />
                            &nbsp; .rst(rst),<br />
                            &nbsp; .count( count_val )<br />
                            );
                        </div>
                    </div>
                </div>

                {/* Module Visualization */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden transition-all duration-300">

                    <div className="absolute top-4 left-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Hardware Instance
                    </div>

                    <div className="relative flex flex-col items-center animate-in fade-in zoom-in duration-300">
                        {/* The Module Box */}
                        <div
                            className="bg-indigo-50 border-2 border-indigo-500 rounded-lg shadow-lg flex flex-col items-center justify-center text-indigo-900 font-bold transition-all duration-300 ease-out"
                            style={{
                                width: `${Math.min(100 + width * 4, 240)}px`,
                                height: `${Math.min(100 + width * 2, 160)}px`
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <Box className="w-5 h-5" /> u_counter_0
                            </div>
                            <div className="text-xs font-normal text-indigo-600 mt-1">
                                {width}-bit Counter
                            </div>
                        </div>

                        {/* Output Bus */}
                        <div className="absolute -right-16 top-1/2 -translate-y-1/2 flex items-center">
                            <div className="h-0.5 bg-slate-800 w-16 relative">
                                {/* Slash for bus */}
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-3 bg-slate-800 rotate-[60deg]"></div>
                            </div>
                            <div className="ml-1 text-xs font-mono font-bold text-slate-600">
                                [{width - 1}:0]
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div className="mt-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-900 flex items-start gap-3">
                <Layers className="w-5 h-5 shrink-0" />
                <p>
                    <strong>Power of Reuse:</strong> You wrote the `my_counter` module <strong>once</strong>. By changing one number (the parameter), you generate totally different hardware (4-bit vs {width}-bit) without rewriting a single line of RTL.
                </p>
            </div>

        </div>
    );
};

export default ParameterScaler;
