"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RefreshCw } from "lucide-react";

export default function DLatchVisualizer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [d, setD] = useState(0);
    const [en, setEn] = useState(0); // Enable (Clock)

    // Internal state
    const [q, setQ] = useState(0);

    // History
    const [history, setHistory] = useState<{ en: number, d: number, q: number }[]>([]);

    const tickRef = useRef<NodeJS.Timeout | null>(null);
    const stepRef = useRef(0);

    // Refs for simulation loop
    const dRef = useRef(d);
    const qRef = useRef(q);
    const enRef = useRef(0);

    useEffect(() => { dRef.current = d; }, [d]);

    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            stepRef.current = (stepRef.current + 1) % 40;

            // Generate Clock/Enable signal (Period = 20 ticks)
            const newEn = stepRef.current < 20 ? 0 : 1;
            enRef.current = newEn;

            // D Latch Logic: If En=1, Q = D. Else Q = Q_prev.
            if (newEn === 1) {
                qRef.current = dRef.current;
            }
            // else hold

            setEn(newEn); // For reactor re-render (optional if we only trace history)
            setQ(qRef.current);

            setHistory(prev => {
                const newH = [...prev, {
                    en: newEn,
                    d: dRef.current,
                    q: qRef.current
                }];
                if (newH.length > 50) newH.shift();
                return newH;
            });

        }, 150); // Slow speed as requested

        return () => clearInterval(interval);
    }, [isPlaying]);


    return (
        <div className="flex flex-col gap-8 select-none bg-gray-50 p-6 rounded-xl border border-gray-200">
            {/* Controls */}
            <div className="flex items-center justify-between">
                <div className="flex gap-4">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors">
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {isPlaying ? "Pause" : "Start"}
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
                </div>
            </div>

            {/* SVG Waveforms */}
            <div className="bg-gray-900 p-4 rounded-lg overflow-hidden relative font-mono text-xs h-48">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex justify-between pointer-events-none opacity-20">
                    {[...Array(10)].map((_, i) => <div key={i} className="w-px h-full bg-gray-500"></div>)}
                </div>

                <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible">
                    {[
                        { id: "Enable (C)", val: "en", color: "#facc15", yBase: 0 },
                        { id: "Data (D)", val: "d", color: "#22d3ee", yBase: 50 },
                        { id: "Output (Q)", val: "q", color: "#fb7185", yBase: 100 },
                    ].map((sig) => {
                        const stepX = 10;
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

            <div className={`p-4 rounded-lg border flex items-center justify-between transition-colors duration-300 ${en ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-100 border-gray-200'}`}>
                <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">State</span>
                    <span className={`font-bold text-lg ${en ? 'text-indigo-600' : 'text-gray-500'}`}>
                        {en ? "TRANSPARENT (Open)" : "LATCHED (Hold)"}
                    </span>
                </div>
                <div className="text-right">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Q Output</span>
                    <span className="font-mono font-bold text-2xl text-gray-800">{q}</span>
                </div>
            </div>

        </div>
    );
}
