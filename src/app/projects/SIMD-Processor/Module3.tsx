"use client";

import { useState } from "react";
import { X } from "lucide-react";
import MCQBlock from "./MCQBlock";

export default function Module3({ readModules, handleCheckboxChange, setModule }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Execution / Core */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          Stage 3: Instruction Decode and Operand Fetch
        </h2>
        <p className="leading-7 inter-body">
        This module is the transition point from an instruction to action. In the ID stage, we interpret the opcode and extract the operands. Your code's always <em>@(posedge clk)</em> block is the key part of this module.
        </p>
        <p className="leading-7 inter-body">
          <strong>Design Task: Operand Fetching</strong> 
            <p>The ID stage needs to set various flags <em>(Hreg1, Hreg2, etc.)</em> and read the register addresses <em>(R0, R1, R2, R3)</em> and immediate values <em>(im_reg)</em> from the <em>instruction_in</em>.
          </p>
        </p>
          
          <p className="leading-7 inter-body">
          <strong>Your turn:</strong> 
           Analyze the ID stage logic and explain the purpose of the <em>R0, R1, R2, and R3</em> variables. How do they map to the different parts of the 18-bit instruction (instruction_in)? Explain what im_reg is and when it's used.
        </p>

        <p className="leading-7 inter-body">
          <strong>Hint:</strong> 
           Pay close attention to how the instruction bits are assigned to <em>R0, R1, R2, R3, and im_reg</em>.</p>
      



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
{`// The 18-bit instruction format is:
// [17:12] = opcode
// [11:10] = R0 (Register Index 0)
// [9:4]   = R1/im_reg (Register Index 1 or Immediate Value)
// [3:2]   = R2 (Register Index 2)
// [1:0]   = R3 (Register Index 3)

// The original code has 17:12 as opcode. The rest are different based on the opcode.
// The provided code has some ambiguity, so a refined interpretation is needed.
// The code implies a format based on opcode type:
// Type 1 (e.g., add with immediate): opcode(17:12) | R0(11:10) | im_reg(9:0)
// Type 2 (e.g., add register-to-register): opcode(17:12) | R2(11:10) | R3(9:8) | R0/other fields(7:0)
// The user will need to clarify the exact instruction format to write perfect code.

// Based on the code's register assignments:
// Extract the register indices and immediate value from instruction_in.
R0 <= instruction_in[11:10];
R1 <= instruction_in[5:4];
R2 <= instruction_in[3:2];
R3 <= instruction_in[1:0];
im_reg <= instruction_in[9:0];

// Set command flags based on the opcode
// Example:
if opcode is between 0 and 5
    CMD_addition <= true
// ... and so on for all opcodes`}
              </pre>
            </details>
          </div>
        </div>
        {/* === End of Pseudo-code Section === */}

        <h3 className="text-2xl inter-subheading text-slate-900 tracking-tight">
           Module 4: The Functional Units (The Heart of Execution)
        </h3>
        <p className="leading-7 inter-body">
          Before we build the Execute stage, we need to design the specialized units that will do all the heavy lifting. Think of these as a team of highly-skilled workers. The Execute stage's job is simply to pick the right worker and give them the right data. Your processor uses three key functional units: an adder/subtractor, a multiplier, and a shifter. These modules are where the "Single Instruction, Multiple Data" magic truly happens, as they perform operations on multiple data segments in parallel.
        </p>

        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          The SIMD Adder/Subtractor
        </h3>
        <p className="leading-7 inter-body">
            This module, named SIMDadd, is the workhorse for all arithmetic operations. Its design is particularly clever because it’s not just a single adder, but a segmented one that can dynamically switch between 16-bit, 8-bit, and 4-bit operations. This is the core of the SIMD principle in your processor.</p>


        <p className="leading-7 inter-body"><strong>Segmented Parallel Addition</strong></p>

        <p className="leading-7 inter-body">The module uses four independent 4-bit adders. The magic lies in how the carry-out from one adder becomes the carry-in for the next. This logic is controlled by the H, O, and Q signals:

            <ol className="list-disc pl-6 space-y-2">
              <li><strong>16-bit Mode (H):</strong> All four 4-bit adders are chained together. The carry-out from the lower segment becomes the carry-in for the next, forming a single 16-bit addition.</li>
              <li><strong>8-bit Mode (O):</strong> The four 4-bit adders are separated into two groups. The carry propagates within the first two segments (4-bit chunks 0 and 1) to form an 8-bit result. The same happens for the last two segments (4-bit chunks 2 and 3), allowing two 8-bit additions to run in parallel.</li>
              <li><strong>4-bit Mode (Q):</strong>The four 4-bit adders are completely independent. No carry propagates between them. Each segment performs its own 4-bit addition, resulting in four parallel 4-bit results.</li>
            
            </ol>


        </p>


        <p className="leading-7 inter-body"><strong>Subtraction through Two's Complement</strong></p>

        <p className="leading-7 inter-body">Subtraction is handled by adding the two's complement of B. The module efficiently does this in a single step: it inverts all the bits of B (this is the one's complement) and then adds 1 to the least significant bit's carry-in. The sub input signal acts as this carry-in.</p>

        <p className="leading-7 inter-body">
          <strong>Design Task: SIMDadd Pseudocode</strong> 
            <p> Your mission is to write the pseudocode for the SIMDadd module. This is a purely combinational block, meaning its output is always a direct result of its inputs. The code should reflect the segmented carry logic.</p>
        </p>













        <p className="leading-7 inter-body">
            Now Let's try writing the pseudo-code for this!!
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
{`// SIMDadd Pseudocode
Inputs:
  A (16-bit vector)
  B (16-bit vector)
  H (control flag for 16-bit mode)
  O (control flag for 8-bit mode)
  Q (control flag for 4-bit mode)
  sub (control flag for subtraction)

Output:
  Cout (16-bit result)

Begin Combinational Logic:
  // Step 1: Handle subtraction logic
  if sub is true:
    let B_real = bitwise NOT of B
  else:
    let B_real = B

  // Step 2: Perform segmented additions with conditional carry
  // Perform addition on the first 4-bit segment
  C0 = A[3:0] + B_real[3:0] + sub

  // Perform addition on the second 4-bit segment
  // Carry is passed only if in 16-bit (H) or 8-bit (O) mode
  C1 = A[7:4] + B_real[7:4] + (carry_out from C0 if (O or H) is true)

  // Perform addition on the third 4-bit segment
  // Carry is passed only if in 16-bit (H) mode
  C2 = A[11:8] + B_real[11:8] + (carry_out from C1 if H is true)

  // Perform addition on the fourth 4-bit segment
  // Carry is passed only if in 16-bit (H) or 8-bit (O) mode
  C3 = A[15:12] + B_real[15:12] + (carry_out from C2 if (O or H) is true)

  // Step 3: Combine the results
  Concatenate the 4-bit results from C3, C2, C1, C0 to form Cout`}
              </pre>
            </details>
          </div>
        </div>
        {/* === End of Pseudo-code Section === */}
      </section>

      {/* Navigation Controls */}
      <div className="grid grid-cols-3 items-center mt-10 bg-slate-50 p-4 rounded-xl shadow-sm">
        {/* Left side - Previous button (always active, blue) */}
        <div className="flex justify-start">
          <button
            onClick={() => setModule(2)}
            className="px-5 py-2 rounded-lg font-medium shadow-md transition-colors bg-blue-600 hover:bg-blue-700 text-white"
          >
            ← Module 2
          </button>
        </div>

        {/* Center - Checkbox */}
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

        {/* Right side - Finish button */}
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
            Module 4 →
          </button>
        </div>
      </div>
      
      
    </div>
  );
}
