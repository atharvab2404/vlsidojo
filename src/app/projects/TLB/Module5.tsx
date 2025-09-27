"use client";

import { useState } from "react";
import { X } from "lucide-react";
import MCQBlock from "./MCQBlock";

export default function Module5({ readModules, handleCheckboxChange, setModule }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Execution / Core */}
      <section className="space-y-4 mb-10">
      <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          Stage 4: The Execution Unit (ALU and Shifter)
        </h2>
        <p className="leading-7 inter-body">
        The execution unit is where the computational work happens. This is the EX stage in our pipeline. Your code instantiates sub-modules like SIMDadd, SIMDshifter, and SIMDmultiply, which represent the heart of the processor's functionality.
        </p>
        <p className="leading-7 inter-body">
          <strong>Design Task: Execution Logic Pseudocode</strong> 
            <p>The EX stage in your code performs the operations based on the command flags set during ID.</p>
        </p>
          
          <p className="leading-7 inter-body">
          <strong>Your turn:</strong> 
           Write pseudocode for the EX stage. For each command (CMD_addition, CMD_substruction, etc.), describe the operation performed and how the result is stored in the result_reg_* variables.
           </p>

        <p className="leading-7 inter-body">
          <strong>Example:</strong> 
          <ol className="list-disc pl-6 space-y-2">
            <li><strong>If CMD_addition:</strong> result_reg_add is assigned the output of the SIMDadd module (Add_output_Cout).</li>
            <li><strong>If CMD_store:</strong>
                <ol className="list-disc pl-6 space-y-2">
                    <li>Enable the write signal (wdata_en).</li>
                    <li>Set the data output (data_out_reg) to the value of the source register (H[R0], Oset[R0], etc.).</li>
                </ol>
            </li>
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
{`// Execution Logic Pseudocode

on the positive edge of the clock:
    if current_state is STATE_EX:
        // Clear all temporary result registers at the start of the cycle
        clear result_reg_add, result_reg_sub, result_reg_mul, etc.
        
        // Use a case statement for the operations
        switch (1'b1)
            case CMD_addition:
                assign result_reg_add to the output of the SIMD add module
            case CMD_substruction:
                assign result_reg_sub to the output of the SIMD add module (with subtraction enabled)
            case CMD_multiplication:
                assign result_reg_mul to the output of the SIMD multiply module
            case CMD_mul_accumulation:
                assign result_reg_mac to the output of the SIMD add module (with a multiplication result as input)
            case CMD_logic_shift_right:
                assign result_reg_Rshift to the output of the SIMD shifter module
            case CMD_logic_shift_left:
                assign result_reg_Lshift to the output of the SIMD shifter module
            case CMD_and:
                assign result_reg_and to a logical AND of the two operands
            case CMD_or:
                assign result_reg_or to a logical OR of the two operands
            case CMD_not:
                assign result_reg_not to a logical NOT of the operand
            case CMD_set:
                assign result_reg_set to the immediate value
            case CMD_load:
                set rdata_en to 1 and current_data_address to im_reg
            case CMD_store:
                set wdata_en to 1, rdata_en to 1, current_data_address to im_reg, and data_out_reg to the register value to be stored
        end switch
        
        // Handle Program Counter (PC) and Loop Counter (LC) updates
        if CMD_loopjump is true AND LC is not 0:
            set next_PC to im_reg
            decrement LC by 1
        else:
            set next_PC to PC + 1
        
        if CMD_setloop is true:
            set LC to im_reg
end`}
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
            onClick={() => setModule(4)}
            className="px-5 py-2 rounded-lg font-medium shadow-md transition-colors bg-blue-600 hover:bg-blue-700 text-white"
          >
            ← Module 4
          </button>
        </div>

        {/* Center - Checkbox */}
        <div className="flex justify-center">
          <label htmlFor="read3" className="flex items-center space-x-2 text-slate-700">
            <input
              type="checkbox"
              id="read3"
              checked={readModules[4]}          
              onChange={() => handleCheckboxChange(4)}
              className="h-4 w-4 accent-blue-600 rounded"
            />
            <span>I have read this module</span>
          </label>
        </div>

        {/* Right side - Finish button */}
        <div className="flex justify-end">
          <button
            disabled={!readModules[4]}          
            onClick={() => setModule(6)}        
            className={`px-5 py-2 rounded-lg font-medium shadow-md transition-colors ${
              readModules[4]
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
             Module 6 →
          </button>
        </div>
      </div>
      
      
    </div>
  );
}
