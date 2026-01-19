import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Split, MoveRight, Scissors, Lightbulb } from "lucide-react";
import BubblePusher from "./BubblePusher";

export default function Page() {
    const currentSlug = "de-morgans-theorem-how-to-use-it-for-logic-simplification";
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
                De Morgan's Theorem
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Augustus De Morgan gave us the most powerful tool for logic simplification. His theorems allow us to swap between AND and OR gates by simply inverting inputs and outputs. This is the foundation of <strong>Bubble Pushing</strong>.
            </p>

            {/* --- Section 1: The Rule --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Scissors className="w-8 h-8 text-rose-600" />
                1. Break the Line, Change the Sign
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Theorem 1 */}
                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-indigo-200 text-indigo-800 px-3 py-1 rounded-bl-lg text-xs font-bold uppercase">Theorem #1</div>
                    <h3 className="text-2xl font-mono font-bold text-indigo-900 mb-4">
                        (A . B)' = A' + B'
                    </h3>
                    <p className="text-indigo-800 mb-2">
                        A <strong>NAND</strong> gate is equivalent to an <strong>OR</strong> gate with inverted inputs.
                    </p>
                    <p className="text-sm text-indigo-600 italic">"The complement of a product is the sum of the complements."</p>
                </div>

                {/* Theorem 2 */}
                <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-rose-200 text-rose-800 px-3 py-1 rounded-bl-lg text-xs font-bold uppercase">Theorem #2</div>
                    <h3 className="text-2xl font-mono font-bold text-rose-900 mb-4">
                        (A + B)' = A' . B'
                    </h3>
                    <p className="text-rose-800 mb-2">
                        A <strong>NOR</strong> gate is equivalent to an <strong>AND</strong> gate with inverted inputs.
                    </p>
                    <p className="text-sm text-rose-600 italic">"The complement of a sum is the product of the complements."</p>
                </div>
            </div>

            <BubblePusher />

            {/* --- Section 2: Why do we do this? --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-16 flex items-center gap-3">
                <Split className="w-8 h-8 text-gray-700" />
                2. Why "Push Bubbles"?
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
                In schematic design, we often "push" bubbles from the output of one gate to the input of the next to confirm that they cancel out.
            </p>

            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm space-y-4">
                <div className="flex items-center gap-4">
                    <div className="font-bold text-gray-900 w-32">Scenario:</div>
                    <div className="text-gray-600">You have a NAND gate driving a NAND gate.</div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="font-bold text-gray-900 w-32">Problem:</div>
                    <div className="text-gray-600">It's hard to visualize logic like (AB)' (CD)'.</div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="font-bold text-blue-600 w-32">Solution:</div>
                    <div className="text-gray-800">
                        Convert the second NAND to a <strong>Negative-OR</strong>. Now you have Bubbles facing Bubbles.
                        <br />
                        <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm text-rose-600">Bubble + Bubble = Wire</span>.
                        <br />
                        The logic simplifies to <strong>AND-OR</strong> (Sum of Products), which is easy to read!
                    </div>
                </div>
            </div>

            {/* --- Pro Tip Section --- */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl mb-12 mt-12">
                <h3 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Pro Tip: Double Inversion
                </h3>
                <p className="text-yellow-800 text-sm">
                    Remember that A'' = A. If you push a bubble onto a line that already has a bubble, they annihilate each other. This is the secret to converting ANY circuit into All-NAND logic effortlessly.
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
