"use client";

import { flatDigitalDesignTopics } from "../curriculum";
import SubtopicNav from "@/components/SubtopicNav";
import Link from "next/link";
import { ArrowLeft, Map, Clock, ShieldCheck, Code } from "lucide-react";
import TrafficLightVisualizer from "./TrafficLightVisualizer";

export default function Page() {
    const currentSlug = "fsm-design-problem-designing-a-traffic-light-controller";
    const index = flatDigitalDesignTopics.findIndex((t) => t.slug === currentSlug);
    const prev = index > 0 ? flatDigitalDesignTopics[index - 1] : null;
    const next =
        index < flatDigitalDesignTopics.length - 1
            ? flatDigitalDesignTopics[index + 1]
            : null;

    const navPrev = prev ? { title: prev.title, href: `/interview-prep/digital-design/${prev.slug}` } : null;
    const navNext = next ? { title: next.title, href: `/interview-prep/digital-design/${next.slug}` } : null;

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

            <h1 className="text-5xl font-extrabold text-gray-900 mb-8 tracking-tight leading-tight">
                FSM Design Problem: <br />

            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
                This problem introduces <strong>Time</strong> into our state machines.
                Unlike sequence detectors that change on every clock edge, a traffic light must <i>wait</i> for a specific duration (e.g., 30s) before transitioning.
            </p>

            {/* --- Visualizer --- */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Map className="w-8 h-8 text-indigo-600" />
                    1. Interactive Crossing
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-700 leading-relaxed">
                        A simplified 4-state machine:
                        <br />
                        <strong>NS Green &rarr; NS Yellow &rarr; EW Green &rarr; EW Yellow</strong>.
                    </p>
                </div>
                <TrafficLightVisualizer />
            </div>

            {/* --- Theory: Timers --- */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-indigo-600" /> The Timer Strategy
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        We don't want a massive state machine with 3000 states for 30 seconds.
                        <br />
                        Instead, we use a <strong>Counter</strong>.
                    </p>
                    <ul className="text-sm space-y-3 text-gray-600">
                        <li className="flex gap-2 items-start">
                            <span className="font-bold text-indigo-600 text-xs mt-1 bg-indigo-50 px-1 rounded">METHOD A</span>
                            <span><strong>External Timer:</strong> The FSM sends a <span className="font-mono text-xs bg-gray-100">start_timer</span> signal. The timer replies with <span className="font-mono text-xs bg-gray-100">done</span>.</span>
                        </li>
                        <li className="flex gap-2 items-start">
                            <span className="font-bold text-indigo-600 text-xs mt-1 bg-indigo-50 px-1 rounded">METHOD B</span>
                            <span><strong>Internal Counter:</strong> A register inside the FSM increments every cycle. It resets when state changes.</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                    <h3 className="text-xl font-bold text-indigo-900 mb-3 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-indigo-600" /> Safety Critical!
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        A bad design causes collisions.
                    </p>
                    <ul className="text-sm space-y-2 text-indigo-800">
                        <li><strong>Red Overlap:</strong> In real systems, we add a state where ALL lights are Red for 2s between Green changes to clear the intersection.</li>
                        <li><strong>Default State:</strong> On Reset, usually default to specific safe state (e.g., Blink Red or NS Green).</li>
                    </ul>
                </div>

            </div>

            {/* --- Verilog --- */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 mb-12 text-slate-300 font-mono text-sm shadow-xl">
                <div className="flex items-center gap-2 mb-6 text-slate-100 border-b border-slate-700 pb-4">
                    <Code className="w-5 h-5 text-sky-400" />
                    <span className="font-bold text-lg">Verilog Implementation (Internal Counter)</span>
                </div>

                <pre className="overflow-x-auto whitespace-pre">{`module traffic_light (
    input clk,
    input rst_n,
    output reg [1:0] ns_light, // 00=Red, 01=Yel, 10=Grn
    output reg [1:0] ew_light
);

    parameter S_NS_GRN = 0, S_NS_YEL = 1, S_EW_GRN = 2, S_EW_YEL = 3;
    reg [1:0] state, next_state;
    
    // Timer
    reg [5:0] count; // 6-bit counter for up to 63s
    reg timer_rst;   // Control signal to reset timer

    // State Transition Logic
    always @(posedge clk or negedge rst_n) begin
        if(!rst_n) begin
            state <= S_NS_GRN;
            count <= 0;
        end else begin
            state <= next_state;
            if (timer_rst) count <= 0;
            else count <= count + 1;
        end
    end

    // FSM Combinational Logic
    always @(*) begin
        next_state = state;
        ns_light = 2'b00; // Default Red
        ew_light = 2'b00; // Default Red
        timer_rst = 0;

        case(state)
            S_NS_GRN: begin
                ns_light = 2'b10; // Green
                if(count == 30) begin // 30s Green
                    next_state = S_NS_YEL;
                    timer_rst = 1;
                end
            end
            S_NS_YEL: begin
                ns_light = 2'b01; // Yellow
                if(count == 5) begin // 5s Yellow
                    next_state = S_EW_GRN;
                    timer_rst = 1;
                end
            end
            S_EW_GRN: begin
                ew_light = 2'b10;
                if(count == 30) begin
                    next_state = S_EW_YEL;
                    timer_rst = 1;
                end
            end
            S_EW_YEL: begin
                ew_light = 2'b01;
                if(count == 5) begin
                    next_state = S_NS_GRN;
                    timer_rst = 1;
                end
            end
        endcase
    end
endmodule`}</pre>
            </div>

            <div className="mt-12">
                <SubtopicNav prev={navPrev} next={navNext} />
            </div>
        </div>
    );
}
