import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import JKRaceVisualizer from "./JKRaceVisualizer";

export default function Page() {
    const currentSlug = "the-jk-flip-flop-race-around-condition";
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
                JK Race Around Condition
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                The standard JK Latch has a fatal flaw when $J=1$ and $K=1$. If the clock pulse is too long, the output won't just toggle once—it will <strong>race</strong> (toggle repeatedly). This is a classic interview topic.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                    1. Visualizing the Race
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700">
                        In "Level Triggered" mode, notice how <strong>Q oscillates wildly</strong> whenever the Clock (Yellow) is High. This is the race!
                        <br />Switch to "Edge Triggered" to see how the Master-Slave design fixes this.
                    </p>
                </div>

                <JKRaceVisualizer />
            </div>

            {/* --- Theory --- */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why does it Race?</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                    When J=1, K=1, the logic tells the output to <strong>Toggle</strong> (Q(next) = Q̅).
                    <br /><br />
                    In a <strong>Level Triggered</strong> latch, the gate is open for the entire duration of the clock pulse (t_pulse).
                    <br />
                    If the internal propagation delay (t_delay) is small, the signal can travel from Input → Output → Feedback → Input multiple times <em>while the clock is still high</em>.
                </p>

                <div className="bg-red-50 p-6 rounded-xl border border-red-100 mb-6">
                    <h4 className="font-bold text-red-900 mb-2">The Condition for Racing:</h4>
                    <p className="font-mono text-lg text-red-800">
                        t_pulse &gt; t_delay
                    </p>
                    <p className="text-sm text-red-700 mt-2">
                        (The clock pulse is wider than the time it takes for the signal to loop back).
                    </p>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">The Solution (Master-Slave)</h3>
                <p className="text-gray-700 leading-relaxed">
                    By breaking the feedback loop with a <strong>Master-Slave</strong> configuration (Edge Triggering), we ensure that the input is disconnected from the output while the data is changing.
                    <br />
                    Effectively, <strong>t_pulse &lt; t_delay</strong> is forced because the "aperture" for change is instantaneous (the edge).
                </p>
            </div>

            {/* --- Deep Dive: Waveform Analysis --- */}
            <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100 mb-12">
                <h3 className="text-2xl font-bold text-indigo-900 mb-4">Deep Dive: Waveform Analysis</h3>
                <ul className="list-disc pl-5 text-indigo-800 space-y-2">
                    <li>
                        <strong>Initial State:</strong> Assume Q=0. J=K=1.
                    </li>
                    <li>
                        <strong>Clock Goes High:</strong> Since J=1, the Latch sets Q=1 after a small propagation delay (t_pd).
                    </li>
                    <li>
                        <strong>Feedback Loop:</strong> This new Q=1 travels back to the K input. Since K=1 and Q=1, the Latch now wants to Reset (Q=0).
                    </li>
                    <li>
                        <strong>Oscillation:</strong> If the Clock is <em>still high</em>, Q flips back to 0. Then J sees 0 and sets it to 1 again. The output toggles at a frequency of 1 / (2 · t_pd).
                    </li>
                </ul>
            </div>

            <SubtopicNav prev={navPrev} next={navNext} />
        </div>
    );
}
