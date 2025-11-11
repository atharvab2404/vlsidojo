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

export default function Module6({
  readModules = [false, false, false], // default for 3 modules
  handleCheckboxChange = () => {},     // noop if not passed
  setModule = () => {},                 // noop if not passed
}: ModuleProps) {

  const [code, setCode] = useState(`// Write your pseudo-code here
  // `);
  
  const highlightWithLineNumbers = (input: string) =>
    Prism.highlight(input, Prism.languages.verilog, "verilog");
    
    useEffect(() => {
      Prism.highlightAll();
    }, []);
  
    const verilogCode1 = `Initialize clk = 0
Forever: toggle clk every 5 ns   // defines 10 ns period (100 MHz)

Initialize reset = 1
Wait for few clock cycles
Deassert reset = 0   // start the design operation`
  
    const verilogCode2 = `Instantiate CPUtop using named port mapping:
  CPUtop uut (
    .clk(clk),
    .rst(reset),
    .instruction_in(inst_in),
    .data_in(data_in),
    .data_out(data_out),
    .instruction_address(inst_addr),
    .data_address(data_addr),
    .data_R(data_R),
    .data_W(data_W),
    .done(done)
  );`;
  
    const verilogCode3 = `Declare instruction_mem[0:255]
Declare data_mem[0:255]

At time 0:
  instruction_mem[0] = LOAD MEM0 -> REG0
  instruction_mem[1] = LOAD MEM1 -> REG1
  instruction_mem[2] = ADD REG0, REG1
  instruction_mem[3] = STORE REG2 -> MEM2
  instruction_mem[4] = HALT

  data_mem[0] = 5
  data_mem[1] = 10`
  
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Execution / Core */}
      <section className="space-y-4 mb-10">
      <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          Stage 5: Verification & Validation
        </h2>
        <p className="leading-7 inter-body">
        A testbench (TB) is a non-synthesizable environment that stimulates your Design Under Test (DUT) (like CPUtop), observes its responses, and verifies correctness.
        </p>
        <p className="leading-7 inter-body">
          In simple terms — it creates an artificial lab where:
          <ol className="list-disc pl-6 space-y-2">
            <li>You feed inputs to the DUT</li>
            <li>Watch its outputs</li>
            <li>Compare actual vs expected behavior</li>
          </ol>
        </p>

      <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          Testbench Architecture
      </h2>

      <p className="leading-7 inter-body">You can visualize your testbench as divided into logical blocks:</p>
      <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="border-b border-slate-300">
                <th className="px-3 py-2 text-left">Submodule</th>
                <th className="px-3 py-2 text-left">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="px-3 py-2"> Clock & Reset Generator</td><td>Drives timing and initialization</td></tr>
              <tr><td className="px-3 py-2"> DUT Instantiation</td><td>Connects the TB and DUT</td></tr>
              <tr><td className="px-3 py-2">Memory Initialization</td><td>Loads program/data before simulation</td></tr>
              <tr><td className="px-3 py-2">Stimulus Generation</td><td>Issues operations, toggles inputs</td></tr>
              <tr><td className="px-3 py-2">Monitoring / Display</td><td>Observes signals and prints/logs info</td></tr>
              <tr><td className="px-3 py-2">Checker / Verifier</td><td>Compares actual vs expected results</td></tr>
              <tr><td className="px-3 py-2">Termination / Cleanup</td><td>Stops simulation when done</td></tr>
            </tbody>
          </table>


      <h2 className="text-xl inter-subheading text-slate-900 tracking-tight">
         1. Clock & Reset Generator
      </h2>   
      <p className="leading-7 inter-body">
        All synchronous digital designs depend on a clock and a reset.
        The TB must create a periodic clock pulse (like a heartbeat) and assert/deassert reset to start the design cleanly.
      
      <ol className="list-disc pl-6 space-y-2"><strong>Key Idea:</strong>
        <li><strong>Clock</strong> toggles periodically (<code>1 → 0 → 1 → ...</code>)</li>
        <li>Reset starts active (logic high), then goes low after a few cycles</li>
      </ol>

      
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
              {verilogCode1}
            </code>
          </pre>
        </details>
          </div>
        </div>
        {/* === End of Pseudo-code Section === */}

      
      </section>
            {/* === 2️⃣ DUT Instantiation === */}
      <h2 className="text-xl inter-subheading text-slate-900 tracking-tight mt-10">
        2. DUT Instantiation
      </h2>
      <p className="leading-7 inter-body">
        This is where the testbench connects to the <strong>Design Under Test (DUT)</strong> — 
        like plugging wires into a circuit. You map the testbench signals to the DUT ports, ensuring
        proper communication between them.
      </p>

      <p className="leading-7 inter-body mt-3">
        <strong>Key Idea:</strong>
        <ol className="list-disc pl-6 space-y-2">
          <li>Each DUT <strong>input</strong> is driven by signals from the testbench.</li>
          <li>Each DUT <strong>output</strong> is observed or captured by the testbench.</li>
        </ol>
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
              {verilogCode2}
            </code>
          </pre>
        </details>
          </div>
        </div>
        {/* === End of Pseudo-code Section === */}
      
     


      {/* === 3️⃣ Memory Initialization === */}
      <h2 className="text-xl inter-subheading text-slate-900 tracking-tight mt-10">
        3. Memory Initialization (Instruction + Data Memory)
      </h2>

      <p className="leading-7 inter-body">
        Before simulation starts, we must initialize the memory components — both the 
        <strong>instruction memory</strong> (to load the program) and the <strong>data memory</strong> 
        (to preload operands). This step mimics loading a small assembly program into the CPU 
        before execution.
      </p>

      <p className="leading-7 inter-body mt-3">
        <strong>Key Idea:</strong>
        <ol className="list-disc pl-6 space-y-2">
          <li>Create two arrays: <code>INST_MEM[]</code> and <code>DATA_MEM[]</code></li>
          <li>Fill them with binary/hex values corresponding to your instruction set and data</li>
          <li>This can be done manually or loaded automatically from a <code>.mem</code> or <code>.txt</code> file</li>
        </ol>
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
              {verilogCode3}
            </code>
          </pre>
        </details>
          </div>
        </div>
        {/* === End of Pseudo-code Section === */}
      
        {/* === 4️⃣ Stimulus Generation (Driver Block) === */}
<h2 className="text-xl inter-subheading text-slate-900 tracking-tight mt-10">
  4. Stimulus Generation (Driver Block)
</h2>

<p className="leading-7 inter-body">
  The testbench needs to feed <strong>instructions</strong> and <strong>data</strong> to the DUT
  in sync with its internal control logic. When the DUT requests an instruction or memory
  access, the TB must respond like an intelligent memory model.
</p>

<p className="leading-7 inter-body mt-3">
  <strong>Key Idea:</strong>
  <ol className="list-disc pl-6 space-y-2">
    <li>Continuously monitor the DUT’s instruction address.</li>
    <li>Provide the corresponding instruction when requested.</li>
    <li>If <code>data_R</code> is active, return data.</li>
    <li>If <code>data_W</code> is active, update memory.</li>
  </ol>
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

    <h4 className="text-lg inter-subheading text-green-400 mb-2">
      ✍️ Pseudo-code Practice
    </h4>
    <p className="text-sm text-green-200 mb-3 opacity-80 inter-body">
      Write down the expected behavior in simple pseudo-code before looking at the solution.
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
        <code className="language-verilog text-green-200">{`Forever:
  If instruction_fetch_active:
    instruction_in = INST_MEM[instruction_address]

  If data_R == 1:
    data_in = DATA_MEM[data_address]

  If data_W == 1:
    DATA_MEM[data_address] = data_out`}</code>
      </pre>
    </details>
  </div>
</div>
{/* === End of Pseudo-code Section === */}

{/* === 5️⃣ Monitoring and Display (Observer Block) === */}
<h2 className="text-xl inter-subheading text-slate-900 tracking-tight mt-10">
  5. Monitoring and Display (Observer Block)
</h2>

<p className="leading-7 inter-body">
  The testbench should provide <strong>visibility</strong> into what’s happening inside
  the DUT — like which instruction is being executed or what data is being accessed.
  It can print these details in real time for debugging and waveform correlation.
</p>

<p className="leading-7 inter-body mt-3">
  <strong>Key Idea:</strong>
  <ol className="list-disc pl-6 space-y-2">
    <li>Print important signals at every clock edge.</li>
    <li>Helps in understanding DUT behavior and debugging issues.</li>
  </ol>
</p>

{/* === Pseudo-code Practice Section === */}
<div className="pseudo-code">
  <div className="my-6 p-4 bg-gray-900 rounded-xl shadow-lg border border-green-400 relative font-mono">
    <div className="flex items-center space-x-2 mb-3">
      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      <span className="ml-3 text-green-300 text-xs tracking-widest uppercase">
        Terminal
      </span>
    </div>

    <h4 className="text-lg inter-subheading text-green-400 mb-2">
      ✍️ Pseudo-code Practice
    </h4>
    <p className="text-sm text-green-200 mb-3 opacity-80 inter-body">
      Write down the expected behavior in simple pseudo-code before looking at the solution.
    </p>

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

    <details className="mt-4">
      <summary className="cursor-pointer text-green-400 font-medium hover:underline">
        💡 Show Solution
      </summary>
      <pre className="mt-2 p-4 bg-black border border-green-600 rounded-lg overflow-x-auto text-sm shadow-inner">
        <code className="language-verilog text-green-200">{`At every positive clock edge:
  Display(
    "PC=%d, Instruction=%b, DataAddr=%d, DataOut=%d, DataIn=%d",
    instruction_address, instruction_in, data_address, data_out, data_in
  )`}</code>
      </pre>
    </details>
  </div>
</div>
{/* === End of Pseudo-code Section === */}

{/* === 6️⃣ Checker / Verifier === */}
<h2 className="text-xl inter-subheading text-slate-900 tracking-tight mt-10">
  6. Checker / Verifier
</h2>

<p className="leading-7 inter-body">
  A smart testbench doesn’t just apply inputs — it also checks whether the DUT output
  matches the <strong>expected behavior</strong>. This block acts as the “judge,” verifying
  pass/fail automatically.
</p>

<p className="leading-7 inter-body mt-3">
  <strong>Key Idea:</strong>
  <ol className="list-disc pl-6 space-y-2">
    <li>Maintain a <strong>golden model</strong> (software reference).</li>
    <li>Compare DUT’s results (like memory or register values) with expected ones.</li>
  </ol>
</p>

{/* === Pseudo-code Practice Section === */}
<div className="pseudo-code">
  <div className="my-6 p-4 bg-gray-900 rounded-xl shadow-lg border border-green-400 relative font-mono">
    <div className="flex items-center space-x-2 mb-3">
      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      <span className="ml-3 text-green-300 text-xs tracking-widest uppercase">
        Terminal
      </span>
    </div>

    <h4 className="text-lg inter-subheading text-green-400 mb-2">
      ✍️ Pseudo-code Practice
    </h4>
    <p className="text-sm text-green-200 mb-3 opacity-80 inter-body">
      Write down the expected behavior in simple pseudo-code before looking at the solution.
    </p>

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

    <details className="mt-4">
      <summary className="cursor-pointer text-green-400 font-medium hover:underline">
        💡 Show Solution
      </summary>
      <pre className="mt-2 p-4 bg-black border border-green-600 rounded-lg overflow-x-auto text-sm shadow-inner">
        <code className="language-verilog text-green-200">{`After simulation finishes:
  If (DATA_MEM[2] == 15)
    Print "Test PASSED!"
  Else
    Print "Test FAILED! Expected 15, Got ", DATA_MEM[2]`}</code>
      </pre>
    </details>
  </div>
</div>
{/* === End of Pseudo-code Section === */}

{/* === 7️⃣ Termination / Cleanup === */}
<h2 className="text-xl inter-subheading text-slate-900 tracking-tight mt-10">
  7. Termination / Cleanup
</h2>

<p className="leading-7 inter-body">
  The simulation should end gracefully once the DUT finishes execution or after a timeout
  (to prevent infinite loops). This ensures the testbench completes cleanly.
</p>

<p className="leading-7 inter-body mt-3">
  <strong>Key Idea:</strong>
  <ol className="list-disc pl-6 space-y-2">
    <li>Watch the <code>done</code> signal from the DUT.</li>
    <li>Or stop after a fixed time if the DUT fails to complete.</li>
  </ol>
</p>

{/* === Pseudo-code Practice Section === */}
<div className="pseudo-code">
  <div className="my-6 p-4 bg-gray-900 rounded-xl shadow-lg border border-green-400 relative font-mono">
    <div className="flex items-center space-x-2 mb-3">
      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      <span className="ml-3 text-green-300 text-xs tracking-widest uppercase">
        Terminal
      </span>
    </div>

    <h4 className="text-lg inter-subheading text-green-400 mb-2">
      ✍️ Pseudo-code Practice
    </h4>
    <p className="text-sm text-green-200 mb-3 opacity-80 inter-body">
      Write down the expected behavior in simple pseudo-code before looking at the solution.
    </p>

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

    <details className="mt-4">
      <summary className="cursor-pointer text-green-400 font-medium hover:underline">
        💡 Show Solution
      </summary>
      <pre className="mt-2 p-4 bg-black border border-green-600 rounded-lg overflow-x-auto text-sm shadow-inner">
        <code className="language-verilog text-green-200">{`Wait until done == 1
Print "CPU Finished Execution!"
Stop simulation

If not done within 5000ns:
  Print "Timeout Error!"
  Stop simulation`}</code>
      </pre>
    </details>
  </div>
</div>
{/* === End of Pseudo-code Section === */}
  
         



      
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
