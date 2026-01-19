import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Box, AlertTriangle, RefreshCcw, Layers } from "lucide-react";
import SRLatchVisualizer from "./SRLatchVisualizer";

export default function Page() {
    const currentSlug = "the-sr-latch-nand-vs-nor-implementation";
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
                The SR Latch
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                The <strong>SR Latch</strong> (Set-Reset Latch) is the simplest memory element. It uses <strong>feedback</strong> (cross-coupling) to store a single bit of information: either a 0 or a 1.
            </p>

            {/* --- Section 1: Visualizer --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Box className="w-8 h-8 text-indigo-600" />
                    1. Interactive NOR Latch
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 mb-4">
                        This is a <strong>NOR Gate</strong> implementation (Active High Inputs).
                        <br />
                        Try setting <strong>S=1</strong> to store a '1'. Then remove it (S=0, R=0). Notice how the '1' stays! That's memory!
                    </p>
                </div>

                <SRLatchVisualizer />
            </div>

            {/* --- Section 2: Theory --- */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Truth Table (NOR)</h3>
                    <table className="w-full text-center text-sm border-collapse bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
                        <thead className="bg-gray-100 font-bold text-gray-600">
                            <tr><th className="p-3">S</th><th className="p-3">R</th><th className="p-3">Next State (Q+)</th><th className="p-3">Mode</th></tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr><td className="p-3">0</td><td>0</td><td className="font-bold text-indigo-600">Q (No Change)</td><td className="text-gray-500 italic">Hold</td></tr>
                            <tr><td className="p-3">0</td><td>1</td><td className="font-bold">0</td><td className="text-gray-500 italic">Reset</td></tr>
                            <tr><td className="p-3">1</td><td>0</td><td className="font-bold">1</td><td className="text-gray-500 italic">Set</td></tr>
                            <tr className="bg-red-50 text-red-900"><td className="p-3">1</td><td>1</td><td className="font-bold">0* (Invalid)</td><td className="font-bold italic">Forbidden</td></tr>
                        </tbody>
                    </table>

                    {/* NAND vs NOR Comparison (Moved to Left) */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-2">NAND vs NOR Implementation</h4>
                        <table className="w-full text-xs text-left">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="pb-2">Feature</th>
                                    <th className="pb-2">NOR Latch</th>
                                    <th className="pb-2">NAND Latch</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600">
                                <tr className="border-b border-gray-100">
                                    <td className="py-2 font-medium">Inputs</td>
                                    <td className="py-2 text-indigo-600">Active High (S, R)</td>
                                    <td className="py-2 text-amber-600">Active Low (S̅, R̅)</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="py-2 font-medium">Hold State</td>
                                    <td className="py-2">0, 0</td>
                                    <td className="py-2">1, 1</td>
                                </tr>
                                <tr>
                                    <td className="py-2 font-medium">Invalid</td>
                                    <td className="py-2 text-red-600">1, 1</td>
                                    <td className="py-2 text-red-600">0, 0</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Characteristic Equation */}
                    <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                        <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                            <span className="text-sm bg-indigo-200 px-2 py-0.5 rounded">Theory</span>
                            Characteristic Equation
                        </h4>
                        <p className="text-gray-700 text-sm mb-3">
                            The next state $Q(t+1)$ can be derived from the current inputs and state:
                        </p>
                        <div className="font-mono text-center bg-white p-3 rounded border border-indigo-100 text-indigo-800">
                            Q(next) = S + R̅·Q
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            (For NOR Latch. Constraint: S·R = 0)
                        </p>
                    </div>

                    {/* Metastability Deep Dive */}
                    <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                        <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            Deep Dive: Metastability
                        </h4>
                        <p className="text-red-800 text-sm leading-relaxed">
                            What actually happens in the "Forbidden State"?
                            <br /><br />
                            If S=1 and R=1, both gates force 0. If you then release them <strong>simultaneously</strong> to (0,0), the latch must decide whether to latch a 0 or 1.
                            <br />
                            Because of real-world noise and slight manufacturing differences, the latch might enter a <strong>Metastable State</strong>—balancing halfway between 0 and 1 (like a ball on a hill) for an indefinite time before unpredictably settling. This can crash entire CPUs.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- Circuit Diagrams --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Layers className="w-8 h-8 text-gray-700" />
                    2. Circuit Diagrams
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col items-center">
                        <h5 className="font-bold text-gray-500 text-sm mb-4">NOR Latch (Active High)</h5>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 w-full">
                            <img
                                src="/images/circuits/sr-latch-nor.svg"
                                alt="SR Latch using NOR Gates"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col items-center">
                        <h5 className="font-bold text-gray-500 text-sm mb-4">NAND Latch (Active Low)</h5>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 w-full">
                            <img
                                src="/images/circuits/sr-latch-nand.svg"
                                alt="SR Latch using NAND Gates"
                                className="w-full h-auto"
                            />
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
