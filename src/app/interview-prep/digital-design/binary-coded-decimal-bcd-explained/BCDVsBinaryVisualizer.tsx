"use client";

import { useState } from "react";
import { ArrowLeftRight, Calculator, Cpu } from "lucide-react";

export default function BCDVsBinaryVisualizer() {
    const [inputVal, setInputVal] = useState<string>("45");
    const num = parseInt(inputVal);
    const isValid = !isNaN(num) && num >= 0 && num <= 9999;

    // Helper: Digits of the decimal number
    const digits = inputVal.split("").map(Number);

    // 1. Calculate Pure Binary
    const pureBinary = isValid ? num.toString(2) : "";

    // 2. Calculate BCD (Each digit -> 4 bits)
    const bcdNibbles = isValid
        ? digits.map((d) => d.toString(2).padStart(4, "0"))
        : [];

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ArrowLeftRight className="w-6 h-6 text-blue-600" />
                Interactive: BCD vs. Pure Binary Comparator
            </h3>

            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter a Decimal Number (0-9999)
                </label>
                <input
                    type="number"
                    value={inputVal}
                    onChange={(e) => {
                        if (e.target.value.length <= 4) setInputVal(e.target.value);
                    }}
                    className="w-full text-4xl font-bold p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all font-mono text-center text-gray-800"
                    placeholder="45"
                />
            </div>

            {isValid && inputVal !== "" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* BCD Side */}
                    <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                        <div className="flex items-center gap-2 mb-4">
                            <Calculator className="w-5 h-5 text-blue-700" />
                            <h4 className="font-bold text-blue-900">BCD Representation</h4>
                        </div>

                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                            {bcdNibbles.map((nibble, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <span className="font-mono text-lg font-bold bg-white text-blue-800 border border-blue-200 px-2 py-1 rounded shadow-sm">
                                        {nibble}
                                    </span>
                                    <span className="text-xs text-blue-400 mt-1 font-bold">{digits[i]}</span>
                                </div>
                            ))}
                        </div>

                        <div className="text-sm text-blue-800 bg-blue-100/50 p-3 rounded-lg">
                            <p><strong>Bits Used:</strong> {bcdNibbles.length * 4}</p>
                            <p className="text-xs mt-1 opacity-80">
                                (4 bits per decimal digit regardless of value)
                            </p>
                        </div>
                    </div>

                    {/* Pure Binary Side */}
                    <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                        <div className="flex items-center gap-2 mb-4">
                            <Cpu className="w-5 h-5 text-amber-700" />
                            <h4 className="font-bold text-amber-900">Pure Binary</h4>
                        </div>

                        <div className="flex justify-center mb-6">
                            <span className="font-mono text-xl font-bold bg-white text-amber-800 border border-amber-200 px-4 py-2 rounded shadow-sm break-all">
                                {pureBinary}
                            </span>
                        </div>

                        <div className="text-sm text-amber-800 bg-amber-100/50 p-3 rounded-lg">
                            <p><strong>Bits Used:</strong> {pureBinary.length}</p>
                            <p className="text-xs mt-1 opacity-80">
                                (Efficiently packed powers of 2)
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-40 flex items-center justify-center text-gray-400 italic bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    Enter a number to compare...
                </div>
            )}

            {/* Efficiency Analysis */}
            {isValid && inputVal !== "" && (
                <div className="mt-6 text-center text-sm text-gray-500 italic">
                    Binary uses <strong>{bcdNibbles.length * 4 - pureBinary.length} fewer bits</strong> than BCD for this number.
                </div>
            )}
        </div>
    );
}
