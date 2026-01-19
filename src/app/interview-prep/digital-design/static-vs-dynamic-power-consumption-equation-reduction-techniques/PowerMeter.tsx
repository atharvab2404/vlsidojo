"use client";

import React, { useState } from "react";
import { Zap, Gauge, Flame, ArrowUp, ArrowDown } from "lucide-react";

/**
 * PowerMeter
 * 
 * Simulations:
 * 1. Dynamic Power: P_dyn = alpha * C * V^2 * f
 * 2. Static Power: P_stat = I_leak * V
 * 
 * Visuals:
 * - Sliders for Voltage, Frequency, Activity.
 * - Bar charts for P_dyn vs P_stat.
 * - Total Power Gauge (Heat).
 */
const PowerMeter = () => {
    // Inputs
    const [voltage, setVoltage] = useState(1.0); // Volts (0.5 to 1.5)
    const [frequency, setFrequency] = useState(1.0); // GHz (0.1 to 3.0)
    const [activity, setActivity] = useState(0.1); // Alpha (0.0 to 1.0)

    // Constants
    const C_LOAD = 10; // pF (Arbitrary scale factor)
    const I_LEAK_BASE = 0.5; // mA leakage at 1V

    // Calculations
    // 1. Dynamic Power
    // P = alpha * C * V^2 * f
    const pDynamic = activity * C_LOAD * (voltage * voltage) * frequency;

    // 2. Static Power
    // I_leak scales exponentially with Voltage (simplified model: V^3 for short channel effects demonstration)
    // or linearly for simple resistor model. Let's use a slightly super-linear model to show V is bad for leakage too.
    const iLeak = I_LEAK_BASE * Math.pow(voltage, 2);
    const pStatic = iLeak * voltage;

    const totalPower = pDynamic + pStatic;

    // Heat Calculation (0 to 100 scale)
    const maxPower = 1.0 * C_LOAD * (1.5 * 1.5) * 3.0 + (I_LEAK_BASE * 1.5 * 1.5 * 1.5); // approx max
    const heatLevel = Math.min(100, (totalPower / maxPower) * 100);

    // Color gradient based on heat
    const getHeatColor = () => {
        if (heatLevel < 30) return "text-emerald-500";
        if (heatLevel < 70) return "text-amber-500";
        return "text-rose-500";
    };

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans select-none">

            {/* Context Header */}
            <div className="text-center mb-8">
                <h3 className="text-lg font-bold text-slate-700 flex items-center justify-center gap-2">
                    <Gauge className="w-5 h-5 text-indigo-600" /> Power Efficiency Lab
                </h3>
                <p className="text-sm text-slate-500 mt-2">
                    Adjust the operating parameters. Watch how <strong>Voltage (<i>V<sub>dd</sub></i>)</strong> has the most explosive impact on power.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* Controls */}
                <div className="space-y-6">

                    {/* Voltage Slider */}
                    <div>
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                            <span>Voltage (<i>V<sub>dd</sub></i>)</span>
                            <span className="text-indigo-600">{voltage.toFixed(2)} V</span>
                        </div>
                        <input
                            type="range" min="0.5" max="1.5" step="0.05"
                            value={voltage}
                            onChange={(e) => setVoltage(parseFloat(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <p className="text-[10px] text-slate-400 mt-1">Impacts Dynamic (<i>V<sup>2</sup></i>) and Leakage (<i>V</i>).</p>
                    </div>

                    {/* Frequency Slider */}
                    <div>
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                            <span>Frequency (<i>f</i>)</span>
                            <span className="text-indigo-600">{frequency.toFixed(1)} GHz</span>
                        </div>
                        <input
                            type="range" min="0.1" max="3.0" step="0.1"
                            value={frequency}
                            onChange={(e) => setFrequency(parseFloat(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <p className="text-[10px] text-slate-400 mt-1">Linear Impact on Dynamic Power.</p>
                    </div>

                    {/* Activity Slider */}
                    <div>
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                            <span>Activity Factor (&alpha;)</span>
                            <span className="text-indigo-600">{(activity * 100).toFixed(0)}%</span>
                        </div>
                        <input
                            type="range" min="0.0" max="1.0" step="0.05"
                            value={activity}
                            onChange={(e) => setActivity(parseFloat(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <p className="text-[10px] text-slate-400 mt-1">Clock Gating sets this to 0.</p>
                    </div>

                </div>

                {/* Dashboard */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">

                    {/* Total Power Display */}
                    <div className="text-center mb-6">
                        <div className={`text-4xl font-black ${getHeatColor()} transition-colors duration-300 flex justify-center items-center gap-2`}>
                            <Flame className={`w-8 h-8 ${heatLevel > 70 ? 'animate-pulse' : ''}`} />
                            {totalPower.toFixed(2)} <span className="text-base font-medium text-slate-400">mW</span>
                        </div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Total Power Consumption</div>
                    </div>

                    {/* Breakdown Bars */}
                    <div className="space-y-4">

                        {/* Dynamic Bar */}
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="font-bold text-indigo-600">Dynamic (Switching)</span>
                                <span className="font-mono text-slate-500">{pDynamic.toFixed(2)} mW</span>
                            </div>
                            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-indigo-500 transition-all duration-300"
                                    style={{ width: `${(pDynamic / maxPower) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Static Bar */}
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="font-bold text-rose-500">Static (Leakage)</span>
                                <span className="font-mono text-slate-500">{pStatic.toFixed(2)} mW</span>
                            </div>
                            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-rose-500 transition-all duration-300"
                                    style={{ width: `${(pStatic / maxPower) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default PowerMeter;
