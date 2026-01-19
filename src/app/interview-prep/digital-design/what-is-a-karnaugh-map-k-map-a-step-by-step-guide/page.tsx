import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Grid3X3, Hash, WrapText } from "lucide-react";
import KMapMapper from "./KMapMapper";

export default function Page() {
    const currentSlug = "what-is-a-karnaugh-map-k-map-a-step-by-step-guide";
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
                What is a K-Map?
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                A <strong>Karnaugh Map (K-Map)</strong> is a visual method used to simplify Boolean expressions without using complex algebra. It organizes the Truth Table into a grid where logically adjacent cells differ by only <strong>one bit</strong>.
            </p>

            {/* --- Section 1: The Magic of Gray Code --- */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Hash className="w-6 h-6 text-indigo-600" />
                    The "Gray Code" Rule
                </h2>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                        <p className="text-gray-700 leading-relaxed mb-4">
                            In a normal binary count, we go 00 &rarr; 01 &rarr; 10 &rarr; 11.
                            <br />
                            <span className="text-red-600 font-bold">Problem:</span> From 01 to 10, <strong>two bits change</strong> at once (0&rarr;1 and 1&rarr;0).
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            In a K-Map, we MUST arrange the axes so only <strong>one bit changes</strong> at a time. This is called <strong>Gray Code</strong>:
                            <br />
                            <span className="text-indigo-600 font-bold font-mono text-lg block mt-2 bg-indigo-50 p-2 rounded text-center w-fit">00 &rarr; 01 &rarr; 11 &rarr; 10</span>
                        </p>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-600 w-full md:w-64">
                        <div className="font-bold mb-2">Why does this matter?</div>
                        If cells are physically adjacent, they share common logic variables. This allows us to group them and eliminate the variable that changes.
                        <div className="mt-2 text-indigo-600 font-mono font-bold">A'B + AB = B</div>
                    </div>
                </div>
            </div>

            {/* --- Section 2: Interactive K-Map Structure --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Grid3X3 className="w-8 h-8 text-indigo-600" />
                Mapping the Truth Table
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
                It can be confusing to see where row #3 or row #6 goes on the map. Use this tool to visualize the mapping.
            </p>

            <KMapMapper />

            {/* --- Section 3: Adjacency & Wraparound --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-16 flex items-center gap-3">
                <WrapText className="w-8 h-8 text-gray-700" />
                The Pac-Man Effect
            </h2>
            <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl mb-12">
                <p className="text-indigo-900 leading-relaxed text-lg">
                    The K-Map grid is not a flat square; it's logically a <strong>Torus (Donut)</strong>.
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2 text-indigo-800">
                    <li>The <strong>Left Edge</strong> is adjacent to the <strong>Right Edge</strong>.</li>
                    <li>The <strong>Top Edge</strong> is adjacent to the <strong>Bottom Edge</strong>.</li>
                </ul>
                <p className="text-sm mt-4 text-indigo-600 bg-white/50 p-3 rounded-lg border border-indigo-100">
                    Think of Pac-Man: when he goes off the right side of the screen, he wraps around to the left. K-Map grouping works the same way!
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
