import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Boxes, Sigma, Pi, Database } from "lucide-react";
import SOPGenerator from "./SOPGenerator";

export default function Page() {
    const currentSlug = "canonical-forms-sum-of-products-sop-and-product-of-sums-pos";
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
                Canonical Forms (SOP & POS)
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Every digital circuit starts as a concept, effectively a "Truth Table". Canonical Forms are the standard way to translate that Truth Table directly into a Boolean Equation. This is the first step in synthesis.
            </p>

            {/* --- Section 1: Minterms vs Maxterms --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-green-200 transition-colors">
                    <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <Boxes className="w-6 h-6 text-green-600" />
                        Minterms (m)
                    </h2>
                    <p className="text-gray-700 mb-4">
                        A "Product" (AND) term that represents exactly <strong>ONE</strong> combination of inputs where the function is 1.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg font-mono">
                        <li>• Variables are un-complemented if 1.</li>
                        <li>• Variables are complemented if 0.</li>
                        <li className="text-green-700 font-bold mt-2">Example (A=1, B=0, C=1): <br /> m = A . B' . C</li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-red-200 transition-colors">
                    <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-600"></div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <Boxes className="w-6 h-6 text-red-600" />
                        Maxterms (M)
                    </h2>
                    <p className="text-gray-700 mb-4">
                        A "Sum" (OR) term that represents exactly <strong>ONE</strong> combination of inputs where the function is 0.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg font-mono">
                        <li>• Variables are un-complemented if 0. <span className="text-xs text-red-500">(Opposite of Minterms!)</span></li>
                        <li>• Variables are complemented if 1.</li>
                        <li className="text-red-700 font-bold mt-2">Example (A=1, B=0, C=1): <br /> M = (A' + B + C')</li>
                    </ul>
                </div>
            </div>

            {/* --- Section 2: Standard Forms --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Database className="w-8 h-8 text-indigo-600" />
                Generating Equations from Truth Tables
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
                We can express any logic function in two standard ways. Use the interactive tool below to toggle the "Truth Table" outputs and see how the equations are built instantly.
            </p>

            <SOPGenerator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 mb-12">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Sigma className="w-5 h-5 text-gray-500" /> Sum of Products (SOP)
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        We collect all the rows where Output = 1 (the Minterms) and <strong>OR</strong> them together. <br />
                        "If minterm 1 is true OR minterm 2 is true... then Y is true."
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Pi className="w-5 h-5 text-gray-500" /> Product of Sums (POS)
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        We collect all the rows where Output = 0 (the Maxterms) and <strong>AND</strong> them together. <br />
                        "Y is true ONLY IF it's NOT (maxterm 1) AND NOT (maxterm 2)..."
                    </p>
                </div>
            </div>

            {/* --- Pro Tip Section --- */}
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl mb-12">
                <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                    🚀 Why do we prefer SOP?
                </h3>
                <p className="text-indigo-800 text-sm">
                    While both are valid, SOP is more natural for humans ("This happens OR that happens"). It also maps directly to <strong>Programmable Logic Arrays (PLAs)</strong> which have an "AND Plane" feeding an "OR Plane", making it the standard for synthesis tools.
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
