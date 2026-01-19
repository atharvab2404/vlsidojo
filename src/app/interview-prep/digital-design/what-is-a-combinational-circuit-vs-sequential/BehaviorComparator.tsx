"use client";

import { useState, useEffect, useRef } from "react";
import { Zap, History, Activity, Play, Pause, Square } from "lucide-react";

export default function BehaviorComparator() {
    // --- COMBINATIONAL SIDE ---
    const [inA, setInA] = useState(0);
    const [inB, setInB] = useState(0);
    const outComb = inA ^ inB;
    const toggleA = () => setInA(prev => prev === 0 ? 1 : 0);
    const toggleB = () => setInB(prev => prev === 0 ? 1 : 0);

    // --- SEQUENTIAL SIDE ---
    const [d, setD] = useState(0);
    const [q, setQ] = useState(0);
    const [clk, setClk] = useState(0);
    const [autoClock, setAutoClock] = useState(false); // Default to Manual? Or let user choose. User asked for option.

    // Refs for stable interval access
    const dRef = useRef(d);
    const qRef = useRef(q);
    const clkRef = useRef(clk);

    // Sync refs
    useEffect(() => { dRef.current = d; }, [d]);
    useEffect(() => { qRef.current = q; }, [q]);
    useEffect(() => { clkRef.current = clk; }, [clk]);

    // --- TIMING DIAGRAM LOGIC ---
    const [history, setHistory] = useState<{ t: number, c: number, d: number, q: number }[]>([]);

    // High-frequency Sampling Loop (Visuals only)
    useEffect(() => {
        const sampler = setInterval(() => {
            setHistory(prev => {
                const lastT = prev.length > 0 ? prev[prev.length - 1].t : 0;
                const newPoint = {
                    t: lastT + 1,
                    c: clkRef.current,
                    d: dRef.current,
                    q: qRef.current
                };
                const newHist = [...prev, newPoint];
                if (newHist.length > 200) return newHist.slice(newHist.length - 200); // Window size
                return newHist;
            });
        }, 20); // 50fps smooth sampling
        return () => clearInterval(sampler);
    }, []);

    // --- CLOCK LOGIC ---
    // The heartbeat. Runs independently of everything else.
    useEffect(() => {
        if (!autoClock) {
            setClk(0);
            return;
        }

        const timer = setInterval(() => {
            setClk(prev => {
                const nextClk = prev === 0 ? 1 : 0;
                // RISING EDGE EVENT
                if (nextClk === 1) {
                    setQ(dRef.current); // Latch D!
                }
                return nextClk;
            });
        }, 1000); // 1 Second High, 1 Second Low (2Hz Edge? No, 0.5Hz cycle = 2s period)
        // Actually 1000ms toggle means full period is 2000ms. Good speed.

        return () => clearInterval(timer);
    }, [autoClock]);

    // Manual Pulse (Only if Auto is OFF)
    const pulseClock = () => {
        if (autoClock) return;
        setClk(1);
        setQ(d); // Instant latch for manual feel
        setTimeout(() => setClk(0), 200);
    };

    // SVG Helper
    const getPath = (key: 'c' | 'd' | 'q', height: number, offset: number) => {
        if (history.length < 2) return "";
        return history.map((pt, i) => {
            const x = i * 3; // 3px per sample
            const y = offset + (pt[key] === 1 ? 0 : height);
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(" ");
    };

    return (
        <div className="flex flex-col gap-8 mt-8 select-none">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* --- COMBINATIONAL --- */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="bg-amber-100 p-2 rounded-lg"><Zap className="w-5 h-5 text-amber-600" /></div>
                        <h3 className="font-bold text-gray-900">Combinational (XOR)</h3>
                    </div>

                    <div className="flex items-center justify-between gap-4 py-8">
                        <div className="flex flex-col gap-2 z-10">
                            <button onClick={toggleA} className={`w-12 h-12 rounded-lg font-bold border-2 transition-all ${inA ? 'bg-amber-500 text-white border-amber-600' : 'bg-white text-gray-400 border-gray-200'}`}>A={inA}</button>
                            <button onClick={toggleB} className={`w-12 h-12 rounded-lg font-bold border-2 transition-all ${inB ? 'bg-amber-500 text-white border-amber-600' : 'bg-white text-gray-400 border-gray-200'}`}>B={inB}</button>
                        </div>

                        {/* Simple Wire Viz */}
                        <div className="flex-1 relative h-24 flex items-center justify-center">
                            <div className="absolute inset-0 bg-gray-50 rounded-lg border border-gray-100 -z-0"></div>
                            <span className="font-bold text-gray-400 z-10 bg-white px-2 py-1 rounded shadow-sm border">XOR</span>
                            {/* Dynamic output line color */}
                            <div className={`absolute right-0 top-1/2 w-8 h-1 ${outComb ? 'bg-amber-500' : 'bg-gray-200'}`}></div>
                        </div>

                        <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl transition-all shadow-md z-10
                    ${outComb ? 'bg-amber-500 text-white shadow-amber-200' : 'bg-gray-800 text-gray-500'}`}>
                            {outComb}
                        </div>
                    </div>
                    <p className="text-center text-xs text-gray-400">Updates Instantly</p>
                </div>

                {/* --- SEQUENTIAL --- */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <div className="bg-indigo-100 p-2 rounded-lg"><History className="w-5 h-5 text-indigo-600" /></div>
                            <h3 className="font-bold text-gray-900">Sequential (D-FF)</h3>
                        </div>
                        {/* THE AUTO SWITCH */}
                        <button
                            onClick={() => setAutoClock(!autoClock)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all
                    ${autoClock ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                            {autoClock ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
                            {autoClock ? "RUNNING" : "AUTO CLOCK"}
                        </button>
                    </div>

                    <div className="flex items-center justify-between gap-4 py-8">
                        <div className="flex flex-col gap-2 z-10 items-center">
                            <span className="text-[10px] font-bold text-gray-400">INPUT</span>
                            <button
                                onClick={() => setD(d === 0 ? 1 : 0)}
                                className={`w-14 h-14 rounded-xl font-bold text-xl border-b-4 active:border-b-0 active:translate-y-1 transition-all ${d ? 'bg-indigo-500 text-white border-indigo-700' : 'bg-white text-gray-400 border-gray-200'}`}
                            >
                                {d}
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center relative h-24 bg-indigo-50/50 rounded-xl border border-indigo-100 mx-2">
                            <div className="text-[10px] font-bold text-indigo-300 mb-2">MEMORY ELEMENT</div>

                            {/* Visual Gate / Latch Indicator */}
                            <div className={`w-full h-1 bg-gray-200 mb-2 relative overflow-hidden rounded-full max-w-[60px]`}>
                                <div className={`absolute inset-0 bg-indigo-500 transition-transform duration-100 ${clk ? 'translate-x-0' : '-translate-x-full'}`}></div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full transition-colors duration-200 ${clk ? 'bg-red-500 shadow-[0_0_8px_red]' : 'bg-gray-300'}`}></div>
                                <span className="text-[10px] font-mono font-bold text-gray-400">CLK</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 z-10 items-center">
                            <span className="text-[10px] font-bold text-gray-400">OUTPUT</span>
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl transition-all shadow-md border-2
                        ${q ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-white text-gray-300 border-gray-200'}`}>
                                {q}
                            </div>
                        </div>
                    </div>

                    {/* Manual Pulse Button (Visible if Auto is Off) */}
                    {!autoClock && (
                        <button onClick={pulseClock} className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-xs font-bold transition-colors">
                            Tap to Pulse Clock Manually
                        </button>
                    )}
                    {autoClock && (
                        <div className="w-full py-2 text-center text-xs text-indigo-400 font-mono animate-pulse">
                            Clock is cycling automatically...
                        </div>
                    )}
                </div>
            </div>

            {/* --- LOGIC ANALYZER (TIMING DIAGRAM) --- */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-2xl overflow-hidden relative">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-400" />
                        <h3 className="text-slate-300 font-bold font-mono text-sm tracking-wider">LOGIC ANALYZER</h3>
                    </div>
                    <div className="flex gap-4 text-[10px] font-mono font-bold">
                        <span className="text-red-400 flex items-center gap-1"><Square className="w-2 h-2 fill-current" /> CLOCK</span>
                        <span className="text-amber-400 flex items-center gap-1"><Square className="w-2 h-2 fill-current" /> D (IN)</span>
                        <span className="text-emerald-400 flex items-center gap-1"><Square className="w-2 h-2 fill-current" /> Q (OUT)</span>
                    </div>
                </div>

                <div className="relative h-48 w-full bg-slate-950/50 rounded-lg border border-slate-800 mx-auto overflow-hidden">

                    {/* GRID */}
                    <div className="absolute inset-0 flex flex-col justify-between py-6 opacity-20 pointer-events-none">
                        <div className="w-full border-t border-slate-500"></div> {/* CLK Line */}
                        <div className="w-full border-t border-slate-500"></div> {/* D Line */}
                        <div className="w-full border-t border-slate-500"></div> {/* Q Line */}
                    </div>

                    {/* Vertical timing lines */}
                    <div className="absolute inset-0 flex justify-between px-4 opacity-10 pointer-events-none">
                        {[...Array(10)].map((_, i) => <div key={i} className="h-full border-r border-slate-400"></div>)}
                    </div>

                    {/* WAVEFORMS */}
                    <svg className="absolute inset-0 w-full h-full overflow-visible">
                        <path d={getPath('c', 30, 20)} fill="none" stroke="#f87171" strokeWidth="2" strokeStep="round" />
                        <path d={getPath('d', 30, 80)} fill="none" stroke="#fbbf24" strokeWidth="2" strokeStep="round" />
                        <path d={getPath('q', 30, 140)} fill="none" stroke="#34d399" strokeWidth="2" strokeStep="round" />
                    </svg>

                    {/* Readout Head */}
                    <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white shadow-[0_0_10px_white]"></div>
                </div>

                <div className="text-slate-500 text-[10px] font-mono mt-4 text-center">
                    1. Turn on AUTO CLOCK above. &nbsp;&nbsp; 2. Toggle Input D. &nbsp;&nbsp; 3. Watch Q change ONLY when Red Line goes High.
                </div>
            </div>

        </div>
    );
}
