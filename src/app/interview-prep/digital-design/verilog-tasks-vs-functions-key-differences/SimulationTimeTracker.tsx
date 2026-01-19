"use client";

import React, { useState } from "react";
import { Clock, Play, SkipForward } from "lucide-react";

/**
 * SimulationTimeTracker
 * 
 * Visualizes the key difference between Verilog Functions (Zero Simulation Time)
 * and Tasks (Can consume Simulation Time).
 */
const SimulationTimeTracker = () => {
    const [currentTime, setCurrentTime] = useState(100);
    const [log, setLog] = useState<string[]>([]);

    // FUNCTION: Instant Calculation
    const callFunction = () => {
        const result = 5 + 3; // Simulate calc
        const newLog = [...log, `[@ ${currentTime}ns] Call Function: calc_sum(5,3) returned ${result}. (Time elapsed: 0ns)`];
        setLog(newLog.slice(-5));
    };

    // TASK: Consumes time
    const callTask = () => {
        const startTime = currentTime;
        const duration = 10;
        const endTime = startTime + duration;

        setCurrentTime(endTime);
        const newLog = [...log, `[@ ${endTime}ns] Call Task: drive_bus(). Finished after #${duration}ns.`];
        setLog(newLog.slice(-5));
    };

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans">

            <div className="flex flex-col md:flex-row gap-8">

                {/* Code Snippets */}
                <div className="flex-1 space-y-4">

                    {/* Function Code */}
                    <div className="bg-white border-l-4 border-indigo-500 rounded p-4 shadow-sm">
                        <div className="flex justify-between mb-2">
                            <span className="font-bold text-indigo-700 text-sm uppercase">Function (Synthesis Friendly)</span>
                            <button
                                onClick={callFunction}
                                className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1 rounded text-xs font-bold transition-colors flex items-center gap-1"
                            >
                                <Play className="w-3 h-3" /> Execute
                            </button>
                        </div>
                        <pre className="font-mono text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                            function [7:0] calc_sum;<br />
                            &nbsp; input [7:0] a, b;<br />
                            &nbsp; calc_sum = a + b; <span className="text-slate-400">// Instant!</span><br />
                            endfunction
                        </pre>
                    </div>

                    {/* Task Code */}
                    <div className="bg-white border-l-4 border-amber-500 rounded p-4 shadow-sm">
                        <div className="flex justify-between mb-2">
                            <span className="font-bold text-amber-700 text-sm uppercase">Task (Testbench / Verification)</span>
                            <button
                                onClick={callTask}
                                className="bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 py-1 rounded text-xs font-bold transition-colors flex items-center gap-1"
                            >
                                <SkipForward className="w-3 h-3" /> Execute
                            </button>
                        </div>
                        <pre className="font-mono text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                            task drive_bus;<br />
                            &nbsp; input [7:0] data;<br />
                            &nbsp; begin<br />
                            &nbsp; &nbsp; @(posedge clk); <span className="text-amber-600 font-bold">// Waits for clock!</span><br />
                            &nbsp; &nbsp; bus = data;<br />
                            &nbsp; end<br />
                            endtask
                        </pre>
                    </div>

                </div>

                {/* Timeline Visualization */}
                <div className="flex-1 bg-slate-900 rounded-xl p-6 text-white relative overflow-hidden flex flex-col items-center justify-center min-h-[250px]">

                    <div className="absolute top-4 right-4 text-xs font-mono text-slate-400">
                        Simulation Log
                    </div>

                    {/* Clock Display */}
                    <div className="mb-8 flex flex-col items-center">
                        <div className="text-sm uppercase text-slate-400 tracking-widest font-bold mb-2">Current Sim Time</div>
                        <div className="text-5xl font-mono font-black text-emerald-400 tabular-nums flex items-end gap-2">
                            {currentTime} <span className="text-xl text-emerald-600 mb-2">ns</span>
                        </div>
                    </div>

                    {/* Event Log */}
                    <div className="w-full space-y-2">
                        {log.length === 0 && <div className="text-center text-slate-600 text-sm italic">Waiting for execution...</div>}
                        {log.map((entry, i) => (
                            <div key={i} className="text-xs font-mono p-2 bg-white/5 rounded border-l-2 border-slate-600 animate-in slide-in-from-bottom-2 fade-in">
                                {entry}
                            </div>
                        ))}
                    </div>

                </div>

            </div>

            <div className="mt-6 p-4 rounded-lg bg-indigo-50 border border-indigo-200 text-sm text-indigo-900">
                <p>
                    <strong>Observation:</strong> Functions execute instantly (0ns elapsed), making them perfect for combinational logic like Adders. Tasks can pause execution (using `#` or `@`), making them essential for Testbenches where you need to simulate time passing.
                </p>
            </div>

        </div>
    );
};

export default SimulationTimeTracker;
