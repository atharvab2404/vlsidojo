"use client";

import React, { useState } from 'react';
import { Layers, ChevronRight, Cpu, FileJson, Hammer } from 'lucide-react';

type Layer = 'software' | 'isa' | 'microarch' | 'hardware';

const LayerVisualizer = () => {
    const [activeLayer, setActiveLayer] = useState<Layer>('isa');

    const layers = [
        {
            id: 'software',
            title: 'Software / OS',
            icon: <FileJson className="w-5 h-5" />,
            description: "The application code (Python, C++) and Operating System.",
            example: "Chrome, Windows, Linux Kernel",
            color: "bg-blue-500",
            bg: "bg-blue-50",
            border: "border-blue-200",
            text: "text-blue-900"
        },
        {
            id: 'isa',
            title: 'Instruction Set Architecture (ISA)',
            icon: <Layers className="w-5 h-5" />,
            description: "The Contract. The agreed-upon vocabulary that software uses to talk to hardware.",
            example: "x86-64, ARMv8, RISC-V",
            color: "bg-indigo-600",
            bg: "bg-indigo-50",
            border: "border-indigo-200",
            text: "text-indigo-900"
        },
        {
            id: 'microarch',
            title: 'Microarchitecture (Organization)',
            icon: <Cpu className="w-5 h-5" />,
            description: "The Design. How the ISA is actually implemented in logic.",
            example: "Pipeline depth, Cache sizes, Branch Predictor type",
            color: "bg-amber-500",
            bg: "bg-amber-50",
            border: "border-amber-200",
            text: "text-amber-900"
        },
        {
            id: 'hardware',
            title: 'Physical Implementation',
            icon: <Hammer className="w-5 h-5" />,
            description: "The Physics. Actual transistors, voltage levels, and manufacturing process.",
            example: "5nm process, FinFET, Voltage Regulators",
            color: "bg-slate-600",
            bg: "bg-slate-100",
            border: "border-slate-200",
            text: "text-slate-900"
        }
    ];

    const activeData = layers.find(l => l.id === activeLayer) || layers[1];

    return (
        <div className="flex flex-col md:flex-row gap-8 items-start">

            {/* Left: The Stack */}
            <div className="flex-1 flex flex-col gap-2 w-full max-w-sm">
                {layers.map((layer) => (
                    <button
                        key={layer.id}
                        onClick={() => setActiveLayer(layer.id as Layer)}
                        className={`
                            relative p-4 rounded-xl border-2 text-left transition-all duration-200 group
                            ${activeLayer === layer.id
                                ? `${layer.border} ${layer.bg} shadow-lg scale-105 z-10 font-bold`
                                : "bg-white border-transparent hover:border-gray-200 text-gray-400 hover:text-gray-600 shadow-sm"
                            }
                        `}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`
                                w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm transition-colors
                                ${activeLayer === layer.id ? layer.color : "bg-gray-200"}
                            `}>
                                {layer.icon}
                            </div>
                            <span className={activeLayer === layer.id ? "text-gray-900" : ""}>
                                {layer.title}
                            </span>
                        </div>

                        {/* Connecting Line */}
                        {layer.id !== 'hardware' && (
                            <div className="absolute left-[2rem] -bottom-3 w-0.5 h-4 bg-gray-200 -z-10 group-hover:bg-gray-300 transition-colors"></div>
                        )}

                        {/* Indicator Arrow */}
                        {activeLayer === layer.id && (
                            <div className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-sm border border-gray-100 hidden md:block">
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Right: The Explainer */}
            <div className={`flex-1 p-8 rounded-2xl border ${activeData.bg} ${activeData.border} ${activeData.text} shadow-sm min-h-[300px] flex flex-col justify-center`}>
                <div className="mb-4 flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${activeData.color} text-white`}>
                        {activeData.icon}
                    </div>
                    <h3 className="text-2xl font-bold">{activeData.title}</h3>
                </div>

                <p className="text-lg leading-relaxed font-medium opacity-90 mb-8">
                    {activeData.description}
                </p>

                <div>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-60">Real World Examples</span>
                    <div className="mt-2 text-xl font-bold">
                        {activeData.example}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LayerVisualizer;
