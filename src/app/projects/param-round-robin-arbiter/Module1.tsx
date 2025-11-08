"use client";

type ModuleProps = {
  readModules?: boolean[]; // tracks which modules are read
  handleCheckboxChange?: (index: number) => void; // toggle module read state
  setModule?: (module: number) => void; // navigate between modules
};

export default function Module1({
  readModules = [false, false, false], // default for 3 modules
  handleCheckboxChange = () => {},     // noop if not passed
  setModule = () => {},                 // noop if not passed
}: ModuleProps)  {
  return (
    <div>
      {/* Introduction */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          Introduction
        </h2>
        <p className="leading-7 inter-body">
          Imagine a popular coffee machine in an office. 
          At any given moment, multiple people (let's call them "requesters") might want to use it. 
          If everyone rushes at once, chaos ensues! A digital arbiter is like a sophisticated <strong>queue manager for hardware</strong>, 
          ensuring only one requester gets access to a shared resource at a time, preventing conflicts and system deadlocks.
        </p>
        <p className="leading-7 inter-body">
          This Dojo will take you on a conceptual journey into the world of a Parametrized Round-Robin Arbiter. 
          You'll understand how a single, flexible design can implement three distinct fairness policies: a basic rotating scheme,
          a more adaptive rotating scheme, and an advanced weighted scheme. This deep dive will illuminate how complex digital systems manage shared resources,
          a fundamental challenge in modern chip design.
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
          <li>Digital Logic Fundamentals: Knowing what basic gates (AND, OR, NOT) do, and the distinction between combinational logic (outputs instantly react to inputs, no memory) and sequential logic (outputs depend on current and past inputs, involving memory elements like flip-flops)</li>
          <li>Binary Numbers: How numbers are represented and manipulated in binary.</li>
          <li>System Clock & Reset: How a clock synchronizes operations in a digital system, and how a reset brings everything to a known starting state.</li>
          <li>The Idea of a "Module": Thinking of a circuit as a black box with defined inputs and outputs.</li>
          <li>Parameters in Design: Understanding how a single design can be made flexible by using configurable settings (like the number of inputs)</li>
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

      {/* Checkbox & Navigation Buttons */}
      <div className="grid grid-cols-3 items-center mt-10 bg-slate-50 p-4 rounded-xl shadow-sm">
        <div></div>

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
    </div>
  );
}
