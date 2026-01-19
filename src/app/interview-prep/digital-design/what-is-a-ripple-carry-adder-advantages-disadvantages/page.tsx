import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Waves, Clock, AlertTriangle } from "lucide-react";
import RCAVisualizer from "./RCAVisualizer";

export default function Page() {
    const currentSlug = "what-is-a-ripple-carry-adder-advantages-disadvantages";
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
                Ripple Carry Adder (RCA)
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                We know a Full Adder can add 3 bits. But how do we add 32-bit or 64-bit numbers? The simplest way is to chain Full Adders together in a line. This is called a <strong>Ripple Carry Adder</strong>.
            </p>

            {/* --- Section 1: The Concept --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Waves className="w-8 h-8 text-blue-500" />
                    1. The "Ripple" Effect
                </h2>
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Imagine a line of people passing buckets of water. The outcome of the last person depends on the bucket reaching them from the first person.

                        <br /><br />
                        In an RCA, the <strong>Carry Out</strong> of bit 0 becomes the <strong>Carry In</strong> of bit 1, and so on.
                        The Carry signal "ripples" through the circuit from LSB to MSB.
                    </p>
                    <div className="flex gap-4 items-center justify-center font-mono text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="bg-white p-2 border rounded">FA 0</div>
                        <span className="text-amber-500 font-bold">→ Cout → Cin →</span>
                        <div className="bg-white p-2 border rounded">FA 1</div>
                        <span className="text-amber-500 font-bold">→ Cout → Cin →</span>
                        <div className="bg-white p-2 border rounded">FA 2</div>
                        <span className="text-amber-500 font-bold">→ Cout → Cin →</span>
                        <div className="bg-white p-2 border rounded">FA 3</div>
                    </div>
                </div>
            </div>

            {/* --- Section 2: Visualizer --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                interactive Simulation
            </h2>
            <p className="text-gray-600 mb-4">
                Set the inputs to <strong>1111 + 0001</strong> and click "Calculate". Watch how the carry propagates one by one. This delay is real!
            </p>

            <RCAVisualizer />

            {/* --- Section 3: The Delay Problem --- */}
            <div className="mt-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Clock className="w-8 h-8 text-red-500" />
                    3. The Propagation Delay Problem
                </h2>
                <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                    <h3 className="font-bold text-red-900 mb-2">Equation for Delay</h3>
                    <p className="text-red-800 mb-4">
                        If one Full Adder takes T<sub>delay</sub> nanoseconds to produce a carry, then an N-bit RCA takes:
                    </p>
                    <div className="text-2xl font-bold text-center text-red-900 font-mono mb-4">
                        Total Delay = N × T<sub>delay</sub>
                    </div>
                    <p className="text-red-800">
                        For a 64-bit adder, this is <strong>64 times slower</strong> than a single bit. This is unacceptable for modern high-speed CPUs (GHz range).
                    </p>
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
