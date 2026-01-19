"use client";

import { useState } from "react";
import { Calculator, ChevronDown } from "lucide-react";

type BaseConfig = {
    base: number;
    name: string;
    digits: string;
    colorFn: (opacity?: string) => string;
    description: string;
};

const BASES: Record<number, BaseConfig> = {
    2: {
        base: 2,
        name: "Binary",
        digits: "0-1",
        colorFn: (opacity = "100") => `rgba(217, 119, 6, ${parseInt(opacity) / 100})`, // Amber-600
        description: "Powers of 2: 1, 2, 4, 8, 16...",
    },
    8: {
        base: 8,
        name: "Octal",
        digits: "0-7",
        colorFn: (opacity = "100") => `rgba(37, 99, 235, ${parseInt(opacity) / 100})`, // Blue-600
        description: "Powers of 8: 1, 8, 64, 512...",
    },
    16: {
        base: 16,
        name: "Hexadecimal",
        digits: "0-9, A-F",
        colorFn: (opacity = "100") => `rgba(147, 51, 234, ${parseInt(opacity) / 100})`, // Purple-600
        description: "Powers of 16: 1, 16, 256, 4096...",
    },
};

export default function RadixVisualizer() {
    // State for Decimal Visualizer
    const [decimalInput, setDecimalInput] = useState<string>("2024");

    // State for Dynamic Base Visualizer
    const [selectedBase, setSelectedBase] = useState<number>(2);
    const [dynamicInput, setDynamicInput] = useState<string>("1101");

    const activeBase = BASES[selectedBase];

    // Helper to get digits (handles Hex letters)
    const getDigits = (numStr: string) => numStr.split("");

    const handleDynamicInputChange = (val: string) => {
        let regex;
        if (selectedBase === 2) regex = /[^0-1]/g;
        else if (selectedBase === 8) regex = /[^0-7]/g;
        else regex = /[^0-9A-Fa-f]/g;

        const cleanVal = val.replace(regex, "");
        if (cleanVal.length <= 8) setDynamicInput(cleanVal.toUpperCase());
    };

    const getDecimalValue = (numStr: string, base: number) => {
        return parseInt(numStr, base);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Left Side: Fixed Decimal Example */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col h-full ring-1 ring-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex justify-between items-center">
                    <span>Decimal (Base 10)</span>
                    <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Standard</span>
                </h3>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Number to decompose:</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={decimalInput}
                            onChange={(e) => {
                                if (e.target.value.length <= 6) setDecimalInput(e.target.value);
                            }}
                            className="w-full text-center text-4xl font-mono font-bold text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl py-4 focus:outline-none focus:border-gray-400 focus:bg-white transition-all shadow-inner"
                        />
                        <span className="absolute right-4 bottom-4 text-gray-400 text-xl font-mono select-none">10</span>
                    </div>
                </div>

                {decimalInput && !isNaN(Number(decimalInput)) ? (
                    <div className="flex-1 flex flex-col justify-center animate-in fade-in zoom-in duration-300">
                        <div className="flex justify-between text-sm text-gray-500 font-mono mb-2 px-1">
                            {getDigits(decimalInput).map((_, i, arr) => (
                                <span key={i} className="flex-1 text-center text-xs">10^{arr.length - 1 - i}</span>
                            ))}
                        </div>

                        <div className="flex justify-between text-lg font-bold text-gray-800 font-mono bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
                            {getDigits(decimalInput).map((digit, i, arr) => (
                                <div key={i} className={`flex-1 text-center ${i !== arr.length - 1 ? "border-r border-gray-200" : ""}`}>
                                    <div className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                                        {Math.pow(10, arr.length - 1 - i).toLocaleString()}s
                                    </div>
                                    <span className="text-2xl">{digit}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 bg-gray-100/50 p-4 rounded-lg text-center font-mono text-sm text-gray-600 break-all border border-gray-200">
                            {getDigits(decimalInput).map((digit, i, arr) => {
                                const power = arr.length - 1 - i;
                                return (
                                    <span key={i} className="inline-block mx-1">
                                        ({digit}×10<sup>{power}</sup>){i !== arr.length - 1 ? " + " : ""}
                                    </span>
                                );
                            })}
                            <div className="mt-2 pt-2 border-t border-gray-300 font-bold text-xl text-gray-800">
                                = {Number(decimalInput).toLocaleString()}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-400 italic">
                        Enter a decimal number...
                    </div>
                )}
            </div>

            {/* Right Side: Dynamic Base Visualizer */}
            <div className={`bg-white p-6 rounded-2xl border-2 shadow-sm flex flex-col h-full transition-colors duration-500`}
                style={{ borderColor: activeBase.colorFn("20") }}>
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <div className="relative">
                        <select
                            value={selectedBase}
                            onChange={(e) => {
                                setSelectedBase(Number(e.target.value));
                                setDynamicInput(""); // Reset input on base change
                            }}
                            className="appearance-none bg-transparent text-xl font-bold text-gray-800 pr-8 cursor-pointer focus:outline-none hover:text-gray-600 transition-colors"
                        >
                            <option value={2}>Binary (Base 2)</option>
                            <option value={8}>Octal (Base 8)</option>
                            <option value={16}>Hex (Base 16)</option>
                        </select>
                        <ChevronDown className="w-5 h-5 text-gray-500 absolute right-0 top-1 pointer-events-none" />
                    </div>
                    <span className="text-xs font-normal text-white px-3 py-1 rounded-full transition-colors duration-300"
                        style={{ backgroundColor: activeBase.colorFn("80") }}>
                        Interactive
                    </span>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                        Enter {activeBase.name} digits ({activeBase.digits}):
                    </label>
                    <div className="relative group">
                        <input
                            type="text"
                            value={dynamicInput}
                            onChange={(e) => handleDynamicInputChange(e.target.value)}
                            placeholder={`e.g. ${selectedBase === 16 ? "A5" : selectedBase === 8 ? "72" : "1011"}`}
                            className="w-full text-center text-4xl font-mono font-bold rounded-xl py-4 focus:outline-none focus:ring-4 transition-all shadow-inner bg-opacity-10 border-2"
                            style={{
                                color: activeBase.colorFn("100"),
                                backgroundColor: activeBase.colorFn("5"),
                                borderColor: activeBase.colorFn("20"),
                                // @ts-ignore - Valid CSS var
                                "--tw-ring-color": activeBase.colorFn("10"),
                            }}
                        />
                        <span className="absolute right-4 bottom-4 text-gray-400 text-xl font-mono select-none">
                            {activeBase.base}
                        </span>
                    </div>
                </div>

                {dynamicInput ? (
                    <div className="flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-2 duration-300" key={selectedBase}> {/* Key forces re-render animation */}
                        <div className="flex justify-between text-sm text-gray-500 font-mono mb-2 px-1">
                            {getDigits(dynamicInput).map((_, i, arr) => (
                                <span key={i} className="flex-1 text-center text-xs">
                                    {activeBase.base}^{arr.length - 1 - i}
                                </span>
                            ))}
                        </div>

                        <div className="flex justify-between text-lg font-bold font-mono p-4 rounded-xl border shadow-sm transition-colors duration-300"
                            style={{
                                backgroundColor: activeBase.colorFn("5"),
                                borderColor: activeBase.colorFn("10"),
                                color: activeBase.colorFn("90")
                            }}>
                            {getDigits(dynamicInput).map((digit, i, arr) => (
                                <div key={i} className={`flex-1 text-center ${i !== arr.length - 1 ? "border-r" : ""}`}
                                    style={{ borderColor: activeBase.colorFn("15") }}>
                                    <div className="text-[10px] uppercase tracking-wider mb-1 opacity-60">
                                        {Math.pow(activeBase.base, arr.length - 1 - i).toLocaleString()}s
                                    </div>
                                    <span className="text-2xl">{digit}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 rounded-lg text-center font-mono text-sm break-all border transition-colors duration-300"
                            style={{
                                backgroundColor: activeBase.colorFn("10"),
                                borderColor: activeBase.colorFn("20"),
                                color: activeBase.colorFn("90")
                            }}>
                            {getDigits(dynamicInput).map((digit, i, arr) => {
                                const power = arr.length - 1 - i;
                                // For Hex, we need to show the numeric value of the digit if it's A-F
                                const numericVal = parseInt(digit, activeBase.base);
                                const showNumeric = isNaN(Number(digit)); // true if digit is letter

                                return (
                                    <span key={i} className="inline-block mx-1">
                                        ({showNumeric ? `${digit}→${numericVal}` : digit}×{activeBase.base}<sup>{power}</sup>)
                                        {i !== arr.length - 1 ? " + " : ""}
                                    </span>
                                );
                            })}
                            <div className="mt-3 pt-3 border-t font-bold text-xl flex flex-col md:flex-row justify-center items-center gap-2"
                                style={{ borderColor: activeBase.colorFn("20") }}>
                                <span>= {getDecimalValue(dynamicInput, activeBase.base).toLocaleString()}</span>
                                <span className="text-xs font-normal uppercase tracking-widest opacity-70 bg-white/50 px-2 py-1 rounded">
                                    (Decimal Value)
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 italic gap-2 min-h-[150px]">
                        <p>Select a base and enter a number.</p>
                        <p className="text-xs bg-gray-50 px-3 py-1 rounded-full border border-gray-100">{activeBase.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
