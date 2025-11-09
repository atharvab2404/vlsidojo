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
}: ModuleProps) {
  return (
    <div>
      {/* Introduction */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          Introduction
        </h2>
        <p className="leading-7 inter-body">
          Imagine using <strong>Ctrl+F</strong> to find a word in a document. 
          It’s simple, right? But what if the document was a raw, continuous stream of binary data, arriving millions of times per second? 
          And what if the data wasn't a neat sequence, but came in wide, parallel chunks?
        </p>
        <p className="leading-7 inter-body">
          This is a common challenge in high-speed digital systems, from network routers inspecting data packets to storage controllers reading from flash memory. 
          We need a specialized hardware module that can constantly scan this high-speed data stream to find a specific, predefined bit pattern.
        </p>
        <h2 className="text-xl inter-subheading text-slate-900 tracking-tight">
          Your Mission
        </h2>
        <p className="leading-7 inter-body">
            In this dojo, you will design and build a powerful, configurable, and reusable Pattern Detector in SystemVerilog. You will learn how to:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
            <li> Create a sliding window (shift register) to buffer incoming parallel data.</li>
            <li> Implement a parallel search algorithm to find a pattern at any bit position.</li>
            <li> Build a flexible module using parameters that can be adapted for any data width or pattern.</li>
        </ol>
        <p className="leading-7 inter-body">
            By the end, you'll have a piece of synthesizable hardware capable of finding a needle in a digital haystack, a fundamental skill for any digital design engineer.
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
          <li><b>Digital Logic Fundamentals:</b> Knowing what basic gates (AND, OR, NOT) do, and the distinction between combinational logic (outputs instantly react to inputs, no memory) and sequential logic (outputs depend on current and past inputs, involving memory elements like flip-flops)</li>
          <li><b>SystemVerilog Fundamentals:</b> You should be comfortable with module definitions, input/output logic ports, and the difference between combinational (always_comb) and sequential (always @(posedge clk)) logic.</li>
          <li><b>Bit-Slicing and Part-Select:</b>  Knowledge of how to select a range of bits from a vector, especially the indexed part-select ([&lt;start_bit&gt;+:&lt;width&gt;]), which is critical for this design.</li>
          <li><b>The Idea of a "Module":</b> Thinking of a circuit as a black box with defined inputs and outputs.</li>
          <li><b>Parameters in Design:</b> Understanding how a single design can be made flexible by using configurable settings (like the number of inputs)</li>
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

      {/* Navigation Controls */}
      <div className="grid grid-cols-3 items-center mt-10 bg-slate-50 p-4 rounded-xl shadow-sm">
        
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
