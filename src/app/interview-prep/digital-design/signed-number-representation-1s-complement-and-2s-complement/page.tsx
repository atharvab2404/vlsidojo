import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Binary, Scale, RefreshCw, AlertTriangle, CheckCircle2 } from "lucide-react";
import SignedFormatVisualizer from "./SignedFormatVisualizer";

export default function Page() {
    const currentSlug = "signed-number-representation-1-s-complement-and-2-s-complement";
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
                Signed Number Representation
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Computers only understand 0s and 1s. So how do we represent <strong>negative numbers</strong>? Over history, engineers tried three main methods. Only one (2's Complement) survived to become the modern standard.
            </p>

            {/* --- Method 1: Sign-Magnitude --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Binary className="w-8 h-8 text-purple-600" />
                    1. Sign-Magnitude
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <p className="text-gray-700 mb-4">
                        The most intuitive approach: use the <strong>Most Significant Bit (MSB)</strong> as the sign (0 = +, 1 = -) and the rest as magnitude.
                    </p>
                    <div className="flex gap-4 font-mono text-lg bg-gray-50 p-4 rounded-lg overflow-x-auto">
                        <div>
                            <span className="text-green-600 font-bold">+5</span> = <span className="text-red-500 font-bold">0</span>000 0101
                        </div>
                        <div className="border-l border-gray-300 pl-4">
                            <span className="text-red-600 font-bold">-5</span> = <span className="text-red-500 font-bold">1</span>000 0101
                        </div>
                    </div>
                    <div className="mt-4 flex items-start gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                        <AlertTriangle className="w-5 h-5 shrink-0" />
                        <p><strong>The Fatal Flaw:</strong> It has two zeros (+0 and -0). This complicates circuit design significantly.</p>
                    </div>
                </div>
            </div>

            {/* --- Method 2: 1's Complement --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <RefreshCw className="w-8 h-8 text-blue-600" />
                    2. 1's Complement
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <p className="text-gray-700 mb-4">
                        To get negative $N$, simply <strong>invert every bit</strong> of positive $N$.
                    </p>
                    <div className="flex gap-4 font-mono text-lg bg-gray-50 p-4 rounded-lg overflow-x-auto">
                        <div>
                            <span className="text-green-600 font-bold">+5</span> = 0000 0101
                        </div>
                        <div className="border-l border-gray-300 pl-4">
                            <span className="text-red-600 font-bold">-5</span> = 1111 1010
                        </div>
                    </div>
                    <div className="mt-4 flex items-start gap-2 text-sm text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-100">
                        <AlertTriangle className="w-5 h-5 shrink-0" />
                        <p><strong>The Issue:</strong> still has two zeros ($0000...$ and $1111...$).</p>
                    </div>
                </div>
            </div>

            {/* --- Method 3: 2's Complement --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Scale className="w-8 h-8 text-amber-500" />
                    3. 2's Complement (The Standard)
                </h2>
                <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-200 shadow-sm">
                    <p className="text-gray-700 mb-4">
                        How do we fix the "two zeros" problem? Simplest way: shift the negative number wheel by one.
                    </p>
                    <div className="bg-white/80 p-4 rounded-xl border border-amber-100 text-center mb-6">
                        <p className="text-lg font-bold text-amber-900">
                            2's Complement = 1's Complement + 1
                        </p>
                        <p className="text-sm text-gray-500 mt-1">("Invert bits, then add 1")</p>
                    </div>

                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                            <span className="text-gray-700"><strong>Single Zero:</strong> 0 is uniquely $0000...$</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                            <span className="text-gray-700"><strong>Efficient Math:</strong> Checking $A - B$ is just $A + (-B)$. No separate subtraction logic needed!</span>
                        </li>
                    </ul>
                </div>
            </div>

            <SignedFormatVisualizer />

            {/* --- Comparison Table --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-16 flex items-center gap-3">
                <Binary className="w-8 h-8 text-gray-700" />
                System Comparison
            </h2>
            <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm mb-12">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                        <tr>
                            <th className="p-4 border-b">Feature</th>
                            <th className="p-4 border-b">Sign-Magnitude</th>
                            <th className="p-4 border-b">1's Complement</th>
                            <th className="p-4 border-b bg-amber-100 text-amber-900">2's Complement</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700">
                        <tr className="hover:bg-gray-50">
                            <td className="p-4 font-semibold text-gray-900">Range (n-bit)</td>
                            <td className="p-4 font-mono text-sm">-(2<sup>n-1</sup>-1) to +(2<sup>n-1</sup>-1)</td>
                            <td className="p-4 font-mono text-sm">-(2<sup>n-1</sup>-1) to +(2<sup>n-1</sup>-1)</td>
                            <td className="p-4 font-mono text-sm font-bold bg-amber-50">-(2<sup>n-1</sup>) to +(2<sup>n-1</sup>-1)</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="p-4 font-semibold text-gray-900">Zeros</td>
                            <td className="p-4 text-red-600">Two (+0, -0)</td>
                            <td className="p-4 text-red-600">Two (+0, -0)</td>
                            <td className="p-4 text-green-600 font-bold bg-amber-50">One (0)</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="p-4 font-semibold text-gray-900">Arithmetic</td>
                            <td className="p-4 text-sm">Complex (sign checks needed)</td>
                            <td className="p-4 text-sm">End-around carry needed</td>
                            <td className="p-4 text-sm bg-amber-50">Simple binary addition</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* --- Pro Tip Section --- */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-12">
                <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                    🚀 Pro Tip: The "Fast" 2's Complement Trick
                </h3>
                <p className="text-blue-800 mb-2 text-sm">
                    You don't need to invert and add 1 in your head. Try this:
                </p>
                <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1 ml-2">
                    <li>Start from the rightmost bit (LSB).</li>
                    <li>Keep bits the <strong>same</strong> until you hit the first '1'.</li>
                    <li>Keep that first '1' as is.</li>
                    <li><strong>Flip</strong> every bit after that (to the left).</li>
                </ol>
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
