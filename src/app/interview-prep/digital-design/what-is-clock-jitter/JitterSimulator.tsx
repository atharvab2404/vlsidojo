"use client";

import React, { useState, useEffect, useRef } from "react";
import { Activity, AlertTriangle, Zap } from "lucide-react";

/**
 * JitterSimulator
 * 
 * Visualizes Clock Jitter (Random Noise).
 * - Nominally, Clock Edge is at T=0.
 * - With Jitter, it arrives at T = 0 ± Noise.
 * - This eats into BOTH Setup and Hold margins.
 */
const JitterSimulator = () => {
    const [jitterAmount, setJitterAmount] = useState(0); // 0 to 5 "units" of noise
    const [currentNoise, setCurrentNoise] = useState(0);
    const animationRef = useRef<number>(0);

    // Animation Loop
    useEffect(() => {
        const updateNoise = () => {
            // Generate random noise bounded by jitterAmount
            // Use Math.sin for a slightly more rhythmic "vibration" feel + random jitter
            const noise = (Math.random() - 0.5) * 2 * jitterAmount;
            setCurrentNoise(noise);
            animationRef.current = requestAnimationFrame(updateNoise);
        };

        if (jitterAmount > 0) {
            animationRef.current = requestAnimationFrame(updateNoise);
        } else {
            setCurrentNoise(0);
        }

        return () => cancelAnimationFrame(animationRef.current);
    }, [jitterAmount]);

    // Params
    // Period = 100px width context. Edge at 50%.
    const EDGE_POS = 50;

    // Impact Calculation
    // We visualize the "Uncertainty Region" (T_unc) growing.
    // If jitter is 2, the edge can be anywhere from 48 to 52.
    // This effectively reduces the usable cycle time.

    // Margin Reduction Analysis
    const maxVariation = jitterAmount;
    const isDangerous = jitterAmount > 3;

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans select-none">

            {/* Header */}
            <div className="text-center mb-8">
                <h3 className="text-lg font-bold text-slate-700 flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500 fill-amber-500" /> Oscillator Noise Control
                </h3>
                <p className="text-sm text-slate-500 mt-2">
                    Turn up the "Noise" knob to inject random Jitter into the clock source.
                </p>
            </div>

            {/* Slider */}
            <div className="flex flex-col items-center mb-10">
                <div className="flex justify-between w-full max-w-lg mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                    <span>Clean Clock (Ideal)</span>
                    <span className="text-amber-600">High Jitter (Noisy)</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={jitterAmount}
                    onChange={(e) => setJitterAmount(parseFloat(e.target.value))}
                    className="w-full max-w-lg h-4 bg-slate-200 rounded-full appearance-none cursor-pointer accent-amber-500"
                />
            </div>

            {/* Visualization */}
            <div className="bg-slate-900 rounded-xl p-8 mb-8 relative overflow-hidden h-40 flex items-center">

                {/* Nominal Grid Line */}
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-700 border-l border-dashed border-slate-600"></div>
                <span className="absolute top-2 left-[50%] -translate-x-[50%] text-[10px] text-slate-500 font-mono bg-slate-900 px-1">
                    Ideal Edge
                </span>

                {/* The Jittery Clock Edge */}
                <div
                    className="absolute top-6 bottom-6 w-1 bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.8)] z-20"
                    style={{
                        left: `${EDGE_POS + currentNoise}%`,
                        transition: 'left 50ms linear' // Smooth out the jumps slightly
                    }}
                >
                    <div className="absolute -bottom-6 -left-3 text-[10px] font-bold text-amber-400 w-20">
                        Arrival
                    </div>
                </div>

                {/* The "Region of Uncertainty" (Ghost Trail) */}
                {jitterAmount > 0 && (
                    <div
                        className="absolute top-8 bottom-8 bg-amber-500/20 border-x border-amber-500/30 z-10"
                        style={{
                            left: `${EDGE_POS - maxVariation}%`,
                            width: `${maxVariation * 2}%`
                        }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] text-amber-200/50 font-mono tracking-tighter">
                            UNCERTAINTY
                        </div>
                    </div>
                )}

            </div>

            {/* Impact Analysis */}
            <div className={`p-6 rounded-xl border transition-all ${isDangerous ? 'bg-rose-50 border-rose-200' : 'bg-white border-slate-200'}`}>
                <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-indigo-500" /> Impact Analysis
                </h4>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Setup Impact */}
                    <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Setup Margin</div>
                        <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-lg text-rose-600">Reduced by {jitterAmount.toFixed(1)}ns</span>
                            {isDangerous && <AlertTriangle className="w-4 h-4 text-rose-500 animate-bounce" />}
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                            The clock might arrive <strong>EARLY</strong> for the next cycle, catching the data before it's ready.
                        </p>
                    </div>

                    {/* Hold Impact */}
                    <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Hold Margin</div>
                        <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-lg text-rose-600">Reduced by {jitterAmount.toFixed(1)}ns</span>
                            {isDangerous && <AlertTriangle className="w-4 h-4 text-rose-500 animate-bounce" />}
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                            The clock might arrive <strong>LATE</strong> for the current cycle, allowing new data to race through.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default JitterSimulator;
