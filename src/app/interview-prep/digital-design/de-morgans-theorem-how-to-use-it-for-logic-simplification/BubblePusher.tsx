"use client";

import { useState } from "react";
import { MoveRight, ArrowRightLeft, RefreshCw } from "lucide-react";

type GateType = "NAND" | "NOR";

export default function BubblePusher() {
    const [gateType, setGateType] = useState<GateType>("NAND");
    const [isPushed, setIsPushed] = useState(false);

    // Configuration
    const config = {
        NAND: {
            title: "NAND Gate",
            equationStart: "Y = (A . B)'",
            equationEnd: "Y = A' + B'",
            startDesc: "NAND: AND with inverted Output",
            endDesc: "Negative-OR: OR with inverted Inputs",
            symbolStart: (
                <svg viewBox="0 0 200 100" className="w-full h-full text-indigo-900" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M 40 30 L 80 30" /> <text x="25" y="35" className="text-xs font-bold fill-gray-500 stroke-none">A</text>
                    <path d="M 40 70 L 80 70" /> <text x="25" y="75" className="text-xs font-bold fill-gray-500 stroke-none">B</text>

                    {/* AND Shape */}
                    <path d="M 80 20 L 110 20 C 135 20 135 80 110 80 L 80 80 Z" fill="white" />

                    {/* Output Bubble */}
                    <circle cx="140" cy="50" r="5" fill="white" stroke="currentColor" className="transition-all duration-500" />

                    <path d="M 145 50 L 180 50" /> <text x="185" y="55" className="text-xs font-bold fill-indigo-600 stroke-none">Y</text>
                </svg>
            ),
            symbolEnd: (
                <svg viewBox="0 0 200 100" className="w-full h-full text-indigo-900" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M 40 30 L 65 30" /> <text x="25" y="35" className="text-xs font-bold fill-gray-500 stroke-none">A</text>
                    <path d="M 40 70 L 65 70" /> <text x="25" y="75" className="text-xs font-bold fill-gray-500 stroke-none">B</text>

                    {/* Input Bubbles */}
                    <circle cx="70" cy="30" r="5" fill="white" stroke="currentColor" />
                    <circle cx="70" cy="70" r="5" fill="white" stroke="currentColor" />

                    <path d="M 75 30 L 90 30" />
                    <path d="M 75 70 L 90 70" />

                    {/* OR Shape */}
                    <path d="M 90 20 L 110 20 C 135 20 135 80 110 80 L 90 80 C 105 50 105 50 90 20" fill="white" />

                    <path d="M 135 50 L 180 50" /> <text x="185" y="55" className="text-xs font-bold fill-indigo-600 stroke-none">Y</text>
                </svg>
            )
        },
        NOR: {
            title: "NOR Gate",
            equationStart: "Y = (A + B)'",
            equationEnd: "Y = A' . B'",
            startDesc: "NOR: OR with inverted Output",
            endDesc: "Negative-AND: AND with inverted Inputs",
            symbolStart: (
                <svg viewBox="0 0 200 100" className="w-full h-full text-rose-900" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M 40 30 L 80 30" /> <text x="25" y="35" className="text-xs font-bold fill-gray-500 stroke-none">A</text>
                    <path d="M 40 70 L 80 70" /> <text x="25" y="75" className="text-xs font-bold fill-gray-500 stroke-none">B</text>

                    {/* OR Shape */}
                    <path d="M 80 20 L 110 20 C 135 20 135 80 110 80 L 80 80 C 100 50 100 50 80 20" fill="white" />

                    {/* Output Bubble */}
                    <circle cx="140" cy="50" r="5" fill="white" stroke="currentColor" />

                    <path d="M 145 50 L 180 50" /> <text x="185" y="55" className="text-xs font-bold fill-rose-600 stroke-none">Y</text>
                </svg>
            ),
            symbolEnd: (
                <svg viewBox="0 0 200 100" className="w-full h-full text-rose-900" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M 40 30 L 65 30" /> <text x="25" y="35" className="text-xs font-bold fill-gray-500 stroke-none">A</text>
                    <path d="M 40 70 L 65 70" /> <text x="25" y="75" className="text-xs font-bold fill-gray-500 stroke-none">B</text>

                    {/* Input Bubbles */}
                    <circle cx="70" cy="30" r="5" fill="white" stroke="currentColor" />
                    <circle cx="70" cy="70" r="5" fill="white" stroke="currentColor" />

                    <path d="M 75 30 L 90 30" />
                    <path d="M 75 70 L 90 70" />

                    {/* AND Shape */}
                    <path d="M 90 20 L 120 20 C 140 20 140 80 120 80 L 90 80 Z" fill="white" />

                    <path d="M 140 50 L 180 50" /> <text x="185" y="55" className="text-xs font-bold fill-rose-600 stroke-none">Y</text>
                </svg>
            )
        }
    };

    const current = config[gateType];

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ArrowRightLeft className="w-6 h-6 text-indigo-600" />
                Interactive: The Bubble Pusher
            </h3>

            <div className="flex gap-4 mb-8 bg-gray-50 p-2 rounded-lg w-fit">
                <button
                    onClick={() => { setGateType("NAND"); setIsPushed(false); }}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${gateType === "NAND" ? "bg-white text-indigo-600 shadow-md" : "text-gray-500 hover:text-gray-900"}`}
                >
                    NAND (De Morgan 1)
                </button>
                <button
                    onClick={() => { setGateType("NOR"); setIsPushed(false); }}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${gateType === "NOR" ? "bg-white text-rose-600 shadow-md" : "text-gray-500 hover:text-gray-900"}`}
                >
                    NOR (De Morgan 2)
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Visualization Stage */}
                <div className="relative h-64 bg-white border-2 border-dashed border-gray-200 rounded-xl overflow-hidden flex flex-col items-center justify-center p-4">
                    <div className="w-full max-w-[300px] h-32 transition-all duration-500">
                        {isPushed ? current.symbolEnd : current.symbolStart}
                    </div>

                    <button
                        onClick={() => setIsPushed(!isPushed)}
                        className={`mt-4 flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white shadow-lg transform transition-all hover:scale-105 active:scale-95
                    ${gateType === 'NAND' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-rose-600 hover:bg-rose-700'}
                `}
                    >
                        <RefreshCw className={`w-5 h-5 ${isPushed ? '-rotate-180' : ''} transition-transform duration-500`} />
                        {isPushed ? "Pull Bubble Back" : "Push Bubble"}
                    </button>
                </div>

                {/* Explanation Stage */}
                <div className="space-y-6">
                    <div className={`p-6 rounded-xl border-l-4 transition-colors duration-300 ${isPushed
                        ? (gateType === 'NAND' ? 'bg-indigo-50 border-indigo-500' : 'bg-rose-50 border-rose-500')
                        : 'bg-gray-50 border-gray-300'
                        }`}>
                        <span className="text-xs font-bold uppercase tracking-wider opacity-60">Boolean Equation</span>
                        <div className="text-3xl font-mono font-bold mt-1 text-gray-800 transition-all duration-300">
                            {isPushed ? current.equationEnd : current.equationStart}
                        </div>
                    </div>

                    <div className="text-gray-600">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-2">
                            Observation:
                        </h4>
                        <p className="leading-relaxed">
                            {isPushed
                                ? <span>We <strong>broke the bar</strong> (inverted output removed) and <strong>changed the sign</strong> (AND &rarr; OR). The bubbles moved to the inputs. <br /><span className="text-sm italic mt-1 block text-gray-500">This is now a "{current.endDesc}".</span></span>
                                : <span>This is a standard <strong>{current.title}</strong>. Notice the bubble is at the output. <br /><span className="text-sm italic mt-1 block text-gray-500">{current.startDesc}</span></span>
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
