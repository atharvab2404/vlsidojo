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
          At the heart of every complex digital system lies a simple, fundamental interaction: the handshake.
          One component needs a task done, so it raises a "request." Another component sees the request, performs the task,
          and replies with an "acknowledge." This <b>Req-Ack protocol</b> is the digital equivalent of a conversation, 
          a reliable handshake that ensures two components, often running at different speeds, can communicate without losing data.
        </p>
        <p className="leading-7 inter-body">
          But what happens if the handshake is flawed? What if an <b>ack</b> never comes, or an <b>ack</b> arrives without a <b>req</b>?
          The entire system can deadlock or fail. Designing the protocol is only half the battle; proving it is 100% robust is the real challenge.
        </p>
        <p className="leading-7 inter-body">
          This is where <b>Assertion-Based Verification (ABV)</b> comes in. Instead of just simulating a few test cases,
          we will write a set of unbreakable "rules" (assertions) that define what it means for the handshake to be correct.
          Our simulator will then act as a vigilant referee, constantly checking our design against these rules. If a rule is ever broken,
          it will instantly flag the exact time and reason for the failure, making debugging incredibly efficient.
        </p>

        <hr className="my-10 border-slate-200" />

        <h2 className="text-xl inter-subheading text-slate-900 tracking-tight">
          Your Mission
        </h2>
        <p className="leading-7 inter-body">
            Over six missions, you will become both a designer and a verification expert.
            You will design three progressively complex <b>Req-Ack</b> protocols and then build a powerful assertion-based testbench for each one,
            mastering the modern workflow used to verify cutting-edge hardware.
        </p>
        <ol className="list-decimal pl-6 space-y-2">
            <li> <b>Design 1:</b> The Simple Pulse - Create a Req-Ack protocol with single-cycle pulses and a fixed delay.</li>
            <li> <b>Verification 1:</b> Build Your First Assertions - Write an SVA testbench to verify the pulse protocol.</li>
            <li> <b>Design 2:</b> The Robust Handshake - Design a protocol where req is held high until ack is received, with a variable delay.</li>
            <li> <b>Verification 2:</b> Verify the hold-until-ack protocol, checking more complex timing behaviors.</li> 
            <li> <b>Design 3:</b> The Transactional Handshake - Build a sophisticated protocol where requests have transaction IDs, and acknowledges must match the correct ID.</li>
            <li> <b>Verification 3:</b> Write assertions to verify both the timing and the data integrity of the transactional protocol.</li> 
        </ol>

        <hr className="my-10 border-slate-200" />
        
        <h2 className="text-xl inter-subheading text-slate-900 tracking-tight">
          Industrial Relevance
        </h2>
        <p className="leading-7 inter-body">
            The Req-Ack handshake is one of the most common mechanisms in digital design,
            and <b>Assertion-Based Verification (ABV)</b> is the industry-standard methodology for ensuring its correctness.
        </p>

        <p className="leading-7 inter-body">
            Where is Req-Ack Used?
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><b>Bus Protocols:</b> Industry-standard buses like AMBA (AXI, AHB) and Wishbone are built on complex VALID/READY handshakes, a form of Req-Ack.</li>
          <li><b>Clock Domain Crossing (CDC):</b> When data must pass between components running on different clocks, a Req-Ack protocol is essential to prevent data corruption.</li>
          <li><b>System-on-Chip (SoC) Communication:</b> It's the primary way different IP blocks (like a CPU, DMA, and memory controller) communicate within a chip.</li>
        </ul>

        <p className="leading-7 inter-body">
            Why is <b>Assertion-Based Verification (ABV)</b> is suitable in this case?
            Traditional testbenches can tell you if a final result is wrong, but not necessarily why or when it went wrong. Assertions are superior in several key ways:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><b>Precision Debugging:</b> Assertions pinpoint the exact moment a protocol rule is violated. Instead of spending hours tracing signals, you get an immediate "Assertion failed: ack received without req at time 55ns."</li>
          <li><b>Executable Specification:</b>  Assertions serve as living documentation. A SystemVerilog Assertion (SVA) like property p_ack_follows_req; @(posedge clk) req |-&gt; ##[1:$] ack; endproperty is a precise, unambiguous, and checkable rule that is far clearer than paragraphs of text.</li>
          <li><b>Reusability & Scalability:</b> Assertions are bound directly to the design, making them portable from block-level tests to full-chip simulations.</li>
          <li><b>Formal Verification:</b> The same assertions can be used by formal verification tools to mathematically prove that a protocol can never fail, providing a level of confidence that simulation alone can't achieve.</li>
        </ul>

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
          <li><b>Basic Verification Concepts:</b> Familiarity with the roles of a DUT and testbench.</li>
          <li><b>SystemVerilog Assertions (SVA):</b> Prior knowledge is helpful but not required. This dojo is designed to teach you SVA from the ground up.</li>
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
