"use client";

import { useState } from "react";
import CalloutBox from "./CalloutBox";

type Module3Props = {
  readModules?: boolean[]; // tracks which modules are read
  handleCheckboxChange?: (index: number) => void; // toggle module read state
  setModule?: (module: number) => void; // navigate between modules
};

export default function Module3({
  readModules = [false, false, false], // default for 3 modules
  handleCheckboxChange = () => {},     // noop if not passed
  setModule = () => {},                 // noop if not passed
}: Module3Props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Verification & Validation */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          Verification &amp; Validation
        </h2>
        <p className="leading-7 inter-body">
          Conceptually verify by instantiating the ALU, applying inputs, observing outputs, and comparing to expected
          results.
        </p>

        <CalloutBox
          title="⚠️ Common Pitfall: Incomplete case Statements"
          content="In Verilog, if you don't specify an output for every possible input condition within a combinational always block, the tool will infer a latch to hold the last value. This is a common source of bugs!"
        />

        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-4">Test Scenarios</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>ADD: A=0001, B=0010 → 0011, Cout=0, Zf=0</li>
          <li>ADD: A=1111, B=0001 → 0000, Cout=1, Zf=1</li>
          <li>SUB: A=0101, B=0010 → 0011, Cout=1, Zf=0</li>
          <li>SUB: A=0010, B=0101 → 1101, Cout=0, Zf=0</li>
          <li>AND: A=1010, B=0110 → 0010, Cout=0, Zf=0</li>
          <li>XOR: A=1010, B=0110 → 1100, Cout=0, Zf=0</li>
          <li>OR:  A=0000, B=0000 → 0000, Cout=0, Zf=1</li>
        </ul>

        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-4">Waveform Analysis (Conceptual)</h3>
        <p className="leading-7 inter-body">
          Use a waveform viewer to ensure signal transitions match expectations after input changes.
        </p>
      </section>

      {/* Optional Synthesis */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">Optional: Synthesis</h2>
        <p className="leading-7 inter-body">
          Synthesis converts your HDL into a gate-level netlist, checks implementability, and optimizes for area/speed.
          It provides early performance insights for hardware targets (FPGA/ASIC).
        </p>
      </section>

      {/* Conclusion */}
      <section className="space-y-4">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">Conclusion &amp; Next Steps</h2>
        <p className="leading-7 inter-body">
          You’ve conceptually designed a 4-bit ALU, explored verification ideas, and seen how synthesis connects
          concepts to gates. Consider expanding width (8/16-bit), adding operations (shifts, comparisons), exploring
          pipelining, or venturing into floating-point arithmetic.
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
              onChange={() => handleCheckboxChange(2)}
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
