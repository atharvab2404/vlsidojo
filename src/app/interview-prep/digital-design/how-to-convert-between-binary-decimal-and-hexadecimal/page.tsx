import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, RefreshCw, Calculator, Layers, ArrowRight, Grid, Divide } from "lucide-react";
import StepByStepConverter from "./StepByStepConverter";

export default function Page() {
    const currentSlug = "how-to-convert-between-binary-decimal-and-hexadecimal";
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
                Conversions: Binary, Decimal & Hex
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Mastering conversions isn't just for passing exams—it's a daily skill for digital designers. You need to look at a Hex code like <code>0xF</code> and instantly see <code>1111</code> (Binary) or <code>15</code> (Decimal). Here are the three canonical methods.
            </p>

            {/* --- Method 1: Decimal to Any Base (Repeated Division) --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Divide className="w-8 h-8 text-blue-600" />
                1. Decimal to Any Base: Repeated Division
            </h2>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 mb-8">
                <h3 className="text-lg font-bold text-blue-900 mb-2">The Algorithm</h3>
                <p className="text-gray-700 mb-4">
                    To convert an integer from Decimal to Base-r:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-2">
                    <li>Divide the number by the target base <strong>r</strong>.</li>
                    <li>Record the <strong>remainder</strong>.</li>
                    <li>Use the <strong>quotient</strong> as the new number.</li>
                    <li>Repeat until the quotient is 0.</li>
                    <li>The result is the remainders written in <strong>reverse order</strong> (bottom to top).</li>
                </ol>
            </div>

            {/* Interactive Visualizer */}
            <div className="mb-12">
                <StepByStepConverter />
            </div>

            {/* --- Method 2: Any Base to Decimal (Weighted Sum) --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-amber-500" />
                2. Any Base to Decimal: Weighted Sum
            </h2>

            <p className="text-lg text-gray-700 mb-6">
                This is simply expanding the positional notation. Multiply each digit by its weight (power of the base) and sum them up.
            </p>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Example: Convert Hex `2C` to Decimal</h3>
                <div className="font-mono text-lg bg-gray-50 p-4 rounded-lg text-center">
                    <span className="text-gray-500">(2 × 16<sup>1</sup>) + (C × 16<sup>0</sup>)</span>
                    <br />
                    <span className="text-gray-400">↓</span>
                    <br />
                    <span>(2 × 16) + (12 × 1)</span>
                    <br />
                    <span className="text-gray-400">↓</span>
                    <br />
                    <span className="font-bold text-xl text-blue-600">32 + 12 = 44</span>
                </div>
            </div>

            {/* --- Method 3: The Grouping Shortcut --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Grid className="w-8 h-8 text-purple-600" />
                3. Binary ↔ Hex/Octal (The Shortcut)
            </h2>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100 mb-12">
                <p className="text-lg text-gray-800 mb-6">
                    Since $16 = 2^4$ and $8 = 2^3$, we can group bits directly without going through decimal. This is how engineers actually do it.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-5 rounded-xl shadow-sm">
                        <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                            <Layers className="w-4 h-4" /> Hexadecimal (Groups of 4)
                        </h4>
                        <p className="text-sm text-gray-600 mb-4">
                            Group bits from <strong>LSB (right) to MSB (left)</strong> in chunks of 4.
                        </p>
                        <div className="font-mono text-center bg-gray-900 text-white p-3 rounded-lg">
                            1011 0101<sub>2</sub>
                            <br />
                            <div className="flex justify-center gap-4 my-1 text-xs text-gray-400">
                                <span>1011</span><span>0101</span>
                            </div>
                            <div className="flex justify-center gap-4 font-bold text-amber-400">
                                <span>B</span><span>5</span>
                            </div>
                            <div className="mt-2 text-white border-t border-gray-700 pt-2">
                                = 0xB5
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm">
                        <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                            <Layers className="w-4 h-4" /> Octal (Groups of 3)
                        </h4>
                        <p className="text-sm text-gray-600 mb-4">
                            Group bits from <strong>LSB (right) to MSB (left)</strong> in chunks of 3.
                        </p>
                        <div className="font-mono text-center bg-gray-900 text-white p-3 rounded-lg">
                            10 110 101<sub>2</sub>
                            <br />
                            <div className="flex justify-center gap-2 my-1 text-xs text-gray-400">
                                <span>010</span><span>110</span><span>101</span>
                            </div>
                            <div className="flex justify-center gap-2 font-bold text-blue-400">
                                <span>2</span><span>6</span><span>5</span>
                            </div>
                            <div className="mt-2 text-white border-t border-gray-700 pt-2">
                                = 265<sub>8</sub>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Pro Tip Section --- */}
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-12">
                <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                    🚀 Pro Tip: Memorize the Powers
                </h3>
                <p className="text-amber-800 mb-4 text-sm">
                    Knowing your powers of 2 makes "Weighted Sum" conversions mental math.
                </p>
                <div className="flex flex-wrap gap-2 font-mono text-xs text-amber-900">
                    <span className="bg-amber-100 px-2 py-1 rounded">2<sup>0</sup>=1</span>
                    <span className="bg-amber-100 px-2 py-1 rounded">2<sup>1</sup>=2</span>
                    <span className="bg-amber-100 px-2 py-1 rounded">2<sup>2</sup>=4</span>
                    <span className="bg-amber-100 px-2 py-1 rounded">2<sup>3</sup>=8</span>
                    <span className="bg-amber-100 px-2 py-1 rounded">2<sup>4</sup>=16</span>
                    <span className="bg-amber-100 px-2 py-1 rounded">2<sup>5</sup>=32</span>
                    <span className="bg-amber-100 px-2 py-1 rounded">2<sup>6</sup>=64</span>
                    <span className="bg-amber-100 px-2 py-1 rounded">2<sup>7</sup>=128</span>
                    <span className="bg-amber-100 px-2 py-1 rounded">2<sup>8</sup>=256</span>
                    <span className="bg-amber-100 px-2 py-1 rounded">2<sup>10</sup>=1024 (1K)</span>
                </div>
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
