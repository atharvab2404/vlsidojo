"use client";

import React, { useState } from 'react';
import { ArrowRight, Clock, AlertCircle } from 'lucide-react';

const TimingPathVisualizer = () => {
    const [activePath, setActivePath] = useState<string | null>(null);

    const paths = {
        reg2reg: {
            title: "Register to Register (Reg2Reg)",
            description: "The most common path. Starts at the clock pin of the Launch Flop, goes through logic, and ends at the D pin of the Capture Flop.",
            color: "text-indigo-600",
            bg: "bg-indigo-50",
            border: "border-indigo-200"
        },
        in2reg: {
            title: "Input to Register (In2Reg)",
            description: "Starts at an Input Port, goes through combinational logic, and ends at the D pin of a Register. Constrained by 'set_input_delay'.",
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            border: "border-emerald-200"
        },
        reg2out: {
            title: "Register to Output (Reg2Out)",
            description: "Starts at the clock pin of a Register, goes through logic, and ends at an Output Port. Constrained by 'set_output_delay'.",
            color: "text-amber-600",
            bg: "bg-amber-50",
            border: "border-amber-200"
        },
        in2out: {
            title: "Input to Output (In2Out)",
            description: "Pure combinational path from Input Port to Output Port. No flip-flops involved.",
            color: "text-rose-600",
            bg: "bg-rose-50",
            border: "border-rose-200"
        }
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Control Panel */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(paths).map(([key, info]) => (
                    <button
                        key={key}
                        onClick={() => setActivePath(key)}
                        className={`p-4 rounded-xl border-2 transition-all text-sm font-bold flex flex-col items-center gap-2
                            ${activePath === key
                                ? `${info.bg} ${info.border} ${info.color} shadow-md scale-105`
                                : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        <span>{info.title}</span>
                    </button>
                ))}
            </div>

            {/* Schematic */}
            <div className="bg-slate-900 rounded-2xl p-8 relative overflow-hidden min-h-[300px] border border-slate-700 shadow-inner flex items-center justify-center">

                {/* SVG Circuit */}
                <svg viewBox="0 0 800 300" className="w-full h-full max-w-3xl">
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                        </marker>
                        <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill={
                                activePath === 'reg2reg' ? '#6366f1' :
                                    activePath === 'in2reg' ? '#10b981' :
                                        activePath === 'reg2out' ? '#d97706' :
                                            activePath === 'in2out' ? '#e11d48' : '#64748b'
                            } />
                        </marker>
                    </defs>

                    {/* --- Components --- */}

                    {/* Input Pin */}
                    <g transform="translate(50, 100)">
                        <rect x="0" y="0" width="40" height="40" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                        <text x="20" y="25" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">IN</text>
                    </g>

                    {/* FF1 (Launch) */}
                    <g transform="translate(200, 80)">
                        <rect x="0" y="0" width="60" height="80" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                        <text x="30" y="20" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">FF1</text>
                        <text x="10" y="45" fill="#64748b" fontSize="10">D</text>
                        <text x="45" y="45" fill="#64748b" fontSize="10">Q</text>
                        <polygon points="10,70 15,60 20,70" fill="none" stroke="#64748b" /> {/* Clock Triangle */}
                    </g>

                    {/* Cloud Logic (Comb) */}
                    <g transform="translate(350, 90)">
                        <path d="M0,30 Q20,0 50,10 T100,30 T150,30 T180,60 T150,90 T100,90 T50,80 T0,60 Z"
                            fill="#1e293b" stroke="#475569" strokeWidth="2" opacity="0.8" />
                        <text x="90" y="55" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">LOGIC</text>
                    </g>

                    {/* FF2 (Capture) */}
                    <g transform="translate(550, 80)">
                        <rect x="0" y="0" width="60" height="80" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                        <text x="30" y="20" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">FF2</text>
                        <text x="10" y="45" fill="#64748b" fontSize="10">D</text>
                        <text x="45" y="45" fill="#64748b" fontSize="10">Q</text>
                        <polygon points="10,70 15,60 20,70" fill="none" stroke="#64748b" />
                    </g>

                    {/* Output Pin */}
                    <g transform="translate(700, 100)">
                        <rect x="0" y="0" width="40" height="40" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                        <text x="20" y="25" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">OUT</text>
                    </g>

                    {/* --- Paths (Wires) --- */}

                    {/* Wire: In -> FF1 D (Base) */}
                    <path d="M90,120 L200,120" stroke="#334155" strokeWidth="2" />

                    {/* Wire: FF1 Q -> Cloud (Base) */}
                    <path d="M260,120 L350,120" stroke="#334155" strokeWidth="2" />

                    {/* Wire: Cloud -> FF2 D (Base) */}
                    <path d="M520,120 L550,120" stroke="#334155" strokeWidth="2" />

                    {/* Wire: FF2 Q -> Out (Base) */}
                    <path d="M610,120 L700,120" stroke="#334155" strokeWidth="2" />

                    {/* Wire: In -> Out Direct (Base - curved around) */}
                    <path d="M70,140 Q375,250 680,140" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" fill="none" />


                    {/* --- Active Path Highlighting --- */}

                    {/* Reg2Reg: FF1 Q -> Cloud -> FF2 D */}
                    {activePath === 'reg2reg' && (
                        <>
                            <path d="M260,120 L350,120" stroke="#6366f1" strokeWidth="4" markerEnd="url(#arrowhead-active)" className="animate-pulse" />
                            <path d="M350,90 Q400,60 450,90 T520,120" stroke="#6366f1" strokeWidth="2" fill="none" opacity="0.5" />
                            <path d="M520,120 L550,120" stroke="#6366f1" strokeWidth="4" markerEnd="url(#arrowhead-active)" className="animate-pulse" />
                            <circle cx="260" cy="120" r="4" fill="#6366f1" />
                        </>
                    )}

                    {/* In2Reg: In -> Cloud -> FF2 D (Simplified for diagram, usually In -> Cloud -> FF) */}
                    {/* Let's visualize In -> FF1 D for simplicity or In -> Cloud -> FF2 if we want long path */}
                    {/* Actually, In2Reg typically means Primary Input to a Flop. Let's light up In -> FF1 D */}
                    {activePath === 'in2reg' && (
                        <>
                            <path d="M90,120 L200,120" stroke="#10b981" strokeWidth="4" markerEnd="url(#arrowhead-active)" className="animate-pulse" />
                            <circle cx="90" cy="120" r="4" fill="#10b981" />
                        </>
                    )}

                    {/* Reg2Out: FF2 Q -> Out */}
                    {activePath === 'reg2out' && (
                        <>
                            <path d="M610,120 L700,120" stroke="#d97706" strokeWidth="4" markerEnd="url(#arrowhead-active)" className="animate-pulse" />
                            <circle cx="610" cy="120" r="4" fill="#d97706" />
                        </>
                    )}

                    {/* In2Out: In -> Out */}
                    {activePath === 'in2out' && (
                        <>
                            <path d="M70,140 Q375,250 720,140" stroke="#e11d48" strokeWidth="4" fill="none" markerEnd="url(#arrowhead-active)" className="animate-pulse" />
                            <circle cx="70" cy="140" r="4" fill="#e11d48" />
                        </>
                    )}

                </svg>

                {/* Legend Overlay */}
                {!activePath && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <div className="bg-white p-4 rounded-xl shadow-lg flex items-center gap-3">
                            <AlertCircle className="w-6 h-6 text-indigo-600" />
                            <span className="font-bold text-gray-800">Select a Path Type to Visualize</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Description Box */}
            {activePath && (
                <div className={`p-6 rounded-xl border-l-4 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300 ${paths[activePath as keyof typeof paths].bg} ${paths[activePath as keyof typeof paths].border}`}>
                    <h3 className={`text-lg font-bold mb-2 flex items-center gap-2 ${paths[activePath as keyof typeof paths].color}`}>
                        <Clock className="w-5 h-5" />
                        {paths[activePath as keyof typeof paths].title}
                    </h3>
                    <p className="text-gray-800 leading-relaxed">
                        {paths[activePath as keyof typeof paths].description}
                    </p>
                </div>
            )}
        </div>
    );
};

export default TimingPathVisualizer;
