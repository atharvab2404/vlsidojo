import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Cpu, ToggleLeft, Zap, Layers } from "lucide-react";
import LogicLab from "./LogicLab";

export default function Page() {
    const currentSlug = "digital-logic-gates-and-or-not-xor-xnor";
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
                Digital Logic Gates
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Logic gates are the physical building blocks of the digital world. Just like atoms make up matter, gates make up processors. We can visualize them as simple <strong>switches</strong> controlling the flow of electricity (data).
            </p>

            {/* --- Section 1: Basic Gates --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <ToggleLeft className="w-8 h-8 text-blue-600" />
                1. The Basic Three (AND, OR, NOT)
            </h2>
            <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* AND GATE */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-xl text-blue-900 mb-2">AND Gate</h3>
                    <p className="text-sm text-gray-600 mb-4 h-12">"All or Nothing". Output is 1 only if <strong>ALL</strong> inputs are 1.</p>
                    <div className="bg-blue-50 p-3 rounded-lg text-xs font-mono text-blue-800 border-l-4 border-blue-400">
                        <strong>Analogy:</strong><br /> Series Switches. Current flows only if Switch A AND Switch B are closed.
                    </div>
                </div>

                {/* OR GATE */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-xl text-amber-900 mb-2">OR Gate</h3>
                    <p className="text-sm text-gray-600 mb-4 h-12">"Any will do". Output is 1 if <strong>ANY</strong> input is 1.</p>
                    <div className="bg-amber-50 p-3 rounded-lg text-xs font-mono text-amber-800 border-l-4 border-amber-400">
                        <strong>Analogy:</strong><br /> Parallel Switches. Current flows if Switch A OR Switch B is closed.
                    </div>
                </div>

                {/* NOT GATE */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-xl text-purple-900 mb-2">NOT Gate</h3>
                    <p className="text-sm text-gray-600 mb-4 h-12">"The Contrarian". Output is the <strong>Inverse</strong> of input.</p>
                    <div className="bg-purple-50 p-3 rounded-lg text-xs font-mono text-purple-800 border-l-4 border-purple-400">
                        <strong>Also called:</strong><br /> Inverter. Critical for creating timing delays and memory.
                    </div>
                </div>
            </div>

            <LogicLab />

            {/* --- Section 2: Universal Gates Intro --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-16 flex items-center gap-3">
                <Layers className="w-8 h-8 text-gray-700" />
                2. Note on NAND and NOR
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
                While AND/OR are intuitive, real chips (CMOS) are actually built using <strong>NAND</strong> and <strong>NOR</strong> gates because they are physically smaller and faster to manufacture. We call them "Universal Gates" because you can build <em>any</em> other gate using just NANDs (or just NORs). <span className="text-sm italic text-gray-500">(More on this in the next topic!)</span>
            </p>

            {/* --- Section 3: Exclusive Gates --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-16 flex items-center gap-3">
                <Zap className="w-8 h-8 text-yellow-500" />
                3. The Exclusive Gates (XOR, XNOR)
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    <div className="pr-4">
                        <h3 className="font-bold text-xl text-gray-900 mb-2">XOR (Exclusive OR)</h3>
                        <p className="text-gray-600 mb-4">
                            Output is 1 if inputs are <strong>DIFFERENT</strong> ($0,1$ or $1,0$).
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            <li>Symbol: $\oplus$</li>
                            <li>Equation: $Y = A \oplus B = A'B + AB'$</li>
                            <li><strong>Key Use:</strong> Binary Addition (Sum bit).</li>
                        </ul>
                    </div>
                    <div className="pt-6 md:pt-0 md:pl-8">
                        <h3 className="font-bold text-xl text-gray-900 mb-2">XNOR (Exclusive NOR)</h3>
                        <p className="text-gray-600 mb-4">
                            Output is 1 if inputs are <strong>SAME</strong> ($0,0$ or $1,1$).
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            <li>Symbol: $\odot$</li>
                            <li>Equation: $Y = A \odot B = AB + A'B'$</li>
                            <li><strong>Key Use:</strong> Equality Comparators.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* --- Pro Tip Section --- */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-12">
                <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                    🚀 Pro Tip: Controlled Inverter
                </h3>
                <p className="text-blue-800 text-sm mb-2">
                    XOR is a "Programmable Inverter".
                </p>
                <ul className="list-decimal list-inside text-sm text-blue-800 font-mono space-y-1">
                    <li>If Control = 0: Output = Input (Buffer)</li>
                    <li>If Control = 1: Output = NOT Input (Inverter)</li>
                </ul>
                <p className="text-blue-800 text-sm mt-2">
                    This property is vital for building Adder/Subtractor circuits!
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
