"use client";

import { useState } from "react";
import { X } from "lucide-react";
import MCQBlock from "./MCQBlock";
import CalloutBox from "./CalloutBox";

export default function Module2({ readModules, handleCheckboxChange, setModule }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Execution / Core */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          Design and Execution
        </h2>
        <p className="leading-7 inter-body">
          In this module, we will design the most fundamental handshake protocol. 
          The rule is simple: when the circuit sees a single-cycle req pulse, it must produce a single-cycle ack pulse exactly one clock cycle later. 
          This fixed, one-cycle delay is the defining feature of our design.
        </p>

        <p className="leading-7 inter-body">
            <b>The Timing Diagram:</b> Before we write any code, let's visualize what we want to build. This timing diagram is our blueprint.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>At the rising edge of Cycle 1, the req signal goes high.</li>
          <li>Our module sees the req.</li>
          <li>At the rising edge of Cycle 2, our module must drive the ack signal high.</li>
          <li>At the rising edge of Cycle 3, the ack signal must automatically go low again, completing the one-cycle pulse.</li>
        </ul>

        <div className="mt-6 flex justify-center">
          <div className="max-w-xl w-full">
            <img
              src="/images/req-ack/req-ack-timing-1.png"
              alt="timing diagram design 1"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        <hr className="my-10 border-slate-200" />

        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          The Need for Flops
        </h2>
        <p className="leading-7 inter-body">
          How do we create a delay? We can't use a simple assign <code className="text-gray-300 bg-gray-700 px-1 py-0.5 rounded">ack = req</code>; 
          because that would be a purely combinational circuit with no delay. The <code className="text-gray-300 bg-gray-700 px-1 py-0.5 rounded">ack</code> would happen at the same time as <code className="text-gray-300 bg-gray-700 px-1 py-0.5 rounded">req</code>.
        </p>
        <p className="leading-7 inter-body">
          To create the one-cycle delay, our circuit needs <b>memory</b>. 
          It needs a way to <i>remember</i> that it has seen a request in the current cycle so it can take action in the <i>next</i> cycle.
        </p>
        <p className="leading-7 inter-body">
          This is the perfect job for a flip-flop. We will create an internal one-bit flag, 
          a "memory bit," to track the state of our handshake. Let's call it <code className="text-gray-300 bg-gray-700 px-1 py-0.5 rounded">req_seen</code>.
        </p>
        
        

        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          1. Module and State Variable Definition
        </h3>
        <p className="leading-7 inter-body">
            First, let's define our module's interface and declare our internal state variable. This sets up the basic structure.
        </p>
        <p className="leading-7 inter-body">
            <b>Your Task:</b> Create a module named reqack_logic with the standard clk, rst_n, req, and ack ports. Inside, declare a logic signal named req_seen.
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
              ✍️ reqack_logic.sv
            </h4>
            

            {/* User Notepad */}
            <pre className="w-full p-3 bg-black border border-green-500 rounded-lg font-mono text-sm text-green-200 placeholder-green-600 focus:ring-2 focus:ring-green-400 outline-none fira-code-body whitespace-pre-wrap break-words">
  <code>
{`// Module Declaration:
module reqack_logic (
    input  logic clk,
    input  logic rst_n,
    input  logic req,
    output logic ack
);

  // Internal flag to remember that a request occurred
  logic req_seen;

  // ... Logic will go here ...

endmodule`}
  </code>
</pre>

            
          </div>
        </div>
        {/* === End of Pseudo-code Section === */}

        
        
        
        
        

        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          2. The Synchronous Process and Reset
        </h3>
        <p className="leading-7 inter-body">
            All state-holding logic (anything with memory) must be inside a synchronous <code className="text-gray-300 bg-gray-700 px-1 py-0.5 rounded">always_ff</code> block. 
            This ensures our logic only changes on a clock edge, which is the foundation of reliable digital design. 
            We must also define what happens when the system is reset.
        </p>
        <p className="leading-7 inter-body">
            <b>Your Task:</b> Create an <code className="text-gray-300 bg-gray-700 px-1 py-0.5 rounded">always_ff</code> block that is sensitive to the positive edge of clk and the negative edge of rst_n.
            Inside, add the reset logic: if rst_n is not active (!rst_n), set both req_seen and ack to 0.
        </p>
        <CalloutBox type="tip" title="Pro Tip">
          Using an asynchronous reset (<code className="text-gray-300 bg-gray-700 px-1 py-0.5 rounded">negedge rst_n</code>) is a standard industry practice. 
          It allows the system to be put into a known state immediately, without waiting for a clock edge.
        </CalloutBox>

        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          2. The Core Handshake Logic
        </h3>
        <p className="leading-7 inter-body">
            Now we implement the main logic inside the else block. We can think of this as a simple two-step process: Detect and Act.
        </p>
        <ol className="list-decimal pl-6 space-y-2">
            <li> <b>Detect:</b> On a given clock cycle, we check if a new request has arrived.</li>
            <li> <b>Act:</b> On the next clock cycle, we generate the ack.</li>
        </ol>
        
        <p className="leading-7 inter-body">
            <b>Logic in Plain English</b>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>On every clock cycle, we will first assume the ack should be 0. This is our default.</li>
          <li>F we see req is high AND we haven't already seen a request (!req_seen), it means a new request just arrived. We Detect it by setting our memory bit: req_seen &lt;= 1'b1.</li>
          <li>ELSE IF our memory bit is already set (req_seen is 1), it means we detected a request on the previous cycle. Now is the time to Act. We generate the acknowledge pulse (ack &lt;= 1'b1) and simultaneously clear our memory bit (req_seen &lt;= 1'b0) so we are ready for the next handshake.</li>
        </ul>

        <p className="leading-7 inter-body">
            Now Let's try writing the pseudo-code for all these 3 steps!!
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
              Fill in the Blanks in the below pseudocode.
            </p>

            {/* User Notepad */}
    <textarea
      ref={(el) => {
        if (!el) return;
        // --- Auto-resize logic inline ---
        const adjustHeight = () => {
          el.style.height = "auto";
          el.style.height = `${el.scrollHeight}px`;
        };
        adjustHeight();
        el.addEventListener("input", adjustHeight);
      }}
      className="w-full p-3 bg-black border border-green-500 rounded-lg font-mono text-sm text-green-200 placeholder-green-600 focus:ring-2 focus:ring-green-400 outline-none fira-code-body resize-none overflow-hidden"
      defaultValue={`// Fill in the blanks below

PROCESS on rising clock edge:
  IF system is in reset THEN
    reset all internal signals and outputs
  ELSE
    // Default state
    set ack = 0

    // Check for a new request
    IF ( ____ is high AND ____ is false ) THEN
      // Remember the request for the next cycle
      set ____ = true
    ELSE IF ( ____ is true ) THEN
      // Generate the pulse and reset the state
      set ____ = 1
      set ____ = false
    END IF
  END IF
END PROCESS`}
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

        <CalloutBox type="warning" title="⚠️ Warning: A Common Pitfall">
          What happens if the req signal stays high for more than one cycle? 
          A poorly written design might generate multiple acks. Our design correctly handles this because of the !req_seen check. 
          It ensures we only start the handshake on the first rising edge of req, and we ignore req completely until the current 
          handshake is finished (when req_seen is cleared).
        </CalloutBox>


        
      </section>

      {/* Checkbox & Navigation Buttons */}
      <div className="grid grid-cols-3 items-center mt-10 bg-slate-50 p-4 rounded-xl shadow-sm">
        {/* Left side - Previous button (always active, blue) */}
        <div className="flex justify-start">
          <button
            onClick={() => setModule(1)}
            className="px-5 py-2 rounded-lg font-medium shadow-md transition-colors bg-blue-600 hover:bg-blue-700 text-white"
          >
            ←  Module 1
          </button>
        </div>

        {/* Center - Checkbox */}
        <div className="flex justify-center">
          <label htmlFor="read2" className="flex items-center space-x-2 text-slate-700">
            <input
              type="checkbox"
              id="read2"
              checked={readModules[1]}          
              onChange={() => handleCheckboxChange(1)}
              className="h-4 w-4 accent-blue-600 rounded"
            />
            <span>I have read this module</span>
          </label>
        </div>

        {/* Right side - Next button */}
        <div className="flex justify-end">
          <button
            disabled={!readModules[1]}          
            onClick={() => setModule(3)}        
            className={`px-5 py-2 rounded-lg font-medium shadow-md transition-colors ${
              readModules[1]
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
             Module 3 →
          </button>
        </div>
      </div>

      
      
    </div>
  );
}
