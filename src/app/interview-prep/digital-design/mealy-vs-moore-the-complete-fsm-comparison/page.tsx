"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, GitGraph, Clock, Zap, Settings, AlertTriangle } from "lucide-react";
import StateMachineSimulator from "./StateMachineSimulator";

export default function Page() {
    const currentSlug = "mealy-vs-moore-the-complete-fsm-comparison";
    const index = flatDigitalDesignTopics.findIndex((t) => t.slug === currentSlug);

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
                Mealy vs Moore Machines
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Every digital controller, from a vending machine to a CPU Control Unit, is a <strong>Finite State Machine (FSM)</strong>. The first decision you must make when designing one is architectural: <strong>Mealy or Moore?</strong> This choice dictates your timing, speed, and safety.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Settings className="w-8 h-8 text-indigo-600" />
                    1. Interactive Simulation
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        Experiment with the two architectures below.
                        <br />
                        <strong>Goal:</strong> Watch <em>when</em> the Output (LED) changes relative to the Input and Clock.
                    </p>
                </div>

                <StateMachineSimulator />
            </div>

            {/* --- Theory Comparison --- */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">

                {/* Moore Machine */}
                <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-200">
                    <h3 className="flex items-center gap-2 text-2xl font-bold text-emerald-900 mb-4">
                        <Clock className="w-6 h-6" />
                        Moore Machine
                    </h3>
                    <div className="bg-white/60 p-4 rounded-xl mb-4 font-mono text-sm text-emerald-900 border border-emerald-100 text-center">
                        Output = f(Current State)
                    </div>
                    <p className="text-emerald-800 mb-4 text-sm leading-relaxed">
                        The output depends <strong>ONLY</strong> on the current state.
                        <br /><br />
                        Since the state only updates on the Clock Edge, the <strong>output is synchronous</strong> with the clock. It is stable for the entire clock cycle.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-emerald-900 text-sm">
                        <li>✅ <strong>Safer:</strong> No glitches. Output is clean.</li>
                        <li>✅ <strong>Easier Design:</strong> Decoupled from input noise.</li>
                        <li>❌ <strong>Slower Response:</strong> Must wait for next clock edge to react to input.</li>
                    </ul>
                </div>

                {/* Mealy Machine */}
                <div className="bg-amber-50 p-8 rounded-2xl border border-amber-200">
                    <h3 className="flex items-center gap-2 text-2xl font-bold text-amber-900 mb-4">
                        <Zap className="w-6 h-6" />
                        Mealy Machine
                    </h3>
                    <div className="bg-white/60 p-4 rounded-xl mb-4 font-mono text-sm text-amber-900 border border-amber-100 text-center">
                        Output = f(Current State, Inputs)
                    </div>
                    <p className="text-amber-800 mb-4 text-sm leading-relaxed">
                        The output depends on the current state <strong>AND</strong> the current inputs.
                        <br /><br />
                        This creates a direct combinational path from Input to Output. If input changes, output changes <strong>instantly</strong> (Asynchronous).
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-amber-900 text-sm">
                        <li>✅ <strong>Faster Response:</strong> Zero-cycle latency.</li>
                        <li>✅ <strong>Fewer States:</strong> Often requires fewer state bubbles to do the same job.</li>
                        <li>❌ <strong>Glitch Prone:</strong> Input noise passes directly to output.</li>
                    </ul>
                </div>
            </div>

            {/* --- Deep Dive: Block Diagrams --- */}
            <div className="space-y-8 mb-16">
                <h2 className="text-3xl font-bold text-gray-900 border-b pb-2 border-gray-200">2. Architectural Difference</h2>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col items-center">
                        <h5 className="font-bold text-gray-500 text-sm mb-4">Moore Architecture</h5>
                        <div className="mermaid">
                            {`graph LR
                                In(Inputs) --> NextLogic[Next State Logic]
                                NextLogic --> FF[State Register]
                                FF --Current State--> NextLogic
                                FF --Current State--> OutLogic[Output Logic]
                                OutLogic --> Out(Outputs)
                            `}
                        </div>
                        <p className="text-xs text-center text-gray-400 mt-4">Inputs do NOT touch Output Logic directly.</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col items-center">
                        <h5 className="font-bold text-gray-500 text-sm mb-4">Mealy Architecture</h5>
                        <div className="mermaid">
                            {`graph LR
                                In(Inputs) --> NextLogic[Next State Logic]
                                NextLogic --> FF[State Register]
                                FF --Current State--> NextLogic
                                FF --Current State--> OutLogic[Output Logic]
                                In --> OutLogic
                                OutLogic --> Out(Outputs)
                            `}
                        </div>
                        <p className="text-xs text-center text-gray-400 mt-4">Inputs bypass the Register to touch Output!</p>
                    </div>
                </div>
            </div>

            {/* --- Interview Stumper --- */}
            <div className="bg-red-50 p-8 rounded-2xl border border-red-100">
                <h3 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6" />
                    Interview Question: Why prefer Moore?
                </h3>
                <p className="text-red-800 leading-relaxed">
                    <strong>"If Mealy is faster and uses fewer states, why do most high-speed designs (like CPUs) strictly prefer Moore (or Registered Mealy)?"</strong>
                    <br /><br />
                    <strong>Answer:</strong> Glitches and Timing Analysis.
                    <br />
                    In a large system, you chain FSMs together. If Machine A is Mealy, its "glitchy" asynchronous output feeds Machine B. This makes Static Timing Analysis (STA) a nightmare because the critical path now snakes through multiple blocks without being stopped by a register.
                    <br /><br />
                    Moore machines act as <strong>Pipeline Stages</strong>, isolating timing paths, making the system robust and easier to clock at high frequencies.
                </p>
            </div>

            <SubtopicNav prev={navPrev} next={navNext} />
        </div>
    );
}
