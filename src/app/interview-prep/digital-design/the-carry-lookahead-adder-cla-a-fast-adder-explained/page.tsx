import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Zap, MoveRight, Layers } from "lucide-react";
import CLAVisualizer from "./CLAVisualizer";

export default function Page() {
    const currentSlug = "the-carry-lookahead-adder-cla-a-fast-adder-explained";
    const index = flatDigitalDesignTopics.findIndex((t) => t.slug === currentSlug);
    const prev = index > 0 ? flatDigitalDesignTopics[index - 1] : null;
    const next =
        index < flatDigitalDesignTopics.length - 1
            ? flatDigitalDesignTopics[index + 1]
            : null;

    // Fix next logic strictly
    const safeNext = index < flatDigitalDesignTopics.length - 1 ? flatDigitalDesignTopics[index + 1] : null;

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
                Carry Lookahead Adder (CLA)
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                The Ripple Carry Adder is too slow. The <strong>Carry Lookahead Adder (CLA)</strong> solves this by using extra logic to calculate <strong>all carries simultaneously</strong>, rather than waiting for them to ripple.
            </p>

            {/* --- Section 1: Generate and Propagate --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Layers className="w-8 h-8 text-purple-600" />
                    1. Generate (G) and Propagate (P)
                </h2>
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <p className="text-gray-700 leading-relaxed mb-6">
                        The CLA calculates two special signals for every bit position <em>independently</em> (in parallel):
                    </p>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                            <h3 className="font-bold text-indigo-900 mb-2">Generate (G)</h3>
                            <p className="text-sm text-indigo-800 mb-2">
                                When logic produces a carry regardless of input carry.
                            </p>
                            <code className="text-lg font-mono font-bold bg-white px-2 py-1 rounded">G = A • B</code>
                            <p className="text-xs text-gray-400 mt-2">If A=1 and B=1, we GENERATE a carry.</p>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                            <h3 className="font-bold text-emerald-900 mb-2">Propagate (P)</h3>
                            <p className="text-sm text-emerald-800 mb-2">
                                When logic passes an incoming carry to the next stage.
                            </p>
                            <code className="text-lg font-mono font-bold bg-white px-2 py-1 rounded">P = A ⊕ B</code>
                            <p className="text-xs text-gray-400 mt-2">If only one is 1, we PROPAGATE Cin.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Section 2: The Magic Formula --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Zap className="w-8 h-8 text-yellow-500" />
                    2. The Magic Formula
                </h2>
                <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-xl">
                    <p className="mb-4 text-gray-300">
                        Using G and P, we can write the equation for ANY carry bit simply using input variables. We don't need to wait for Cprev!
                    </p>
                    <div className="font-mono space-y-4 text-lg">
                        <div>C1 = G0 + P0.C0</div>
                        <div>C2 = G1 + P1.G0 + P1.P0.C0</div>
                        <div>C3 = G2 + P2.G1 + P2.P1.G0 + ...</div>
                    </div>
                    <p className="mt-6 text-sm text-yellow-400 font-bold flex items-center gap-2">
                        <Zap className="w-4 h-4" /> Notice: C3 calculation is purely combinational logic of inputs. No ripple delay!
                    </p>
                </div>
            </div>

            {/* --- Section 3: Visualizer --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Parallel Logic Visualization
            </h2>
            <p className="text-gray-600 mb-4">
                Observe below how G and P are computed instantly for all bits. The "Lookahead Unit" then solves the carries in constant time.
            </p>

            <CLAVisualizer />

            <SubtopicNav
                prev={
                    prev
                        ? { title: prev.title, href: `/interview-prep/digital-design/${prev.slug}` }
                        : null
                }
                next={
                    safeNext
                        ? { title: safeNext.title, href: `/interview-prep/digital-design/${safeNext.slug}` }
                        : null
                }
            />
        </div>
    );
}
