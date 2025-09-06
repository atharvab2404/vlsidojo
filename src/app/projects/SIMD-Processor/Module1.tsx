"use client";

export default function Module1({ readModules, handleCheckboxChange, setModule }) {
  return (
    <div>
      {/* Introduction */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          Introduction
        </h2>
        <p className="leading-7 inter-body">
          Imagine needing to perform the exact same mathematical operation (like adding two 
          numbers) on many different pairs of numbers simultaneously. Doing this one pair at 
          a time would be slow! This is where a Single Instruction, Multiple Data (SIMD) processor shines. 
          It's like having multiple mini-calculators working in parallel, all performing the same task but 
          on different data.
        </p>
        <p className="leading-7 inter-body">
          This Dojo takes you on a conceptual journey through a simple SIMD processor 
          with a specialized 16-bit SIMD ALU at its core. You'll understand how a processor 
          fetches, decodes, executes, accesses memory, and writes results, specifically tailored for 
          parallel data processing. This dive into processor architecture and SIMD principles is vital 
          for understanding modern computing, from gaming graphics to scientific simulations, and will be a 
          powerful addition to your understanding of digital systems.
        </p>
      </section>

      <hr className="my-10 border-slate-200" />

      {/* Prerequisites */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          Prerequisites
        </h2>
        <p className="leading-7 inter-body">
          To fully grasp the ideas presented here, a conceptual understanding of the following is helpful:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><b>Digital Logic Fundamentals:</b> Knowing the difference between combinational (instantaneous) and sequential (clocked) logic, and the role of memory elements like registers and Block-RAM (BRAMs).</li>
          <li><b>Binary Numbers & Arithmetic:</b> Familiarity with binary representation, basic arithmetic, and two's complement for representing negative numbers.</li>
          <li><b>System Clock & Reset:</b> How a clock synchronizes operations and how a reset brings a system to a known initial state.</li>
          <li><b>Processor Basics:</b> A high-level idea of what a CPU does (fetching instructions, processing data).</li>
          <li><b>The Idea of a "Module":</b> Thinking of a circuit as a black box with defined inputs and outputs.</li>
        </ul>
      </section>

      <hr className="my-10 border-slate-200" />

      {/* Signals & Ports */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          Module Interface (Signals &amp; Ports)
        </h2>
        <p className="leading-7 inter-body">
          The 4-bit ALU accepts two operands and an opcode, and produces a result
          with status flags.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="border-b border-slate-300">
                <th className="px-3 py-2 text-left">Signal</th>
                <th className="px-3 py-2 text-left">Direction</th>
                <th className="px-3 py-2 text-left">Width</th>
                <th className="px-3 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="px-3 py-2">i_clk</td><td>Input</td><td>1</td><td>system clock</td></tr>
              <tr><td className="px-3 py-2">i_rstn</td><td>Input</td><td>1</td><td>system reset (active high)</td></tr>
              <tr><td className="px-3 py-2">i_en</td><td>Input</td><td>1</td><td>Selects operation</td></tr>
              <tr><td className="px-3 py-2">i_req</td><td>Input</td><td>[N-1:0]</td><td>Request vector</td></tr>
              <tr><td className="px-3 py-2">i_load</td><td>Input</td><td>1</td><td>load signal</td></tr>
              <tr><td className="px-3 py-2">i_weights</td><td>Input</td><td>[N-1:0] [W-1:0]</td><td>weight</td></tr>
              <tr><td className="px-3 py-2">o_gnt</td><td>Output</td><td>[N-1:0]</td><td>Grant Vector</td></tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="max-w-xl w-full">
            <img
              src="/images/alu.png"
              alt="4-bit ALU Block Diagram"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Center - Checkbox */}
      <div className="flex justify-center">
        <label htmlFor="read1" className="flex items-center space-x-2 text-slate-700">
          <input
            type="checkbox"
            id="read1"
            checked={readModules[0]}          
            onChange={() => handleCheckboxChange(0)}
            className="h-4 w-4 accent-blue-600 rounded"
          />
          <span>I have read this module</span>
        </label>
      </div>

      <div className="flex justify-end">
        <button
          disabled={!readModules[0]}          
          onClick={() => setModule(2)}        
          className={`px-5 py-2 rounded-lg font-medium shadow-md transition-colors ${
            readModules[0]
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Move to Module 2 →
        </button>
      </div>
    </div>
  );
}
