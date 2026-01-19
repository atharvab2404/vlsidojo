"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ChevronDown, RefreshCw } from "lucide-react";

type DivisionStep = {
    dividend: number;
    divisor: number;
    quotient: number;
    remainder: number;
    hexRemainder: string;
};

export default function StepByStepConverter() {
    const [inputVal, setInputVal] = useState<string>("25");
    const [targetBase, setTargetBase] = useState<number>(2);
    const [steps, setSteps] = useState<DivisionStep[]>([]);

    // Calculate steps whenever input or base changes
    useEffect(() => {
        const num = parseInt(inputVal);
        if (isNaN(num) || num < 0) {
            setSteps([]);
            return;
        }

        const newSteps: DivisionStep[] = [];
        let current = num;

        if (current === 0) {
            newSteps.push({ dividend: 0, divisor: targetBase, quotient: 0, remainder: 0, hexRemainder: "0" });
        } else {
            while (current > 0) {
                const quotient = Math.floor(current / targetBase);
                const remainder = current % targetBase;
                newSteps.push({
                    dividend: current,
                    divisor: targetBase,
                    quotient: quotient,
                    remainder: remainder,
                    hexRemainder: remainder.toString(16).toUpperCase()
                });
                current = quotient;
            }
        }
        setSteps(newSteps);
    }, [inputVal, targetBase]);

    const finalResult = steps.map(s => s.hexRemainder).reverse().join("");

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <RefreshCw className="w-6 h-6 text-blue-500" />
                Interactive: Repeated Division Visualizer
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Decimal Number (Start)</label>
                    <input
                        type="number"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        className="w-full text-lg p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono"
                        placeholder="e.g. 25"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Base</label>
                    <div className="relative">
                        <select
                            value={targetBase}
                            onChange={(e) => setTargetBase(Number(e.target.value))}
                            className="w-full text-lg p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white font-mono"
                        >
                            <option value={2}>Base 2 (Binary)</option>
                            <option value={8}>Base 8 (Octal)</option>
                            <option value={16}>Base 16 (Hex)</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Steps Container */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="grid grid-cols-[1fr_auto_1fr] gap-4 mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wider text-center border-b border-gray-200 pb-2">
                    <div>Division</div>
                    <div></div>
                    <div>Remainder</div>
                </div>

                <div className="space-y-3 font-mono text-lg text-gray-800">
                    {steps.map((step, i) => (
                        <div key={i} className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center group hover:bg-white hover:shadow-sm rounded-lg p-2 transition-all">
                            <div className="text-center">
                                <span className="text-blue-600 font-bold">{step.dividend}</span>
                                <span className="mx-2 text-gray-400">÷</span>
                                <span className="text-purple-600">{step.divisor}</span>
                                <span className="mx-2 text-gray-400">=</span>
                                <span>{step.quotient}</span>
                            </div>
                            <div className="flex justify-center text-gray-300">
                                <ArrowRight className="w-5 h-5" />
                            </div>
                            <div className="text-center">
                                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-md font-bold shadow-sm">
                                    {targetBase === 16 && step.remainder > 9 ? `${step.remainder} (${step.hexRemainder})` : step.hexRemainder}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Result Arrow */}
                <div className="mt-6 flex flex-col items-center">
                    <div className="h-8 w-0.5 bg-gray-300 mb-2"></div>
                    <p className="text-sm text-gray-500 mb-2">Read remainders from bottom to top</p>
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-2xl font-bold py-3 px-8 rounded-xl shadow-lg flex items-center gap-3">
                        <span>{finalResult}</span>
                        <sub className="text-sm opacity-80 bottom-0">{targetBase}</sub>
                    </div>
                </div>
            </div>
        </div>
    );
}
