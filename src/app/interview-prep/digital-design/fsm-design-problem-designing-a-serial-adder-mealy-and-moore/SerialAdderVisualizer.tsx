"use client";

import React, { useState, useEffect } from "react";
import { Play, RotateCcw, ArrowRight, Plus } from "lucide-react";

/**
 * SerialAdderVisualizer
 * 
 * Simulates a Serial Adder circuit.
 * - Two Shift Registers (A and B)
 * - One Full Adder
 * - One D-Flip Flop (to store Carry)
 * - One Result Shift Register
 */
const SerialAdderVisualizer = () => {
    // 4-bit numbers for simplicity in demo
    const [regA, setRegA] = useState<string>("0101"); // 5
    const [regB, setRegB] = useState<string>("0011"); // 3

    // Internal state for simulation
    const [shifterA, setShifterA] = useState<number[]>([]);
    const [shifterB, setShifterB] = useState<number[]>([]);
    const [sumRegister, setSumRegister] = useState<number[]>([]);
    const [carryFF, setCarryFF] = useState<number>(0);
    const [cycle, setCycle] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);

    // Load initial values on mount or reset
    useEffect(() => {
        reset();
    }, []);

    // Auto-clock
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning && !isFinished) {
            interval = setInterval(tick, 1500); // Slow clock for visualization
        }
        return () => clearInterval(interval);
    }, [isRunning, isFinished, shifterA, shifterB, carryFF]);

    const parseInput = (str: string) => str.split('').map(Number).reverse(); // Store LSB at index 0 internally?
    // Let's store LSB at end of array to visualize shifting "right" visually? 
    // Usually shift registers shift right (LSB out).
    // Let's store [MSB ... LSB]. Shift right pops LSB.

    const reset = () => {
        setIsRunning(false);
        setIsFinished(false);
        setCycle(0);
        setCarryFF(0);
        setSumRegister([]);
        // Pad to ensure equal length, default 4 bits
        setShifterA(regA.split('').map(Number));
        setShifterB(regB.split('').map(Number));
    };

    const tick = () => {
        if (shifterA.length === 0 && shifterB.length === 0) {
            setIsFinished(true);
            setIsRunning(false);
            return;
        }

        // 1. Pop LSBs (Inputs)
        // If register is empty, input is 0 (sign extension or zero padding)
        const bitA = shifterA.length > 0 ? shifterA[shifterA.length - 1] : 0;
        const bitB = shifterB.length > 0 ? shifterB[shifterB.length - 1] : 0;

        // 2. Full Adder Logic (Combinational)
        // Sum = A ^ B ^ Cin
        // Cout = (A&B) | (Cin&(A^B))
        const sumBit = bitA ^ bitB ^ carryFF;
        const nextCarry = (bitA & bitB) | (carryFF & (bitA ^ bitB));

        // 3. Update State (Synchronous)
        setSumRegister(prev => [sumBit, ...prev]); // Shift new bit into MSB position of result?
        // Serial adder result: typically LSB is produced first. 
        // If we want to read the result as a normal number [MSB...LSB], we should prepend.

        setCarryFF(nextCarry);

        // Shift inputs
        setShifterA(prev => prev.slice(0, -1));
        setShifterB(prev => prev.slice(0, -1));

        setCycle(c => c + 1);

        // Stop condition: if A and B were just length 1, they are now 0. 
        // We processed the last bit.
        if (shifterA.length <= 1 && shifterB.length <= 1) {
            setIsFinished(true);
            setIsRunning(false);
        }
    };

    // Helper to render registers
    const RegisterView = ({ data, label, color, isActive }: { data: number[], label: string, color: string, isActive: boolean }) => (
        <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-sm font-bold text-slate-500">{label}</span>
            <div className={`flex border-2 rounded-lg overflow-hidden bg-white ${isActive ? 'border-indigo-400 shadow-md' : 'border-slate-200'}`}>
                {/* Fixed width for visual stability */}
                {Array.from({ length: Math.max(data.length, 4) }).map((_, i) => {
                    // Align data to the right (LSB)
                    // If data has 3 bits [1,0,1], and we want 4 slots: [empty, 1, 0, 1]
                    const valIndex = i - (Math.max(data.length, 4) - data.length);
                    const val = valIndex >= 0 ? data[valIndex] : null;

                    return (
                        <div key={i} className={`w-8 h-10 flex items-center justify-center font-mono border-l first:border-l-0 ${typeof val === 'number' ? `text-${color}-600 font-bold` : 'text-slate-200'
                            }`}>
                            {val ?? '-'}
                        </div>
                    );
                })}
            </div>
        </div>
    );

    // Current inputs for the wire visualization
    const currentA = shifterA.length > 0 ? shifterA[shifterA.length - 1] : 0;
    const currentB = shifterB.length > 0 ? shifterB[shifterB.length - 1] : 0;

    // Combinational results for the wire visualization
    const currentSum = currentA ^ currentB ^ carryFF;
    const currentNextCarry = (currentA & currentB) | (carryFF & (currentA ^ currentB));

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            {/* Setup Controls */}
            <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Operand A (Binary)</label>
                    <input
                        type="text"
                        value={regA}
                        onChange={(e) => {
                            if (/^[01]*$/.test(e.target.value)) setRegA(e.target.value);
                        }}
                        className="w-full font-mono bg-white border border-slate-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:border-indigo-500"
                        maxLength={8}
                        disabled={isRunning || cycle > 0}
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Operand B (Binary)</label>
                    <input
                        type="text"
                        value={regB}
                        onChange={(e) => {
                            if (/^[01]*$/.test(e.target.value)) setRegB(e.target.value);
                        }}
                        className="w-full font-mono bg-white border border-slate-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:border-indigo-500"
                        maxLength={8}
                        disabled={isRunning || cycle > 0}
                    />
                </div>
            </div>

            {/* Simulation Controls */}
            <div className="flex justify-center gap-4 mb-12">
                <button
                    onClick={() => setIsRunning(!isRunning)}
                    disabled={isFinished}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all shadow-sm ${isFinished ? 'bg-slate-200 text-slate-400 cursor-not-allowed' :
                            isRunning ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                >
                    <Play className={`w-4 h-4 ${isRunning ? 'animate-pulse' : ''}`} />
                    {isRunning ? "Running..." : "Start Clock"}
                </button>

                <button
                    onClick={tick}
                    disabled={isRunning || isFinished}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 font-medium disabled:opacity-50"
                >
                    <ArrowRight className="w-4 h-4" />
                    Step
                </button>

                <button
                    onClick={reset}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 font-medium"
                >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                </button>
            </div>

            {/* Circuit Visualization */}
            <div className="relative mb-8 p-4 bg-white rounded-xl border border-slate-200 shadow-inner min-h-[300px] flex flex-col items-center justify-center">

                <div className="flex justify-between w-full max-w-2xl px-8 mb-12">
                    {/* Inputs shifting out */}
                    <div className="relative">
                        <RegisterView data={shifterA} label="Shift Reg A" color="indigo" isActive={!isFinished} />
                        <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-xs text-indigo-500 font-mono font-bold animate-pulse">
                            {(!isFinished && shifterA.length > 0) ? shifterA[shifterA.length - 1] : ''} &rarr;
                        </div>
                    </div>

                    <div className="relative">
                        <RegisterView data={shifterB} label="Shift Reg B" color="sky" isActive={!isFinished} />
                        <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-xs text-sky-500 font-mono font-bold animate-pulse">
                            {(!isFinished && shifterB.length > 0) ? shifterB[shifterB.length - 1] : ''} &rarr;
                        </div>
                    </div>
                </div>

                {/* The Full Adder Core */}
                <div className="relative z-10 w-48 h-32 bg-slate-100 rounded-lg border-2 border-slate-400 flex flex-col items-center justify-center shadow-lg">
                    <span className="text-slate-600 font-bold mb-2">Full Adder (Comb.)</span>
                    <div className="grid grid-cols-3 gap-2 text-xs font-mono w-full px-4 mb-2">
                        <div className="text-center">A<br /><span className="text-lg text-indigo-600">{!isFinished ? currentA : 0}</span></div>
                        <div className="text-center">B<br /><span className="text-lg text-sky-600">{!isFinished ? currentB : 0}</span></div>
                        <div className="text-center">Cin<br /><span className="text-lg text-amber-600">{carryFF}</span></div>
                    </div>
                </div>

                {/* Output Wires */}
                <div className="flex justify-between w-full max-w-xl mt-8 relative">
                    {/* Sum Path */}
                    <div className="flexflex-col items-center flex-1">
                        <div className="text-center mb-2 text-xs text-emerald-600 font-bold">Sum = {currentSum}</div>
                        <ArrowRight className="w-6 h-6 text-emerald-400 mx-auto rotate-90" />
                        <div className="mt-4">
                            <RegisterView data={sumRegister} label="Sum Register" color="emerald" isActive={true} />
                        </div>
                    </div>

                    {/* Carry Path (Feedback) */}
                    <div className="absolute top-[-80px] left-[50%] translate-x-12 flex flex-col items-center">
                        <div className="w-24 h-24 bg-amber-50 rounded-lg border-2 border-amber-300 flex flex-col items-center justify-center shadow-md">
                            <span className="text-2xl font-bold text-amber-600">{carryFF}</span>
                            <span className="text-xs text-amber-800 font-bold mt-1">D-Flip Flop</span>
                            <span className="text-[10px] text-amber-500">(Stores Cout)</span>
                        </div>
                    </div>
                </div>

                {/* SVG Wires Layer */}
                <svg className="absolute inset-0 pointer-events-none w-full h-full opacity-30">
                    {/* Simplified visual wiring could go here but CSS layout handles most of it */}
                </svg>

            </div>

            {/* Results */}
            {isFinished && (
                <div className="text-center bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
                    <div className="text-emerald-800 font-bold">Computation Complete!</div>
                    <div className="font-mono text-lg text-emerald-600 mt-1">
                        Result: {sumRegister.join('')} (Binary) = {parseInt(sumRegister.join(''), 2)} (Decimal)
                    </div>
                    {carryFF === 1 && <div className="text-xs text-emerald-500 mt-1">Note: Final Carry Out was 1 (Overflow for fixed width)</div>}
                </div>
            )}
        </div>
    );
};

export default SerialAdderVisualizer;
