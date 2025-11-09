"use client";

import { useState } from "react";
import { X } from "lucide-react";
import MCQBlock from "./MCQBlock";
import CalloutBox from "./CalloutBox";
import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-verilog';
import 'prismjs/themes/prism-tomorrow.css';
import Editor from "react-simple-code-editor";

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

  const [code, setCode] = useState(`// Write your pseudo-code here
// `);

const highlightWithLineNumbers = (input: string) =>
  Prism.highlight(input, Prism.languages.verilog, "verilog");
  
  useEffect(() => {
    Prism.highlightAll();
  }, []);
const solutionCode1 = `bit past_req; // Our "helper bit"

  always_ff @(posedge clk or negedge rst_n) begin
    if (!rst_n)
      past_req <= 0;
    else if (req && !ack)
      past_req <= 1;
    else if (ack)
      past_req <= 0;
  end

  ap_no_spurious_ack: assert property (@(posedge clk) ack |-> past_req)
    else $error("[%0t] ASSERTION FAILED!", $time);`;

  const verilogCode1 = `// Our testbench module
module m;
  // Define our simulation time scale
  timeunit 1ns;
  timeprecision 100ps;

  // 1. Testbench Signals
  // These 'logic' signals will drive the DUT and receive its output
  logic clk;
  logic rst_n;
  logic req;
  logic ack;

  // 2. Instantiate the Device Under Test (DUT)
  // This is how we place our design into the testbench
  reqack_logic dut (
    .clk   (clk),    // Connect testbench 'clk' to DUT's 'clk'
    .rst_n (rst_n),  // Connect testbench 'rst_n' to DUT's 'rst_n'
    .req   (req),    // Connect testbench 'req' to DUT's 'req'
    .ack   (ack)     // Connect DUT's 'ack' to testbench 'ack'
  );

  // ... Clock, Reset, Stimulus, and Assertions will go here ...

endmodule`

  const verilogCode2 = `// Assertion 1:
ap_ack_pulse: 
  assert property (@(posedge clk) ack |=> !ack)
  else begin
    $error("[%0t] ASSERTION FAILED: ack was not a single-cycle pulse! req=%b ack=%b", $time, req, ack);
  end`;

  const verilogCode3 = `// 6. Randomized Verification
  initial begin
    bit vq;
    bit [3:0] delay = 2; // Fixed delay for this simple test

    // Setup waveform dumping
    $dumpfile("dump.vcd");
    $dumpvars(0, m);

    // Wait for reset to finish
    @(posedge rst_n);
    repeat(5) @(posedge clk);

    // Run 100 random test scenarios
    repeat (100) begin
      @(posedge clk);
      
      // Randomly decide whether to send a request
      if (!randomize(vq) with {
          vq dist {1'b1 := 1, 1'b0 := 2}; // 1/3 chance of req, 2/3 chance of no req
      })
        $error("[%0t] Randomization failed!", $time);

      if (vq)
        t_reqack(delay); // Send a request
      else
        $display("[%0t] STIMULUS: No request this cycle.", $time);
    end

    #20;
    $display("[%0t] Simulation completed.", $time);
    $finish;
  end`

  const [open, setOpen] = useState(false);

  return (
    
    <div>
      {/* Execution / Core */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          Assertion Based Verification
        </h2>
        <p className="leading-7 inter-body">
          In the previous module, you were the Designer. You built a circuit that should follow a rule: 
          "a req pulse is followed by an ack pulse one cycle later."
        </p>
        <p className="leading-7 inter-body">
          Now, you will become the Verification Engineer. 
          Your job is to create a "referee" that automatically checks if the design is obeying that rule, 100% of the time.
        </p>
        <p className="leading-7 inter-body">
            We will build a testbench to do this. A testbench has two primary jobs:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
            <li> <b>Generate Stimulus:</b> It acts like the "outside world," creating the clk, rst_n, and req signals to stimulate our design (the DUT, or "Device Under Test").</li>
            <li> <b>Check Behavior:</b> It watches the DUT's outputs (like ack) and reports any illegal or incorrect behavior.</li>
        </ol>

        <p className="leading-7 inter-body">
            Instead of manually checking waveforms, we will use <b>SystemVerilog Assertions (SVA)</b>. 
            An assertion is a powerful piece of code that describes a rule. 
            The simulator will watch our design and check this rule on every single clock cycle. 
            If the rule is ever violated, the simulation will stop and tell us exactly what went wrong, where, and when.
        </p>
        

        <hr className="my-10 border-slate-200" />

        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
           Writing the Testbench:
        </h2>
        
          
        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          1. The Testbench Shell and DUT Instantiation
        </h3>

        <p className="leading-7 inter-body">
           First, we need to create a "world" for our design to live in. This is an empty testbench module that will contain our clock, reset, and the design itself.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>timeunit / timeprecision: This is a critical simulator directive. timeunit 1ns; 
            means that whenever we use a number like #5, it means "wait for 5 nanoseconds." timeprecision 100ps; 
            defines the smallest possible unit of time the simulator can track.</li>
          <li>module reqack_tb; ... endmodule: This is our testbench module, which we'll call reqack_tb.</li>
          <li><b>Signal Declaration:</b> We declare logic signals for every port on our DUT. In a testbench, logic is the standard type to use for all signals.</li>
          <li><b>DUT Instantiation:</b>  This is where we place our reqack_logic design inside the testbench. We give it a name (like dut) and connect our testbench signals to its ports.</li>
        </ul>

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
              ✍️ reqack_tb.sv
            </h4>
            

            {/* User Notepad */}
            <pre className="w-full p-3 bg-black border border-green-500 rounded-lg font-mono text-sm text-green-200 placeholder-green-600 focus:ring-2 focus:ring-green-400 outline-none fira-code-body whitespace-pre-wrap break-words">
  <code className="language-verilog font-fira">{verilogCode1}</code>
</pre>

            
          </div>
        </div>
        {/* === End of Pseudo-code Section === */}

        <CalloutBox type="tip" title="Pro Tip">
          Using named port connections (e.g., .clk(clk)) is much safer and more readable than relying on the port order. 
          It's a non-negotiable best practice in professional environments.
        </CalloutBox>

        
        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          2. The Heartbeat - Generating Clock and Reset
        </h3>
        <p className="leading-7 inter-body">
            Our DUT won't do anything without a clock to drive its always_ff block and a reset to get it into a known state. 
            We use initial blocks to start these processes at the beginning of the simulation.
        </p>
        <p className="leading-7 inter-body">
            We'll create a new combinational signal, <i>ptr_arb</i>, to hold this index.
        </p>
        <ol className="list-decimal pl-6 space-y-2">
            <li> <strong>Clock Generation:</strong> 
            <p className="leading-7 inter-body">
                We use an initial block to set clk = 0. Then, an always block flips the clock value (clk = ~clk;) every 1ns (#1). 
                This creates a clock with a 2ns period (1ns high, 1ns low).
            </p>
            </li>
            <li> <strong>Reset Generation:</strong> 
            <p className="leading-7 inter-body">
                We use another initial block.
                <ul className="list-disc pl-6 space-y-2">
                    <li>At time 0, it asserts the reset (rst_n = 0;) and sets req = 0;.</li>
                    <li>It waits for 5ns (#5), giving the design time to settle in its reset state</li>
                    <li>It de-asserts the reset (rst_n = 1;), allowing the DUT to start operating.</li>
                </ul>
            </p>
            </li>
        </ol>
        <p className="leading-7 inter-body">
            <b>To Do:</b> Add the always and initial blocks to generate the clock and reset.
        </p>

        

        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          3. The "Rules Engine" - Writing Assertions
        </h3>
        <p className="leading-7 inter-body">
            This is the most important part of our testbench. We will define the rules of our protocol. If any rule is broken, the test will fail.
        </p>
        <p className="leading-7 inter-body">
            <b>What is an Assertion?</b>
            The basic syntax is: label: assert property ( ... property_spec ... ) else $error("Message!");
            <ul className="list-disc pl-6 space-y-2">
                <li>label:: A unique name for your assertion (e.g., ap_ack_pulse).</li>
                <li>assert property (...): The keyword to check a SystemVerilog Assertion (SVA).</li>
                <li>property_spec: The actual rule we are checking.</li>
                <li>else $error(...): What to do if the rule fails. $error will print a message and flag the simulation as failed.</li>
            </ul>
        </p>

        <p className="leading-7 inter-body">
            <b>Assertion 1: ack must be a single-cycle pulse</b>
        </p>
        <p className="leading-7 inter-body">
            Our design should never produce an ack that is high for two cycles in a row.
            <ul className="list-disc pl-6 space-y-2">
                <li>The Property: @(posedge clk) ack |=&gt; !ack</li>
                <li>@(posedge clk): Check this rule on every rising clock edge.</li>
                <li>ack |=&gt; !ack: This is an "overlapping implication." It reads: "IF ack is high on the current clock edge, THEN it must be low (!ack) on the very next clock edge.</li>
            </ul>
        </p>

        <CalloutBox type="info" title="Interesting Fact: The Story of the Implication Operators in SVA">
          In SystemVerilog Assertions (SVA), implication operators play a key role in expressing cause-and-effect relationships over time, 
          allowing designers to specify how a system should behave in response to certain conditions. 
          The operator |-&gt; is known as the overlapped implication (or same-cycle implication) operator, 
          meaning that when the antecedent (the condition before the operator) becomes true, 
          the consequent (the condition after it) must also hold in the same clock cycle. On the other hand, 
          the |=&gt; operator is called the non-overlapped implication (or next-cycle implication) operator, 
          meaning that if the antecedent is true in a given cycle, the consequent must be true in the next clock cycle. 
          In other words, A |-&gt; B checks that B occurs immediately when A occurs, 
          while A |=&gt; B checks that B occurs in the following cycle after A occurs. 
          Interestingly, the non-overlapped implication |=&gt; can be expressed in terms of the overlapped 
          implication using a one-cycle delay — that is, A |=&gt; B is equivalent to A |-&gt; ##1 B, 
          where ##1 explicitly inserts a one-cycle delay between the antecedent and the consequent. 
          This equivalence helps unify temporal reasoning in SVA, making it easier to visualize 
          how events unfold over time when verifying complex, clock-synchronized hardware behavior.
        </CalloutBox>
        
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
              ✍️ reqack_tb.sv
            </h4>
            

            {/* User Notepad */}
            <pre className="w-full p-3 bg-black border border-green-500 rounded-lg font-mono text-sm text-green-200 placeholder-green-600 focus:ring-2 focus:ring-green-400 outline-none fira-code-body whitespace-pre-wrap break-words">
  <code className="language-verilog font-fira">{verilogCode2}</code>
</pre>

            
          </div>
        </div>
        {/* === End of Pseudo-code Section === */}

        <p className="leading-7 inter-body">
            <b>Assertion 2: req should be a single-cycle pulse</b>
        </p>

        <p className="leading-7 inter-body">
            This is an assertion on our stimulus. 
            It's good practice to check that our test is behaving as we expect. We'll use the same logic as Rule 1.
        </p>

        <p className="leading-7 inter-body">
            <b>Assertion 3: The Core Handshake (The "Golden Rule")</b>
        </p>

        <p className="leading-7 inter-body">
            This is our main rule: "A rising edge of req must be followed by a rising edge of ack exactly one cycle later."
            <ul className="list-disc pl-6 space-y-2">
                <li>The Property: @(posedge clk) $rose(req) |-&gt; !ack ##[1:5] $rose(ack)</li>
                <li>$rose(req): This is the "antecedent" (the "IF" part). It triggers only on the single clock cycle where req transitions from 0 to 1.</li>
                <li>|-&gt;: This is the "non-overlapping implication." It reads: "IF the antecedent is true, THEN check the following sequence starting on the next clock edge."</li>
                <li>!ack ##[1:5] $rose(ack): This is the "consequent" (the "THEN" part). It means: "we must see a rising edge of ack within 1-5 clock cycles"</li>
            </ul>
        </p>
        <CalloutBox type="info" title="Interesting Fact">
          In SystemVerilog Assertions (SVA), the construct ##[1:5] represents a temporal delay range, 
          meaning that the consequent of an assertion can occur anywhere between 1 and 5 clock cycles after the antecedent becomes true. 
          Essentially, it introduces a flexible timing window between two events — for example, in the property A |-&gt; ##[1:5] B, 
          if signal A occurs, then signal B must occur within 1 to 5 cycles afterward for the property to hold true. 
          This feature is particularly useful in verifying protocols or handshaking mechanisms where response times are not fixed but 
          bounded, such as ensuring that an acknowledgment (ack) follows a request (req) within a specific number of cycles. 
          By using ##[1:5], designers can model and verify timing uncertainty, variable latency, or asynchronous delays in 
          hardware systems while still enforcing strict upper and lower timing limits for correct operation. 
        </CalloutBox>
        

        <p className="leading-7 inter-body">
            <b>Assertion 4: No Spurious ack (The "Safety Rule")</b>
        </p>
        <p className="leading-7 inter-body">
            An ack should never appear without a request. This is the most dangerous kind of bug! 
            How do we check this? We need to "remember" if a request is pending. We'll use a helper bit, just like we did in the design.
            <ul className="list-disc pl-6 space-y-2">
                <li>Helper Logic: We create a past_req flag. It turns on if req happens and ack hasn't happened yet. It turns off once ack arrives. 
                  This flag effectively means "a request is pending." This is also known as auxiliary code in verification</li>
                <li>$rose(req): This is the "antecedent" (the "IF" part). It triggers only on the single clock cycle where req transitions from 0 to 1.</li>
                <li>|-&gt;: This is the "non-overlapping implication." It reads: "IF the antecedent is true, THEN check the following sequence starting on the next clock edge."</li>
                <li>##1 $rose(ack): This is the "consequent" (the "THEN" part). It means: "Wait exactly one (##1) clock cycle, and on that cycle, we must see a rising edge of ack."</li>
            </ul>
        </p>
        

        <p className="leading-7 inter-body">
            Now Let's try writing the pseudo-code for this assertion and its auxiliary code!
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

            {/* User Code Editor */}
        <div className="rounded-lg overflow-hidden border border-green-600 bg-black shadow-[0_0_20px_rgba(16,185,129,0.15)]">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={highlightWithLineNumbers}
            padding={12}
            textareaId="codeArea"
            className="text-green-200 outline-none"
            style={{
              minHeight: "180px",
            }}
          />
        </div>

        {/* Collapsible Solution */}
        <details className="mt-4">
          <summary className="cursor-pointer text-green-400 font-medium hover:underline">
            💡 Show Solution
          </summary>
          <pre className="mt-2 p-4 bg-black border border-green-600 rounded-lg overflow-x-auto text-sm shadow-inner">
            <code className="language-verilog text-green-200">
              {solutionCode1}
            </code>
          </pre>
        </details>
          </div>
        </div>
        {/* === End of Pseudo-code Section === */}

        <CalloutBox type="info" title="Interesting Fact">
          This "helper bit" technique (like past_req) is extremely common in verification. 
          You are building an independent "model" of the design's state, known as a checker or monitor, 
          to validate the DUT's behavior.
        </CalloutBox>

        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          4. The Stimulus Generator
        </h3>
        <p className="leading-7 inter-body">
            Now we need to actually generate the req pulses to test our rules.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><b>task:</b> We create a task named t_reqack so we can easily call it multiple times.</li>
          <li><b>automatic:</b> This keyword ensures that any local variables inside the task are unique for each time the task is called.</li>
        </ul>

        <p className="leading-7 inter-body">
            <b>Functionality:</b> The task is simple:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
            <li> Set req &lt;= 1;</li>
            <li> Wait for a clock edge (@(posedge clk);)</li>
            <li> Set req &lt;= 0; This creates the single-cycle req pulse our assertions are checking.</li>
            <li> The delay argument is used to add extra quiet cycles after the request.</li> 
        </ol>

        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          4. The Main test sequence
        </h3>
        <p className="leading-7 inter-body">
            Finally, we have the "main" initial block that runs the whole test. It should have the following components:
        </p>
        <ul className="list-disc pl-6 space-y-2">
            <li>$dumpfile / $dumpvars: These are your best friends for debugging. 
              They tell the simulator to record all the signal values into a "VCD" (Value Change Dump) file. 
              You can open this file in a waveform viewer (like GTKWave) to see what went wrong if a test fails.</li>
            <li><b>Wait for Reset:</b> We wait for rst_n to be high (@(posedge rst_n);) and then wait a few more cycles to ensure everything is stable.</li>
            <li><b>The Main Loop:</b> We use repeat (x) to run x random "scenarios."</li>
            <li>randomize(vq) with ...... : This is the heart of <b>Constrained-Random Verification (CRV).</b></li>
        </ul>

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
              ✍️ reqack_tb.sv
            </h4>
            

            {/* User Notepad */}
            <pre className="w-full p-3 bg-black border border-green-500 rounded-lg font-mono text-sm text-green-200 placeholder-green-600 focus:ring-2 focus:ring-green-400 outline-none fira-code-body whitespace-pre-wrap break-words">
  <code className="language-verilog font-fira">{verilogCode3}</code>
</pre>

            
          </div>
        </div>
        {/* === End of Pseudo-code Section === */}

        <p className="leading-7 inter-body">
            <b>Why is this smart?</b> This "sometimes do nothing" approach is a powerful test. 
            It checks that our "No Spurious ack" rule is working. Our DUT must stay silent if no req is sent.
        </p>

        <div className="eda-card">
          <h3>🧪 Try it Yourself on EDA Playground</h3>
          <p>
            Experiment with this Verilog module, edit the testbench, and visualize
            your simulation results in real time.
          </p>
          <a
            href="https://www.edaplayground.com/x/dFWg"
            target="_blank"
            rel="noopener noreferrer"
            className="eda-link"
          >
            🚀 Launch Playground
          </a>
        </div>
        


        
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
