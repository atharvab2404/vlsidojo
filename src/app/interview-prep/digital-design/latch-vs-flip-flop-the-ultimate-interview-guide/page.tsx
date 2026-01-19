import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Clock, Zap, Target } from "lucide-react";
import LatchVsFlipFlopVisualizer from "./LatchVsFlipFlopVisualizer";

export default function Page() {
    const currentSlug = "latch-vs-flip-flop-the-ultimate-interview-guide";
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
                Latch vs. Flip-Flop: The Guide
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                This is arguably the most common digital design interview question.
                <br />
                "What is the difference between a Latch and a Flip-Flop?"
                <br />
                The short answer: <strong>Latches are Level-Sensitive</strong>, while <strong>Flip-Flops are Edge-Triggered</strong>.
            </p>

            {/* --- Section 1: The Visual Difference --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Clock className="w-8 h-8 text-indigo-600" />
                    1. Interactive Comparison
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 mb-4">
                        Hit <strong>Start Sim</strong> below. Toggle the <strong>Input D</strong> while the clock is running. Notice:
                    </p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                        <li>The <strong className="text-rose-600">Latch</strong> changes IMMEDIATELY if Clock is High (Transparent).</li>
                        <li>The <strong className="text-emerald-600">Flip-Flop</strong> waits for the next Rising Edge (Positive Edge).</li>
                    </ul>
                </div>

                <LatchVsFlipFlopVisualizer />
            </div>

            {/* --- Section 2: Detailed Breakdown --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Target className="w-8 h-8 text-amber-600" />
                    2. Key Differences Table
                </h2>
                <div className="overflow-hidden bg-white shadow-sm rounded-xl border border-gray-200">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 uppercase text-xs font-bold text-gray-500">
                            <tr>
                                <th className="p-4 border-b">Feature</th>
                                <th className="p-4 border-b text-rose-600">Latch</th>
                                <th className="p-4 border-b text-emerald-600">Flip-Flop</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            <tr>
                                <td className="p-4 font-bold text-gray-700">Triggering</td>
                                <td className="p-4">Level-Sensitive (High or Low)</td>
                                <td className="p-4">Edge-Triggered (Rising or Falling)</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold text-gray-700">Transparency</td>
                                <td className="p-4">Yes (Output follows input during active level)</td>
                                <td className="p-4">No (Output only changes at specific instant)</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold text-gray-700">Glitch Sensitivity</td>
                                <td className="p-4">High (Glitches on D pass through)</td>
                                <td className="p-4">Low (Input only sampled at edge)</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold text-gray-700">Building Block</td>
                                <td className="p-4">Basic logic gates (NAND/NOR)</td>
                                <td className="p-4">Made of two latches (Master-Slave)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Why use Flip-Flops for Timing Analysis?
                </h3>
                <p className="text-indigo-800 text-sm leading-relaxed">
                    Most Static Timing Analysis (STA) tools are optimized for Flip-Flop based designs. Latches make timing analysis strictly harder because of "Time Borrowing" (the ability to pass data slightly after the clock edge). Flip-Flops provide a hard, clear boundary for clock cycles, making pipeline design much safer.
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
