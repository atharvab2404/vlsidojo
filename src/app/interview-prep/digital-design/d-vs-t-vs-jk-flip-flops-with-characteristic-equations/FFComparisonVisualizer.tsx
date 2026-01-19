"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RefreshCw, CheckCircle2 } from "lucide-react";

type FFType = 'D' | 'T' | 'JK';

export default function FFComparisonVisualizer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [type, setType] = useState<FFType>('D');

    // Inputs (Generalized)
    // D mode uses 'in1' as D
    // T mode uses 'in1' as T
    // JK mode uses 'in1' as J, 'in2' as K
    const [in1, setIn1] = useState(0);
    const [in2, setIn2] = useState(0);
    const [q, setQ] = useState(0);
    const [clk, setClk] = useState(0);

    // History
    const [history, setHistory] = useState<{ clk: number, in1: number, in2: number, q: number }[]>([]);

    const stepRef = useRef(0);
    const in1Ref = useRef(in1);
    const in2Ref = useRef(in2);
    const qRef = useRef(q);
    const clkRef = useRef(0);

    useEffect(() => { in1Ref.current = in1; }, [in1]);
    useEffect(() => { in2Ref.current = in2; }, [in2]);
    useEffect(() => {
        // Reset history on type switch
        setHistory([]);
        setQ(0);
        qRef.current = 0;
    }, [type]);

    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            stepRef.current = (stepRef.current + 1) % 40;
            const newClk = stepRef.current < 20 ? 0 : 1;

            // Detect Rising Edge
            const isRisingEdge = (clkRef.current === 0 && newClk === 1);
            clkRef.current = newClk;

            if (isRisingEdge) {
                let nextQ = qRef.current;

                if (type === 'D') {
                    // D FF: Q = D
                    nextQ = in1Ref.current;
                } else if (type === 'T') {
                    // T FF: If T=1, Toggle. Else Hold.
                    if (in1Ref.current === 1) nextQ = qRef.current ^ 1;
                } else if (type === 'JK') {
                    // JK FF:
                    // 00: Hold
                    // 01: Reset (J=0, K=1)
                    // 10: Set (J=1, K=0)
                    // 11: Toggle
                    const j = in1Ref.current;
                    const k = in2Ref.current;

                    if (j === 0 && k === 0) { /* Hold */ }
                    else if (j === 0 && k === 1) { nextQ = 0; }
                    else if (j === 1 && k === 0) { nextQ = 1; }
                    else if (j === 1 && k === 1) { nextQ = qRef.current ^ 1; }
                }

                qRef.current = nextQ;
            }

            setClk(newClk);
            setQ(qRef.current);

            setHistory(prev => {
                const newH = [...prev, {
                    clk: newClk,
                    in1: in1Ref.current,
                    in2: in2Ref.current,
                    q: qRef.current
                }];
                if (newH.length > 50) newH.shift();
                return newH;
            });

        }, 150);

        return () => clearInterval(interval);
    }, [isPlaying, type]);

    const getLabel1 = () => type === 'D' ? 'D' : type === 'T' ? 'T' : 'J';
    const getLabel2 = () => 'K';

    return (
        <div className="flex flex-col gap-8 select-none bg-gray-50 p-6 rounded-xl border border-gray-200">

            {/* Type Selector */}
            <div className="flex justify-center gap-4 bg-white p-2 rounded-lg border border-gray-200 shadow-sm w-fit mx-auto mb-4">
                {(['D', 'T', 'JK'] as FFType[]).map(t => (
                    <button
                        key={t}
                        onClick={() => setType(t)}
                        className={`px-6 py-2 rounded-md font-bold transition-all ${type === t ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        {t}-Type
                    </button>
                ))}
            </div>

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

                <div className="flex items-center gap-6 bg-white px-6 py-3 rounded-lg border border-gray-200 shadow-sm">
                    {/* Input 1 (D, T, or J) */}
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-[10px] font-bold text-gray-400">INPUT {getLabel1()}</span>
                        <button onClick={() => setIn1(in1 ? 0 : 1)} className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${in1 ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${in1 ? 'left-7' : 'left-1'}`}></div>
                        </button>
                    </div>

                    {/* Input 2 (Only for JK) */}
                    {type === 'JK' && (
                        <div className="flex flex-col items-center gap-1 border-l pl-6 border-gray-200">
                            <span className="text-[10px] font-bold text-gray-400">INPUT K</span>
                            <button onClick={() => setIn2(in2 ? 0 : 1)} className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${in2 ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${in2 ? 'left-7' : 'left-1'}`}></div>
                            </button>
                        </div>
                    )}
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
                        { id: `${getLabel1()}`, val: "in1", color: "#22d3ee", yBase: 50 },
                        // Only show K if JK type
                        ...(type === 'JK' ? [{ id: "K", val: "in2", color: "#a78bfa", yBase: 100 }] : []),
                        { id: "Q", val: "q", color: "#34d399", yBase: type === 'JK' ? 150 : 100 },
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

            {/* Explainer Box */}
            <div className={`p-6 rounded-xl border flex items-center gap-4 bg-white border-gray-200 shadow-sm transition-all`}>
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                        {type === 'D' && "D (Data) Flip-Flop"}
                        {type === 'T' && "T (Toggle) Flip-Flop"}
                        {type === 'JK' && "JK Flip-Flop"}
                    </h4>
                    <p className="text-sm text-gray-600">
                        {type === 'D' && "Q follows D on the rising clock edge. Used for storage."}
                        {type === 'T' && "Q toggles if T=1. Holds if T=0. Used for Counters."}
                        {type === 'JK' && "Universal FF. J=1 K=0 Sets. J=0 K=1 Resets. J=1 K=1 Toggles."}
                    </p>
                </div>
            </div>

        </div>
    );
}
