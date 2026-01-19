import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Hash, Cpu, Grid, Layers, Calculator, Info } from "lucide-react";
import RadixVisualizer from "./RadixVisualizer";

export default function Page() {
    const currentSlug = "number-systems-explained-binary-octal-and-hexadecimal";
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
                Number Systems Explained
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                We count in <strong>Decimal</strong> (Base 10) because we have ten fingers. Computers use <strong>Binary</strong> (Base 2) because they have switches (on/off). But what about Hexadecimal and Octal? They aren't new languages—they are just highly efficient <em>shorthands</em> for Binary.
            </p>

            {/* --- Section 1: The Concept of Radix --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Hash className="w-8 h-8 text-amber-500" />
                1. The Core Concept: Radix (Base)
            </h2>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm mb-12">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    A number system is defined by its <strong>Radix</strong> (or Base), denoted as <em>r</em>. The radix tells us two things:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <li className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                        <span className="font-bold text-amber-800 block mb-2">1. Number of Unique Digits</span>
                        <span className="text-gray-700">The system has <em>r</em> unique symbols (digits) ranging from 0 to <em>r-1</em>.</span>
                    </li>
                    <li className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <span className="font-bold text-blue-800 block mb-2">2. Weight of Positions</span>
                        <span className="text-gray-700">Each position represents a power of <em>r</em>. Moving left multiplies the value by <em>r</em>.</span>
                    </li>
                </ul>

                <div className="bg-gray-900 text-gray-100 p-6 rounded-xl font-mono text-sm overflow-x-auto">
                    <p className="mb-2 text-gray-400">// Generalized Positional Notation Formula</p>
                    <p className="text-lg">Value = d<sub>n-1</sub>×r<sup>n-1</sup> + ... + d<sub>1</sub>×r<sup>1</sup> + d<sub>0</sub>×r<sup>0</sup> + d<sub>-1</sub>×r<sup>-1</sup> ...</p>
                </div>
            </div>

            {/* --- Section 2: Visualizing Powers --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-amber-500" />
                2. Visualizing the Math
            </h2>

            <p className="text-gray-600 mb-6 text-lg">
                Try entering numbers below to see how they break down into powers of their base.
            </p>

            <RadixVisualizer />

            {/* --- Section 3: The Big Three --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Cpu className="w-8 h-8 text-amber-500" />
                    3. The "Big Three" Computer Systems
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Binary */}
                    <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                        <h3 className="text-xl font-bold text-amber-900 mb-2">Binary (Base 2)</h3>
                        <p className="text-sm text-amber-800 mb-4 font-mono">Digits: 0, 1</p>
                        <p className="text-gray-700 text-sm">
                            The native language of hardware. Every wire is either High (1) or Low (0).
                        </p>
                    </div>

                    {/* Octal */}
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                        <h3 className="text-xl font-bold text-blue-900 mb-2">Octal (Base 8)</h3>
                        <p className="text-sm text-blue-800 mb-4 font-mono">Digits: 0-7</p>
                        <p className="text-gray-700 text-sm">
                            <strong>Grouping:</strong> 3 binary bits = 1 Octal digit. Used in older computing (Unix permissions `chmod 777`).
                        </p>
                    </div>

                    {/* Hexadecimal */}
                    <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                        <h3 className="text-xl font-bold text-purple-900 mb-2">Hex (Base 16)</h3>
                        <p className="text-sm text-purple-800 mb-4 font-mono">Digits: 0-9, A-F</p>
                        <p className="text-gray-700 text-sm">
                            <strong>Grouping:</strong> 4 binary bits = 1 Hex digit. The standard for memory addresses and colors (`#FF5733`).
                        </p>
                    </div>
                </div>
                <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-600 text-sm flex items-center gap-3">
                    <Info className="w-5 h-5 text-gray-400" />
                    <p><strong>Note:</strong> Hexadecimal uses A=10, B=11, C=12, D=13, E=14, F=15. It essentially packs 4 bits into a single character.</p>
                </div>
            </div>

            {/* --- Section 4: Comparison Table --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Grid className="w-8 h-8 text-amber-500" />
                4. Quick Reference Chart
            </h2>

            <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm mb-16">
                <table className="w-full text-center border-collapse">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-200 text-gray-700">
                            <th className="py-3 px-4">Decimal</th>
                            <th className="py-3 px-4 bg-amber-50 text-amber-900">Binary (4-bit)</th>
                            <th className="py-3 px-4 text-blue-900">Octal</th>
                            <th className="py-3 px-4 bg-purple-50 text-purple-900">Hexadecimal</th>
                        </tr>
                    </thead>
                    <tbody className="font-mono text-gray-600 divide-y divide-gray-100">
                        {[...Array(16)].map((_, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                                <td className="py-2">{i}</td>
                                <td className="py-2 bg-amber-50/30 text-amber-800 font-bold">
                                    {i.toString(2).padStart(4, '0')}
                                </td>
                                <td className="py-2 text-blue-800">{i.toString(8)}</td>
                                <td className="py-2 bg-purple-50/30 text-purple-800">{i.toString(16).toUpperCase()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
