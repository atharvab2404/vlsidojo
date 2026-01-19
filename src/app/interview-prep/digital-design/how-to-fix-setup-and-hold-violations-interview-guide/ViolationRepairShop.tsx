"use client";

import React, { useState } from "react";
import { Wrench, Clock, Battery, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";

/**
 * ViolationRepairShop
 * 
 * Interactive debugger for Setup and Hold violations.
 * User drags "components" or adjusts sliders to fix the circuit.
 */
const ViolationRepairShop = () => {
    // Scenario 1: Setup Violation (Critical Path too long)
    // Scenario 2: Hold Violation (Min Path too short)
    const [scenario, setScenario] = useState<'setup' | 'hold'>('setup');

    // Circuit Parameters
    const [clockPeriod, setClockPeriod] = useState(10); // default 10ns (100MHz)
    const [logicDelay, setLogicDelay] = useState(12);   // 12ns (Violation if Tclk=10)
    const [bufferDelay, setBufferDelay] = useState(0);  // Added delay for Hold Fix

    // Constants
    const T_SU = 2; // Setup time constraint
    const T_H = 2;  // Hold time constraint
    const T_CQ = 1; // Clk-to-Q delay

    // Analysis
    // Setup check: Tclk >= Tcq + Tcomb + Tsu
    // Hold check:  Tcq + Tcomb >= Th

    const totalPathDelay = T_CQ + logicDelay + bufferDelay;

    // Check Setup
    const setupSlack = clockPeriod - (totalPathDelay + T_SU);
    const setupMet = setupSlack >= 0;

    // Check Hold
    // Note: Hold is independent of Clock Period!
    // But usually holds fail on "Fast Paths" (short logic).
    // Let's force logicDelay to be small when in 'hold' scenario simulation init.

    const holdSlack = (T_CQ + logicDelay + bufferDelay) - T_H;
    const holdMet = holdSlack >= 0;

    // Reset simulator when switching scenarios
    const switchScenario = (s: 'setup' | 'hold') => {
        setScenario(s);
        setBufferDelay(0);
        if (s === 'setup') {
            setClockPeriod(10);
            setLogicDelay(12); // Path is 13ns total (1+12), Tclk=10 -> Fail
        } else {
            setClockPeriod(10);
            setLogicDelay(0.5); // Path is 1.5ns (1+0.5), Th=2 -> Fail
        }
    };

    const isCurrentViolationFixed = scenario === 'setup' ? setupMet : holdMet;

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans select-none">

            {/* Scenario Tabs */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => switchScenario('setup')}
                    className={`flex-1 py-3 rounded-lg font-bold border-2 transition-all ${scenario === 'setup' ? 'bg-indigo-100 border-indigo-500 text-indigo-900' : 'bg-white border-transparent text-slate-400'}`}
                >
                    Case 1: Setup Violation
                </button>
                <button
                    onClick={() => switchScenario('hold')}
                    className={`flex-1 py-3 rounded-lg font-bold border-2 transition-all ${scenario === 'hold' ? 'bg-indigo-100 border-indigo-500 text-indigo-900' : 'bg-white border-transparent text-slate-400'}`}
                >
                    Case 2: Hold Violation
                </button>
            </div>

            {/* Circuit Diagram */}
            <div className="bg-slate-900 rounded-xl p-8 mb-6 relative overflow-hidden min-h-[200px] flex items-center justify-between gap-4">

                {/* Visual Feedback Overlay */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded font-bold text-xs uppercase tracking-widest flex items-center gap-2 ${isCurrentViolationFixed ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white animate-pulse'}`}>
                    {isCurrentViolationFixed ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                    {isCurrentViolationFixed ? "TIMING CLEAN" : "VIOLATION"}
                </div>

                {/* Flip Flop 1 */}
                <div className="w-16 h-20 border-2 border-white rounded flex flex-col items-center justify-center text-white font-mono text-xs relative bg-slate-800">
                    <div>FF1</div>
                    <div className="absolute -bottom-6 text-slate-500 text-[10px]">Launch</div>
                </div>

                {/* Logic Cloud */}
                <div className="flex-1 h-12 bg-indigo-600/20 active:bg-indigo-600/30 border-2 border-dashed border-indigo-500/50 rounded-full flex items-center justify-center relative transition-all">
                    <span className="text-indigo-300 font-mono text-xs font-bold">
                        Logic Delay: {logicDelay}ns
                    </span>
                    {/* Buffer visual */}
                    {bufferDelay > 0 && (
                        <div className="absolute -top-8 bg-emerald-500 text-emerald-900 text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
                            + {bufferDelay}ns Buffer
                        </div>
                    )}
                </div>

                {/* Flip Flop 2 */}
                <div className="w-16 h-20 border-2 border-white rounded flex flex-col items-center justify-center text-white font-mono text-xs relative bg-slate-800">
                    <div>FF2</div>
                    <div className="absolute -bottom-6 text-slate-500 text-[10px]">Capture</div>
                </div>

            </div>

            {/* Controls / Repair Tools */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* Left Panel: Diagnosis */}
                <div className="bg-white p-5 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-slate-400" /> Diagnosis
                    </h4>
                    <div className="space-y-3 font-mono text-sm">
                        <div className="flex justify-between p-2 rounded bg-slate-50">
                            <span className="text-slate-500">Path Delay ($T_cq + Logic$)</span>
                            <span className="font-bold">{totalPathDelay.toFixed(1)} ns</span>
                        </div>
                        {scenario === 'setup' ? (
                            <div className="flex justify-between p-2 rounded bg-indigo-50 border border-indigo-100">
                                <span className="text-indigo-800">Required Time ($T_clk - T_su$)</span>
                                <span className="font-bold text-indigo-700">{(clockPeriod - T_SU).toFixed(1)} ns</span>
                            </div>
                        ) : (
                            <div className="flex justify-between p-2 rounded bg-purple-50 border border-purple-100">
                                <span className="text-purple-800">Required Hold Time ($T_h$)</span>
                                <span className="font-bold text-purple-700">{T_H.toFixed(1)} ns</span>
                            </div>
                        )}

                        <div className={`flex justify-between p-2 rounded border-l-4 ${isCurrentViolationFixed ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-rose-50 border-rose-500 text-rose-800'}`}>
                            <span>Slack</span>
                            <span className="font-bold">
                                {scenario === 'setup' ? setupSlack.toFixed(1) : holdSlack.toFixed(1)} ns
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Fix It */}
                <div className="bg-white p-5 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-emerald-500" /> Repair Tools
                    </h4>

                    {scenario === 'setup' ? (
                        <div className="space-y-6">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase flex justify-between mb-2">
                                    <span>Method 1: Slow Down Clock</span>
                                    <span className="text-indigo-600">{clockPeriod}ns</span>
                                </label>
                                <input
                                    type="range" min="10" max="20" step="0.5"
                                    value={clockPeriod}
                                    onChange={(e) => setClockPeriod(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase flex justify-between mb-2">
                                    <span>Method 2: Optimize Logic (Pipeline)</span>
                                    <span className="text-indigo-600">{logicDelay}ns</span>
                                </label>
                                <button
                                    onClick={() => setLogicDelay(Math.max(5, logicDelay - 1))}
                                    className="w-full py-2 bg-indigo-100 text-indigo-700 font-bold rounded hover:bg-indigo-200 transition-colors"
                                >
                                    Insert Pipeline Stage / Optimize
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="opacity-50 pointer-events-none grayscale">
                                <label className="text-xs font-bold text-slate-400 uppercase flex justify-between mb-2">
                                    <span>Method 1: Slow Down Clock</span>
                                    <span className="text-slate-500">Does Not Work!</span>
                                </label>
                                <input disabled type="range" value={clockPeriod} className="w-full h-2 bg-slate-200 rounded-lg" />
                                <p className="text-[10px] text-rose-500 mt-1 font-bold">
                                    Hold time is independent of clock frequency!
                                </p>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase flex justify-between mb-2">
                                    <span>Method 2: Add Delay</span>
                                    <span className="text-emerald-600">+{bufferDelay}ns</span>
                                </label>
                                <button
                                    onClick={() => setBufferDelay(bufferDelay + 0.5)}
                                    className={`w-full py-2 font-bold rounded transition-colors flex items-center justify-center gap-2 ${bufferDelay < 2 ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-gray-100 text-gray-400'}`}
                                >
                                    <Battery className="w-4 h-4 rotate-90" /> Add Buffer
                                </button>
                            </div>
                        </div>
                    )}

                </div>

            </div>

        </div>
    );
};

export default ViolationRepairShop;
