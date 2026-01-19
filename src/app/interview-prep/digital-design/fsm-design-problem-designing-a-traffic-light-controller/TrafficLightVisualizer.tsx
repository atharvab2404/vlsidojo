"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";

/**
 * TrafficLightVisualizer
 * 
 * Simulates a standard 4-way traffic light FSM.
 * - States:
 *   0: NS Green, EW Red
 *   1: NS Yellow, EW Red
 *   2: NS Red, EW Green
 *   3: NS Red, EW Yellow
 */
const TrafficLightVisualizer = () => {
    const [state, setState] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10); // Start with 10s for demo speed
    const [isRunning, setIsRunning] = useState(false);

    // Timing Constants (Shortened for demo)
    const GREEN_TIME = 8;
    const YELLOW_TIME = 3;

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        nextState();
                        return 0; // Value will be reset by nextState logic immediately, but return 0 to be safe
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, state]);

    const nextState = () => {
        setState((current) => {
            const next = (current + 1) % 4;
            // Set time based on the *next* state's color
            // S0(Green) -> 8s
            // S1(Yellow) -> 3s
            // S2(Green) -> 8s
            // S3(Yellow) -> 3s
            if (next === 0 || next === 2) setTimeLeft(GREEN_TIME);
            else setTimeLeft(YELLOW_TIME);

            return next;
        });
    };

    const reset = () => {
        setIsRunning(false);
        setState(0);
        setTimeLeft(GREEN_TIME);
    };

    // Derived light status
    const getLights = (dir: 'NS' | 'EW') => {
        // NS is Green at S0, Yellow at S1, Red at S2, S3
        if (dir === 'NS') {
            if (state === 0) return 'green';
            if (state === 1) return 'yellow';
            return 'red';
        } else {
            // EW is Green at S2, Yellow at S3, Red at S0, S1
            if (state === 2) return 'green';
            if (state === 3) return 'yellow';
            return 'red';
        }
    };

    const LightHead = ({ color, active }: { color: 'red' | 'yellow' | 'green', active: string }) => {
        // Active color matches the bulb color
        const isOn = active === color;
        let bgClass = "bg-gray-800";
        if (isOn) {
            if (color === 'red') bgClass = "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]";
            if (color === 'yellow') bgClass = "bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.8)]";
            if (color === 'green') bgClass = "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]";
        } else {
            // Dim versions
            if (color === 'red') bgClass = "bg-red-950";
            if (color === 'yellow') bgClass = "bg-amber-950";
            if (color === 'green') bgClass = "bg-emerald-950";
        }

        return <div className={`w-8 h-8 rounded-full border border-gray-700 transition-all duration-300 ${bgClass}`} />
    };

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans">

            {/* Top Bar: Status & Timer */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                        <Timer className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-xs uppercase font-bold text-slate-400">Time Remaining</div>
                        <div className="text-3xl font-black text-slate-800 tabular-nums">00:{timeLeft.toString().padStart(2, '0')}</div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setIsRunning(!isRunning)}
                        className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${isRunning ? "bg-amber-100 text-amber-700" : "bg-indigo-600 text-white hover:bg-indigo-700"
                            }`}
                    >
                        {isRunning ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Start</>}
                    </button>
                    <button onClick={reset} className="p-2 border border-slate-200 rounded-lg hover:bg-white text-slate-500"><RotateCcw className="w-4 h-4" /></button>
                </div>
            </div>

            {/* The Intersection */}
            <div className="relative bg-slate-200 w-full h-80 rounded-xl overflow-hidden border border-slate-300 flex items-center justify-center">
                {/* Roads */}
                <div className="absolute inset-0 bg-slate-300" />

                {/* NS Road */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-24 bg-slate-700 border-x-2 border-slate-500 border-dashed" />

                {/* EW Road */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-24 bg-slate-700 border-y-2 border-slate-500 border-dashed" />

                {/* Intersection Center */}
                <div className="absolute w-24 h-24 bg-slate-700 z-0" />

                {/* --- Traffic Lights --- */}

                {/* North Light (Facing South-bound traffic, strictly typically sits on NW corner or hangs center) */}
                {/* Let's place them visually intuitively. Top-Left corner facing down? */}
                {/* We'll just place blocks labeled N, S, E, W */}

                {/* North Signal */}
                <div className="absolute top-4 left-[calc(50%+60px)] flex flex-col items-center gap-1 z-10 bg-gray-900 p-2 rounded-lg border border-gray-600 shadow-xl scale-75">
                    <div className="text-[10px] text-gray-400 font-bold mb-1">NORTH</div>
                    <LightHead color="red" active={getLights('NS')} />
                    <LightHead color="yellow" active={getLights('NS')} />
                    <LightHead color="green" active={getLights('NS')} />
                </div>

                {/* South Signal */}
                <div className="absolute bottom-4 right-[calc(50%+60px)] flex flex-col items-center gap-1 z-10 bg-gray-900 p-2 rounded-lg border border-gray-600 shadow-xl scale-75">
                    <div className="text-[10px] text-gray-400 font-bold mb-1">SOUTH</div>
                    <LightHead color="red" active={getLights('NS')} />
                    <LightHead color="yellow" active={getLights('NS')} />
                    <LightHead color="green" active={getLights('NS')} />
                </div>

                {/* East Signal */}
                <div className="absolute right-4 top-[calc(50%+60px)] flex flex-col items-center gap-1 z-10 bg-gray-900 p-2 rounded-lg border border-gray-600 shadow-xl scale-75">
                    <div className="text-[10px] text-gray-400 font-bold mb-1">EAST</div>
                    <LightHead color="red" active={getLights('EW')} />
                    <LightHead color="yellow" active={getLights('EW')} />
                    <LightHead color="green" active={getLights('EW')} />
                </div>

                {/* West Signal */}
                <div className="absolute left-4 bottom-[calc(50%+60px)] flex flex-col items-center gap-1 z-10 bg-gray-900 p-2 rounded-lg border border-gray-600 shadow-xl scale-75">
                    <div className="text-[10px] text-gray-400 font-bold mb-1">WEST</div>
                    <LightHead color="red" active={getLights('EW')} />
                    <LightHead color="yellow" active={getLights('EW')} />
                    <LightHead color="green" active={getLights('EW')} />
                </div>

            </div>

            {/* State Debugger */}
            <div className="mt-6 flex justify-center gap-4 text-xs font-mono text-slate-500">
                <div className={`px-2 py-1 rounded ${state === 0 ? 'bg-indigo-100 text-indigo-700 font-bold' : ''}`}>S0: NS-Grn</div>
                <div className={`px-2 py-1 rounded ${state === 1 ? 'bg-indigo-100 text-indigo-700 font-bold' : ''}`}>S1: NS-Yel</div>
                <div className={`px-2 py-1 rounded ${state === 2 ? 'bg-indigo-100 text-indigo-700 font-bold' : ''}`}>S2: EW-Grn</div>
                <div className={`px-2 py-1 rounded ${state === 3 ? 'bg-indigo-100 text-indigo-700 font-bold' : ''}`}>S3: EW-Yel</div>
            </div>

        </div>
    );
};

export default TrafficLightVisualizer;
