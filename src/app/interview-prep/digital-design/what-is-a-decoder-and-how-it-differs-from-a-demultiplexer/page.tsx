import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, GitBranch, Power } from "lucide-react";
import DemuxEngine from "./DemuxEngine";

export default function Page() {
    const currentSlug = "what-is-a-decoder-and-how-it-differs-from-a-demultiplexer";
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
                Demultiplexer (Demux) & Decoder
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
                If a Multiplexer is a "Many-to-One" switch, the <strong>Demultiplexer (Demux)</strong> is its reverse: a <strong>"One-to-Many"</strong> distributor. It takes a single input signal and routes it to one of many output lines.
            </p>

            {/* --- Section 1: Demux --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <GitBranch className="w-8 h-8 text-indigo-600" />
                The 1:4 Demultiplexer
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-12">
                <p className="text-gray-700 mb-4">
                    A 1:4 Demux has 1 Data Input (D), 2 Select Lines (S<sub>1</sub>, S<sub>0</sub>), and 4 Outputs (Y<sub>0</sub> - Y<sub>3</sub>).
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>If Select = <strong>00</strong>, Input D goes to <strong>Y<sub>0</sub></strong>.</li>
                    <li>If Select = <strong>01</strong>, Input D goes to <strong>Y<sub>1</sub></strong>.</li>
                    <li>...and so on. All other outputs remain 0.</li>
                </ul>
            </div>

            {/* --- Section 2: Decoder --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Power className="w-8 h-8 text-emerald-600" />
                The 2-to-4 Decoder
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-8">
                <p className="text-gray-700 mb-4">
                    A <strong>Decoder</strong> is functionally identical to a Demux where the Data Input is permanently fixed to <strong>1</strong> (High).
                </p>
                <p className="text-gray-700 mb-4">
                    It converts a Binary Code (on the Select Lines) into a <strong>"One-Hot"</strong> signal on the outputs. This is used extensively in <strong>Memory Addressing</strong> to "wake up" the correct row of memory cells.
                </p>
            </div>

            {/* --- Section 3: Interactive Visualizer --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                Interactive Engine
            </h2>
            <p className="text-gray-600 mb-4">
                Toggle between <strong>Demux Mode</strong> and <strong>Decoder Mode</strong> below to see the relationship.
            </p>

            <DemuxEngine />

            <div className="mt-16 bg-gray-50 p-8 rounded-3xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Takeaway</h3>
                <p className="text-gray-700 text-lg">
                    <strong>Decoder + Enable Signal = Demultiplexer</strong>.
                    <br />
                    In chip design, you often see blocks labeled "3:8 Decoders". If they have an "Enable" pin, they can double as 1:8 Demultiplexers for data routing!
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
