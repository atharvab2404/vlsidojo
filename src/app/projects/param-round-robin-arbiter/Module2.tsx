"use client";

import { useState } from "react";
import { X } from "lucide-react";
import MCQBlock from "./MCQBlock";

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
          Our parametrized Round-Robin arbiter is a single design that can behave in three different ways, chosen by a configuration setting.
          It takes multiple request signals as input and provides a single grant signal as output, indicating which requester has won access.
           It also takes an enable signal, which pauses or resumes arbitration.
        </p>
        <p className="leading-7 inter-body">
          The key to its flexibility lies in parametrization.
          Instead of designing three separate arbiters, we build one smart arbiter whose internal logic adapts based on a TYPE parameter.
          This makes the design reusable and scalable for different scenarios.
        </p>
        <p className="leading-7 inter-body">
            The arbiter's heart consists of two main logical sections:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
            <li> <strong>Combinational Logic (Decision-Making):</strong> This part instantly decides who gets the grant in the current cycle, based on the current requests and the information remembered by the sequential logic.</li>
            <li> <strong>Sequential Logic (Memory & State):</strong> This part instantly decides who gets the grant in the current cycle, based on the current requests and the information remembered by the sequential logic.</li>
        </ol>

        <hr className="my-10 border-slate-200" />

        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          Conventional Rotating Scheme (TYPE==0)
        </h2>
        <p className="leading-7 inter-body">
          <strong>Principle:</strong> This is the most straightforward round-robin.
          It's like a circular turn-taking system where the "priority pointer" always moves to the next person in line, 
          regardless of whether the current "priority holder" actually requested.
        </p>
        <p className="leading-7 inter-body">
          <strong>Our Goal:</strong> We will build a fair arbiter. Imagine a group of people sitting at a round table.
           They pass a "talking stick" around. Whoever has the stick gets to talk. 
           This is the core idea of Round Robin - everyone gets a turn in a fixed order.
        </p>
        <p className="leading-7 inter-body">
            Our arbiter will use a digital pointer <i>(ptr)</i> that acts like that talking stick.
        </p>
        

        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          1. The Combinational Logic - Who Wins the Grant Right Now?
        </h3>
        <p className="leading-7 inter-body">
            First, let's figure out how to pick a winner for the current clock cycle.
            This is pure combinational logic. We'll use a classic and highly efficient hardware trick: <strong>Rotate -&gt; Prioritize -&gt; Rotate Back.</strong>
        </p>
        <ol className="list-decimal pl-6 space-y-2">
            <li> <strong>Rotate the Requests</strong> 
            <p className="leading-7 inter-body">
                The ptr tells us where to start looking. We need to bring the requester at the ptr position to a fixed spot (like bit 0) so we can easily work with it.
                We do this by shifting the request vector i_req to the right by ptr positions.
                <ul className="list-disc pl-6 space-y-2">
                    <li><b>The Challenge:</b> A simple shift &gt;&gt; loses bits. How do we handle the wrap-around?</li>
                    <li><b>The Trick:</b> We temporarily double the request vector (&#123;2&#123;i_req&#125;&#125;). This gives us a "copy" to pull bits from as we shift.</li>
                </ul>
            </p>
            </li>
            <li> <strong>Find the First '1'</strong> 
            <p className="leading-7 inter-body">
                Now that our requests are rotated, the highest priority requester is the one closest to the right (the lowest bit position). 
                We need to find the very first 1 in <i>rotate_r</i>.
                <ul className="list-disc pl-6 space-y-2">
                    <li><b>The Challenge:</b> Looping through bits is slow in hardware.</li>
                    <li><b>The Trick:</b> There's a clever bit-twiddling formula: <b>X & ~(X - 1)</b>.
                     This magical expression isolates the lowest set bit in X and sets all others to zero. For example, if X = <i>8'b10110100</i>, then <b>X & ~(X-1)</b> results in <i>8'b00000100</i>.</li>
                </ul>
            </p>
            </li>
            <li> <strong>Rotate Back</strong> 
            <p className="leading-7 inter-body">
                We've picked a winner <i>(priority_out)</i>, but its bit is in the wrong position. We need to shift it back to where it originally was by rotating it left by <i>ptr</i> positions
            </p>
            </li>
        </ol>
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

        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          2. The Sequential Logic - Who's Next?
        </h3>
        <p className="leading-7 inter-body">
            Now we can implement our new, more efficient pointer logic. 
            This will go into the sequential always @(posedge i_clk...) block, just like in the last mission.
        </p>
        <ol className="list-decimal pl-6 space-y-2">
            <li> <strong>The always Block</strong> 
            <p className="leading-7 inter-body">
                State (like our <i>ptr</i>) must be stored in a register. We define this behavior inside a clocked always block. 
                This block will also register our combinational gnt signal to produce a stable output, <i>o_gnt</i>.
                <ul className="list-disc pl-6 space-y-2">
                    <li><b>Your Task:</b>  Create the structure for a synchronous process with an asynchronous, active-low reset.</li>
                </ul>
            </p>
            </li>
            <li> <strong>Resetting the State</strong> 
            <p className="leading-7 inter-body">
                When the reset signal <i>(i_rstn)</i> is active (HIgh), we must force our arbiter into a known, default state. The pointer and the final grant output should both be 0.
            </p>
            </li>
            <li> <strong>Updating the Pointer</strong> 
            <p className="leading-7 inter-body">
                For a "Conventional" arbiter, the rule is simple: after every arbitration, the pointer moves to the next position. 
                It's fair but not always the most efficient.
                <ul className="list-disc pl-6 space-y-2">
                    <li><b>The Logic:</b> increment ptr by 1 each clock cycle</li>
                    <li><b>The Wrap-Around:</b> If the pointer is at the last position (N-1), it must wrap around back to 0.</li>
                </ul>
            </p>
            </li>
        </ol>
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

        <MCQBlock />
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
