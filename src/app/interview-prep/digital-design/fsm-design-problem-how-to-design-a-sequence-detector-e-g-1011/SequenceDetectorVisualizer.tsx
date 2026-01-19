"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, FastForward, CheckCircle, AlertCircle } from "lucide-react";

const SequenceDetectorVisualizer = () => {
    // Defines the '1011' Overlapping Detector
    // States: 
    // 0: Init
    // 1: Got 1
    // 2: Got 10
    // 3: Got 101
    // (Output on transition from 3 with input 1 -> Detected)

    const [bitStream, setBitStream] = useState<number[]>([1, 0, 1, 1, 0, 1, 0, 1, 1, 1]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [currentState, setCurrentState] = useState(0);
    const [detectedCount, setDetectedCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // Auto-scroll
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(step, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, currentIndex]);

    const reset = () => {
        setCurrentIndex(-1);
        setCurrentState(0);
        setDetectedCount(0);
        setIsRunning(false);
    };

    const step = () => {
        if (currentIndex >= bitStream.length - 1) {
            setIsRunning(false);
            return;
        }

        const nextIndex = currentIndex + 1;
        const input = bitStream[nextIndex];
        let nextState = 0;
        let found = false;

        // Logic for 1011 Overlapping
        switch (currentState) {
            case 0: // Init
                if (input === 1) nextState = 1; else nextState = 0;
                break;
            case 1: // Have '1'
                if (input === 1) nextState = 1; else nextState = 2; // 1->0
                break;
            case 2: // Have '10'
                if (input === 1) nextState = 3; // 10->1
                else nextState = 0;
                break;
            case 3: // Have '101'
                if (input === 1) {
                    nextState = 1; // 101 -> 1 (Overlap!)
                    found = true;
                } else {
                    nextState = 2; // 101 -> 0 (Could be '10' start of '1011')
                    // Wait, 1010... yes, 10 is '2'.
                }
                break;
        }

        setCurrentIndex(nextIndex);
        setCurrentState(nextState);
        if (found) setDetectedCount(c => c + 1);
    };

    const addBit = (b: number) => {
        setBitStream(prev => [...prev, b]);
    };

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans">
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                <div className="flex gap-2">
                    <button onClick={() => addBit(0)} className="px-3 py-1 bg-white border border-slate-300 rounded hover:bg-slate-100 font-mono">Add 0</button>
                    <button onClick={() => addBit(1)} className="px-3 py-1 bg-white border border-slate-300 rounded hover:bg-slate-100 font-mono">Add 1</button>
                    <button onClick={() => setBitStream([])} className="px-3 py-1 text-red-600 hover:bg-red-50 text-xs">Clear</button>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setIsRunning(!isRunning)} className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-bold transition-all">
                        {isRunning ? "Pause" : <><Play className="w-4 h-4" /> Run Sequence</>}
                    </button>
                    <button onClick={reset} className="p-2 bg-white border border-slate-300 text-slate-500 rounded-lg hover:bg-slate-100">
                        <RotateCcw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Tape Visualization */}
            <div className="mb-8 overflow-x-auto">
                <div className="flex items-center gap-1 p-4 bg-slate-800 rounded-lg shadow-inner min-h-[80px]">
                    {bitStream.map((bit, idx) => {
                        const isCurrent = idx === currentIndex;
                        const isPast = idx < currentIndex;
                        return (
                            <div key={idx} className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded font-bold font-mono transition-all duration-300 ${isCurrent
                                    ? "bg-amber-400 text-amber-900 scale-125 border-2 border-white z-10"
                                    : isPast
                                        ? "bg-slate-600 text-slate-400 scale-90"
                                        : "bg-slate-700 text-slate-200"
                                }`}>
                                {bit}
                            </div>
                        );
                    })}
                    {bitStream.length === 0 && <span className="text-slate-500 text-sm">Add bits to start...</span>}
                </div>
                <div className="text-center mt-2 text-xs text-slate-400">Current Position</div>
            </div>

            {/* State Diagram & Status */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Visual FSM */}
                <div className="relative h-64 border border-slate-200 bg-white rounded-xl flex items-center justify-center p-4">
                    {/* SVG Connections (Static) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#cbd5e1" />
                            </marker>
                        </defs>
                        <path d="M 120 128 L 180 128" stroke="#cbd5e1" strokeWidth="2" markerEnd="url(#arrow)" />
                        <path d="M 230 128 L 290 128" stroke="#cbd5e1" strokeWidth="2" markerEnd="url(#arrow)" />
                        <path d="M 340 128 L 400 128" stroke="#cbd5e1" strokeWidth="2" markerEnd="url(#arrow)" />
                    </svg>

                    <div className="flex justify-between w-full max-w-md relative z-10">
                        {/* Nodes */}
                        {[
                            { id: 0, label: "S0", sub: "Reset" },
                            { id: 1, label: "S1", sub: "..1" },
                            { id: 2, label: "S2", sub: "..10" },
                            { id: 3, label: "S3", sub: "..101" },
                        ].map((node) => (
                            <div key={node.id} className={`flex flex-col items-center transition-all duration-300 ${currentState === node.id ? "scale-110" : "opacity-50"}`}>
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 font-bold shadow-sm ${currentState === node.id
                                        ? "bg-indigo-100 border-indigo-600 text-indigo-900"
                                        : "bg-white border-slate-300 text-slate-400"
                                    }`}>
                                    {node.label}
                                </div>
                                <span className="text-xs mt-2 font-mono text-slate-500">{node.sub}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dashboard */}
                <div className="flex flex-col justify-center gap-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
                        <h4 className="text-slate-500 text-sm uppercase font-bold mb-2">Total Detections</h4>
                        <div className="text-5xl font-black text-indigo-600">{detectedCount}</div>
                    </div>

                    <div className={`p-4 rounded-xl border flex items-center gap-3 transition-colors duration-200 ${currentState === 3 ? "bg-amber-50 border-amber-200 shadow-md" : "bg-white border-slate-200"
                        }`}>
                        {/* We need a "Last Action" text */}
                        <div className="text-sm text-slate-600">
                            <strong>Current State:</strong> S{currentState}
                            <br />
                            {currentState === 0 && "Waiting for '1'"}
                            {currentState === 1 && "Start '1' found. Waiting for '0'."}
                            {currentState === 2 && "Sequence '10' found. Waiting for '1'."}
                            {currentState === 3 && "Sequence '101' found. NEXT '1' DETECTS!"}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-xs text-center text-slate-400">
                Pattern: <strong>1 0 1 1</strong> (Overlapping)
            </div>
        </div >
    );
};

export default SequenceDetectorVisualizer;
