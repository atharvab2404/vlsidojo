import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Cpu, History, Zap } from "lucide-react";
import BehaviorComparator from "./BehaviorComparator";

export default function Page() {
    const currentSlug = "what-is-a-combinational-circuit-vs-sequential";
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
                Combinational vs. Sequential Logic
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                This is the most fundamental division in digital design. Does your circuit have <strong>Memory</strong>? Does it care about <strong>Time</strong>?
            </p>

            {/* --- Section 1: The Comparison --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

                {/* Combinational Card */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border border-amber-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white p-3 rounded-xl shadow-sm">
                            <Zap className="w-6 h-6 text-amber-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Combinational</h2>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex gap-2">
                            <span className="font-bold text-amber-600">&bull;</span>
                            <span>Output depends <strong>only</strong> on present inputs.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-bold text-amber-600">&bull;</span>
                            <span>No Memory (Stateless).</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-bold text-amber-600">&bull;</span>
                            <span>No Clock required.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-bold text-amber-600">&bull;</span>
                            <span>Equation: <strong className="font-mono">Y = f(A, B, C)</strong></span>
                        </li>
                    </ul>
                    <div className="mt-6 pt-6 border-t border-amber-200/50">
                        <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">Examples</span>
                        <div className="flex gap-2 mt-2 flex-wrap">
                            <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-gray-600 border border-gray-200">Adders</span>
                            <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-gray-600 border border-gray-200">Multiplexers</span>
                            <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-gray-600 border border-gray-200">Encoders</span>
                            <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-gray-600 border border-gray-200">ALUs</span>
                        </div>
                    </div>
                </div>

                {/* Sequential Card */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white p-3 rounded-xl shadow-sm">
                            <History className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Sequential</h2>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex gap-2">
                            <span className="font-bold text-indigo-600">&bull;</span>
                            <span>Output depends on inputs <strong>AND</strong> past history.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-bold text-indigo-600">&bull;</span>
                            <span>Has Memory (State).</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-bold text-indigo-600">&bull;</span>
                            <span>Triggered by a <strong>Clock</strong> edge.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-bold text-indigo-600">&bull;</span>
                            <span>Equation: <strong className="font-mono">Q(next) = f(In, Q(now))</strong></span>
                        </li>
                    </ul>
                    <div className="mt-6 pt-6 border-t border-indigo-200/50">
                        <span className="text-xs font-bold text-indigo-800 uppercase tracking-widest">Examples</span>
                        <div className="flex gap-2 mt-2 flex-wrap">
                            <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-gray-600 border border-gray-200">Flip-Flops</span>
                            <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-gray-600 border border-gray-200">Counters</span>
                            <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-gray-600 border border-gray-200">Shift Registers</span>
                            <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-gray-600 border border-gray-200">Processors</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Section 2: Interactive Comparison --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Cpu className="w-8 h-8 text-gray-700" />
                Interactive Comparator
            </h2>
            <p className="text-gray-700 mb-6">
                Try to change the inputs below. Notice how the <strong>Combinational</strong> circuit reacts instantly, while the <strong>Sequential</strong> circuit waits for the Clock.
            </p>

            <BehaviorComparator />

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
