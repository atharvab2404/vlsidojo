"use client";

import React, { useState } from "react";
import { Clock, AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";

/**
 * TimingZoneSimulator
 * 
 * Visualizes Setup and Hold time constraints.
 * User moves a "Data Arrival" slider relative to the Clock Edge.
 */
const TimingZoneSimulator = () => {
    // 50 is the clock edge.
    // Setup Requirement: e.g., 10 units before edge (arrival <= 40)
    // Hold Requirement: e.g., 5 units after edge (arrival >= 55 for next data, but here we view stability constraint)
    // Let's simplify: 
    // We visualize WHEN the data becomes STABLE.
    // If Data arrives too late (after setup window starts), it's a Setup Violation.
    // If Data changes too soon (before hold window ends), it's a Hold Violation.

    // Let's model "Data Arrival Time".
    // Clock Edge is at t=0 for simplicity in the UI context, or let's say t=50.
    // Setup time (Tsu) = 15ns.
    // Hold time (Th) = 10ns.
    // Safe Window: Data must be stable from (Edge - Tsu) to (Edge + Th).

    const [arrival, setArrival] = useState(20); // Relative units
    const EDGE = 50;
    const T_SU = 15;
    const T_HOLD = 10;

    const setupZoneStart = EDGE - T_SU; // 35
    const holdZoneEnd = EDGE + T_HOLD;   // 60

    // Status Logic
    let status: 'safe' | 'setup_violation' | 'hold_violation' = 'safe';
    let message = "";

    // In this model, "Arrival" is when data *becomes valid*.
    // It must become valid BEFORE the setup zone starts.
    if (arrival > setupZoneStart && arrival <= EDGE) {
        status = 'setup_violation';
        message = "SETUP VIOLATION! Data arrived inside the Setup Window. Flip-flop cannot capture it reliably.";
    } else if (arrival > EDGE) {
        status = 'setup_violation';
        message = "SETUP VIOLATION! Data arrived AFTER the clock edge. Completely missed the bus.";
    }
    // Note: Hold violation is usually about data changing too early *next* time, or changing *during* the hold window.
    // For this simple visualizer, let's assume "Arrival" means the data transition. 
    // If the data transitions *during* the hold window (e.g. it was supposed to be stable from previous cycle but changes now), that's tricky to map to a single slider.
    // Let's stick to "Data Arrival" for Setup.

    // Actually, widespread confusion: 
    // Setup Check: Data must arrive before (Clk - Tsu).
    // Hold Check: Data must NOT change before (Clk + Th).

    // Let's make the slider control "Data Stable From".
    // If Data becomes stable at t=30 (which is < 35), we are safe for Setup.
    // But what about Hold? Hold typically checks the *previous* data not changing.
    // Let's focus this visualizer primarily on SETUP, as it's the intuitive "arriving late" problem.
    // OR allow a mode switch.

    // Improved Model:
    // Slider controls the Data Transition edge.
    // Green Zone: Safe Area (before setup window).
    // Red Zone: Keep Out Zone (Setup + Hold window).

    const isViolation = arrival > setupZoneStart;

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans select-none">

            <div className="text-center mb-8">
                <h3 className="text-lg font-bold text-slate-700">Interactive Timing Diagram</h3>
                <p className="text-sm text-slate-500">Drag the slider to change when Data arrives.</p>
            </div>

            {/* Diagram Container */}
            <div className="relative h-64 bg-slate-900 rounded-xl overflow-hidden mb-6 shadow-inner flex flex-col justify-center">

                {/* Grid Lines */}
                <div className="absolute inset-0 flex">
                    <div className="flex-1 border-r border-slate-800/50"></div>
                    <div className="flex-1 border-r border-slate-800/50"></div>
                    <div className="flex-1 border-r border-slate-800/50"></div>
                    <div className="flex-1 border-r border-slate-800/50"></div>
                </div>

                {/* Clock Waveform */}
                <div className="absolute top-12 left-0 right-0 h-16 flex items-end">
                    <span className="absolute left-2 top-0 text-xs font-mono text-slate-400">CLK</span>
                    {/* Low */}
                    <div className="h-1 bg-sky-500 w-[50%]"></div>
                    {/* Rising Edge */}
                    <div className="h-12 w-1 bg-sky-500"></div>
                    {/* High */}
                    <div className="h-1 bg-sky-500 w-[49%] mb-11"></div>
                </div>

                {/* The "Edge" Line */}
                <div className="absolute top-4 bottom-4 left-[50%] w-0.5 bg-white/30 border-l border-dashed border-white">
                    <div className="absolute -top-4 -left-3 text-white text-xs font-bold">EDGE</div>
                </div>

                {/* Keep Out Zone (Setup + Hold) */}
                <div
                    className="absolute top-10 bottom-10 bg-rose-500/20 border-x-2 border-rose-500/50 flex items-center justify-center text-rose-300 text-xs font-bold tracking-widest uppercase z-0"
                    style={{
                        left: `${setupZoneStart}%`,
                        width: `${T_SU + T_HOLD}%`
                    }}
                >
                    <div className="rotate-90 md:rotate-0 whitespace-nowrap">Keep Out Zone</div>
                </div>

                {/* Safe Zone */}
                <div
                    className="absolute top-10 bottom-10 bg-emerald-500/10 border-l-2 border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-bold tracking-widest uppercase z-0"
                    style={{
                        left: `0%`,
                        width: `${setupZoneStart}%`
                    }}
                >
                    Safe Arrival
                </div>


                {/* Data Waveform (Controlled by Slider) */}
                <div className="absolute bottom-12 left-0 right-0 h-16 flex items-center z-10">
                    <span className="absolute left-2 top-0 text-xs font-mono text-slate-400">DATA</span>

                    {/* Unstable/Previous Data */}
                    <div
                        className="h-8 bg-slate-700/50 border-y border-dashed border-slate-600 transition-all duration-100 ease-linear"
                        style={{ width: `${arrival}%` }}
                    ></div>

                    {/* Transition Edge */}
                    <div
                        className={`h-12 w-1 transition-all duration-100 ease-linear ${isViolation ? 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,1)]' : 'bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,1)]'}`}
                        style={{ left: `${arrival}%`, position: 'absolute' }}
                    >
                        {/* Alert Icon following the edge */}
                        {isViolation && (
                            <div className="absolute -top-8 -left-3 bg-rose-600 rounded-full p-1 animate-bounce">
                                <AlertTriangle className="w-4 h-4 text-white" />
                            </div>
                        )}
                    </div>

                    {/* Stable New Data */}
                    <div
                        className={`h-8 border-y-2 flex items-center justify-center transition-all duration-100 ease-linear ${isViolation ? 'bg-rose-500/20 border-rose-500 text-rose-300' : 'bg-emerald-500/20 border-emerald-500 text-emerald-300'}`}
                        style={{
                            left: `${arrival}%`,
                            right: '0',
                            position: 'absolute'
                        }}
                    >
                        <span className="text-xs font-bold">{isViolation ? 'UNSTABLE / LATE' : 'VALID DATA'}</span>
                    </div>
                </div>

            </div>

            {/* Slider Control */}
            <div className="flex flex-col items-center mb-6">
                <input
                    type="range"
                    min="10"
                    max="90"
                    step="0.5"
                    value={arrival}
                    onChange={(e) => setArrival(parseFloat(e.target.value))}
                    className={`w-full max-w-lg h-3 rounded-lg appearance-none cursor-pointer transition-colors ${isViolation ? 'bg-rose-200 accent-rose-600' : 'bg-emerald-200 accent-emerald-600'}`}
                />
                <div className="flex justify-between w-full max-w-lg mt-2 text-xs font-mono text-slate-400">
                    <span>Early</span>
                    <span>Clock Edge</span>
                    <span>Late</span>
                </div>
            </div>

            {/* Feedback Box */}
            <div className={`p-4 rounded-lg border flex items-start gap-3 transition-colors ${isViolation ? 'bg-rose-50 border-rose-200' : 'bg-emerald-50 border-emerald-200'}`}>
                {isViolation ? (
                    <>
                        <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />
                        <div>
                            <h4 className="font-bold text-rose-900">Setup Violation!</h4>
                            <p className="text-sm text-rose-800">
                                The data arrived too late! It entered the <strong>Setup Window</strong> ({T_SU} units before edge).
                                The Flip-Flop needs time to physically open its gates to capture the electrons.
                                <br />
                                <strong>Fix:</strong> Slow down the clock frequency OR Optimize logic delay.
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                        <div>
                            <h4 className="font-bold text-emerald-900">Timing Met (Safe)</h4>
                            <p className="text-sm text-emerald-800">
                                Perfect! The data is stable well before the Setup Window begins. The Flip-Flop will capture this value reliably on the rising edge.
                            </p>
                        </div>
                    </>
                )}
            </div>

            {/* Definitions */}
            <div className="grid grid-cols-2 gap-4 mt-6 text-xs text-slate-500">
                <div className="bg-white p-3 rounded border">
                    <strong className="text-indigo-600 block mb-1">Setup Time ($t_{'{su}'}$)</strong>
                    Time data must be stable <em>BEFORE</em> clock edge.
                </div>
                <div className="bg-white p-3 rounded border">
                    <strong className="text-indigo-600 block mb-1">Hold Time ($t_{'{h}'}$)</strong>
                    Time data must be stable <em>AFTER</em> clock edge.
                </div>
            </div>

        </div>
    );
};

export default TimingZoneSimulator;
