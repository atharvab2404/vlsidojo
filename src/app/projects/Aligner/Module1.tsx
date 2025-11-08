"use client";

export default function Module1({ readModules, handleCheckboxChange, setModule }) {
  return (
    <div>
      {/* Introduction */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          <strong>Introduction: Why Alignment Matters</strong>
        </h2>
        <p className="leading-7 inter-body">
          The module you are studying, an Aligner (often called a Data Packer or Priority Compressor), is a fundamental building block in high-throughput digital hardware. Its purpose is to take an array of data, some of which may be marked as invalid (sparse data), and compress it by moving all the valid data elements to the front of the array, ensuring no 'gaps' or 'bubbles' remain in the data stream.
        </p>
        <p className="leading-7 inter-body">
          <h2 className="text-xl inter-subheading text-slate-900 tracking-tight"><strong>Industrial Relevance (Why this skill helps you)</strong></h2>
          Understanding data alignment and prefix sum logic is critical for many real-world, industry-level projects. This module is a high-performance solution designed for applications where latency is paramount and processing must occur in a single clock cycle.
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Network Packet Processing:</strong> In high-speed routers, the Aligner rapidly filters out empty slots and compacts valid packets. This bubble reduction is critical because every wasted clock cycle contributes directly to higher network latency and lower effective throughput.</li>
            <li><strong>Vector/Parallel Processing Units: (CPUs/GPUs)</strong>In processor vector units, the Aligner packs valid results after conditional operations, ensuring that the expensive Arithmetic Logic Units (ALUs) are immediately ready to process a full, dense block of new data, maximizing computational efficiency.</li>
            <li><strong>Resource Arbitration and Priority Encoding:</strong>The core logic is used to assign a unique index or priority to concurrent requests, which is essential for managing shared resources like memory controllers.</li>
          </ul>
        </p>
        <p className="leading-7 inter-body">
          The core skill learned here is the design and implementation of Prefix Sum (or Scan) for parallel indexing, which is a logarithmic-time algorithm when synthesized, making it significantly faster than sequential processing for hardware.
        </p>
      </section>

      <hr className="my-10 border-slate-200" />

      {/* Prerequisites */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          Prerequisites
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>SystemVerilog Basics:</strong> Familiarity with module definition, generics (parameter, type), and concurrent blocks (always_comb).</li>
          <li><strong>Combinational Logic:</strong> Understanding that the output must be computed in a single clock cycle (single-cycle design).</li>
          <li><strong>Binary Arithmetic:</strong> Knowledge of how addition (+) is used to build complex functions (essential for the Prefix Sum).</li>
          <li><strong>Multiplexers (Muxes):</strong> Understanding how data selection and routing are implemented (key to the final alignment stage).</li>
          <li><strong>Array Indexing:</strong> Comfort with using arrays and indexed assignments in hardware description languages.</li>
        </ul>
      </section>

      <hr className="my-10 border-slate-200" />


     


      {/* Signals & Ports */}
      <section className="space-y-4 mb-10">
                <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          <strong>Project Overview and Foundation (Module Setup)</strong>
        </h2>
        <p className="leading-7 inter-body">
          <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">Project Goal</h2>
          To create a configurable SystemVerilog module that performs data compression in a single clock cycle.

        </p>
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          Module Interface and Parameters
        </h2>
        <p className="leading-7 inter-body">
         The use of SystemVerilog's type and parameter allows the design to be generic and highly reusable.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="border-b border-slate-300">
                <th className="px-3 py-2 text-left">Signal</th>
                <th className="px-3 py-2 text-left">Direction</th>
                <th className="px-3 py-2 text-left">Type</th>
                <th className="px-3 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="px-3 py-2">valid_in</td><td>Input</td><td>logic [N-1:0]</td><td>Validity mask (1=valid).</td></tr>
              <tr><td className="px-3 py-2">data_in</td><td>Input</td><td>T [N-1:0]</td><td>Array of input data elements.</td></tr>
              <tr><td className="px-3 py-2">valid_out</td><td>Output</td><td>logic [N-1:0]</td><td>Validity mask for the output array.</td></tr>
              <tr><td className="px-3 py-2">data_out</td><td>Output</td><td>T [N-1:0]</td><td>Array of aligned output data elements.</td></tr>
              <tr><td className="px-3 py-2">Parameter N</td><td>Local</td><td>integer</td><td>The number of elements in the array.</td></tr>
              <tr><td className="px-3 py-2">Parameter T</td><td>Local</td><td>type</td><td>The data type of each element (e.g., logic [7:0]).</td></tr>
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

        {/* === Pseudo-code Practice Section === */}
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          Pseudocode practice
        </h2>
        <p className="leading-7 inter-body">
         Use the above signal table to declare the respective inputs, outputs and parameters for the module.
        </p>
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
{`MODULE Aligner(N, T):
  INPUT valid_in[N]
  INPUT data_in[N] of type T
  OUTPUT valid_out[N]
  OUTPUT data_out[N] of type T

  // Define bit width for index counting (log2(N))
  DEFINE COUNTBITS = ceil(log2(N))
  TYPE count_t = logic[COUNTBITS-1:0]`}
              </pre>
            </details>
          </div>
        </div>
        {/* === End of Pseudo-code Section === */}
      </section>

      {/* Checkbox & Navigation Buttons */}
      <div className="grid grid-cols-3 items-center mt-10 bg-slate-50 p-4 rounded-xl shadow-sm">
        {/* Left side (future Previous button) */}
        <div></div>

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

        {/* Right side - Next button */}
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
    </div>
  );
}
