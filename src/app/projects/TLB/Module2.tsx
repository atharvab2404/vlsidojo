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
          Building the TLB logic
        </h2>
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          2.1 Storing the Entries
        </h2>
        <p className="leading-7 inter-body">
          Now that we know how to decode the address, we need a place to store our TLB entries. Each entry needs to hold the tag, the PCID, and the corresponding physical address (PA) that it translates to.</p>
      
      
          <p className="leading-7 inter-body">
          <strong>Your task:</strong> 
           Based on the module parameters, write the Verilog declaration for a memory-like structure to store the TLB entries. Think about the total number of entries and what each entry needs to store.
        </p>
                {/* hint */}
        <div className="bg-pink-100 border-l-4 border-yellow-500 text-yellow-800 p-4 my-6 rounded-md shadow-sm">
          <p className="font-semibold">💡 Hint</p>
          <p className="text-sm">
             Use a 2D array, e.g., reg [size_of_entry-1:0] entries [num_sets-1:0][num_ways-1:0];</p>
        </div>
        
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
                {`// - Tag: size is SADDR - SPAGE - $clog2(NSET)
// - PCID: size is SPCID
// - Physical Address (PA): size is SADDR - SPAGE

// Total size of a single entry = tag_size + pcid_size + pa_size
// The provided code also includes a valid bit. Let's add that.
// Total size = (SADDR - SPAGE - $clog2(NSET)) + SPCID + (SADDR - SPAGE) + 1
reg [SADDR-$clog2(NSET)-SPAGE+SPCID+SADDR-SPAGE:0] entries [NSET-1:0][NWAY-1:0];`}
              </pre>
            </details>
          </div>
        </div>
        {/* === End of Pseudo-code Section === */}
        <h2 className="text-2xl inter-subheading text-slate-900 tracking-tight">
          2.2 The Hit/Miss Logic
        </h2>
        <p className="leading-7 inter-body">
          This is the most critical part of the TLB. When a virtual address comes in, we need to check if we have a matching entry.
        </p>
      

          <p className="leading-7 inter-body">
          <strong>Your task:</strong> 
          Write the pseudocode for the hit/miss logic inside an always block that triggers on the 
          positive edge of the clock. Assume you have already decoded the <em>req_va</em> into <em>req_tag</em>, <em>req_set,</em> 
          and <em>req_local_addr.</em>
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
