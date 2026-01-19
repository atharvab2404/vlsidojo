import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Grid, X } from "lucide-react";
import ArrayMultiplierVisualizer from "./ArrayMultiplierVisualizer";

export default function Page() {
    const currentSlug = "what-is-an-array-multiplier";
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
                Array Multiplier
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Multiplication in hardware isn't magic. It's just a massive grid of <strong>AND gates</strong> and <strong>Adders</strong> working in parallel. This structure is called an <strong>Array Multiplier</strong>.
            </p>

            {/* --- Section 1: The Paper Method --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Grid className="w-8 h-8 text-indigo-600" />
                    1. The Shift-and-Add Method
                </h2>
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Think back to grade school multiplication.
                    </p>
                    <div className="font-mono bg-gray-50 p-6 rounded-xl border border-gray-200 inline-block">
                        <div className="text-right">  1 0 (A = 2)</div>
                        <div className="text-right">x 1 1 (B = 3)</div>
                        <div className="w-full h-px bg-gray-400 my-2"></div>
                        <div className="text-right text-gray-500">  1 0 (10 × 1)</div>
                        <div className="text-right text-gray-500">+1 0   (10 × 1, shifted)</div>
                        <div className="w-full h-px bg-gray-400 my-2"></div>
                        <div className="text-right font-bold text-indigo-600">1 1 0 (Product = 6)</div>
                    </div>
                </div>
            </div>

            {/* --- Section 2: Hardware Implementation --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <X className="w-8 h-8 text-emerald-600" />
                    2. Hardware Visualization (2-bit)
                </h2>
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 mb-8">
                    <p className="text-emerald-900 mb-4">
                        In hardware:
                    </p>
                    <ul className="list-disc pl-5 text-emerald-800 space-y-2">
                        <li><strong>Step 1:</strong> Generate all "Partial Products" instantly using <strong>AND gates</strong> (<i>A<sub>i</sub></i> &middot; <i>B<sub>j</sub></i>).</li>
                        <li><strong>Step 2:</strong> Sum them up using <strong>Half Adders</strong> and <strong>Full Adders</strong>.</li>
                    </ul>
                </div>

                <p className="text-gray-600 mb-4">
                    Interact with the 2x2 Multiplier below. See how the "AND" operations light up the grid (Partial Products) which simply get added to form result P.
                </p>

                <ArrayMultiplierVisualizer />

            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">Complexity Note</h3>
                <p className="text-gray-700">
                    For two N-bit numbers:
                    <br />
                    • We need <strong>N²</strong> AND gates.
                    <br />
                    • We need roughly <strong>N(N-2)</strong> Full Adders.
                    <br />
                    It gets expensive fast!
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
