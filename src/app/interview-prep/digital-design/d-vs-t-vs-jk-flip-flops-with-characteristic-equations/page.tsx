import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Sliders, Hash } from "lucide-react";
import FFComparisonVisualizer from "./FFComparisonVisualizer";

export default function Page() {
    const currentSlug = "d-vs-t-vs-jk-flip-flops-with-characteristic-equations";
    const index = flatDigitalDesignTopics.findIndex((t) => t.slug === currentSlug);

    // Explicitly handle previous/next topic logic to strictly return { title, href } or null
    const prevTopic = index > 0 ? flatDigitalDesignTopics[index - 1] : null;
    const nextTopic = index < flatDigitalDesignTopics.length - 1 ? flatDigitalDesignTopics[index + 1] : null;

    const navPrev = prevTopic ? { title: prevTopic.title, href: `/interview-prep/digital-design/${prevTopic.slug}` } : null;
    const navNext = nextTopic ? { title: nextTopic.title, href: `/interview-prep/digital-design/${nextTopic.slug}` } : null;

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
                D vs T vs JK Flip-Flops
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                While the <strong>D Flip-Flop</strong> is the most common, the <strong>T (Toggle)</strong> and <strong>JK</strong> Flip-Flops are crucial for building counters and state machines. You must know their <strong>Characteristic Equations</strong> by heart for interviews.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Sliders className="w-8 h-8 text-indigo-600" />
                    1. Interactive Comparison
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700">
                        Use the buttons below to switch between FF types. Try to predict the next state Q(next) before the clock edge hits!
                    </p>
                </div>

                <FFComparisonVisualizer />
            </div>

            {/* --- Theory Tables --- */}
            <div className="flex flex-col gap-12 mb-12">

                {/* D Flip-Flop */}
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">Most Common</span>
                        D (Data) Flip-Flop
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-gray-600 mb-4">The "Delay" or "Data" flip-flop simply captures the input.</p>
                            <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm border border-gray-200">
                                <strong>Equation:</strong><br />
                                Q(next) = D
                            </div>
                        </div>
                        <ul className="text-sm space-y-2 text-gray-600">
                            <li>• Used for: Registers, Shift Registers, Synchronizers.</li>
                            <li>• Advantage: Simplest logic, no invalid states.</li>
                        </ul>
                    </div>
                </div>

                {/* T Flip-Flop */}
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-full">For Counters</span>
                        T (Toggle) Flip-Flop
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-gray-600 mb-4">Toggles state if T=1. Holds if T=0.</p>
                            <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm border border-gray-200">
                                <strong>Equation:</strong><br />
                                Q(next) = T ⊕ Q
                            </div>
                        </div>
                        <ul className="text-sm space-y-2 text-gray-600">
                            <li>• Used for: Binary Counters, Frequency Dividers.</li>
                            <li>• Logic: Q(next) = T · Q̅ + T̅ · Q</li>
                        </ul>
                    </div>
                </div>

                {/* JK Flip-Flop */}
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full">Universal</span>
                        JK Flip-Flop
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-gray-600 mb-4">Refines the SR latch behavior. Instead of "Invalid" state (1,1), it Toggles.</p>
                            <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm border border-gray-200">
                                <strong>Equation:</strong><br />
                                Q(next) = JQ̅ + K̅Q
                            </div>
                        </div>
                        <table className="w-full text-center text-xs border-collapse">
                            <thead className="bg-gray-100 font-bold text-gray-600"><tr><th className="p-2">J</th><th className="p-2">K</th><th className="p-2">Action</th></tr></thead>
                            <tbody>
                                <tr><td className="p-2">0</td><td>0</td><td>Hold</td></tr>
                                <tr><td className="p-2">0</td><td>1</td><td>Reset (0)</td></tr>
                                <tr><td className="p-2">1</td><td>0</td><td>Set (1)</td></tr>
                                <tr><td className="p-2 bg-emerald-50 font-bold">1</td><td className="p-2 bg-emerald-50 font-bold">1</td><td className="p-2 bg-emerald-50 font-bold">Toggle</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {/* --- Deep Dive: Excitation Tables --- */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-12">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Hash className="w-6 h-6" />
                    Designer's Toolkit: Excitation Tables
                </h3>
                <p className="text-slate-600 mb-6">
                    When designing counters, you know the <strong>Present State (Q)</strong> and the <strong>Next State (Q+)</strong>, and you need to find the required <strong>Inputs</strong>. This is the reverse of the Truth Table!
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* D Excitation */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <h4 className="font-bold text-center text-indigo-900 mb-2">D Flip-Flop</h4>
                        <table className="w-full text-center text-sm">
                            <thead className="bg-indigo-50 text-indigo-900"><tr><th>Q</th><th>Q+</th><th>D</th></tr></thead>
                            <tbody className="divide-y">
                                <tr><td>0</td><td>0</td><td>0</td></tr>
                                <tr><td>0</td><td>1</td><td>1</td></tr>
                                <tr><td>1</td><td>0</td><td>0</td></tr>
                                <tr><td>1</td><td>1</td><td>1</td></tr>
                            </tbody>
                        </table>
                        <p className="text-xs text-center mt-2 text-gray-500">D = Q+</p>
                    </div>

                    {/* T Excitation */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <h4 className="font-bold text-center text-amber-900 mb-2">T Flip-Flop</h4>
                        <table className="w-full text-center text-sm">
                            <thead className="bg-amber-50 text-amber-900"><tr><th>Q</th><th>Q+</th><th>T</th></tr></thead>
                            <tbody className="divide-y">
                                <tr><td>0</td><td>0</td><td>0</td></tr>
                                <tr><td>0</td><td>1</td><td>1 (Toggle)</td></tr>
                                <tr><td>1</td><td>0</td><td>1 (Toggle)</td></tr>
                                <tr><td>1</td><td>1</td><td>0</td></tr>
                            </tbody>
                        </table>
                        <p className="text-xs text-center mt-2 text-gray-500">T = Q ⊕ Q+</p>
                    </div>

                    {/* JK Excitation */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <h4 className="font-bold text-center text-emerald-900 mb-2">JK Flip-Flop</h4>
                        <table className="w-full text-center text-sm">
                            <thead className="bg-emerald-50 text-emerald-900"><tr><th>Q</th><th>Q+</th><th>J</th><th>K</th></tr></thead>
                            <tbody className="divide-y">
                                <tr><td>0</td><td>0</td><td>0</td><td>X</td></tr>
                                <tr><td>0</td><td>1</td><td>1</td><td>X</td></tr>
                                <tr><td>1</td><td>0</td><td>X</td><td>1</td></tr>
                                <tr><td>1</td><td>1</td><td>X</td><td>0</td></tr>
                            </tbody>
                        </table>
                        <p className="text-xs text-center mt-2 text-gray-500">X = Don't Care</p>
                    </div>
                </div>
            </div>

            <SubtopicNav prev={navPrev} next={navNext} />
        </div>
    );
}
