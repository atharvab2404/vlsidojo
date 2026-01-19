import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Binary, AlertTriangle, FileInput, Cpu } from "lucide-react";
import PriorityEncoderVisualizer from "./PriorityEncoderVisualizer";

export default function Page() {
    const currentSlug = "what-is-an-encoder-priority-encoder-vs-binary-encoder";
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
                What is an Encoder?
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                In digital electronics, an <strong>Encoder</strong> is a combinational circuit that performs the reverse operation of a Decoder. It has <strong>2<sup>N</sup></strong> input lines and <strong>N</strong> output lines. Its job is to "compress" active input signals into a compact binary code.
            </p>

            {/* --- Section 1: Standard Binary Encoder --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Cpu className="w-8 h-8 text-blue-600" />
                    1. The Standard Binary Encoder
                </h2>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4">How it works</h3>
                        <p className="text-gray-600 mb-4">
                            Imagine you have a calculator keypad with 10 buttons (0-9). The CPU doesn't want 10 separate wires. It wants a 4-bit binary number representing the key pressed.
                        </p>
                        <ul className="space-y-2 text-gray-600">
                            <li>• <strong>Inputs:</strong> Only one input line is active (HIGH) at a time (One-Hot).</li>
                            <li>• <strong>Outputs:</strong> The binary representation of the indices of the active input.</li>
                        </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                        <h3 className="font-bold text-gray-500 mb-4 text-xs tracking-wider uppercase text-center">4:2 Binary Encoder Truth Table</h3>
                        <table className="w-full text-center text-sm">
                            <thead>
                                <tr className="border-b border-gray-300">
                                    <th className="py-2 text-gray-400">D3</th>
                                    <th className="py-2 text-gray-400">D2</th>
                                    <th className="py-2 text-gray-400">D1</th>
                                    <th className="py-2 text-gray-400">D0</th>
                                    <th className="py-2 border-l border-gray-300 text-indigo-600">Y1</th>
                                    <th className="py-2 text-indigo-600">Y0</th>
                                </tr>
                            </thead>
                            <tbody className="font-mono">
                                <tr><td>0</td><td>0</td><td>0</td><td>1</td><td className="border-l border-gray-200">0</td><td>0</td></tr>
                                <tr><td>0</td><td>0</td><td>1</td><td>0</td><td className="border-l border-gray-200">0</td><td>1</td></tr>
                                <tr><td>0</td><td>1</td><td>0</td><td>0</td><td className="border-l border-gray-200">1</td><td>0</td></tr>
                                <tr><td>1</td><td>0</td><td>0</td><td>0</td><td className="border-l border-gray-200">1</td><td>1</td></tr>
                            </tbody>
                        </table>
                        <p className="mt-4 text-xs text-center text-gray-500">
                            <strong>Logic Equations:</strong><br />
                            Y1 = D2 + D3<br />
                            Y0 = D1 + D3
                        </p>
                    </div>
                </div>
            </div>

            {/* --- Section 2: The Problem --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-amber-500" />
                2. The Problem with Standard Encoders
            </h2>
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 mb-12">
                <p className="text-amber-900 mb-4">
                    The standard approach has a fatal flaw: <strong>Ambiguity</strong>.
                </p>
                <p className="text-amber-800">
                    What happens if you press <strong>Key 1</strong> and <strong>Key 2</strong> at the exact same time?
                    <br />
                    The simplified logic (Y<sub>1</sub> = D<sub>2</sub> + D<sub>3</sub>, Y<sub>0</sub> = D<sub>1</sub> + D<sub>3</sub>) would behave unpredictably or output a meaningless code. Standard encoders <strong>cannot handle multiple active inputs</strong>.
                </p>
            </div>

            {/* --- Section 3: Priority Encoder Solution --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Binary className="w-8 h-8 text-indigo-600" />
                3. The Solution: Priority Encoder
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-8">
                <p className="text-gray-700 leading-relaxed mb-4">
                    A <strong>Priority Encoder</strong> is a smarter circuit. It assigns a "rank" to every input. If multiple inputs are high, it looks only at the one with the <strong>Highest Priority</strong> and ignores the rest.
                </p>
                <div className="flex gap-4 items-center bg-indigo-50 p-4 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    <p className="text-sm text-indigo-900">
                        <strong>Example:</strong> If D3 and D1 are both pressed, the output will represent <strong>3</strong> (Binary 11) because 3 &gt; 1.
                    </p>
                </div>
            </div>

            <p className="text-gray-700 mb-8 text-lg">
                Try it yourself below. See how the <strong>Live Truth Table</strong> handles the conflicts cleanly using "Don't Care" (X) conditions.
            </p>

            <PriorityEncoderVisualizer />

            <div className="mt-16 bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="text-lg font-bold text-blue-900 mb-2">Interview Concept: The "Valid" Bit</h3>
                <p className="text-blue-800">
                    Notice the <strong>V</strong> output? That's the "Valid" bit.
                    <br />
                    In a standard binary code, output <code>00</code> could mean "Input 0 is active" OR "Nothing is active". The Valid bit disambiguates this:
                    <br />
                    • V=1, Y=00 → Key 0 pressed.
                    <br />
                    • V=0, Y=00 → No keys pressed.
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
