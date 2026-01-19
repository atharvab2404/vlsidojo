import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, BookOpen, Scaling, RotateCw, Copy, CheckSquare } from "lucide-react";
import TruthTableProver from "./TruthTableProver";

export default function Page() {
    const currentSlug = "boolean-algebra-key-postulates-and-theorems";
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
                Boolean Algebra
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Ordinary algebra deals with numbers (2.5, 100, &pi;). Boolean algebra deals with <strong>Logic Levels</strong> (0, 1). It is the mathematical foundation of all digital circuits, allowing us to simplify complex gates into efficient chips.
            </p>

            {/* --- Section 1: The Axioms --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-600" />
                1. Key Postulates (Axioms)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">AND (Intersection)</h3>
                    <ul className="space-y-3 font-mono text-gray-700 bg-gray-50 p-4 rounded-lg">
                        <li className="flex justify-between"><span>0 . 0 = 0</span></li>
                        <li className="flex justify-between"><span>0 . 1 = 0</span></li>
                        <li className="flex justify-between"><span>1 . 0 = 0</span></li>
                        <li className="flex justify-between text-blue-600 font-bold"><span>1 . 1 = 1</span></li>
                    </ul>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">OR (Union)</h3>
                    <ul className="space-y-3 font-mono text-gray-700 bg-gray-50 p-4 rounded-lg">
                        <li className="flex justify-between"><span>0 + 0 = 0</span></li>
                        <li className="flex justify-between text-amber-600 font-bold"><span>0 + 1 = 1</span></li>
                        <li className="flex justify-between text-amber-600 font-bold"><span>1 + 0 = 1</span></li>
                        <li className="flex justify-between text-amber-600 font-bold"><span>1 + 1 = 1</span></li>
                    </ul>
                </div>
            </div>

            {/* --- Section 2: Theorems --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckSquare className="w-8 h-8 text-purple-600" />
                2. Essential Theorems
            </h2>
            <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm mb-12">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                        <tr>
                            <th className="p-4 border-b">Law Name</th>
                            <th className="p-4 border-b">AND Form</th>
                            <th className="p-4 border-b bg-amber-50">OR Form</th>
                            <th className="p-4 border-b text-center">Description</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700">
                        <tr className="hover:bg-gray-50">
                            <td className="p-4 font-bold text-gray-900">Identity</td>
                            <td className="p-4 font-mono">A . 1 = A</td>
                            <td className="p-4 font-mono bg-amber-50/50">A + 0 = A</td>
                            <td className="p-4 text-sm text-gray-500">Inputs don't change</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="p-4 font-bold text-gray-900">Annulment</td>
                            <td className="p-4 font-mono">A . 0 = 0</td>
                            <td className="p-4 font-mono bg-amber-50/50">A + 1 = 1</td>
                            <td className="p-4 text-sm text-gray-500">Force output fixed</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="p-4 font-bold text-gray-900">Idempotent</td>
                            <td className="p-4 font-mono">A . A = A</td>
                            <td className="p-4 font-mono bg-amber-50/50">A + A = A</td>
                            <td className="p-4 text-sm text-gray-500">Redundancy reduction</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="p-4 font-bold text-gray-900">Inverse</td>
                            <td className="p-4 font-mono">A . A' = 0</td>
                            <td className="p-4 font-mono bg-amber-50/50">A + A' = 1</td>
                            <td className="p-4 text-sm text-gray-500">Complementary pairs</td>
                        </tr>
                        <tr className="hover:bg-gray-50 bg-blue-50/30">
                            <td className="p-4 font-bold text-blue-900">Absorption</td>
                            <td className="p-4 font-mono group relative">
                                A . (A + B) = A
                            </td>
                            <td className="p-4 font-mono bg-amber-50/50">A + (A . B) = A</td>
                            <td className="p-4 text-sm text-blue-800 font-semibold">"Absorbs" the redundant term</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <TruthTableProver />

            {/* --- Section 3: De Morgan & Duality --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 mb-12">
                {/* De Morgan */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <RotateCw className="w-7 h-7 text-green-600" />
                        De Morgan's Laws
                    </h2>
                    <div className="bg-green-50 p-6 rounded-2xl border border-green-200 h-full">
                        <p className="text-gray-700 mb-4">
                            The "Bubble Pusher" theorem. It allows us to convert between AND and OR logic by inverting inputs and outputs.
                        </p>
                        <div className="space-y-4 font-mono text-lg bg-white p-4 rounded-xl shadow-sm border border-green-100">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                <span>(A + B)'</span>
                                <span className="text-gray-400">=</span>
                                <span className="text-green-700 font-bold">A' . B'</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>(A . B)'</span>
                                <span className="text-gray-400">=</span>
                                <span className="text-green-700 font-bold">A' + B'</span>
                            </div>
                        </div>
                        <p className="text-xs text-green-800 mt-4 italic">
                            "Break the line, change the sign."
                        </p>
                    </div>
                </div>

                {/* Duality */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <Copy className="w-7 h-7 text-amber-600" />
                        Duality Principle
                    </h2>
                    <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 h-full">
                        <p className="text-gray-700 mb-4">
                            Every Boolean expression has a "Dual". To find it, keep variables the same but swap operators and constants.
                        </p>
                        <ul className="space-y-2 mb-4">
                            <li className="flex gap-2 items-center bg-white px-3 py-1 rounded border border-amber-100"><Scaling className="w-4 h-4 text-amber-500" /> Swap AND (.) &harr; OR (+) </li>
                            <li className="flex gap-2 items-center bg-white px-3 py-1 rounded border border-amber-100"><Scaling className="w-4 h-4 text-amber-500" /> Swap 1 &harr; 0 </li>
                        </ul>
                        <div className="font-mono text-sm bg-gray-800 text-white p-3 rounded-lg">
                            Original: A + 1 = 1
                            <br />
                            <span className="text-amber-400">Dual: &nbsp;&nbsp;&nbsp;A . 0 = 0</span>
                        </div>
                    </div>
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
