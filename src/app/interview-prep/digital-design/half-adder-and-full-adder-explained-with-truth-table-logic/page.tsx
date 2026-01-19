import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Calculator, Plus, Unplug, BookOpen } from "lucide-react";
import AdderVisualizer from "./AdderVisualizer";

export default function Page() {
    const currentSlug = "half-adder-and-full-adder-explained-with-truth-table-logic";
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
                Half Adder & Full Adder
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Addition is the most fundamental arithmetic operation in a processor. But how do we teach a computer to add using only 0s and 1s? We start by understanding the rules of <strong>Binary Addition</strong> and then build circuits to implement them.
            </p>

            {/* --- Section 0: The Rules of Binary Addition --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                    1. The Rules of Binary Addition
                </h2>
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <p className="text-gray-700 mb-4 text-lg">
                        Just like decimal addition, binary addition follows simple rules. The catch is when we reach "2" (which is <code>10</code> in binary), we produce a <strong>Sum</strong> of 0 and a <strong>Carry</strong> of 1.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-mono text-lg font-bold">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-200">
                            0 + 0 = 0
                            <div className="text-xs text-gray-400 font-sans mt-2">Sum=0, Carry=0</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-200">
                            0 + 1 = 1
                            <div className="text-xs text-gray-400 font-sans mt-2">Sum=1, Carry=0</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-200">
                            1 + 0 = 1
                            <div className="text-xs text-gray-400 font-sans mt-2">Sum=1, Carry=0</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-amber-200 ring-2 ring-amber-100">
                            1 + 1 = 10
                            <div className="text-xs text-amber-600 font-sans mt-2">Sum=0, Carry=1</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Section 1: The Half Adder --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Plus className="w-8 h-8 text-indigo-600" />
                2. The Half Adder
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-12">
                <p className="text-gray-700 leading-relaxed mb-6">
                    A <strong>Half Adder</strong> is a combinational circuit that implements the simple rules above. It takes two inputs (A, B) and produces two outputs (Sum, Carry).
                </p>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div>
                        {/* Static Truth Table */}
                        <table className="w-full text-center text-sm border-collapse mb-4">
                            <thead className="bg-indigo-50">
                                <tr><th className="p-2 border border-indigo-100">A</th><th className="p-2 border border-indigo-100">B</th><th className="p-2 border border-indigo-100">Sum (S)</th><th className="p-2 border border-indigo-100">Carry (C)</th></tr>
                            </thead>
                            <tbody className="font-mono text-gray-600">
                                <tr><td className="p-2 border">0</td><td className="p-2 border">0</td><td className="p-2 border bg-gray-50">0</td><td className="p-2 border bg-gray-50">0</td></tr>
                                <tr><td className="p-2 border">0</td><td className="p-2 border">1</td><td className="p-2 border bg-indigo-50 font-bold">1</td><td className="p-2 border bg-gray-50">0</td></tr>
                                <tr><td className="p-2 border">1</td><td className="p-2 border">0</td><td className="p-2 border bg-indigo-50 font-bold">1</td><td className="p-2 border bg-gray-50">0</td></tr>
                                <tr><td className="p-2 border">1</td><td className="p-2 border">1</td><td className="p-2 border bg-gray-50">0</td><td className="p-2 border bg-amber-50 font-bold">1</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 mb-2">Gate Logic</h4>
                        <p className="text-gray-600 mb-4 text-sm">
                            If you look at the columns:
                            <br />• <strong>Sum</strong> is high when inputs are different → <strong>XOR</strong> gate (A ⊕ B).
                            <br />• <strong>Carry</strong> is high only when both are 1 → <strong>AND</strong> gate (A • B).
                        </p>
                        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 flex items-start gap-3">
                            <Unplug className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                            <p className="text-sm text-amber-800">
                                <strong>Limitation:</strong> It has no input for a "Carry In". This means you cannot chain two Half Adders together to add multi-bit numbers (e.g., the 2nd bit of 11 + 01 needs to accept the carry from the 1st bit).
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Section 2: The Full Adder --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-emerald-600" />
                3. The Full Adder
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-8">
                <p className="text-gray-700 leading-relaxed mb-4">
                    The <strong>Full Adder</strong> solves the limitation by adding <em>three</em> bits: <strong>A</strong>, <strong>B</strong>, and <strong>C<sub>in</sub></strong> (Carry In). This allows it to serve as a building block for larger adders.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-bold text-gray-800 mb-2">Logic Equations</h4>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 font-mono text-sm">
                            <li>Sum   = A ⊕ B ⊕ C<sub>in</sub></li>
                            <li>Carry = AB + BC<sub>in</sub> + AC<sub>in</sub></li>
                        </ul>
                        <p className="text-xs text-gray-400 mt-4 italic">
                            *Carry is often implemented as Majority Vote logic.
                        </p>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                        <p className="text-sm text-indigo-800">
                            <strong>Construction:</strong> You can build 1 Full Adder using <strong>2 Half Adders</strong> and an <strong>OR gate</strong>.
                            <br /><br />
                            1. HA1 adds A and B → partial sum & carry.
                            <br />
                            2. HA2 adds Partial Sum and C<sub>in</sub>.
                            <br />
                            3. OR gate combines the carries.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- Section 3: Interactive Visualizer --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                4. Logic Simulation
            </h2>
            <p className="text-gray-600 mb-8">
                Toggle between Half and Full modes below. Try setting A=1, B=1 in Half Adder mode to see the Carry generated. Then try Full Adder mode to see how C<sub>in</sub> affects the result.
            </p>

            <AdderVisualizer />

            <div className="mt-16 bg-gray-50 p-8 rounded-3xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What comes next?</h3>
                <p className="text-gray-700 text-lg">
                    By chaining <strong>N</strong> Full Adders together (connecting C<sub>out</sub> to C<sub>in</sub>), we create an <strong>N-bit Ripple Carry Adder</strong>. This is how basic ALUs behave!
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
