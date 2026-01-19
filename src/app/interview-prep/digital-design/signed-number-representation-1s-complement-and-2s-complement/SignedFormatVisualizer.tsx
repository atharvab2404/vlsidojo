"use client";

import { useState } from "react";
import { ArrowRight, AlertCircle } from "lucide-react";

export default function SignedFormatVisualizer() {
    const [inputVal, setInputVal] = useState<string>("-5");
    const BIT_WIDTH = 8;
    const MIN_VAL = -(Math.pow(2, BIT_WIDTH - 1));     // -128
    const MAX_VAL = Math.pow(2, BIT_WIDTH - 1) - 1;    // 127

    const num = parseInt(inputVal);
    const isValid = !isNaN(num) && num >= MIN_VAL && num <= MAX_VAL;

    // Helper to get binary string padded to 8 bits
    const toBinary = (n: number) => {
        return (n >>> 0).toString(2).padStart(BIT_WIDTH, "0").slice(-BIT_WIDTH);
    };

    // 1. Sign-Magnitude
    const getSignMagnitude = (n: number) => {
        if (n === 0) return "00000000"; // ambiguous +0
        const signBit = n < 0 ? "1" : "0";
        const mag = Math.abs(n);
        const magBin = mag.toString(2).padStart(BIT_WIDTH - 1, "0");
        return signBit + magBin;
    };

    // 2. 1's Complement
    const getOnesComplement = (n: number) => {
        if (n >= 0) return toBinary(n);
        const posBin = Math.abs(n).toString(2).padStart(BIT_WIDTH, "0");
        // Invert bits
        return posBin.split("").map(b => b === "0" ? "1" : "0").join("");
    };

    // 3. 2's Complement
    const getTwosComplement = (n: number) => {
        // JS handles negative numbers in 2's comp natively with bitwise ops, 
        // but we need to mask it to 8 bits
        return toBinary(n);
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="bg-amber-100 text-amber-600 p-2 rounded-lg">
                    <ArrowRight className="w-5 h-5" />
                </span>
                Interactive: Signed Format Visualizer (8-bit)
            </h3>

            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Enter a Decimal Number (-128 to 127)</label>
                <div className="relative">
                    <input
                        type="number"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        min={MIN_VAL}
                        max={MAX_VAL}
                        className={`w-full text-3xl font-bold p-4 border-2 rounded-xl focus:outline-none transition-all font-mono text-center
                    ${isValid ? 'border-gray-200 focus:border-blue-500 text-gray-800' : 'border-red-300 bg-red-50 text-red-600 focus:border-red-500'}
                `}
                    />
                </div>
                {!isValid && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1 justify-center">
                        <AlertCircle className="w-4 h-4" />
                        Value must be between {MIN_VAL} and {MAX_VAL} for 8-bit representation.
                    </p>
                )}
            </div>

            {isValid ? (
                <div className="space-y-4">
                    {/* Format 1: Sign-Magnitude */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-left w-full md:w-auto">
                            <span className="block font-bold text-purple-900">Sign-Magnitude</span>
                            <span className="text-xs text-purple-700">MSB is sign, rest is value</span>
                        </div>
                        <div className="font-mono text-2xl tracking-widest text-gray-800 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-inner">
                            <span className="text-red-500 font-bold">{getSignMagnitude(num).charAt(0)}</span>
                            <span className="text-gray-400 mx-1">|</span>
                            <span>{getSignMagnitude(num).slice(1)}</span>
                        </div>
                    </div>

                    {/* Format 2: 1's Complement */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-left w-full md:w-auto">
                            <span className="block font-bold text-blue-900">1's Complement</span>
                            <span className="text-xs text-blue-700">Invert all bits of positive value</span>
                        </div>
                        <div className="font-mono text-2xl tracking-widest text-gray-800 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-inner">
                            {getOnesComplement(num)}
                        </div>
                    </div>

                    {/* Format 3: 2's Complement */}
                    <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-400 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden">
                        <div className="absolute right-0 top-0 bg-amber-400 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-bl-lg">
                            Standard
                        </div>
                        <div className="text-left w-full md:w-auto">
                            <span className="block font-bold text-amber-900">2's Complement</span>
                            <span className="text-xs text-amber-800">Invert bits + 1 (Hardware friendly)</span>
                        </div>
                        <div className="font-mono text-3xl tracking-widest text-amber-900 bg-white px-6 py-3 rounded-lg border border-amber-200 shadow-sm">
                            {getTwosComplement(num)}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-40 flex items-center justify-center text-gray-400 italic bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    Enter a valid number to see representation...
                </div>
            )}
        </div>
    );
}
