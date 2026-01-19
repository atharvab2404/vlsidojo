import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, GitMerge, Lightbulb } from "lucide-react";
import MuxLogicDesigner from "./MuxLogicDesigner";

export default function Page() {
    const currentSlug = "how-to-implement-any-boolean-function-using-a-mux";
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
                How to Implement any Boolean Function using a Mux
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
                A Multiplexer isn't just a switch; it's a <strong>Universal Logic Module</strong>. You can implement <strong>ANY</strong> boolean function of <strong>N</strong> variables using a Mux with <strong>N-1</strong> select lines.
            </p>

            {/* --- Section 1: The Concept --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <GitMerge className="w-8 h-8 text-indigo-600" />
                The "Variable Mapping" Method
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-12">
                <p className="text-gray-700 mb-6">
                    Suppose you have a function <strong>F(A, B, C)</strong>. You <em>could</em> use an 8:1 Mux with A, B, C as selectors. But that's wasteful.
                    <br /><br />
                    Instead, use a <strong>4:1 Mux</strong> (which has 2 select lines).
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-indigo-50 p-6 rounded-xl">
                        <h3 className="font-bold text-indigo-900 mb-4">Step 1: Assign Selectors</h3>
                        <p className="text-gray-700">
                            Connect the first N-1 variables to the Select Lines.
                            <br />
                            <strong>S<sub>1</sub> = A</strong>
                            <br />
                            <strong>S<sub>0</sub> = B</strong>
                        </p>
                    </div>
                    <div className="bg-indigo-50 p-6 rounded-xl">
                        <h3 className="font-bold text-indigo-900 mb-4">Step 2: Solve for Inputs</h3>
                        <p className="text-gray-700">
                            For each combination of A and B, look at the remaining variable <strong>C</strong>.
                            The input must be either <strong>0</strong>, <strong>1</strong>, <strong>C</strong>, or <strong>C'</strong>.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- Section 2: Interactive Challenge --- */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-amber-500" />
                Challenge: Logic Designer
            </h2>
            <p className="text-gray-700 mb-6">
                The tool below generates a random function F(A,B,C). Your job is to configure the 4:1 Mux inputs to implement it.
                <br />
                <span className="text-sm text-gray-500 italic">Hint: Look at the Truth Table in pairs of rows (where A,B are same). If Output follows C, choose C. If inverted, C'.</span>
            </p>

            <MuxLogicDesigner />

            <div className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-3xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why is this asked in interviews?</h3>
                <p className="text-gray-700 leading-relaxed">
                    This tests if you understand what a Mux <em>actually does</em> (routes data) rather than just memorizing the truth table.
                    It also demonstrates optimization skills—using a smaller, cheaper Mux to do the job of a larger one.
                    In FPGAs, <strong>LUTs (Look-Up Tables)</strong> are essentially Muxes implementing logic exactly like this!
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
