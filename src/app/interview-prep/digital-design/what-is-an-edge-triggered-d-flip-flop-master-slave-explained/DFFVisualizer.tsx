"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RefreshCw } from "lucide-react";

export default function DFFVisualizer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [d, setD] = useState(0);
    const [clk, setClk] = useState(0);

    // Internal state
    const [qMaster, setQMaster] = useState(0);
    const [qSlave, setQSlave] = useState(0); // This is Q_Final

    // History
    const [history, setHistory] = useState<{ clk: number, d: number, qm: number, qs: number }[]>([]);

    const stepRef = useRef(0);
    const dRef = useRef(d);
    // In Master-Slave D-FF (Negative Edge Triggered internal structure usually, but let's model standard Positive Edge):
    // Standard Positive Edge Triggered MS-DFF:
    // Master Latch: Transparent when Clk = 0 (Wait, standard design usually is Master follows when Clk=0, then Slave captures when Clk=1? No.)
    // Let's use the most common "Positive Edge" Topo:
    // Master Latch is ENABLED when Clk = 0 (Inverted Clk). Slave Latch is ENABLED when Clk = 1.
    // 1. Clk=0: Master tracks D. Slave holds (Master is open, Slave looks at Master but is locked? No, Slave is locked).
    // 2. Clk becomes 1 (Rising Edge): Master Locks (holds D's value at that instant). Slave opens and reads Master.

    const qMasterRef = useRef(0);
    const qSlaveRef = useRef(0);

    useEffect(() => { dRef.current = d; }, [d]);

    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            stepRef.current = (stepRef.current + 1) % 40;
            const newClk = stepRef.current < 20 ? 0 : 1;

            // Logic for Positive Edge Triggered MS-DFF
            // Master Latch (Enabled when Clk = 0)
            if (newClk === 0) {
                qMasterRef.current = dRef.current;
            }
            // Else Master Holds

            // Slave Latch (Enabled when Clk = 1)
            // It takes input from Master
            if (newClk === 1) {
                qSlaveRef.current = qMasterRef.current;
            }
            // Else Slave Holds

            setClk(newClk);
            setQMaster(qMasterRef.current);
            setQSlave(qSlaveRef.current);

            setHistory(prev => {
                const newH = [...prev, {
                    clk: newClk,
                    d: dRef.current,
                    qm: qMasterRef.current,
                    qs: qSlaveRef.current
                }];
                if (newH.length > 50) newH.shift();
                return newH;
            });

        }, 150);

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
            <div className="bg-gray-900 p-4 rounded-lg overflow-hidden relative font-mono text-xs h-64">
                <div className="absolute inset-0 flex justify-between pointer-events-none opacity-20">
                    {[...Array(10)].map((_, i) => <div key={i} className="w-px h-full bg-gray-500"></div>)}
                </div>

                <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                    {[
                        { id: "CLK", val: "clk", color: "#facc15", yBase: 0 },
                        { id: "D Input", val: "d", color: "#22d3ee", yBase: 50 },
                        { id: "Master Q", val: "qm", color: "#a78bfa", yBase: 100 },
                        { id: "Slave Q (Final)", val: "qs", color: "#34d399", yBase: 150 },
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

            <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg border transition-all ${!clk ? 'bg-purple-50 border-purple-200 ring-2 ring-purple-300' : 'bg-gray-50 border-gray-200 opacity-50'}`}>
                    <h4 className="font-bold text-purple-900 mb-1">Master Stage</h4>
                    <span className="text-xs text-purple-700">ACTIVE (Clk=0). Tracking D...</span>
                </div>
                <div className={`p-4 rounded-lg border transition-all ${clk ? 'bg-emerald-50 border-emerald-200 ring-2 ring-emerald-300' : 'bg-gray-50 border-gray-200 opacity-50'}`}>
                    <h4 className="font-bold text-emerald-900 mb-1">Slave Stage</h4>
                    <span className="text-xs text-emerald-700">ACTIVE (Clk=1). Copying Master...</span>
                </div>
            </div>

        </div>
    );
}
