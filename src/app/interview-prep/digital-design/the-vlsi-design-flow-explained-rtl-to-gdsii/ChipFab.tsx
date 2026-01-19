"use client";

import React, { useState } from "react";
import {
    FileCode,
    MonitorPlay,
    Cpu,
    Layers,
    Maximize,
    CheckCircle,
    Box,
    ArrowRight
} from "lucide-react";

export default function ChipFab() {
    const [activeStep, setActiveStep] = useState<number | null>(null);

    const steps = [
        {
            id: 0,
            title: "Specification",
            icon: <FileCode className="w-6 h-6" />,
            color: "text-blue-500",
            bg: "bg-blue-100",
            desc: "Defining what the chip does.",
            inputs: ["Market Requirements", "Architecture Spec"],
            outputs: ["Micro-Architecture Doc", "Excel Sheets"]
        },
        {
            id: 1,
            title: "RTL Design",
            icon: <Cpu className="w-6 h-6" />,
            color: "text-indigo-500",
            bg: "bg-indigo-100",
            desc: "Coding the logic in Verilog/VHDL.",
            inputs: ["Micro-Arch Spec"],
            outputs: ["Verilog Source Code (.v)", "IP Blocks"]
        },
        {
            id: 2,
            title: "Verification",
            icon: <MonitorPlay className="w-6 h-6" />,
            color: "text-purple-500",
            bg: "bg-purple-100",
            desc: "Simulating to find bugs.",
            inputs: ["RTL Code", "Testbench"],
            outputs: ["Coverage Reports", "Bug List", "Pass/Fail"]
        },
        {
            id: 3,
            title: "Synthesis",
            icon: <Layers className="w-6 h-6" />,
            color: "text-rose-500",
            bg: "bg-rose-100",
            desc: "Converting Code to Gates (Netlist).",
            inputs: ["RTL Code", "Standard Cell Lib (.lib)", "Constraints (.sdc)"],
            outputs: ["Gate Level Netlist (.v)", "Area Report"]
        },
        {
            id: 4,
            title: "Physical Design",
            icon: <Maximize className="w-6 h-6" />,
            color: "text-orange-500",
            bg: "bg-orange-100",
            desc: "Floorplanning, Placement, Routing.",
            inputs: ["Netlist", "Physical Lib (.lef)", "Tech File (.tf)"],
            outputs: ["Layout Database (.def)", "Spef (.spef)"]
        },
        {
            id: 5,
            title: "Signoff",
            icon: <CheckCircle className="w-6 h-6" />,
            color: "text-emerald-500",
            bg: "bg-emerald-100",
            desc: "Final checks (STA, DRC, LVS).",
            inputs: ["Layout", "SPEF", "Constraints"],
            outputs: ["Timing Reports", "DRC Clean?"]
        },
        {
            id: 6,
            title: "GDSII",
            icon: <Box className="w-6 h-6" />,
            color: "text-slate-800",
            bg: "bg-slate-300",
            desc: "Tapeout! Sending to Foundry.",
            inputs: ["Final Database"],
            outputs: ["GDSII File (Binary)"]
        }
    ];

    return (
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">

            {/* Flow Chart */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
                {steps.map((step, idx) => (
                    <div key={step.id} className="flex items-center">
                        <button
                            onMouseEnter={() => setActiveStep(step.id)}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all w-32 border-2 ${activeStep === step.id
                                    ? "bg-white border-blue-500 shadow-lg scale-105"
                                    : "bg-white border-transparent shadow-sm hover:border-slate-300"
                                }`}
                        >
                            <div className={`p-3 rounded-full ${step.bg} ${step.color}`}>
                                {step.icon}
                            </div>
                            <span className="text-xs font-bold text-gray-700 text-center leading-tight">
                                {step.title}
                            </span>
                        </button>
                        {idx < steps.length - 1 && (
                            <ArrowRight className="w-5 h-5 text-slate-300 mx-1 hidden md:block" />
                        )}
                    </div>
                ))}
            </div>

            {/* Info Panel */}
            <div className="bg-white rounded-xl border border-slate-200 p-8 h-64 shadow-inner transition-all">
                {activeStep !== null ? (
                    <div className="grid md:grid-cols-2 gap-8 h-full items-center">
                        <div>
                            <h3 className={`text-2xl font-bold mb-2 flex items-center gap-2 ${steps[activeStep].color}`}>
                                {steps[activeStep].icon}
                                {steps[activeStep].title}
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed mb-4">
                                {steps[activeStep].desc}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                                <span className="block text-emerald-800 font-bold uppercase tracking-wider text-xs mb-2">Inputs</span>
                                <ul className="list-disc pl-4 text-emerald-900 space-y-1">
                                    {steps[activeStep].inputs.map((i, k) => <li key={k}>{i}</li>)}
                                </ul>
                            </div>
                            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                                <span className="block text-indigo-800 font-bold uppercase tracking-wider text-xs mb-2">Outputs</span>
                                <ul className="list-disc pl-4 text-indigo-900 space-y-1">
                                    {steps[activeStep].outputs.map((i, k) => <li key={k}>{i}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                        <Layers className="w-12 h-12 mb-4 opacity-20" />
                        <p className="text-lg">Hover over a stage to investigate the Chip Factory flow.</p>
                    </div>
                )}
            </div>

        </div>
    );
}
