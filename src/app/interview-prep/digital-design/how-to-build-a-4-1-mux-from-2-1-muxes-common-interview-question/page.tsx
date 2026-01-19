import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Network, Layers } from "lucide-react";
import GeneralMuxBuilder from "./GeneralMuxBuilder";

export default function Page() {
    const currentSlug = "how-to-build-a-4-1-mux-from-2-1-muxes-common-interview-question";
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
                How to Build Any N:1 Mux from 2:1 Muxes
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
                A common interview question asks you to "Build a 4:1 Mux from 2:1 Muxes". But a <em>great</em> question asks: "How many 2:1 Muxes do you need for a <strong>53:1 Mux</strong>?"
            </p>

            {/* --- Section 1: The General Rule --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Network className="w-8 h-8 text-indigo-600" />
                The Golden Rule: N - 1
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-12">
                <p className="text-gray-700 mb-6 text-lg">
                    To build an <strong>N:1 Multiplexer</strong> using only 2:1 Multiplexers, you always need exactly:
                </p>
                <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r text-2xl font-mono text-indigo-900 font-bold text-center mb-6">
                    Total Muxes = N - 1
                </div>
                <p className="text-gray-700">
                    <strong>Why?</strong> Think of it like a tennis tournament.
                    <br />
                    To pick 1 winner from N players, N-1 players must lose. Each match (2:1 Mux) eliminates exactly 1 player. Therefore, you need N-1 matches to find the winner.
                </p>
            </div>

            {/* --- Section 2: Interactive Builder --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Layers className="w-8 h-8 text-purple-600" />
                Universal Mux Builder
            </h2>
            <p className="text-gray-700 mb-8">
                Enter any number below (e.g., 53) to see the optimal structure and calculation.
            </p>

            <GeneralMuxBuilder />

            <div className="mt-16 bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="text-lg font-bold text-blue-900 mb-2">Efficiency Note</h3>
                <p className="text-blue-800">
                    While <strong>N-1</strong> gives the component count, the <strong>Delay</strong> (Latency) is determined by the number of <strong>stages</strong> (depth of the tree), which is roughly <strong>log<sub>2</sub>(N)</strong>.
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
