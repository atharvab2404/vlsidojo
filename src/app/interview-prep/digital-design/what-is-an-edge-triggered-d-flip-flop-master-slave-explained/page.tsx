import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Zap, Layers } from "lucide-react";
import DFFVisualizer from "./DFFVisualizer";

export default function Page() {
    const currentSlug = "what-is-an-edge-triggered-d-flip-flop-master-slave-explained";
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
                Edge-Triggered D Flip-Flop
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                The <strong>D Flip-Flop</strong> is the standard "brick" of digital design. Unlike a latch, which is transparent, a Flip-Flop only captures data at the <strong>precise moment of the clock edge</strong>. This is typically built using a "Master-Slave" configuration.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Layers className="w-8 h-8 text-indigo-600" />
                    1. Inside the Black Box (Master-Slave)
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700">
                        A Flip-Flop is actually <strong>two Latches</strong> chained together!
                        <br />
                        • <strong>Master:</strong> Tracks Input (D) when Clk = 0.
                        <br />
                        • <strong>Slave:</strong> Copies Master when Clk = 1 (Rising Edge).
                        <br />
                        This trick locks the data exactly at the 0 → 1 transition.
                    </p>
                </div>

                <DFFVisualizer />
            </div>

            {/* --- Circuit Diagram --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Layers className="w-8 h-8 text-indigo-600" />
                    2. Circuit Diagrams
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center">
                    <p className="text-gray-600 mb-6 text-center">
                        The Master-Slave configuration connects two Level-Sensitive Latches in series, clocked on opposite phases.
                        <br />
                        <span className="text-sm text-gray-500">(Master enables on Low, Slave enables on High)</span>
                    </p>
                    <div className="bg-white p-4 rounded-lg shadow-sm w-full max-w-2xl border border-gray-100">
                        <img
                            src="/images/circuits/dff-master-slave.svg"
                            alt="Master-Slave D Flip-Flop Schematic"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </div>

            {/* --- Theory --- */}
            <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100 mb-12">
                <h3 className="text-2xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                    <Zap className="w-6 h-6" />
                    Why is this "Edge Triggered"?
                </h3>
                <p className="text-emerald-800 leading-relaxed mb-6">
                    Imagine a two-door airlock.
                    <br /><br />
                    1. <strong>Clk = 0:</strong> Outer door (Master) is OPEN. You can walk in. Inner door (Slave) is CLOSED.
                    <br />
                    2. <strong>Clk goes 0 → 1:</strong> Outer door SLAMS SHUT (Master holds state). Inner door OPENS (Slave outputs Master's state).
                    <br /><br />
                    Because the outer door shuts <em>at the exact moment</em> the inner door opens, <strong>no new data can get in</strong> while the output is being updated.
                </p>

                {/* Setup and Hold Time Callout */}
                <div className="bg-white/60 p-4 rounded-xl border border-emerald-200">
                    <h4 className="font-bold text-emerald-900 mb-2 text-sm uppercase tracking-wide">Interview Critical: Timing Constraints</h4>
                    <ul className="space-y-3 text-sm text-emerald-900">
                        <li>
                            <strong>Setup Time (t_su):</strong> How long data must be stable <em>before</em> the clock edge. (Like arriving at the airport before the gate closes).
                        </li>
                        <li>
                            <strong>Hold Time (t_h):</strong> How long data must remain stable <em>after</em> the clock edge. (Like waiting for the door to fully lock before leaving).
                        </li>
                        <li className="text-xs text-emerald-700 italic">
                            Violation = Metastability (The precise state is not captured).
                        </li>
                    </ul>
                </div>
            </div>

            <SubtopicNav prev={navPrev} next={navNext} />
        </div>
    );
}
