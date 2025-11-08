"use client";

import { useState } from "react";
import { X } from "lucide-react";
import MCQBlock from "./MCQBlock";

type ModuleProps = {
  readModules?: boolean[]; // tracks which modules are read
  handleCheckboxChange?: (index: number) => void; // toggle module read state
  setModule?: (module: number) => void; // navigate between modules
};

export default function Module4({
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
          You've built a fair arbiter and an efficient arbiter. Now, let's build a smart one.
        </p>
        <p className="leading-7 inter-body">
          <b>The Problem:</b> In real systems, not all requesters are equal. 
           A real-time video stream is far more important than a background data log. 
           Simple fairness isn't enough; we need to handle priority.
        </p>
        <p className="leading-7 inter-body">
          <b>Our Goal:</b> We will build a Weighted Round Robin (WRR) Arbiter. 
          Each requester will have a "weight" (a priority value). The arbiter will follow two rules:
          <ul className="list-disc pl-6 space-y-2">
                <li>Only the requesters with the highest current weight get to compete.</li>
                <li>Among this high-priority group, we use the efficient Modified Round Robin scheme you built in Module 2 to pick a winner.</li>
            </ul>
        </p>
        

        <hr className="my-10 border-slate-200" />

        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
           Weighted Round Robin Scheme (TYPE==2)
        </h2>          
        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          1. The Priority Pre-Filter
        </h3>
        <p className="leading-7 inter-body">
            The core idea is to filter the incoming requests <i>(i_req)</i> before they reach our arbiter logic.
            We will generate a new, temporary request vector called req_w that only contains the "best" requests for this cycle. 
            This is all combinational logic.
        </p>
        <ol className="list-decimal pl-6 space-y-2">
            <li> <strong>Find the Highest Active Weight</strong> 
            <p className="leading-7 inter-body">
                First, we need to find the maximum weight among all requesters that are currently active.
                <ul className="list-disc pl-6 space-y-2">
                    <li><b>Action A (Masking):</b> Create a temporary signal masked that holds the weights of only the active requesters. If a requester isn't active, its masked weight is 0.</li>
                    <li><b>Action B (Find Max):</b> Loop through the masked signal to find the highest value (max).</li>
                </ul>
                
                You can write two always @(*) blocks to perform these actions.
            </p>
            </li>
            <li> <strong>Generate the Filtered Request Vector (req_w)</strong> 
            <p className="leading-7 inter-body">
                Now that we know the max priority for this cycle, we can build our filtered request vector, req_w. 
                A bit req_w[i] is set to 1 only if the original request i_req[i] is active AND its weight is equal to max.
            </p>
            <p className="leading-7 inter-body">
                You can write a third always @(*) block to generate req_w.
            </p>
            </li>
        </ol>

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
          2. Reusing the Modified Arbiter Core
        </h3>
        <p className="leading-7 inter-body">
            This is where your previous work pays off. The logic to perform Rotate -&gt; Prioritize -&gt; Rotate Back and to find the winner's index (ptr_arb) is a self-contained block.
        </p>
        <p className="leading-7 inter-body">
            Instead of feeding it i_req, we will now feed it our new, filtered req_w vector. The logic itself does not change at all.
        </p>
        <p className="leading-7 inter-body">
            Copy the grant logic and winner-encoding logic from Mission 2, but make sure it uses req_w as its input.
        </p>
        

        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          3. Managing the Weight State
        </h3>
        <p className="leading-7 inter-body">
            The weights are not constant. They must be stored in registers and updated. This is the final piece of sequential logic we need to build.
            <ul className="list-disc pl-6 space-y-2">
                <li><b>Rule 1 (Load):</b> An external signal i_load can force-load a new set of weights. This has the highest priority.</li>
                <li><b>Rule 2 (Decrement):</b> After a requester wins, its weight should be decreased by 1. 
                This is crucial to prevent a high-priority requester from starving all the others. 
                It ensures that eventually, its priority will drop, giving others a chance.</li>
            </ul>
        </p>
        <p className="leading-7 inter-body">
            Write the final always @(posedge i_clk...) block. It will manage the weight_counters register and the ptr update (which is the same as the Modified scheme).
        </p>
        <p className="leading-7 inter-body">
            Now Let's try writing the pseudo-code for this entire Modified Scheme!!
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
          Put it all together
        </h3>
        <p className="leading-7 inter-body">
            You have all the components for the most advanced arbiter. Place this logic inside a final else if (TYPE==2) block in your generate statement.
        </p>
        <p className="leading-7 inter-body">
            You have successfully designed a sophisticated, priority-aware arbiter by building a "pre-filter" on top of the efficient arbiter core you had already designed.
            This demonstrates the power of hierarchical and modular design in digital logic.
        </p>
        
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
              onChange={() => handleCheckboxChange(3)}
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
