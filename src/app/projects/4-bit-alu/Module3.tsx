"use client";

import { useState } from "react";
import { X } from "lucide-react";
import MCQBlock from "./MCQBlock";
import CalloutBox from "./CalloutBox";

export default function Module2({ readModules, handleCheckboxChange, setModule }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
        {/* Verification & Validation */}
        <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">Verification &amp; Validation</h2>
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

      {/* Checkbox & Next Button */}
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="read1"
          checked={readModules[0]}          
          onChange={() => handleCheckboxChange(0)}
          className="mr-2"
        />
        <label htmlFor="read1">I have read this module</label>
      </div>

      <button
        disabled={!readModules[0]}          
        onClick={() => setModule(2)}        
        className={`mt-4 px-4 py-2 rounded text-white ${
          readModules[0]
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Move to Module 2
      </button>

      <button
        disabled={!readModules[0]}          
        onClick={() => setModule(3)}        
        className={`mt-4 px-4 py-2 rounded text-white ${
          readModules[0]
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Finish Dojo
      </button>
    </div>
  );
}
