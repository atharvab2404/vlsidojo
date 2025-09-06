"use client";

import { useState } from "react";
import { X } from "lucide-react";
import MCQBlock from "./MCQBlock";

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
          Our processor will handle 16-bit, 8-bit, and 4-bit data types, demonstrating the power and flexibility of SIMD operations. We will be using a five-stage pipeline:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
            <li> <strong>Instruction Fetch (IF):</strong>Get the next instruction from memory. </li>
              <li><strong>Instruction Decode (ID):</strong> Interpret the instruction and fetch register values.</li>
              <li><strong>Execute (EX):</strong>Perform the arithmetic and logical operations. </li>
              <li><strong>Memory Access (MEM):</strong> Read from or write to data memory. </li>
              <li><strong>Write Back (WB):</strong>Write the result back to a register. </li>
          

    

        </ol>
        <p>
          Let's break down the design into manageable modules:
        </p>

        <hr className="my-10 border-slate-200" />

        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          Stage 1: The Control Unit (FSM)
        </h2>
        <p className="leading-7 inter-body">
          The control unit is the brain of our processor. It's a finite state machine (FSM) that 
          orchestrates the entire pipeline. Your code already defines the states: <em>IDLE, IF, ID, EX, 
          MEM, WB, and HALT</em>. The <em>always @(posedge clk)</em> block for the state machine is the core of this 
          module.
        </p>
        <p className="leading-7 inter-body">
          <strong>Design Task: FSM Pseudocode</strong> 
            <p>Before writing the Verilog, let's outline the state transitions. Your mission is to create pseudocode that describes how the FSM moves from one state to the next.</p>
            <p><strong>Example:</strong></p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>From <em>STATE_IDLE:</em> If the rst signal is not active, move to <em>STATE_IF</em> to start fetching instructions.</li>
            <li>From <em>STATE_IF:</em> Transition to <em>STATE_ID</em> to begin decoding the fetched instruction.
            <li>From <em>STATE_HALT:</em> The processor should remain in this state once it has finished all operations.</li>
            </li>
          </ol>
        </p>
          <p className="leading-7 inter-body">
          <strong>Your turn:</strong> 
           Write the pseudocode for all state transitions, 
           including the rst condition and the opcode == 63 (HALT) condition.
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
                {`// FSM State Transition Pseudocode
                on the positive edge of the clock
                  if rst is true:
                      set current_state to STATE_IDLE
                      set PC to 0
                  else:
                      if opcode is 63:
                          set current_state to STATE_HALT
                      else:
                          switch (current_state)
                              case STATE_IDLE:
                                  set current_state to STATE_IF
                              case STATE_IF:
                                  set current_state to STATE_ID
                              case STATE_ID:
                                  set current_state to STATE_EX
                              case STATE_EX:
                                  set current_state to STATE_MEM
                              case STATE_MEM:
                                  set current_state to STATE_WB
                              case STATE_WB:
                                  set current_state to STATE_IF
                                  set PC to next_PC
                          end switch
                    end`}
              </pre>
            </details>
          </div>
        </div>
        {/* === End of Pseudo-code Section === */}
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          Stage 2: The Data Path and Registers
        </h2>
        <p className="leading-7 inter-body">
          This module is where the actual data resides and is manipulated. Your code defines several register banks and wires to handle data.
        </p>
        <p className="leading-7 inter-body">
          <p><strong>Registers:</strong></p>
              <ol className="list-disc pl-6 space-y-2">
                  <li><em>H[0:3]:</em> A register bank for 16-bit data.</li>
                  <li><em>Oset[0:2]:</em> A register bank for 8-bit data.</li>
                  <li><em>Qset[0:2]:</em> A register bank for 4-bit data.</li>
                  <li><em>PC:</em> The Program Counter, which holds the address of the current instruction.</li>
                  <li><em>LC:</em> The Loop Counter, used for loopjump instruction</li>
              </ol> 
          </p>
          <p className="leading-7 inter-body">
          <strong>Design Task: Data Path Pseudocode</strong>
          </p>
          
          <p className="leading-7 inter-body">
          Let's focus on the Write Back (WB) stage. This is where the results of operations are written 
          back to the registers. Your code has <em>always @(posedge clk)</em>, which performs 
          this task.
          </p>

          <p className="leading-7 inter-body">
          <strong>Your turn:</strong> 
           Write pseudocode for the WB stage. For each command <em>(CMD_addition, CMD_substruction, etc.)</em>, 
           describe which register <em>(H[R0], Oset[R0], etc.)</em> gets updated with which result 
           <em>(result_reg_add, result_reg_sub, etc.)</em>.
        </p>
        <p className="leading-7 inter-body"><strong>Example:</strong>
          <ol className="list-decimal pl-6 space-y-2">
            <li>If <em>CMD_addition:</em>
              <ol className="list-dash pl-6 space-y-2">
                <li>If <em>Hreg2</em> is true, write result_reg_add to <em>H[R2]</em></li>
                <li>If <em>Oreg2</em> is true, write result_reg_add to <em>Oset[R2]</em></li>
                <li>...and so on for all variants of addition.</li>


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
                {`// STATE_WB
if CMD_addition is true
    if Hreg2 is true
        H[R2] <= result_reg_add
    else if Oreg2 is true
        Oset[R2] <= result_reg_add
    else if Qreg2 is true
        Qset[R2] <= result_reg_add
    else if Him is true
        H[R0] <= result_reg_add
    else if Oim is true
        Oset[R0] <= result_reg_add
    else if Qim is true
        Qset[R0] <= result_reg_add

else if CMD_substruction is true
    // Logic for substruction, similar to addition

else if CMD_multiplication is true
    // Logic for multiplication, similar to addition

else if CMD_mul_accumulation is true
    if Hreg3 is true
        H[R1] <= result_reg_mac
    else if Oreg3 is true
        Oset[R1] <= result_reg_mac
    else if Qreg3 is true
        Qset[R1] <= result_reg_mac

else if CMD_logic_shift_right is true
    if Hreg1 is true
        H[R3] <= result_reg_Rshift
    // etc. for Oreg1 and Qreg1

else if CMD_logic_shift_left is true
    // Logic for left shift, similar to right shift

else if CMD_and is true
    if Hreg2 is true
        H[R2] <= result_reg_and
    // etc. for Oreg2 and Qreg2

else if CMD_or is true
    // Logic for OR, similar to AND

else if CMD_not is true
    // Logic for NOT, similar to shifts

else if CMD_set is true
    if Hreg1 is true
        H[R0] <= result_reg_set
    // etc. for Oreg1 and Qreg1

else if CMD_load is true
    if Hreg1 is true
        H[R0] <= data_in
    // etc. for Oreg1 and Qreg1`}
              </pre>
            </details>
          </div>
        </div>
        {/* === End of Pseudo-code Section === */}


        

        

       
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
