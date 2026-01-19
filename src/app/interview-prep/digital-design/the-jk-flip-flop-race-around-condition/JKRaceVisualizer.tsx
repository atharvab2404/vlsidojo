"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RefreshCw, AlertTriangle, ShieldCheck } from "lucide-react";

export default function JKRaceVisualizer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [useEdgeTrigger, setUseEdgeTrigger] = useState(false); // Mode switch: Latch vs Edge-FF
    const [clk, setClk] = useState(0);
    const [q, setQ] = useState(0);
    const [isRacing, setIsRacing] = useState(false);

    // History
    const [history, setHistory] = useState<{ clk: number, q: number }[]>([]);

    const stepRef = useRef(0);
    const qRef = useRef(0);
    const clkRef = useRef(0);

    // Simulate "delay" and feedback
    // In a race condition (Level Triggered JK Latch with J=1, K=1):
    // If Clk=1, Q toggles repeatedly based on propagation delay.
    // We simulate this by checking if Clk=1 and toggling Q every 'tick' if we are in Latch mode.

    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            stepRef.current = (stepRef.current + 1) % 60; // Slower clock cycle to show race

            // Generate Clock (Long High Pulse for Latch)
            // High for 30 ticks, Low for 30 ticks
            const newClk = stepRef.current < 30 ? 1 : 0;
            const isRisingEdge = (clkRef.current === 0 && newClk === 1);
            clkRef.current = newClk;

            let nextQ = qRef.current;
            let raceDetected = false;

            if (useEdgeTrigger) {
                // Edge Triggered (Master-Slave) logic:
                // Only toggle on Rising Edge (J=1, K=1 fixed)
                if (isRisingEdge) {
                    nextQ = qRef.current === 0 ? 1 : 0;
                }
            } else {
                // Level Triggered (Latch) logic:
                // If Clk=1, Q = !Q (Toggle) because J=K=1 fed back
                if (newClk === 1) {
                    // Toggle every tick to simulate oscillation
                    nextQ = qRef.current === 0 ? 1 : 0;
                    raceDetected = true;
                }
            }

            qRef.current = nextQ;
            setClk(newClk);
            setQ(nextQ);
            setIsRacing(raceDetected);

            setHistory(prev => {
                const newH = [...prev, {
                    clk: newClk,
                    q: nextQ
                }];
                if (newH.length > 80) newH.shift();
                return newH;
            });

        }, 100); // 100ms tick

        return () => clearInterval(interval);
    }, [isPlaying, useEdgeTrigger]);


    return (
        <div className="flex flex-col gap-8 select-none bg-gray-50 p-6 rounded-xl border border-gray-200">

            {/* Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex gap-4">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors">
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {isPlaying ? "Pause" : "Start"}
                    </button>
                    <button onClick={() => setHistory([])} className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg">
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
                    <span className="text-sm font-bold text-gray-500">Mode:</span>
                    <button
                        onClick={() => setUseEdgeTrigger(!useEdgeTrigger)}
                        className={`px-4 py-1 rounded-md text-sm font-bold transition-all ${!useEdgeTrigger ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-gray-100 text-gray-400'}`}
                    >
                        Level Triggered (Bad)
                    </button>
                    <button
                        onClick={() => setUseEdgeTrigger(!useEdgeTrigger)}
                        className={`px-4 py-1 rounded-md text-sm font-bold transition-all ${useEdgeTrigger ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-400'}`}
                    >
                        Edge Triggered (Good)
                    </button>
                </div>
            </div>

            {/* SVG Waveforms */}
            <div className={`p-4 rounded-lg overflow-hidden relative font-mono text-xs h-40 transition-colors duration-500 ${isRacing && !useEdgeTrigger ? 'bg-red-950' : 'bg-gray-900'}`}>
                <div className="absolute inset-0 flex justify-between pointer-events-none opacity-20">
                    {[...Array(10)].map((_, i) => <div key={i} className="w-px h-full bg-gray-500"></div>)}
                </div>

                <svg viewBox="0 0 500 100" className="w-full h-full overflow-visible">
                    {[
                        { id: "CLK (Pulse)", val: "clk", color: "#facc15", yBase: 0 },
                        { id: "Output Q", val: "q", color: "#fb7185", yBase: 50 },
                    ].map((sig) => {
                        const stepX = 6; // Denser points
                        const highY = sig.yBase + 10;
                        const lowY = sig.yBase + 40;

                        let pathParams = `M 0 ${history[0]?.[sig.val as keyof typeof history[0]] ? highY : lowY} `;
                        history.forEach((h, i) => {
                            const val = h[sig.val as keyof typeof h];
                            const y = val ? highY : lowY;
                            const x = (i) * stepX;
                            const nextX = (i + 1) * stepX;
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

            {/* Status Box */}
            <div className={`p-6 rounded-xl border flex items-center gap-4 transition-all ${isRacing ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200'}`}>
                {isRacing ? <AlertTriangle className="w-10 h-10 text-red-600 animate-pulse" /> : <ShieldCheck className="w-10 h-10 text-emerald-600" />}
                <div>
                    <h4 className={`font-bold mb-1 ${isRacing ? 'text-red-900' : 'text-emerald-900'}`}>
                        {isRacing ? "RACE CONDITION DETECTED!" : "Stable Operation"}
                    </h4>
                    <p className={`text-sm ${isRacing ? 'text-red-800' : 'text-emerald-800'}`}>
                        {isRacing
                            ? "Output Q is oscillating uncontrollably while Clock is High (1). This is because the pulse width > propagation delay."
                            : "Master-Slave configuration isolates the output. Q only toggles ONCE per clock edge."
                        }
                    </p>
                </div>
            </div>

        </div>
    );
}
