"use client";

import { useState } from "react";
import { Table, ArrowRight, Play, RefreshCw } from "lucide-react";

type Term = {
    binary: string; // e.g. "00-1"
    minterms: number[]; // e.g. [1, 3]
    checked: boolean;
    group: number; // Number of 1s (in the original binary)
};

export default function QMSolver() {
    const [input, setInput] = useState("0, 1, 2, 5, 6, 7");
    const [passes, setPasses] = useState<Term[][]>([]);
    const [primes, setPrimes] = useState<Term[]>([]);

    // Function to count 1s in a binary string (ignoring dashes)
    const countOnes = (s: string) => (s.match(/1/g) || []).length;

    // Convert decimal to 4-bit binary
    const toBin = (n: number) => n.toString(2).padStart(4, '0');

    // Check if two binary strings differ by exactly one position (and have dashes in same places)
    const differByOne = (a: string, b: string) => {
        let diff = 0;
        for (let i = 0; i < a.length; i++) {
            if (a[i] === '-' && b[i] !== '-') return false;
            if (a[i] !== '-' && b[i] === '-') return false;
            if (a[i] !== b[i]) diff++;
        }
        return diff === 1;
    };

    // Merge two binary strings
    const mergeBin = (a: string, b: string) => {
        let res = "";
        for (let i = 0; i < a.length; i++) {
            res += (a[i] !== b[i]) ? "-" : a[i];
        }
        return res;
    };

    const solveQM = () => {
        // Parse Input
        const minterms = Array.from(new Set(input.split(",").map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n >= 0 && n <= 15))).sort((a, b) => a - b);

        if (minterms.length === 0) {
            setPasses([]);
            setPrimes([]);
            return;
        }

        // Pass 0: Initial List
        let currentPass: Term[] = minterms.map(m => {
            const b = toBin(m);
            return {
                binary: b,
                minterms: [m],
                checked: false,
                group: countOnes(b)
            };
        });

        const allPasses = [currentPass];
        const primeImplicants: Term[] = [];

        // Iteratively Merge
        while (true) {
            const nextPass: Term[] = [];
            const checkedIndices = new Set<number>();
            const mergedMap = new Set<string>(); // Avoid duplicates like "0-0-" appearing twice

            // Try to merge every term with every term in the next group
            for (let i = 0; i < currentPass.length; i++) {
                for (let j = 0; j < currentPass.length; j++) {
                    // Optimization: Only compare if group diff is 1? 
                    // Alternatively, just compare differing by one bit. 
                    // Standard QM groups by bit count. Let's do strict iteration.

                    // Only merge if they belong to adjacent groups (e.g., group 1 and group 2)
                    // Actually simpler: Just check differByOne logic. 
                    // Grouping optimization is for speed, but O(N^2) is fine for 16 minterms.

                    const t1 = currentPass[i];
                    const t2 = currentPass[j];

                    if (differByOne(t1.binary, t2.binary)) {
                        const mergedBin = mergeBin(t1.binary, t2.binary);
                        if (!mergedMap.has(mergedBin)) {
                            nextPass.push({
                                binary: mergedBin,
                                minterms: [...t1.minterms, ...t2.minterms].sort((a, b) => a - b),
                                checked: false,
                                group: countOnes(mergedBin) // Group count doesn't matter much for display now
                            });
                            mergedMap.add(mergedBin);
                        }
                        t1.checked = true;
                        t2.checked = true;
                        // Note: We modifying the objects in currentPass directly to mark them checked
                    }
                }
            }

            // Collect unchecked terms from this pass as Primes
            currentPass.forEach((t) => {
                if (!t.checked) {
                    // Check if we already added this prime (can happen across iterations or duplicates)
                    if (!primeImplicants.some(p => p.binary === t.binary)) {
                        primeImplicants.push(t);
                    }
                }
            });

            if (nextPass.length === 0) break;

            allPasses.push(nextPass);
            currentPass = nextPass; // Continue with next pass
        }

        setPasses(allPasses);
        setPrimes(primeImplicants);
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Table className="w-6 h-6 text-indigo-600" />
                Interactive: QM Logic Engine (Step-by-Step)
            </h3>

            <div className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    Enter Minterms (0-15, comma separated):
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 font-mono text-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="0, 1, 2, 5, 6, 7"
                    />
                    <button
                        onClick={solveQM}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 flex items-center gap-2 transition-colors"
                    >
                        <Play className="w-4 h-4" /> Run
                    </button>
                    <button
                        onClick={() => { setInput(""); setPasses([]); setPrimes([]); }}
                        className="bg-white border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {passes.length > 0 && (
                <div className="overflow-x-auto pb-4 custom-scrollbar">
                    <div className="flex gap-8 min-w-max">
                        {passes.map((pass, pIdx) => (
                            <div key={pIdx} className="w-48 flex-shrink-0 animate-in fade-in slide-in-from-right-4" style={{ animationDelay: `${pIdx * 150}ms` }}>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 text-center border-b border-gray-100 pb-1">
                                    {pIdx === 0 ? "Initial List" : `Pass ${pIdx} (Merge)`}
                                </div>
                                <div className="bg-white border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-100">
                                    {pass.map((term, tIdx) => (
                                        <div key={tIdx} className={`p-2 flex justify-between items-center ${term.checked ? 'bg-gray-50 text-gray-400 decoration-gray-300' : 'bg-green-50 text-green-800 font-bold'}`}>
                                            <span className="font-mono text-sm">{term.binary}</span>
                                            <span className="text-[10px] text-gray-400">
                                                m({term.minterms.join(',')})
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center mt-2 text-gray-300">
                                    {pIdx < passes.length - 1 && <ArrowRight className="w-5 h-5 mx-auto" />}
                                </div>
                            </div>
                        ))}

                        {/* Final Results */}
                        <div className="w-64 flex-shrink-0 bg-indigo-900 rounded-xl p-4 text-white shadow-lg animate-in fade-in slide-in-from-right-4" style={{ animationDelay: `${passes.length * 150}ms` }}>
                            <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Table className="w-4 h-4" /> Prime Implicants Found
                            </div>
                            {primes.length === 0 ? (
                                <div className="text-sm text-indigo-200 italic">No PI's found (Check input).</div>
                            ) : (
                                <div className="space-y-2">
                                    {primes.map((p, i) => (
                                        <div key={i} className="flex justify-between items-center border-b border-indigo-700/50 pb-1 last:border-0">
                                            <span className="font-mono font-bold text-emerald-300 text-lg">{p.binary}</span>
                                            <span className="text-xs text-indigo-300">m({p.minterms.join(',')})</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="mt-4 text-[10px] text-indigo-400 leading-tight">
                                *The final minimization requires the "PI Chart" (Step 2) to select the essential terms from this list.
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
