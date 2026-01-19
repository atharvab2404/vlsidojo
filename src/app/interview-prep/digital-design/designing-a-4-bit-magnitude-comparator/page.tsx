import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Scale, GitCompare } from "lucide-react";
import ComparatorVisualizer from "./ComparatorVisualizer";

export default function Page() {
    const currentSlug = "designing-a-4-bit-magnitude-comparator";
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
                Magnitude Comparator
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                A <strong>Magnitude Comparator</strong> is a combinational circuit that compares two numbers (<strong>A</strong> and <strong>B</strong>) and determines their relative size: Is A &gt; B, A &lt; B, or A = B?
            </p>

            {/* --- Section 1: The Logic --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Scale className="w-8 h-8 text-purple-600" />
                    1. How to Compare?
                </h2>
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Think about how humans compare numbers like <strong>723</strong> and <strong>751</strong>.
                        We don't look at the last digit first. We look at the <strong>Most Significant Digit</strong> (Hundreds place).
                        <br />
                        • 7 vs 7 (Equal, keep checking)
                        <br />
                        • 2 vs 5 (2 is less, so 723 &lt; 751. Stop!)
                    </p>
                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                        <h4 className="font-bold text-purple-900 mb-2">Algorithm for Digital Logic</h4>
                        <ol className="list-decimal pl-5 text-purple-800 space-y-2">
                            <li>Check MSB (Bit N-1). If different, the one with '1' is greater.</li>
                            <li>If equal, check the next bit (N-2).</li>
                            <li>Repeat until you find a difference or run out of bits (Equal).</li>
                        </ol>
                    </div>
                </div>
            </div>



            {/* --- Section 2: Logic Equations --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <GitCompare className="w-8 h-8 text-indigo-600" />
                    2. Logic Equations for One Bit
                </h2>
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <p className="text-gray-700 mb-6">
                        If we only had 1 bit (A vs B), the logic is simple:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-sm">
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <div className="font-bold text-indigo-600 mb-2">A &gt; B</div>
                            <div>A = 1, B = 0</div>
                            <div className="mt-2 text-gray-500">Y = A • (~B)</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <div className="font-bold text-emerald-600 mb-2">A &lt; B</div>
                            <div>A = 0, B = 1</div>
                            <div className="mt-2 text-gray-500">Y = (~A) • B</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <div className="font-bold text-blue-600 mb-2">A = B</div>
                            <div>Both 0 or Both 1</div>
                            <div className="mt-2 text-gray-500">Y = A XNOR B</div>
                        </div>
                    </div>
                    <p className="text-gray-600 mt-6 text-sm">
                        <strong>Cascading Logic:</strong> To build a 4-bit comparator, we essentially say:
                        <br />
                        "A is greater IF (MSB is greater) OR (MSB is equal AND next bit is greater)..."
                    </p>
                </div>
            </div>

            {/* --- Section 3: Visualizer --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Scale className="w-8 h-8 text-purple-600" />
                3. Interactive Comparison
            </h2>
            <p className="text-gray-600 mb-4">
                Enter two 4-bit numbers below. The visualizer will show you exactly which bit "decides" the result.
            </p>

            <ComparatorVisualizer />

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
