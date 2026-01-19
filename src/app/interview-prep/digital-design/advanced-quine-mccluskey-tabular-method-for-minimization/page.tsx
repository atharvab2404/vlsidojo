import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, GitMerge, FileSpreadsheet, Bot } from "lucide-react";
import QMSolver from "./QMSolver";

export default function Page() {
    const currentSlug = "advanced-quine-mccluskey-tabular-method-for-minimization";
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

            <div className="relative">
                {/* Badge */}
                <div className="absolute top-0 right-0 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full border border-gray-700 shadow-sm">
                    ADVANCED TOPIC
                </div>
                <h1 className="text-5xl font-extrabold text-gray-900 mb-8 tracking-tight">
                    Quine-McCluskey Method
                </h1>
            </div>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                K-Maps are great for visual intuition, but they become a nightmare at 5 or 6 variables. The <strong>Quine-McCluskey (QM)</strong> algorithm (or "Tabular Method") is the rigorous, step-by-step procedure that computers use to minimize logic of <em>any</em> size.
            </p>

            {/* --- Section 1: Phase 1 (Generating PIs) --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <GitMerge className="w-8 h-8 text-indigo-600" />
                Step 1: Finding Prime Implicants
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
                <div className="flex-1">
                    <p className="text-gray-700 mb-4">
                        The core idea is simple: <strong>Merge anything that differs by exactly one bit.</strong>
                    </p>
                    <ul className="space-y-3 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <li className="flex gap-3">
                            <span className="font-bold text-indigo-600">1.</span>
                            <span>List all minterms.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-indigo-600">2.</span>
                            <span>Compare every pair. If they differ by 1 bit, combine them and put a dash (<code>-</code>) where the bit changes.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-indigo-600">3.</span>
                            <span>Repeat this with the new groups until nothing else can merge.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-indigo-600">4.</span>
                            <span>Any term that <strong>never got merged</strong> is a Prime Implicant (PI).</span>
                        </li>
                    </ul>
                </div>
                <div className="bg-indigo-50 p-6 rounded-xl text-sm border border-indigo-100 md:w-80">
                    <h4 className="font-bold text-indigo-900 mb-2">Code Logic Example</h4>
                    <div className="font-mono bg-white p-3 rounded border border-indigo-100 mb-2">
                        0 (0000)<br />
                        1 (0001)<br />
                        --------<br />
                        0,1 (000-) <span className="text-gray-400">// Merged!</span>
                    </div>
                    <p className="text-indigo-700">
                        Only the bit that changed (0&rarr;1) becomes a `-`. The rest stay same.
                    </p>
                </div>
            </div>

            {/* --- VISUALIZER --- */}
            <QMSolver />

            {/* --- Section 2: Phase 2 (Coverage Chart) --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-16 flex items-center gap-3">
                <FileSpreadsheet className="w-8 h-8 text-emerald-600" />
                Step 2: The Coverage Chart
            </h2>
            <p className="text-gray-700 mb-6">
                Once we have the list of Prime Implicants (from the tool above), we need to pick the smallest set that covers all original minterms.
            </p>

            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-12">
                <h3 className="text-xl font-bold text-emerald-900 mb-4">Finding "Essential" PIs</h3>
                <p className="text-emerald-800 leading-relaxed mb-4">
                    If a specific minterm is covered by <strong>only one</strong> Prime Implicant, that PI is <strong>Essential</strong>. We MUST include it in the final answer.
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-700">
                    <Bot className="w-4 h-4" /> Synthesizer Logic:
                </div>
                <ol className="list-decimal list-inside mt-2 space-y-1 text-emerald-800 text-sm ml-2">
                    <li>Select all Essential PIs.</li>
                    <li>Cross out all minterms they cover.</li>
                    <li>If any minterms remain, pick the remaining PIs that cover the most "uncrossed" minterms (heuristically).</li>
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
