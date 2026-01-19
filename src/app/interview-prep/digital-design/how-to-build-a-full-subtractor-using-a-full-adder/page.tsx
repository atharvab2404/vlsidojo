import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Box, Minimize2, ArrowRightLeft } from "lucide-react";
import SubtractorVisualizer from "./SubtractorVisualizer";

export default function Page() {
    const currentSlug = "how-to-build-a-full-subtractor-using-a-full-adder";
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
                How to Build a Subtractor
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Design interviewers often ask: "Design a circuit to subtract two 4-bit numbers".
                <br />
                <strong>Do NOT</strong> start drawing Truth Tables for a "Full Subtractor".
                <br />
                The professional answer is: <strong>Reuse the Adder!</strong>
            </p>

            {/* --- Section 1: The Concept --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <ArrowRightLeft className="w-8 h-8 text-indigo-600" />
                    1. The 2's Complement Trick
                </h2>

                {/* --- Section 0.5: Half Subtractor Theory --- */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-12">
                    <p className="text-gray-700 mb-6">
                        Before using the Adder trick, it's worth knowing the basics of a <strong>Half Subtractor</strong> (subtracting two 1-bit numbers).
                    </p>
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <table className="w-full text-center text-sm border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
                            <thead className="bg-gray-100 uppercase text-xs text-gray-500 font-bold">
                                <tr><th className="p-3">A</th><th className="p-3">B</th><th className="p-3 text-indigo-600">Diff (D)</th><th className="p-3 text-rose-600">Borrow (B<sub>out</sub>)</th></tr>
                            </thead>
                            <tbody className="font-mono text-gray-700">
                                <tr><td className="p-2 border-b">0</td><td className="p-2 border-b">0</td><td className="p-2 border-b bg-indigo-50/50">0</td><td className="p-2 border-b bg-rose-50/50">0</td></tr>
                                <tr><td className="p-2 border-b">0</td><td className="p-2 border-b">1</td><td className="p-2 border-b bg-indigo-50 font-bold">1</td><td className="p-2 border-b bg-rose-50 font-bold">1</td></tr>
                                <tr><td className="p-2 border-b">1</td><td className="p-2 border-b">0</td><td className="p-2 border-b bg-indigo-50 font-bold">1</td><td className="p-2 border-b bg-rose-50/50">0</td></tr>
                                <tr><td className="p-2 border-b">1</td><td className="p-2 border-b">1</td><td className="p-2 border-b bg-indigo-50/50">0</td><td className="p-2 border-b bg-rose-50/50">0</td></tr>
                            </tbody>
                        </table>
                        <div>
                            <h4 className="font-bold text-gray-800 mb-2">Equations</h4>
                            <ul className="space-y-2 text-sm text-gray-600 font-mono">
                                <li>Diff   = A ⊕ B</li>
                                <li>Borrow = (~A) • B</li>
                            </ul>
                            <p className="text-xs text-gray-400 mt-4 italic">
                                *Notice Borrow is high ONLY when we subtract 1 from 0 (0-1).
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <ArrowRightLeft className="w-8 h-8 text-indigo-600" />
                        2. The 2's Complement Trick
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-6 font-lg">
                        We know that: <strong>A - B</strong> is the same as <strong>A + (-B)</strong>.
                        <br />
                        In Digital Logic, <strong>-B</strong> is represented by the <strong>2's Complement</strong> of B.
                    </p>
                    <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r mb-6">
                        <h4 className="font-bold text-indigo-900 mb-1">To get 2's Complement:</h4>
                        <ol className="list-decimal pl-5 text-indigo-800 font-medium">
                            <li>Invert all bits of B (1's Complement)</li>
                            <li>Add 1</li>
                        </ol>
                    </div>
                </div>
            </div>

            {/* --- Section 2: Implementation --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Box className="w-8 h-8 text-emerald-600" />
                    2. The Circuit Implementation
                </h2>
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 mb-8">
                    <h3 className="font-bold text-emerald-900 mb-2">Example: 5 - 3 = 2</h3>
                    <div className="font-mono text-sm space-y-1 text-emerald-800">
                        <div>  A = 0101 (5)</div>
                        <div>  B = 0011 (3)</div>
                        <div className="border-t border-emerald-200 pt-1 mt-1">
                            1. Invert B: 1100
                            <br />
                            2. Add 1 (Cin): 1101 (-3 in 2's comp)
                            <br />
                            3. Add A + (-B): 0101 + 1101 = <strong>10010</strong>
                        </div>
                        <div className="pt-2 text-xs text-emerald-600">
                            Discard the carry (1). The 4-bit result is <strong>0010</strong> (2). It works!
                        </div>
                    </div>
                </div>

                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                    <p className="text-emerald-900 mb-4">
                        We can modify a standard 4-bit Adder into a Subtractor with two tiny changes:
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-emerald-800">
                            <span className="font-bold bg-white px-2 rounded">1</span>
                            Use <strong>XOR Gates</strong> on the B inputs. XOR acts as a controlled inverter. If Control=1, B is inverted.
                        </li>
                        <li className="flex items-start gap-2 text-emerald-800">
                            <span className="font-bold bg-white px-2 rounded">2</span>
                            Set the initial Carry In (<strong>C<sub>in</sub></strong>) to <strong>1</strong> (this provides the "Add 1" step!).
                        </li>
                    </ul>
                </div>
            </div>

            {/* --- Section 3: Visualizer --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Adder / Subtractor Visualizer
            </h2>
            <p className="text-gray-600 mb-4">
                Toggle the switch below to transform the circuit from Adder (A+B) to Subtractor (A-B). Notice how the B inputs flip and Cin becomes 1.
            </p>

            <SubtractorVisualizer />

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
