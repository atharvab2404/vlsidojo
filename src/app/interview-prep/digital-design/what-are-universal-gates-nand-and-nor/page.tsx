import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Layers, PenTool, Braces, Sparkles } from "lucide-react";
import UniversalGateBuilder from "./UniversalGateBuilder";

export default function Page() {
    const currentSlug = "what-are-universal-gates-nand-and-nor";
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
                Universal Gates (NAND & NOR)
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                A <strong>Universal Gate</strong> is a gate that can implement <em>any</em> Boolean function without needing any other type of gate. In digital logic, the two universal gates are <strong>NAND</strong> and <strong>NOR</strong>. If you have an infinite supply of NANDs, you can build any processor in existence.
            </p>

            {/* --- Section 1: The Concept --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <Layers className="w-6 h-6 text-indigo-600" />
                        Why these two?
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        AND and OR gates are actually <em>not</em> universal on their own (you can't make an inverter with just ORs). But NAND and NOR both have built-in inversion, which is the key to their universality.
                    </p>
                </div>
                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                    <h2 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-3">
                        <Sparkles className="w-6 h-6 text-indigo-600" />
                        Why do we care?
                    </h2>
                    <ul className="space-y-3 text-indigo-800">
                        <li className="flex items-start gap-2">
                            <span className="font-bold">• Efficiency:</span> In CMOS technology, NAND/NOR gates consist of fewer transistors (4) than AND/OR gates (6). They are faster and smaller.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-bold">• Manufacturing:</span> Using a single gate type makes fabrication processes (Standard Cell Libraries) more uniform and reliable.
                        </li>
                    </ul>
                </div>
            </div>

            {/* --- Section 2: Interactive Builder --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <PenTool className="w-8 h-8 text-gray-700" />
                Proof by Construction
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
                Don't just take our word for it. Use the builder below to construct the basic gates (NOT, AND, OR) using <em>only</em> Universal Gates.
            </p>

            <UniversalGateBuilder />

            {/* --- Section 3: Summary of Mappings --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-16 flex items-center gap-3">
                <Braces className="w-8 h-8 text-gray-700" />
                Conversion Cheat Sheet
            </h2>
            <p className="text-gray-700 mb-6">
                Common interview questions ask you to convert logic expressions to "All-NAND" or "All-NOR".
            </p>

            <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm mb-12">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                        <tr>
                            <th className="p-4 border-b">Target Gate</th>
                            <th className="p-4 border-b bg-indigo-50 text-indigo-900">Using NANDs</th>
                            <th className="p-4 border-b bg-rose-50 text-rose-900">Using NORs</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700">
                        <tr className="hover:bg-gray-50">
                            <td className="p-4 font-bold text-gray-900">NOT (Inverter)</td>
                            <td className="p-4 font-mono bg-indigo-50/30">Join inputs (1 gate)</td>
                            <td className="p-4 font-mono bg-rose-50/30">Join inputs (1 gate)</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="p-4 font-bold text-gray-900">AND</td>
                            <td className="p-4 font-mono bg-indigo-50/30 text-indigo-700 font-bold">NAND + Inverter (2 gates)</td>
                            <td className="p-4 font-mono bg-rose-50/30">Invert inputs + NOR (3 gates)</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="p-4 font-bold text-gray-900">OR</td>
                            <td className="p-4 font-mono bg-indigo-50/30">Invert inputs + NAND (3 gates)</td>
                            <td className="p-4 font-mono bg-rose-50/30 text-rose-700 font-bold">NOR + Inverter (2 gates)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* --- Pro Tip Section --- */}
            <div className="bg-gray-50 border-l-4 border-gray-600 p-6 rounded-r-xl mb-12">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    🚀 Pro Tip: Bubble Pushing
                </h3>
                <p className="text-gray-700 text-sm">
                    To simplify logic to All-NAND:
                </p>
                <ol className="list-decimal list-inside text-sm text-gray-700 mt-2 space-y-1">
                    <li>Write expression in Sum-of-Products (SOP).</li>
                    <li>Draw AND-OR circuit.</li>
                    <li>Place "bubbles" (inverters) at the output of ANDs and inputs of OR.</li>
                    <li>AND + Bubble = NAND. Bubble + OR = NAND (De Morgan's).</li>
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
