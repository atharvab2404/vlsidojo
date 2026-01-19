"use client";

import { useState } from "react";
import { Grid3X3, ArrowRight, Table2 } from "lucide-react";

export default function KMapMapper() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [showIndices, setShowIndices] = useState(true);

    // 3-variable K-Map Layout (Row-major linear indices)
    // Gray Code for Cols (BC): 00 01 11 10 -> Dec: 0 1 3 2
    // Gray Code for Rows (A): 0 1

    // Map Structure:
    //      BC=00(0) BC=01(1) BC=11(3) BC=10(2)
    // A=0: 0        1        3        2
    // A=1: 4        5        7        6

    const matrix = [
        [0, 1, 3, 2], // Row A=0
        [4, 5, 7, 6]  // Row A=1
    ];

    const toBin = (n: number) => n.toString(2).padStart(3, '0');

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Grid3X3 className="w-6 h-6 text-indigo-600" />
                Interactive: The K-Map Mapper
            </h3>

            <div className="flex flex-col md:flex-row gap-8 items-start justify-center">

                {/* Truth Table View */}
                <div className="w-full md:w-auto">
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Table2 className="w-4 h-4" /> Truth Table
                    </h4>
                    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                        <table className="text-center text-sm w-full md:w-64">
                            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                                <tr>
                                    <th className="py-2 w-10 border-r border-gray-100">m</th>
                                    <th className="py-2">A</th>
                                    <th className="py-2">B</th>
                                    <th className="py-2">C</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 font-mono">
                                {Array.from({ length: 8 }).map((_, i) => {
                                    const bin = toBin(i);
                                    const isHovered = hoveredIndex === i;
                                    return (
                                        <tr
                                            key={i}
                                            onMouseEnter={() => setHoveredIndex(i)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                            className={`cursor-crosshair transition-all duration-150
                                        ${isHovered ? 'bg-indigo-100 text-indigo-900 font-bold' : 'hover:bg-gray-50 text-gray-600'}
                                    `}
                                        >
                                            <td className="py-1.5 border-r border-gray-100 text-gray-400 font-sans">{i}</td>
                                            <td>{bin[0]}</td>
                                            <td>{bin[1]}</td>
                                            <td>{bin[2]}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-center">Hover rows to find them on the Map</p>
                </div>

                <div className="hidden md:flex items-center justify-center h-64">
                    <ArrowRight className="w-8 h-8 text-gray-300 animate-pulse" />
                </div>

                {/* K-Map View */}
                <div className="w-full md:w-auto select-none">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                            <Grid3X3 className="w-4 h-4" /> 3-Var Map
                        </h4>
                        <label className="text-xs flex items-center gap-1.5 text-gray-500 cursor-pointer hover:text-indigo-600 transition-colors">
                            <input type="checkbox" checked={showIndices} onChange={e => setShowIndices(e.target.checked)} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            Show Indices
                        </label>
                    </div>

                    <div className="relative pt-6 pl-8">
                        {/* Labels */}
                        <div className="absolute top-0 left-8 right-0 flex justify-around text-xs font-bold text-gray-500 font-mono w-64 md:w-80">
                            <span className="w-1/4 text-center">00</span>
                            <span className="w-1/4 text-center">01</span>
                            <span className="w-1/4 text-center text-indigo-600">11</span>
                            <span className="w-1/4 text-center text-indigo-600">10</span>
                        </div>
                        <div className="absolute top-0 left-0 w-8 h-full flex flex-col justify-around text-xs font-bold text-gray-500 font-mono pt-6">
                            <span className="h-1/2 flex items-center justify-center">0</span>
                            <span className="h-1/2 flex items-center justify-center">1</span>
                        </div>

                        {/* Axes Names */}
                        <div className="absolute -top-1 -left-1 text-xs font-bold text-gray-400 italic">A \ BC</div>


                        {/* Grid */}
                        <div className="grid grid-rows-2 w-64 md:w-80 h-32 border-2 border-gray-800 bg-white rounded-sm overflow-hidden box-border">
                            {matrix.map((row, rIdx) => (
                                <div key={rIdx} className="grid grid-cols-4 h-full">
                                    {row.map((val, cIdx) => {
                                        const isHighlighted = hoveredIndex === val;
                                        return (
                                            <div
                                                key={cIdx}
                                                onMouseEnter={() => setHoveredIndex(val)}
                                                onMouseLeave={() => setHoveredIndex(null)}
                                                className={`
                                            relative flex items-center justify-center border border-gray-200 transition-all duration-200 cursor-crosshair
                                            ${isHighlighted ? 'bg-indigo-500 text-white scale-105 z-10 shadow-lg' : 'hover:bg-gray-50'}
                                        `}
                                            >
                                                {/* Main Value Placeholder (Empty for structure demo) */}
                                                <span className={`font-mono text-lg font-bold ${isHighlighted ? 'text-white' : 'text-gray-200'}`}>
                                                    x
                                                </span>

                                                {/* Decimal Index Helper */}
                                                {showIndices && (
                                                    <span className={`absolute bottom-0.5 right-1 text-[10px] font-bold ${isHighlighted ? 'text-indigo-200' : 'text-gray-400'}`}>
                                                        {val}
                                                    </span>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>

                        {/* Gray Code Explanation Bubble */}
                        {hoveredIndex !== null && (hoveredIndex === 3 || hoveredIndex === 2 || hoveredIndex === 7 || hoveredIndex === 6) && (
                            <div className="absolute -bottom-16 left-0 right-0 bg-indigo-50 text-indigo-800 text-xs p-2 rounded border border-indigo-100 text-center animate-in fade-in slide-in-from-top-1">
                                Notice the jump! <strong>11 comes before 10</strong> to maintain the "1-bit change" rule.
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
