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
}: ModuleProps)  {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Execution / Core */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          <strong>Core Logic - Prefix Sum (The Secret Sauce)</strong>
        </h2>
        <p className="leading-7 inter-body">
        The Prefix Sum (Exclusive Scan) calculates the destination index for every input element i. This is the count of all valid elements that appear before index i. This calculation must happen in parallel across all N elements simultaneously.
        </p>
        <p className="leading-7 inter-body">
          <em>Mathematically: new_index[i] = Sum(valid_in[j] for j from 0 to i-1)</em>
        </p>

        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          <strong>SystemVerilog Code: Prefix Sum Implementation</strong>
        </h3>
       <p className="leading-7 inter-body">
        This logic is implemented using an <em>always_comb</em> block and a <em>for loop</em>, which the synthesis tool interprets as a fast, parallel adder tree.
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
{`FUNCTION CalculatePrefixSum(valid_in):
  SET valid_count[0] = 0
  FOR i from 0 up to N-2:
    valid_count[i+1] = valid_count[i] + valid_in[i]
  RETURN valid_count`}
              </pre>
            </details>
          </div>
        </div>
        {/* === End of Pseudo-code Section === */}

       

        
      </section>
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          <strong> Output Mapping and Alignment</strong>
        </h2>
        <p className="leading-7 inter-body">
        The final and most complex step is the inverse mapping: for every output slot o, we must efficiently determine the single input i that must provide the data. This involves two conditions: valid_in[i] is true AND valid_count[i] (the destination index) equals o.
        </p>
      

        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          <strong>SystemVerilog Code: Output Alignment Implementation</strong>
        </h3>
       <p className="leading-7 inter-body">
        This block uses nested loops and helper signals to infer a large bank of parallel multiplexers (MUXes) that select the correct data based on the prefix sum results.
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
{`FUNCTION AlignData(valid_count, data_in):
  FOR o from 0 up to N-1 (Output Index):
    SOURCE_INDEX = 0
    FOR i from 0 up to N-1 (Input Index):
      // Check for exact mapping: input i is valid AND its destination is 'o'
      IS_MAPPED = (valid_count[i] == o) AND valid_in[i]
      
      // Select the winning source index i (Priority Encoder logic)
      SOURCE_INDEX = SOURCE_INDEX | (IS_MAPPED ? i : 0)

    valid_out[o] = IS_ANY_MAPPED_TO_O
    data_out[o] = data_in[SOURCE_INDEX]`}
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
            onClick={() => setModule(5)}
            className="px-5 py-2 rounded-lg font-medium shadow-md transition-colors bg-blue-600 hover:bg-blue-700 text-white"
          >
            ← Module 5
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
