import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, BoxSelect, Ghost, Layers } from "lucide-react";
import KMapSolver from "./KMapSolver";

export default function Page() {
    const currentSlug = "logic-minimization-using-k-maps-with-dont-care-conditions";
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
                Logic Minimization & Don't Cares
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                The goal of a K-Map is to find the <strong>largest possible groups</strong> of 1s. The bigger the group, the simpler the logic gate needed to implement it.
            </p>

            {/* --- Section 1: The Golden Rules --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BoxSelect className="w-8 h-8 text-indigo-600" />
                Grouping Rules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">1. Power of Two</h3>
                    <p className="text-gray-600 text-sm">
                        You can only form groups of <strong>1, 2, 4, 8, or 16</strong> cells. You cannot group 3 or 6.
                    </p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">2. Be Greedy</h3>
                    <p className="text-gray-600 text-sm">
                        Always form the <strong>largest valid group</strong> possible. A Quad (4) is better than two Pairs (2).
                    </p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">3. Overlap is Good</h3>
                    <p className="text-gray-600 text-sm">
                        You can reuse '1's that are already grouped if it helps you make a larger group elsewhere.
                    </p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">4. Wrap Around</h3>
                    <p className="text-gray-600 text-sm">
                        Remember the Pac-Man rule. Edges are connected!
                    </p>
                </div>
            </div>

            {/* --- Section 2: Don't Cares --- */}
            <div className="bg-gradient-to-br from-indigo-900 to-indigo-800 text-white p-8 rounded-3xl mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <Ghost className="w-64 h-64" />
                </div>
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-3 z-10 relative">
                    <Ghost className="w-8 h-8 text-indigo-300" />
                    The Power of Don't Cares (X)
                </h2>
                <p className="text-indigo-100 text-lg leading-relaxed max-w-2xl z-10 relative">
                    Sometimes, certain input combinations will <strong>never happen</strong> (e.g., BCD numbers &gt; 9). We mark these outputs as <strong>X</strong>.
                </p>
                <div className="mt-6 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 inline-block">
                    <h4 className="font-bold text-indigo-200 uppercase text-xs tracking-wider mb-2">Strategy</h4>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-400"></span>
                            Treat <strong>X</strong> as <strong>1</strong> if it helps make a group bigger.
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-400"></span>
                            Treat <strong>X</strong> as <strong>0</strong> if it doesn't help. Ignore it.
                        </li>
                    </ul>
                </div>
            </div>

            {/* --- Section 3: Interactive Solver --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Layers className="w-8 h-8 text-gray-700" />
                K-Map Solver
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
                Click the cells below to toggle between <strong>0 &rarr; 1 &rarr; X</strong>. Watch how the equation simplifies automatically!
            </p>

            <KMapSolver />

            <div className="mt-8 text-sm text-gray-500 italic bg-gray-50 p-4 rounded-lg border border-gray-100">
                <strong>Note:</strong> This visualizer uses a fast greedy algorithm for 4-variable maps. While it covers 99% of cases correctly, extremely complex "cyclic" maps might require the Quine-McCluskey method for perfect optimization.
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
