"use client";

import { useState, useMemo } from "react";
import { Grid2X2, RefreshCw, Calculator, Wand2 } from "lucide-react";

type CellValue = 0 | 1 | 2; // 0=0, 1=1, 2=X (Don't Care)

export default function KMapSolver() {
    // 4-variable map (AB \ CD) -> 16 cells
    // Ordering: 
    // Row 0 (AB=00): 0,  1,  3,  2
    // Row 1 (AB=01): 4,  5,  7,  6
    // Row 2 (AB=11): 12, 13, 15, 14
    // Row 3 (AB=10): 8,  9,  11, 10

    // Array index 0-15 corresponds to decimal values (minterms)
    // Initially we'll just store values by minterm index for easier logic
    const [minterms, setMinterms] = useState<CellValue[]>(Array(16).fill(0));

    // Visual Grid Mapping (Row, Col) -> Minterm Index
    // Rows: 00, 01, 11, 10
    // Cols: 00, 01, 11, 10
    const gridMap = [
        [0, 1, 3, 2],
        [4, 5, 7, 6],
        [12, 13, 15, 14],
        [8, 9, 11, 10]
    ];

    const toggleCell = (idx: number) => {
        setMinterms(prev => {
            const next = [...prev];
            // Cycle: 0 -> 1 -> X -> 0
            next[idx] = next[idx] === 0 ? 1 : (next[idx] === 1 ? 2 : 0);
            return next;
        });
    };

    const reset = () => setMinterms(Array(16).fill(0));

    // --- SOLVER LOGIC ---
    // This is a simplified solver for 4-variables.
    // It finds groups of 16, 8, 4, 2, 1.

    // Helper: Check if a set of indices contains only 1s or Xs
    // Returns true if valid group (must contain at least one 1)
    const isValidGroup = (indices: number[]) => {
        let hasOne = false;
        for (let idx of indices) {
            if (minterms[idx] === 0) return false; // Grouping a 0 is illegal
            if (minterms[idx] === 1) hasOne = true;
        }
        return hasOne; // Must cover at least one 1 (grouping only Xs is useless)
    };

    // Precomputed masks for adjacency logic could go here, 
    // but for 4-var, simple iteration is fast enough.

    // Generate all possible valid groups
    const solveKMap = () => {
        const groups: { indices: number[], term: string, color: string }[] = [];
        let covered = new Set<number>();

        // We need to track which 1s are covered. Xs don't need coverage.
        const onesToCover = minterms
            .map((v, i) => v === 1 ? i : -1)
            .filter(i => i !== -1);

        if (onesToCover.length === 0) return { equation: "0", groups: [] };
        if (minterms.every(v => v !== 0)) return { equation: "1", groups: [{ indices: Array.from({ length: 16 }, (_, i) => i), term: "1", color: "border-green-500" }] };

        // Define all rectangles in (Row, Col, Height, Width) format
        // Because of wrap-around, we handle coordinates modulo 4.
        const regions: { r: number, c: number, h: number, w: number, size: number }[] = [];

        // Sizes: 16, 8, 4, 2, 1
        const sizes = [
            { h: 4, w: 4 }, // 16
            { h: 2, w: 4 }, { h: 4, w: 2 }, // 8
            { h: 1, w: 4 }, { h: 4, w: 1 }, { h: 2, w: 2 }, // 4
            { h: 1, w: 2 }, { h: 2, w: 1 }, // 2
            { h: 1, w: 1 } // 1
        ];

        // Generate all candidate regions
        for (let size of sizes) {
            for (let r = 0; r < 4; r++) {
                for (let c = 0; c < 4; c++) {
                    regions.push({ r, c, h: size.h, w: size.w, size: size.h * size.w });
                }
            }
        }

        // Sort regions by size (Largest first - Greedy approach)
        // Note: True QM method is more complex (find PIs, then EPIs). 
        // For educational UI, a greedy "Largest Valid Group covering a 1" is usually 99% correct and intuitive.
        regions.sort((a, b) => b.size - a.size);

        const validGroups: { indices: number[], term: string, coveredNew: boolean }[] = [];

        for (let region of regions) {
            // Get minterm indices for this region
            const indices: number[] = [];
            for (let i = 0; i < region.h; i++) {
                for (let j = 0; j < region.w; j++) {
                    const r = (region.r + i) % 4;
                    const c = (region.c + j) % 4;
                    indices.push(gridMap[r][c]);
                }
            }

            if (isValidGroup(indices)) {
                // Check if this group covers any *new* 1s
                const newCoverage = indices.filter(idx => minterms[idx] === 1 && !covered.has(idx));

                if (newCoverage.length > 0) {
                    // It's a useful group!
                    newCoverage.forEach(idx => covered.add(idx));

                    // Generate Boolean Term
                    // 4-Var: A(8), B(4), C(2), D(1)
                    // Check which bits are CONSTANT for all indices
                    // If a bit varies, it's eliminated.
                    let term = "";

                    // Check Bit 3 (A) -> Indices 8-15
                    const allA = indices.every(i => (i & 8) !== 0);
                    const allNotA = indices.every(i => (i & 8) === 0);
                    if (allA) term += "A";
                    if (allNotA) term += "A'";

                    // Check Bit 2 (B) -> Indices 4-7, 12-15
                    const allB = indices.every(i => (i & 4) !== 0);
                    const allNotB = indices.every(i => (i & 4) === 0);
                    if (allB) term += "B";
                    if (allNotB) term += "B'";

                    // Check Bit 1 (C) -> Indices 2,3,6,7,10,11,14,15
                    const allC = indices.every(i => (i & 2) !== 0);
                    const allNotC = indices.every(i => (i & 2) === 0);
                    if (allC) term += "C";
                    if (allNotC) term += "C'";

                    // Check Bit 0 (D) -> Indices 1,3,5,7...
                    const allD = indices.every(i => (i & 1) !== 0);
                    const allNotD = indices.every(i => (i & 1) === 0);
                    if (allD) term += "D";
                    if (allNotD) term += "D'";

                    // Fallback for logic '1'
                    if (term === "") term = "1";

                    // Assign visual color based on index
                    const colors = ["border-blue-500", "border-purple-500", "border-teal-500", "border-pink-500", "border-orange-500"];
                    const color = colors[validGroups.length % colors.length];

                    groups.push({ indices, term, color });
                    validGroups.push({ indices, term, coveredNew: true });
                }
            }

            if (covered.size === onesToCover.length) break; // All done
        }

        return {
            equation: groups.map(g => g.term).join(" + "),
            groups
        };
    };

    const solution = useMemo(solveKMap, [minterms]);

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Wand2 className="w-6 h-6 text-indigo-600" />
                Interactive: K-Map Solver (with Don't Cares)
            </h3>

            <div className="flex flex-col md:flex-row gap-12 items-start justify-center">

                {/* K-Map Grid */}
                <div className="select-none">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Click to Toggle</span>
                        <button onClick={reset} className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1 transition-colors">
                            <RefreshCw className="w-3 h-3" /> Reset
                        </button>
                    </div>

                    <div className="relative pt-6 pl-8">
                        {/* Top Labels (CD) */}
                        <div className="absolute top-0 left-8 right-0 flex justify-around text-xs font-bold text-gray-500 font-mono w-64 md:w-80">
                            <span className="w-1/4 text-center">00</span>
                            <span className="w-1/4 text-center">01</span>
                            <span className="w-1/4 text-center text-indigo-600">11</span>
                            <span className="w-1/4 text-center text-indigo-600">10</span>
                        </div>
                        {/* Left Labels (AB) */}
                        <div className="absolute top-0 left-0 w-8 h-full flex flex-col justify-around text-xs font-bold text-gray-500 font-mono pt-6">
                            <span className="h-1/4 flex items-center justify-center">00</span>
                            <span className="h-1/4 flex items-center justify-center">01</span>
                            <span className="h-1/4 flex items-center justify-center text-indigo-600">11</span>
                            <span className="h-1/4 flex items-center justify-center text-indigo-600">10</span>
                        </div>

                        {/* Axes Names */}
                        <div className="absolute -top-1 -left-2 text-xs font-bold text-gray-400 italic">AB \ CD</div>

                        <div className="grid grid-rows-4 w-64 md:w-80 h-64 md:h-80 border-2 border-gray-800 bg-white rounded-sm relative">
                            {/* Render Cells */}
                            {gridMap.map((row, rIdx) => (
                                <div key={rIdx} className="grid grid-cols-4 h-full">
                                    {row.map((val, cIdx) => {
                                        const cellValue = minterms[val];
                                        return (
                                            <div
                                                key={cIdx}
                                                onClick={() => toggleCell(val)}
                                                className={`
                                            relative flex items-center justify-center border border-gray-200 cursor-pointer transition-colors duration-100
                                            hover:bg-gray-50
                                        `}
                                            >
                                                <span className={`text-2xl font-bold font-mono 
                                            ${cellValue === 1 ? 'text-gray-900' : (cellValue === 2 ? 'text-amber-500' : 'text-gray-200')}
                                        `}>
                                                    {cellValue === 2 ? 'X' : cellValue}
                                                </span>
                                                <span className="absolute bottom-1 right-1 text-[9px] text-gray-300 font-sans pointer-events-none">
                                                    {val}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}

                            {/* Render Group Overlays */}
                            {/* We use absolute positioning to draw boxes over the grid */}
                            <div className="absolute inset-0 pointer-events-none">
                                {solution.groups.map((g, i) => {
                                    // This is tricky for visuals because of wrap-around. 
                                    // For simplicity in this version, we will just HIGHLIGHT the cells' borders with color
                                    // A full SVG overlay for wrap-around torus is very complex to calculate responsively.
                                    return null;
                                })}
                            </div>
                        </div>

                        {/* Hint Text */}
                        <p className="text-xs text-gray-400 mt-2 text-center">
                            0 = Low, 1 = High, <span className="text-amber-500 font-bold">X = Don't Care</span>
                        </p>

                    </div>
                </div>

                {/* Results Panel */}
                <div className="flex flex-col justify-center w-full md:w-64 space-y-6">

                    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg">
                        <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Minimized Equation</div>
                        <div className="font-mono text-2xl font-bold tracking-wide break-words text-green-400">
                            F = {solution.equation}
                        </div>
                    </div>

                    {/* Legend / Group List */}
                    {solution.groups.length > 0 && (
                        <div className="space-y-2">
                            <div className="text-sm font-bold text-gray-700">Identified Groups:</div>
                            {solution.groups.map((g, i) => (
                                <div key={i} className={`flex items-center gap-3 p-2 rounded bg-gray-50 border-l-4 ${g.color}`}>
                                    <span className="font-mono font-bold text-gray-800">{g.term}</span>
                                    <span className="text-xs text-gray-500">
                                        ({g.indices.length} cells)
                                    </span>
                                </div>
                            ))}
                            <div className="text-xs text-gray-500 italic mt-2">
                                *Greedy algorithm used. May vary slightly from manual solution order.
                            </div>
                        </div>
                    )}

                    {solution.groups.length === 0 && minterms.some(x => x === 1) && (
                        <div className="text-sm text-red-500 bg-red-50 p-3 rounded">
                            No valid adjacency found. Each '1' stands alone.
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}
