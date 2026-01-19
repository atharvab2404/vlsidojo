"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Activity, Pause } from "lucide-react";

/**
 * Enhanced Counter Visualizer
 * Shows a "Logic Analyzer" style waveform view.
 * Simulates real propagation delays.
 */
const CounterVisualizer = () => {
    const [isRunning, setIsRunning] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();

    // Simulation State
    const timeRef = useRef(0);
    // Delays in "pixels" (or time units)
    const T_CLOCK = 60; // Clock period
    const T_PD = 15;    // Propagation Delay of 1 Flip Flop

    // Waveform Histories (Array of 0/1 states)
    // We store the LAST state transition time to draw signals
    const historyRef = useRef<{
        clk: number[];
        // Sync Counter Q0-Q3
        sq0: number[]; sq1: number[]; sq2: number[]; sq3: number[];
        // Ripple Counter Q0-Q3
        rq0: number[]; rq1: number[]; rq2: number[]; rq3: number[];
    }>({
        clk: [],
        sq0: [], sq1: [], sq2: [], sq3: [],
        rq0: [], rq1: [], rq2: [], rq3: [],
    });

    const stateRef = useRef({
        clk: 0,
        sCount: 0,
        rCount: 0,
        // For Ripple, we need individual bit states because they update at different times
        rBits: [0, 0, 0, 0],
        // Pending events queue: { executeAt: number, action: () => void }
        events: [] as { time: number, action: () => void }[]
    });

    // Reset Simulation
    const reset = () => {
        setIsRunning(false);
        timeRef.current = 0;
        historyRef.current = {
            clk: [],
            sq0: [], sq1: [], sq2: [], sq3: [],
            rq0: [], rq1: [], rq2: [], rq3: [],
        };
        stateRef.current = {
            clk: 0,
            sCount: 0,
            rCount: 0,
            rBits: [0, 0, 0, 0],
            events: []
        };
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    };

    // The Run Loop
    const update = () => {
        if (!isRunning) return;

        timeRef.current += 1;
        const t = timeRef.current;
        const s = stateRef.current;

        // 1. Clock Generation (Toggle every T_CLOCK/2)
        if (t % (T_CLOCK / 2) === 0) {
            s.clk = s.clk === 0 ? 1 : 0;

            // On Rising Edge (0->1) (or Falling depending on FF type, let's assume Negative Edge for Ripple usually, but here use Positive for simplicity or match diagram)
            // Let's use Falling Edge (1->0) for Ripple typically, but Positive Edge (0->1) for Sync.
            // Let's stick to Positive Edge Triggered for both to match standard "Up Counter" models usually taught first.
            if (s.clk === 1) { // Rising Edge

                // --- Synchronous Update ---
                // All bits update at T + T_PD (Parallel)
                const nextS = (s.sCount + 1) % 16;
                // Schedule update
                s.events.push({
                    time: t + T_PD,
                    action: () => { s.sCount = nextS; }
                });


                // --- Ripple Update ---
                // Only Q0 Updates at T + T_PD driven by Clock
                const nextQ0 = s.rBits[0] === 0 ? 1 : 0;
                s.events.push({
                    time: t + T_PD,
                    action: () => {
                        const oldQ0 = s.rBits[0];
                        s.rBits[0] = nextQ0;
                        // If Q0 goes 1->0 (Falling Edge), it clocks Q1
                        // Wait, usually Ripple Up Counter with T-FF toggles on Negative Edge.
                        // Let's implement Negative Edge Logic for the Ripple chain.
                        // Clock drives Q0.
                        if (oldQ0 === 1 && nextQ0 === 0) {
                            rippleNext(1, t + T_PD);
                        }
                    }
                });
            }
        }

        // 2. Process Events
        // Filter out processed events
        const pending = [];
        for (const ev of s.events) {
            if (t >= ev.time) {
                ev.action();
            } else {
                pending.push(ev);
            }
        }
        s.events = pending;

        // 3. Record History (Snapshot State)
        const h = historyRef.current;
        h.clk.push(s.clk);
        // Sync bits
        h.sq0.push(s.sCount & 1);
        h.sq1.push((s.sCount >> 1) & 1);
        h.sq2.push((s.sCount >> 2) & 1);
        h.sq3.push((s.sCount >> 3) & 1);
        // Ripple bits
        h.rq0.push(s.rBits[0]);
        h.rq1.push(s.rBits[1]);
        h.rq2.push(s.rBits[2]);
        h.rq3.push(s.rBits[3]);

        // Limit history length
        const MAX_HIST = 600;
        if (h.clk.length > MAX_HIST) {
            Object.values(h).forEach(arr => arr.shift());
        }

        draw();
        animationRef.current = requestAnimationFrame(update);
    };

    const rippleNext = (bitIdx: number, currentTime: number) => {
        const s = stateRef.current;
        if (bitIdx > 3) return;

        // Schedule toggle for this bit at currentTime + T_PD
        s.events.push({
            time: currentTime + T_PD,
            action: () => {
                const oldBit = s.rBits[bitIdx];
                const newBit = oldBit === 0 ? 1 : 0;
                s.rBits[bitIdx] = newBit;

                // Propagate if Falling Edge (1->0)
                if (oldBit === 1 && newBit === 0) {
                    rippleNext(bitIdx + 1, currentTime + T_PD);
                }
            }
        });
    };

    // Drawing Logic
    const draw = () => {
        const cvs = canvasRef.current;
        if (!cvs) return;
        const ctx = cvs.getContext("2d");
        if (!ctx) return;

        const w = cvs.width;
        const h = cvs.height;
        ctx.clearRect(0, 0, w, h);

        // Config
        const hist = historyRef.current;
        const len = hist.clk.length;
        const stepX = 1;
        const rowH = 30;
        const gap = 10;
        const chartW = len * stepX;
        const startX = Math.max(0, w - chartW - 20); // Scroll right

        // Helper to draw a single digital signal
        const drawSignal = (data: number[], yBase: number, color: string, label: string) => {
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.fillStyle = color;

            // Label
            ctx.fillText(label, 10, yBase - 5);

            for (let i = 0; i < data.length; i++) {
                const val = data[i]; // 0 or 1
                const x = startX + i * stepX;
                const y = yBase - (val * 20); // 1 goes up 20px

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    const prevVal = data[i - 1];
                    const prevX = startX + (i - 1) * stepX;
                    const prevY = yBase - (prevVal * 20);

                    if (val !== prevVal) {
                        ctx.lineTo(x, prevY); // Hold val
                        ctx.lineTo(x, y);     // Edge
                    } else {
                        ctx.lineTo(x, y); // Continue
                    }
                }
            }
            ctx.stroke();
        };

        // Draw Signals
        ctx.font = "10px monospace";
        drawSignal(hist.clk, 40, "#94a3b8", "CLOCK");

        ctx.fillStyle = "#059669"; ctx.fillText("SYNCHRONOUS COUNTER (Instant Update)", 10, 75);
        drawSignal(hist.sq0, 100, "#10b981", "S_Q0 (LSB)");
        drawSignal(hist.sq1, 140, "#10b981", "S_Q1");
        drawSignal(hist.sq2, 180, "#10b981", "S_Q2");
        drawSignal(hist.sq3, 220, "#10b981", "S_Q3 (MSB)");

        ctx.fillStyle = "#d97706"; ctx.fillText("RIPPLE COUNTER (Delayed Update)", 10, 255);
        drawSignal(hist.rq0, 280, "#f59e0b", "R_Q0 (LSB)");
        drawSignal(hist.rq1, 320, "#f59e0b", "R_Q1 (Delay×1)");
        drawSignal(hist.rq2, 360, "#f59e0b", "R_Q2 (Delay×2)");
        drawSignal(hist.rq3, 400, "#f59e0b", "R_Q3 (Delay×3!)");

        // Glitch Highlight?
        // If R_Q3 changes significantly after S_Q3, draw a red zone.
        // (Visualized implicitly by the skew)
    };

    useEffect(() => {
        if (isRunning) {
            animationRef.current = requestAnimationFrame(update);
        } else {
            cancelAnimationFrame(animationRef.current!);
        }
        return () => cancelAnimationFrame(animationRef.current!);
    }, [isRunning]);

    return (
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 font-sans text-slate-200">
            <div className="flex gap-4 mb-4">
                <button
                    onClick={() => setIsRunning(!isRunning)}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold shadow-lg transition-all ${isRunning
                        ? "bg-amber-600 hover:bg-amber-700 text-white"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                        }`}
                >
                    {isRunning ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Run Logic Analyzer</>}
                </button>
                <button
                    onClick={reset}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <RotateCcw className="w-4 h-4" />
                </button>
            </div>

            <div className="relative border border-slate-800 bg-black rounded-lg overflow-hidden shadow-inner">
                <canvas
                    ref={canvasRef}
                    width={700}
                    height={420}
                    className="w-full h-auto block"
                />
                {/* Grid lines overlay (optional) */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px)', backgroundSize: '20px 100%', opacity: 0.1 }}>
                </div>
            </div>

            <div className="mt-4 text-xs text-slate-400 flex justify-between">
                <div>
                    <span className="inline-block w-3 h-3 bg-emerald-500 rounded-sm mr-2"></span>
                    Sync: Edges align perfectly
                </div>
                <div>
                    <span className="inline-block w-3 h-3 bg-amber-500 rounded-sm mr-2"></span>
                    Ripple: Edges skew right (Cumulative Delay)
                </div>
            </div>
        </div>
    );
};

export default CounterVisualizer;
