"use client";

import { useState } from "react";
import { X } from "lucide-react";
import MCQBlock from "./MCQBlock";
import CalloutBox from "./CalloutBox";

type ModuleProps = {
  readModules?: boolean[]; // tracks which modules are read
  handleCheckboxChange?: (index: number) => void; // toggle module read state
  setModule?: (module: number) => void; // navigate between modules
};

export default function Module2({
  readModules = [false, false, false], // default for 3 modules
  handleCheckboxChange = () => {},     // noop if not passed
  setModule = () => {},                 // noop if not passed
}: ModuleProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Execution / Core */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          Design and Execution
        </h2>
        <p className="leading-7 inter-body">
          <b>What is it?</b> A circuit that can find a specific sequence of bits (a "pattern") within a continuous, high-speed stream of data.
        </p>
        <p className="leading-7 inter-body">
          Data streams are often unaligned. The pattern you're looking for might start in the middle of one data chunk and end in the next. 
          Our design must be smart enough to find the pattern no matter where it appears.
        </p>
        <p className="leading-7 inter-body">
            We will build this in three logical stages:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
            <li> <strong>The Sliding Window:</strong>  A buffer to capture and hold a history of the data stream.</li>
            <li> <strong>The Comparator Array:</strong> Logic to search the entire window for our pattern in parallel.</li>
            <li> <strong>The Enable Mask:</strong> A refinement to make our design robustly handle invalid data.</li>
        </ol>

        <hr className="my-10 border-slate-200" />

        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          The Sliding Window - Capturing the Data Stream
        </h2>
        <p className="leading-7 inter-body">
          Before we can search for a pattern, we need to capture the data. 
          Since the pattern could be split across multiple incoming data chunks, we need to store a history of the most recent bits.
        </p>
        <p className="leading-7 inter-body">
          <strong>The Concept:</strong> We'll create a big shift register called sample_buf. 
          Think of it as a long conveyor belt for bits.
          With every clock cycle, we add the new data chunk to one end and let the oldest bits fall off the other end, 
          giving us a continuous "snapshot" of the data stream's history.

        </p>
        <p className="leading-7 inter-body">
            The Size: The buffer size is controlled by two parameters:
            <ul className="list-disc pl-6 space-y-2">
              <li><b>WIDTH:</b> The number of parallel bits we receive each cycle.</li>
              <li><b>DEPTH:</b> How many cycles of WIDTH-sized chunks we want to store. The total buffer size will be DEPTH * WIDTH bits.</li>
            </ul>
        </p>
        

        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          1. The always Block and Reset
        </h3>
        <p className="leading-7 inter-body">
            This buffer is a stateful element (it has memory), so we need a sequential always @(posedge clk) block. 
            We also need an active-low reset (nrst) to clear the buffer to a known state (all zeros) at the beginning.
        </p>
        <p className="leading-7 inter-body">
            <b>Your Task:</b> Create the structure for the always block and add the reset logic for sample_buf.
        </p>
        <CalloutBox type="warning" title="⚠️ Warning: Resetting Your State">
          Forgetting to reset a register is a classic hardware design bug. If sample_buf isn't cleared at startup, 
          it will contain unknown (X) values, and your pattern matching will never work correctly until the entire buffer has been flushed with new data, 
          which could take many cycles. Always reset your state!
        </CalloutBox>
        <p className="leading-7 inter-body">
            Now Let's try writing the pseudo-code for all these 3 steps!!
        </p>
        {/* === Pseudo-code Practice Section === */}
        <div className="pseudo-code">
          <div className="my-6 p-4 bg-gray-900 rounded-xl shadow-lg border border-green-400 relative font-mono">
            {/* Fake terminal header */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-3 text-green-300 text-xs tracking-widest uppercase">
                Terminal
              </span>
            </div>

            {/* Title */}
            <h4 className="text-lg inter-subheading text-green-400 mb-2">
              ✍️ Pseudo-code Practice
            </h4>
            <p className="text-sm text-green-200 mb-3 opacity-80 inter-body">
              Write down the expected behavior in simple pseudo-code before
              looking at the solution.
            </p>

            {/* User Notepad */}
            <textarea
              className="w-full h-40 p-3 bg-black border border-green-500 rounded-lg font-mono text-sm text-green-200 placeholder-green-600 focus:ring-2 focus:ring-green-400 outline-none fira-code-body"
              placeholder="Write your pseudo-code here..."
            />

            {/* Collapsible Solution */}
            <details className="mt-4">
              <summary className="cursor-pointer text-green-400 font-medium hover:underline">
                💡 Show Solution
              </summary>
              <pre className="mt-2 p-4 bg-black text-green-300 rounded-lg text-sm overflow-x-auto border border-green-600 shadow-inner fira-code-body">
{`req_doubled = {i_req, i_req};
rotated_req = req_doubled >> ptr;
priority_out = rotated_req & ~(rotated_req - 1);
prio_doubled = {priority_out, priority_out};`}
              </pre>
            </details>
          </div>
        </div>
        {/* === End of Pseudo-code Section === */}
        <CalloutBox type="tip" title="Pro Tip: Non-blocking Assignments">
          Inside sequential blocks (always @(posedge clk)), always use the non-blocking assignment operator (&lt;=). 
          This tells the simulator to schedule the assignment for the end of the time step, which correctly models how flip-flops behave in real hardware. 
          Using a blocking (=) assignment here can lead to simulation errors and mismatches with the synthesized hardware.
        </CalloutBox>
        
        

        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          2. The Shift-and-Concatenate Logic
        </h3>
        <p className="leading-7 inter-body">
            This is the core of the sliding window. We need to shift the existing data in sample_buf to make room for the new data.
        </p>
        <p className="leading-7 inter-body">
            <b>The Trick:</b> In SystemVerilog, we can do this in one elegant line using the concatenation operator {}. 
            We take a slice of the most recent bits from sample_buf and attach the brand-new data chunk to the end. 
            The oldest WIDTH bits are automatically discarded.
        </p>
        <p className="leading-7 inter-body">
            <b>Your Task:</b> Add the shifting logic to the else part of your always block.
        </p>
        <CalloutBox type="info" title="Interesting Fact: How This Becomes Hardware">
          The line sample_buf &lt;= slice, data synthesizes into a bank of flip-flops (the sample_buf register) 
          where the input to each flip-flop is fed by a large multiplexer. 
          The connections are wired such that on each clock cycle, the data is "shifted" to the next flip-flop in the chain, 
          and the new data is loaded into the start of the chain. It directly maps to a physical shift register circuit.
        </CalloutBox>

        
      </section>

      {/* Navigation Controls */}
      <div className="grid grid-cols-3 items-center mt-10 bg-slate-50 p-4 rounded-xl shadow-sm">
        {/* Previous button */}
        <div className="flex justify-start">
          <button
            onClick={() => setModule(2)}
            className="px-5 py-2 rounded-lg font-medium shadow-md transition-colors bg-blue-600 hover:bg-blue-700 text-white"
          >
            ← Module 2
          </button>
        </div>

        {/* Checkbox */}
        <div className="flex justify-center">
          <label htmlFor="read3" className="flex items-center space-x-2 text-slate-700">
            <input
              type="checkbox"
              id="read3"
              checked={readModules[2]}          
              onChange={() => handleCheckboxChange(1)}
              className="h-4 w-4 accent-blue-600 rounded"
            />
            <span>I have read this module</span>
          </label>
        </div>

        {/* Finish button */}
        <div className="flex justify-end">
          <button
            disabled={!readModules[2]}          
            onClick={() => setModule(4)}        
            className={`px-5 py-2 rounded-lg font-medium shadow-md transition-colors ${
              readModules[2]
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Finish Dojo →
          </button>
        </div>
      </div>

      
      
    </div>
  );
}
