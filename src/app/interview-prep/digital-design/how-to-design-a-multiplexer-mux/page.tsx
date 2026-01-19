import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, GitMerge, ListFilter } from "lucide-react";
import MuxMaster from "./MuxMaster";

export default function Page() {
    const currentSlug = "how-to-design-a-multiplexer-mux";
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
                How to Design a Multiplexer (Mux)
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
                A <strong>Multiplexer (Mux)</strong> is the digital equivalent of a railroad switch. It selects <strong>one</strong> data line from <strong>many</strong> inputs and routes it to a <strong>single</strong> output line. It is strictly a Combinational Circuit.
            </p>

            {/* --- Section 1: 2:1 Mux --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <GitMerge className="w-8 h-8 text-indigo-600" />
                The 2:1 Multiplexer
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-12">
                <p className="text-gray-700 mb-4">
                    The simplest Mux has 2 inputs (I<sub>0</sub>, I<sub>1</sub>) and 1 select line (S).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-bold text-gray-800 mb-2">Truth Table</h3>
                        <table className="w-full text-sm text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-200">
                                    <th className="p-2">Select (S)</th>
                                    <th className="p-2">Output (Y)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-100">
                                    <td className="p-2 text-indigo-600 font-bold">0</td>
                                    <td className="p-2">Takes value of I<sub>0</sub></td>
                                </tr>
                                <tr>
                                    <td className="p-2 text-indigo-600 font-bold">1</td>
                                    <td className="p-2">Takes value of I<sub>1</sub></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 mb-2">Equation</h3>
                        <div className="bg-gray-50 p-4 rounded-lg font-mono text-lg border border-gray-200 text-center">
                            Y = S'I_0 + S I_1
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            "If S is 0, allow I0. If S is 1, allow I1."
                        </p>
                    </div>
                </div>
            </div>

            {/* --- Section 2: 4:1 Mux Visualizer --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <ListFilter className="w-8 h-8 text-indigo-600" />
                Interactive: 4:1 Mux
            </h2>
            <p className="text-gray-700 mb-6">
                A 4:1 Mux needs <strong>2 select lines</strong> (S<sub>1</sub>, S<sub>0</sub>) because 2<sup>2</sup> = 4. Control the switches below to steer the data.
            </p>

            <MuxMaster />

            {/* --- Section 3: Applications --- */}
            <div className="mt-16 bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-3xl border border-indigo-100">
                <h3 className="text-2xl font-bold text-indigo-900 mb-4">Why is this important?</h3>
                <ul className="space-y-3 text-indigo-800">
                    <li className="flex gap-2">
                        <span className="font-bold">&bull;</span>
                        <span><strong>Routing Data</strong>: In a CPU, routing results from the ALU to different registers.</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="font-bold">&bull;</span>
                        <span><strong>Parallel to Serial</strong>: Converting parallel byte data into a single serial stream (like USB).</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="font-bold">&bull;</span>
                        <span><strong>Implementing Logic</strong>: A Mux can implement <em>any</em> boolean function if wired correctly (LUTs in FPGAs are basically Muxes).</span>
                    </li>
                </ul>
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
