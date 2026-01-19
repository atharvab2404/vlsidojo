"use client";

import React, { useState } from "react";
import { Coins, RotateCcw, CheckCircle, ArrowRight } from "lucide-react";

/**
 * VendingMachineVisualizer
 * 
 * Simulates a simple Vending Machine FSM.
 * - Product Cost: 15 cents
 * - Inputs: Nickel (5c), Dime (10c)
 * - Outputs: Dispense, Change (if overpaid)
 * - States: 0c, 5c, 10c, 15c (Dispense)
 */
const VendingMachineVisualizer = () => {
    const [balance, setBalance] = useState(0);
    const [lastAction, setLastAction] = useState<string>("Ready");
    const [dispensed, setDispensed] = useState(false);
    const [changeReturned, setChangeReturned] = useState(0);

    const COST = 15;

    const insertCoin = (value: number) => {
        if (dispensed) reset(); // Auto-reset on new coin if finished

        setLastAction(`Inserted ${value}¢`);

        const newBalance = balance + value;
        setBalance(newBalance);

        if (newBalance >= COST) {
            // Dispense Logic
            setDispensed(true);
            setChangeReturned(newBalance - COST);
        }
    };

    const reset = () => {
        setBalance(0);
        setLastAction("Reset");
        setDispensed(false);
        setChangeReturned(0);
    };

    // Helper to determine active state style
    // States: S0(0), S5(5), S10(10), S15(15+)
    const getStateId = (bal: number) => {
        if (bal >= 15) return 15;
        if (bal === 10) return 10;
        if (bal === 5) return 5;
        return 0;
    };

    const activeState = getStateId(balance);

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans">

            <div className="grid md:grid-cols-2 gap-8">
                {/* --- Left: Interaction Panel --- */}
                <div className="space-y-6">
                    {/* Display */}
                    <div className="bg-slate-900 rounded-xl p-6 text-center shadow-lg border-2 border-slate-700">
                        <div className="text-emerald-400 font-mono text-sm mb-1">CURRENT BALANCE</div>
                        <div className="text-5xl font-black text-white tracking-widest mb-4">
                            {balance}¢
                        </div>
                        <div className="h-8 text-amber-400 font-bold text-sm">
                            {dispensed ? "DISPENSING..." : "INSERT COIN"}
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => insertCoin(5)}
                            disabled={dispensed && false} // Optional: block input? Let's allow auto-reset.
                            className="flex flex-col items-center gap-2 p-4 bg-white border-2 border-slate-200 rounded-xl hover:border-indigo-500 hover:shadow-md transition-all active:scale-95"
                        >
                            <div className="w-12 h-12 rounded-full bg-gray-300 border-4 border-gray-400 flex items-center justify-center font-bold text-gray-600 shadow-inner">
                                5
                            </div>
                            <span className="font-bold text-slate-600">Nickel</span>
                        </button>

                        <button
                            onClick={() => insertCoin(10)}
                            className="flex flex-col items-center gap-2 p-4 bg-white border-2 border-slate-200 rounded-xl hover:border-indigo-500 hover:shadow-md transition-all active:scale-95"
                        >
                            <div className="w-10 h-10 rounded-full bg-gray-200 border-4 border-gray-300 flex items-center justify-center font-bold text-gray-500 shadow-inner">
                                10
                            </div>
                            <span className="font-bold text-slate-600">Dime</span>
                        </button>
                    </div>

                    <div className="flex justify-center">
                        <button onClick={reset} className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1">
                            <RotateCcw className="w-3 h-3" /> Reset Machine
                        </button>
                    </div>

                    {/* Output Tray */}
                    {dispensed && (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 animate-in slide-in-from-top-4 fade-in">
                            <div className="flex items-center gap-3 text-emerald-800 font-bold mb-2">
                                <CheckCircle className="w-5 h-5" />
                                Soda Dispensed!
                            </div>
                            {changeReturned > 0 && (
                                <div className="text-emerald-600 text-sm flex items-center gap-2">
                                    <Coins className="w-4 h-4" />
                                    Change Returned: {changeReturned}¢
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* --- Right: State Diagram Visual --- */}
                <div className="relative bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-center min-h-[300px]">
                    {/* Static SVG Connections */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                        {/* Simple arrows inferred visually */}
                    </svg>

                    <div className="absolute top-4 left-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Internal State</div>

                    <div className="flex flex-col gap-8 w-full max-w-xs">
                        {/* State 0 */}
                        <div className={`transition-all duration-300 p-3 rounded-lg border-2 flex items-center justify-between ${activeState === 0 ? "bg-indigo-50 border-indigo-500 shadow-md scale-105" : "bg-white border-slate-100 opacity-50"
                            }`}>
                            <div className="font-bold text-indigo-900">State 0¢</div>
                            {activeState === 0 && <span className="text-xs text-indigo-600 font-bold animate-pulse">&larr; You are here</span>}
                        </div>

                        {/* State 5 */}
                        <div className={`transition-all duration-300 p-3 rounded-lg border-2 flex items-center justify-between ${activeState === 5 ? "bg-indigo-50 border-indigo-500 shadow-md scale-105" : "bg-white border-slate-100 opacity-50"
                            }`}>
                            <div className="font-bold text-indigo-900">State 5¢</div>
                            {activeState === 5 && <span className="text-xs text-indigo-600 font-bold animate-pulse">&larr; You are here</span>}
                        </div>

                        {/* State 10 */}
                        <div className={`transition-all duration-300 p-3 rounded-lg border-2 flex items-center justify-between ${activeState === 10 ? "bg-indigo-50 border-indigo-500 shadow-md scale-105" : "bg-white border-slate-100 opacity-50"
                            }`}>
                            <div className="font-bold text-indigo-900">State 10¢</div>
                            {activeState === 10 && <span className="text-xs text-indigo-600 font-bold animate-pulse">&larr; You are here</span>}
                        </div>

                        {/* State 15 */}
                        <div className={`transition-all duration-300 p-3 rounded-lg border-2 flex items-center justify-between ${activeState === 15 ? "bg-emerald-100 border-emerald-500 shadow-md scale-105" : "bg-white border-slate-100 opacity-50"
                            }`}>
                            <div className="font-bold text-emerald-900">State 15¢ (Dispense)</div>
                            {activeState === 15 && <span className="text-xs text-emerald-600 font-bold animate-pulse">&larr; Done!</span>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-center text-xs text-slate-400">
                Notice: Logic resets to 0 automatically for next customer.
            </div>
        </div>
    );
};

export default VendingMachineVisualizer;
