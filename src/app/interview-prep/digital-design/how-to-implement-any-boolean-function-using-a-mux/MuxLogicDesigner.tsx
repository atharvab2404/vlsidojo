"use client";

import { useState, useEffect } from "react";
import { Check, RefreshCw, X, HelpCircle } from "lucide-react";

type MuxInputOption = "0" | "1" | "C" | "C'";

export default function MuxLogicDesigner() {
    const [targetMinterms, setTargetMinterms] = useState<number[]>([]);
    const [userInputs, setUserInputs] = useState<MuxInputOption[]>(["0", "0", "0", "0"]);
    const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');
    const [showHint, setShowHint] = useState(false);
    const [hoveredInput, setHoveredInput] = useState<number | null>(null);

    // Generate a random function on mount
    useEffect(() => {
        generateNewProblem();
    }, []);

    const generateNewProblem = () => {
        // Generate random output for each of the 8 minterms (0-7)
        // Actually, to make it solvable/interesting, we just pick random outputs.
        const newMinterms: number[] = [];
        for (let i = 0; i < 8; i++) {
            if (Math.random() > 0.5) newMinterms.push(i);
        }
        setTargetMinterms(newMinterms);
        setUserInputs(["0", "0", "0", "0"]);
        setFeedback('idle');
        setShowHint(false);
    };

    const isMintermHigh = (m: number) => targetMinterms.includes(m);

    const getCorrectInputForIndex = (idx: number): MuxInputOption => {
        // Index idx corresponds to AB = idx (0..3)
        // This covers minterms 2*idx (C=0) and 2*idx+1 (C=1)
        const low = isMintermHigh(2 * idx);   // when C=0
        const high = isMintermHigh(2 * idx + 1); // when C=1

        if (!low && !high) return "0";
        if (low && high) return "1";
        if (!low && high) return "C";
        if (low && !high) return "C'";
        return "0";
    };

    const checkAnswer = () => {
        let isAllCorrect = true;
        for (let i = 0; i < 4; i++) {
            if (userInputs[i] !== getCorrectInputForIndex(i)) {
                isAllCorrect = false;
                break;
            }
        }
        setFeedback(isAllCorrect ? 'correct' : 'incorrect');
    };

    const cycleInput = (idx: number) => {
        const options: MuxInputOption[] = ["0", "1", "C", "C'"];
        const currentIdx = options.indexOf(userInputs[idx]);
        const nextVal = options[(currentIdx + 1) % options.length];
        const newInputs = [...userInputs];
        newInputs[idx] = nextVal;
        setUserInputs(newInputs);
        setFeedback('idle');
    };

    return (
        <div className="flex flex-col gap-8 select-none">

            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-700">Target Function F(A,B,C)</h3>
                    <button onClick={() => setShowHint(!showHint)} className="text-gray-400 hover:text-indigo-600 transition-colors flex items-center gap-1 text-xs font-bold border border-gray-300 px-2 py-1 rounded bg-white">
                        <HelpCircle className="w-4 h-4" /> {showHint ? "Hide Hint" : "Show Hint"}
                    </button>
                </div>
                <button
                    onClick={generateNewProblem}
                    className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                    <RefreshCw className="w-4 h-4" /> New Problem
                </button>
            </div>

            {showHint && (
                <div className="bg-yellow-50 p-4 rounded-xl text-sm text-yellow-800 border border-yellow-200">
                    <strong>Tip:</strong> Hover over the Mux Inputs (I0..I3) to see which rows of the Truth Table control them.
                    Compare the <strong>C</strong> column with the <strong>F</strong> column for those rows correctly.
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-8 items-start justify-center">

                {/* Truth Table */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <table className="w-full text-sm text-center border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 border-b border-gray-200">
                                <th className="p-2">A</th>
                                <th className="p-2">B</th>
                                <th className="p-2">C</th>
                                <th className="p-2 bg-indigo-50 text-indigo-700">F</th>
                                <th className="p-2 text-xs text-gray-400">Grp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 8 }).map((_, i) => {
                                const m = i;
                                const out = isMintermHigh(m) ? 1 : 0;
                                const group = Math.floor(i / 2);
                                const isHighlighted = hoveredInput === group;

                                return (
                                    <tr key={i} className={`border-b border-gray-100 transition-colors ${isHighlighted ? 'bg-indigo-100' : ''}`}>
                                        <td className="p-1 font-mono text-gray-400">{(m >> 2) & 1}</td>
                                        <td className="p-1 font-mono text-gray-400">{(m >> 1) & 1}</td>
                                        <td className={`p-1 font-mono ${isHighlighted ? 'text-indigo-900 font-bold' : 'text-gray-400'}`}>{m & 1}</td>
                                        <td className={`p-1 font-bold ${out ? 'text-indigo-600' : 'text-gray-300'} ${isHighlighted ? 'scale-125' : ''}`}>{out}</td>
                                        <td className="p-1 text-xs text-gray-400">I<sub>{group}</sub></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Initial Mux Visual */}
                <div className="flex-1 flex flex-col items-center">
                    <div className="relative bg-white p-8 rounded-2xl border border-gray-200 shadow-lg w-64 h-80 flex flex-col items-center justify-center">

                        {/* Mux Body */}
                        <div className="absolute inset-0 m-auto w-32 h-48 bg-gray-50 border-2 border-gray-300 rounded-lg transform skew-y-0" style={{ clipPath: 'polygon(0 0, 100% 10%, 100% 90%, 0 100%)' }}></div>
                        <span className="z-10 font-bold text-gray-400 mb-2">4:1 MUX</span>

                        {/* Inputs */}
                        <div className="absolute left-0 top-16 flex flex-col gap-6 -translate-x-[50%]">
                            {[0, 1, 2, 3].map((idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-2 group"
                                    onMouseEnter={() => setHoveredInput(idx)}
                                    onMouseLeave={() => setHoveredInput(null)}
                                >
                                    <button
                                        onClick={() => cycleInput(idx)}
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg border-2 shadow-sm transition-all hover:scale-105 active:scale-95
                                    ${userInputs[idx].includes('C') ? 'bg-indigo-100 text-indigo-700 border-indigo-300' : 'bg-gray-100 text-gray-600 border-gray-300'}
                                    ${hoveredInput === idx ? 'ring-2 ring-indigo-400 ring-offset-2' : ''}
                                    `}
                                    >
                                        {userInputs[idx]}
                                    </button>
                                    <div className={`w-8 h-0.5 transition-colors ${hoveredInput === idx ? 'bg-indigo-400' : 'bg-gray-300'}`}></div>
                                    <span className={`text-xs font-mono absolute left-12 mt-4 ml-1 transition-colors ${hoveredInput === idx ? 'text-indigo-600 font-bold' : 'text-gray-400'}`}>I<sub>{idx}</sub></span>
                                </div>
                            ))}
                        </div>

                        {/* Select Lines */}
                        <div className="absolute bottom-8 flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="w-0.5 h-8 bg-gray-300"></div>
                                <span className="font-bold text-gray-600">A</span>
                                <span className="text-[10px] text-gray-400">S<sub>1</sub></span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-0.5 h-8 bg-gray-300"></div>
                                <span className="font-bold text-gray-600">B</span>
                                <span className="text-[10px] text-gray-400">S<sub>0</sub></span>
                            </div>
                        </div>

                        {/* Output */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[50%] flex items-center">
                            <div className="w-8 h-0.5 bg-gray-300"></div>
                            <div className="bg-gray-100 px-3 py-1 rounded border border-gray-200 font-bold text-gray-500">
                                F
                            </div>
                        </div>

                    </div>

                    <div className="mt-8 flex gap-4">
                        {feedback === 'idle' && (
                            <>
                                <button
                                    onClick={checkAnswer}
                                    className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                                >
                                    Check Logic
                                </button>
                                <button
                                    onClick={() => {
                                        const correctInputs = [0, 1, 2, 3].map(i => getCorrectInputForIndex(i));
                                        setUserInputs(correctInputs);
                                        setFeedback('correct'); // Technically they didn't solve it, but shows it's right
                                    }}
                                    className="bg-gray-100 text-gray-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                                >
                                    Reveal Answer
                                </button>
                            </>
                        )}
                        {feedback === 'correct' && (
                            <div className="flex flex-col items-center gap-2 animate-in fade-in zoom-in duration-300">
                                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xl">
                                    <Check className="w-8 h-8" />
                                    Correct!
                                </div>
                                <p className="text-sm text-gray-500">You successfully mapped the logic.</p>
                            </div>
                        )}
                        {feedback === 'incorrect' && (
                            <div className="flex flex-col items-center gap-2 animate-in shake duration-300">
                                <div className="flex items-center gap-2 text-red-500 font-bold text-xl">
                                    <X className="w-8 h-8" />
                                    Not quite right
                                </div>
                                <p className="text-sm text-gray-500">Check the truth table groups again.</p>
                                <button
                                    onClick={() => setFeedback('idle')}
                                    className="text-indigo-600 hover:text-indigo-800 underline text-sm mt-2"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
