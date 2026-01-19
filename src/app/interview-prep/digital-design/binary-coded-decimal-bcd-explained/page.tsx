import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Calculator, AlertTriangle, PlayCircle, Grid } from "lucide-react";
import BCDVsBinaryVisualizer from "./BCDVsBinaryVisualizer";

export default function Page() {
    const currentSlug = "binary-coded-decimal-bcd-explained";
    const index = flatDigitalDesignTopics.findIndex((t) => t.slug === currentSlug);
    const prev = index > 0 ? flatDigitalDesignTopics[index - 1] : null;
    const next =
        index < flatDigitalDesignTopics.length - 1
            ? flatDigitalDesignTopics[index + 1]
            : null;

    return (
        <div className="max-w-5xl mx-auto text-gray-800">
            <div className="mb-8">
                <Link
                    href="/interview-prep/digital-design"
                    className="inline-flex items-center text-amber-600 hover:text-amber-800 transition-colors mb-4 font-medium"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Curriculum
                </Link>
            </div>

            <h1 className="text-5xl font-extrabold text-gray-900 mb-8 tracking-tight">
                Binary Coded Decimal (BCD)
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                We humans love Decimal (0-9). Computers love Binary (0-1). <strong>BCD</strong> is the compromise: we force the computer to think in decimal digits by assigning a fixed 4-bit code to each digit. It's inefficient for storage, but perfect for interfacing with digital clocks, calculators, and financial systems.
            </p>

            {/* --- Section 1: What is BCD? --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Grid className="w-8 h-8 text-blue-600" />
                1. The 8421 Code
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-12">
                <p className="text-gray-700 mb-6 text-lg">
                    In BCD (specifically 8421 BCD), we replace each <strong>Decimal Digit</strong> with its corresponding <strong>4-bit Binary Nibble</strong> widely known as "8421" weight.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Example: $45_{10}$</h3>
                        <div className="flex justify-around text-center">
                            <div>
                                <span className="block text-4xl font-bold text-blue-600 mb-2">4</span>
                                <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">0100</span>
                            </div>
                            <div>
                                <span className="block text-4xl font-bold text-blue-600 mb-2">5</span>
                                <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">0101</span>
                            </div>
                        </div>
                        <div className="mt-4 text-center font-mono text-gray-600 font-bold">
                            Result: 0100 0101<sub>BCD</sub>
                        </div>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
                            <div>
                                <h4 className="font-bold text-amber-900">Why 8421?</h4>
                                <p className="text-sm text-amber-800 mt-1">
                                    Because the weights of the positions are $2^3, 2^2, 2^1, 2^0$ i.e., 8-4-2-1. There are other codes (Excess-3, Gray), but 8421 is the standard.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BCDVsBinaryVisualizer />

            {/* --- Section 2: Invalid Codes --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-16 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-red-500" />
                2. The "Invalid" Codes
            </h2>
            <div className="bg-red-50 p-6 rounded-2xl border border-red-200 mb-12">
                <p className="text-red-900 mb-4">
                    A 4-bit nibble can represent 16 values (0-15). Decimal only uses 10 (0-9). The remaining 6 codes are <strong>Forbidden</strong> in BCD.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-center text-sm font-mono font-bold text-red-700">
                    <span className="bg-white p-2 rounded border border-red-200">1010 (10)</span>
                    <span className="bg-white p-2 rounded border border-red-200">1011 (11)</span>
                    <span className="bg-white p-2 rounded border border-red-200">1100 (12)</span>
                    <span className="bg-white p-2 rounded border border-red-200">1101 (13)</span>
                    <span className="bg-white p-2 rounded border border-red-200">1110 (14)</span>
                    <span className="bg-white p-2 rounded border border-red-200">1111 (15)</span>
                </div>
                <p className="text-xs text-red-600 mt-4 italic text-center">
                    If your circuit produces one of these, you have an error!
                </p>
            </div>

            {/* --- Section 3: BCD Addition --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-green-600" />
                3. BCD Addition (The "Add 6" Rule)
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-12">
                <p className="text-gray-700 mb-4 text-lg">
                    Adding BCD numbers works like binary addition, with one catch: if a nibble sum exceeds 9 (or produces a carry), it becomes an invalid code.
                </p>

                <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                    <h4 className="font-bold text-green-900 flex items-center gap-2 mb-3">
                        <PlayCircle className="w-5 h-5" /> The Fix: Add 6 (0110)
                    </h4>
                    <p className="text-green-800 text-sm mb-4">
                        We add 6 because we need to skip the 6 invalid states to wrap around correctly to the next decimal digit.
                    </p>

                    <div className="font-mono bg-gray-900 text-white p-4 rounded-lg text-sm md:text-base leading-relaxed">
                        <div>Example: 5 + 8 = 13 (Invalid BCD)</div>
                        <div className="h-px bg-gray-700 my-2"></div>
                        <div className="flex gap-4">
                            <span>0101 (5)</span>
                        </div>
                        <div className="flex gap-4">
                            <span>+ 1000 (8)</span>
                        </div>
                        <div className="flex gap-4 text-gray-400">
                            <span>1101 (13) &rarr; INVALID! (&gt;9)</span>
                        </div>
                        <div className="flex gap-4 text-green-400 font-bold">
                            <span>+ 0110 (Correction: Add 6)</span>
                        </div>
                        <div className="h-px bg-gray-700 w-32 my-1"></div>
                        <div className="flex gap-4">
                            <span>1 0011 (1 carry, 3 remainder) &rarr; 13</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Pro Tip Section --- */}
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-12">
                <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                    🚀 Pro Tip: Where is this used?
                </h3>
                <p className="text-amber-800 text-sm">
                    Financial systems (like banks) often use BCD or Fixed-Point Decimal math instead of Floating Point (binary) to avoid rounding errors like 0.1 + 0.2 = 0.300000004. BCD is precise for currency.
                </p>
            </div>

            <SubtopicNav
                prev={
                    prev
                        ? { title: prev.title, href: `/interview-prep/digital-design/${prev.slug}` }
                        : null
                }
                next={
                    next
                        ? { title: next.title, href: `/interview-prep/digital-design/${next.slug}` }
                        : null
                }
            />
        </div>
    );
}
