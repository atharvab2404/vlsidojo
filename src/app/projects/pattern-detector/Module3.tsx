"use client";

import { useState } from "react";
import { X } from "lucide-react";
import MCQBlock from "./MCQBlock";

type ModuleProps = {
  readModules?: boolean[]; // tracks which modules are read
  handleCheckboxChange?: (index: number) => void; // toggle module read state
  setModule?: (module: number) => void; // navigate between modules
};

export default function Module3({
  readModules = [false, false, false], // default for 3 modules
  handleCheckboxChange = () => {},     // noop if not passed
  setModule = () => {},                 // noop if not passed
}: ModuleProps)  {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Execution / Core */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          Design and Execution
        </h2>
        <p className="leading-7 inter-body">
          Welcome back, engineer. In our last mission, we built a fair arbiter. But is it efficient?
        </p>
        <p className="leading-7 inter-body">
          <b>The Problem:</b> The Conventional arbiter moves its pointer by one position every time, even if the requests are sparse. 
          Imagine only requester #7 is active. The pointer will needlessly check positions #0, #1, #2, #3, #4, #5, and #6 before 
          granting #7 again. This wastes time.
        </p>
        <p className="leading-7 inter-body">
          <b>Our Goal:</b> We will upgrade our design to a Modified Round Robin Arbiter. 
          The new rule is simple and smart: the pointer will jump directly to the position after the winning requester. 
          This makes the arbitration much faster when not all requesters are active.
        </p>
        

        <hr className="my-10 border-slate-200" />

        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
           Modified Rotating Scheme (TYPE==1)
        </h2>
        <p className="leading-7 inter-body">
          <strong>Principle:</strong> This scheme is more adaptive. The "priority pointer" doesn't just blindly rotate; 
          it updates its position based on who actually won the arbitration. This often leads to slightly more efficient cycling.
        </p>
        <p className="leading-7 inter-body">
          If enable is high and a grant (grant_out) was issued in the current cycle, 
          the priority_ptr for the next cycle will be set to the requester immediately after the one that just won. 
          This makes the next arbitration start from a more relevant point.
        </p>
          
        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          1. Reusing the Grant Logic (It's Already Done!)
        </h3>
        <p className="leading-7 inter-body">
            This is the best part of modular design. 
            The combinational logic that calculates the current winner (gnt) is based on the current pointer (ptr). 
            This logic doesn't care how the pointer gets updated.
        </p>
        <p className="leading-7 inter-body">
            Therefore, the <strong>Rotate -&gt; Prioritize -&gt; Rotate Back</strong> logic you wrote in Mission 1 is exactly the same. 
            We don't need to change it at all!
        </p>
        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          2. Finding the Winner's Index
        </h3>
        <p className="leading-7 inter-body">
            To update our pointer, we first need to know which requester won. 
            Our gnt signal is "one-hot" (e.g., 8'b0100_0000), but we need the winner's binary index (in this case, 3'b101 for position 5). 
            This process is called encoding.
        </p>
        <p className="leading-7 inter-body">
            We'll create a new combinational signal, <i>ptr_arb</i>, to hold this index.
        </p>
        <ol className="list-decimal pl-6 space-y-2">
            <li> <strong>The Combinational always Block</strong> 
            <p className="leading-7 inter-body">
                We can use an always @(*) block to describe this combinational logic. The * tells the simulator to re-evaluate the block whenever any of the inputs change.
            </p>
            </li>
            <li> <strong>The Search Loop</strong> 
            <p className="leading-7 inter-body">
                Inside the block, we'll loop through the gnt vector. If we find a '1' at a certain position i, we know i is the winner's index, and we assign it to ptr_arb.
                <ul className="list-disc pl-6 space-y-2">
                    <li><b>Important:</b> We must give ptr_arb a default value before the loop. If no one is requesting, gnt will be all zeros. Without a default, we would accidentally create a latch. A safe default is the current ptr.</li>
                    <li><b>Note:</b> The synthesis tool is smart enough to convert this loop into a fast, parallel priority encoder circuit.</li>
                </ul>
            </p>
            </li>
        </ol>
        <p className="leading-7 inter-body">
            Now Let's try writing the pseudo-code for these steps!!
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
          3. The New Pointer Update Rule
        </h3>
        <p className="leading-7 inter-body">
            Now we can implement our new, more efficient pointer logic. 
            This will go into the sequential always @(posedge i_clk...) block, just like in the last mission.
            <ul className="list-disc pl-6 space-y-2">
                <li><b>The Old Rule:</b> ptr &lt;= ptr + 1</li>
                <li><b>The New Rule:</b> ptr &lt;= ptr_arb + 1</li>
            </ul>
        </p>
        <p className="leading-7 inter-body">
            This simple change is the entire secret to the Modified scheme
        </p>

        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          4. Assemble the TYPE==1 Block
        </h3>
        <p className="leading-7 inter-body">
            You're ready to add your new design to the main module. We'll add it as an else if block inside the generate statement. 
            This allows us to switch between the Conventional (TYPE==0) and Modified (TYPE==1) arbiters just by changing a single parameter.
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
