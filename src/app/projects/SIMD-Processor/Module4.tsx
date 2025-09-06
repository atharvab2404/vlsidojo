"use client";

import { useState } from "react";
import { X } from "lucide-react";
import MCQBlock from "./MCQBlock";

export default function Module4({ readModules, handleCheckboxChange, setModule }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Execution / Core */}
      <section className="space-y-4 mb-10">
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          Stage 3: Execute (EX)
        </h2>
        <p className="leading-7 inter-body">
        The Execute stage is the brain of your processor. It performs all the heavy lifting—the 
        calculations and logical operations. This is where the magic of your Simple SIMD Processor 
        truly happens, using the decoded signals from the previous stage.Based on the opcode and other control signals decoded in the previous ID (Instruction Decode) stage, the EXECUTE STAGE 
        uses the appropriate functional unit (like an ALU) to calculate the result. This stage is responsible for:
        </p>
        <p className="leading-7 inter-body">
          <strong>Design Logic:</strong> 
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>State-Dependent Execution:</strong> The entire logic for this stage is contained within a single if block that checks if the current_state is STATE_EX. This 
              ensures that all the operations described here only happen during the correct clock cycle of the pipeline..</li>
            <li><strong>Instruction-Specific Operations:</strong> Inside the STATE_EX block, a series of if-else if statements are used to check the command signals 
              (CMD_...) that were set in the ID stage.
              <ol  className="list-disc pl-6 space-y-2" >
                <li><strong>Arithmetic and Logic:</strong> For operations like addition, subtraction, multiplication, AND, OR, and NOT, the outputs of the combinatorial logic (Add_output_Cout, Mul_output_Cout, etc.) are assigned to their respective result registers (result_reg_add, result_reg_mul, etc.). These result 
                  registers hold the computed value, which will be written back to the register file in the next stage.</li>
                <li><strong>Shift Operations:</strong> Similarly, for shift left (CMD_logic_shift_left) and shift right (CMD_logic_shift_right), 
                  the output of the SIMDshifter module (shiftoutput) is assigned to the appropriate result register.</li>
                <li><strong>Memory Access:</strong> For load and store instructions, the logic sets up the control signals for the memory stage.
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>For load, rdata_en is set to 1, and current_data_address is set to the immediate value (im_reg).</li>
                    <li>For store, both rdata_en and wdata_en are set to 1, current_data_address is set, and the data to be written (data_out_reg) is 
                      selected from the register files (H, Oset, Qset) based on the data type flags.</li>
                  </ol>
                <li><strong>Control Flow:</strong> For loopjump and setloop, the logic modifies the Program Counter (PC) or Loop Counter (LC).
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>CMD_setloop: The LC is updated with the im_reg value.</li>
                    <li>CMD_loopjump: A conditional check on LC determines if next_PC should be updated to im_reg (for the jump) or simply incremented for sequential execution.</li>
                  </ol>
                </li>
                </li>
              </ol>
            <li><strong>PC Update Logic:</strong> The most critical part of this stage is the update of the next PC value (next_PC). This value determines the address of the next instruction to be fetched.
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>For CMD_loopjump, the next_PC is conditionally set to the jump target (im_reg) or incremented.</li>
                    <li>For all other instructions, next_PC is simply incremented (next_PC {"<="} next_PC + 1;) 
                    to fetch the next instruction in sequence. This is handled by a single else block after the if (CMD_loopjump) check, ensuring that every instruction updates the next_PC correctly.</li>
                  </ol>                
                
                </li> 
            </li>

          </ol>
        </p>

        <hr className="my-10 border-slate-200" />

        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
           Modified Rotating Scheme (TYPE==1)
        </h2>
        <p className="leading-7 inter-body">
          <strong>Principle:</strong> This scheme is more adaptive. The "priority pointer" doesn't just blindly rotate; 
          it updates its position based on who actually won the arbitration. This often leads to slightly more efficient cycling.
        </p>
        <p className="leading-7 inter-body">
          If enable is high and a grant (grant_out) was issued in the current cycle, 
          the priority_ptr for the next cycle will be set to the requester immediately after the one that just won. 
          This makes the next arbitration start from a more relevant point.
        </p>
          
        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          1. Reusing the Grant Logic (It's Already Done!)
        </h3>
        <p className="leading-7 inter-body">
            This is the best part of modular design. 
            The combinational logic that calculates the current winner (gnt) is based on the current pointer (ptr). 
            This logic doesn't care how the pointer gets updated.
        </p>
        <p className="leading-7 inter-body">
            Therefore, the <strong>Rotate -&gt; Prioritize -&gt; Rotate Back</strong> logic you wrote in Mission 1 is exactly the same. 
            We don't need to change it at all!
        </p>
        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          2. Finding the Winner's Index
        </h3>
        <p className="leading-7 inter-body">
            To update our pointer, we first need to know which requester won. 
            Our gnt signal is "one-hot" (e.g., 8'b0100_0000), but we need the winner's binary index (in this case, 3'b101 for position 5). 
            This process is called encoding.
        </p>
        <p className="leading-7 inter-body">
            We'll create a new combinational signal, <i>ptr_arb</i>, to hold this index.
        </p>
        <ol className="list-decimal pl-6 space-y-2">
            <li> <strong>The Combinational always Block</strong> 
            <p className="leading-7 inter-body">
                We can use an always @(*) block to describe this combinational logic. The * tells the simulator to re-evaluate the block whenever any of the inputs change.
            </p>
            </li>
            <li> <strong>The Search Loop</strong> 
            <p className="leading-7 inter-body">
                Inside the block, we'll loop through the gnt vector. If we find a '1' at a certain position i, we know i is the winner's index, and we assign it to ptr_arb.
                <ul className="list-disc pl-6 space-y-2">
                    <li><b>Important:</b> We must give ptr_arb a default value before the loop. If no one is requesting, gnt will be all zeros. Without a default, we would accidentally create a latch. A safe default is the current ptr.</li>
                    <li><b>Note:</b> The synthesis tool is smart enough to convert this loop into a fast, parallel priority encoder circuit.</li>
                </ul>
            </p>
            </li>
        </ol>
        <p className="leading-7 inter-body">
            Now Let's try writing the pseudo-code for these steps!!
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
{`req_doubled = {i_req, i_req};
rotated_req = req_doubled >> ptr;
priority_out = rotated_req & ~(rotated_req - 1);
prio_doubled = {priority_out, priority_out};`}
              </pre>
            </details>
          </div>
        </div>
        {/* === End of Pseudo-code Section === */}

        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          3. The New Pointer Update Rule
        </h3>
        <p className="leading-7 inter-body">
            Now we can implement our new, more efficient pointer logic. 
            This will go into the sequential always @(posedge i_clk...) block, just like in the last mission.
            <ul className="list-disc pl-6 space-y-2">
                <li><b>The Old Rule:</b> ptr &lt;= ptr + 1</li>
                <li><b>The New Rule:</b> ptr &lt;= ptr_arb + 1</li>
            </ul>
        </p>
        <p className="leading-7 inter-body">
            This simple change is the entire secret to the Modified scheme
        </p>

        <h3 className="text-xl inter-subheading text-slate-900 tracking-tight mt-6">
          4. Assemble the TYPE==1 Block
        </h3>
        <p className="leading-7 inter-body">
            You're ready to add your new design to the main module. We'll add it as an else if block inside the generate statement. 
            This allows us to switch between the Conventional (TYPE==0) and Modified (TYPE==1) arbiters just by changing a single parameter.
        </p>

        <p className="leading-7 inter-body">
            Now Let's try writing the pseudo-code for this entire Modified Scheme!!
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
{`req_doubled = {i_req, i_req};
rotated_req = req_doubled >> ptr;
priority_out = rotated_req & ~(rotated_req - 1);
prio_doubled = {priority_out, priority_out};`}
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
            onClick={() => setModule(3)}
            className="px-5 py-2 rounded-lg font-medium shadow-md transition-colors bg-blue-600 hover:bg-blue-700 text-white"
          >
            ← Module 3
          </button>
        </div>

        {/* Center - Checkbox */}
        <div className="flex justify-center">
          <label htmlFor="read3" className="flex items-center space-x-2 text-slate-700">
            <input
              type="checkbox"
              id="read3"
              checked={readModules[3]}          
              onChange={() => handleCheckboxChange(3)}
              className="h-4 w-4 accent-blue-600 rounded"
            />
            <span>I have read this module</span>
          </label>
        </div>

        {/* Right side - Finish button */}
        <div className="flex justify-end">
          <button
            disabled={!readModules[3]}          
            onClick={() => setModule(5)}        
            className={`px-5 py-2 rounded-lg font-medium shadow-md transition-colors ${
              readModules[3]
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
