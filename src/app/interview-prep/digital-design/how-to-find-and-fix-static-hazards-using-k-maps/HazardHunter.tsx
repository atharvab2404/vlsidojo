"use client";

import React, { useState } from "react";
import { ShieldCheck, AlertTriangle, CheckCircle, Zap } from "lucide-react";

/**
 * HazardHunter
 * 
 * Visualizes K-Map Grouping for Hazard detection.
 * Logic: F = A'C + AB.
 * Hazard occurs when switching B=1, C=1, A: 0->1.
 * Fix: Add Consensus Term BC.
 */
const HazardHunter = () => {
    const [fixEnabled, setFixEnabled] = useState(false);

    // K-Map Cells (3 Variables: A, B, C)
    // Layout:
    //      BC
    // A  00 01 11 10
    // 0  [0] [C] [C] [0]  (A'C) -> Cells 1, 3 (Indices: 001, 011)
    // 1  [0] [0] [AB] [AB] (AB)  -> Cells 6, 7 (Indices: 111, 110)

    // Let's use a standard 2x4 Grid visual
    // Row 0: A=0. Row 1: A=1.
    // Cols: BC = 00, 01, 11, 10

    // Minterms for F = A'C + AB
    // A'C (A=0, C=1) -> 001 (1), 011 (3)
    // AB (A=1, B=1) -> 111 (7), 110 (6)

    // Consensus Term: BC (B=1, C=1) -> 011 (3), 111 (7)
    // This bridges the gap between (3) and (7).

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans select-none">

            {/* Context Header */}
            <div className="text-center mb-8">
                <h3 className="text-lg font-bold text-slate-700 flex items-center justify-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-indigo-600" /> Hazard Hunter
                </h3>
                <p className="text-sm text-slate-500 mt-2">
                    Visualizing the transition between adjacent groups.
                    <br />
                    Transition: <strong>A'C (Group 1) &rarr; AB (Group 2)</strong>
                </p>
            </div>

            {/* Controls */}
            <div className="flex justify-center mb-10">
                <button
                    onClick={() => setFixEnabled(!fixEnabled)}
                    className={`px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 transition-all ${fixEnabled ? 'bg-emerald-600 text-white' : 'bg-white text-slate-500 border border-slate-300 hover:bg-slate-50'}`}
                >
                    {fixEnabled ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5 text-rose-500" />}
                    {fixEnabled ? "Consensus Term Added (Safe)" : "Enable Fix (Add Term BC)"}
                </button>
            </div>

            {/* K-Map Visualization */}
            <div className="flex justify-center mb-10 overflow-x-auto">
                <div className="relative p-8 bg-white rounded-xl border border-slate-200 shadow-sm">

                    {/* Labels */}
                    <div className="absolute top-2 left-10 font-mono text-xs text-slate-500">BC</div>
                    <div className="absolute left-2 top-10 font-mono text-xs text-slate-500 flex flex-col gap-8">
                        <div>A=0</div>
                        <div>A=1</div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-4 gap-2">
                        {/* Headers */}
                        <div className="text-center text-xs font-mono text-slate-400">00</div>
                        <div className="text-center text-xs font-mono text-slate-400">01</div>
                        <div className="text-center text-xs font-mono text-slate-400">11</div>
                        <div className="text-center text-xs font-mono text-slate-400">10</div>

                        {/* Row A=0 */}
                        <div className="w-16 h-16 bg-slate-50 rounded border flex items-center justify-center text-slate-300">0</div>

                        {/* Cell 001 (1) - Part of Blue Group */}
                        <div className="w-16 h-16 bg-blue-50 rounded border border-blue-200 flex items-center justify-center relative group-blue">
                            <div className="font-bold text-blue-900">1</div>
                            {/* Blue Loop Visual */}
                            <div className="absolute top-2 bottom-2 left-2 right-[-36px] border-4 border-blue-500 rounded-full opacity-30 pointer-events-none z-10"></div>
                        </div>

                        {/* Cell 011 (3) - Part of Blue AND Green Group */}
                        <div className="w-16 h-16 bg-blue-50 rounded border border-blue-200 flex items-center justify-center relative">
                            <div className="font-bold text-slate-900">1</div>
                            {/* Green Loop Visual (Vertical) */}
                            {fixEnabled && (
                                <div className="absolute top-2 bottom-[-72px] left-2 right-2 border-4 border-emerald-500 rounded-full opacity-40 pointer-events-none z-20 animate-in fade-in zoom-in duration-300"></div>
                            )}
                        </div>

                        <div className="w-16 h-16 bg-slate-50 rounded border flex items-center justify-center text-slate-300">0</div>

                        {/* Row A=1 */}
                        <div className="w-16 h-16 bg-slate-50 rounded border flex items-center justify-center text-slate-300">0</div>
                        <div className="w-16 h-16 bg-slate-50 rounded border flex items-center justify-center text-slate-300">0</div>

                        {/* Cell 111 (7) - Part of Purple AND Green Group */}
                        <div className="w-16 h-16 bg-purple-50 rounded border border-purple-200 flex items-center justify-center relative">
                            <div className="font-bold text-slate-900">1</div>
                            {/* Purple Loop Visual */}
                            <div className="absolute top-2 bottom-2 left-[-36px] right-2 border-4 border-purple-500 rounded-full opacity-30 pointer-events-none z-10"></div>
                        </div>

                        {/* Cell 110 (6) - Part of Purple Group */}
                        <div className="w-16 h-16 bg-purple-50 rounded border border-purple-200 flex items-center justify-center relative">
                            <div className="font-bold text-purple-900">1</div>
                        </div>

                    </div>

                </div>
            </div>

            {/* Analysis */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-blue-200 bg-blue-50">
                    <h4 className="font-bold text-blue-900 mb-1">Group 1 (A'C)</h4>
                    <p className="text-xs text-blue-700">Active when A=0, C=1.</p>
                </div>
                <div className="p-4 rounded-xl border border-purple-200 bg-purple-50">
                    <h4 className="font-bold text-purple-900 mb-1">Group 2 (AB)</h4>
                    <p className="text-xs text-purple-700">Active when A=1, B=1.</p>
                </div>
            </div>

            <div className={`mt-4 p-4 rounded-xl border-2 transition-all ${fixEnabled ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500'}`}>
                <h4 className="font-bold flex items-center gap-2 mb-2">
                    {fixEnabled ? <CheckCircle className="w-5 h-5 text-emerald-600" /> : <AlertTriangle className="w-5 h-5 text-rose-600" />}
                    Transition Status: {fixEnabled ? "PROTECTED" : "VULNERABLE"}
                </h4>
                <p className="text-sm text-slate-700">
                    {fixEnabled
                        ? "The redundant group (Consensus Term BC) holds the output HIGH during the transition A: 0→1."
                        : "When A switches 0→1, we jump from the Blue Group to the Purple Group. For a brief moment, we might fall into the gap (0)!"
                    }
                </p>
                {!fixEnabled && (
                    <div className="mt-2 text-rose-600 text-xs font-bold uppercase tracking-widest flex items-center gap-1 animate-pulse">
                        <Zap className="w-4 h-4" /> Hazard Detected
                    </div>
                )}
            </div>

        </div>
    );
};

export default HazardHunter;
