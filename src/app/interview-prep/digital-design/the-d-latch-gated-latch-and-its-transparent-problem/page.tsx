import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Unlock, Lock, Layers } from "lucide-react";
import DLatchVisualizer from "./DLatchVisualizer";

export default function Page() {
    const currentSlug = "the-d-latch-gated-latch-and-its-transparent-problem";
    const index = flatDigitalDesignTopics.findIndex((t) => t.slug === currentSlug);

    // Explicitly handle previous/next topic logic to strictly return { title, href } or null
    const prevTopic = index > 0 ? flatDigitalDesignTopics[index - 1] : null;
    const nextTopic = index < flatDigitalDesignTopics.length - 1 ? flatDigitalDesignTopics[index + 1] : null;

    const navPrev = prevTopic ? { title: prevTopic.title, href: `/interview-prep/digital-design/${prevTopic.slug}` } : null;
    const navNext = nextTopic ? { title: nextTopic.title, href: `/interview-prep/digital-design/${nextTopic.slug}` } : null;

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
                The D Latch & Transparency
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                The SR Latch has a problem: the invalid state (1,1). The <strong>D Latch</strong> (Data Latch) solves this by ensuring inputs are always complementary. But it introduces a new quirk: <strong>Transparency</strong>.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Unlock className="w-8 h-8 text-indigo-600" />
                    1. Interactive Experiment
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700">
                        Start the simulation. Notice that when <strong>Enable (C)</strong> is High (Yellow is up), whatever you do to <strong>Data (D)</strong> instantly appears on <strong>Output (Q)</strong>.
                        <br />
                        When Enable goes Low, the door "locks", and the last value is stored.
                    </p>
                </div>

                <DLatchVisualizer />
            </div>

            {/* --- Circuit Diagram --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Layers className="w-8 h-8 text-indigo-600" />
                    2. Circuit Diagram
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center">
                    <p className="text-gray-600 mb-4 text-center">
                        The Gated D Latch is built by adding a Steering Circuit (AND Gates) to a standard SR Latch.
                        <br />
                        Notice how the Inverter ensures S and R are never both 1.
                    </p>
                    <div className="bg-white p-4 rounded-lg shadow-sm w-full max-w-2xl border border-gray-100">
                        <img
                            src="/images/circuits/d-latch-gated.svg"
                            alt="Gated D Latch Schematic"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </div>

            {/* --- Theory --- */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                    <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
                        <Unlock className="w-5 h-5" />
                        Mode 1: Transparent (Enable = 1)
                    </h3>
                    <p className="text-indigo-800">
                        The latch acts like a piece of wire. Q simply follows D.
                        <br />
                        Q = D
                        <br />
                        Any glitch or noise on D will pass straight through to Q. This is why latches are dangerous in synchronous paths!
                    </p>
                </div>

                <div className="bg-gray-100 p-6 rounded-2xl border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Lock className="w-5 h-5" />
                        Mode 2: Latched (Enable = 0)
                    </h3>
                    <p className="text-gray-800">
                        The feedback loop is cut off from the input. The latch holds its <strong>previous value</strong>.
                        <br />
                        Q(next) = Q(prev)
                        <br />
                        Changes on D are ignored.
                    </p>
                </div>
            </div>

            {/* --- Deep Dive: Why are Latches "Bad"? --- */}
            <div className="bg-amber-50 p-8 rounded-2xl border border-amber-100 mb-12">
                <h3 className="text-2xl font-bold text-amber-900 mb-4">Deep Dive: The Transparency Problem</h3>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                        <p className="text-amber-800 leading-relaxed mb-4">
                            In a complex circuit, you often want data to move <strong>one step at a time</strong> (like soldiers marching).
                            <br /><br />
                            Because a D-Latch is transparent for the <em>entire duration</em> of the high clock pulse, data can sometimes race through <strong>multiple latches</strong> in a single cycle if the logic path is short. This makes timing analysis extremely difficult ("Time Borrowing").
                        </p>
                        <p className="text-sm font-bold text-amber-900">
                            Conclusion: Latches are fast and small, but Edge-Triggered Flip-Flops are safer for general logic design.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-amber-200 shadow-sm flex-shrink-0 md:w-80">
                        <h4 className="font-bold text-gray-900 mb-2 border-b border-gray-100 pb-2">Characteristic Equation</h4>
                        <p className="text-gray-600 text-sm mb-4">
                            The behavior can be summarized as:
                        </p>
                        <div className="font-mono text-center bg-gray-50 p-3 rounded text-indigo-700 font-bold mb-2">
                            Q(next) = E·D + E̅·Q
                        </div>
                        <p className="text-xs text-center text-gray-400">
                            (If E=1, Q=D. If E=0, Q=Q).
                        </p>
                    </div>
                </div>
            </div>

            <SubtopicNav prev={navPrev} next={navNext} />
        </div>
    );
}
