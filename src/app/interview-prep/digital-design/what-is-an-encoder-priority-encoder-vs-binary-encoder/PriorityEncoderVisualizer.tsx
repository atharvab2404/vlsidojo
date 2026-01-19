"use client";

import { useState } from "react";
import { ArrowBigRight, ArrowDown } from "lucide-react";

export default function PriorityEncoderVisualizer() {
    // Inputs D0..D3 (Active High)
    const [inputs, setInputs] = useState<boolean[]>([false, false, false, false]);

    const toggleInput = (idx: number) => {
        const newInputs = [...inputs];
        newInputs[idx] = !newInputs[idx];
        setInputs(newInputs);
    };

    // Priority Logic: Highest index wins
    // D3 > D2 > D1 > D0
    let activeIndex = -1;
    if (inputs[3]) activeIndex = 3;
    else if (inputs[2]) activeIndex = 2;
    else if (inputs[1]) activeIndex = 1;
    else if (inputs[0]) activeIndex = 0;

    const isValid = activeIndex !== -1;
    const binaryOutput = isValid ? activeIndex : 0;

    // Extract bits
    const y1 = (binaryOutput >> 1) & 1;
    const y0 = binaryOutput & 1;

    // Determine which input is "Winning" for highlighting
    const winningInput = activeIndex;

    return (
        <div className="flex flex-col items-center gap-12 select-none py-8">

            <div className="flex flex-col lg:flex-row w-full max-w-6xl justify-center items-center lg:items-start gap-16 lg:gap-20">

                {/* --- INPUTS SIDE --- */}
                <div className="flex flex-col gap-6 pt-0 lg:pt-12">
                    <h3 className="text-center font-bold text-gray-400 text-sm tracking-widest">INPUTS</h3>
                    {[3, 2, 1, 0].map((idx) => {
                        const isActive = inputs[idx];
                        const isWinner = idx === winningInput;
                        const isIgnored = isActive && !isWinner;

                        return (
                            <div key={idx} className="flex items-center gap-4 relative">
                                <span className="font-mono text-gray-400 font-bold w-6">D<sub>{idx}</sub></span>

                                {/* Toggle Switch */}
                                <button
                                    onClick={() => toggleInput(idx)}
                                    className={`w-16 h-8 rounded-full p-1 transition-colors duration-300 relative ${isActive ? 'bg-indigo-600' : 'bg-gray-200'}`}
                                >
                                    <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${isActive ? 'translate-x-8' : 'translate-x-0'}`}></div>
                                </button>

                                <div className="w-16 h-0.5 bg-gray-200 relative">
                                    {/* Active Signal Line */}
                                    <div className={`absolute inset-0 bg-indigo-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`}></div>
                                </div>

                                {/* Status Label */}
                                <div className="w-24 text-xs font-bold">
                                    {isWinner && <span className="text-emerald-500 flex items-center gap-1">PRIORITY <ArrowBigRight className="w-4 h-4 fill-current" /></span>}
                                    {isIgnored && <span className="text-red-300 line-through decoration-2">IGNORED</span>}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* --- THE ENCODER BOX --- */}
                <div className="w-48 h-80 bg-gray-800 rounded-xl shadow-2xl flex flex-col items-center justify-center relative border-4 border-gray-700 z-10 shrink-0">
                    <div className="absolute top-4 text-gray-500 font-bold text-xs tracking-widest">4:2 ENCODER</div>

                    {/* Internal Logic Viz */}
                    <div className="flex flex-col gap-2 items-center text-gray-600">
                        <ArrowDown className="w-8 h-8 animate-bounce opacity-20" />
                        <span className="text-[10px] text-gray-500">Highest Index Logic</span>
                    </div>

                    {/* Output Pins */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[50%] flex flex-col gap-8 items-start">
                        {/* Y1 */}
                        <div className="flex items-center">
                            <div className="w-8 h-1 bg-gray-400"></div>
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl border-2 transition-all ${isValid ? 'bg-emerald-500 text-white border-emerald-600 shadow-lg shadow-emerald-200' : 'bg-gray-200 text-gray-400'}`}>
                                {y1}
                            </div>
                            <span className="ml-2 font-mono text-gray-400 font-bold">Y<sub>1</sub></span>
                        </div>

                        {/* Y0 */}
                        <div className="flex items-center">
                            <div className="w-8 h-1 bg-gray-400"></div>
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl border-2 transition-all ${isValid ? 'bg-emerald-500 text-white border-emerald-600 shadow-lg shadow-emerald-200' : 'bg-gray-200 text-gray-400'}`}>
                                {y0}
                            </div>
                            <span className="ml-2 font-mono text-gray-400 font-bold">Y<sub>0</sub></span>
                        </div>
                    </div>

                    {/* Valid Bit */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold text-gray-500">Valid</span>
                        <div className={`w-3 h-3 rounded-full ${isValid ? 'bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]' : 'bg-gray-600'}`}></div>
                    </div>

                </div>

                {/* --- TRUTH TABLE (Side Panel) --- */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm animate-in fade-in slide-in-from-right duration-500">
                    <h3 className="font-bold text-gray-500 mb-4 text-center text-xs tracking-wider">LIVE TRUTH TABLE</h3>
                    <table className="border-collapse text-center w-full">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-400 text-xs">
                                <th className="p-2 w-8">D<sub>3</sub></th>
                                <th className="p-2 w-8">D<sub>2</sub></th>
                                <th className="p-2 w-8">D<sub>1</sub></th>
                                <th className="p-2 w-8">D<sub>0</sub></th>
                                <th className="p-2 border-l border-gray-100 text-indigo-400">Y<sub>1</sub></th>
                                <th className="p-2 text-indigo-400">Y<sub>0</sub></th>
                                <th className="p-2 text-green-500">V</th>
                            </tr>
                        </thead>
                        <tbody className="font-mono text-gray-600">
                            {/* Row 4: D3 High (Highest Priority) */}
                            <tr className={`transition-all duration-300 ${isValid && winningInput === 3 ? 'bg-emerald-100 text-emerald-900 font-bold scale-105 shadow-sm' : ''}`}>
                                <td className="p-2 text-indigo-600">1</td>
                                <td className="p-2 text-gray-300">X</td>
                                <td className="p-2 text-gray-300">X</td>
                                <td className="p-2 text-gray-300">X</td>
                                <td className="p-2 border-l border-gray-200">1</td>
                                <td className="p-2">1</td>
                                <td className="p-2">1</td>
                            </tr>
                            {/* Row 3: D2 High */}
                            <tr className={`transition-all duration-300 ${isValid && winningInput === 2 ? 'bg-emerald-100 text-emerald-900 font-bold scale-105 shadow-sm' : ''}`}>
                                <td className="p-2 text-gray-300">0</td>
                                <td className="p-2 text-indigo-600">1</td>
                                <td className="p-2 text-gray-300">X</td>
                                <td className="p-2 text-gray-300">X</td>
                                <td className="p-2 border-l border-gray-200">1</td>
                                <td className="p-2">0</td>
                                <td className="p-2">1</td>
                            </tr>
                            {/* Row 2: D1 High */}
                            <tr className={`transition-all duration-300 ${isValid && winningInput === 1 ? 'bg-emerald-100 text-emerald-900 font-bold scale-105 shadow-sm' : ''}`}>
                                <td className="p-2 text-gray-300">0</td>
                                <td className="p-2 text-gray-300">0</td>
                                <td className="p-2 text-indigo-600">1</td>
                                <td className="p-2 text-gray-300">X</td>
                                <td className="p-2 border-l border-gray-200">0</td>
                                <td className="p-2">1</td>
                                <td className="p-2">1</td>
                            </tr>
                            {/* Row 1: D0 High */}
                            <tr className={`transition-all duration-300 ${isValid && winningInput === 0 ? 'bg-emerald-100 text-emerald-900 font-bold scale-105 shadow-sm' : ''}`}>
                                <td className="p-2 text-gray-300">0</td>
                                <td className="p-2 text-gray-300">0</td>
                                <td className="p-2 text-gray-300">0</td>
                                <td className="p-2 text-indigo-600">1</td>
                                <td className="p-2 border-l border-gray-200">0</td>
                                <td className="p-2">0</td>
                                <td className="p-2">1</td>
                            </tr>
                            {/* Row 0: All Low */}
                            <tr className={`transition-all duration-300 ${!isValid ? 'bg-red-50 text-red-900 font-bold scale-105 shadow-sm' : ''}`}>
                                <td className="p-2">0</td>
                                <td className="p-2">0</td>
                                <td className="p-2">0</td>
                                <td className="p-2">0</td>
                                <td className="p-2 border-l border-gray-200 opacity-50">X</td>
                                <td className="p-2 opacity-50">X</td>
                                <td className="p-2">0</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="mt-3 text-[10px] text-gray-400 text-center italic">
                        Note: 'X' means the input value doesn't matter.
                    </div>
                </div>

            </div>

            <div className="bg-gray-50 p-6 rounded-xl text-center max-w-lg border border-gray-200">
                {isValid ? (
                    <p className="text-gray-700">
                        Input <strong className="text-indigo-600">D{activeIndex}</strong> is the highest active priority.
                        <br />
                        Output Code: <strong className="text-emerald-600">{y1}{y0}</strong> (Binary {activeIndex}).
                    </p>
                ) : (
                    <p className="text-gray-400 italic">
                        No inputs active. Valid bit is 0. Outputs are indifferent.
                    </p>
                )}
            </div>

        </div>
    );
}
