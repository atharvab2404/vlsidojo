"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RefreshCw } from "lucide-react";

export default function LatchVsFlipFlopVisualizer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [d, setD] = useState(0);
    const [clk, setClk] = useState(0);
    const [qLatch, setQLatch] = useState(0);
    const [qFF, setQFF] = useState(0);

    // History for waveforms
    const [history, setHistory] = useState<{ clk: number, d: number, qL: number, qF: number }[]>([]);

    const tickRef = useRef<NodeJS.Timeout | null>(null);
    const stepRef = useRef(0);

    // Simulation simulation logic
    useEffect(() => {
        if (isPlaying) {
            tickRef.current = setInterval(() => {
                stepRef.current += 1;

                // Clock toggles every 10 ticks (approx 500ms period if 50ms tick)
                const newClk = Math.floor(stepRef.current / 10) % 2;

                setClk(currentClk => {
                    // Detect Rising Edge
                    const isRisingEdge = (currentClk === 0 && newClk === 1);

                    setQFF(currQ => {
                        // Flip Flop updates ONLY on rising edge
                        return isRisingEdge ? d : currQ;
                    });

                    return newClk;
                });

                setQLatch(() => {
                    // Latch uses logic (if Clk=1, Q = D) (Assuming High Level Trigger)
                    // Note: We need access to the *simulated* clk, which is newClk here.
                    return newClk === 1 ? d : qLatch;
                });

                // Just for react state update to access latest vals in next cycle? 
                // Actually the closure 'd' is stale if we rely on setInterval closure.
                // We need to use refs or functional updates carefully. 
                // Simplification for visualization:
                // We will rely on the useEffect dependency on 'd' to restart simulation? No, that causes jumps.
                // Better: Use a ref for 'd'.
            }, 100);
        } else {
            if (tickRef.current) clearInterval(tickRef.current);
        }
        return () => { if (tickRef.current) clearInterval(tickRef.current); }
    }, [isPlaying]); // Rerun if play toggles. But 'd' update issue remains.

    // Better Simulation Approach:
    // Run an effect that depends on time, but access 'd' via ref.
    const dRef = useRef(d);
    const qLatchRef = useRef(0);
    const qFFRef = useRef(0);
    const clkRef = useRef(0);

    useEffect(() => { dRef.current = d; }, [d]);

    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            // 1. Update Clock (Period = 20 ticks)
            stepRef.current = (stepRef.current + 1) % 40;
            const newClk = stepRef.current < 20 ? 0 : 1;
            const isRisingEdge = (clkRef.current === 0 && newClk === 1);
            clkRef.current = newClk;

            // 2. Update Latch (Transparent High)
            if (newClk === 1) {
                qLatchRef.current = dRef.current;
            }
            // else hold

            // 3. Update FF (Rising Edge)
            if (isRisingEdge) {
                qFFRef.current = dRef.current;
            }

            // 4. Update Trace
            setHistory(prev => {
                const newH = [...prev, {
                    clk: newClk,
                    d: dRef.current,
                    qL: qLatchRef.current,
                    qF: qFFRef.current
                }];
                if (newH.length > 50) newH.shift(); // Keep last 50 points
                return newH;
            });
        }, 150); // Slowed from 50ms to 150ms per user request

        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="flex flex-col gap-6 select-none bg-gray-50 p-6 rounded-xl border border-gray-200">

            {/* Controls */}
            <div className="flex items-center justify-between">
                <div className="flex gap-4">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors">
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {isPlaying ? "Pause Sim" : "Start Sim"}
                    </button>
                    <button onClick={() => setHistory([])} className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg">
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-lg border border-gray-200">
                    <span className="text-sm font-bold text-gray-400">INPUT D</span>
                    <button onClick={() => setD(d ? 0 : 1)} className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${d ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${d ? 'left-7' : 'left-1'}`}></div>
                    </button>
                    <span className={`font-mono font-bold w-4 ${d ? 'text-indigo-600' : 'text-gray-400'}`}>{d}</span>
                </div>
            </div>

            {/* Waveform Canvas (SVG) */}
            <div className="bg-gray-900 p-4 rounded-lg overflow-hidden relative font-mono text-xs h-64">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex justify-between pointer-events-none opacity-20">
                    {[...Array(10)].map((_, i) => <div key={i} className="w-px h-full bg-gray-500"></div>)}
                </div>

                <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">

                    {/* Helper to generate digital path */}
                    {[
                        { id: "CLK", val: "clk", color: "#facc15", yBase: 0 },
                        { id: "Data", val: "d", color: "#22d3ee", yBase: 50 },
                        { id: "Q (Latch)", val: "qL", color: "#fb7185", yBase: 100 },
                        { id: "Q (FF)", val: "qF", color: "#34d399", yBase: 150 },
                    ].map((sig, idx) => {
                        const stepX = 10;
                        const highY = sig.yBase + 10;
                        const lowY = sig.yBase + 40;

                        // Generate Path
                        let pathParams = `M 0 ${history[0]?.[sig.val as keyof typeof history[0]] ? highY : lowY} `;
                        history.forEach((h, i) => {
                            const val = h[sig.val as keyof typeof h];
                            const y = val ? highY : lowY;
                            const x = (i) * stepX;
                            const nextX = (i + 1) * stepX;
                            // Digital square wave: Vertical transition at X, then Horizontal to NextX
                            pathParams += `L ${x} ${y} L ${nextX} ${y} `;
                        });

                        return (
                            <g key={sig.id}>
                                <text x="-10" y={sig.yBase + 30} fill={sig.color} className="font-bold text-xs" textAnchor="end">{sig.id}</text>
                                <path d={pathParams} stroke={sig.color} strokeWidth="2" fill="none" />
                            </g>
                        );
                    })}
                </svg>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
                    <h4 className="font-bold text-rose-800 mb-1">D Latch Behavior</h4>
                    <p className="text-gray-600">
                        Tracks Input D whenever <span className="text-yellow-600 font-bold">CLK = 1</span>.<br /> (Transparent)
                    </p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                    <h4 className="font-bold text-emerald-800 mb-1">D Flip-Flop Behavior</h4>
                    <p className="text-gray-600">
                        Updates ONLY on <span className="text-yellow-600 font-bold">Rising Edge</span> (0 to 1).<br /> (Edge-Triggered)
                    </p>
                </div>
            </div>

        </div>
    );
}
