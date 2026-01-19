"use client";

import React, { useState } from "react";
import { Clock, ArrowRight, Gauge, AlertTriangle, CheckCircle } from "lucide-react";

/**
 * SkewAnalyzer
 * 
 * Visualizes Positive vs Negative Clock Skew.
 * User controls the "Skew" slider (Capture Clock Delay).
 * 
 * Positive Skew: Capture Clock arrives LATER (+ve delay).
 * Negative Skew: Capture Clock arrives EARLIER (-ve delay).
 */
const SkewAnalyzer = () => {
    const [skew, setSkew] = useState(0); // -5 to +5 ns

    // Fixed Parameters
    const T_CLK = 10;
    const T_CQ = 1;
    const T_COMB = 8; // Data Path Delay
    const T_SU = 2;
    const T_H = 1;

    // Analysis
    // Effective Period = T_CLK + Skew
    // Setup Check: Data Arrival (T_CQ + T_COMB) <= Effective Period - T_SU
    //              9 <= (10 + Skew) - 2 -> 11 + Skew >= 9 -> Skew >= -2

    // Hold Check: Data Arrival (T_CQ + T_COMB) >= T_H + Skew
    //             9 >= 1 + Skew -> Skew <= 8

    // Let's adjust parameters to make it more interesting.
    // T_COMB = 9. Total Arrival = 1 + 9 = 10.
    // T_CLK = 10. T_SU = 2. Required Arrival = 10 - 2 = 8.
    // VIOLATION! (10 > 8 is False).
    // We need Skew to fix it.
    // (10 + Skew) - 2 >= 10 -> Skew - 2 >= 0 -> Skew >= 2.
    // So Positive Skew >= 2ns fixes Setup.

    // Hold Check:
    // 10 >= 1 + Skew -> Skew <= 9.

    // So if Skew > 9, we get Hold Violation.

    const DATA_ARRIVAL = 10;  // T_CQ + T_COMB (1+9)
    const REQUIRED_SETUP = (T_CLK + skew) - T_SU;
    const REQUIRED_HOLD = T_H + skew;

    const setupMet = DATA_ARRIVAL <= REQUIRED_SETUP;
    const holdMet = DATA_ARRIVAL >= REQUIRED_HOLD;

    // Determine Status
    let status = "SAFE";
    if (!setupMet) status = "SETUP VIOLATION";
    if (!holdMet) status = "HOLD VIOLATION"; // Hold usually takes precedence in panic naming

    const isPositiveSkew = skew > 0;
    const isNegativeSkew = skew < 0;

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans select-none">

            {/* Context Header */}
            <div className="text-center mb-8">
                <h3 className="text-lg font-bold text-slate-700 flex items-center justify-center gap-2">
                    <Gauge className="w-5 h-5 text-indigo-600" /> Skew Control Center
                </h3>
                <p className="text-sm text-slate-500 max-w-lg mx-auto mt-2">
                    Inject delay into the Capture Clock path. Positive Skew means the capture clock arrives <strong>LATER</strong>.
                </p>
            </div>

            {/* Slider */}
            <div className="flex flex-col items-center mb-10">
                <div className="flex justify-between w-full max-w-lg mb-2 text-xs font-bold uppercase tracking-widest">
                    <span className="text-rose-500">Negative Skew (Early)</span>
                    <span className="text-slate-400">0 Skew</span>
                    <span className="text-emerald-500">Positive Skew (Late)</span>
                </div>
                <input
                    type="range"
                    min="-4"
                    max="4"
                    step="0.5"
                    value={skew}
                    onChange={(e) => setSkew(parseFloat(e.target.value))}
                    className={`w-full max-w-lg h-4 rounded-full appearance-none cursor-pointer transition-colors ${skew > 0 ? 'bg-emerald-200 accent-emerald-600' : (skew < 0 ? 'bg-rose-200 accent-rose-600' : 'bg-slate-200 accent-slate-500')}`}
                />
                <div className="mt-4 font-mono text-xl font-bold text-slate-700 bg-white border px-4 py-2 rounded shadow-sm">
                    T<sub>skew</sub> = {skew > 0 ? '+' : ''}{skew} ns
                </div>
            </div>

            {/* Timing Diagram Visualization */}
            <div className="bg-slate-900 rounded-xl p-8 mb-8 relative overflow-hidden">

                {/* Launch Clock */}
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-slate-400 w-24 font-mono text-xs text-right">Launch CLK</span>
                    <div className="flex-1 h-12 relative border-l-2 border-slate-600">
                        {/* Edge at 0 */}
                        <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
                        <span className="absolute -top-4 -left-2 text-yellow-400 text-[10px]">T=0</span>

                        {/* Data Path */}
                        <div className="absolute top-4 left-0 h-4 bg-indigo-500/50 flex items-center justify-center text-[10px] text-white overflow-hidden whitespace-nowrap" style={{ width: `${(DATA_ARRIVAL / 20) * 100}%` }}>
                            Data Path ({DATA_ARRIVAL}ns)
                        </div>
                    </div>
                </div>

                {/* Capture Clock (Variable) */}
                <div className="flex items-center gap-4">
                    <span className="text-slate-400 w-24 font-mono text-xs text-right">Capture CLK</span>
                    <div className="flex-1 h-12 relative border-l-2 border-slate-600 bg-slate-800/50">
                        {/* Nominal Edge at T_CLK (10) */}
                        <div className="absolute top-0 bottom-0 left-[50%] w-0.5 bg-slate-600 border-l border-dashed border-slate-500 group">
                            <span className="absolute -bottom-6 -left-4 text-slate-500 text-[10px] w-20">Nominal (10ns)</span>
                        </div>

                        {/* Skewed Edge */}
                        <div
                            className={`absolute top-0 bottom-0 w-1 transition-all duration-300 z-10 ${skew !== 0 ? 'bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)]' : 'bg-white'}`}
                            style={{ left: `${((T_CLK + skew) / 20) * 100}%` }}
                        >
                            <span className={`absolute -top-5 -left-8 text-[10px] font-bold w-32 text-center ${skew !== 0 ? 'text-emerald-400' : 'text-white'}`}>
                                Capture Edge ({10 + skew}ns)
                            </span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Analysis Dashboard */}
            <div className="grid md:grid-cols-2 gap-4">

                {/* Setup Analysis */}
                <div className={`p-4 rounded-xl border-2 transition-all ${setupMet ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
                    <h4 className="font-bold flex items-center gap-2 mb-2 text-sm uppercase tracking-wide">
                        {setupMet ? <CheckCircle className="w-5 h-5 text-emerald-600" /> : <AlertTriangle className="w-5 h-5 text-rose-600" />}
                        Setup Check
                    </h4>
                    <p className="text-xs text-slate-600 mb-2">
                        Does Data arrive before Capture?
                    </p>
                    <div className="font-mono text-sm bg-white/50 p-2 rounded">
                        {DATA_ARRIVAL} &le; {REQUIRED_SETUP}
                    </div>
                    {skew > 0 && <p className="text-xs text-emerald-700 mt-2 font-bold">Positive Skew HELPS Setup!</p>}
                    {skew < 0 && <p className="text-xs text-rose-700 mt-2 font-bold">Negative Skew HURTS Setup!</p>}
                </div>

                {/* Hold Analysis */}
                <div className={`p-4 rounded-xl border-2 transition-all ${holdMet ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
                    <h4 className="font-bold flex items-center gap-2 mb-2 text-sm uppercase tracking-wide">
                        {holdMet ? <CheckCircle className="w-5 h-5 text-emerald-600" /> : <AlertTriangle className="w-5 h-5 text-rose-600" />}
                        Hold Check
                    </h4>
                    <p className="text-xs text-slate-600 mb-2">
                        Does Data stay valid until Capture + Hold?
                    </p>
                    <div className="font-mono text-sm bg-white/50 p-2 rounded">
                        {DATA_ARRIVAL} &ge; {REQUIRED_HOLD}
                    </div>
                    {skew > 0 && <p className="text-xs text-rose-700 mt-2 font-bold">Positive Skew HURTS Hold!</p>}
                    {skew < 0 && <p className="text-xs text-emerald-700 mt-2 font-bold">Negative Skew HELPS Hold!</p>}
                </div>

            </div>

        </div>
    );
};

export default SkewAnalyzer;
